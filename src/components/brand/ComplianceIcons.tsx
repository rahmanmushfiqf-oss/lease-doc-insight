import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Neutral, brand-consistent line icons for the trust grid.
 * These are deliberately NOT official certification marks: ISO, AICPA SOC and
 * IASME Cyber Essentials marks may only be displayed by verified certificate
 * holders under licence, so generic iconography is used instead.
 */
function Line({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Information security management — shield with layered records */
export function IconInfoSecurity(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M24 5 39 10v13c0 10-6.5 16.6-15 20-8.5-3.4-15-10-15-20V10L24 5Z" />
      <path d="M17 21h14M17 27h14M17 33h9" />
    </Line>
  );
}

/** Service controls audit — clipboard with verified tick */
export function IconAuditControls(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M17 9h-4a2 2 0 0 0-2 2v27a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-4" />
      <rect x="18" y="6" width="12" height="6" rx="1.5" />
      <path d="m18 27 4.5 4.5L31 23" />
    </Line>
  );
}

/** Technical controls testing — shield with scan sweep */
export function IconThreatTesting(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M24 5 39 10v13c0 10-6.5 16.6-15 20-8.5-3.4-15-10-15-20V10L24 5Z" />
      <circle cx="22" cy="21" r="6.5" />
      <path d="m27 26 6 6" />
    </Line>
  );
}

/** UK GDPR — data record under lawful protection */
export function IconDataProtection(props: IconProps) {
  return (
    <Line {...props}>
      <ellipse cx="24" cy="12" rx="13" ry="5" />
      <path d="M11 12v11c0 2.8 5.8 5 13 5s13-2.2 13-5V12" />
      <path d="M11 23v11c0 2.8 5.8 5 13 5" />
      <rect x="28" y="30" width="12" height="9" rx="1.5" />
      <path d="M31 30v-3a3 3 0 0 1 6 0v3" />
    </Line>
  );
}

/** Access control — key permissions on a user */
export function IconAccessControl(props: IconProps) {
  return (
    <Line {...props}>
      <circle cx="19" cy="16" r="6.5" />
      <path d="M8 40c0-6.1 4.9-11 11-11h2" />
      <circle cx="31" cy="31" r="5" />
      <path d="m35 34 6 6-2 2-2-2-2 2-2-2" />
    </Line>
  );
}

/** AI governance — model node within an oversight boundary */
export function IconAiGovernance(props: IconProps) {
  return (
    <Line {...props}>
      <rect x="16" y="16" width="16" height="16" rx="3" />
      <circle cx="24" cy="24" r="3.5" />
<path d="M22 8v8M26 8v8M22 32v8M26 32v8M8 22h8M8 26h8M32 22h8M32 26h8" />
    </Line>
  );
}

/** Audit trail — chronological record of verified events */
export function IconAuditTrail(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M12 8h22M12 24h22M12 40h22" />
      <circle cx="12" cy="8" r="2.5" />
      <circle cx="12" cy="24" r="2.5" />
      <circle cx="12" cy="40" r="2.5" />
      <path d="m19 5.5 2 2 4-4M19 21.5l2 2 4-4M19 37.5l2 2 4-4" />
    </Line>
  );
}
