import type { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import React, { useState, MouseEventHandler, Suspense } from 'react';
import { SpotifyAPI } from '../spotify';
import { useStore } from '../store';

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

  // const [userInfo, setUserInfo] = useState("");
  const router = useRouter();
  React.useEffect(() => {
    if (router.isReady) {
      SpotifyAPI.getCurrentUser().then((data) => {
        setUserName(data.display_name);
        console.log('user info', data);
      });
    }
  }, [router.isReady]);
  const handleRequestAccessToken: MouseEventHandler = () => {
    console.log('requesting access token');
    const url: string = SpotifyAPI.generateUserAuthURL();
    Router.push(url);
  };

  return (
    <div>
      <div className="text-3xl font-bold">Hello World</div>
        {!userName && hasHydrated && (
          <input
            type="button"
            onClick={handleRequestAccessToken}
            value="Request Authorization"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          />
        )}
        {hasHydrated && <h1>Hello {userName}</h1>}
    </div>
  );
};

export default Home;
