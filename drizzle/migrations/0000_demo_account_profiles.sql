CREATE TABLE public.profiles (
 id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
 username text NOT NULL,
 display_name text NOT NULL DEFAULT '',
 created_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT profiles_username_format CHECK (username ~ '^[a-z0-9_-]{4,30}$'),
 CONSTRAINT profiles_username_unique UNIQUE (username)
);
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own profile" ON public.profiles FOR SELECT TO authenticated USING ((SELECT auth.uid()) = id);
CREATE POLICY "Update own profile" ON public.profiles FOR UPDATE TO authenticated USING ((SELECT auth.uid()) = id) WITH CHECK ((SELECT auth.uid()) = id);
CREATE FUNCTION public.create_demo_profile() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
 INSERT INTO public.profiles(id, username, display_name) VALUES (NEW.id, lower(NEW.raw_user_meta_data ->> 'username'), coalesce(NEW.raw_user_meta_data ->> 'display_name', ''));
 RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.create_demo_profile() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER create_demo_profile_after_signup AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_demo_profile();