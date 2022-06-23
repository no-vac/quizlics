import type { NextPage } from "next";
import { useStore } from "../store";
import React from "react";
import Router, { useRouter } from "next/router";
import { SpotifyAPI } from "../spotify";

const Auth: NextPage = () => {
  const router = useRouter();
  const setUserToken = useStore((state) => state.setUserToken);
  React.useEffect(() => {
    if (router.isReady) {
      // Code using query
      const code: string =
        router.query.code && typeof router.query.code === "string"
          ? router.query.code
          : "";
      SpotifyAPI.requestAccessToken(code);
      Router.push("/");
    }
  }, [router.isReady]);

  return (
    <>
      <h1>code</h1>
    </>
  );
};

export default Auth;
