export type Values = Record<string, string>;
export type Rule = (value: string, values: Values) => string | undefined;
export type Schema<K extends string = string> = Partial<Record<K, Rule[]>>;
export type Errors<K extends string = string> = Partial<Record<K, string>>;

export const required =
  (message = "This field is required."): Rule =>
  (v) =>
    v.trim() ? undefined : message;

export const email =
  (message = "Please enter a valid email address."): Rule =>
  (v) =>
    !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? undefined : message;

/** Accepts Indian and UAE numbers with or without country code, spaces or dashes. */
export const phone =
  (message = "Please enter a valid phone number."): Rule =>
  (v) => {
    if (!v) return undefined;
    const digits = v.replace(/[\s\-()]/g, "");
    return /^\+?\d{9,15}$/.test(digits) ? undefined : message;
  };

export const minLength =
  (min: number, message?: string): Rule =>
  (v) =>
    !v || v.trim().length >= min ? undefined : (message ?? `Please enter at least ${min} characters.`);

export function validate<K extends string>(values: Values, schema: Schema<K>): Errors<K> {
  const errors: Errors<K> = {};
  for (const key of Object.keys(schema) as K[]) {
    for (const rule of schema[key] ?? []) {
      const err = rule(values[key] ?? "", values);
      if (err) {
        errors[key] = err;
        break;
      }
    }
  }
  return errors;
}

export const MAX_RESUME_BYTES = 5 * 1024 * 1024;
export const RESUME_TYPES = [".pdf", ".doc", ".docx"];

export function validateResume(file: File | null): string | undefined {
  if (!file) return "Please attach your resume.";
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!RESUME_TYPES.includes(ext)) return "Please upload a PDF or Word document.";
  if (file.size > MAX_RESUME_BYTES) return "File is too large — the maximum size is 5 MB.";
  return undefined;
}
