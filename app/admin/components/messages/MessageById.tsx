import { use, useState } from 'react';
import { GoSearch } from 'react-icons/go';
import profile1 from '../../assets/Ellipse-4.png';
import profile2 from '../../assets/Ellipse-6.png';
import { BsSend, BsThreeDotsVertical } from 'react-icons/bs';
import Image from 'next/image';

export interface MessageProps {
  params: Promise<{ id: string }>;
}
type Message = {
  id: number;
  photo: { src: string };
  name: string;
  title: string;
  content: string;
  time: string;
  status: 'read' | 'unread';
};

const messages = [
  {
    id: 1,
    photo: profile1,
    name: 'Mishel Smith',
    title: 'New message from John Doe',
    content: 'Hello, I am interested in your property.',
    time: '2:30 PM',
    status: 'unread'
  },
  {
    id: 2,
    photo: profile2,
    name: 'Igashi Mike',
    title: 'New message from Jane Smith',
    content: 'I would like to schedule a viewing.',
    time: '11:00 AM',
    status: 'read'
  },
  {
    id: 3,
    photo: profile1,
    name: 'Suzy Doe',
    title: 'New message from Jane Smith',
    content: 'I would like to schedule a viewing.',
    time: '11:00 AM',
    status: 'read'
  },
  {
    id: 4,
    photo: profile2,
    name: 'John James',
    title: 'New message from Jane Smith',
    content: 'I would like to schedule a viewing.',
    time: '11:00 AM',
    status: 'read'
  }
];

export default function MessagesById({ params }: MessageProps) {
  const [messageState, setMessageState] = useState('all');
  // const [searchQuery, setSearchQuery] = useState('');
  const [adminMessages, setAdminMessages] = useState('');
  const [adminMessagesList, setAdminMessagesList] = useState<
    { content: string; time: string; customerId: number }[]
  >([]);
  const [activeChat, setActiveChat] = useState<Message>({
    id: 1,
    photo: profile1,
    name: 'John Doe',
    title: 'New message from John Doe',
    content: 'Hello, I am interested in your property.',
    time: '2:30 PM',
    status: 'unread'
  } as Message);
  // Get the id using React.use()
  const { id } = use(params);
  console.log(id);
  const SendMessage = () => {
    if (!adminMessages.trim()) return;

    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    setAdminMessagesList((prev) => [
      ...prev,
      { content: adminMessages, time: formattedTime, customerId: activeChat.id }
    ]);
    setAdminMessages(''); // Clear input
  };

  const handleNotificationClick = (id: number) => {
    // Handle notification click logic here
    console.log('Notification clicked', id);
    const clickedMessage = messages.find((message) => message.id === id);
    setActiveChat(clickedMessage as Message);
  };

  const activeAdminMessages = adminMessagesList.filter(
    (msg) => msg.customerId === activeChat.id
  );

  return (
    <div className="flex flex-col gap-5 px-5 md:px-10 py-5">
      <div className="flex flex-wrap gap-y-2 w-full  justify-between">
        <div className="flex gap-5 justify-around rounded-full bg-[#EBEBEB] w-full md:w-fit mr-auto px-7 py-1 md:py-3">
          <button
            onClick={() => setMessageState('all')}
            className={`${messageState === 'all' && 'rounded-3xl px-5 md:py-2 py-1 bg-white'}`}
          >
            All
          </button>{' '}
          <button
            className={`${messageState === 'read' && 'rounded-3xl px-5 md:py-2 py-1 bg-white'}`}
            onClick={() => setMessageState('read')}
          >
            Read
          </button>{' '}
          <button
            className={`${messageState === 'unread' && 'rounded-3xl px-5 md:py-2 py-1 bg-white'}`}
            onClick={() => setMessageState('unread')}
          >
            Unread
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-2xl px-5 md:py-3 py-2 placeholder:text-[#99999999] text-black bg-inherit border border-[#745DE3CC] w-full md:w-[300px]">
          <input
            type="text"
            className="outline-none bg-inherit w-full"
            placeholder="Search messeges"
          />
          <GoSearch size={24} />
        </div>
      </div>
      <div className="flex ">
        {/* messages notification */}
        <div className="w-full md:w-[30%] bg-white pb-0 flex flex-col gap-5 ">
          {messages.map((message) => (
            <div
              key={message.id}
              onClick={() => handleNotificationClick(message.id)}
              className={`flex items-center cursor-pointer  border-b gap-5 p-3  bg-white`}
            >
              <Image
                src={message.photo.src}
                width={12}
                height={12}
                alt="Profile"
                className="w-12 h-12 rounded-full"
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
          ))}
        </div>

        <div className="hidden w-full md:w-[70%] md:flex flex-col border p-5">
          <div className="flex justify-between items-center mb-4 border-b">
            <div className="flex items-center  gap-5 mb-5">
              <div className="relative">
                <Image
                  src={activeChat.photo.src}
                  width={12}
                  height={12}
                  alt="profile image"
                  className="w-12 h-12 rounded-full"
                />
                <span className="absolute w-3 h-3 bg-green-500 rounded-full bottom-0 right-0 border border-white"></span>
              </div>

              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{activeChat.name}</h3>
                <p className="text-sm text-gray-400">Online</p>
              </div>
            </div>
            <BsThreeDotsVertical size={20} />
          </div>

          {/* messages */}
          <div className="relative w-full h-full flex flex-col justify-between">
            {/* Chat messages */}
            <div className="flex flex-col w-full gap-5 p-5 pb-32 overflow-y-auto">
              {' '}
              {/* Add bottom padding to prevent overlap with input */}
              {/* user */}
              <div className="self-start max-w-[575px] bg-[#99999926] rounded-xl p-4">
                <div className="flex flex-col gap-3">
                  <p>{activeChat.content}</p>
                  <div className="flex justify-end">
                    <span>{activeChat.time}</span>
                  </div>
                </div>
              </div>
              {/* admin */}
              {activeAdminMessages.map((msg, index) => (
                <div
                  key={index}
                  className="self-end max-w-[575px] bg-[#7065F0] text-white rounded-xl p-4"
                >
                  <div className="flex flex-col gap-3">
                    <p>{msg.content}</p>
                    <div className="flex justify-end">
                      <span>{msg.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input box */}
            <div className="flex gap-x-6 items-center absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl bg-inherent">
              <div className=" border border-[#745DE3CC] w-[90%] rounded-xl px-4 py-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={adminMessages}
                  onChange={(e) => setAdminMessages(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && adminMessages.trim()) {
                      SendMessage();
                    }
                  }}
                  className="w-full bg-transparent outline-none"
                />
              </div>
              <button
                onClick={SendMessage}
                disabled={!adminMessages}
                className={`bg-[#7065F0] text-white p-4 rounded-xl transition disabled:brightness-70 disabled:cursor-not-allowed`}
              >
                <BsSend size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
