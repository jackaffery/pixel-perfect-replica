import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { authMessage, registerDemoAccount, resendDemoConfirmation } from '@/lib/demo-auth';
type Props = { mode: 'signup' | 'signin'; onClose: () => void; onSwitch: () => void };
export function DemoAuthModal({ mode, onClose, onSwitch }: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(''); const [username, setUsername] = useState(''); const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false); const [sent, setSent] = useState(false); const [message, setMessage] = useState(''); const [cooldown, setCooldown] = useState(0);
  useEffect(() => { if (!cooldown) return; const timer = setTimeout(() => setCooldown(cooldown - 1), 1000); return () => clearTimeout(timer); }, [cooldown]);
  const requestEmail = async (reset: boolean) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setMessage('Enter your email address first.'); return; }
    setBusy(true); setMessage('');
    try {
      if (reset) { const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/reset-password` }); if (error) throw new Error(authMessage(error)); }
      else await resendDemoConfirmation(email);
      setCooldown(60); setMessage('Email request accepted. Check your inbox and spam folder.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to request email.'); } finally { setBusy(false); }
  };
  return <div role="dialog" aria-modal="true" aria-labelledby="demo-auth-title" className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-4"><div className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-lg border border-border bg-background p-6 text-foreground shadow-xl">
    <div className="flex items-center justify-between gap-3"><h2 id="demo-auth-title" className="text-xl font-bold">{mode === 'signup' ? 'Create a demo account' : 'Demo customer sign in'}</h2><Button variant="ghost" size="icon" aria-label="Close" onClick={onClose}><X /></Button></div>
    <p className="my-4 text-sm text-muted-foreground">Demo — not a real bank. Use a new password, not your banking password. No financial information or identity documents.</p>
    {sent ? <div className="space-y-4"><h3 className="font-semibold">Check your email</h3><p className="text-sm">Your confirmation request was accepted. Open the link in your inbox or spam folder, then sign in with your email and password.</p><p className="text-sm text-muted-foreground">Email verification is separate from approval. No bank account is opened.</p></div> : <form className="space-y-4" onSubmit={async e => {
      e.preventDefault(); setBusy(true); setMessage('');
      try {
        if (mode === 'signup') { await registerDemoAccount(email, password, username); setPassword(''); setSent(true); setCooldown(60); }
        else { const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password }); if (error) throw new Error(authMessage(error)); if (!data.user?.email_confirmed_at) { await supabase.auth.signOut(); throw new Error('Confirm your email before signing in.'); } setPassword(''); onClose(); await navigate({ to: '/account' }); }
      } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to complete request.'); } finally { setBusy(false); }
    }}>
      {mode === 'signup' && <label className="block text-sm font-medium">Demo username<input required pattern="[a-zA-Z0-9_-]{4,30}" minLength={4} maxLength={30} autoComplete="nickname" value={username} onChange={e => setUsername(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background p-2" /></label>}
      <label className="block text-sm font-medium">Email address<input type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background p-2" /></label>
      <label className="block text-sm font-medium">Demo password<input type="password" required minLength={mode === 'signup' ? 12 : 1} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background p-2" /></label>
      <Button type="submit" className="w-full" disabled={busy}>{busy ? 'Please wait…' : mode === 'signup' ? 'Create demo account' : 'Sign in'}</Button>
    </form>}
    {(sent || mode === 'signin') && <Button variant="outline" className="mt-4 w-full" disabled={busy || cooldown > 0} onClick={() => void requestEmail(false)}>{cooldown ? `Resend in ${cooldown}s` : 'Resend confirmation link'}</Button>}
    {mode === 'signin' && <Button variant="link" disabled={busy || cooldown > 0} onClick={() => void requestEmail(true)}>Forgot password?</Button>}
    {message && <p role="status" className="mt-4 text-sm text-destructive">{message}</p>}
    <Button variant="link" className="mt-4 w-full" onClick={onSwitch}>{mode === 'signin' ? 'Create a demo account' : 'Go to sign in'}</Button>
  </div></div>;
}
