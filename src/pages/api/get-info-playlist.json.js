
 // Carga las variables de entorno desde el archivo .env

import { allPlaylists, songs as allSongs } from "@/lib/data";

export async function GET({ params, request }) {
  const { url, headers } = request;
  const urlObject = new URL(url);
  const id = urlObject.searchParams.get("id");

  // Verifica si la clave de autenticación es correcta
  const authKey = headers.get("Authorization");
  if (authKey != '1234') {
    return new Response("Acceso no autorizado", { status: 401 });
  }

  // Recupera la información de la playlist que tenga la misma id
  const playlist = allPlaylists.find((playlist) => playlist.id === id);

  // Recupera las canciones que correspondan también
  const songs = allSongs.filter((song) => song.albumId === playlist?.albumId);

  return new Response(JSON.stringify({ playlist, songs }), {
    headers: {
      "content-type": "application/json",
    },
  });
}
