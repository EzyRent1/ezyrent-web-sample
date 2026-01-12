import { House, MapPin, Wallet } from 'lucide-react';
import HeroBanner from '@/components/HeroBanner';
import { ReactNode } from 'react';

interface HeroBannerContentType {
  icon?: ReactNode;
  text: string;
  type: string;
  className?: string;
}

const heroBannerContents: HeroBannerContentType[] = [
  {
    icon: <MapPin size={20} fill={'#212121'} stroke="#f1f1f1" />,
    type: 'Location',
    text: 'Banana Island, Lagos'
  },
  {
    icon: <House size={20} />,
    type: 'Property Type',
    text: 'Classic Apartment'
  },
  {
    icon: <Wallet size={20} />,
    type: 'Budget',
    text: 'N900 - N1.7M'
  }
];

export default function DesktopHeroView() {
  return (
    <header className="hidden md:block ipad-height-adjust ">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-20">
        <div className="relative flex rounded-[40px] h-[574px] bg-[#7065F0] overflow-hidden mt-28">
          {/* right side */}
          <div className="pl-10  absolute mt-24 flex flex-col space-y-5">
            <h1 className="uppercase text-[1.3rem] md:text-[2rem]  lg:text-6xl leading-[20px] lg:leading-[64px] font-normal text-[#f1f1f1] flex flex-col space-y-10">
              <span>FIND THE PERFECT HOME</span>

              <span>TAILORED TO YOUR</span>

              <span>LIFESTYLE</span>
            </h1>
            <p className="text-left font-[300] italic py-5 text-[1.1rem] xl:text-[1.25rem] leading-7 text-[#f1f1f1] ">
              Looking for a home that truly fits you?
              <br />
              We&apo;re here to help you discover the ideal place for
              <br />
              your needs, your style, and your life.
            </p>
          </div>
          {/* left side */}
          <div className="rounded-tr-3xl rounded-br-3xl md:hidden lg:block bg-[url('/hero/desktopHeroImage_1102x617.webp')] bg-cover w-[1540px] h-[817px] -mt-[104px]  ml-28 lg:ml-[456px] bg-no-repeat" />
          {/* <div className="relative rounded-tr-3xl rounded-br-3xl overflow-hidden w-[1540px] h-[817px] -mt-[104px] ml-28 lg:ml-[456px] md:hidden lg:block">
            <Image
              src="/hero/desktopHeroImage_1102x617.webp"
              alt="Hero background"
              fill
              priority
              className="object-cover"
            />
          </div> */}
        </div>
        {/* banner */}
        <div className=" -mt-20 lg:-mt-20 xl:-mt-14 hero_banner hero_banner-border bg-opacity-60 shadow-md backdrop-blur-md h-28 max-w-[1116px] mx-auto z-5 flex items-center justify-between px-8 rounded-full">
          {heroBannerContents.map((heroBannerContent, index) => (
            <div
              key={heroBannerContent.type + index}
              className="flex items-center justify-around w-full"
            >
              <HeroBanner
                text={heroBannerContent.text}
                type={heroBannerContent.type}
                icon={heroBannerContent.icon}
              />
              {/* <div className="flex items-center justify-center px-4">
                <Separator
                  orientation="vertical"
                  className="bg-[#0009294D] h-12 w-[1px]"
                />
              </div> */}
            </div>
          ))}

          {/* <div className="bg-[#7065F0] rounded-[30px] py-2 px-4 cursor-pointer group transition-all duration-100 transform hover:scale-[1.03] hover:shadow-lg hover:bg-[#5a51d8]">
            <Search
              size={32}
              className="text-stone-50 h-8 w-8 group-hover:animate-pulse duration-100 ease-in-out"
            />
          </div> */}
        </div>
      </div>
    </header>
  );
}
