import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface TwoArcPieChartProps {
  data: { name: string; value: number }[];
}

export default function TwoArcPieChart({ data }: TwoArcPieChartProps) {
  // State for data values

  // Colors for each segment
  const COLORS = ['#7065F0', '#F8BD00'];

  // Calculate the total value
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Calculate percentages
  const getPercentage = (value: number) => {
    return Math.round((value / total) * 100);
  };

  // Function to render segment info with dot and percentage
  const renderPercentageStyle = (
    item: { name: string; value: number },
    index: number
  ) => {
    const percentage = getPercentage(item.value);

    return (
      <div className="flex justify-center">
        <div className="text-3xl font-bold" style={{ color: COLORS[index] }}>
          {percentage}%
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main flex container for side-by-side layout */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full">
        {/* Segment 1 percentage */}
        {renderPercentageStyle(data[0], 0)}

        {/* Pie Chart */}
        <div className="mx-1 my-4 md:my-0 w-64 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={100}
                startAngle={0}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Segment 2 percentage */}
        {renderPercentageStyle(data[1], 1)}
      </div>

      {/* Controls for adjusting values */}
      <div className="w-full mt-8 max-w-lg mx-auto">
        <div className="flex items-center justify-around">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col p-2">
              <div className="flex items-center mb-2">
                <div
                  className="w-[25px] h-[25px] rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="font-medium">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
