import React from "react";
import PlaylistButton from "./PlaylistButton";
import { Playlist, PlayLists } from "../spotify.types";

type Props = {
  playlists: Array<Playlist>;
};

export default function PlaylistList({ playlists }: Props) {
  return (
    <div
      // style={{backgroundColor:'red'}}
      className="grid grid-cols-3 grid-flow-row gap-4"
    >
      {playlists.map((pl: Playlist) => {
        return (
          <div key={pl.id.toString()}>
            <PlaylistButton id={pl.id} name={pl.name} />
          </div>
        );
      })}
    </div>
  );
}
