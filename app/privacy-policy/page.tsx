import React from 'react';
import Breadcrumb from '@/components/breadcrumb';
import Link from 'next/link';
import { privacyPolicySections } from '@/config/privacyPolicy';
import MaxWidthWrapper from '../maxWidthWrapper';

export default function PrivacyPolicy() {
  const renderContent = (content: string) => {
    // Handle Privacy Policy links
    if (content.includes('Privacy Policy')) {
      const parts = content.split('Privacy Policy');
      return (
        <>
          {parts[0]}
          <Link href="/privacy-policy" className="text-blue-500 underline">
            Privacy Policy
          </Link>
          {parts[1]}
        </>
      );
    }

    // Handle email links
    if (content.includes('info@ezyrent.org')) {
      const parts = content.split('info@ezyrent.org');
      return (
        <>
          {parts[0]}
          <a href="mailto:info@ezyrent.org" className="text-blue-500 underline">
            info@ezyrent.org
          </a>
          {parts[1]}
        </>
      );
    }

    // Handle blog links
    if (content.includes('https://ezyrent.medium.com')) {
      const parts = content.split('https://ezyrent.medium.com');
      return (
        <>
          {parts[0]}
          <a
            href="https://ezyrent.medium.com"
            className="text-blue-500 underline"
          >
            https://ezyrent.medium.com
          </a>
          {parts[1]}
        </>
      );
    }

    // Ensure "of" is always lowercase
    if (/\bof\b/.test(content)) {
      const parts = content.split(/\bof\b/);
      return (
        <>
          {parts[0]}
          <span className="lowercase">of</span>
          {parts[1]}
        </>
      );
    }

    return content;
  };

  return (
    <MaxWidthWrapper>
      <div className="px-2 md:px-20 max-w-[1050px]">
        <Breadcrumb />
        <main className="">
          <section className="mt-10">
            <h1 className="text-[1.1rem] md:text-[1.5rem] lg:text-[2rem] font-semibold text-[#000929] mb-4 leading-[50.4px]">
              EzyRent Privacy Notice
            </h1>
            <p className="leading-[33.6px] text-sm md:text-base">
              At EzyRent, your privacy is a top priority. This Privacy Policy
              explains how we collect, use, and safeguard your information when
              you use our platform, including the EzyRent website and mobile
              application.
              <br />
              By using EzyRent, you agree to the terms outlined in this Privacy
              Policy.
            </p>
          </section>

          <section className="flex flex-col space-y-5 mt-8">
            {privacyPolicySections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="privacy-policy__section">
                {section.title && (
                  <h2 className="text-[#000929] font-semibold text-[1.1rem] md:text-[1.5rem] lg:text-[2rem] mt-5">
                    {renderContent(section.title)}
                  </h2>
                )}
                {section.content.map((content, contentIndex) =>
                  typeof content === 'string' ? (
                    <p key={contentIndex} className="mt-4 text-sm md:text-base">
                      {renderContent(content)}
                    </p>
                  ) : (
                    <div key={contentIndex} className="privacy-policy__content">
                      {content.description && (
                        <p className="mt-8 font-semibold">
                          {renderContent(content.description)}
                        </p>
                      )}
                      {content.items && (
                        <ul className="list-disc flex flex-col space-y-3 my-4 pl-5">
                          {content.items.map((item, itemIdx) => (
                            <li key={itemIdx}>{renderContent(item)}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                )}
              </div>
            ))}
          </section>
        </main>
      </div>
    </MaxWidthWrapper>
  );
}
