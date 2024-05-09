// usamos zustand para poder tener un estado global de la reproduccion de canciones. No es lo mismo que el persist de astro, ya que buscamos COMUNICAR datos

import { songs } from "@/lib/data";
import { create } from "zustand";



export const usePlayerStore = create((set)=>({
    isPlaying: false,
    // es currentMusic no currentSong porque no es solo la cancion si no el album, la cancion y la lista de canciones que salen de ese album, etc ya que despues queremos hacer para atras y adelante.
    //la song es la cancion que estamos reproduciendo y songs es la lista de cancionces que podriamos reproducir
    currentMusic: {playlist:null, song: null, songs: []},
    setIsPlaying: (isPlaying)=>set({isPlaying}),
    setCurrentMusic: (currentMusic)=>set({currentMusic}),
    volume: 1,
    setVolume: (volume)=>set({volume}),
}))

//esta store es usada en :
/*
Player.jsx
CardPlayButton.jsx
*/