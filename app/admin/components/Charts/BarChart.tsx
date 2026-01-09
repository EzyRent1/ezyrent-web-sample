import React from 'react';
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Bar
} from 'recharts';

type BarChartProps = {
  data: { [key: string]: number | string }[];
  dataKey: string;
  xKey: string;
  color?: string;
  height?: number;
};

export const BarLineChart: React.FC<BarChartProps> = ({
  data,
  dataKey,
  xKey,
  color = '#7065F0',
  height = 300
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        {/* ✅ Horizontal Grid Lines */}
        <CartesianGrid vertical={false} />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  );
};
