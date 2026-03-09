import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { blogService } from '../services/blogs';
import LoadingSpinner from './ui/LoadingSpinner';
import ErrorMessage from './ui/ErrorMessage';
import type { Blog } from '../types';

const BlogCard: React.FC<{ post: Blog }> = ({ post }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#070707]/5 hover:shadow-2xl transition-all duration-500 flex flex-col group">
      
      {/* Image Section with green overlay */}
      <div className="relative h-[280px] md:h-[320px] overflow-hidden">
        {post.image ? (
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 flex items-center justify-center">
            <span className="text-brand-primary/40 text-6xl font-black">{post.title.charAt(0)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-brand-primary/20 to-transparent"></div>

        <div className="absolute bottom-5 left-6 z-10">
          <p className="text-white font-bold text-sm">{post.author}</p>
          <p className="text-white/70 text-xs font-medium">{post.role}</p>
        </div>

        <Link to={`/blog/${post.id}`} className="absolute bottom-5 right-6 z-10 bg-white text-[#070707] text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-lg group/btn">
          Read Article
          <ArrowUpRight size={12} className="group-hover/btn:rotate-45 transition-transform" />
        </Link>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <Link to={`/blog/${post.id}`}>
          <h3 className="text-lg md:text-xl font-bold text-[#070707] leading-snug mb-4 tracking-tight hover:text-brand-primary transition-colors cursor-pointer">
            {post.title}
          </h3>
        </Link>

        <div className="flex flex-wrap gap-2 mb-5">
          {(post.tags || []).map((tag, idx) => (
            <span 
              key={idx} 
              className="text-[10px] font-bold tracking-wider uppercase text-[#070707]/40 bg-[#f5f5f5] px-3 py-1.5 rounded-full border border-[#070707]/5 hover:border-brand-primary/30 hover:text-brand-primary transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className={`text-sm text-[#070707]/50 leading-relaxed font-medium transition-all duration-500 ${expanded ? '' : 'line-clamp-3'}`}>
          {post.excerpt}
        </p>

        <button 
          onClick={() => setExpanded(!expanded)}
          className="mt-5 flex items-center justify-center w-full pt-4 border-t border-[#070707]/5 group/expand"
        >
          <ChevronDown 
            size={20} 
            className={`text-[#070707]/20 group-hover/expand:text-brand-primary transition-all duration-300 ${expanded ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>
    </div>
  );
};

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
      <section id="blog" className="relative w-full bg-[#f5f5f5] text-[#070707] py-24 md:py-32 font-sans overflow-hidden">
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner size="lg" label="Loading articles..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className="relative w-full bg-[#f5f5f5] text-[#070707] py-24 md:py-32 font-sans overflow-hidden">
        <div className="flex items-center justify-center py-20">
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="relative w-full bg-[#f5f5f5] text-[#070707] py-24 md:py-32 font-sans overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10 max-w-[1600px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full shadow-[0_0_8px_var(--color-brand-primary)]"></div>
              <span className="text-[10px] tracking-[0.25em] text-brand-primary uppercase font-bold">Insights & Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
              From the <span className="font-bold text-brand-primary">Blog</span>
            </h2>
          </div>
          <Link to="/blog" className="text-sm font-bold text-[#070707]/50 hover:text-brand-primary transition-colors flex items-center gap-2 group">
            View All Articles 
            <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16 text-[#070707]/40">
            <p className="text-lg font-medium">No blog posts yet.</p>
            <p className="text-sm mt-2">Check back soon for our latest insights.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Blog;
