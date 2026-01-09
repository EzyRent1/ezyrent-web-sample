'use client';
import React, { useState } from 'react';
import DashboardLayout from '../components/Layouts';
import Finance from '../components/finance';

export default function UserMgtPage() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  return (
    <DashboardLayout
      title="Finance"
      sidebarProps={{ onSidebarHoverChange: setIsSidebarExpanded }}
    >
      <Finance isSidebarExpanded={isSidebarExpanded} />
    </DashboardLayout>
  );
}
