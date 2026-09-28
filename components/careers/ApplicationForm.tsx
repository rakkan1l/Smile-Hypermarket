"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { openJobs } from "@/data/jobs";
import { email, minLength, phone, required } from "@/lib/forms/validation";
import { RESUME_TYPES, validateResume } from "@/lib/forms/validation";
import { submitJobApplication } from "@/lib/forms/submit";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Field, Select, TextArea, TextInput } from "@/components/forms/Field";
import { FileInput } from "@/components/forms/FileInput";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { useFormState } from "@/components/forms/useFormState";

const EXPERIENCE = ["Fresher", "Less than 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"];
type Key = "fullName" | "phone" | "whatsapp" | "email" | "location" | "position" | "experience" | "message";

export function ApplicationForm({ defaultPosition = "" }: { defaultPosition?: string }) {
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string>();

  const { field, handleSubmit, status, submitError, errors } = useFormState<Key>({
    initial: { fullName: "", phone: "", whatsapp: "", email: "", location: "", position: defaultPosition, experience: "", message: "" },
    schema: {
      fullName: [required("Please enter your full name."), minLength(2)],
      phone: [required("Please enter your phone number."), phone()],
      whatsapp: [phone("Please enter a valid WhatsApp number.")],
      email: [required("Please enter your email address."), email()],
      location: [required("Please tell us where you are currently based.")],
      position: [required("Please choose the position you are applying for.")],
      experience: [required("Please select your experience.")],
    },
    extraValidate: () => {
      const err = validateResume(resume);
      setResumeError(err);
      return { resume: err };
    },
    onSubmit: submitJobApplication,
  });

  if (status === "success") {
    return (
      <FormSuccess
        title="Application received"
        message="Thank you for your interest in Smile Hypermarket. Our team will contact shortlisted candidates."
        action={
          <ButtonLink href="/careers" variant="outline" arrow>
            View other positions
          </ButtonLink>
        }
      />
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2" aria-describedby="application-note">
      <Field id="fullName" label="Full Name" required error={errors.fullName} className="sm:col-span-2">
        <TextInput {...field("fullName")} autoComplete="name" />
      </Field>
      <Field id="phone" label="Phone Number" required error={errors.phone}>
        <TextInput {...field("phone")} type="tel" autoComplete="tel" placeholder="+91 or +971" />
      </Field>
      <Field id="whatsapp" label="WhatsApp Number" error={errors.whatsapp} hint="If different from your phone number">
        <TextInput {...field("whatsapp")} type="tel" hint="If different from your phone number" />
      </Field>
      <Field id="email" label="Email" required error={errors.email}>
        <TextInput {...field("email")} type="email" autoComplete="email" />
      </Field>
      <Field id="location" label="Current Location" required error={errors.location}>
        <TextInput {...field("location")} autoComplete="address-level2" placeholder="City, Country" />
      </Field>
      <Field id="position" label="Position Applying For" required error={errors.position}>
        <Select {...field("position")}>
          <option value="">Select a position</option>
          {openJobs.map((j) => (
            <option key={j.slug} value={`${j.position} — ${j.branch}`}>
              {j.position} — {j.branch}
            </option>
          ))}
          <option value="General application">General application</option>
        </Select>
      </Field>
      <Field id="experience" label="Experience" required error={errors.experience}>
        <Select {...field("experience")}>
          <option value="">Select experience</option>
          {EXPERIENCE.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </Select>
      </Field>
      <Field id="resume" label="Resume Upload" required error={resumeError} className="sm:col-span-2">
        <FileInput
          id="resume"
          name="resume"
          accept={RESUME_TYPES.join(",")}
          file={resume}
          error={resumeError}
          onChange={(f) => {
            setResume(f);
            setResumeError(f ? validateResume(f) : undefined);
          }}
        />
      </Field>
      <Field id="message" label="Message" className="sm:col-span-2">
        <TextArea {...field("message")} placeholder="Tell us a little about yourself and why you would like to join Smile." />
      </Field>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="application-note" className="max-w-sm text-sm text-ink-muted">
          Your details are used only to process your application.
        </p>
        <Button type="submit" size="lg" arrow={status !== "submitting"} disabled={status === "submitting"} icon={status === "submitting" ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : undefined}>
          {status === "submitting" ? "Submitting…" : "Submit Application"}
        </Button>
      </div>
      {submitError && (
        <p role="alert" className="text-sm text-[#c2410c] sm:col-span-2">
          {submitError}
        </p>
      )}
    </form>
  );
}
