import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ApiCard from "@/components/cards/ApiCard.tsx"
import { Textarea } from "@/components/ui/textarea"

export default function DadJokeCard() {
  const [joke, setJoke] = useState<string | null>(null);
  const effectRan = useRef(false);
  const fetch = async () => {
    try {
      const res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      setJoke(res.data.joke);
    } catch (err) {
      setJoke("Oops! Couldn't fetch a joke.");
      console.error(err);
    }
  };

  useEffect(() => {
    !effectRan.current && fetch();
    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <ApiCard
      title="Dad Joke"
      description="icanhazdadjoke.com"
      apiLink="https://icanhazdadjoke.com/api"
      content={
        joke ? (
          <Textarea
            value={joke}
            readOnly
            rows={5}
            className="w-full max-w-md p-3 text-center"
          />
        ) : (
          <p>Loading…</p>
        )
      }
      footer={<Button onClick={fetch}>New Joke</Button>}
    />
    
  );
}
