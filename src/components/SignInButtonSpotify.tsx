import * as React from "react";
import Button from "@mui/material/Button";

function SpotifyButton() {
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
    >
      Sign In with Spotify
    </Button>
  );
}

export default SpotifyButton;
