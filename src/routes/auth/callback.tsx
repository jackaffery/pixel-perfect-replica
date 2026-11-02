import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
export const Route = createFileRoute('/auth/callback')({ head: () => ({ meta: [{ title: 'Confirm Email | West Side Financial Institution' }, { name: 'description', content: 'Email verification for West Side Financial Institution.' }, { property: 'og:title', content: 'Confirm Email | West Side Financial Institution' }, { property: 'og:description', content: 'Email confirmation for West Side Financial Institution.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex' }] }), component: Callback });
function Callback() {
  const [status, setStatus] = useState('Verifying your email address…');
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
      setStatus(!failed && !error && data.user?.email_confirmed_at ? 'Your email address has been verified successfully. Welcome to West Side Financial Institution. You can now sign in to access your digital banking account.' : 'This verification link is invalid, expired, or has already been used. Please request a new verification link from the sign-in page.');
      window.history.replaceState({}, '', '/auth/callback');
    }
    void confirm(); return () => { active = false; };
  }, []);
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl text-center space-y-5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0055b8] text-white shadow-lg">
          <span className="font-bold text-xl">W</span>
        </div>
        <div>
          <span className="text-[0.68rem] uppercase tracking-widest font-bold text-[#0055b8]">
            West Side Financial Institution
          </span>
          <h1 className="mt-1 text-2xl font-black text-slate-900">Email Verification</h1>
        </div>
        <p role="status" className="text-sm text-slate-600 leading-relaxed">
          {status}
        </p>
        <Button asChild className="w-full bg-[#0055b8] hover:bg-blue-700 font-bold text-white py-3 shadow-md">
          <Link to="/">Return to Sign In</Link>
        </Button>
      </div>
    </main>
  );
}
