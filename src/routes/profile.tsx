import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/profile")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Profile | West Side Financial Institution" },
      { name: "description", content: "Edit your demo profile details and profile picture." },
      { property: "og:title", content: "My Profile | West Side Financial Institution" },
      { property: "og:description", content: "Demo profile settings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

const USERNAME = /^[a-z0-9_-]{4,30}$/;

function ProfilePage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatarPath, setAvatarPath] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const signUrl = async (path: string | null) => {
    if (!path) return setAvatarUrl(null);
    const { data } = await supabase.storage.from("avatars").createSignedUrl(path, 3600);
    setAvatarUrl(data?.signedUrl ?? null);
  };

  useEffect(() => {
    void (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) { setLoading(false); return; }
      setUserId(data.user.id);
      const { data: p, error } = await supabase.from("profiles").select("username, display_name, avatar_path").eq("id", data.user.id).maybeSingle();
      if (error) { setIsError(true); setMessage("Could not load your profile."); }
      if (p) { setUsername(p.username); setDisplayName(p.display_name); setAvatarPath(p.avatar_path); await signUrl(p.avatar_path); }
      setLoading(false);
    })();
  }, []);

  const flash = (text: string, err = false) => { setMessage(text); setIsError(err); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    const u = username.trim().toLowerCase();
    if (!USERNAME.test(u)) return flash("Username must be 4–30 letters, numbers, - or _.", true);
    if (displayName.trim().length > 80) return flash("Display name is too long.", true);
    setBusy(true);
    const { error } = await supabase.from("profiles").update({ username: u, display_name: displayName.trim() }).eq("id", userId);
    setBusy(false);
    if (error) flash("Could not save your profile. Try again.", true); else { setUsername(u); flash("Profile saved."); }
  };

  const upload = async (file: File | undefined) => {
    if (!file || !userId) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return flash("Use a JPG, PNG or WebP image.", true);
    if (file.size > 5 * 1024 * 1024) return flash("Image must be 5 MB or smaller.", true);
    setBusy(true);
    const path = `${userId}/avatar-${Date.now()}.${file.type.split("/")[1]}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file, { contentType: file.type });
    if (error) { setBusy(false); return flash("Upload failed. Try again.", true); }
    const { error: dbErr } = await supabase.from("profiles").update({ avatar_path: path }).eq("id", userId);
    if (dbErr) { await supabase.storage.from("avatars").remove([path]); setBusy(false); return flash("Could not save the picture.", true); }
    if (avatarPath) await supabase.storage.from("avatars").remove([avatarPath]);
    setAvatarPath(path); await signUrl(path); setBusy(false); flash("Profile picture saved.");
  };

  const signOut = async () => { await supabase.auth.signOut(); await navigate({ to: "/", replace: true }); };

  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto max-w-lg py-10">
        <p className="text-sm font-semibold text-destructive">Demo — not a real bank</p>
        <h1 className="my-4 text-2xl font-bold">My profile</h1>
        {loading ? <p role="status">Loading…</p> : !userId ? (
          <div className="space-y-4"><p>Sign in to edit your profile.</p><Button asChild><Link to="/">Go to sign in</Link></Button></div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-2xl font-bold">
                {avatarUrl ? <img src={avatarUrl} alt="Your profile picture" className="h-full w-full object-cover" /> : (displayName || username).slice(0, 1).toUpperCase()}
              </div>
              <label className="cursor-pointer text-sm font-medium text-primary underline">
                {avatarPath ? "Change picture" : "Add picture"}
                <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" disabled={busy} onChange={e => { void upload(e.target.files?.[0]); e.target.value = ""; }} />
              </label>
            </div>
            <form onSubmit={save} className="space-y-4">
              <label className="block text-sm font-medium">Username<input value={username} onChange={e => setUsername(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background p-2" /></label>
              <label className="block text-sm font-medium">Display name<input value={displayName} maxLength={80} onChange={e => setDisplayName(e.target.value)} className="mt-1 w-full rounded-md border border-input bg-background p-2" /></label>
              <Button type="submit" disabled={busy} className="w-full">{busy ? "Saving…" : "Save profile"}</Button>
            </form>
            {message && <p role="status" className={isError ? "text-sm text-destructive" : "text-sm text-primary"}>{message}</p>}
            <div className="flex gap-3"><Button variant="outline" asChild><Link to="/account">Back to account</Link></Button><Button variant="ghost" onClick={() => void signOut()}>Sign out</Button></div>
          </div>
        )}
      </div>
    </main>
  );
}
