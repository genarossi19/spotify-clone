import React from "react";
import { Pause, Play } from "./Player.jsx";
import { usePlayerStore } from "../store/playerStore";
import dotenv from 'dotenv';



function CardPlayButton({ id }) {
  
  //creamos todos los estados gloables que necesitamos con el usePlayerStore
  const { currentMusic, setCurrentMusic, isPlaying, setIsPlaying } =
    usePlayerStore((state) => state);

  //El isPlayingPlaylist sirve para que solo la card de la cancion que se esta reproduciendo cambie el estado (boton de pausa y de play) al hacer click, y el resto de las card sigan mostrando el boton de reproducir como que estan pausados. Si usaramos directamente el isPlaying, el boton de reproducir y pausa cambiariamos de estado en todas las cards y no en la que seleccionamos individualmente. Para esto, usamos la id: Pasamos como parametro al boton la id de la cancion (Esto se debe a que a PlayListItemCard.jsx lo renderizamos en el main con un map, y le pasamos como data el array playlist que dentro de su informacion tiene la id. Luego dentro del mismo componente de PlaylistItemCard.jsx donde renderizamos el componente CardPlayButton, le pasamos como parametro la id de la cancion que queremos reproducir, entonces cada boton tendra su id correspondiente al id de la cancion. Por eso en isPlayingPlaylist hacemos lo siguiente, comparamos si isPlaying es true (ya que al ser false no se reproduce) y el id que pasamos con currentMusic es igual la id de la cancion, isPlayingPlaylist es true. Si es true, se renderiza el boton de pausa, si es false, se renderiza el boton de play. Se supone que cada vez que tocamos el boton, el currentMusic se vuelve a setear, y es la idea ya que quiero que si toco otro boton de una card mientras otra card se reproducia, esa otra card se pause (producto de que cambio la id y no coincide con la id que le pasamos al boton) y la card que toque se reproduzca (producto de que las ids ahora coinciden)
  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;
  const handleClick = () => {
    //Si esta es la playlist que se esta ejecutando, dejamos de reproducir y retornamos.
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }
 
    //si no, hacemos un fetch a la api. Le pasamos la id como query param por si queremos a futuro filtrar etc. Este fetch devuelve una promesa que resolvemos con un .then (podrua hacerse tambien con async/await)
    
   
      
      fetch(`/api/get-info-playlist.json?id=${id}`, {
        headers: {
          'Authorization': `1234`
        }
      })
      .then(res => {
        if (!res.ok) {
          throw new Error("Acceso no autorizado");
        }
        return res.json();
      })
      .then(data => {
        const { songs, playlist } = data;
        setIsPlaying(true);
        setCurrentMusic({ songs, playlist, song: songs[0] });
      })
      .catch(error => {
        console.error(error);
      });
   
    
    
    //aca seteamos el currentMusic con la id correspondiente Este valor es el que vamos a usar abajo con is PlayingPlaylist
    setCurrentMusic({
      playlist: {
        id,
      },
    });
    //La funcion setIsPlaying que fue definida en nuestro playerStore, lo que hace es permitirnos cambiar el estado de isPlaying. En este caso lo colocamos dentro de un handleClick que ira dentro del onClick de un boton, y el parametro que pasamos es el valor nuevo que tendra el isPlaying, en este caso es siempre el contrario al valor actual. Como esta funcion no fue definida localmente si no que fue definida desde el playerStore de zustand, permite que este valor que cambiamos sea global, y pueda ser tomado desde el Player.jsx (ir a Player.jsx)
    setIsPlaying(!isPlaying);
  };
  return (
    <button
      onClick={handleClick}
      className="card-play-button bg-spotify-green/90 rounded-full w-10 text-black p-3 hover:scale-110 cursor-pointer hover:bg-spotify-green/100"
    >
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  );
}

export default CardPlayButton;
