'use client';
import React, { useState } from 'react';
import DashboardLayout from '../components/Layouts';

import UserMgt from '../components/users';

export default function UserMgtPage() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  return (
    <DashboardLayout
      title="User Management"
      sidebarProps={{ onSidebarHoverChange: setIsSidebarExpanded }}
    >
      <UserMgt isSidebarExpanded={isSidebarExpanded} />
    </DashboardLayout>
  );
}
