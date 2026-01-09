import { formatDate } from '@/app/util';
import { SafeContent } from '@/app/util/dumpurify';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';
import Image from 'next/image';
import { FaLongArrowAltLeft } from 'react-icons/fa';

export interface ApiBlog {
  id: string;
  content: string;
  createdAt: string;
  imageUrl: string;
  likes: string[];
  slug: string;
  status: 'PUBLISHED' | 'DRAFT';
  tags: string[];
  timeToRead: number;
  title: string;
  updatedAt: string;
  videoUrl: string;
}
interface BlogDetailsProps {
  blog: ApiBlog;
  onClose: () => void;
}

export default function BlogDetails({ blog, onClose }: BlogDetailsProps) {
  return (
    <section className="px-20 flex justify-center py-5">
      <div className="flex flex-col  gap-4">
        <button
          className="text-primaryPurple flex items-center gap-2 hover:underline font-semibold mb-4"
          onClick={() => onClose()}
        >
          <FaLongArrowAltLeft /> Back to Articles
        </button>
        <Image
          src={getCleanImageUrl(blog.imageUrl)}
          alt={blog.title}
          width={600}
          height={200}
          className="w-[70%] h-auto rounded-xl object-cover"
        />
        <p className="text-greyText text-[16px] mb-10">
          <span>{formatDate(blog.createdAt)}</span> ·{' '}
          <span>{blog.timeToRead} min read</span>
        </p>
        <h2 className="text-3xl font-bold">{blog.title}</h2>
        <article className="text-lg ">
          {SafeContent({ html: blog.content })}
        </article>
      </div>
    </section>
  );
}
