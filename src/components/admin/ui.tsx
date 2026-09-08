import { Link } from "@tanstack/react-router";
import { type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import type { Status } from "@/lib/content";

export const adminFont = "font-[Inter,ui-sans-serif,system-ui]";

/* ---------- buttons ---------- */

type ButtonVariant = "primary" | "ghost" | "destructive";

export function AdminButton({
  variant = "ghost",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-[18px] py-[9px] text-[13px] font-medium transition-[background-color,border-color,color] duration-150",
        "disabled:cursor-not-allowed disabled:border-transparent disabled:bg-[#F3F3F3] disabled:text-[#C4C4C4]",
        variant === "primary" && "bg-[#0340F3] text-white hover:bg-[#0231cc]",
        variant === "ghost" &&
          "border border-[rgba(26,26,26,0.18)] bg-transparent text-[#1C1C1C] hover:border-[rgba(26,26,26,0.4)]",
        variant === "destructive" &&
          "border border-[rgba(220,38,38,0.2)] bg-transparent text-[#DC2626] hover:bg-[rgba(220,38,38,0.04)]",
        className,
      )}
    />
  );
}

export function AdminLinkButton({
  to,
  params,
  children,
  variant = "ghost",
  className,
}: {
  to: string;
  params?: Record<string, string>;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={to as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params={params as any}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-[18px] py-[9px] text-[13px] font-medium transition-colors duration-150",
        variant === "primary" && "bg-[#0340F3] text-white hover:bg-[#0231cc]",
        variant === "ghost" &&
          "border border-[rgba(26,26,26,0.18)] text-[#1C1C1C] hover:border-[rgba(26,26,26,0.4)]",
        variant === "destructive" && "text-[#DC2626] hover:bg-[rgba(220,38,38,0.04)]",
        className,
      )}
    >
      {children}
    </Link>
  );
}

/* ---------- inputs ---------- */

const fieldClass =
  "w-full rounded-md border border-[rgba(26,26,26,0.12)] bg-[#F7F7F7] px-[14px] py-[10px] text-[14px] font-normal text-[#1C1C1C] placeholder:text-[#A0A0A0] transition-[background-color,border-color,box-shadow] duration-150 focus:bg-white focus:border-[#0340F3] focus:outline-none focus:shadow-[0_0_0_3px_rgba(3,64,243,0.08)] disabled:bg-[#F3F3F3] disabled:text-[#C4C4C4]";

export function AdminInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldClass, className)} />;
}

export function AdminTextarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(fieldClass, "resize-y leading-relaxed", className)} />;
}

export function AdminSelect({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[] | Array<{ value: string; label: string }>;
  className?: string;
}) {
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(fieldClass, "appearance-none pr-8", className)}
    >
      {opts.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Field({
  label,
  helper,
  children,
  counter,
}: {
  label: string;
  helper?: string;
  children: ReactNode;
  counter?: { value: number; limit: number };
}) {
  const ratio = counter ? counter.value / counter.limit : 0;
  return (
    <div className="space-y-2">
      <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#A0A0A0]">{label}</div>
      {children}
      {counter ? (
        <div
          className={cn(
            "text-right text-[11px]",
            ratio > 1 ? "text-[#DC2626]" : ratio > 0.8 ? "text-[#F59E0B]" : "text-[#A0A0A0]",
          )}
        >
          {counter.value} / {counter.limit}
        </div>
      ) : null}
      {helper ? <p className="text-[12px] leading-relaxed text-[#A0A0A0]">{helper}</p> : null}
    </div>
  );
}

/* ---------- badges, pills, toggles ---------- */

export function StatusBadge({ status }: { status: Status | string }) {
  const map: Record<string, string> = {
    published: "bg-[rgba(3,64,243,0.07)] text-[#0340F3] border-[rgba(3,64,243,0.15)]",
    Published: "bg-[rgba(3,64,243,0.07)] text-[#0340F3] border-[rgba(3,64,243,0.15)]",
    draft: "bg-[#F3F3F3] text-[#6B6B6B] border-transparent",
    scheduled: "bg-[rgba(255,219,90,0.15)] text-[#7A5F00] border-transparent",
    Invited: "bg-[rgba(255,219,90,0.15)] text-[#7A5F00] border-transparent",
    Active: "bg-[rgba(34,197,94,0.08)] text-[#166534] border-transparent",
    Suspended: "bg-[#F3F3F3] text-[#6B6B6B] border-transparent",
  };
  const label =
    typeof status === "string" && status.length && status[0] === status[0]!.toUpperCase()
      ? status
      : status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium",
        map[status] ?? "bg-[#F3F3F3] text-[#6B6B6B] border-transparent",
      )}
    >
      {label}
    </span>
  );
}

export function FormatPill({ format }: { format: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[rgba(26,26,26,0.12)] bg-[#F3F3F3] px-2.5 py-1 text-[11px] font-medium text-[#1C1C1C]">
      {format}
    </span>
  );
}

export function RoleBadge({ role }: { role: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium capitalize",
        role === "admin"
          ? "border-[rgba(3,64,243,0.15)] bg-[rgba(3,64,243,0.07)] text-[#0340F3]"
          : "border-transparent bg-[#F3F3F3] text-[#6B6B6B]",
      )}
    >
      {role}
    </span>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  helper,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  helper?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "mt-0.5 h-5 w-9 shrink-0 rounded-full p-0.5 transition-colors duration-150",
          checked ? "bg-[#0340F3]" : "bg-[#E0E0E0]",
        )}
      >
        <span
          className={cn(
            "block h-4 w-4 rounded-full bg-white transition-transform duration-150",
            checked && "translate-x-4",
          )}
        />
      </button>
      <div>
        <div className="text-[13px] text-[#1C1C1C]">{label}</div>
        {helper ? <p className="mt-1 text-[12px] leading-relaxed text-[#A0A0A0]">{helper}</p> : null}
      </div>
    </div>
  );
}

export function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="inline-flex w-full rounded-lg bg-[#F3F3F3] p-[3px]">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              "flex-1 rounded-md px-[14px] py-[6px] text-[13px] font-medium transition-colors duration-150",
              active
                ? cn(
                    "bg-white shadow-[0_1px_3px_rgba(26,26,26,0.1)]",
                    o.value === "published" ? "text-[#0340F3]" : "text-[#1C1C1C]",
                  )
                : "text-[#6B6B6B]",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors duration-150",
        active ? "bg-[#0340F3] text-white" : "bg-[#F3F3F3] text-[#6B6B6B] hover:bg-[#EAEAEA]",
      )}
    >
      {children}
    </button>
  );
}

/* ---------- surfaces ---------- */

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-[rgba(26,26,26,0.08)] bg-white p-6", className)}>
      {children}
    </div>
  );
}

export function PanelSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-b border-[rgba(26,26,26,0.07)] p-5 last:border-b-0">
      <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.08em] text-[#A0A0A0]">
        {title}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function EmptyState({
  icon,
  heading,
  description,
  action,
}: {
  icon: ReactNode;
  heading: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="text-[#D4D4D4]">{icon}</div>
      <h3 className="mt-4 text-[15px] font-semibold text-[#1C1C1C]">{heading}</h3>
      <p className="mt-2 max-w-[280px] text-[13px] text-[#A0A0A0]">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[rgba(26,26,26,0.4)]" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-lg overflow-hidden rounded-[14px] bg-white shadow-[0_8px_40px_rgba(26,26,26,0.12)]"
      >
        <div className="border-b border-[rgba(26,26,26,0.08)] px-6 py-4 text-[16px] font-semibold text-[#1C1C1C]">
          {title}
        </div>
        <div className="px-6 py-5 text-[13px] text-[#1C1C1C]">{children}</div>
        {footer ? (
          <div className="flex justify-end gap-2 border-t border-[rgba(26,26,26,0.08)] px-6 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ---------- table ---------- */

export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[rgba(26,26,26,0.08)] bg-white">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[rgba(26,26,26,0.08)] bg-[#FAFAFA]">
            {head.map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-[12px] font-medium uppercase tracking-[0.06em] text-[#6B6B6B]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function Row({ children }: { children: ReactNode }) {
  return (
    <tr className="group border-b border-[rgba(26,26,26,0.06)] text-[14px] text-[#1C1C1C] transition-colors last:border-b-0 hover:bg-[#FAFAFA]">
      {children}
    </tr>
  );
}

export function Cell({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn("px-4 py-3 align-middle", className)}>{children}</td>;
}

export function RowActions({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end gap-3 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
      {children}
    </div>
  );
}

export function TextAction({
  onClick,
  children,
  tone = "default",
  disabled = false,
}: {
  onClick: () => void;
  children: ReactNode;
  tone?: "default" | "danger";
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "text-[13px] font-medium transition-colors disabled:cursor-not-allowed disabled:text-[#C4C4C4]",
        tone === "danger" ? "text-[#DC2626]" : "text-[#6B6B6B] hover:text-[#1C1C1C]",
      )}
    >
      {children}
    </button>
  );
}
