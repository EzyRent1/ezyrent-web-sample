import Image from 'next/image';

type Message = {
  id: number;
  photo: { src: string };
  name: string;
  title: string;
  content: string;
  time: string;
  status: 'read' | 'unread';
};

export const UserMessageList = ({
  message,
  onClick
}: {
  message: Message;
  onClick: (id: number) => void;
}) => {
  return (
    <div
      key={message.id}
      onClick={() => onClick(message.id)}
      className={`flex items-center cursor-pointer  border-b gap-5 p-3  bg-white`}
    >
      <Image
        src={message.photo.src}
        alt="Profile"
        width={25}
        height={25}
        className="w-12 h-12 object-cover rounded-full"
      />
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{message.name}</h3>
        <p className="text-sm text-gray-400">{message.content}</p>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-400">{message.time}</span>
        {message.status === 'unread' && (
          <span className=" w-5 h-5 rounded-full flex items-center justify-center bg-[#745DE3CC] text-white">
            1
          </span>
        )}
      </div>
    </div>
  );
};
