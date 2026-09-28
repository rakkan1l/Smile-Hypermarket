/**
 * Form submission handlers.
 *
 * There is no backend yet, so these simulate a successful request.
 * To go live, replace the body of each function with a real call, e.g.
 *   await fetch("/api/contact", { method: "POST", body: data })
 * or a service such as Formspree, Resend or a CRM webhook.
 * The form components only depend on these function signatures.
 */
export type SubmitResult = { ok: true } | { ok: false; error: string };

const simulate = () => new Promise<SubmitResult>((resolve) => setTimeout(() => resolve({ ok: true }), 900));

export async function submitContactForm(_data: FormData): Promise<SubmitResult> {
  return simulate();
}

export async function submitJobApplication(_data: FormData): Promise<SubmitResult> {
  return simulate();
}
