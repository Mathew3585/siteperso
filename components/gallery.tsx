"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type Slide =
  | { type: "video"; id: string; poster: string }
  | { type: "image"; src: string };

export function Gallery({
  images,
  alt,
  video,
}: {
  images: string[];
  alt: string;
  video?: { id: string; poster: string };
}) {
  const slides: Slide[] = [
    ...(video ? [{ type: "video", id: video.id, poster: video.poster } as Slide] : []),
    ...images.map((src) => ({ type: "image", src }) as Slide),
  ];
  const [index, setIndex] = useState(0);
  const count = slides.length;
  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);
  const current = slides[index];

  return (
    <div>
      {/* Slide principale : garde le ratio naturel de l'image (pas de bandes) */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {current.type === "video" ? (
              <div className="relative aspect-[16/9] w-full">
                <VideoSlide id={current.id} poster={current.poster} title={alt} />
              </div>
            ) : (
              <Image
                src={current.src}
                alt={`${alt} ${index + 1}/${count}`}
                width={2400}
                height={1600}
                sizes="(max-width: 1280px) 100vw, 1250px"
                className="block h-auto w-full"
                priority={index === 0}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <GalleryArrow side="left" onClick={() => go(-1)} />
            <GalleryArrow side="right" onClick={() => go(1)} />
            <span className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      {/* Miniatures */}
      {count > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {slides.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={s.type === "video" ? "Vidéo" : `Image ${i + 1}`}
              className={cn(
                "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors",
                i === index ? "border-accent" : "border-border opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={s.type === "video" ? s.poster : s.src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
              {s.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function VideoSlide({ id, poster, title }: { id: string; poster: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Lire la vidéo : ${title}`}
      className="group absolute inset-0 h-full w-full"
    >
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt={title} className="h-full w-full object-cover" />
      )}
      <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform group-hover:scale-110">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}

function GalleryArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Précédent" : "Suivant"}
      className={cn(
        "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-accent",
        side === "left" ? "left-3" : "right-3"
      )}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {side === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
