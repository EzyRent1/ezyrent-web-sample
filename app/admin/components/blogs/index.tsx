'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import BlogDetails, { ApiBlog } from './BlogDetails';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import { SafeContent } from '@/app/util/dumpurify';
import { formatDate } from '@/app/util';
import { WhiteSpinner } from '../common/spinner';

export default function Blogs() {
  const [selectedBlog, setSelectedBlog] = useState<ApiBlog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/get-all-blogs');
        const result = await response.json();
        if (result.success) {
          console.log('Fetched blogs:', result.data);
          setBlogs(result.data.data);
        } else {
          console.error('Failed to fetch blogs:', result.message);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (selectedBlog) {
    return (
      <BlogDetails blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
    );
  }

  return loading ? (
    <WhiteSpinner />
  ) : (
    <main className="flex flex-col gap-5 px-4 md:px-10 py-5">
      <section>
        <h1 className="text-2xl text-center font-bold mb-4">
          Today&apos;s Article
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* cover image */}
          <div className="relative w-full shadow-sm h-auto">
            <Image
              // src="/blog/blog_cover.jpg"
              src={getCleanImageUrl(
                blogs[0]?.imageUrl || '/blog/blog_cover.jpg'
              )}
              alt={`${blogs[0]?.title} cover image` || 'Article Cover image'}
              width={600}
              height={400}
              className="w-full h-auto rounded-xl object-cover"
            />
            {/* <div className="absolute inset-0 bg-black/10 rounded-xl" /> */}
          </div>
          {/* title and description */}
          <div className="flex flex-col justify-center gap-3">
            <div className="flex gap-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Technology
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Innovation
              </span>
            </div>
            <h2 className="text-xl font-semibold">{blogs[0]?.title}</h2>
            <article className="flex flex-col gap-3 mb-10">
              {/* <p className="mt-2 text-gray-600 ">
                This is a brief description of the article. It provides an
                overview of the content to entice readers to click and read
                more.
              </p> */}
              {SafeContent({
                html: blogs[0]?.content.slice(0, 200) + '...' || ''
              })}
              <p className="text-greyText text-[13px]">
                <span>{formatDate(blogs[0]?.createdAt)}</span> ·{' '}
                <span>{blogs[0]?.timeToRead} min read</span>
              </p>
            </article>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedBlog(blogs[0])}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>
      <hr className="h-4 text-[#666666]" />

      <section>
        <h1 className="text-2xl text-center font-bold mb-4">More Articles</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {blogs.map((article, index) => {
            return index === 0 ? null : (
              <div
                onClick={() => setSelectedBlog(article)}
                key={article.id}
                className="border cursor-pointer border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition"
              >
                <Image
                  src={getCleanImageUrl(
                    article.imageUrl || '/blog/blog_cover.jpg'
                  )}
                  alt={article.title}
                  width={400}
                  height={250}
                  className="w-full h-auto object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{article.title}</h3>
                  <article className="mt-2 text-gray-600">
                    {SafeContent({
                      html: article.content.slice(0, 200) + '...' || ''
                    })}
                  </article>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-greyText text-[13px] mt-3">
                    <span>{formatDate(article.createdAt)}</span> ·{' '}
                    <span>{article.timeToRead} min read</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
