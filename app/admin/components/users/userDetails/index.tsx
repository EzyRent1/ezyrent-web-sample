'use client';
import Image from 'next/image';
import { useState } from 'react';
import { MdOutlineMail } from 'react-icons/md';
import { PiPhoneLight } from 'react-icons/pi';
import { SlLocationPin, SlUser } from 'react-icons/sl';
import profile2 from '../../../assets/Ellipse-6.png';
import { CiCalendar } from 'react-icons/ci';
import { BsSend } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import { IoStarSharp } from 'react-icons/io5';
import CopyToClipboard from '@/components/CopyToClipboard';
import { Card } from './Card';
import { DetailNav } from './DynamicNav';
import { ProgressBar } from './ProgressiveBar';

interface UserDetailPageProps {
  user: UserData;
}

interface UserData {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  location?: string;
  profilePicture?: string;
  role?: string;
  status?: string;
  dateJoined?: string;
}

const RecentActivities = [
  {
    title: 'Assigned Inspection',
    desc: 'Assigned Inspection for EZyRent Villa',
    time: '2 days ago'
  },
  {
    title: 'Completed Inspection',
    desc: 'Completed Inspection at EZyRent Villa',
    time: '1 week ago'
  }
];

const AssignedProperties = [
  {
    title: 'Sunset Apartment',
    location: 'Sunset Estate, Ikeja, Lagos',
    date: '24-05-2025'
  },
  {
    title: 'Sunset Apartment',
    location: 'Sunset Estate, Ikeja, Lagos',
    date: '24-05-2025'
  },
  {
    title: 'Sunset Apartment',
    location: 'Sunset Estate, Ikeja, Lagos',
    date: '24-05-2025'
  }
];

const InspectionHistory = [
  {
    firstName: 'Michael Scott',
    title: 'Sunset Apartment',
    location: 'Sunset Estate, Ikeja, Lagos',
    phone: '123-456-7890',
    date: '24-05-2025'
  },
  {
    firstName: 'Michael Scott',
    title: 'Sunset Apartment',
    location: 'Sunset Estate, Ikeja, Lagos',
    phone: '123-456-7890',
    date: '24-05-2025'
  },
  {
    firstName: 'Michael Scott',
    title: 'Sunset Apartment',
    location: 'Sunset Estate, Ikeja, Lagos',
    phone: '123-456-7890',
    date: '24-05-2025'
  }
];
export default function UserPage({ user }: UserDetailPageProps) {
  // const [userData, setUserData] = useState<UserData>({
  //   id: '',
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: '',
  //   location: '',
  //   profilePicture: '',
  //   role: '',
  //   status: '',
  //   dateJoined: ''
  // });
  const [navState, setNavState] = useState('overview');

  //  fetch user data based on the id
  // useEffect(() => {
  //   console.log('index user :', user);
  //   async function fetchUserData() {
  //     try {
  //       setTimeout(() => {
  //         setUserData({
  //           firstName: 'Michael Scott',
  //           email: 'michael.scott@dundermifflin.com',
  //           role: 'Regional Manager',
  //           phone: '123-456-7890',
  //           location: 'Scranton, PA',
  //           profilePicture: profile2.src,
  //           id: '23ad',
  //           status: 'Active',
  //           dateJoined: '2023-01-15'
  //         } as UserData);
  //       }, 500); // Simulate network delay
  //       // Mock data for demonstration
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchUserData();
  // }, [id]);
  return (
    <div className=" px-6 md:px-16 py-8 bg-[#F8FBFF]  w-full">
      <main className="flex flex-col gap-12">
        <section className="flex flex-col md:flex-row items-center gap-5 md:gap-10 w-full ">
          <div className="w-[170px] h-[170px]">
            <Image
              src={user.profilePicture || profile2.src}
              alt="User Image"
              // width={340}
              // height={340}
              width={170}
              height={170}
              className="w-full h-full rounded-full object-cover border border-gray-300 shadow"
            />
          </div>

          <div className="space-y-4 w-full md:w-[60%]">
            <div className="flex flex-col md:flex-row justify-between md:items-center w-full">
              <div className="flex flex-col gap-2 ">
                <h1 className="text-[32px] font-bold">{user.firstName}</h1>
                <div className="text-[#3F3F3F] flex flex-col gap-3 ">
                  <span className="flex items-center gap-1  font-medium text-sm">
                    <PiPhoneLight className="text-[#000929]" />
                    {user.phone || 'N/A'}
                  </span>
                  <span className=" text-sm font-medium flex items-center gap-1 ">
                    <MdOutlineMail className="text-[#000929]" />{' '}
                    {user.email || 'N/A'}
                  </span>
                  <span className=" text-sm font-medium flex items-center gap-1 ">
                    <SlLocationPin className="text-[#000929]" />{' '}
                    {user.location || 'N/A'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="flex items-center gap-2 text-sm font-medium">
                  Status:{' '}
                  <span
                    className={`rounded-3xl px-3 py-1 ${user.status === 'Active' ? 'bg-[#10DBC417] text-[#17A897]' : 'bg-[#FF4D4D]'}  border border-[#10DBC4]`}
                  >
                    {user.status || 'N/A'}
                  </span>
                </p>

                <p className="flex items-center gap-2 text-sm font-medium">
                  <CiCalendar /> Joined {'  '} {user.dateJoined || 'N/A'}
                </p>
              </div>
            </div>
            <button className="flex item-center py-2 gap-2 justify-center w-full bg-[#7065F0] rounded-lg text-white">
              <BsSend /> Send Message
            </button>
          </div>
        </section>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Detailed Information</h2>
          <DetailNav currentState={(state) => setNavState(state)} />
        </div>

        {navState === 'overview' ? (
          <>
            <section className="md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              <Card title="Total Inspections" value="147" />
              <Card
                title="Feedback Rating"
                additionalNode={
                  <p className="text-[32px] flex items-center gap-3">
                    1,313 <IoStarSharp className="text-[#FFCE31]" />
                  </p>
                }
              />
              <Card
                title="Completion Rate"
                additionalNode={
                  <div>
                    <p className="text-[32px]">80%</p>
                    <ProgressBar
                      rangeColor="#8EFF65"
                      rangePercent="80%"
                      height="8px"
                      wholeColor="#FFFFFF"
                    />
                  </div>
                }
              />
            </section>

            <section id="detailed-info" className="space-y-5">
              <div className="flex flex-col md:flex-row justify-between  w-full gap-10 mt-4">
                <div className="w-full md:w-[50%] p-6 bg-[#FFFFFF] border border-[#00000066] rounded-[20px]">
                  <h3 className="text-lg font-semibold">Performance Metrics</h3>
                  <div className="">
                    <div className="flex justify-between border-b p-3 text border-[#999999]">
                      <span className="text-[#676767]">
                        Total Inspections done
                      </span>
                      <span className="font-bold">20</span>
                    </div>

                    <div className="flex justify-between border-b p-3 text border-[#999999]">
                      <span className="text-[#676767]">
                        Average Inspection Time
                      </span>
                      <span className="font-bold">50 mins</span>
                    </div>

                    <div className="flex justify-between border-b p-3 text border-[#999999]">
                      <span className="text-[#676767]">
                        Total Assigned Properties
                      </span>
                      <span className="font-bold">20</span>
                    </div>

                    <div className="flex justify-between border-b p-3 text border-[#999999]">
                      <span className="text-[#676767]">
                        Pending Inspections
                      </span>
                      <span className="font-bold">20</span>
                    </div>
                  </div>
                </div>
                <div className=" w-full md:w-[50%] p-6 bg-[#FFFFFF] border border-[#00000066] rounded-[20px]">
                  <h3 className="text-lg font-semibold">Recent Activities</h3>

                  <div className="flex flex-col gap-3 ">
                    {RecentActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between "
                      >
                        <div className="flex items-center gap-6">
                          <GoDotFill
                            className={`${activity.title.startsWith('A') ? 'text-[#00D12A]' : 'text-[#7065F0]'}`}
                          />
                          <div className="flex flex-col">
                            <h4 className="text-xl">{activity.title}</h4>
                            <p className="text-sm text-[#666666]">
                              {activity.desc}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm text-[#666666]">
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : navState === 'assigned' ? (
          <>
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold">Assigned Properties</h3>
              <div className="flex flex-col gap-3">
                {AssignedProperties.map((property, index) => (
                  <div
                    key={index}
                    className="p-6 bg-[#FFFFFF] border border-[#00000066] space-y-2 rounded-[20px]"
                  >
                    <h4 className="text-lg font-semibold">{property.title}</h4>
                    <p className="text-sm flex gap-2 items-center text-[#666666]">
                      <SlLocationPin className="text-[#000929]" />{' '}
                      {property.location}
                    </p>
                    <p className="text-sm flex gap-2 items-center text-[#666666]">
                      <CiCalendar className="text-[#000929]" />
                      {property.date}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : navState === 'inspection' ? (
          <>
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold">Inspection History</h3>
              <div className="flex flex-col gap-3">
                {InspectionHistory.map((inspection, index) => (
                  <div
                    key={index}
                    className="p-6 bg-[#FFFFFF] border border-[#00000066] space-y-2 rounded-[20px]"
                  >
                    <h4 className="text-lg font-semibold">
                      {inspection.title}
                    </h4>
                    <p className="text-sm flex gap-2 items-center text-[#666666]">
                      <SlUser className="text-[#000929]" />{' '}
                      {inspection.firstName}
                    </p>
                    <p className="text-sm flex gap-2 items-center text-[#666666]">
                      <PiPhoneLight className="text-[#000929]" />
                      {inspection.phone}{' '}
                      <CopyToClipboard
                        type="phone"
                        textToCopy={inspection.phone}
                      />
                    </p>
                    <p className="text-sm flex gap-2 items-center text-[#666666]">
                      <SlLocationPin className="text-[#000929]" />{' '}
                      {inspection.location}
                    </p>
                    <p className="text-sm flex gap-2 items-center text-[#666666]">
                      <CiCalendar className="text-[#000929]" />
                      {inspection.date}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}
      </main>
    </div>
  );
}
