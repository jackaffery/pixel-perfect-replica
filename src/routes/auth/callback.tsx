import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

export const Route = createFileRoute('/auth/callback')({
  head: () => ({
    meta: [
      { title: 'Confirm Email | West Side Financial Institution' },
      { name: 'description', content: 'Email verification for West Side Financial Institution.' },
      { property: 'og:title', content: 'Confirm Email | West Side Financial Institution' },
      { property: 'og:description', content: 'Email confirmation for West Side Financial Institution.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: Callback,
});

function Callback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your email address and establishing your secure account session…');
  const [targetEmail, setTargetEmail] = useState('');

  useEffect(() => {
    let active = true;

    async function confirm() {
      const params = new URLSearchParams(window.location.search);
      const hash = new URLSearchParams(window.location.hash.slice(1));
      let failed = Boolean(params.get('error') || hash.get('error'));
      const code = params.get('code');

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) failed = true;
      }

      // Check current user
      const { data, error } = await supabase.auth.getUser();

      if (!active) return;

      const user = data?.user;
      const verified = !failed && !error && (user?.email_confirmed_at || user?.email);

      if (verified && user?.email) {
        const email = user.email.toLowerCase().trim();
        setTargetEmail(email);

        // Update local client storage so user is verified and signed in
        try {
          // 1. Update customer auth cache
          const rawAuth = localStorage.getItem(`wsb_customer_auth_${email}`);
          if (rawAuth) {
            const authObj = JSON.parse(rawAuth);
            authObj.email_verified = true;
            localStorage.setItem(`wsb_customer_auth_${email}`, JSON.stringify(authObj));
          }

          // 2. Update controlled users list
          const rawCtrl = localStorage.getItem('us_finance_bank_controlled_users');
          if (rawCtrl) {
            const ctrlList = JSON.parse(rawCtrl);
            const updated = ctrlList.map((u: any) =>
              u.email?.toLowerCase().trim() === email ? { ...u, email_verified: true, status: 'active' } : u
            );
            localStorage.setItem('us_finance_bank_controlled_users', JSON.stringify(updated));
          }

          // 3. Establish active logged-in customer session
          const displayName =
            user.user_metadata?.["display_name"] ||
            user.user_metadata?.["username"] ||
            email.split('@')[0];

          const newSession = {
            customerName: displayName,
            checkingBalance: 0.0,
            savingsBalance: 0.0,
            email,
            isNewUser: false,
            kycStatus: 'Verified',
          };

          localStorage.setItem('us_finance_bank_customer_session', JSON.stringify(newSession));
          localStorage.setItem('us_finance_bank_active_customer', JSON.stringify(newSession));
        } catch (e) {
          console.warn('Session setup warning:', e);
        }

        setStatus('success');
        setMessage(
          `Your email address (${email}) has been successfully verified! You are now logged in and can directly access your customer account profile.`
        );

        // Auto-redirect to account profile after 2.5 seconds
        setTimeout(() => {
          if (active) {
            navigate({ to: '/account' });
          }
        }, 2500);
      } else {
        setStatus('error');
        setMessage(
          'This verification link is invalid, expired, or has already been used. Please sign in or request a new verification link.'
        );
      }

      window.history.replaceState({}, '', '/auth/callback');
    }

    void confirm();
    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 text-slate-800">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 shadow-2xl text-center space-y-5">
        {status === 'verifying' && (
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0055b8]/10 text-[#0055b8]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        )}

        {status === 'success' && (
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
            <CheckCircle2 className="h-9 w-9" />
          </div>
        )}

        {status === 'error' && (
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/30">
            <AlertCircle className="h-9 w-9" />
          </div>
        )}

        <div>
          <span className="text-[0.68rem] uppercase tracking-widest font-black text-[#0055b8]">
            West Side Financial Institution
          </span>
          <h1 className="mt-1 text-2xl font-black text-slate-900">
            {status === 'verifying'
              ? 'Verifying Email…'
              : status === 'success'
              ? 'Email Verified'
              : 'Verification Link Issue'}
          </h1>
        </div>

        <p role="status" className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
          {message}
        </p>

        {status === 'success' && (
          <div className="pt-2 space-y-2">
            <Button
              asChild
              className="w-full bg-[#0055b8] hover:bg-blue-700 font-bold text-white py-3 shadow-md text-sm"
            >
              <Link to="/account">
                Access Account Profile
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
            <p className="text-[0.72rem] text-slate-400">
              Redirecting to your dashboard in a moment…
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="pt-2">
            <Button
              asChild
              className="w-full bg-[#0055b8] hover:bg-blue-700 font-bold text-white py-3 shadow-md"
            >
              <Link to="/">Return to Sign In</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
