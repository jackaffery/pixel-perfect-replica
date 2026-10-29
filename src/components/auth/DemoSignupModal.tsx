import { useEffect, useState } from 'react';
import { X, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { registerDemoAccount, resendDemoConfirmation } from '@/lib/demo-auth';

type Props = { isOpen: boolean; onClose: () => void; onSwitchToSignIn: () => void; onRegistrationSuccess: (record: { email: string }) => void };
export function DemoSignupModal({ isOpen, onClose, onSwitchToSignIn, onRegistrationSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState('');
  const [cooldown, setCooldown] = useState(0);
  useEffect(() => { if (!cooldown) return; const timer = setTimeout(() => setCooldown(cooldown - 1), 1000); return () => clearTimeout(timer); }, [cooldown]);
  if (!isOpen) return null;
  return <div role="dialog" aria-modal="true" aria-labelledby="demo-signup-title" className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/70 p-4">
    <div className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-lg border border-border bg-background p-6 text-foreground shadow-xl">
      <div className="flex items-center justify-between gap-3"><h2 id="demo-signup-title" className="text-xl font-bold">Create a demo account</h2><Button variant="ghost" size="icon" onClick={onClose} aria-label="Close signup"><X /></Button></div>
      <p className="my-4 text-sm text-muted-foreground">Demo — not a real bank. Use a new password, not your banking password. No identity documents or financial information.</p>
      {sent ? <div className="space-y-4"><Mail className="h-8 w-8 text-primary" /><h3 className="font-semibold">Check your email</h3><p className="text-sm">Your confirmation request was accepted. Open the link in your inbox or spam folder, then sign in with your email and password.</p><p className="text-sm text-muted-foreground">Email confirmation is separate from approval. This demo does not open a bank account.</p><Button className="w-full" disabled={busy || cooldown > 0} onClick={async () => { setBusy(true); setMessage(''); try { await resendDemoConfirmation(email); setCooldown(60); setMessage('Confirmation request accepted. Check your inbox and spam folder.'); } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to request an email.'); } finally { setBusy(false); } }}>{cooldown ? `Resend in ${cooldown}s` : 'Resend confirmation link'}</Button><Button variant="outline" className="w-full" onClick={onSwitchToSignIn}>Go to sign in</Button></div> : <form className="space-y-4" onSubmit={async event => { event.preventDefault(); setBusy(true); setMessage(''); try { await registerDemoAccount(email, password, username); setPassword(''); setSent(true); setCooldown(60); onRegistrationSuccess({ email: email.trim().toLowerCase() }); } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to create account.'); } finally { setBusy(false); } }}>
        <label className="block text-sm font-medium">Demo username<input required pattern="[a-zA-Z0-9_-]{4,30}" minLength={4} maxLength={30} autoComplete="nickname" value={username} onChange={e => setUsername(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background p-2" /></label>
        <label className="block text-sm font-medium">Email address<input type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background p-2" /></label>
        <label className="block text-sm font-medium">Demo password<input type="password" required minLength={12} autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background p-2" /></label>
        <Button type="submit" className="w-full" disabled={busy}>{busy ? 'Creating account…' : 'Create demo account'}</Button>
      </form>}
      {message && <p role="status" className="mt-4 text-sm text-destructive">{message}</p>}
    </div>
  </div>;
}
