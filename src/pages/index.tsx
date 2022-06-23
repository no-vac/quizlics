import type { NextPage } from "next";
import React from "react";
import { MouseEventHandler } from "react";
import { SpotifyAPI } from "../spotify";
import { useStore } from "../store";

const Home: NextPage = () => {
  const userToken = useStore((state) => state.userToken);

  const handleRequestAccessToken: MouseEventHandler = () => {
    console.log("requesting access token");
    SpotifyAPI.requestUserAuth();
  };

  const handleGetUserInfo: MouseEventHandler = () => {
    console.log("getting user info");
    SpotifyAPI.getCurrentUser();
  };

  return (
    <>
      <div className="text-3xl font-bold">Hello World</div>
      {!userToken ? (
        <input
          type="button"
          onClick={handleRequestAccessToken}
          value="Request Authorization"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        />
      ) : (
        <input
          type="button"
          onClick={handleGetUserInfo}
          value="Get User Info"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        />
      )}
      <h1>{userToken}</h1>
    </>
  );
};

export default Home;
