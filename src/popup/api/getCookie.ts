import { useMutation } from "react-query";
import { MutationConfig } from "../libs/react-query";
import { Delay } from "../libs/functions";

export const Errors = {
  FailedToFetchCookie: Error("Failed to fetch cookie"),
  TimeoutReached: Error("Timeout reached"),
};

export const GetCookie = async (
  name: string
): Promise<chrome.cookies.Cookie | null> => {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const maxAttempts = 30; // Since we check every 100ms, 30 attempts will give us 3 seconds
    const interval = 100; // 100 milliseconds

    const intervalId = setInterval(() => {
      chrome.cookies.get(
        {
          url: "https://socialclub.rockstargames.com",
          name: name,
        },
        (cookie) => {
          if (cookie) {
            console.log("Cookie fetched", cookie);
            clearInterval(intervalId);
            resolve(cookie);
          } else {
            attempts++;
            if (attempts >= maxAttempts) {
              clearInterval(intervalId);
              reject(Errors.FailedToFetchCookie);
            }
          }
        }
      );
    }, interval);

    // Timeout to ensure we stop trying after 3 seconds
    setTimeout(() => {
      clearInterval(intervalId);
      reject(Errors.TimeoutReached);
    }, 3000);
  });
};

type UseGetCookieOptions = {
  config?: MutationConfig<typeof GetCookie>;
};

export const useGetCookie = ({ config }: UseGetCookieOptions = {}) => {
  return useMutation({
    onError: (err, __, context: any) => {
      console.error("Failed to fetch cookie", err);
    },
    onSuccess: () => {
      console.log("Cookie fetched");
    },
    ...config,
    mutationFn: GetCookie,
  });
};
