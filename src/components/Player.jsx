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

export const VolumeSilence = ()=>(
  <svg data-encore-id="icon" role="presentation" aria-label="Volumen apagado" aria-hidden="true" id="volume-icon" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 kcUFwU"><path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>
)

export const Volume = ()=>(
  <svg data-encore-id="icon" role="presentation" aria-label="Volumen alto" aria-hidden="true" id="volume-icon" viewBox="0 0 16 16" class="Svg-sc-ytk21e-0 kcUFwU"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg> 
)


import React, { useState, useRef, useEffect } from "react";
import { usePlayerStore } from "../store/playerStore";
import {Slider} from "./Slider";

//Componente de control de volumen

export const VolumeControl = () => {

  const [volume, setVolume] = useState(100);
  return(
<Slider defaultValue={[100]}
        max={100}
        min={0}
        className="w-[100px]"
        onValueChange={(value) => {
          const [newVolume] = value
          const volumeValue = newVolume / 100
          volumeRef.current = volumeValue
          audioRef.current.volume = volumeValue
        }}
        />
  )
}

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

    const volumeRef = useRef(1);

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
        audioRef.current.volume = volumeRef.current
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

      <div className="grid place-content-center ">
        <VolumeControl/>
        </div>

      {/* persistencia de audio. Queremos que persista el estado de la reproduccion del audio aunque navegue entre otras páginas */}
      <audio ref={audioRef}/>
      
    </div>
  );
}

export default Player;
