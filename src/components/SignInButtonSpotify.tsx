import * as React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";

function SpotifyButton() {
  const { data: session } = useSession();
  return (
    <Button
      sx={[
        {
          color: "#191414",
          "&:hover": {
            backgroundColor: "#189941",
          },
        },
      ]}
      className="bg-[#1DB954]"
      variant="contained"
      onClick={() => signIn()}
    >
      Sign In with Spotify
    </Button>
  );
}

export default SpotifyButton;
