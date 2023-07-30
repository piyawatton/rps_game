import Cookies from 'js-cookie';

interface CookieOptions {
  expires?: Date | number;
  path?: string;
  domain?: string;
  secure?: boolean;
}

const DEFAULT_EXPIRATION_DAYS = 2;

const cookieUtils = {
  set: <T>(name: string, value: T, options?: CookieOptions) => {
    
    const encodedValue = JSON.stringify(value);
    const expires =
      options && options.expires ? options.expires : new Date(Date.now() + DEFAULT_EXPIRATION_DAYS * 24 * 60 * 60 * 1000);


    Cookies.set(name, encodedValue, { ...options, expires });
  },

  get: <T>(name: string): T | null => {
    const encodedValue = Cookies.get(name);

    if (encodedValue) {
      return JSON.parse(encodedValue) as T;
    }

    return null;
  },

  delete: (name: string, options?: CookieOptions) => {
    Cookies.remove(name, options);
  },
};

export default cookieUtils;
