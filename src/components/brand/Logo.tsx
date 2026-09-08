import { Link } from "@tanstack/react-router";
import logoBlack from "@/assets/Leasedrop_logo-black-cmyk.svg.asset.json";
import logoWhite from "@/assets/Leasedrop_logo-white-cmyk.svg.asset.json";

export function Logo({
  variant = "black",
  className = "h-7 w-auto",
}: {
  variant?: "black" | "white";
  className?: string;
}) {
  const asset = variant === "white" ? logoWhite : logoBlack;
  return (
    <Link to="/" aria-label="Leasedrop home" className="inline-flex items-center">
      <img
        src={asset.url}
        alt="Leasedrop"
        width={567}
        height={134}
        className={className}
        style={{ aspectRatio: "566.92913 / 133.89916" }}
      />
    </Link>
  );
}
