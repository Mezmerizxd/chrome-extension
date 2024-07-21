import React, { useEffect, useState } from "react";
import { useGetCookie, Errors as GetCookieErrors } from "../api/getCookie";
import { useGetAccount } from "../api/getAccount";

const App = () => {
  const [reload, setReload] = useState(false);

  const bearerToken = useGetCookie();
  const getAccount = useGetAccount();

  useEffect(() => {
    setReload(false);

    bearerToken.mutate("BearerToken");
  }, [reload]);

  useEffect(() => {
    if (bearerToken.isSuccess) {
      getAccount.mutateAsync(bearerToken.data);
    }
  }, [reload, bearerToken.isSuccess]);

  useEffect(() => {
    if (getAccount.isError) {
      chrome.tabs.reload();
      setTimeout(() => {
        setReload(true);
      }, 2000);
    }
  }, [reload, getAccount.isError]);

  if (bearerToken.isLoading) {
    return (
      <div className="flex justify-center items-center align-middle w-[500px] h-[300px] bg-background border-none outline-none">
        <div className="text-accent-light">
          <h1 className="text-2xl">Loading...</h1>
          <p className="text-lg">Fetching Bearer Token</p>
        </div>
      </div>
    );
  }

  if (bearerToken.isError) {
    return (
      <div className="flex justify-center items-center align-middle w-[500px] h-[300px] bg-background border-none outline-none">
        <div className="text-accent-light space-y-2">
          <h1 className="text-2xl">{bearerToken.error.name}</h1>
          <p className="text-red-500 text-lg">{bearerToken.error.message}</p>
          <p>Make sure you have SocialClub open and you are logged in.</p>
          <div className="space-x-2">
            <button
              className="bg-accent-light text-background p-2 rounded-md"
              onClick={() => {
                chrome.tabs.create({
                  url: "https://signin.rockstargames.com/signin/user-form?cid=socialclub",
                });
              }}
            >
              Open Social Club
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[500px] h-[400px] bg-background border-none outline-none overflow-auto">
      <div className="p-4 text-accent-light space-y-2 overflow-y-auto">
        <div className="p-2 space-y-2 border border-white/10 rounded-sm">
          <h1 className="text-2xl">Bearer Token</h1>
          <p className="overflow-hidden line-clamp-1">
            {bearerToken?.data?.value as string}
          </p>
          <button
            className="bg-accent-light text-background p-2 rounded-md"
            onClick={() => {
              navigator.clipboard.writeText(bearerToken?.data?.value as string);
            }}
          >
            Click to Copy
          </button>
        </div>

        <div className="p-2 space-y-2 border border-white/10 rounded-sm">
          <h1 className="text-2xl">Account</h1>
          {getAccount.isLoading ? (
            <p>Loading Account...</p>
          ) : getAccount.isError ? (
            <p>Error: {getAccount.error.message}</p>
          ) : getAccount.isSuccess ? (
            <div className="flex justify-evenly items-start">
              <div className="w-full h-full">
                <p>Rockstar ID: {getAccount?.data?.rockstarId || "None"}</p>
                <p>Display Name: {getAccount?.data?.displayName || "None"}</p>
                <p>Country Code: {getAccount?.data?.countryCode || "None"}</p>
                <p>Relationship: {getAccount?.data?.relationship || "None"}</p>
                <p>Friend Count: {getAccount?.data?.friendCount || "None"}</p>
                <p>
                  Friends Hidden:{" "}
                  {String(getAccount?.data?.friendsHidden) || "None"}
                </p>
                <p>Is Clan Mate: {getAccount?.data?.isClanMate || "None"}</p>
                <p>Name: {getAccount?.data?.name || "None"}</p>
                <p>
                  Wall Hidden: {String(getAccount?.data?.wallHidden) || "None"}
                </p>
                <p>
                  Primary Clan ID: {getAccount?.data?.primaryClanId || "None"}
                </p>
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <img src={getAccount?.data?.avatarUrl} alt="" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
