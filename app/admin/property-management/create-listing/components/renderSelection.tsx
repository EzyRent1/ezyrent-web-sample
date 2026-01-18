import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import SelectionButton from '../../../components/common/selectionButton';
import FormError from '../../../components/common/FormError';

export default function RenderSelectionSection({
  control,
  label,
  options,
  fieldName,
  isSubmitting,
  errors
}: {
  control: Control<PropertyFormData>;
  label: string;
  isSubmitting: boolean;
  options: string[];
  fieldName: keyof PropertyFormData;
  errors: FieldErrors<PropertyFormData>;
}) {
  return (
    <div className="mt-10">
      <h2 className="text-[#000929] text-xl font-medium mb-3">{label}</h2>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-2">
            {options.map((option) => (
              <SelectionButton
                {...field}
                key={option}
                label={option}
                isSubmitting={isSubmitting}
                selected={field.value === option}
                onClick={() => field.onChange(option)}
              />
            ))}
          </div>
        )}
      />
      <FormError message={errors[fieldName]?.message} />
    </div>
  );
}
