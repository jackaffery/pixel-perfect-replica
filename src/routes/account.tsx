import { createFileRoute } from "@tanstack/react-router";
import { Index } from "./index";

export const Route = createFileRoute("/account")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Account (Demo) | US Finance Bank" },
      { name: "description", content: "Private demo account area with example balances and transactions." },
      { property: "og:title", content: "My Account (Demo) | US Finance Bank" },
      { property: "og:description", content: "Private demo account area with example data." },
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
