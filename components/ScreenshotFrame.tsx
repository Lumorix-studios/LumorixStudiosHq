import { type ImgHTMLAttributes } from "react";
export interface ScreenshotFrameProps
  extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  /** Caption shown in the macOS title bar, e.g. the file name. */
  title?: string;
}

export default function ScreenshotFrame({
  src,
  alt = "",
  title,
  className,
  ...imgProps
}: ScreenshotFrameProps) {
  return (
    <div
      className={`
        mx-auto my-6
        max-w-4xl
        overflow-hidden
        rounded-lg
        border border-zinc-800
        bg-zinc-950/80 shadow-2xl
        ${className ?? ""}
      `}
    >
      {/* macOS title bar with traffic-light buttons */}
      <div
        className={`
          flex h-10 items-center gap-2
          rounded-t-lg
          bg-zinc-900 px-3
          ring-1 ring-inset ring-zinc-800
        `}
      >
        <span
          aria-hidden="true"
          className="h-3 w-3 shrink-0 rounded-full bg-[#ff5f57] shadow"
        />
        <span
          aria-hidden="true"
          className="h-3 w-3 shrink-0 rounded-full bg-[#febc24] shadow"
        />
        <span
          aria-hidden="true"
          className="h-3 w-3 shrink-0 rounded-full bg-[#28c84a] shadow"
        />
        {title ? (
          <span className="ml-3 text-xs text-zinc-400">{title}</span>
        ) : null}
      </div>

      {/* The screenshot itself */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`
          block
          h-auto
          w-full
          max-h-[62vh]
          rounded-b-lg
          object-contain
          object-center
        `}
        {...imgProps}
      />
    </div>
  );
}
