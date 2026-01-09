import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// apple
export const handleSignInWithApple = () => {
  const clientId = 'YOUR_CLIENT_ID'; // Replace with your actual client ID (Service ID)
  const redirectURI = encodeURIComponent(
    'https://your-redirect-uri.com/callback'
  ); // Your registered redirect URI
  const state = 'state123'; // Optional state parameter
  const scope = encodeURIComponent('name email'); // Requested scopes

  const appleAuthURL = `https://appleid.apple.com/auth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectURI}&scope=${scope}&state=${state}`;

  window.location.href = appleAuthURL; // Redirects the user to the Apple authentication page
};

// google
export const useGoogleAuthHandler = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse: TokenResponse) => {
      // console.log('Google Sign-Up successful:', tokenResponse);
      alert(`${tokenResponse}Google Sign-Up successful! Token received.`);
      // Add your success handling logic here (e.g., API call, token storage)
    },
    onError: () => {
      // console.error('Google Sign-Up failed');
      alert('Google Sign-Up failed. Please try again.');
      // Add your error handling logic here
    }
  });

  return googleLogin;
};

//  Function to fetch location coordinates
export const fetchLocationCoordinates = async (address: string) => {
  try {
    const response = await fetch(
      `https://api.locationiq.com/v1/search?key=${process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY}&q=${address}&format=json`
    );
    const data = await response.json();
    if (data && data[0]) {
      return {
        latitude: data[0].lat,
        longitude: data[0].lon
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching location coordinates:', error);
    return null;
  }
};

export const formatDateTime = (date: string, time: string) => {
  const dateTime = new Date(`${date.split('T')[0]}T${time}`);
  return dateTime.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};
