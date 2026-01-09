import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

type AreaChartProps = {
  data: { [key: string]: number | string }[];
  dataKey: string;
  dataKey2?: string;
  color2?: string;
  xKey: string;
  color?: string;
  height?: number;
};

export const AreaLineChart: React.FC<AreaChartProps> = ({
  data,
  dataKey,
  xKey,
  color = '#00D12A',
  height = 300
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.6} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* ✅ Horizontal Grid Lines */}
        <CartesianGrid vertical={false} />
        <XAxis dataKey={xKey} />
        <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          fillOpacity={1}
          fill="url(#areaFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
