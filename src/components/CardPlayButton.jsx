import React from 'react'
import {Pause, Play} from './Player.jsx'
import {usePlayerStore} from '../store/playerStore'
function CardPlayButton({id}) {

  //creamos todos los estados gloables que necesitamos con el usePlayerStore
  const {currentMusic, setCurrentMusic, isPlaying, setIsPlaying} = usePlayerStore( state => state)

  const handleClick = () => {

    setCurrentMusic ({
      playlist: {
        id
      }
    })
    setIsPlaying(!isPlaying);
  }

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;
  return (
    <button onClick={handleClick}className='card-play-button bg-spotify-green/80 rounded-full w-10 text-black p-3 hover:scale-110 cursor-pointer hover:bg-spotify-green/100'>{ isPlayingPlaylist ? <Pause /> : <Play />}</button>
  )
}

export default CardPlayButton