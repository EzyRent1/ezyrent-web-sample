import { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import profile1 from '../../assets/Ellipse-4.png';
import profile2 from '../../assets/Ellipse-6.png';
import { BsSend, BsThreeDotsVertical } from 'react-icons/bs';
import { useWindowResizer } from '@/hooks/useWindowResizer';
import Image from 'next/image';
import { UserMessageList } from './MessageNotification';

export type Message = {
  id: number;
  photo: { src: string };
  name: string;
  title: string;
  content: string;
  time: string;
  status: 'read' | 'unread';
};

const messages: Message[] = [
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

export default function Messages({
  isSideBarOpen
}: {
  isSideBarOpen: boolean;
}) {
  const [messageState, setMessageState] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminMessages, setAdminMessages] = useState('');
  const [isMobileChat, setIsMobileChat] = useState(false);
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
  const { windowWidth } = useWindowResizer();
  const isMobile = windowWidth < 768;

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

    if (isMobile) setIsMobileChat(true);
    const clickedMessage = messages.find((message) => message.id === id);
    setActiveChat(clickedMessage as Message);
  };

  const activeAdminMessages = adminMessagesList.filter(
    (msg) => msg.customerId === activeChat.id
  );

  const handleMessageStateChange = (state: string) => {
    setMessageState(state);
    setIsMobileChat(false); // Reset mobile chat state when changing message state
  };

  return (
    <div className="flex relative flex-col gap-3 px-5 md:px-10 overflow-hidden md:pt-20">
      {/* Fixed search and messages state toggler */}
      <nav
        id="messages-nav"
        className={`relative md:fixed   md:top-[110px] ${isSideBarOpen ? 'left-[180px]' : 'md:left-14 '} md:right-10 md:z-20 md:pt-5 pt-2 pb-4 px-5 md:px-10 flex flex-wrap gap-3 justify-between items-start md:items-center`}
      >
        {/* Status buttons */}
        <div className="flex gap-3  bg-[#EBEBEB]  rounded-full px-4 py-1 md:py-2">
          {['all', 'read', 'unread'].map((state) => (
            <button
              key={state}
              onClick={() => handleMessageStateChange(state)}
              className={`px-5 py-2 rounded-3xl transition ${
                messageState === state ? 'bg-white font-semibold' : ''
              }`}
            >
              {state.charAt(0).toUpperCase() + state.slice(1)}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2 rounded-2xl px-4 py-2 border border-[#745DE3CC] w-full md:w-[300px]">
          <input
            type="text"
            className="outline-none bg-transparent w-full placeholder:text-[#99999999]"
            placeholder="Search messages"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <GoSearch size={24} />
        </div>
      </nav>

      <section id="message-list" className="flex flex-col md:flex-row">
        {/* messages notification */}

        {/* desktop */}
        <div className="hidden w-[30%] bg-white pb-0 lg:flex flex-col overflow-y-auto gap-5 ">
          {messageState === 'all'
            ? messages.map((message) => (
                <UserMessageList
                  key={message.id}
                  message={message}
                  onClick={handleNotificationClick}
                />
              ))
            : messageState === 'read'
              ? messages
                  .filter((message) => message.status === 'read')
                  .map((message) => (
                    <UserMessageList
                      key={message.id}
                      message={message}
                      onClick={handleNotificationClick}
                    />
                  ))
              : messages
                  .filter((message) => message.status === 'unread')
                  .map((message) => (
                    <UserMessageList
                      key={message.id}
                      message={message}
                      onClick={handleNotificationClick}
                    />
                  ))}
        </div>
        <div className="hidden w-[70%] lg:flex flex-col border p-5">
          <div className="flex justify-between items-center mb-4 border-b">
            <div className="flex items-center  gap-5 mb-5">
              <div className="relative">
                <Image
                  width={48}
                  height={48}
                  src={activeChat.photo.src}
                  alt="profile image"
                  className="object-contain rounded-full"
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

        {/* mobile */}
        {isMobile &&
          (!isMobileChat ? (
            <div className="w-full bg-white overflow-y-auto pb-0 flex flex-col gap-5 ">
              {messageState === 'all'
                ? messages.map((message) => (
                    <UserMessageList
                      key={message.id}
                      message={message}
                      onClick={handleNotificationClick}
                    />
                  ))
                : messageState === 'read'
                  ? messages
                      .filter((message) => message.status === 'read')
                      .map((message) => (
                        <UserMessageList
                          key={message.id}
                          message={message}
                          onClick={handleNotificationClick}
                        />
                      ))
                  : messages
                      .filter((message) => message.status === 'unread')
                      .map((message) => (
                        <UserMessageList
                          key={message.id}
                          message={message}
                          onClick={handleNotificationClick}
                        />
                      ))}
            </div>
          ) : (
            <div className=" w-full h-[calc(100vh-14rem)] flex flex-col border p-5">
              <div className="flex justify-between items-center mb-4 border-b">
                <div className="flex items-center  gap-5 mb-5">
                  <div className="relative">
                    <Image
                      width={48}
                      height={48}
                      src={activeChat.photo.src}
                      alt="profile image"
                      className="object-contain rounded-full"
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
          ))}
      </section>
    </div>
  );
}
