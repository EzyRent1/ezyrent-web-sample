export const ProgressBar = ({
  rangeColor,
  rangePercent,
  wholeColor,
  height = '5px',
  rounded = '1px'
}: {
  rangeColor: string;
  rangePercent: string;
  wholeColor: string;
  height?: string;
  rounded?: string;
}) => {
  return (
    <div
      className={`relative w-full  rounded-[5px] overflow-hidden`}
      style={{
        backgroundColor: `${wholeColor}`,
        height
      }}
    >
      <div
        className="absolute top-0 left-0 "
        style={{
          width: rangePercent,
          backgroundColor: rangeColor,
          height,
          borderRadius: rounded
        }}
      ></div>
    </div>
  );
};
