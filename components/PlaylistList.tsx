import React from 'react'
import PlaylistButton from './PlaylistButton'

type Props = {
    playlists:Array<String>
}

export default function PlaylistList({playlists}: Props) {
  return (
    <div
    // style={{backgroundColor:'red'}}
    className='grid grid-cols-3 grid-flow-row gap-4'
    >
        {playlists.map((pl:String)=>{
          return <div key={pl.toString()}>
            <PlaylistButton playlistName={pl}/>
            </div>
        })}
    </div>
  )
}