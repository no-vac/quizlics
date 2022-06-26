import React from 'react'

type Props = {
    playlists:Array<String>
}

export default function PlaylistList({playlists}: Props) {
  return (
    <ul>
    {playlists.map((pl:String)=>{
        return <li>{pl}</li>
    })}
    </ul>
  )
}