'use client';

import React, { useEffect, useState } from 'react';
import { PiDownloadSimpleFill, PiSlidersHorizontalFill } from 'react-icons/pi';
import { UserStatsCard } from '../statCard';
import MuiTableComponent from '../Table/TableComponent';
import { TourColumns } from '../Table/columns';
import { LoadingSkeleton } from '../LoadingSkeleton';

interface TourMgtProps {
  isSidebarExpanded: boolean;
}

type TourTableRow = {
  id: string;
  userName: string;
  tourDate: string;
  tourTime: string;
  propertyAddress: string;
  status: string;
  staff?: string;
};

type Metric = {
  title: string;
  count: number;
  percentageChange: number;
};

type MetricsState = {
  totalTourReq: Metric;
  pendingTour: Metric;
  assignedTour: Metric;
};

const initialMetrics: MetricsState = {
  totalTourReq: { title: 'Total Tour Requests', count: 0, percentageChange: 0 },
  pendingTour: { title: 'Pending Tour', count: 0, percentageChange: 0 },
  assignedTour: { title: 'Assigned Tour', count: 0, percentageChange: 0 }
};

export default function TourMgt({ isSidebarExpanded }: TourMgtProps) {
  const [tourMetrics, setTourMetrics] = useState<MetricsState>(initialMetrics);
  const [tableData, setTableData] = useState<TourTableRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTourMgt = async () => {
      try {
        const response = await fetch('/api/get-all-bookings');
        if (!response.ok) throw new Error('Failed to fetch bookings');

        const responseJson = await response.json();
        const bookings = responseJson?.data?.data;

        if (!Array.isArray(bookings)) throw new Error('Invalid response');
        setTableData(bookings);

        const pending = bookings.filter(
          (item) => item.status === 'PENDING'
        ).length;
        const assigned = bookings.filter(
          (item) => item.status === 'ASSIGNED'
        ).length;

        setTourMetrics({
          totalTourReq: {
            title: 'Total Tour Requests',
            count: bookings.length,
            percentageChange: 20
          },
          pendingTour: {
            title: 'Pending Tour',
            count: pending,
            percentageChange: 15
          },
          assignedTour: {
            title: 'Assigned Tour',
            count: assigned,
            percentageChange: 10
          }
        });

        setTableData(bookings);
      } catch (error) {
        console.error('Error loading bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourMgt();
  }, []);

  const TourMgtStats = Object.values(tourMetrics).map((metric) => ({
    title: metric.title,
    value: metric.count.toLocaleString(),
    percentage: metric.percentageChange
  }));

  return (
    <div className="flex flex-col gap-5 px-4 md:px-10 py-5">
      {/* stats section */}
      <section className="w-full flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[90%] grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))
            : TourMgtStats.map((stat, index) => (
                <UserStatsCard
                  key={index}
                  textColor="text-[#000929]"
                  title={stat.title}
                  value={stat.value}
                  increase={stat.percentage > 0}
                  percentage={stat.percentage}
                />
              ))}
        </div>
      </section>

      {/* table section */}
      <section
        className={`flex flex-col gap-2 ${
          isSidebarExpanded ? 'w-[1100px] mx-auto' : 'ml-0 w-full'
        } rounded-2xl`}
      >
        <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between p-5 md:items-center">
          <div className="flex items-center gap-8">
            <h3 className="text-2xl">Tour History</h3>
            <button className="border border-[rgb(173,173,173)] p-1 rounded-lg">
              <PiSlidersHorizontalFill size={18} />
            </button>
          </div>
          <div className="flex items-center gap-10">
            <button className="bg-[#7065F0] rounded-xl w-fit h-full text-white text-sm px-4 py-2">
              Add Staff
            </button>

            <button className="flex items-center text-sm text-white gap-2 bg-[#7065F0] rounded-2xl px-4 py-2">
              <PiDownloadSimpleFill size={24} />
              Download
            </button>
          </div>
        </div>

        <div className="w-full min-h-[200px]">
          <MuiTableComponent
            rows={tableData}
            columns={TourColumns}
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
