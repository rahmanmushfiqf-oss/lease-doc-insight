import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * PLACEHOLDER COPY: quotes, names and firms below are illustrative
 * placeholders and must be replaced with approved client testimonials.
 */
const testimonials = [
  {
    quote:
      "We stopped hunting through folders. The answer arrives with the clause attached, so the team can act on it the same day.",
    name: "Asset Manager",
    role: "Regional office and industrial portfolio",
  },
  {
    quote:
      "Every figure can be traced back to the document it came from. That changes how confident we are in what we report.",
    name: "Portfolio Director",
    role: "UK multi sector investor",
  },
  {
    quote:
      "Reviewing a new acquisition used to mean weeks of reading. Now the record is structured before we even start.",
    name: "Chartered Surveyor",
    role: "Commercial agency and advisory",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const go = useCallback((next: number) => {
    setIndex(((next % testimonials.length) + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused || reduced.current) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[96rem] px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[490] text-2xl leading-[1.1] sm:text-3xl lg:text-[2.6rem]">
            What Property Teams Say
          </h2>
        </div>

        <div
          className="mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          role="group"
          aria-roledescription="carousel"
          aria-label="Testimonials"
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div
              className="flex motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <figure
                  key={t.name}
                  className="w-full shrink-0 p-8 text-center sm:p-12 lg:p-16"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${testimonials.length}`}
                  aria-hidden={i !== index}
                >
                  <span aria-hidden="true" className="font-display text-4xl leading-none text-primary">
                    &ldquo;
                  </span>
                  <blockquote className="mx-auto mt-4 max-w-4xl text-lg leading-relaxed">{t.quote}</blockquote>
                  <figcaption className="mx-auto mt-8 max-w-4xl border-t border-border pt-5">
                    <p className="font-medium">{t.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show testimonial ${i + 1}: ${t.name}`}
                aria-current={i === index}
                className={`btn-base h-2.5 rounded-full border border-border transition-all duration-200 ease-out ${
                  i === index ? "w-10 bg-primary" : "w-2.5 bg-silver hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
