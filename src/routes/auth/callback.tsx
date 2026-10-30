import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
export const Route = createFileRoute('/auth/callback')({ head: () => ({ meta: [{ title: 'Confirm demo email | West Side Financial Institution' }, { name: 'description', content: 'Email ownership confirmation for demo accounts, not financial services.' }, { property: 'og:title', content: 'Confirm demo email | West Side Financial Institution' }, { property: 'og:description', content: 'Demo account email confirmation.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex' }] }), component: Callback });
function Callback() {
  const [status, setStatus] = useState('Confirming your email…');
  useEffect(() => {
    let active = true;
    async function confirm() {
      const params = new URLSearchParams(window.location.search);
      const hash = new URLSearchParams(window.location.hash.slice(1));
      let failed = Boolean(params.get('error') || hash.get('error'));
      const code = params.get('code');
      if (code) { const { error } = await supabase.auth.exchangeCodeForSession(code); failed ||= Boolean(error); }
      const { data, error } = await supabase.auth.getUser();
      if (!active) return;
      setStatus(!failed && !error && data.user?.email_confirmed_at ? 'Your email is confirmed. You can sign in with your email and password. Approval remains separate.' : 'This confirmation link is invalid, expired, or already used. Request a new link from sign in.');
      window.history.replaceState({}, '', '/auth/callback');
    }
    void confirm(); return () => { active = false; };
  }, []);
  return <main className="min-h-screen bg-background p-6 text-foreground"><div className="mx-auto max-w-lg py-16"><p className="text-sm text-destructive">Demo — not a real bank</p><h1 className="my-4 text-2xl font-bold">Email confirmation</h1><p role="status">{status}</p><Button asChild className="mt-6"><Link to="/">Return to sign in</Link></Button></div></main>;
}
