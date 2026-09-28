import type { Metadata } from "next";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "The terms that apply when you use the Smile Hypermarket website and take part in Smile offers.",
  path: "/terms",
});

// Starter terms text — have it reviewed by your legal adviser before launch.
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="These terms apply to your use of the Smile Hypermarket website and to the offers and promotions shown on it."
      updated="September 2026"
      sections={[
        {
          heading: "Website content",
          body: [
            "We work hard to keep outlet details, opening hours and offers accurate, but information may change without notice. Please contact your outlet to confirm details before visiting.",
          ],
        },
        {
          heading: "Offers and promotions",
          body: [
            "All offers are valid for the dates stated, at participating outlets and while stocks last. Prices, products and availability may differ between outlets and between India and the UAE. Individual campaign terms also apply.",
          ],
        },
        {
          heading: "Intellectual property",
          body: ["The Smile Hypermarket name, logo and website content belong to Smile Hypermarket and may not be used without permission."],
        },
        {
          heading: "Contact",
          body: [`Questions about these terms can be sent to ${site.email}.`],
        },
      ]}
    />
  );
}
