import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "US Finance Bank | Online Banking" },
      { name: "description", content: "Experience modern digital banking with US Finance Bank. Secure accounts, digital services, and financial tools designed for your future." },
      { property: "og:title", content: "US Finance Bank | Online Banking" },
      { property: "og:description", content: "Banking Made Simpler. Your Future, Your Finance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "US Finance Bank | Online Banking" },
      { name: "twitter:description", content: "Banking Made Simpler. Your Future, Your Finance." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: "US Finance Bank",
          description: "Modern, secure, multilingual digital banking serving global clients with local currency, ID verification, and 24/7 account protection.",
          url: "https://usfinancebank.internal",
          logo: "https://usfinancebank.internal/favicon.ico",
          currenciesAccepted: "USD, EUR, GBP, CAD, MXN, JPY, CHF, AUD, SGD, VND",
          paymentAccepted: "Credit Card, Wire Transfer, Direct Deposit, Debit Card",
          openingHours: "Mo-Su 00:00-24:00"
        }),
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:wght@400;700&family=Public+Sans:wght@400;500;600;700&display=swap" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
      { rel: "canonical", href: "/" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              #lovable-badge,
              .lovable-badge,
              [data-lovable-badge],
              lovable-badge,
              a[href*="lovable.dev"],
              a[href*="lovable.app"],
              a[href*="gptengineer.app"],
              [class*="lovable"],
              [id*="lovable"],
              [data-component-path*="lovable"],
              div[style*="z-index: 2147483647"],
              div[style*="z-index:2147483647"],
              div[style*="z-index: 9999999"],
              div[style*="z-index:9999999"],
              div[style*="z-index: 999999"],
              div[style*="z-index:999999"],
              div[style*="z-index: 99999"],
              div[style*="z-index:99999"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
                position: absolute !important;
                top: -99999px !important;
                left: -99999px !important;
                width: 0 !important;
                height: 0 !important;
                overflow: hidden !important;
                clip: rect(0, 0, 0, 0) !important;
                transform: scale(0) !important;
              }
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function purge() {
                  try {
                    var selectors = [
                      '#lovable-badge',
                      '.lovable-badge',
                      '[data-lovable-badge]',
                      'lovable-badge',
                      'a[href*="lovable.dev"]',
                      'a[href*="lovable.app"]',
                      'a[href*="gptengineer.app"]',
                      '[class*="lovable"]',
                      '[id*="lovable"]'
                    ];
                    selectors.forEach(function(s) {
                      var nodes = document.querySelectorAll(s);
                      for (var i = 0; i < nodes.length; i++) {
                        nodes[i].remove();
                      }
                    });
                    var all = document.querySelectorAll('body > div, body > a, html > div, html > a');
                    for (var j = 0; j < all.length; j++) {
                      var text = (all[j].innerText || all[j].textContent || '').toLowerCase();
                      if (text.includes('lovable') || text.includes('edit in lovable') || text.includes('made with lovable')) {
                        all[j].remove();
                      }
                    }
                  } catch (e) {}
                }
                if (typeof window !== 'undefined') {
                  purge();
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', purge);
                  }
                  window.addEventListener('load', purge);
                  try {
                    var obs = new MutationObserver(purge);
                    if (document.documentElement) {
                      obs.observe(document.documentElement, { childList: true, subtree: true });
                    }
                  } catch (e) {}
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    // Automatically detect and remove any injected Lovable or third-party watermark elements
    const purgeWatermarks = () => {
      const selectors = [
        '[data-lovable-badge]',
        '#lovable-badge',
        '.lovable-badge',
        'a[href*="lovable.dev"]',
        'a[href*="lovable.app"]',
        'a[href*="gptengineer.app"]',
        'lovable-badge',
        '[class*="lovable"]',
        '[id*="lovable"]',
      ];

      selectors.forEach((sel) => {
        try {
          const els = document.querySelectorAll(sel);
          els.forEach((el) => {
            el.remove();
          });
        } catch {
          // ignore
        }
      });

      // Target fixed elements in corners that link to external domains or carry high z-index
      document.querySelectorAll('body > div, body > a, html > div, html > a').forEach((el) => {
        const text = (el.textContent || '').toLowerCase();
        if (text.includes('lovable') || text.includes('edit in lovable') || text.includes('made with lovable')) {
          el.remove();
        }
      });

      // Inspect open shadow roots if any web components were attached
      try {
        document.querySelectorAll('*').forEach((node) => {
          if (node.shadowRoot) {
            selectors.forEach((sel) => {
              node.shadowRoot?.querySelectorAll(sel).forEach((el) => el.remove());
            });
          }
        });
      } catch {
        // ignore
      }
    };

    purgeWatermarks();
    const interval = setInterval(purgeWatermarks, 500);

    // MutationObserver to immediately detach any dynamically injected watermark node
    const observer = new MutationObserver(() => {
      purgeWatermarks();
    });

    if (document.documentElement) {
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
