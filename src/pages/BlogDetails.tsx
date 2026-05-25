import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import { blogService } from '../services/blogs';
import { getImageUrl } from '../utils/imageUrl';
import { sanitizeRichHtml } from '../utils/sanitize';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import type { Blog } from '../types';
import heroBg from '../assets/hero-blog.jpg';

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    blogService
      .getOne(id)
      .then((res) => setPost(res?.data || null))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [id]);

  const articleHtml = useMemo(() => sanitizeRichHtml(post?.content || ''), [post?.content]);

  if (loading) {
    return (
      <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner size="lg" label="Loading article..." />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-brand-primary hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  const heroImage = getImageUrl(post.image) || heroBg;

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col selection:bg-brand-primary selection:text-black overflow-hidden">
      <header className="w-full min-h-[68vh] md:min-h-[620px] relative isolate">
        <img src={heroImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/78 to-[#050505]/20" />
        <div className="absolute inset-y-0 left-0 w-full md:w-2/3 bg-linear-to-r from-[#050505]/92 via-[#050505]/58 to-transparent" />

        <div className="relative z-10">
          <Navbar />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 pb-12 md:pb-16">
          <div className="mx-auto w-full max-w-[1180px] px-6 md:px-10 lg:px-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-brand-primary transition-colors text-xs font-bold uppercase tracking-[0.24em] mb-8"
            >
              <ArrowLeft size={14} /> Back to Insights
            </Link>

            {post.tags && post.tags[0] && (
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[11px] tracking-[0.22em] text-[#050505] bg-brand-primary uppercase font-extrabold px-3.5 py-2 rounded-full">
                  {post.tags[0]}
                </span>
              </div>
            )}

            <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-7 leading-[1.02] drop-shadow-xl text-balance">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[11px] text-white/64 uppercase tracking-[0.22em] font-extrabold">
              <div className="flex items-center gap-2">
                <User size={14} className="text-brand-primary" /> {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-brand-primary" /> {formatDate(post.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="grow">
        <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-10 px-6 py-14 md:px-10 md:py-20 lg:grid-cols-[minmax(0,220px)_minmax(0,780px)] lg:px-12">
          <aside className="hidden lg:block">
            <div className="sticky top-28 border-l border-brand-primary/50 pl-5">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-brand-primary">Insight</p>
              <p className="mt-3 text-sm font-medium leading-6 text-white/48">{post.excerpt}</p>
            </div>
          </aside>

          <article
            className="blog-rich-content"
            dangerouslySetInnerHTML={{ __html: articleHtml }}
          />
        </div>

        <div className="mx-auto w-full max-w-[1180px] px-6 pb-20 md:px-10 lg:px-12">
          <div className="border-t border-white/10 pt-8 flex items-center gap-3 flex-wrap lg:ml-[260px]">
            <Tag size={16} className="text-white/60" />
            <span className="text-xs tracking-widest text-white/60 uppercase font-bold">Tags:</span>
            {post.tags && post.tags.map((tag, i) => (
              <span key={i} className="text-xs tracking-widest text-brand-primary border border-brand-primary/30 bg-brand-primary/5 px-3 py-1 rounded-full uppercase font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetails;
