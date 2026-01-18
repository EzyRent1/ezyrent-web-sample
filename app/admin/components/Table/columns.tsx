import { formatAmount } from '@/app/util';
import { formatDateTime } from '@/lib/utils';
import { Popper } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { SendHorizontal, UserX } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { GoDotFill, GoTrash } from 'react-icons/go';
import { HiMiniCheckBadge } from 'react-icons/hi2';
import { LuEye } from 'react-icons/lu';
import { MdOutlineMail } from 'react-icons/md';
import { useClickAway } from 'react-use';

export const FinanceColumns: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Date',
    renderCell: ({ value }) => {
      return (
        <span className="text-[#7065F0] text-sm font-medium">{value}</span>
      );
    },
    flex: 0.5
  },

  {
    field: 'paymentType',
    headerName: 'Payment Type',
    flex: 0.6,
    renderCell: ({ value }) => {
      return (
        <span className="text-[#7065F0] text-sm font-medium">{value}</span>
      );
    }
  },
  {
    field: 'senderName',
    headerName: 'Sender Name',
    renderCell: ({ value }) => {
      return (
        <span className="text-[#7065F0] text-sm font-medium">{value}</span>
      );
    },
    flex: 0.5
  },
  {
    field: 'role',
    headerName: 'Sender Type',
    renderCell: ({ value }) => {
      return (
        <span
          className={`  font-medium text-sm rounded-full px-2 py-1
            ${
              value === 'Landlord'
                ? ' bg-[#9747FF33] text-[#9747FF] border '
                : ' text-[#7065F0] bg-[#7065F033] border'
            }`}
        >
          {value}
        </span>
      );
    },
    flex: 0.5
  },

  {
    field: 'property',
    headerName: 'Property',
    flex: 0.5,
    renderCell: ({ value }) => {
      return (
        <span className="text-[#7065F0] text-sm font-medium">{value}</span>
      );
    }
  },
  {
    field: 'amount',
    headerName: 'Amount',
    flex: 0.5,
    renderCell: ({ value }) => {
      return (
        <span className="text-[#7065F0] text-sm font-medium">{value}</span>
      );
    }
  },

  {
    field: 'ezyRentCharge',
    headerName: 'EzyRent Charge',
    flex: 0.5,
    renderCell: ({ value }) => {
      return (
        <span className="text-[#7065F0] text-sm font-medium">{value}</span>
      );
    }
  },
  {
    field: 'netToReceiver',
    headerName: 'Net To Receiver',
    flex: 0.5,
    renderCell: ({ value }) => {
      return (
        <span className="text-[#7065F0] text-sm font-medium">{value}</span>
      );
    }
  },

  {
    field: 'status',
    headerName: 'Status',
    flex: 0.5,
    renderCell: ({ value }) => {
      return (
        <span
          className={` font-medium text-sm rounded-full px-2 py-1
            ${
              value === 'paid'
                ? ' text-[#32A071] bg-[#32A07133]'
                : value === 'refunded'
                  ? ' text-[#9747FF] bg-[#9747FF33]'
                  : value === 'failed'
                    ? ' text-[#E30000CC] bg-[#E3000026]'
                    : 'text-[#F7CE45] bg-[#F7CE4533] '
            }`}
        >
          {value}
        </span>
      );
    }
  },
  {
    field: 'Action',
    flex: 0.5,
    renderCell: ({ row }) => {
      return (
        <div className="w-20">
          {row.status === 'paid' ? (
            <Link
              href={'/'}
              className="bg-[#7065F0] font-medium flex items-center justify-center gap-1 text-sm rounded-full px-4 py-1 text-white"
            >
              View
            </Link>
          ) : row.status === 'refunded' ? (
            <Link
              href={'/'}
              className="bg-[#7065F0] font-medium flex items-center justify-center gap-1 text-sm rounded-full px-4 py-1 text-white"
            >
              Message
            </Link>
          ) : row.status === 'failed' ? (
            <Link
              href={'/'}
              className="bg-[#7065F0] font-medium flex items-center justify-center gap-1 text-sm rounded-full px-4 py-1 text-white"
            >
              Retry
            </Link>
          ) : (
            <Link
              href={'/'}
              className="bg-[#7065F0] font-medium flex items-center justify-center gap-1 text-sm rounded-full px-4 py-1 text-white"
            >
              Cancel
            </Link>
          )}
        </div>
      );
    }
  }
];

export const DashboardColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Track ID',
    flex: 0.5
  },
  {
    field: 'name',
    headerName: 'Title',
    flex: 1
  },
  {
    field: 'propertyType',
    headerName: 'Type',
    flex: 0.5
  },
  {
    field: 'price',
    headerName: 'Price',
    renderCell: ({ value }) => {
      return (
        <span className="text-[#7065F0] font-medium text-sm">
          {formatAmount(value)}
        </span>
      );
    },
    flex: 0.7
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.9,
    renderCell: ({ value }) => {
      return (
        <span
          className={` flex gap-1 my-4  font-medium text-sm
          ${
            value === 'published'
              ? ' text-[#7065F0]'
              : value === 'pending'
                ? ' text-[#FFA500]'
                : value === 'available'
                  ? 'text-green-500'
                  : 'text-[#DC1313]'
          }`}
        >
          <GoDotFill size={18} /> {value}
        </span>
      );
    }
  }

  // { field: 'inquiry', headerName: 'Inquiries', flex: 0.7 }
];

export const TourColumns: GridColDef[] = [
  {
    field: 'userName',
    headerName: 'User',
    flex: 0.5,
    renderCell: ({ value }) => (
      <span className="text-[#7065F0] text-sm font-medium">{value}</span>
    )
  },
  {
    field: 'propertyAddress',
    headerName: 'Location',
    flex: 0.7,
    renderCell: ({ value }) => (
      <span className="text-[#7065F0] text-sm font-medium">{value}</span>
    )
  },
  {
    field: 'tourDate',
    headerName: 'Requested Date & Time',
    flex: 0.5,
    renderCell: ({ row }) => (
      <span className="text-[#7065F0] text-sm font-medium">
        {formatDateTime(row.tourDate, row.tourTime)}
      </span>
    )
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.5,
    renderCell: ({ value }) => (
      <span
        className={`font-medium text-sm rounded-full px-2 py-1
            ${
              value === 'CONFIRMED'
                ? 'text-[#0AB626] bg-[#0AB62633]'
                : value === 'PENDING'
                  ? 'text-[#9747FF] bg-[#9747FF33]'
                  : 'text-[#999999] bg-[#99999933]'
            }`}
      >
        {value}
      </span>
    )
  },
  {
    field: 'staff',
    headerName: 'Assigned Staff',
    flex: 0.5,
    renderCell: ({ value }) => (
      <span className="text-[#7065F0] text-sm font-medium">{value || '—'}</span>
    )
  },
  {
    field: 'Action',
    flex: 0.5,
    renderCell: ({ row }) => {
      return <TourActionComponent rowId={row.id} />;
    }
  }
];

const TourActionComponent = ({ rowId }: { rowId: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dotsPopupRef = useRef(null);
  const open = Boolean(anchorEl);
  const id = open ? `popper-${rowId}` : undefined;

  useClickAway(dotsPopupRef, () => {
    setAnchorEl(null);
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <div className="flex items-center gap-5">
      <div className="w-20">
        <button className="bg-[#7065F0] font-medium text-sm rounded-full px-4 py-2 text-white">
          Edit
        </button>
      </div>

      <div className="relative z-10 flex w-10 overflow-visible">
        <button
          aria-describedby={id}
          type="button"
          onClick={handleClick}
          className="cursor-pointer bg-transparent border-none p-0 m-0"
          style={{ lineHeight: 0 }}
        >
          <BsThreeDots size={16} />
        </button>
        <Popper
          ref={dotsPopupRef}
          className="px-5 py-4 text-sm z-10 flex flex-col gap-4 items-center rounded-xl border border-primaryBorder bg-white"
          id={id}
          open={open}
          anchorEl={anchorEl}
        >
          <h5 className="mb-3 font-bold">Actions</h5>
          <div className="space-y-4">
            <button className="flex items-center gap-4 hover:underline hover:text-blue-600">
              <LuEye size={18} /> View Profile
            </button>
            <button className="flex gap-2 items-center hover:underline hover:text-green-600">
              <SendHorizontal size={18} /> Send Message
            </button>
            <button className="flex gap-2 items-center hover:underline text-red-600">
              <UserX size={18} /> Suspend User
            </button>
            <div className="w-full h-[2px] bg-gray-400" />
            <button className="flex gap-2 items-center hover:underline text-red-600">
              <GoTrash size={18} /> Deactivate User
            </button>
          </div>
        </Popper>
      </div>
    </div>
  );
};

export const UsersColumns: GridColDef[] = [
  {
    field: 'firstName',
    headerName: 'Users',
    renderCell: ({ value }) => {
      return (
        <span className="text-[#7065F0] text-sm font-medium">{value}</span>
      );
    },
    flex: 0.7
  },

  {
    field: 'email',
    headerName: 'Email',
    flex: 0.9,
    renderCell: ({ value }) => {
      return (
        <div className="flex flex-col text-[#7065F0]">
          <span className=" text-sm font-medium flex items-center gap-1 ">
            <MdOutlineMail className="text-[#000929]" /> {value}
          </span>
        </div>
      );
    }
  },
  {
    field: 'kycStatus',
    headerName: 'KYC Status',
    flex: 0.5,
    renderCell: ({ value }) => {
      return (
        <span
          className={`font-medium text-sm rounded-full px-2 py-1
          ${
            value === 'Active'
              ? ' text-[#0AB626] bg-[#0AB62633]'
              : value === 'Suspended'
                ? ' text-[#DC1313] bg-[#FF090917]'
                : 'text-[#999999] bg-[#99999933] '
          }`}
        >
          {value}
        </span>
      );
    }
  },
  {
    field: 'isVerified',
    headerName: 'V.Status',
    flex: 0.5,
    renderCell: ({ value }) => {
      return (
        <span
          className={`  font-medium flex items-center w-[80px] gap-1 text-sm rounded-full px-2 py-1
          ${
            value
              ? ' text-[#7065F0] bg-[#7065F033] '
              : 'text-[#999999] bg-[#9999991A]'
          }`}
        >
          {value ? (
            <>
              {' '}
              Verified <HiMiniCheckBadge />
            </>
          ) : (
            'Unverified'
          )}
        </span>
      );
    }
  },
  {
    field: 'Action',
    flex: 0.8,
    renderCell: ({ row }) => {
      return <UserActionCellComponent row={row} />;
    }
  }
];

const UserActionCellComponent = ({
  row
}: {
  row: Record<string, string | number>;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dotsPopupRef = useRef(null);
  const open = Boolean(anchorEl);
  const id = open ? `popper-${row.id}` : undefined;

  useClickAway(dotsPopupRef, () => {
    setAnchorEl(null);
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <div className="flex items-center gap-5">
      <div className="w-20">
        {row.isVerified ? (
          <Link
            href={`/admin/users/${row.id}`}
            className="bg-[#7065F0] font-medium flex items-center justify-center gap-1 text-sm rounded-full px-4 py-1 text-white"
          >
            view
          </Link>
        ) : (
          <Link
            href={'/'}
            className="bg-[#7065F0] font-medium flex items-center justify-center gap-1 text-sm rounded-full px-4 py-1 text-white"
          >
            message
          </Link>
        )}
      </div>

      <div className="relative z-10 flex w-10 overflow-visible">
        <button
          aria-describedby={id}
          type="button"
          onClick={handleClick}
          className="cursor-pointer bg-transparent border-none p-2 m-0 rounded-full hover:bg-gray-100"
          style={{ lineHeight: 0 }}
        >
          <BsThreeDots size={16} />
        </button>
        <Popper
          ref={dotsPopupRef}
          className="px-5 py-4 text-sm z-10 flex flex-col gap-4 items-center rounded-xl border border-primaryBorder bg-white shadow-lg"
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
          style={{ zIndex: 1300 }}
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 8]
              }
            },
            {
              name: 'preventOverflow',
              options: {
                boundary: 'viewport',
                padding: 8
              }
            }
          ]}
        >
          <h5 className="mb-3 font-bold">Actions</h5>
          <div className="space-y-4">
            <Link href={`/admin/users/${row.id}`}>
              <button
                className="flex items-center gap-4 hover:underline hover:text-blue-600 w-full text-left"
                onClick={() => setAnchorEl(null)}
              >
                <LuEye size={18} /> View Profile
              </button>
            </Link>
            <button
              className="flex gap-2 items-center hover:underline hover:text-green-600 w-full text-left"
              onClick={() => setAnchorEl(null)}
            >
              <SendHorizontal size={18} /> Send Message
            </button>
            <button
              className="flex gap-2 items-center hover:underline text-red-600 w-full text-left"
              onClick={() => setAnchorEl(null)}
            >
              <UserX size={18} /> Suspend User
            </button>
            <div className="w-full h-[2px] bg-gray-400" />
            <button
              className="flex gap-2 items-center hover:underline text-red-600 w-full text-left"
              onClick={() => setAnchorEl(null)}
            >
              <GoTrash size={18} /> Deactivate User
            </button>
          </div>
        </Popper>
      </div>
    </div>
  );
};
