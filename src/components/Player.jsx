export const Pause = () => (
  <svg role="img" aria-hidden="true" viewBox="0 0 16 16">
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);

export const Play = () => (
  <svg role="img" aria-hidden="true" viewBox="0 0 16 16">
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);

import React, { useState, useRef, useEffect } from "react";
import { usePlayerStore } from "../store/playerStore";
import {Slider} from "./Slider";

//Hacemos el componente CurrentSong. Como sera siempre usado desde el player lo declaramos aca en lugar de un CurrentSong.jsx

const CurrentSong = ({image, title, artists}) => {
  return (
    <div className={`flex items-center gap-5 relative overflow-hidden `}>
      <picture className="w-16 h-16 bg-zinc-600 rounded-md shadow-lg overflow-hidden">
        <img src={image} alt={title} />
      </picture>
      <div className="flex flex-col">
      <h3 className="font-semibold text-sm block ">
        {title}
      </h3>
      <span className="text-xs opacity-80 ">
        {artists?.join(', ')}
      </span>
      </div>
      

    </div>
  )
}


function Player() {
  //antes: teniamos un estado local const [isPlaying, setIsPlaying] = useState(false);
  //ahora: tenemos un estado global de cuando este o no este reproudiciendo una cancion, empleado por el customHook usePlayerStore creado con zustand

  //ir antes a CardPlayButton.jsx: Aca como estamos recuperando el valor de la store, compartira el dato de isPlaying con CardPlayButton.jsx
    const {currentMusic,isPlaying, setIsPlaying} = usePlayerStore(state => state)
    // const [currentSong, setCurrentSong] = useState(null);

    const audioRef = useRef();

    //este useEffect sirve para escuchar el cambio del estado de isPlaying y reproducir o pausar la cancion.
    useEffect(() => {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    },[isPlaying])

    //cada vez que cambie la MUSICA, cambiamos la cancion, 

    useEffect(() => {
      const {song,playlist,songs} = currentMusic
      if(song){
        const src = `/music/${playlist?.id}/0${song.id}.mp3`
        audioRef.current.src = src
        audioRef.current.play()
      }
    },[currentMusic])

    // useEffect(() => {
    //   audioRef.current.src = `/music/1/01.mp3`;
    // }, [currentSong]);

    const handleClick = () => {
      //escuchamos el estado GLOBAL de la reproduccion y sus cambios
        //Este handleClick al igual que CardPlayButton.jsx, se encarga de cambiar el estado de isPlaying, haciendo que al hacer click se reproduzca o se pause la musica. Como este isPlaying es parte del estado global definido en playerStore, comparte toda la data, y por eso al hacer click en el reproductor se cambia en la CardPlayButton.jsx y visceversa. 
        setIsPlaying(!isPlaying);
    }
  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <div>
        {/* le pasamos toda la info de la cancion actual */}
      <CurrentSong {...currentMusic.song} />
        </div>

      <div className="grid place-content-center gap-4 flex-1 ">
        <div className="flex justify-center">
            <button onClick = {handleClick} className="bg-white rounded-full w-9 text-black p-2 hover:scale-105">
                {isPlaying ? <Pause /> : <Play />}
            </button>
        </div>
        Reproductor
        </div>

      <div className="grid place-content-center ">Volume...</div>

      {/* persistencia de audio. Queremos que persista el estado de la reproduccion del audio aunque navegue entre otras páginas */}
      <audio ref={audioRef}/>
      
    </div>
  );
}

export default Player;
