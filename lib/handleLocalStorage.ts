export const handleLocalStorage = {
  save: <T>(
    key: string,
    data: T,
    sanitize?: (data: T) => Partial<T> // optional sanitizer
  ) => {
    const saveTimeout = setTimeout(() => {
      try {
        const saveData = sanitize ? sanitize(data) : data;
        localStorage.setItem(key, JSON.stringify(saveData));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }, 1000);

    return () => clearTimeout(saveTimeout);
  },

  load: <T>(
    key: string,
    setValue: (field: keyof T, value: T[keyof T]) => void
  ) => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed: Partial<T> = JSON.parse(saved);
        const entries = Object.entries(
          parsed as Partial<Record<keyof T, T[keyof T]>>
        ) as [keyof T, T[keyof T]][];
        entries.forEach(([field, value]) => {
          if (value !== null && value !== undefined) {
            setValue(field, value);
          }
        });
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  },

  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  }
};
