import type { Metadata } from "next";
import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/ui/LegalPage";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Smile Hypermarket collects, uses and protects the personal information you share with us.",
  path: "/privacy-policy",
});

// Starter policy text — have it reviewed by your legal adviser before launch.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Your trust matters to us. This policy explains what information we collect through this website and how we use it."
      updated="September 2026"
      sections={[
        {
          heading: "Information we collect",
          body: [
            "We collect the details you choose to share with us through our contact and job application forms, such as your name, phone number, WhatsApp number, email address, location and any files you upload.",
            "Like most websites, we may also collect basic technical information such as browser type and pages visited to help us improve the site.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "We use your information only to respond to your enquiry, process your job application, or share information you have asked for. We do not sell your personal information.",
          ],
        },
        {
          heading: "Third-party services",
          body: [
            "This website uses Google Maps to show outlet locations and links to WhatsApp, Instagram and Facebook. When you use these services, their own privacy policies apply.",
          ],
        },
        {
          heading: "Contact",
          body: [`For any privacy question, or to ask us to update or delete your information, email ${site.email}.`],
        },
      ]}
    />
  );
}
