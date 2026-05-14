import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import { blogService } from '../services/blogs';
import { getImageUrl } from '../utils/imageUrl';
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
    <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col selection:bg-brand-primary selection:text-black">
      
      {/* Blog Header Background — Navbar overlays */}
      <div className="w-full min-h-[50vh] relative">
        <img src={heroImage} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
        <div className="relative z-10">
          <Navbar />
        </div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 w-full z-10 pb-12">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1000px]">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-brand-primary transition-colors text-xs font-bold uppercase tracking-widest mb-8">
              <ArrowLeft size={14} /> Back to Insights
            </Link>
            
            {post.tags && post.tags[0] && (
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs tracking-widest text-[#050505] bg-brand-primary uppercase font-bold px-3 py-1.5 rounded-full">
                  {post.tags[0]}
                </span>
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight drop-shadow-xl text-balance">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-xs text-white/50 uppercase tracking-widest font-bold">
              <div className="flex items-center gap-2">
                <User size={14} className="text-brand-primary" /> {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-brand-primary" /> {formatDate(post.createdAt)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Article */}
      <div className="grow container mx-auto px-6 md:px-12 lg:px-24 max-w-[1000px] py-16">
        <article className="prose prose-invert prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-white/80 leading-loose mb-8 font-medium">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Tags */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 flex-wrap">
             <Tag size={16} className="text-white/60" />
             <span className="text-xs tracking-widest text-white/60 uppercase font-bold">Tags:</span>
             {post.tags && post.tags.map((tag, i) => (
               <span key={i} className="text-xs tracking-widest text-brand-primary border border-brand-primary/30 bg-brand-primary/5 px-3 py-1 rounded-full uppercase font-bold">
                 {tag}
               </span>
             ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogDetails;
