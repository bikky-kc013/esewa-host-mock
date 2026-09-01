import React from "react";
import ReactDOM from "react-dom";
import { createInstance } from "@module-federation/enhanced/runtime";

export type MiniAppRemoteConfig = {
  bundleUrl: string;
  scope: string;
  module: string;
};

const mf = createInstance({
  name: "esewa_host",
  remotes: [],
});

mf.registerShared({
  react: {
    version: "19.2.8",
    scope: "default",
    lib: () => React,
    shareConfig: {
      singleton: true,
      requiredVersion: "^19.2.8",
    },
  },

  "react-dom": {
    version: "19.2.8",
    scope: "default",
    lib: () => ReactDOM,
    shareConfig: {
      singleton: true,
      requiredVersion: "^19.2.8",
    },
  },
});

const registeredRemotes = new Map<string, string>();

export async function loadMiniApp<T = unknown>(
  config: MiniAppRemoteConfig,
): Promise<T> {
  const bundleUrl = config.bundleUrl.trim();
  const moduleName = config.module.replace(/^.\//, "");
  const remoteName = `${config.scope}/${moduleName}`;

  try {
    const registeredEntry = registeredRemotes.get(config.scope);

    if (registeredEntry !== bundleUrl) {
      mf.registerRemotes([
        {
          name: config.scope,
          entry: bundleUrl,
          type: "module",
          shareScope: "default",
        },
      ]);

      registeredRemotes.set(config.scope, bundleUrl);
    }

    const remote = await mf.loadRemote<T>(remoteName);

    if (remote == null) {
      throw new Error(`Remote module returned null: ${remoteName}`);
    }

    return remote;
  } catch (error) {
    console.error("[MiniApp] Failed to load remote", {
      remoteName,
      bundleUrl,
      error,
    });

    throw new Error(
      `Failed to load mini-app "${remoteName}" from ${bundleUrl}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}
