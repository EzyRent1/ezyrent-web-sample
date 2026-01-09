'use client';
import React, { useEffect, useState } from 'react';
import MuiTableComponent from '../Table/TableComponent';
import { PiDownloadSimpleFill, PiSlidersHorizontalFill } from 'react-icons/pi';
import { UserStatsCard } from '../statCard';
import { UsersColumns } from '../Table/columns';
interface UserMgtProps {
  isSidebarExpanded: boolean;
}

export default function UserMgt({ isSidebarExpanded }: UserMgtProps) {
  const [UserMetrics, setUserMetrics] = useState({
    totalUsers: {
      title: 'Total Users',
      count: 0,
      percentageChange: 0
    },
    verifiedUsers: { title: 'Verified Users', count: 0, percentageChange: 0 },
    freeUsers: { title: 'Free Users', count: 0, percentageChange: 0 }
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersMgt = async () => {
      try {
        // const response = await fetch('/api/overview');
        // if (!response.ok) {
        //   throw new Error('Failed to fetch dashboard overview data');
        // }
        // const { data } = await response.json();
        // console.log('Users Mgt Data:', data);

        setUserMetrics((prev) => ({
          ...prev,
          totalUsers: {
            title: 'Total Users',
            count: 245,
            percentageChange: 20
          },
          verifiedUsers: {
            title: 'New Users',
            count: 450,
            percentageChange: 15
          },
          freeUsers: {
            title: 'Active Users',
            count: 570,
            percentageChange: 0
          }
        }));
      } catch (error) {
        console.error('Error fetching User mgt:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users data');
        }
        const { data } = await response.json();
        console.log('Users Data:', data.data);
        setUsers(data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsersMgt();
    fetchUsers();
  }, []);

  const metricsArray: Metric[] = Object.values(UserMetrics);
  const UserMgtStats = metricsArray.map((metric) => ({
    title: metric.title,
    value: metric.count.toLocaleString(),
    percentage: metric.percentageChange
  }));

  return (
    <div className="flex flex-col gap-5 px-4 md:px-10 py-5">
      {/* statistics section */}
      <section
        id="User-mgt-stats"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {UserMgtStats?.map((stat, index) => (
          <UserStatsCard
            textColor="text-[#000929]"
            key={index}
            title={stat.title}
            value={stat.value}
            increase={stat.percentage > 0}
            percentage={stat.percentage}
          />
        ))}
      </section>

      {/* table section */}
      <section
        id="user-mgt-table"
        className={`flex flex-col gap-2 ${isSidebarExpanded ? ' w-[1100px] mx-auto' : 'ml-0 w-full'}   rounded-2xl`}
      >
        <div className="flex justify-between p-5 items-center">
          <div className="flex items-center gap-8">
            <h3 className="text-2xl">User Data</h3>{' '}
            <button className="border border-[rgb(173,173,173)] p-1 rounded-lg">
              <PiSlidersHorizontalFill size={18} />
            </button>
          </div>
          <button className="flex items-center text-white gap-2 bg-[#7065F0] rounded-lg px-4 py-2 ">
            <PiDownloadSimpleFill size={24} />
            Download
          </button>
        </div>

        <div className="w-full min-h-[200px]">
          <MuiTableComponent
            rows={users}
            columns={UsersColumns}
            pageSize={10}
            loading={loading}
            setPageSize={() => {}}
            paginationActive={true}
            showCheckbox={false}
          />
        </div>
      </section>
    </div>
  );
}
