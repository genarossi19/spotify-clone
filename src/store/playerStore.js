// usamos zustand para poder tener un estado global de la reproduccion de canciones

import { songs } from "@/lib/data";
import { create } from "zustand";

export const usePlayerStore = create((set) => ({
    isPlaying: false,
    // es currentMusic no currentSong porque no es solo la cancion si no el album, la cancion y la lista de canciones que salen de ese album, etc
    currentMusic: {playlist  : null, song : null,songs : null},
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setCurrentMusic: (currentMusic) => set({ currentMusic }),
}))