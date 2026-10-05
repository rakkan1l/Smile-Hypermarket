import { EditorialHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <EditorialHero
      eyebrow="404"
      title="This aisle doesn't exist."
      description="The page you're looking for may have moved. Let's get you back to somewhere familiar."
    >
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/" arrow>
          Back to Home
        </ButtonLink>
        <ButtonLink href="/outlets" variant="outline">
          Find an Outlet
        </ButtonLink>
      </div>
    </EditorialHero>
  );
}
