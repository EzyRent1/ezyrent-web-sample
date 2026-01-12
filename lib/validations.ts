import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z
      .string({
        required_error: 'Please enter a valid email address.'
      })
      .email(),
    password: z.string({
      required_error: 'Please enter a password.'
    }),
    confirmPassword: z.string({
      required_error: 'Please confirm your password.'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match.'
  });

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter a valid email address.'
    })
    .email()
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'Please enter a valid email address.'
    })
    .email()
});

export const resetPasswordSchema = z
  .object({
    password: z.string({
      required_error: 'Please enter a password.'
    }),
    confirmPassword: z.string({
      required_error: 'Please confirm your password.'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match.'
  });

export const contactSchema = z.object({
  name: z.string({ required_error: 'Please enter your full name' }),
  email: z
    .string({
      required_error: 'Please enter a valid email address.'
    })
    .email(),
  subject: z.string({ required_error: 'Please enter a subject.' }),
  message: z.string({ required_error: 'Please enter a message' })
});

const AMENITY_OPTIONS = [
  'Gym',
  'POP Ceiling',
  'Water Treatment',
  'Security',
  'Parking Space',
  'Spacious Compound',
  '24/7 Electricity',
  'Supermarket Nearby',
  'Swimming Pool',
  'Fast Internet',
  'Restaurants Nearby',
  'Free WiFi'
] as const;

// Helper function to validate file type
const isValidFileType = (file: File) => {
  const validImageTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ];
  const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];

  return (
    validImageTypes.includes(file.type) || validVideoTypes.includes(file.type)
  );
};

export const propertyFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Property name is required')
    .max(150, 'Name must be less than 150 characters'),

  address: z
    .string()
    .min(1, 'Address is required')
    .max(150, 'Address must be less than 150 characters'),

  description: z
    .string()
    .min(1, 'Description is required')
    .max(1500, 'Description must be less than 1500 characters'),

  price: z
    .string()
    .min(1, 'Price is required')
    .refine((val) => !isNaN(Number(val)), 'Price must be a valid number')
    .refine((val) => !val.startsWith('0'), 'Price cannot start with 0')
    .refine((val) => Number(val) !== 0, 'Price cannot be 0'),

  landSize: z.string().min(1, 'Room size is required'),

  location: z.string().min(1, 'Location is required'),

  latitude: z.string().optional(),
  longitude: z.string().optional(),

  rentDuration: z
    .number()
    .min(1, 'Rent duration must be between 1 and 3 years')
    .max(3, 'Rent duration must be between 1 and 3 years'),

  // Updated to handle both image and video files
  primaryFile: z
    .custom<File | null>()
    .refine((file) => file !== null, 'Primary media file is required')
    .refine((file) => {
      if (!file) return false;
      return isValidFileType(file);
    }, 'File must be an image (JPEG, PNG, GIF, WEBP) or video (MP4, WEBM, OGG)')
    .refine((file) => {
      if (!file) return false;
      return file.size <= 25 * 1024 * 1024; // 25MB limit
    }, 'File size must be less than 25MB'),

  // Updated to handle both image and video files
  otherFiles: z
    .array(z.custom<File>())
    .max(7, 'Maximum 7 files allowed')
    .refine(
      (files) => files.every((file) => isValidFileType(file)),
      'All files must be either images (JPEG, PNG, GIF, WEBP) or videos (MP4, WEBM, OGG)'
    )
    .refine(
      (files) => files.every((file) => file.size <= 25 * 1024 * 1024),
      'All files must be less than 25MB'
    ),

  propertyType: z.enum(['apartment', 'shortlet', 'flat', 'hotel', 'condo'], {
    required_error: 'Please select property type'
  }),

  beds: z.enum(['1', '2', '3', '4', '5+'], {
    required_error: 'Please select number of beds'
  }),

  baths: z.enum(['1', '2', '3', '4', '5+'], {
    required_error: 'Please select number of baths'
  }),

  amenities: z
    .array(z.enum(AMENITY_OPTIONS))
    .min(1, 'Please select at least one amenity'),

  error: z.null().optional(),
  errorMessage: z.null().optional()
});

export type PropertyFormData = z.infer<typeof propertyFormSchema>;

export const blogPostSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),

  content: z
    .string()
    .min(1, 'Content is required')
    .max(5000, 'Content must be less than 5000 characters'),

  image: z
    .custom<File | null>()
    .refine((file) => file !== undefined, 'Cover image is required')
    .refine((file) => {
      if (!file) return false;
      return isValidFileType(file);
    }, 'Cover image must be an image (JPEG, PNG, GIF, WEBP)')
    .refine((file) => {
      if (!file) return false;
      return file.size <= 10 * 1024 * 1024; // 10MB limit
    }, 'Cover image size must be less than 10MB'),
  video: z
    .custom<File | null>()
    .optional()
    .refine((file) => {
      if (!file) return true;
      return isValidFileType(file);
    }, 'Cover video must be a video (MP4, WEBM, OGG)')
    .refine((file) => {
      if (!file) return true;
      return file.size <= 50 * 1024 * 1024; // 50MB limit
    }, 'Cover video size must be less than 50MB'),

  tags: z
    .array(z.string())
    .min(1, 'Please select at least one tag')
    .max(5, 'You can select up to 5 tags only'),

  error: z.null().optional(),
  errorMessage: z.null().optional()
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;
