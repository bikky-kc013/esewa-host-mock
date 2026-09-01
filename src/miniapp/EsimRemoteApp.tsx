
import React, { Suspense, lazy, useMemo } from "react";

import Loader from "../components/Loader";
import { getStaticApp } from "../config/staticMiniApps";
import { loadMiniApp } from "./runtime-loader";

type Props = {
  merchantIdentifier?: string;
  vendorIdentifier?: string;
};

type RemoteEsimProps = {
  merchantIdentifier?: string;
  vendorIdentifier?: string;
  embedded?: boolean;
};

type RemoteEsimModule = {
  default: React.ComponentType<RemoteEsimProps>;
};

const appConfig = getStaticApp("esim-mini-app");

if (!appConfig) {
  throw new Error("eSIM mini-app not found");
}

const RemoteEsimApp = lazy(async () => {
  const remote = await loadMiniApp<RemoteEsimModule>({
    bundleUrl: appConfig.bundleUrl,
    scope: appConfig.scope,
    module: appConfig.module,
  });

  if (!remote?.default) {
    throw new Error(
      `Mini app "${appConfig.id}" does not expose a default React component`,
    );
  }

  return {
    default: remote.default,
  };
});

function LoadingFallback() {
  return (
    <div className="grid min-h-100 w-full place-items-center p-6 text-center">
      <Loader text="Loading eSIM Mini App..." />
    </div>
  );
}

function ErrorFallback({ error }: { error: Error | null }) {
  return (
    <div className="w-full p-4 text-[13px] leading-relaxed text-[#1C252E]">
      <div className="mb-2 font-bold">
        eSIM Mini App failed to load
      </div>

      {error && (
        <pre className="whitespace-pre-wrap wrap-break-word rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-[11px] text-rose-900">
          {error.message}
        </pre>
      )}

      <div className="mt-3 text-[11px] text-[#5E646B]">
        Remote:
      </div>

      <div className="mt-1 break-all rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5 font-mono text-[11px] text-gray-700">
        {appConfig?.bundleUrl}
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
  },
  {
    hasError: boolean;
    error: Error | null;
  }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[Host] EsimRemoteApp ErrorBoundary", {
      error,
      info,
    });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default function EsimRemoteApp({
  merchantIdentifier,
  vendorIdentifier,
}: Props) {
  const embeddedProps = useMemo<RemoteEsimProps>(
    () => ({
      merchantIdentifier,
      vendorIdentifier,
      embedded: true,
    }),
    [merchantIdentifier, vendorIdentifier],
  );

  return (
    <div className="isolate min-h-full w-full bg-[#f7f8f9]">
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <RemoteEsimApp {...embeddedProps} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
