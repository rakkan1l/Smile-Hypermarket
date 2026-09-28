/**
 * Form submission handlers.
 *
 * Job applications are submitted to the HR email via Formspree.
 * To activate, create a free form at https://formspree.io, paste the
 * form ID below (the part after formspree.io/f/), and redeploy.
 *
 * Contact form still simulates until a real endpoint is wired up.
 */
export type SubmitResult = { ok: true } | { ok: false; error: string };

/** Formspree form ID for job applications → smilehyperhr@gmail.com */
const CAREERS_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_CAREERS_ID ?? "";

const HR_EMAIL = "smilehyperhr@gmail.com";

export async function submitJobApplication(data: FormData): Promise<SubmitResult> {
  // If a Formspree ID is configured, use it
  if (CAREERS_FORM_ID) {
    try {
      const res = await fetch(`https://formspree.io/f/${CAREERS_FORM_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) return { ok: true };
      const json = await res.json().catch(() => ({}));
      return { ok: false, error: (json as { error?: string }).error ?? "Submission failed. Please try again." };
    } catch {
      return { ok: false, error: "Network error. Please check your connection and try again." };
    }
  }

  // Fallback: open mailto so the application goes directly to HR
  const subject = encodeURIComponent(`Job Application — ${data.get("position") ?? "Open Position"}`);
  const name = data.get("fullName") ?? "";
  const phone = data.get("phone") ?? "";
  const email = data.get("email") ?? "";
  const location = data.get("location") ?? "";
  const experience = data.get("experience") ?? "";
  const message = data.get("message") ?? "";

  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nLocation: ${location}\nExperience: ${experience}\n\n${message}`
  );

  if (typeof window !== "undefined") {
    window.location.href = `mailto:${HR_EMAIL}?subject=${subject}&body=${body}`;
  }

  return { ok: true };
}

const simulate = () => new Promise<SubmitResult>((resolve) => setTimeout(() => resolve({ ok: true }), 900));

export async function submitContactForm(_data: FormData): Promise<SubmitResult> {
  return simulate();
}
