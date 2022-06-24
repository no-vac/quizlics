import type { NextPage } from "next";
import { useStore } from "../store";
import React from "react";
import Router, { useRouter } from "next/router";
import { SpotifyAPI } from "../spotify";
import { setCookies } from "cookies-next";

const Auth: NextPage = () => {
  const router = useRouter();
  const setUserToken = useStore((state) => state.setUserToken);
  const setUserRefreshToken = useStore((state) => state.setUserRefreshToken);
  React.useEffect(() => {
    if (router.isReady) {
      // Code using query
      const code: string =
        router.query.code && typeof router.query.code === "string"
          ? router.query.code
          : "";
      SpotifyAPI.requestAccessToken(code).then(({ token, refreshToken }) => {
        setUserToken(token);
        setCookies("quizlics_SP_AuthToken", token);

        setUserRefreshToken(refreshToken);
        setCookies("quizlics_SP_RefreshToken", refreshToken);

        Router.push("/");
      });
    }
  }, [router.isReady]);

  return (
    <>
      <h1>code</h1>
    </>
  );
};

export default Auth;
