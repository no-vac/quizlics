import React, { MouseEventHandler } from 'react'

type Props = {
    name:String;
    id:String;
    // playlistID:string;
}


export default function PlaylistButton({name,id }: Props) {
  const showInfo:MouseEventHandler = ()=>{
    console.log({name,id});
  }
  return (
    <button onClick={showInfo} className='w-full pt-3 pb-3 bg-[#DFF6FF] hover:bg-[#47B5FF] text-black font-bold py-2 px-4 rounded-full'>
        {name}
    </button>
  )
}