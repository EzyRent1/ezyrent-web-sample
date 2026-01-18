import React from 'react';

interface NumberLabelPropType {
  className?: string;
  minValue?: number;
  maxValue?: number;
}

export default function NumberLabel({
  className,
  minValue,
  maxValue
}: NumberLabelPropType) {
  return (
    <section
      className={`${className} bg-[#E6E6E6] text-[#000929] px-[10px] py-[6px] rounded-[6px]`}
    >
      <span>{minValue}</span>/<span>{maxValue}</span>
    </section>
  );
}
