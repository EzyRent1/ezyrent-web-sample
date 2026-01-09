'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Mail } from 'lucide-react';
import RightHandAuthPage from '@/components/RightHandAuthPage';
import MaxWidthWrapper from '@/app/maxWidthWrapper';
import { useRouter } from 'next/navigation';
import LappedImages from '@/components/LappedImages';

export default function EmailSent() {
  const router = useRouter();
  const handleResend = () => {
    // Logic for resending the password reset email or api call
    // console.log('Resending email...');
    // Trigger the resend process,
  };

  const handleGmail = () => {
    router.push('/reset-password');
  };

  return (
    <MaxWidthWrapper>
      <section className="min-h-[984px] mx-auto mb-10 flex items-center space-x-10">
        {/* left side */}

        <main className="h-[964px] w-full flex flex-col ">
          <div className="bg-[#F8F8F8] h-full mb-10 rounded-[20px] pt-[140px]">
            <div className="ml-5 pb-5">
              <div className="md:w-[80%] mx-auto">
                <div className="my-10 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="bg-[#E9D7FE] rounded-full size-20 flex items-center justify-center">
                    <Mail stroke={'#f1f1f1'} fill={'#7F56D9'} size={35} />
                  </div>
                  <h2 className="capitalize text-[#344054] text-[1.5rem] font-extrabold leading-[33.6px] -tracking-[2%]">
                    Check your email
                  </h2>
                  <p className="my-1px text-[#475467] text-[0.875rem] leading-[28px] font-medium -tracking-[2%] w-[80%]">
                    We sent a password reset link to your email. Please check
                    your inbox
                  </p>
                </div>

                <Button
                  onClick={handleGmail}
                  type="submit"
                  className={cn(
                    'bg-[#000929] h-[72px]  w-full capitalize text-[1.25rem] font-medium leading-[28px] mx-auto rounded-[80px] hover:bg-opacity-85 transition-colors duration-150'
                  )}
                >
                  Open Gmail
                </Button>

                {/* resend */}
                <div className="flex items-center justify-center mt-5 font-medium text-[1rem] leading-[22.4px]">
                  Didn&apos;t receive the email?{' '}
                  <Button
                    onClick={handleResend}
                    variant={'ghost'}
                    className="capitalize text-[#6941C6] text-[1rem] leading-[22.4px]"
                  >
                    Resend
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* lapped images */}
          <LappedImages />
        </main>
        {/* right side */}
        <RightHandAuthPage />
      </section>
    </MaxWidthWrapper>
  );
}
