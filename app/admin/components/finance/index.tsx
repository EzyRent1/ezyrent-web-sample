'use client';
import React, { useEffect, useState } from 'react';
import { FinanceTableRows } from '../../config';
import MuiTableComponent from '../Table/TableComponent';
import { PiSlidersHorizontalFill } from 'react-icons/pi';
import { UserStatsCard } from '../statCard';
import { formatAmount } from '@/app/util';
import { FinanceColumns } from '../Table/columns';
import { DashboardLoadingState } from '../DashboardLoadingState';

interface FinanceProps {
  isSidebarExpanded: boolean;
}

export default function Finance({ isSidebarExpanded }: FinanceProps) {
  const [loading, setLoading] = useState(true);
  const [UserMetrics, setUserMetrics] = useState({
    totalRevenue: {
      title: 'Total Revenue',
      count: 0,
      percentageChange: 0
    },
    inspectionRevenue: {
      title: 'Inspection Revenue',
      count: 0,
      percentageChange: 0
    },
    revenueFromRent: {
      title: 'Revenue from Rent',
      count: 0,
      percentageChange: 0
    }
  });

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
          totalRevenue: {
            title: 'Total Revenue',
            count: 450325.31,
            percentageChange: 20
          },
          inspectionRevenue: {
            title: 'New Inspection Revenue',
            count: 427755.2,
            percentageChange: 15
          },
          revenueFromRent: {
            title: 'Revenue from Rent',
            count: 143890.44,
            percentageChange: 0
          }
        }));
      } catch (error) {
        console.error('Error fetching User mgt:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersMgt();
  }, []);

  const metricsArray: Metric[] = Object.values(UserMetrics);
  const FinanceStats = metricsArray.map((metric) => ({
    title: metric.title,
    value: formatAmount(metric.count),
    percentage: metric.percentageChange
  }));

  return loading ? (
    <DashboardLoadingState grid1Cols={3} grid2Cols={1} />
  ) : (
    <div className="flex flex-col gap-5 px-4 md:px-10 py-5">
      {/* statistics section */}
      <section
        id="Finance-stats"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {FinanceStats?.map((stat, index) => (
          <UserStatsCard
            // cardBgColor="bg-[#7065F0]"
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
        id="Finance-mgt-table"
        className={`flex flex-col gap-2 ${isSidebarExpanded ? ' w-[1100px] mx-auto' : 'ml-0 w-full'}   rounded-2xl`}
      >
        <div className="flex items-center my-5 gap-8">
          <h3 className="text-2xl">Transaction History</h3>{' '}
          <button className="border border-[rgb(173,173,173)] p-1 rounded-lg">
            <PiSlidersHorizontalFill size={18} />
          </button>
        </div>

        <div className="w-full min-h-[200px]">
          <MuiTableComponent
            rows={FinanceTableRows()}
            columns={FinanceColumns}
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
