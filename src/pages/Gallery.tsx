import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { galleryService } from '../services/gallery';
import { getImageUrl } from '../utils/imageUrl';
import type { GalleryImage } from '../types';

import proj1 from '../assets/project-luxury-apartments.jpg';
import proj2 from '../assets/project-classic-residence.jpg';
import proj3 from '../assets/project-duplex-terrace.jpg';
import heroImg from '../assets/hero-modern-villa-dusk.jpg';
import woodenHouse from '../assets/intro-colonial-villa.jpg';
import waterfront from '../assets/invest-pool-villa.jpg';
import modelHouse from '../assets/feature-sunset-villa.jpg';
import aboutImg from '../assets/about-grand-mansion.jpg';
import galleryHeroBg from '../assets/hero-gallery.jpg';

const fallbackImages: (GalleryImage & { aspect: string })[] = [
  { id: '1', url: proj1, category: 'Interior', title: 'Maitama Living Room', aspect: 'tall' },
  { id: '2', url: heroImg, category: 'Architecture', title: 'Red Brick Residence', aspect: 'wide' },
  { id: '3', url: proj2, category: 'Interior', title: 'F.O Terraces Lounge', aspect: 'square' },
  { id: '4', url: woodenHouse, category: 'Architecture', title: 'Timber Frame Villa', aspect: 'tall' },
  { id: '5', url: proj3, category: 'Interior', title: 'Panache Master Suite', aspect: 'square' },
  { id: '6', url: waterfront, category: 'Landscape', title: 'Waterfront Sunset View', aspect: 'wide' },
  { id: '7', url: modelHouse, category: 'Architecture', title: 'Modern Model Home', aspect: 'square' },
  { id: '8', url: aboutImg, category: 'Construction', title: 'Greenstone Site Overview', aspect: 'wide' },
  { id: '9', url: proj1, category: 'Construction', title: 'Foundation Phase I', aspect: 'square' },
  { id: '10', url: waterfront, category: 'Landscape', title: 'Guzape Gardens', aspect: 'tall' },
  { id: '11', url: woodenHouse, category: 'Landscape', title: 'Bourdillon Aerial', aspect: 'square' },
  { id: '12', url: heroImg, category: 'Architecture', title: 'Evening Facade Lighting', aspect: 'square' },
];

const ASPECT_CYCLE = ['tall', 'wide', 'square'] as const;

const Gallery = () => {
  const [images, setImages] = useState<(GalleryImage & { aspect?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    galleryService.getAll()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const withAspect = res.data.map((img, i) => ({
            ...img,
            aspect: ASPECT_CYCLE[i % ASPECT_CYCLE.length],
          }));
          setImages(withAspect);
        } else {
          setImages(fallbackImages);
        }
      })
      .catch(() => setImages(fallbackImages))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(images.map((img) => img.category)))];

  const filtered = activeCategory === 'All'
    ? images
    : images.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? filtered.length - 1 : lightboxIndex - 1);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, goNext, goPrev]);

  return (
    <div className="font-sans flex flex-col selection:bg-brand-primary selection:text-black">

      {/* Hero — Navbar overlays background image */}
      <div className="relative w-full min-h-[50vh] md:min-h-[55vh] flex flex-col overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={galleryHeroBg} alt="Greenstone Gallery" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/70 to-[#050505]/40"></div>
        </div>
        <div className="relative z-10">
          <Navbar />
        </div>
        <div className="relative z-10 flex-1 flex items-end pb-16 md:pb-20 px-6 md:px-12 lg:px-24">
          <div className="container mx-auto max-w-[1600px]">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_var(--color-brand-primary)]" />
                <span className="text-xs tracking-[0.25em] text-brand-primary uppercase font-bold">Gallery</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.08]">
                Our Visual <span className="font-bold">Showcase</span>
              </h1>
              <p className="mt-8 text-white/60 max-w-2xl text-base md:text-lg font-medium leading-relaxed">
                A curated look at our developments, interiors, and craftsmanship — from foundation to finishing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Main content ===== */}
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">

          {loading && (
            <div className="flex items-center justify-center py-32">
              <Loader2 size={36} className="animate-spin text-brand-primary" />
            </div>
          )}

          {!loading && <>
          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-3 mb-12 md:mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                    : 'bg-[#f5f5f0] text-[#070707]/60 hover:text-[#070707] hover:bg-[#070707]/5 border border-[#070707]/5'
                }`}
              >
                {cat}
              </button>
            ))}

            <span className="ml-auto text-sm text-[#070707]/50 font-medium hidden sm:inline">
              {filtered.length} {filtered.length === 1 ? 'image' : 'images'}
            </span>
          </div>

          {/* Image grid — masonry-inspired with varied spans */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[240px] lg:auto-rows-[260px]">
            {filtered.map((img, i) => {
              const aspect = (img as { aspect?: string }).aspect;
              const spanClass =
                aspect === 'tall'
                  ? 'row-span-2'
                  : aspect === 'wide'
                    ? 'col-span-2'
                    : '';

              return (
                <button
                  key={img.id}
                  onClick={() => openLightbox(i)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${spanClass}`}
                >
                  <img
                    src={getImageUrl(img.url)}
                    alt={img.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#070707]/0 group-hover:bg-[#070707]/50 transition-colors duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4 scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn size={20} className="text-white" />
                    </div>
                    <span className="text-xs tracking-[0.25em] uppercase font-bold text-brand-primary mb-1">
                      {img.category}
                    </span>
                    <h3 className="text-base font-bold text-white tracking-tight px-4 text-center">
                      {img.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-[#070707]/60">
              <p className="text-xl font-medium mb-2">No images in this category yet.</p>
              <p className="text-base">Check back soon — we're always adding new work.</p>
            </div>
          )}
          </>}
        </div>
      </div>

      {/* ===== Lightbox ===== */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div className="fixed inset-0 z-200 bg-[#070707]/95 backdrop-blur-md flex flex-col">

          {/* Top bar */}
          <div className="flex items-center justify-between px-6 md:px-10 py-5 shrink-0">
            <div>
              <span className="text-xs tracking-[0.25em] uppercase font-bold text-brand-primary block mb-0.5">
                {filtered[lightboxIndex].category}
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {filtered[lightboxIndex].title}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/50 font-medium tabular-nums">
                {lightboxIndex + 1} / {filtered.length}
              </span>
              <button
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Image area */}
          <div className="flex-1 flex items-center justify-center px-4 md:px-16 pb-8 relative min-h-0">
            {/* Prev */}
            <button
              onClick={goPrev}
              className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            <img
              src={getImageUrl(filtered[lightboxIndex].url)}
              alt={filtered[lightboxIndex].title}
              className="max-h-full max-w-full object-contain rounded-xl select-none"
            />

            {/* Next */}
            <button
              onClick={goNext}
              className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
