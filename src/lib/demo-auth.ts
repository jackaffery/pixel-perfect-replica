import { supabase } from '@/integrations/supabase/client';
export function authMessage(error: { status?: number | undefined; code?: string | undefined }): string {
  if (error.status === 429) return 'Too many requests. Please wait before trying again.';
  if (error.code === 'email_not_confirmed') return 'Confirm your email before signing in. Request a new link below.';
  return 'Unable to complete the request. Check your details and try again.';
}
export async function registerDemoAccount(email: string, password: string, username: string) {
  const { data, error } = await supabase.auth.signUp({ email: email.trim().toLowerCase(), password, options: { emailRedirectTo: `${window.location.origin}/auth/callback`, data: { username: username.trim().toLowerCase(), display_name: username.trim() } } });
  if (error) throw new Error(authMessage(error));
  if (data.session) { await supabase.auth.signOut(); throw new Error('Email confirmation is disabled. Contact the site owner before continuing.'); }
  return data;
}
export async function resendDemoConfirmation(email: string) {
  const { error } = await supabase.auth.resend({ type: 'signup', email: email.trim().toLowerCase(), options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
  if (error) throw new Error(authMessage(error));
}
