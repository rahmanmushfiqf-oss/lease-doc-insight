/**
 * PLACEHOLDER COPY: these three proof points are indicative only and
 * should be reviewed and replaced with verified figures before launch.
 */
const proofPoints = [
  {
    value: "10x",
    title: "Faster Answers",
    body: "Teams move from document search to a verified answer in minutes rather than days.",
  },
  {
    value: "100%",
    title: "Traceable to Source",
    body: "Every answer links back to the exact clause, page and document it came from.",
  },
  {
    value: "40+",
    title: "Document Types Understood",
    body: "Leases, amendments, licences, surveys, notices, reports and contracts in one record.",
  },
];

export function ProofGrid() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[96rem] px-5 pb-24 pt-0 lg:px-8 lg:pb-32 lg:pt-0">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[490] text-2xl leading-[1.1] sm:text-3xl lg:text-[2.6rem]">
            Proof in the Detail
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {proofPoints.map((p) => (
            <article
              key={p.title}
              className="card-interactive flex flex-col rounded-2xl border border-border bg-card p-8 text-center"
            >
              <p className="font-display text-4xl font-[490] leading-none text-primary sm:text-5xl">
                {p.value}
              </p>
              <h3 className="mt-5 text-lg font-medium">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProofGrid;
