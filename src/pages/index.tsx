import type { NextPage } from "next";
import Router, { useRouter } from "next/router";
import React, { useState, MouseEventHandler, SetStateAction } from "react";
import { SpotifyAPI } from "../spotify";
import { useStore } from "../store";
import PlaylistList from "../../components/PlaylistList";

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  React.useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

const Home: NextPage = () => {
  const hasHydrated = useHasHydrated();
  const setUserName = useStore((state) => state.setUserName);
  const userName = useStore((state) => state.userName);
  const sbAuthed = useStore((state) => state.sbAuthenticated);

  const [playlists, setPlaylists] = useState<Array<String>>([]);
  const router = useRouter();
  React.useEffect(() => {
    if (router.isReady) {
      SpotifyAPI.getCurrentUser().then((data) => {
        setUserName(data.display_name);
        SpotifyAPI.getCurrentUserPlaylists().then((data) => {
          const _playlists = data.items.map((pl: any) => pl.name);
          setPlaylists(() => [..._playlists]);
        });
      });
    }
  }, [router.isReady]);

  const handleRequestAccessToken: MouseEventHandler = () => {
    console.log("requesting access token");
    const url: string = SpotifyAPI.generateUserAuthURL();
    Router.push(url);
  };

  const notAuthorized = (
    <>
      <img
        src="/quizlics-logos_black.png"
        height={"200em"}
        width={"200em"}
        alt=""
      />
      <div className="text-3xl font-bold text-center">Your Lyrics Quiz</div>
      <input
        type="button"
        onClick={handleRequestAccessToken}
        value="Log In With Spotify"
        className="bg-green-500 mt-3 mb-33 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      />
    </>
  );

  return (
    <div className="flex bg-blue-600 content-center justify-center grid grid-flow-row auto-rows-max h-screen">
      {hasHydrated &&
        (!sbAuthed ? (
          notAuthorized
        ) : (
          <>
          <div className="flex font-bold text-3xl justify-center mb-5">
            <div className="flex flex-col text-center">

            <h1>Hello {userName}</h1>
            <h2>Choose your playlist</h2>
            </div>
          </div>
            <div className="flex justify-center">
            <PlaylistList playlists={playlists} />
            </div>
          </>
        ))}
    </div>
  );
};

export default Home;
