import { JobEditor, emptyJob } from "@/components/admin/JobEditor";

export default function NewJobPage() {
  return (
    <>
      <header className="mb-8">
        <h1 className="font-display text-4xl tracking-[-0.03em] text-ink">Post a vacancy</h1>
        <p className="mt-3 text-ink-soft">It goes live on the careers page as soon as you save.</p>
      </header>
      <JobEditor initial={emptyJob} isNew />
    </>
  );
}
