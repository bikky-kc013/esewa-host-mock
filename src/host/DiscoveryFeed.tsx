/**
 * DiscoveryFeed.tsx — eSewa Home clone (https://esewa.com.np/#/home)
 * Now data-driven from onboarding registry: renders one tile per live RegisteredMiniApp.
 * Keeps one decorative filler section separate (Merchant Spotlight) so dummy tiles stay distinct.
 */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { primary, blue, gray, bluegray, white, orange } from './tokens';
import type { RegisteredMiniApp } from './onboarding/types';
import { listApps, subscribeRegistry } from './onboarding/store';

const Page = styled.div`
  min-height: 100vh;
  background: ${blue[50]};
  display: flex;
  flex-direction: column;
`;

const SiteHeader = styled.header`
  background: ${gray[900]};
  color: ${white};
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid ${gray[800]};
`;

const HeaderInner = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 18px;
  @media (max-width: 860px) {
    gap: 10px;
    padding: 10px 12px;
  }
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: ${white};
  font-weight: 800;
  font-size: 22px;
  letter-spacing: 0.6px;
  white-space: nowrap;
  img {
    height: 28px;
    display: block;
  }
  span {
    color: ${primary[500]};
  }
  small {
    font-size: 10px;
    font-weight: 600;
    color: ${bluegray[200]};
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-left: 2px;
  }
`;

const SearchWrap = styled.div`
  flex: 1;
  max-width: 520px;
  display: flex;
  align-items: center;
  background: ${white};
  border-radius: 6px;
  padding: 0 10px;
  height: 36px;
  color: ${gray[100]};
  @media (max-width: 860px) {
    max-width: none;
  }
  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 13px;
    color: ${gray[500]};
    background: transparent;
    &::placeholder { color: ${gray[100]}; }
  }
  button {
    background: ${primary[500]};
    color: ${white};
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    margin-left: 6px;
  }
`;

const LoginFake = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  input {
    background: ${gray[800]};
    border: 1px solid ${gray[700]};
    color: ${white};
    border-radius: 6px;
    padding: 7px 10px;
    font-size: 12px;
    width: 120px;
    &::placeholder { color: ${bluegray[300]}; }
    outline: none;
  }
  button {
    background: ${primary[500]};
    color: ${white};
    border: none;
    border-radius: 6px;
    padding: 7px 14px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
  }
  @media (max-width: 860px) {
    display: none;
  }
`;

const ToggleNav = styled.button`
  display: none;
  background: transparent;
  border: 1px solid ${gray[700]};
  color: ${bluegray[200]};
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 12px;
  @media (max-width: 860px) {
    display: inline-flex;
  }
`;

const SubNav = styled.div`
  background: ${white};
  border-bottom: 1px solid ${bluegray[100]};
  padding: 8px 0;
  overflow-x: auto;
  white-space: nowrap;
  &::-webkit-scrollbar { display: none; }
`;

const SubNavInner = styled.div`
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  gap: 18px;
  font-size: 13px;
  font-weight: 600;
  color: ${gray[500]};
  a {
    color: ${gray[500]};
    text-decoration: none;
    padding: 4px 0;
    border-bottom: 2px solid transparent;
    &.active { color: ${primary[500]}; border-color: ${primary[500]}; }
  }
`;

const MainWrap = styled.main`
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  padding: 16px 20px 40px;
  box-sizing: border-box;
  @media (max-width: 860px) {
    padding: 12px 12px 30px;
  }
`;

const ShowcaseSection = styled.section`
  background: ${white};
  border: 1px solid ${bluegray[100]};
  border-radius: 12px;
  padding: 14px 14px 10px;
  margin-bottom: 14px;
`;

const ShowcaseHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  h4 {
    margin: 0;
    font-size: 15px;
    font-weight: 700;
    color: ${gray[900]};
    letter-spacing: 0.2px;
  }
`;

const BtnShowcase = styled.button`
  background: transparent;
  border: 1px solid ${bluegray[100]};
  color: ${primary[500]};
  font-size: 11px;
  font-weight: 700;
  border-radius: 999px;
  padding: 5px 12px;
  cursor: pointer;
  &:hover { border-color: ${primary[200]}; background: ${primary[50]}; }
`;

const ProductList = styled.div`
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 6px;
  scroll-snap-type: x proximity;
  &::-webkit-scrollbar { height: 6px; }
  &::-webkit-scrollbar-thumb { background: ${bluegray[100]}; border-radius: 999px; }
  @media (max-width: 860px) {
    gap: 10px;
  }
`;

const ShowcaseItem = styled.figure<{ $clickable?: boolean }>`
  flex: 0 0 148px;
  margin: 0;
  background: ${white};
  border: 1px solid ${bluegray[100]};
  border-radius: 10px;
  padding: 10px 8px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  cursor: ${(p) => (p.$clickable ? 'pointer' : 'default')};
  transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
  scroll-snap-align: start;
  &:hover {
    ${(p) => (p.$clickable ? `border-color: ${primary[200]}; box-shadow: 0 4px 14px rgba(41,187,0,0.12); transform: translateY(-1px);` : '')}
  }
  @media (max-width: 860px) {
    flex: 0 0 132px;
  }
`;

const OfferTag = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  background: ${primary[500]};
  color: ${white};
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.4px;
  padding: 2px 6px;
  border-radius: 999px;
  text-transform: uppercase;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FigImg = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${blue[50]};
  border: 1px solid ${bluegray[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-top: 6px;
  img {
    width: 42px;
    height: 42px;
    object-fit: contain;
  }
  span {
    font-size: 22px;
    font-weight: 800;
    color: ${primary[500]};
  }
`;

const Caption = styled.figcaption`
  margin-top: 8px;
  h5 {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
    color: ${gray[900]};
    line-height: 1.3;
    min-height: 32px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  p {
    margin: 2px 0 0;
    font-size: 10px;
    color: ${gray[100]};
    line-height: 1.2;
    min-height: 14px;
  }
`;

const BtnViewDetails = styled.button<{ $muted?: boolean }>`
  margin-top: 8px;
  background: ${(p) => (p.$muted ? white : primary[500])};
  color: ${(p) => (p.$muted ? gray[100] : white)};
  border: 1px solid ${(p) => (p.$muted ? bluegray[100] : primary[500])};
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 11px;
  font-weight: 700;
  cursor: ${(p) => (p.$muted ? 'default' : 'pointer')};
  width: 100%;
  &:hover {
    background: ${(p) => (p.$muted ? white : primary[600])};
  }
`;

const EmptyState = styled.div`
  border: 1px dashed ${bluegray[100]};
  border-radius: 10px;
  padding: 18px;
  text-align: center;
  color: ${gray[100]};
  font-size: 13px;
  background: ${blue[50]};
  button {
    margin-top: 10px;
    background: ${gray[900]};
    color: ${white};
    border: none;
    border-radius: 8px;
    padding: 7px 14px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }
`;

export type DiscoveryFeedProps = {
  onLaunchMiniApp: (appId: string) => void;
  onOpenOnboarding?: () => void;
};

export const DiscoveryFeed: React.FC<DiscoveryFeedProps> = ({ onLaunchMiniApp, onOpenOnboarding }) => {
  const [liveApps, setLiveApps] = useState<RegisteredMiniApp[]>(() => listApps().filter((a) => a.status === 'live'));

  useEffect(() => {
    const refresh = () => setLiveApps(listApps().filter((a) => a.status === 'live'));
    refresh();
    const unsub = subscribeRegistry(refresh);
    return unsub;
  }, []);

  return (
    <Page>
      <SiteHeader>
        <HeaderInner>
          <ToggleNav>☰</ToggleNav>
          <Brand href="#" onClick={(e) => e.preventDefault()}>
            <img src="https://esewa.com.np/common/images/esewa_logo.png" alt="eSewa" onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')} />
          </Brand>
          <SearchWrap>
            <span aria-hidden>🔍</span>
            <input placeholder="Search services, bills, merchants…" aria-label="Search" />
            <button type="button">Search</button>
          </SearchWrap>
          <LoginFake aria-hidden>
            <input placeholder="eSewa ID" tabIndex={-1} />
            <input placeholder="Password" type="password" tabIndex={-1} />
            <button tabIndex={-1}>Login</button>
          </LoginFake>
        </HeaderInner>
      </SiteHeader>

      <SubNav>
        <SubNavInner>
          <a className="active" href="#" onClick={(e) => e.preventDefault()}>Home</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Top Up</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Electricity</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Khanepani</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Internet</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Airlines</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Bus</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Insurance</a>
        </SubNavInner>
      </SubNav>

      <MainWrap>
        <ShowcaseSection>
          <ShowcaseHeader>
            <h4>Mini Apps <span style={{ fontWeight: 500, fontSize: 11, color: gray[100], background: blue[100], border: `1px solid ${blue[200]}`, borderRadius: 999, padding: '2px 7px', marginLeft: 6 }}>Dev-only</span></h4>
            <BtnShowcase>View more</BtnShowcase>
          </ShowcaseHeader>

          {liveApps.length === 0 ? (
            <EmptyState>
              <div style={{ fontWeight: 700, color: gray[500] }}>No Mini Apps live yet — register one in the Partner Console</div>
              <div style={{ marginTop: 4 }}>Create → approve → go live, then it appears here as a tile.</div>
              {onOpenOnboarding && <button onClick={onOpenOnboarding}>Open Partner Console</button>}
            </EmptyState>
          ) : (
            <ProductList>
              {liveApps.map((app) => (
                <ShowcaseItem
                  key={app.id}
                  $clickable
                  onClick={() => onLaunchMiniApp(app.id)}
                  role="button"
                  aria-label={`Open ${app.name}`}
                  data-testid={`tile-miniapp-${app.id}`}
                >
                  {app.badge && <OfferTag>{app.badge}</OfferTag>}
                  <FigImg><span>{app.iconLabel}</span></FigImg>
                  <Caption>
                    <h5>{app.name}</h5>
                    <p>{app.category}</p>
                  </Caption>
                  <BtnViewDetails>View Details</BtnViewDetails>
                </ShowcaseItem>
              ))}
            </ProductList>
          )}
          <div style={{ fontSize: 11, color: gray[100], marginTop: 8 }}>
            Tiles shown here require <b>status === 'live'</b> — pending/approved apps stay hidden until Go Live.
          </div>
        </ShowcaseSection>

        {/* Decorative filler — clearly not part of Mini App system */}
        <ShowcaseSection>
          <ShowcaseHeader>
            <h4>Merchant Spotlight</h4>
            <BtnShowcase>View more</BtnShowcase>
          </ShowcaseHeader>
          <ProductList>
            {[
              { name: 'Dummy Service A', icon: '🏦', offer: 'New' },
              { name: 'Dummy Service B', icon: '🛡️', offer: '10% off' },
              { name: 'Dummy Service C', icon: '🎟️', offer: 'Registration' },
            ].map((s) => (
              <ShowcaseItem key={s.name}>
                <OfferTag style={{ background: s.offer === 'New' ? blue[500] : s.offer === '10% off' ? primary[500] : orange[500] }}>{s.offer}</OfferTag>
                <FigImg><span>{s.icon}</span></FigImg>
                <Caption><h5>{s.name}</h5><p>Marketplace filler</p></Caption>
                <BtnViewDetails $muted>View Details</BtnViewDetails>
              </ShowcaseItem>
            ))}
          </ProductList>
        </ShowcaseSection>

        <ShowcaseSection>
          <ShowcaseHeader>
            <h4>Popular Services</h4>
            <BtnShowcase>View more</BtnShowcase>
          </ShowcaseHeader>
          <ProductList>
            {[
              { name: 'Mobile Topup', icon: '📞', offer: '5% off' },
              { name: 'Electricity', icon: '💡', offer: '' },
              { name: 'Khanepani', icon: '💧', offer: '' },
              { name: 'Internet', icon: '🌐', offer: 'New' },
              { name: 'Airlines', icon: '✈️', offer: '' },
            ].map((s) => (
              <ShowcaseItem key={s.name}>
                {s.offer && <OfferTag>{s.offer}</OfferTag>}
                <FigImg><span>{s.icon}</span></FigImg>
                <Caption><h5>{s.name}</h5></Caption>
                <BtnViewDetails $muted>View Details</BtnViewDetails>
              </ShowcaseItem>
            ))}
          </ProductList>
        </ShowcaseSection>

        <ShowcaseSection>
          <ShowcaseHeader>
            <h4>Insurance</h4>
            <BtnShowcase>View more</BtnShowcase>
          </ShowcaseHeader>
          <ProductList>
            {[
              { name: 'Life Insurance', icon: '🏥', offer: 'New' },
              { name: 'Vehicle', icon: '🚗', offer: '' },
              { name: 'Travel', icon: '🧳', offer: '10% off' },
              { name: 'Health Cover', icon: '❤️', offer: '' },
            ].map((s) => (
              <ShowcaseItem key={s.name}>
                {s.offer && <OfferTag>{s.offer}</OfferTag>}
                <FigImg><span>{s.icon}</span></FigImg>
                <Caption><h5>{s.name}</h5></Caption>
                <BtnViewDetails $muted>View Details</BtnViewDetails>
              </ShowcaseItem>
            ))}
          </ProductList>
        </ShowcaseSection>

        <div style={{ marginTop: 10, fontSize: 11, color: gray[100], lineHeight: 1.6, borderTop: `1px dashed ${bluegray[100]}`, paddingTop: 10 }}>
          Clone of <a href="https://esewa.com.np/#/home" target="_blank" rel="noreferrer" style={{ color: primary[500], textDecoration: 'none' }}>esewa.com.np/#/home</a> — only Mini Apps tiles with <code>live</code> status launch the PhoneShell; others are decorative.
        </div>
      </MainWrap>
    </Page>
  );
};
