import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { buildPageSchema } from "@/lib/schema";

type Props = {
  path: string;
  title: string;
  description: string;
  updated: string;
  children: React.ReactNode;
};

export function LegalPage({ path, title, description, updated, children }: Props) {
  const crumbs = [{ name: title, path }];
  return (
    <>
      <JsonLd schema={buildPageSchema({ path, title, description, crumbs })} />
      <PageHero title={title} crumbs={crumbs} />
      <div className="prose-legal container-page max-w-3xl py-12">
        <p className="text-sm !text-muted">Last updated: {updated}</p>
        {children}
      </div>
    </>
  );
}
