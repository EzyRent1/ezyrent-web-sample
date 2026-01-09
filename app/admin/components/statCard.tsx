import { MenuItem, Select } from '@mui/material';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';

interface StatsCardProps {
  title: string;
  value: string;
  percentage: number;
  increase?: boolean;
  cardBgColor?: string;
  textColor?: string;
  dropDowntextColor?: string;
  dropDownBgColor?: string;
}

export const UserStatsCard = ({
  title,
  percentage,
  value,
  cardBgColor = 'bg-white',
  textColor = 'text-[#000000E5]',
  dropDowntextColor = 'text-[#000000E5]',
  dropDownBgColor = 'bg-[#DFDDFD1F]',
  increase = true
}: StatsCardProps) => {
  return (
    <div className={`w-full p-4 px-6 ${cardBgColor} rounded-xl shadow-md`}>
      <div className={`flex justify-start ${textColor} flex-col gap-2`}>
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-[20px] text-center">{title}</h2>
          <Select
            defaultValue="week"
            variant="standard"
            disableUnderline
            className={`ml-2 ${dropDownBgColor} text-xs ${dropDowntextColor} rounded-xl  px-2 py-1`}
          >
            <MenuItem value="week">Weekly</MenuItem>
            <MenuItem value="month">Monthly</MenuItem>
            <MenuItem value="year">Yearly</MenuItem>
          </Select>
        </div>
        <p className="text-[32px] text-[#7065F0] font-bold">{value}</p>
      </div>
      <div className="flex flex-col md:flex-row items-center text-sm text-muted-foreground">
        <span
          className={`${increase ? 'text-[#32A071] bg-[#32A07133]' : 'text-[#D80E0E] bg-[#E3000021]'} flex rounded-full px-2 py-1 items-center gap-1`}
        >
          {increase ? (
            <IoIosArrowRoundUp size={16} />
          ) : (
            <IoIosArrowRoundDown size={16} />
          )}
          {percentage}%
        </span>
        <span
          className={`ml-2 text-xs md:text-base ${textColor === 'text-[#000000E5]' ? 'text-[#666666]' : textColor} `}
        >
          from last month
        </span>
      </div>
    </div>
  );
};
