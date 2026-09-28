"use client";

import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { outlets } from "@/data/outlets";
import { email, minLength, phone, required } from "@/lib/forms/validation";
import { submitContactForm } from "@/lib/forms/submit";
import { Button } from "@/components/ui/Button";
import { Field, Select, TextArea, TextInput } from "@/components/forms/Field";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { useFormState } from "@/components/forms/useFormState";

type Key = "fullName" | "phone" | "email" | "outlet" | "subject" | "message";
const SUBJECTS = ["General enquiry", "Product availability", "Offers & promotions", "Feedback", "Supplier / partnership", "Other"];

export function ContactForm({ outletSlug = "" }: { outletSlug?: string }) {
  const { field, errors, handleSubmit, status, submitError, setValues, reset } = useFormState<Key>({
    initial: { fullName: "", phone: "", email: "", outlet: outletSlug, subject: "", message: "" },
    schema: {
      fullName: [required("Please enter your full name."), minLength(2)],
      phone: [required("Please enter your phone number."), phone()],
      email: [required("Please enter your email address."), email()],
      outlet: [required("Please choose an outlet.")],
      subject: [required("Please choose a subject.")],
      message: [required("Please write your message."), minLength(10, "Please add a little more detail (at least 10 characters).")],
    },
    onSubmit: submitContactForm,
  });

  // Keep the outlet field in sync with the outlet selected above the form.
  useEffect(() => {
    if (outletSlug) setValues((v) => ({ ...v, outlet: outletSlug }));
  }, [outletSlug, setValues]);

  if (status === "success") {
    return (
      <FormSuccess
        title="Message sent"
        message="Thank you for contacting Smile Hypermarket. A member of our team will get back to you shortly."
        action={
          <Button variant="outline" onClick={reset}>
            Send another message
          </Button>
        }
      />
    );
  }

  const groups = [
    { label: "India", items: outlets.filter((o) => o.country === "India" && o.status === "open") },
    { label: "UAE", items: outlets.filter((o) => o.country === "UAE" && o.status === "open") },
    { label: "Coming soon", items: outlets.filter((o) => o.status === "coming-soon") },
  ];

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <Field id="fullName" label="Full Name" required error={errors.fullName} className="sm:col-span-2">
        <TextInput {...field("fullName")} autoComplete="name" />
      </Field>
      <Field id="phone" label="Phone Number" required error={errors.phone}>
        <TextInput {...field("phone")} type="tel" autoComplete="tel" placeholder="+91 or +971" />
      </Field>
      <Field id="email" label="Email" required error={errors.email}>
        <TextInput {...field("email")} type="email" autoComplete="email" />
      </Field>
      <Field id="outlet" label="Outlet" required error={errors.outlet}>
        <Select {...field("outlet")}>
          <option value="">Select an outlet</option>
          {groups.map((g) => (
            <optgroup key={g.label} label={g.label}>
              {g.items.map((o) => (
                <option key={o.slug} value={o.slug}>
                  {o.name}
                </option>
              ))}
            </optgroup>
          ))}
          <option value="general">General / Head office</option>
        </Select>
      </Field>
      <Field id="subject" label="Subject" required error={errors.subject}>
        <Select {...field("subject")}>
          <option value="">Select a subject</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </Field>
      <Field id="message" label="Message" required error={errors.message} className="sm:col-span-2">
        <TextArea {...field("message")} placeholder="How can we help?" />
      </Field>
      <div className="sm:col-span-2">
        <Button
          type="submit"
          size="lg"
          arrow={status !== "submitting"}
          disabled={status === "submitting"}
          icon={status === "submitting" ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : undefined}
        >
          {status === "submitting" ? "Sending…" : "Send Message"}
        </Button>
        {submitError && (
          <p role="alert" className="mt-4 text-sm text-[#c2410c]">
            {submitError}
          </p>
        )}
      </div>
    </form>
  );
}
