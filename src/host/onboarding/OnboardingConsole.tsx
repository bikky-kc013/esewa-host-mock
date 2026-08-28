import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { primary, blue, gray, bluegray, white, red, orange } from '../tokens';
import type { MiniAppStatus, RegisteredMiniApp } from './types';
import { listApps, createApp, updateStatus, subscribeRegistry } from './store';

/* Dev tool surface — intentionally plain, not ESewaButton/InputField, to stay distinct from phone shell + real eSewa */
const Wrap = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 18px 20px 32px;
  box-sizing: border-box;
  background: ${blue[50]};
  min-height: calc(100vh - 56px);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  gap: 12px;
  flex-wrap: wrap;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: ${gray[900]};
  span { font-weight: 500; font-size: 12px; color: ${gray[100]}; margin-left: 8px; }
`;

const TabBar = styled.div`
  display: inline-flex;
  background: ${white};
  border: 1px solid ${bluegray[100]};
  border-radius: 999px;
  padding: 3px;
  gap: 3px;
`;

const TabBtn = styled.button<{ $active: boolean }>`
  border: none;
  border-radius: 999px;
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  background: ${(p) => (p.$active ? gray[900] : 'transparent')};
  color: ${(p) => (p.$active ? white : gray[500])};
`;

const Card = styled.div`
  background: ${white};
  border: 1px solid ${bluegray[100]};
  border-radius: 12px;
  padding: 16px;
`;

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 760px) { grid-template-columns: 1fr; }
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  color: ${gray[500]};
  span.req { color: ${red[500]}; }
  input, textarea, select {
    border: 1px solid ${bluegray[100]};
    border-radius: 8px;
    padding: 8px 10px;
    font-size: 13px;
    outline: none;
    background: ${white};
    color: ${gray[500]};
    &:focus { border-color: ${gray[300]}; }
  }
  textarea { min-height: 64px; resize: vertical; }
  small { font-weight: 400; color: ${gray[100]}; }
`;

const RadioRow = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  font-size: 13px;
  label { display: flex; align-items: center; gap: 6px; font-weight: 500; cursor: pointer; }
`;

const Btn = styled.button<{ $primary?: boolean }>`
  border: 1px solid ${(p) => (p.$primary ? primary[500] : bluegray[100])};
  background: ${(p) => (p.$primary ? primary[500] : white)};
  color: ${(p) => (p.$primary ? white : gray[500])};
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const StatusBadge = styled.span<{ $status: MiniAppStatus }>`
  display: inline-block;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 999px;
  border: 1px solid;
  background: ${(p) =>
    p.$status === 'live' ? primary[50] :
    p.$status === 'approved' ? blue[100] :
    p.$status === 'pending_review' ? orange[50] :
    p.$status === 'rejected' ? red[50] : gray[25]};
  color: ${(p) =>
    p.$status === 'live' ? primary[500] :
    p.$status === 'approved' ? blue[500] :
    p.$status === 'pending_review' ? orange[500] :
    p.$status === 'rejected' ? red[500] : gray[100]};
  border-color: ${(p) =>
    p.$status === 'live' ? primary[200] :
    p.$status === 'approved' ? blue[200] :
    p.$status === 'pending_review' ? orange[500] :
    p.$status === 'rejected' ? red[200] : bluegray[100]};
`;

const AppCard = styled.div`
  border: 1px solid ${bluegray[100]};
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: ${white};
`;

const Mono = styled.code`
  font-family: ui-monospace, monospace;
  font-size: 11px;
  background: ${blue[50]};
  border: 1px solid ${bluegray[100]};
  border-radius: 6px;
  padding: 2px 6px;
  word-break: break-all;
`;

const BUSINESS_OPTIONS = ['Sole Proprietor', 'Private Limited', 'Public Limited', 'Partnership', 'Cooperative'];

export const OnboardingConsole: React.FC<{ onGoDiscovery?: () => void; onForceLaunch?: (id: string) => void }> = ({ onGoDiscovery, onForceLaunch }) => {
  const [tab, setTab] = useState<'register' | 'queue'>('register');
  const [apps, setApps] = useState<RegisteredMiniApp[]>(() => listApps());
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'Utilities',
    iconLabel: '',
    badge: '',
    launchMode: 'embedded' as 'embedded' | 'iframe',
    launchUrl: '',
    contactEmail: '',
    businessType: BUSINESS_OPTIONS[0],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeRegistry(() => setApps(listApps()));
    return unsub;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.description.trim() || !form.category.trim() || !form.iconLabel.trim() || !form.contactEmail.trim()) {
      setError('Please fill required fields.');
      return;
    }
    if (form.launchMode === 'iframe' && !form.launchUrl.trim()) {
      setError('Launch URL is required for Iframe mode.');
      return;
    }
    try {
      new URL(form.launchUrl || 'https://example.com');
      if (form.launchMode === 'iframe') {
        // valid URL check
        if (!form.launchUrl.startsWith('http')) throw new Error('URL must start with http');
      }
    } catch {
      if (form.launchMode === 'iframe') { setError('Launch URL must be a valid http(s) URL.'); return; }
    }
    createApp({
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      iconLabel: form.iconLabel.trim(),
      badge: form.badge.trim() || undefined,
      launchMode: form.launchMode,
      launchUrl: form.launchUrl.trim() || undefined,
      contactEmail: form.contactEmail.trim(),
      businessType: form.businessType,
    });
    // reset form but keep category/business
    setForm((f) => ({ ...f, name: '', description: '', iconLabel: '', badge: '', launchUrl: '', contactEmail: '' }));
    setTab('queue');
  };

  const act = (id: string, status: MiniAppStatus) => {
    if (status === 'rejected') {
      const note = window.prompt('Rejection reason (reviewNote):', 'Missing required documents');
      if (note === null) return;
      updateStatus(id, status, note || 'Rejected by reviewer');
    } else {
      updateStatus(id, status);
    }
  };

  return (
    <Wrap>
      <Header>
        <H1>Partner Console <span>dev-only — Paytm-style onboarding simulation</span></H1>
        <TabBar>
          <TabBtn $active={tab === 'register'} onClick={() => setTab('register')}>Register New App</TabBtn>
          <TabBtn $active={tab === 'queue'} onClick={() => setTab('queue')}>Review Queue ({apps.length})</TabBtn>
        </TabBar>
      </Header>

      {tab === 'register' ? (
        <Card as="form" onSubmit={handleSubmit}>
          <div style={{ fontSize: 12, color: gray[100], marginBottom: 10 }}>This console is <b>dev tooling</b>, intentionally plain — not eSewa UI — to avoid confusion with real eSewa surfaces.</div>
          <Grid2>
            <Field>Name *<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Khanepani Quick Pay" /></Field>
            <Field>Category<input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Utilities, Shopping…" /></Field>
            <Field>Description *<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short pitch…" /></Field>
            <Field>Icon label (1-2 letters) *<input value={form.iconLabel} onChange={(e) => setForm({ ...form, iconLabel: e.target.value })} placeholder="KP" maxLength={2} /></Field>
            <Field>Badge (optional)<input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="New, 10% off…" /></Field>
            <Field>Contact email *<input type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} placeholder="team@example.com" /></Field>
            <Field>Business type
              <select value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })}>
                {BUSINESS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </Field>
            <Field>Launch mode
              <RadioRow>
                <label><input type="radio" checked={form.launchMode === 'embedded'} onChange={() => setForm({ ...form, launchMode: 'embedded' })} /> Embedded</label>
                <label><input type="radio" checked={form.launchMode === 'iframe'} onChange={() => setForm({ ...form, launchMode: 'iframe' })} /> Iframe URL</label>
              </RadioRow>
              <small>Embedded mounts SampleMiniApp inline; Iframe renders &lt;iframe src&gt; (same-origin host bridge injected).</small>
            </Field>
            {form.launchMode === 'iframe' && (
              <Field>Launch URL *<input value={form.launchUrl} onChange={(e) => setForm({ ...form, launchUrl: e.target.value })} placeholder="http://localhost:5174 or https://..." /></Field>
            )}
          </Grid2>
          {error && <div style={{ marginTop: 10, color: white, background: red[500], borderRadius: 8, padding: '8px 10px', fontSize: 12 }}>{error}</div>}
          <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
            <Btn $primary type="submit">Submit for review</Btn>
            <Btn type="button" onClick={() => setTab('queue')}>View queue</Btn>
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: gray[100] }}>On submit: status → <b>pending_review</b>, identifiers auto-generated (<code>NP-ES-DEV-XXXXXX</code> / <code>VENDOR-XXXXXXXX</code>).</div>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {apps.length === 0 ? (
            <Card><div style={{ fontSize: 13, color: gray[500] }}>No apps registered yet. Switch to “Register New App” to create the first one.</div></Card>
          ) : (
            apps.map((app) => (
              <AppCard key={app.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: app.status === 'live' ? primary[500] : blue[50], border: `1px solid ${bluegray[100]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, color: app.status === 'live' ? white : gray[500] }}>{app.iconLabel}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: gray[900] }}>{app.name}</div>
                        <div style={{ fontSize: 11, color: gray[100] }}>{app.category} • {app.businessType} • {new Date(app.createdAt).toLocaleString()}</div>
                      </div>
                      <StatusBadge $status={app.status}>{app.status}</StatusBadge>
                      {app.badge && <span style={{ fontSize: 10, background: primary[50], border: `1px solid ${primary[200]}`, color: primary[500], borderRadius: 999, padding: '2px 6px', fontWeight: 700 }}>{app.badge}</span>}
                    </div>
                    <div style={{ fontSize: 12, color: gray[500], marginTop: 6 }}>{app.description}</div>
                    <div style={{ fontSize: 11, color: gray[100], marginTop: 4 }}>{app.contactEmail} • launchMode: <b>{app.launchMode}</b>{app.launchUrl ? ` • ${app.launchUrl}` : ''}</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                      <Mono>{app.merchant_identifier}</Mono>
                      <Mono>{app.vendorIdentifier}</Mono>
                    </div>
                    {app.reviewNote && <div style={{ marginTop: 6, background: red[50], border: `1px solid ${red[100]}`, color: red[500], borderRadius: 8, padding: '6px 8px', fontSize: 12 }}><b>Review note:</b> {app.reviewNote}</div>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  {app.status === 'pending_review' && (
                    <>
                      <Btn $primary onClick={() => act(app.id, 'approved')}>Approve</Btn>
                      <Btn onClick={() => act(app.id, 'rejected')}>Reject</Btn>
                      {onForceLaunch && <Btn onClick={() => onForceLaunch(app.id)} style={{ background: orange[50], borderColor: orange[500], color: orange[500] }}>Test launch (not live → error)</Btn>}
                    </>
                  )}
                  {app.status === 'approved' && (
                    <>
                      <Btn $primary onClick={() => act(app.id, 'live')}>Go Live</Btn>
                      <Btn onClick={() => act(app.id, 'rejected')}>Reject</Btn>
                    </>
                  )}
                  {app.status === 'live' && <Btn onClick={() => act(app.id, 'approved')}>Take Down</Btn>}
                  {app.status === 'rejected' && (
                    <>
                      <Btn $primary onClick={() => act(app.id, 'pending_review')}>Resubmit</Btn>
                      {onForceLaunch && <Btn onClick={() => onForceLaunch(app.id)} style={{ background: orange[50], borderColor: orange[500], color: orange[500] }}>Test launch (rejected → error)</Btn>}
                    </>
                  )}
                  {app.status === 'draft' && <Btn $primary onClick={() => act(app.id, 'pending_review')}>Submit</Btn>}
                </div>
              </AppCard>
            ))
          )}
          {onGoDiscovery && <div><Btn onClick={onGoDiscovery}>← Back to eSewa Home</Btn></div>}
        </div>
      )}
    </Wrap>
  );
};
