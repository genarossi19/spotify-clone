//con astro se pueden crear endpoint similar a Next.
//La idea de este es que sea el servidor que me pase las canciones, ya que si lo hacemos en el cliente tendria que cargar todas las canciones y lista desde el mismo y no seria lo mas optimo.
//Esta api deberia llamar a una base de datos pero como no hay ninguna, usamos el archivo data.json.
import { API_KEY } from '../../../myapikey.d.ts'


import { allPlaylists, songs as allSongs } from "@/lib/data";
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

  //recuperamos la informacion de la playlist que tenga la misma id

  const playlist = allPlaylists.find((playlist) => playlist.id === id);

  //recuperamos las canciones que correspondan tambien

  const songs = allSongs.filter((song) => song.albumId === playlist?.albumId);

  return new Response(JSON.stringify({ playlist, songs }), {
    headers: {
      "content-type": "application/json",
    },
  });
}
