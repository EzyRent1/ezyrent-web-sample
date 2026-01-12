import React from 'react';
import Breadcrumb from '@/components/breadcrumb';
import Link from 'next/link';
import { privacyPolicySections, SPECIAL_TOKENS } from '@/config/privacyPolicy';
import MaxWidthWrapper from '../maxWidthWrapper';

export default function PrivacyPolicy() {
  const tokenRegex = new RegExp(
    `(${SPECIAL_TOKENS.map((t) => t.match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'g'
  );

  const renderContent = (content: string) => {
    return content.split(tokenRegex).map((part, index) => {
      // Privacy Policy
      if (part === 'Privacy Policy') {
        return (
          <Link
            key={index}
            href="/privacy-policy"
            className="text-blue-500 underline"
          >
            Privacy Policy
          </Link>
        );
      }

      // Email
      if (part === 'info@ezyrent.org') {
        return (
          <a
            key={index}
            href="mailto:info@ezyrent.org"
            className="text-blue-500 underline"
          >
            info@ezyrent.org
          </a>
        );
      }

      // External links
      if (part.startsWith('http')) {
        return (
          <a
            key={index}
            href={part}
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </a>
        );
      }

      // Ensure "of" is lowercase (text-only parts)
      if (/\bof\b/i.test(part)) {
        return (
          <span key={index}>
            {part.split(/\bof\b/i).map((p, i, arr) =>
              i < arr.length - 1 ? (
                <>
                  {p}
                  <span className="lowercase">of</span>
                </>
              ) : (
                p
              )
            )}
          </span>
        );
      }

      return <span key={index}>{part}</span>;
    });
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
