/**
 * PhoneShell.tsx — Host chrome: status bar, device frame, home indicator
 * Uses exact eSewa tokens from tokens.ts (verified against dist/index.css)
 * AppBar inside Mini App is 56px (StyledAppBar: height 56px, padding 7px 12px)
 */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { primary, blue, gray, bluegray, white } from './tokens';

const ShellOuter = styled.div`
  min-height: 100vh;
  background: ${blue[50]}; /* body-bg */
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 24px 280px 24px 24px; /* right pad for drawer */
  box-sizing: border-box;
  @media (max-width: 1100px) {
    padding-right: 24px;
  }
`;

const DeviceFrame = styled.div`
  width: 390px;
  min-height: 812px;
  max-height: 812px;
  background: ${white}; /* card-bg */
  border: 1px solid ${bluegray[100]};
  border-radius: 32px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 30px rgba(28, 37, 46, 0.12), 0 4px 12px rgba(28, 37, 46, 0.08);
  position: relative;
`;

const StatusBar = styled.div<{ $green?: boolean }>`
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2px;
  background: ${(p) => (p.$green ? primary[500] : white)};
  color: ${(p) => (p.$green ? white : gray[900])};
  border-bottom: 1px solid ${(p) => (p.$green ? primary[600] : bluegray[100])};
  flex-shrink: 0;
  user-select: none;
`;

const StatusLeft = styled.span`
  font-variant-numeric: tabular-nums;
`;

const StatusRight = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  opacity: 0.95;
`;

const SignalBars = styled.span`
  display: inline-flex;
  gap: 2px;
  align-items: flex-end;
  span {
    width: 3px;
    background: currentColor;
    border-radius: 1px;
    &:nth-child(1) { height: 4px; opacity: 0.8; }
    &:nth-child(2) { height: 7px; opacity: 0.9; }
    &:nth-child(3) { height: 10px; }
    &:nth-child(4) { height: 12px; }
  }
`;

const Battery = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  i {
    width: 22px;
    height: 11px;
    border: 1px solid currentColor;
    border-radius: 3px;
    position: relative;
    display: inline-block;
    &::after {
      content: '';
      position: absolute;
      right: -3px;
      top: 3px;
      width: 2px;
      height: 4px;
      background: currentColor;
      border-radius: 0 1px 1px 0;
    }
    &::before {
      content: '';
      position: absolute;
      left: 1px;
      top: 1px;
      width: 14px;
      height: 7px;
      background: currentColor;
      border-radius: 1px;
      opacity: 0.9;
    }
  }
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${blue[50]};
  position: relative;
  /* hide scrollbar for phone feel but keep scroll */
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: ${bluegray[200]}; border-radius: 4px; }
`;

const HomeIndicatorWrap = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${white};
  border-top: 1px solid ${bluegray[100]};
  flex-shrink: 0;
`;

const HomeIndicator = styled.div`
  width: 134px;
  height: 5px;
  border-radius: 999px;
  background: ${gray[900]};
  opacity: 0.9;
`;

export type PhoneShellProps = {
  children: React.ReactNode;
  /** if true, status bar is green (home feed), else white (mini app) */
  greenStatusBar?: boolean;
  /** optional title to show in outer chrome for debug (not relocating ESewaAppBar) */
  debugTitle?: string;
  /** Host-level back affordance — outside ESewaAppBar, for discovery ↔ miniapp nav */
  onBackToDiscovery?: () => void;
};

const HostBackBar = styled.div`
  height: 28px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  background: ${gray[25]}; /* #F8F8F8 */
  border-bottom: 1px solid ${bluegray[100]};
  flex-shrink: 0;
  font-size: 11px;
  color: ${gray[500]};
`;

const HostBackButton = styled.button`
  background: ${white};
  border: 1px solid ${bluegray[100]};
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${gray[500]};
  &:hover { border-color: ${bluegray[200]}; }
`;

export const PhoneShell: React.FC<PhoneShellProps> = ({
  children,
  greenStatusBar = false,
  debugTitle,
  onBackToDiscovery,
}) => {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <ShellOuter>
      <DeviceFrame role="region" aria-label="eSewa phone frame">
        <StatusBar $green={greenStatusBar}>
          <StatusLeft>{time}</StatusLeft>
          <StatusRight>
            <SignalBars aria-hidden>
              <span />
              <span />
              <span />
              <span />
            </SignalBars>
            <span>4G</span>
            <Battery aria-label="battery">
              <i />
              <span>92%</span>
            </Battery>
            {debugTitle && (
              <span style={{ maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', opacity: 0.85, fontWeight: 500 }}>
                • {debugTitle}
              </span>
            )}
          </StatusRight>
        </StatusBar>
        {onBackToDiscovery && (
          <HostBackBar>
            <HostBackButton onClick={onBackToDiscovery} aria-label="Back to eSewa" data-testid="back-to-esewa">
              ← Back to eSewa
            </HostBackButton>
            <span style={{ opacity: 0.7, fontWeight: 500 }}>Simulates CLOSE_APP / back</span>
          </HostBackBar>
        )}
        <ContentArea>{children}</ContentArea>
        <HomeIndicatorWrap>
          <HomeIndicator />
        </HomeIndicatorWrap>
      </DeviceFrame>
    </ShellOuter>
  );
};

function formatTime(d: Date): string {
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12;
  return `${h}:${m} ${ampm}`;
}
