import { BlogPostFormData } from '@/lib/validations';
import { FieldErrors } from 'react-hook-form';

interface ErrorSummaryProps {
  errors: FieldErrors<BlogPostFormData>;
}

export default function ErrorSummary({ errors }: ErrorSummaryProps) {
  const errorMessages = Object.values(errors)
    .map((err) => err.message || null)
    .filter(Boolean);

  if (errorMessages.length === 0) return null;

  return (
    <div className="bg-red-100 text-red-600 p-4 rounded">
      <h3 className="font-bold mb-2">Please fix the following errors:</h3>
      <ul className="list-disc pl-5">
        {errorMessages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
