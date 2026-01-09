'use client';
import React, { useState } from 'react';
import DashboardLayout from '../components/Layouts';
import TourMgt from '../components/tour';

export default function UserMgtPage() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  return (
    <DashboardLayout
      title="Tour Management"
      sidebarProps={{ onSidebarHoverChange: setIsSidebarExpanded }}
    >
      <TourMgt isSidebarExpanded={isSidebarExpanded} />
    </DashboardLayout>
  );
}
