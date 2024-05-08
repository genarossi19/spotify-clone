

 // Carga las variables de entorno desde el archivo .env

import { allPlaylists, songs as allSongs } from "@/lib/data";

import { API_KEY } from '../../../myapikey.d.ts'
console.log(API_KEY)

export async function GET({ params, request }) {
  //recuperamos la id que viene de la url
  const { url, headers } = request;
  // const [, queryString] = url.split('?') //la , al principio del array es para evitar poner url.split('?')[1], como una forma de desestructuracion. El split lo que hace es dividir en 2 posiciones el url y el query string, y como nos interesa la segunda parte lo recuperamos de esa forma
  // const searchParams = new URLSearchParams(queryString)

  const apiKey = headers.get('Authorization');

  // Verifica si se proporcionó una clave de API
  if (!apiKey || apiKey != `Bearer ${API_KEY}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401, // Unauthorized
      headers: {
        'content-type': 'application/json',
      },
    });
  }


  const urlObject = new URL(url);
  const id = urlObject.searchParams.get("id");
  if (id === null) {
    return new Response(JSON.stringify({ error: 'ID not found in URL' }), {
      status: 400, // Bad Request
      headers: {
        'content-type': 'application/json',
      },
    });
  }

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
