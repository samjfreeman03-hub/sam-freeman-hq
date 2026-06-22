import Image from "next/image";
import type { Logo } from "@/data/profiles";

type LogoTileProps = {
  logo: Logo;
  alt: string;
  /** Pixel size at desktop. Mobile auto-scales to ~85% via CSS. */
  size?: number;
  className?: string;
};

export function LogoTile({ logo, alt, size = 56, className = "" }: LogoTileProps) {
  return (
    <div
      className={`logo-tile ${className}`}
      style={{
        background: logo.bg,
        width: size,
        height: size,
        borderRadius: logo.radius,
      }}
    >
      <div
        className="logo-tile-inner"
        style={{ padding: logo.padding ?? "0" }}
      >
        <Image
          src={logo.src}
          alt={alt}
          width={size * 3}
          height={size * 3}
          className="logo-tile-img"
        />
      </div>
    </div>
  );
}
