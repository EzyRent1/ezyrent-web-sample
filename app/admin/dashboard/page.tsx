'use client';
import React, { useState } from 'react';
import DashboardLayout from '../components/Layouts';
import Dashboard from '../components/dashboard';

export default function Home() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  return (
    <DashboardLayout
      title="Dashboard"
      sidebarProps={{ onSidebarHoverChange: setIsSidebarExpanded }}
    >
      <Dashboard isSidebarExpanded={isSidebarExpanded} />
    </DashboardLayout>
  );
}
