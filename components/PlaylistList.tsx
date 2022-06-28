import React from 'react'
import PlaylistButton from './PlaylistButton'

type Props = {
    playlists:Array<String>
}

export default function PlaylistList({playlists}: Props) {
  return (
    <div
    // style={{backgroundColor:'red'}}
    className='grid grid-rows-4 grid-flow-col gap-4'
    >
        {playlists.map((pl:String)=>{
          return <div key={pl.toString()}>
            <PlaylistButton playlistName={pl}/>
            </div>
        })}
    </div>
  )
}