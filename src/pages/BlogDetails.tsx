import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import blogImage1 from '../assets/beautiful-red-brick-house-with-decorative-lights.webp';
import blogImage2 from '../assets/3d-house-model-with-modern-architecture.webp';
import blogImage3 from '../assets/project_interior_3.png';

// Reusing our blog posts as the "database"
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Luxury Real Estate in Lagos',
    excerpt: 'Exploring the shifting paradigms of high-end property development in Nigeria\'s commercial capital, and what investors should look out for in the coming decade.',
    content: 'The landscape of luxury real estate in Lagos is undergoing a profound transformation. Driven by a burgeoning middle class, diaspora investments, and strictly refined architectural tastes, the demand for ultra-premium living spaces is higher than ever. \n\nAt Greenstone Developments, we are seeing a distinct pivot towards "smart" luxury. It is no longer just about Italian marble and imported fixtures; today\'s discerning buyer demands integrated home automation, sustainable energy solutions, and unparalleled security infrastructures. Areas like Ikoyi and Victoria Island remain high-yield havens, but we are also observing aggressive gentrification and luxury expansion into the deeper corridors of Lekki Phase 1 and specialized free trade zones.\n\nInvestors looking to capitalize on this wave must focus on developments that offer a comprehensive ecosystem—properties that blend residential comfort with close proximity to premium commercial and recreational hubs.',
    date: 'Oct 15, 2024',
    author: 'Greenstone Insights',
    category: 'Market Trends',
    image: blogImage1
  },
  {
    id: 2,
    title: 'Sustainable Architecture: Building for Tomorrow',
    excerpt: 'How Greenstone Developments is integrating eco-friendly materials and energy-efficient designs into our latest residential projects across Abuja.',
    content: 'Sustainability is no longer a buzzword; it is a critical mandate for the future of construction. At Greenstone Developments, we recognize that the buildings of tomorrow must harmonize with their environment today.\n\nIn our recent Abuja projects, including the Green Court Residence in Maitama, we have aggressively integrated passive cooling architectural designs, minimizing the reliance on artificial air conditioning. We are sourcing local, sustainable materials where possible, significantly reducing our carbon footprint during the construction phase.\n\nFurthermore, our commitment extends to the implementation of state-of-the-art solar integration and rainwater harvesting systems in our new terrace designs. By building green, we are not just protecting the environment; we are drastically reducing long-term maintenance and utility costs for our clients, proving that luxury and sustainability can seamlessly coexist.',
    date: 'Sep 28, 2024',
    author: 'Engr. Abdelrazzak Kannouj',
    category: 'Architecture',
    image: blogImage2
  },
  {
    id: 3,
    title: 'A Guide to Property Investment in Nigeria',
    excerpt: 'Essential tips and strategies for both local and diaspora investors looking to navigate the Nigerian real estate market securely and profitably.',
    content: 'Navigating the Nigerian real estate market requires a blend of local knowledge, strategic foresight, and rigorous due diligence. For both local high-net-worth individuals and the diaspora, the potential for exceptional ROI is vast, but so are the pitfalls.\n\nFirst and foremost: Verify all titles. The importance of a clean Certificate of Occupancy (C of O) or Governor\'s Consent cannot be overstated. Engage top-tier legal counsel before any funds change hands.\n\nSecondly, partner with proven developers. The landscape is unfortunately littered with abandoned projects. Greenstone Developments has maintained a flawless track record since 2002 precisely because we prioritize structural integrity and financial transparency. \n\nFinally, look for mixed-use potential. Properties that offer both residential and commercial viability tend to weather economic fluctuations far better than strictly solitary developments. Always invest with a clear view of the city\'s 10-year master plan.',
    date: 'Aug 12, 2024',
    author: 'Mr. Emeka Nweze',
    category: 'Investment',
    image: blogImage3
  }
];

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const numericId = parseInt(id, 10);
    const foundPost = blogPosts.find(p => p.id === numericId);
    setPost(foundPost);
    window.scrollTo(0, 0);
  }, [id]);

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

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col selection:bg-brand-primary selection:text-black">
      <Navbar />
      
      {/* Blog Header Background */}
      <div className="w-full h-[50vh] min-h-[400px] relative">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 w-full z-10 pb-12">
          <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1000px]">
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-brand-primary transition-colors text-xs font-bold uppercase tracking-widest mb-8">
              <ArrowLeft size={14} /> Back to Insights
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] tracking-widest text-[#050505] bg-brand-primary uppercase font-bold px-3 py-1.5 rounded-full">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight drop-shadow-xl text-balance">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-xs text-white/50 uppercase tracking-widest font-bold">
              <div className="flex items-center gap-2">
                <User size={14} className="text-brand-primary" /> {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-brand-primary" /> {post.date}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Article */}
      <div className="flex-grow container mx-auto px-6 md:px-12 lg:px-24 max-w-[1000px] py-16">
        <article className="prose prose-invert prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-white/80 leading-loose mb-8 font-medium">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Share / Tags */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
             <Tag size={16} className="text-white/40" />
             <span className="text-xs tracking-widest text-white/40 uppercase font-bold">Tags:</span>
             <span className="text-xs tracking-widest text-brand-primary border border-brand-primary/30 bg-brand-primary/5 px-3 py-1 rounded-full uppercase font-bold">Real Estate</span>
             <span className="text-xs tracking-widest text-brand-primary border border-brand-primary/30 bg-brand-primary/5 px-3 py-1 rounded-full uppercase font-bold">{post.category}</span>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogDetails;
