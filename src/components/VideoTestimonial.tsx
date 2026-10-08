"use client";

import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useState, useEffect, useRef } from "react";

export type VideoTestimonial = {
  id: string;
  name: string;
  personType: "student" | "parent";
  country: string;
  university?: string;
  result?: string;
  quote?: string;
  videoUrl: string;
  thumbnailUrl: string;
  photos?: string | null;
  featured: boolean;
  displayOrder: number;
  published: boolean;
};

function VideoFrameCard({
  testimonial,
  onPlay,
}: {
  testimonial: VideoTestimonial;
  onPlay: (id: string) => void;
}) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-ink-line bg-white shadow-card hover:shadow-card-hover transition-all duration-300"
      onClick={() => onPlay(testimonial.id)}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={testimonial.thumbnailUrl}
          alt={`${testimonial.name}'s testimonial`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-ocean shadow-xl transition-all duration-200 group-hover:scale-110 group-hover:rotate-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 ml-0.5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-base font-bold text-ocean-deep">
            {testimonial.name}
          </h3>
          <span className="inline-flex items-center rounded-full bg-ocean/10 px-2.5 py-0.5 text-[11px] font-bold text-ocean">
            {testimonial.personType}
          </span>
        </div>

        <p className="mt-1.5 text-sm text-mist-muted">
          {testimonial.country}
          {testimonial.university && ` · ${testimonial.university}`}
        </p>

        {testimonial.result && (
          <p className="mt-1 text-sm font-medium text-ocean-deep">
            {testimonial.result}
          </p>
        )}

        {testimonial.quote && (
          <blockquote className="mt-2 text-xs italic text-mist/80 line-clamp-2">
            "{testimonial.quote}"
          </blockquote>
        )}
      </div>
    </div>
  );
}

function PhotoCarousel({
  photos,
  testimonial,
  currentIndex,
  onPhotoClick,
}: {
  photos: string[];
  testimonial: VideoTestimonial;
  currentIndex: number;
  onPhotoClick: (id: string, photoIndex: number) => void;
}) {
  const [isHovering, setIsHovering] = useState(false);

  if (!photos || photos.length === 0) return null;

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onPhotoClick(testimonial.id, currentIndex)}
    >
      <div className="relative">
        {photos.map((photo, index) => (
          <div
            key={index}
            className={`absolute transition-all duration-500 ${
              index === currentIndex
                ? "opacity-100 translate-x-0"
                : index < currentIndex
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
            }`}
            style={{
              transitionDelay: `${index * 50}ms`,
            }}
          >
            <Image
              src={photo}
              alt={`${testimonial.name}'s photo ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover rounded-2xl"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {isHovering && photos.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-ocean text-white shadow-lg hover:bg-ocean-deep transition-all duration-200"
          aria-label="Previous photo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {photos.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
          {photos.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`h-2 w-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-ocean shadow-md"
                  : "bg-mist-muted/40 hover:bg-mist-muted"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onPhotoClick(testimonial.id, index);
              }}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function VideoTestimonials({
  videos = [],
}: {
  videos?: VideoTestimonial[];
}) {
  const reduced = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);

  const published = videos.filter((v) => v.published);

  // Parse photos JSON strings to arrays
  const parsePhotos = (photosJson?: string | null): string[] => {
    if (!photosJson) return [];
    try {
      const parsed = JSON.parse(photosJson);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // Fallback: split by comma if it's a comma-separated list
      return photosJson.split(",").filter(p => p.trim()).map(p => p.trim());
    }
  };

  const publishedWithPhotos = published.map(v => ({
    ...v,
    photos: parsePhotos(v.photos)
  }));

  const sorted = [...publishedWithPhotos].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
  const featured = sorted[0] || publishedWithPhotos.find((v) => v.featured);
  const supporting = sorted.filter((v) => v.id !== featured?.id);

  const activeVideo = publishedWithPhotos.find((v) => v.id === activeId) || featured;
  const activeVideoSupporting = activeVideo && !supporting.some(v => v.id === activeId);

  useEffect(() => {
    if (!reduced && supporting.length > 0) {
      autoAdvanceRef.current = setTimeout(() => {
        const currentIndex = supporting.findIndex(v => v.id === activeId);
        const nextIndex = (currentIndex + 1) % supporting.length;
        setActiveId(supporting[nextIndex].id);
        setActivePhotoIndex(0);
      }, 8000);
    }
    return () => {
      if (autoAdvanceRef.current) {
        clearTimeout(autoAdvanceRef.current);
      }
    };
  }, [activeId, reduced, supporting]);

  const handlePlay = (id: string) => {
    setActiveId(id);
    setActivePhotoIndex(0);
  };

  const handleClose = () => {
    setActiveId(null);
    setActivePhotoIndex(0);
  };

  const handlePhotoClick = (id: string, index: number) => {
    setActiveId(id);
    setActivePhotoIndex(index);
  };

  const nextPhoto = () => {
    if (activeVideo?.photos && activeVideo.photos.length > 0) {
      const nextIndex = (activePhotoIndex + 1) % activeVideo.photos.length;
      setActivePhotoIndex(nextIndex);
    }
  };

  const prevPhoto = () => {
    if (activeVideo?.photos && activeVideo.photos.length > 0) {
      const prevIndex =
        (activePhotoIndex - 1 + activeVideo.photos.length) %
        activeVideo.photos.length;
      setActivePhotoIndex(prevIndex);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    } else if (e.key === "ArrowRight" && activeVideo?.photos && activeVideo.photos.length > 0) {
      e.preventDefault();
      nextPhoto();
    } else if (e.key === "ArrowLeft" && activeVideo?.photos && activeVideo.photos.length > 0) {
      e.preventDefault();
      prevPhoto();
    }
  };

  const currentlyFocused = activeId === featured?.id && activeVideoSupporting === undefined;
  const isFeatured = activeId === null || activeId === featured?.id;
  const hasSupportingPhotos = activeVideo && activeVideo.photos && activeVideo.photos.length > 0;

  if (published.length === 0) {
    return null;
  }

return (
    <section id="video-testimonials" className="section relative pt-24 pb-12">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <VideoFrameCard testimonial={featured as VideoTestimonial} onPlay={handlePlay} />
          </div>
          <div className="flex flex-col gap-6">
            {supporting.map((v) => (
              <VideoFrameCard key={v.id} testimonial={v as VideoTestimonial} onPlay={handlePlay} />
            ))}
          </div>
        </div>
      </div>

      {activeId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Video testimonial"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div className="relative w-full max-w-3xl">
            <video
              key={activeVideo?.videoUrl}
              className="w-full rounded-xl"
              src={activeVideo?.videoUrl}
              controls
              autoPlay
              playsInline
            />

            {hasSupportingPhotos && (
              <div className="mt-4">
                <PhotoCarousel
                  photos={activeVideo?.photos || []}
                  testimonial={activeVideo!}
                  currentIndex={activePhotoIndex}
                  onPhotoClick={() => {}}
                />
                <div className="mt-3 flex justify-center items-center gap-3">
                  <button
                    type="button"
                    onClick={prevPhoto}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
                    aria-label="Previous photo"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <span className="text-xs text-white/70">
                    {activePhotoIndex + 1} / {activeVideo?.photos?.length || 1}
                  </span>
                  <button
                    type="button"
                    onClick={nextPhoto}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-200"
                    aria-label="Next photo"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200"
              aria-label="Close video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}