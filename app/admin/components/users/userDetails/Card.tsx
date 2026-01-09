import { MenuItem, Select } from '@mui/material';

interface CardProps {
  title: string;
  value?: string;
  cardBgColor?: string;
  textColor?: string;
  dropDowntextColor?: string;
  dropDownBgColor?: string;
  additionalNode?: React.ReactNode;
}

export const Card = ({
  title,
  value,
  cardBgColor = 'bg-[#7065F0]',
  textColor = 'text-[#FFFFFF]',
  dropDowntextColor = 'text-[#FFFFFF]',
  dropDownBgColor = 'bg-[#DFDDFD1F]',
  additionalNode = null
}: CardProps) => {
  return (
    <div className={`w-full p-4 px-6 ${cardBgColor} rounded-xl shadow-md`}>
      <div className={`flex justify-start ${textColor} flex-col gap-2`}>
        <div className="flex justify-between items-center">
          <h2 className=" text-[20px] text-center">{title}</h2>
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
        {value && <p className="text-[32px] font-bold">{value}</p>}
        {additionalNode && additionalNode}
      </div>
    </div>
  );
};
