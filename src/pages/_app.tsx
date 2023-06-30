import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { SessionProvider } from "next-auth/react";
import "~/styles/globals.css";

const MyApp: AppType = ({
  Component,
  //@ts-ignore
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
