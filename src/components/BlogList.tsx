import React from 'react';
import { motion } from 'motion/react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { User, Calendar, ArrowRight, BookOpen } from 'lucide-react';

interface BlogListProps {
  onSelectPost: (slug: string) => void;
  onOpenBooking?: () => void;
  isPage?: boolean;
}

export const BlogList: React.FC<BlogListProps> = ({ onSelectPost, onOpenBooking, isPage = true }) => {
  // Exactly 3 posts for 1 single row on desktop grid
  const postsRow = BLOG_POSTS.slice(0, 3);

  const containerClasses = isPage
    ? "pt-28 pb-20 lg:pt-36 lg:pb-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F2] min-h-screen"
    : "py-6 bg-transparent";

  return (
    <div className={containerClasses}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header section (only on full page) */}
        {isPage && (
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#8BA983] font-semibold bg-[#FFFFFF] px-3.5 py-1.5 rounded-full border border-[#E8E1D8] shadow-2xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Psiholoģijas Blogs & Raksti</span>
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#3E4950] font-normal leading-tight">
              Raksti par garīgo veselību, stresa vadību un psihoterapiju
            </h1>
            
            <p className="text-base sm:text-lg text-[#5E6A71] max-w-2xl mx-auto font-light leading-relaxed">
              Zināšanas un praktiski ieteikumi no klīniskās psiholoģes par trauksmes mazināšanu, stresa vadības tehnikām, shēmu terapiju, EMDR un emociālo līdzsvaru.
            </p>
          </div>
        )}

        {/* Blog Grid - Exactly 1 row with 3 articles on desktop, 1 per row on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {postsRow.map((post: BlogPost, index: number) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => onSelectPost(post.slug)}
              className="group bg-[#FFFFFF] rounded-3xl border border-[#E8E1D8] overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#A8C3A1] transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* 1. Featured Image (Raksta galvenā bilde) */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#E8E1D8]/30 shrink-0">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#3E4950] bg-[#FFFFFF]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#E8E1D8]">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between space-y-4">
                
                {/* 2. Autors un publicēšanas datums (Autors: Katrīna Rozenbaha | 2026. gada 15. maijs) */}
                <div className="flex items-center space-x-2 text-xs text-[#7E8C94] font-medium tracking-wide">
                  <span className="flex items-center space-x-1 text-[#3E4950]">
                    <User className="w-3.5 h-3.5 text-[#8BA983] shrink-0" />
                    <span>Autors: {post.author}</span>
                  </span>
                  <span className="text-[#E8E1D8]">|</span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-[#8BA983] shrink-0" />
                    <span>{post.date}</span>
                  </span>
                </div>

                {/* 3. Raksta nosaukums (H2 / H3 virsraksts) */}
                <div className="space-y-2 flex-grow">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#3E4950] font-normal group-hover:text-[#8BA983] transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#5E6A71] line-clamp-3 font-light leading-relaxed pt-1">
                    {post.excerpt}
                  </p>
                </div>

                {/* Card Footer Link */}
                <div className="pt-3 border-t border-[#FAF8F2] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#8BA983] group-hover:text-[#3E4950] transition-colors">
                  <span>Lasīt pilno rakstu</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>

              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        {onOpenBooking && (
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#FFFFFF] border border-[#E8E1D8] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2 max-w-xl">
              <h3 className="font-serif text-2xl text-[#3E4950] font-normal">
                Vēlies pārrunāt savu situāciju personīgi?
              </h3>
              <p className="text-sm text-[#5E6A71] font-light">
                Piesakies individuālai konsultācijai online (tiešsaistē).
              </p>
            </div>
            <button
              onClick={onOpenBooking}
              className="shrink-0 bg-[#A8C3A1] hover:bg-[#8BA983] text-white py-3.5 px-7 rounded-full text-sm font-medium transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              Pieteikties konsultācijai
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
