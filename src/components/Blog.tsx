import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogService } from '../services/blogs';
import LoadingSpinner from './ui/LoadingSpinner';
import ErrorMessage from './ui/ErrorMessage';
import type { Blog } from '../types';

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

const BlogCard: React.FC<{ post: Blog; index: number }> = ({ post, index }) => (
  <Link to={`/blog/${post.id}`} className="group flex flex-col h-full bg-white rounded-2xl p-4 pb-6 shadow-sm hover:shadow-xl transition-shadow duration-500">

    {/* Image */}
    <div className="relative rounded-xl overflow-hidden mb-6 aspect-4/3">
      {post.image ? (
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-[#070707]/5 flex items-center justify-center">
          <span className="text-[#070707]/10 text-7xl font-black select-none">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>

    {/* Meta row: tag + date */}
    <div className="flex items-center gap-3 mb-4">
      {post.tags && post.tags[0] && (
        <>
          <span className="text-xs font-bold tracking-widest uppercase text-brand-primary">
            {post.tags[0]}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#070707]/20" aria-hidden />
        </>
      )}
      <span className="text-sm text-[#070707]/50 font-medium">
        {formatDate(post.createdAt)}
      </span>
    </div>

    {/* Title */}
    <h3 className="text-xl md:text-2xl font-bold text-[#070707] leading-snug tracking-tight mb-3 group-hover:text-brand-primary transition-colors duration-300 line-clamp-2">
      {post.title}
    </h3>

    {/* Excerpt */}
    <p className="text-base text-[#070707]/60 leading-relaxed font-medium line-clamp-3 mb-6 flex-1">
      {post.excerpt}
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 mt-auto">
      <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
        <span className="text-sm font-bold text-brand-primary">{post.author.charAt(0)}</span>
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-[#070707] truncate">{post.author}</p>
        <p className="text-xs text-[#070707]/50 font-medium truncate">{post.role}</p>
      </div>
    </div>
  </Link>
);

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await blogService.getAll();
        setPosts(res.data);
      } catch (err: unknown) {
        const apiErr = err as { message?: string };
        setError(apiErr.message || 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="relative w-full bg-[#f5f5f0] text-[#070707] py-24 md:py-32 font-sans">
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner size="lg" label="Loading articles..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="relative w-full bg-[#f5f5f0] text-[#070707] py-24 md:py-32 font-sans">
        <div className="flex items-center justify-center py-20">
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="relative w-full bg-[#f5f5f0] text-[#070707] py-24 md:py-32 font-sans">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-primary" aria-hidden />
              <span className="text-xs tracking-[0.35em] uppercase font-bold text-brand-primary">
                Insights & Stories
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
              From the <span className="font-bold text-brand-primary">Blog</span>
            </h2>
            <p className="mt-3 text-base md:text-lg text-[#070707]/70 font-medium max-w-lg">
              Industry insights, project updates, and expert perspectives on Nigerian real estate.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-3 self-start md:self-auto bg-[#070707] text-white text-sm font-bold px-6 py-3.5 rounded-full transition-all duration-300 hover:bg-brand-primary group"
          >
            View All Articles
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards — 3 equal columns */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {posts.slice(0, 3).map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-[#070707]/60">
            <p className="text-xl font-medium">No blog posts yet.</p>
            <p className="text-base mt-2">Check back soon for our latest insights.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Blog;
