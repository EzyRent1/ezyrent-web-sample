'use client';
import React from 'react';
import DashboardLayout from '../components/Layouts';
import Analytics from '../components/analytics';

export default function AnalyticsPage() {
  return (
    <DashboardLayout title="Analytics">
      <Analytics />
    </DashboardLayout>
  );
}
