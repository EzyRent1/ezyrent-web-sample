'use client';

import DashboardLayout from '../../components/Layouts';
import MessagesById, {
  MessageProps
} from '../../components/messages/MessageById';

export default function MessagesByIdPage({ params }: MessageProps) {
  return (
    <DashboardLayout title="Messages">
      <MessagesById params={params} />
    </DashboardLayout>
  );
}
