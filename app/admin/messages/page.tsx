'use client';

import { useState } from 'react';
import DashboardLayout from '../components/Layouts';
import Messages from '../components/messages';

export default function MessagesPage() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  return (
    <DashboardLayout
      title="Messages"
      sidebarProps={{ onSidebarHoverChange: setIsSidebarExpanded }}
    >
      <Messages isSideBarOpen={isSidebarExpanded} />
    </DashboardLayout>
  );
}
