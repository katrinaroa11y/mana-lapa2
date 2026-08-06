import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { ArrowLeft, Calendar, Clock, Share2, BookOpen } from 'lucide-react';

const katrinaPortrait = '/katrina_portrait.jpg';

interface BlogPostSingleProps {
  slug: string;
  onBackToBlogs: () => void;
  onSelectPost: (slug: string) => void;
  onOpenBooking: () => void;
}

export const BlogPostSingle: React.FC<BlogPostSingleProps> = ({
  slug,
  onBackToBlogs,
  onSelectPost,
  onOpenBooking,
}) => {
  const post = BLOG_POSTS.find((p) => p.slug === slug) || BLOG_POSTS[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Raksta saite veiksmīgi nokopēta starpliktuvē!');
    }
  };

  return (
    <article className="pt-28 pb-20 lg:pt-36 lg:pb-28 px-4 sm:px-6 lg:px-8 bg-[#FAF8F2] min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Navigation & Breadcrumbs */}
        <div className="mb-8 flex items-center justify-between border-b border-[#E8E1D8] pb-4">
          <button
            onClick={onBackToBlogs}
            className="inline-flex items-center space-x-2 text-sm text-[#8BA983] font-semibold hover:text-[#3E4950] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Atpakaļ uz visiem rakstiem</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-[#5E6A71] hover:text-[#8BA983] bg-[#FFFFFF] px-3.5 py-1.5 rounded-full border border-[#E8E1D8] transition-all cursor-pointer shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Dalīties ar rakstu</span>
          </button>
        </div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6 mb-10"
        >
          <div className="inline-block text-xs font-semibold uppercase tracking-wider text-[#8BA983] bg-[#FFFFFF] px-3.5 py-1.5 rounded-full border border-[#E8E1D8]">
            {post.category}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#3E4950] font-normal leading-tight">
            {post.title}
          </h1>

          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#7E8C94] pt-2 border-t border-[#E8E1D8]/60">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-[#8BA983]" />
              <span>{post.date}</span>
            </div>

            <span className="hidden sm:inline text-[#E8E1D8]">|</span>

            <div className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-[#8BA983]" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 rounded-3xl overflow-hidden border border-[#E8E1D8] shadow-md bg-[#FFFFFF]"
        >
          <img
            src={post.featuredImage}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-[280px] sm:h-[400px] object-cover object-center"
          />
        </motion.div>

        {/* Article Content Body */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#FFFFFF] rounded-3xl border border-[#E8E1D8] p-6 sm:p-10 lg:p-12 shadow-xs space-y-8"
        >
          {/* Intro Lead */}
          <p className="text-base sm:text-lg text-[#3E4950] font-normal leading-relaxed border-l-4 border-[#A8C3A1] pl-5 py-1">
            {post.content.intro}
          </p>

          {/* Section Paragraphs */}
          <div className="space-y-8 text-base text-[#5E6A71] leading-relaxed font-light">
            {post.content.sections.map((sec, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="font-serif text-2xl text-[#3E4950] font-normal pt-2">
                  {sec.heading}
                </h2>
                <p className="whitespace-pre-line leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>

          {/* Author Box */}
          <div className="mt-10 pt-8 border-t border-[#E8E1D8] flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left bg-[#FAF8F2] p-6 rounded-2xl">
            <img
              src={katrinaPortrait}
              alt={post.author}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full object-cover border-2 border-[#FFFFFF] shadow-xs shrink-0"
            />
            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8BA983]">
                Raksta autore
              </span>
              <h4 className="font-serif text-lg text-[#3E4950] font-medium">
                {post.author}
              </h4>
              <p className="text-xs text-[#5E6A71] font-light leading-relaxed">
                Reģistrēta psiholoģe (Reģ. Nr. 7001642). Specializējas klīniskajā psiholoģijā, izmanto EMDR un shēmu terapijas metodes.
              </p>
            </div>
          </div>

          {/* Consultation Banner */}
          <div className="pt-6 text-center space-y-4">
            <p className="text-sm text-[#5E6A71]">
              Sajutāt resonansi ar šajā rakstā aplūkoto tēmu?
            </p>
            <button
              onClick={onOpenBooking}
              className="bg-[#A8C3A1] hover:bg-[#8BA983] text-white py-3 px-8 rounded-full font-medium text-sm transition-all shadow-xs hover:shadow-md cursor-pointer"
            >
              Pieteikties konsultācijai pie Katrīnas
            </button>
          </div>

        </motion.div>

        {/* Other Posts Section */}
        {otherPosts.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E8E1D8] pb-3">
              <h3 className="font-serif text-2xl text-[#3E4950] font-normal flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#8BA983]" />
                <span>Citi saistītie raksti</span>
              </h3>
              <button
                onClick={onBackToBlogs}
                className="text-xs font-semibold uppercase tracking-wider text-[#8BA983] hover:text-[#3E4950] transition-colors"
              >
                Skatīt visus rakstus
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherPosts.map((otherPost) => (
                <div
                  key={otherPost.id}
                  onClick={() => onSelectPost(otherPost.slug)}
                  className="bg-[#FFFFFF] rounded-2xl border border-[#E8E1D8] p-5 shadow-2xs hover:shadow-md hover:border-[#A8C3A1] transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8BA983]">
                      {otherPost.category}
                    </span>
                    <h4 className="font-serif text-lg text-[#3E4950] font-normal group-hover:text-[#8BA983] transition-colors line-clamp-2">
                      {otherPost.title}
                    </h4>
                  </div>
                  <div className="pt-4 flex items-center justify-between text-xs text-[#7E8C94]">
                    <span>{otherPost.date}</span>
                    <span className="font-medium text-[#8BA983] group-hover:translate-x-1 transition-transform">
                      Lasīt &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
};
