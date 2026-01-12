export const formatAmount = (amount: number): string => {
  return amount.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN'
  });
  //.....
};

export function formatDate(isoString: string) {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
}
