import axios from "axios";
import { useEffect, useState } from "react";
import ApiCard from "@/components/cards/ApiCard.tsx"

type Game = {
    title: string;
    thumbnail: string;
    game_url: string;
    genre: string;
    plataform: string;
    publisher: string;
  }

function GameCard({title, thumbnail, game_url, genre, plataform, publisher}: Game) {
  return (
    <div>
      <img src={thumbnail} />
      {[title, thumbnail, game_url, genre, plataform, publisher]}
    </div>
  )
}

export default function GamesCard() {
  const [gamesDB, setGamesDB] = useState<Game[]>([]);

  async function fetch() {
    try {
      const res = await axios.get("/api/gamesCardProxy");
      setGamesDB(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetch();
  }, [])

  return (
    <ApiCard
      title="Random Free Game"
      description="The Dog API"
      apiLink="https://www.freetogame.com/api-doc"
      content={
        <div>
          Sort by
          {gamesDB.map((game) => {
            return (
              <GameCard 
                title={game.title}
                thumbnail={game.thumbnail}
                game_url={game.game_url}
                genre={game.genre}
                plataform={game.plataform}
                publisher={game.publisher}
              />
            )
          })}
        </div>
      }
    />
    
  );
}
