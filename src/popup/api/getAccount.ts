import { useMutation } from "react-query";
import { MutationConfig } from "../libs/react-query";

/*
URL: https://scapi.rockstargames.com/profile/getbasicprofile
TYPE: GET
REQUEST HEADERS NEEDED:
Authorization: "Bearer <bearer>"

RESPONSE:
{
    "viewerRockstarId": 165955699,
    "accounts": [
        {
            "rockstarAccount": {
                "rockstarId": 165955699,
                "name": "LaunderingIsFun9",
                "displayName": "LaunderingIsFun9",
                "avatarUrl": "https://prod-avatars.akamaized.net/stock-avatars/n/default.png",
                "primaryClanId": 0,
                "primaryClanRankOrder": 0,
                "isClanMate": false,
                "countryCode": "GB",
                "relationship": "None",
                "mutualFriendCount": 0,
                "profileHidden": false,
                "friendsHidden": true,
                "friendCount": 0,
                "wallHidden": true,
                "allowWallPost": true,
                "allowStatCompare": false,
                "allowBlock": false,
                "allowReport": false,
                "background": "none",
                "isGamertagHidden": false
            }
        }
    ],
    "status": true
}
*/

export const GetAccount = async (
  cookie: chrome.cookies.Cookie
): Promise<RockstarAccount | null> => {
  const response = await fetch(
    "https://scapi.rockstargames.com/profile/getbasicprofile",
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        authorization: `Bearer ${cookie.value}`,
        baggage:
          "sentry-environment=prod,sentry-release=2024-07-15dic_prod.sc,sentry-public_key=9c63ab4e6cf94378a829ec7518e1eaf6,sentry-trace_id=137c0957e07f49b9817aa5a2bd42518e",
        "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "sentry-trace": "137c0957e07f49b9817aa5a2bd42518e-b55d7c03f3819dbf",
        "x-cache-ver": "0",
        "x-lang": "en-US",
        "x-requested-with": "XMLHttpRequest",
        Referer: "https://socialclub.rockstargames.com/",
        "Referrer-Policy": "origin",
      },
      body: null,
      method: "GET",
    }
  );

  if (response.ok) {
    const data: RockstarFetchAccountsResponse = await response.json();
    return data.accounts[0].rockstarAccount;
  }

  throw new Error("Failed to fetch account");
};

type UseGetBearerTokenOptions = {
  config?: MutationConfig<typeof GetAccount>;
};

export const useGetAccount = ({ config }: UseGetBearerTokenOptions = {}) => {
  return useMutation({
    onError: (err, __, context: any) => {
      console.error("Failed to fetch account", err);
    },
    onSuccess: () => {
      console.log("Account fetched");
    },
    ...config,
    mutationFn: GetAccount,
  });
};

/*
fetch("https://www.rockstargames.com/auth/ping-bearer.json", {
  "headers": {
    "accept": "",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "content-type": "application/json",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "cookie": "OptanonAlertBoxClosed=2024-07-19T15:31:35.046Z; _gcl_au=1.1.1411543988.1721403095; _fbp=fb.1.1721403095357.487650455978294923; _ga=GA1.1.697268181.1721403096; _ga_K2BTQQ9RY3=GS1.1.1721403448.1.1.1721403452.0.0.0; RockstarSession-prod=3ab2055d42d93ed1d41146fa43b42f3b; rockstarweb_lang.prod=en-US; bm_mi=7439B8DE4C90D552C90ECF6CF95B3296~YAAQUYR7XJeVAbWQAQAAI6oD1RiulM62MQCmlNY7cdX+pkd8wk/MihLOHt/oDqv3NA9+s9jdUIjQxprAOPWPMYPOps1+o8bOScLR9RCGg5ujL9VLorMIT7KYIyGzYHvKlxC+MSAfEXJuW63Cfp3XqW9ruoyTrnBh+9etcf6Qg8VsAAdzUxn2K+oYty1I68txuPwU+rqDLbtDk3EySJeGwmKLpYeVkQzVVgjuWSzYq2XaQNOnr7OPNZJFKFx4fyPuCbqE0NxBZPyYWzTr3KWmjxjf2nyNhWhUmzZ4kSc5Q1phQKiCXXwDR5vyzcWWCM+QZM7eDlc=~1; ak_bmsc=123919BCCF870A952F1D361C027B61E4~000000000000000000000000000000~YAAQUYR7XMSVAbWQAQAAzKwD1RgjoL1TmxJ6PsYlHy/2gPmb6jekiAvKtd1U9KPHlfkUidwuZp6xNXB5EzJQzKioQhyIiNmNcG9YoV9fHgoXWWogWAFSdv9j7av7gJV6ceZn3mJUCky7IaeW8z2SwhB58KNf8JTbscAnA9j0IcP2wN/Tv/HmamLAYjQu1DwnQCXz+IThzBPCudws29DhskJSgc4dYto2531cCJ/5SLqnHSMRguawNLYJeX7Wo1y0WuObvfwb6etuWz1dTNcH9zhHvIt53T12OkINmAJTdjvNP3GvqApMcuk1zS8AZFTmlow81HliyQBV7fSZSEuFXyc0f71wn26g8owBxM7gsuqOTRj4AzU2vO5BSsuflAqeh+/7VPFtIzv4RQbZSHfZHz04cT3hGObLCOx6FpLFNaXvkUBzHaJ1Y6J+6Rhii5BdMn0i+OmSILdTPJyL/UerwLARvHqNieH1LXE7cYkmiElG3e3reg==; TSf15fb5ff027=086ddba813ab2000a22c718cc202f28535579e522172804723a076aadae9b7abc28953ad4fec80f5086736a8b911300019ed3f3c7c80bf20f3c59edeeaf14617e6d9b2214f180496f08f0202b020276d7ecd158a10b18b54526aeefa46244df1; bm_sv=E3FAC4334EE22EFDB0777FE5B290EF63~YAAQUYR7XGZ3A7WQAQAAaFJP1RgkAO8kNWYS+u9Qt6sgUIOrQ7PGgm69Og5OnGxLAdpkkDzc6nuyh4aEfRikG9sTph/qXSpIUfzKl42OBQww3uTVxiOPIqiaNDRplA7ygaSVuQHvX4K9I8HnZRDjHQNgXJp7CxdqU7YGZFPwXqQkUHlC7q3egU8n9XC7Gvg68fDDj799eRoSdqTT9RKscFdYdKJqIK6V2nNyCr0jtaZ05w2+mC/ZuhgaL0+ra5eq8cz9nIjbHd0=~1; _ga_PJQ2JYZDQC=GS1.1.1721559168.5.1.1721566044.0.0.0; OptanonConsent=isGpcEnabled=0&datestamp=Sun+Jul+21+2024+13%3A47%3A26+GMT%2B0100+(British+Summer+Time)&version=202406.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&genVendors=&consentId=8a641328-431a-4ae1-a75c-534d83fd3e14&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=1%3A1%2C2%3A1%2C3%3A1%2C4%3A1&intType=1&geolocation=GB%3BENG&AwaitingReconsent=false",
    "Referer": "https://socialclub.rockstargames.com/",
    "Referrer-Policy": "origin"
  },
  "body": null,
  "method": "POST"
});
*/
