'use client';

import React, { useCallback, useEffect, useState } from 'react';
import StatsCard from './StatCard';
import { Button } from '@/components/ui/button';
import { MesssageCard } from './MessageCard';
import dayjs from 'dayjs';
import MuiTableComponent from '../Table/TableComponent';
import { AreaLineChart } from '../Charts/AreaChart';
import { DashboardMessages, DashboardTableRows } from '../../config';
import Link from 'next/link';
import { ITEMS_PER_PAGE } from '../../constants';
import { DashboardColumns } from '../Table/columns';
import { ErrorState } from '@/components/propertyState';
import { DashboardLoadingState } from '../DashboardLoadingState';

interface DashboardProps {
  isSidebarExpanded: boolean;
}

export default function Dashboard({ isSidebarExpanded }: DashboardProps) {
  const [dataLenght, setDataLength] = useState(3);
  const [allMessages, setAllMessages] = useState(false);
  const [properties, setProperties] = useState<HouseListing[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [DashboardMetrics, setDashboardMetrics] = useState({
    totalProperties: {
      title: 'Total Properties',
      count: 0,
      percentageChange: 0
    },
    bookedTours: { title: 'Booked Tours', count: 0, percentageChange: 0 },
    totalUsers: { title: 'Total Users', count: 0, percentageChange: 0 },
    totalRevenue: { title: 'Total Revenue', count: 0, percentageChange: 0 }
  } as DashboardMetrics);
  const [propertyListedByMonth, setPropertyListedByMonth] =
    useState<ListingByMonthData>([]);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await fetch('/api/overview');
        // console.log('response', response);
        if (!response.ok) {
          setError('Failed to fetch dashboard overview data');
          throw new Error('Failed to fetch dashboard overview data');
        }
        const { data } = await response.json();

        setDashboardMetrics((prev) => ({
          ...prev,
          totalProperties: {
            title: 'Total Properties',
            count: data.properties.count,
            percentageChange: data.properties.percentageChange
          },
          bookedTours: {
            title: 'Booked Tours',
            count: data.bookings.count,
            percentageChange: data.bookings.percentageChange
          },
          totalUsers: {
            title: 'Total Users',
            count: data.users.count,
            percentageChange: data.users.percentageChange
          },
          totalRevenue: {
            title: 'Total Revenue',
            count: data.revenue.amount,
            percentageChange: data.revenue.percentageChange
          }
        }));
      } catch (error) {
        console.error('Error fetching dashboard overview:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPropertyListedByMonth = async () => {
      try {
        const response = await fetch('/api/listing-by-month');
        if (!response.ok) {
          throw new Error('Failed to fetch listing by month data');
        }
        const { data } = await response.json();
        const formattedData = data.map((item: PropertyListedByMonth) => ({
          month: dayjs(item.month).format('MMM'),
          count: item.count * 1000
        }));
        setPropertyListedByMonth(formattedData);
      } catch (error) {
        console.error('Error fetching dashboard overview:', error);
      }
    };

    fetchOverview();
    fetchPropertyListedByMonth();
  }, []);

  const fetchProperties = useCallback(async () => {
    try {
      // setError(null);
      const queryParams = new URLSearchParams({
        page: page > 0 ? page.toString() : '1',
        limit: ITEMS_PER_PAGE.toString()
      });

      const response = await fetch(`/api/fetch-listing?${queryParams}`, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.statusText}`);
      }

      const {
        data: { data }
      } = await response.json();
      setProperties(data);
    } catch (err) {
      // const errorMessage =
      //   err instanceof Error ? err.message : 'Failed to fetch properties';
      console.error('Error fetching properties:', err);
      // setError(errorMessage);
    }
  }, [page]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const metricsArray: Metric[] = Object.values(DashboardMetrics);
  const DashboardStats = metricsArray.map((metric) => ({
    title: metric.title,
    value: metric.count.toLocaleString(),
    percentage: metric.percentageChange
  }));

  const reTry = () => {
    window.location.reload();
  };
  return loading ? (
    <DashboardLoadingState />
  ) : error ? (
    <ErrorState message={error} onRetry={reTry} />
  ) : (
    <div className="flex flex-col gap-5 px-4 md:px-10 py-5">
      {/* statistics section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {DashboardStats?.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            percentage={stat.percentage}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between   gap-10">
        <div className="flex flex-col gap-2 bg-white w-full md:w-1/2 p-5 rounded-2xl">
          <h3 className="text-2xl font-[500px]">Revenue Analytics</h3>
          {/* chart */}
          <AreaLineChart
            data={propertyListedByMonth}
            dataKey="count"
            color="#7065F0"
            xKey="month"
          />
        </div>

        <div className="flex flex-col gap-2 bg-white w-full md:w-1/2 p-5 rounded-2xl">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl">Messages</h3>{' '}
            <Button
              onClick={() => setAllMessages((prev) => !prev)}
              className="bg-transparent border-none shadow-none text-[20px] text-[#7065F0]"
            >
              {allMessages ? 'view less' : 'view all'}
            </Button>
          </div>

          {DashboardMessages?.map((message, index) =>
            allMessages ? (
              <Link href={`/admin/messages`} key={index}>
                <MesssageCard
                  senderName={message.senderName}
                  senderPhoto={message.senderPhoto}
                  content={message.content}
                  timeStamp={message.timeStamp}
                />
              </Link>
            ) : (
              index < 2 && (
                <Link href={`/admin/messages`} key={index}>
                  <MesssageCard
                    senderName={message.senderName}
                    senderPhoto={message.senderPhoto}
                    content={message.content}
                    timeStamp={message.timeStamp}
                  />
                </Link>
              )
            )
          )}
        </div>
      </div>
      <div
        className={`flex flex-col gap-2 bg-white ${isSidebarExpanded ? ' w-[1100px] mx-auto' : 'ml-0 w-full'}   rounded-2xl`}
      >
        <div className="flex justify-between p-5 items-center">
          <h3 className="text-2xl">Properties</h3>{' '}
          <Button
            onClick={() =>
              setDataLength((prev) =>
                prev === 3 ? DashboardTableRows().length : 3
              )
            }
            className="bg-transparent border-none shadow-none text-[20px] text-[#7065F0]"
          >
            {dataLenght === 3 ? 'View all' : 'View less'}
          </Button>
        </div>

        <div className="w-full min-h-[200px]">
          <MuiTableComponent
            rows={properties}
            columns={DashboardColumns}
            pageSize={dataLenght}
            setPageSize={setDataLength}
            paginationActive={true}
            showCheckbox={false}
            page={page} // DataGrid uses 0-based index for pages
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}
