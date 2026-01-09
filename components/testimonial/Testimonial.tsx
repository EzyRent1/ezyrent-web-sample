'use client';
import TestimonialCard from './TestimonialCard';
import { testimonials } from '@/config/testimonial';

export default function Testimonial() {
  return (
    <section className="mt-20 md:mt-40 max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 ">
      <div className="max-w-[699px] mx-auto text-center mb-8 px-4">
        <p className="capitalize text-[#7065F0] font-semibold text-[2.5rem] md:text-5xl md:leading-[67.2px]">
          Reviews
        </p>
        <p className="text-xl mb-5 md:text-2xl text-[#000929] first-letter:capitalize font-semibold">
          Hear from our community:
        </p>
        <p className="text-[1rem] md:text-2xl text-[#000929] first-letter:capitalize">
          Discover what Property managers, Landlords, and Tenants are saying
          about their experience.{' '}
          <span className="font-semibold inline-block">
            Real stories. Real feedback.
          </span>
        </p>
      </div>

      <div>
        <div className="flex items-start gap-6">
          <TestimonialCard testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
