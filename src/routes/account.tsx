import { createFileRoute } from "@tanstack/react-router";
import { Index } from "./index";

export const Route = createFileRoute("/account")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Account | US Finance Bank" },
      { name: "description", content: "Secure private customer account dashboard, balances, transfers, and security settings." },
      { property: "og:title", content: "My Account | US Finance Bank" },
      { property: "og:description", content: "Secure private customer account portal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AccountPage,
});

function AccountPage() {
  return <Index view="account" />;
}
