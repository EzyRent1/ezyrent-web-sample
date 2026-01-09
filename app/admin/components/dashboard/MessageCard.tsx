import Image, { StaticImageData } from 'next/image';
import { GoDotFill } from 'react-icons/go';

interface MessageCardProps {
  senderPhoto: StaticImageData | string;
  senderName: string;
  timeStamp?: string;
  isRead?: boolean;
  content: string;
}

export const MesssageCard = ({
  senderPhoto,
  senderName,
  content,
  timeStamp = 'Just now'
}: MessageCardProps) => {
  return (
    <div className="flex items-center gap-2 p-4">
      <Image
        src={typeof senderPhoto === 'string' ? senderPhoto : senderPhoto.src}
        alt={senderName}
        width={48}
        height={48}
        className="w-12 h-12 object-contain rounded-full mr-4"
      />
      <div>
        <h2 className="text-lg font-semibold">{senderName}</h2>
        <p className="text-[#666666]">{content}</p>
      </div>
      <div className="flex flex-col items-end ml-auto">
        <span className="text-xs  md:text-base text-[#666666]">
          {timeStamp}
        </span>
        <GoDotFill size={18} className="text-[#7065F0]" />
      </div>
    </div>
  );
};
