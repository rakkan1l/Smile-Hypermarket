"use client";

import { useState, type FormEvent } from "react";
import { validate, type Errors, type Schema, type Values } from "@/lib/forms/validation";
import type { SubmitResult } from "@/lib/forms/submit";

/**
 * Minimal form state: controlled values, validate-on-blur after first touch,
 * full validation on submit, focus on the first invalid field.
 */
export function useFormState<K extends string>({
  initial,
  schema,
  onSubmit,
  extraValidate,
}: {
  initial: Record<K, string>;
  schema: Schema<K>;
  onSubmit: (data: FormData) => Promise<SubmitResult>;
  extraValidate?: () => Partial<Record<string, string>>;
}) {
  const [values, setValues] = useState<Record<K, string>>(initial);
  const [errors, setErrors] = useState<Errors<K> & Record<string, string | undefined>>({});
  const [touched, setTouched] = useState<Partial<Record<K, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string>();

  const runValidation = (next: Values) => ({ ...validate<K>(next, schema), ...(extraValidate?.() ?? {}) });

  const field = (name: K) => ({
    id: name,
    name,
    value: values[name],
    error: errors[name],
    onChange: (e: { target: { value: string } }) => {
      const next = { ...values, [name]: e.target.value };
      setValues(next);
      if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validate<K>(next, schema)[name] }));
    },
    onBlur: () => {
      setTouched((t) => ({ ...t, [name]: true }));
      setErrors((prev) => ({ ...prev, [name]: validate<K>(values, schema)[name] }));
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = runValidation(values);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])) as Record<K, boolean>);
    const firstInvalid = Object.keys(found).find((k) => found[k as K]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    setSubmitError(undefined);
    const result = await onSubmit(new FormData(form));
    if (result.ok) setStatus("success");
    else {
      setStatus("error");
      setSubmitError(result.error);
    }
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  return { values, setValues, errors, setErrors, field, handleSubmit, status, submitError, reset };
}
