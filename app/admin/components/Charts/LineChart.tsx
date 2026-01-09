import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

type LineChartProps = {
  type?: 'monotone' | 'linear' | 'step' | 'basis' | 'natural';
  type2?: 'monotone' | 'linear' | 'step' | 'basis' | 'natural';
  data: Record<string, string | number>[];
  dataKey: string; // e.g. ['sales', 'revenue']
  dataKey2?: string;
  xKey: string; // e.g. 'month'
  color?: string; // Optional colors for each line
  color2?: string;
  height?: number;
};

const ReusableLineChart: React.FC<LineChartProps> = ({
  data,
  dataKey,
  dataKey2,
  xKey,
  type = 'monotone',
  type2 = 'monotone',
  color = '#4585B5',
  color2 = '#F7CE45',
  height = 300
}) => {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type={type}
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          {dataKey2 && (
            <Line
              type={type2}
              dataKey={dataKey2}
              stroke={color2}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReusableLineChart;
