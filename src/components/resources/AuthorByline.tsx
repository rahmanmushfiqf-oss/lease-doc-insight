import { Link } from "@tanstack/react-router";

import shorfulImg from "@/assets/dr-shorful-islam.webp.asset.json";
import siddiqueImg from "@/assets/siddique-miah.webp.asset.json";
import { authorByName } from "@/lib/content";

export const authorAvatar = (image: "siddique" | "shorful") =>
  image === "siddique" ? siddiqueImg.url : shorfulImg.url;

type Props = {
  /** Author display name as stored on the post. */
  name: string;
  /** Extra text shown after the name, e.g. date and read time. */
  meta?: string;
  className?: string;
};

/** Small clickable byline: author photo, name linking to their profile, optional meta. */
export function AuthorByline({ name, meta, className = "" }: Props) {
  const author = authorByName(name);

  return (
    <p className={`flex items-center gap-2.5 text-xs text-muted-foreground ${className}`}>
      {author ? (
        <img
          src={authorAvatar(author.image)}
          alt={`${author.name}, ${author.role} at Leasedrop`}
          loading="lazy"
          className="size-7 shrink-0 rounded-full border border-border object-cover"
        />
      ) : (
        <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] text-background">
          {name.charAt(0)}
        </span>
      )}
      <span>
        {author ? (
          <Link
            to="/authors/$slug"
            params={{ slug: author.slug }}
            className="font-medium text-foreground transition-colors hover:text-primary"
          >
            {author.name}
          </Link>
        ) : (
          <span className="font-medium text-foreground">{name}</span>
        )}
        {meta ? <span className="text-muted-foreground"> · {meta}</span> : null}
      </span>
    </p>
  );
}
