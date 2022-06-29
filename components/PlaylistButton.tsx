import React from 'react'

type Props = {
    playlistName:String;
    // playlistID:string;
}

export default function PlaylistButton({playlistName}: Props) {
  return (
    <button className='w-full pt-3 pb-3 bg-[#DFF6FF] hover:bg-[#47B5FF] text-black font-bold py-2 px-4 rounded-full'>
        {playlistName}
    </button>
  )
}