import { supabase } from '@/integrations/supabase/client';

export function authMessage(error: { message: string; status?: number; code?: string }): string {
  if (error.status === 429) return 'Too many requests. Please wait before trying again.';
  if (error.code === 'email_not_confirmed') return 'Confirm your email before signing in. You can resend the link below.';
  if (error.code === 'user_already_exists') return 'Try signing in or requesting a new confirmation link.';
  if (error.code === 'weak_password') return 'Choose a stronger password with at least 12 characters.';
  return 'The request could not be completed. Please try again or use password reset.';
}

export async function registerDemoAccount(email: string, password: string, username: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(), password,
    options: { emailRedirectTo: `${window.location.origin}/auth/callback`, data: { username: username.trim().toLowerCase(), display_name: username.trim() } },
  });
  if (error) throw new Error(authMessage(error));
  if (data.session) {
    await supabase.auth.signOut();
    throw new Error('Email confirmation is disabled. Please contact the site owner before continuing.');
  }
  return data;
}

export async function resendDemoConfirmation(email: string) {
  const { error } = await supabase.auth.resend({ type: 'signup', email: email.trim().toLowerCase(), options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
  if (error) throw new Error(authMessage(error));
}
