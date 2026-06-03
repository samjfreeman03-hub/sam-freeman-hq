import Link from "next/link";

export function Monogram({ asLink = true }: { asLink?: boolean }) {
  const mark = <span className="monogram" aria-hidden>SF</span>;
  if (!asLink) return mark;
  return (
    <Link href="/" aria-label="Sam Freeman — HQ" className="inline-flex">
      {mark}
    </Link>
  );
}
