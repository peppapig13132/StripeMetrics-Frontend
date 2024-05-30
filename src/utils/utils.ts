import { format } from 'date-fns';
import { jwtDecode } from 'jwt-decode';

export const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'MMM dd, yyyy');
}

interface DecodedToken {
  exp: number;
}

export const isVaildToken = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);

    if(decodedToken.exp * 1000 < Date.now()) {
      return false;
    }

    return true;
  } catch(error) {
    console.error('Error decoding token:', error);
    return false;
  }
}