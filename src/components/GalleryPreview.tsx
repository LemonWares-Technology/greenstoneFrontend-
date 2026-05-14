import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
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

const fallbackImages: GalleryImage[] = [
  { id: '1', url: proj1, category: 'Interior', title: 'Maitama Living Room' },
  { id: '2', url: heroImg, category: 'Architecture', title: 'Red Brick Residence' },
  { id: '3', url: proj2, category: 'Interior', title: 'F.O Terraces Lounge' },
  { id: '4', url: woodenHouse, category: 'Architecture', title: 'Timber Frame Villa' },
  { id: '5', url: proj3, category: 'Interior', title: 'Panache Master Suite' },
  { id: '6', url: waterfront, category: 'Landscape', title: 'Waterfront Sunset View' },
  { id: '7', url: modelHouse, category: 'Architecture', title: 'Modern Model Home' },
  { id: '8', url: aboutImg, category: 'Construction', title: 'Greenstone Site Overview' },
];

const GalleryPreview = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    galleryService.getAll()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setImages(res.data.slice(0, 8));
        } else {
          setImages(fallbackImages);
        }
      })
      .catch(() => setImages(fallbackImages));
  }, []);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex, images.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? images.length - 1 : lightboxIndex - 1);
  }, [lightboxIndex, images.length]);

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

  if (images.length === 0) return null;

  const layoutPattern = [
    'col-span-2 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-2',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1',
  ];

  return (
    <section className="relative w-full bg-[#050505] text-white py-24 md:py-32 font-sans overflow-hidden">

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-primary" aria-hidden />
              <span className="text-xs tracking-[0.35em] uppercase font-bold text-brand-primary">
                Gallery
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
              Our Visual <span className="font-bold text-brand-primary">Showcase</span>
            </h2>
            <p className="mt-3 text-base md:text-lg text-white/70 font-medium max-w-lg">
              A curated look at our developments, interiors, and craftsmanship.
            </p>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-3 self-start md:self-auto bg-white text-[#070707] text-sm font-bold px-6 py-3.5 rounded-full transition-all duration-300 hover:bg-brand-primary group"
          >
            View Full Gallery
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mosaic grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] sm:auto-rows-[160px] md:auto-rows-[180px] lg:auto-rows-[200px] gap-2.5 md:gap-3">
          {images.slice(0, 8).map((img, i) => (
            <button
              key={img.id}
              onClick={() => openLightbox(i)}
              className={`group relative rounded-xl md:rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${layoutPattern[i] || ''}`}
            >
              <img
                src={getImageUrl(img.url)}
                alt={img.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#070707]/0 group-hover:bg-[#070707]/60 transition-colors duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mb-3 scale-75 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn size={18} className="text-white" />
                </div>
                <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold text-brand-primary mb-1">
                  {img.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight px-4 text-center leading-snug">
                  {img.title}
                </h3>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom note */}
        <div className="flex items-center justify-center mt-12 md:mt-16">
          <div className="flex items-center gap-4 text-white/50">
            <span className="w-12 h-px bg-white/15" aria-hidden />
            <span className="text-sm tracking-widest uppercase font-bold">
              {images.length} of many more
            </span>
            <span className="w-12 h-px bg-white/15" aria-hidden />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && images[lightboxIndex] && (
        <div className="fixed inset-0 z-200 bg-[#070707]/95 backdrop-blur-md flex flex-col">
          <div className="flex items-center justify-between px-6 md:px-10 py-5 shrink-0">
            <div>
              <span className="text-xs tracking-[0.25em] uppercase font-bold text-brand-primary block mb-0.5">
                {images[lightboxIndex].category}
              </span>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {images[lightboxIndex].title}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/50 font-medium tabular-nums">
                {lightboxIndex + 1} / {images.length}
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

          <div className="flex-1 flex items-center justify-center px-4 md:px-16 pb-8 relative min-h-0">
            <button
              onClick={goPrev}
              className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            <img
              src={getImageUrl(images[lightboxIndex].url)}
              alt={images[lightboxIndex].title}
              className="max-h-full max-w-full object-contain rounded-xl select-none"
            />

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
    </section>
  );
};

export default GalleryPreview;
