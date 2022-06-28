import React from 'react'

type Props = {
    playlistName:String;
    // playlistID:string;
}

export default function PlaylistButton({playlistName}: Props) {
  return (
    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
        {playlistName}
    </button>
  )
}