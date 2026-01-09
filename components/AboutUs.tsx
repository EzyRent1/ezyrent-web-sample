import React from 'react';

export default function AboutUs() {
  return (
    <section id="about-us" className="bg-[#F0EFFB] mt-20 py-10 md:py-20">
      <div className=" max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20 ">
        <div className="max-w-[42em] text-center mx-auto">
          <h2 className="capitalize text-[#7065F0] font-semibold text-[2.5rem] md:text-5xl md:leading-[67.2px] ">
            about us
          </h2>
          <p className="mt-2 capitalize text-[#000929] font-[500] leading-[20px] md:leading-[44px] md:text-[1.8rem] lg:text-[2rem] w-[70%] lg:w-full mx-auto">
            Discover Our Story and Mission
          </p>
        </div>
        <p className="text-[#000929] mt-5 md:mt-10 font-normal text-2xl max-w-[744px] text-[1rem] mx-auto leading-[20px]">
          <strong className="">EzyRent </strong>is revolutionizing property
          rentals across Nigeria and Africa. Making it seamless to find, rent or
          sell homes from anywhere in the world. With user-first approach, we
          eliminate the hassle of agent fees and bring transparency ,
          convenience, and security to the rental process - all from the comfort
          of your home.
        </p>
      </div>
    </section>
  );
}
