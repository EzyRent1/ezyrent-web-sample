'use client';

import React, { useEffect, useState } from 'react';

import {
  AnalyticsLineChartData,
  DashboardAreaChartData,
  AnalyticsPieChartData
} from '../../config';
import StatsCard from '../dashboard/StatCard';
import { AreaLineChart } from '../Charts/AreaChart';
import TwoArcPieChart from '../Charts/PieChart';
import ReusableLineChart from '../Charts/LineChart';
import dayjs from 'dayjs';
import { DashboardLoadingState } from '../DashboardLoadingState';

export default function Analytics() {
  const [loading, setLoading] = useState(true);
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
        if (!response.ok) {
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
          listing: item.count * 1000
        }));
        setPropertyListedByMonth(formattedData);
      } catch (error) {
        console.error('Error fetching dashboard overview:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
    fetchPropertyListedByMonth();
  }, []);

  const metricsArray: Metric[] = Object.values(DashboardMetrics);
  const DashboardStats = metricsArray.map((metric) => ({
    title: metric.title,
    value: metric.count.toLocaleString(),
    percentage: metric.percentageChange
  }));
  return loading ? (
    <DashboardLoadingState />
  ) : (
    <div className="flex flex-col gap-5 px-4 md:px-10 py-5">
      {/* statistics section */}
      <section
        id="analytics-stats"
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {DashboardStats?.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            percentage={stat.percentage}
          />
        ))}
      </section>

      <section
        id="analytics-charts-1"
        className="flex flex-col md:flex-row justify-between gap-y-5  gap-x-10"
      >
        <div className="flex flex-col gap-2 bg-white w-full md:w-1/2 p-5 rounded-2xl">
          <h3 className="text-lg md:text-2xl">Revenue Analytics</h3>
          {/* chart */}
          <AreaLineChart
            data={DashboardAreaChartData}
            dataKey="value"
            color="#7065F0"
            xKey="name"
          />
        </div>

        <div className="flex flex-col gap-2 bg-white w-full md:w-1/2 p-5 rounded-2xl">
          <h3 className="text-lg md:text-2xl">Property Listing Analytics</h3>{' '}
          {/*line chart here */}
          <ReusableLineChart
            data={propertyListedByMonth}
            dataKey="listing"
            type="linear"
            xKey="month"
          />
        </div>
      </section>

      <section
        id="analytics-charts-2"
        className="flex flex-col md:flex-row justify-between  gap-x-10 gap-y-5"
      >
        <div className="flex flex-col gap-2 bg-white w-full md:w-1/2 p-5 rounded-2xl">
          <h3 className="text-lg md:text-2xl ">Property View</h3>
          {/*line chart */}
          <ReusableLineChart
            data={AnalyticsLineChartData}
            dataKey="views"
            type="linear"
            xKey="month"
          />
        </div>

        <div className="flex flex-col gap-2 bg-white w-full md:w-1/2 p-5 rounded-2xl">
          <h3 className="text-lg md:text-2xl">Property Types</h3>{' '}
          {/*pie chart */}
          <TwoArcPieChart data={AnalyticsPieChartData} />
        </div>
      </section>
    </div>
  );
}
