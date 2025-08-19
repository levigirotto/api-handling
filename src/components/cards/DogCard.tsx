import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ApiCard from "@/components/cards/ApiCard.tsx"

export default function DogCard() {
  const [dogUrl, setDogUrl] = useState<string | null>(null);
  const effectRan = useRef(false);
  const fetch = async () => {
    try {
      const res = await axios.get("https://api.thedogapi.com/v1/images/search");
      setDogUrl(res.data[0].url);
    } catch (err) {
      console.log(err);
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
      title="Random Dog"
      description="The Dog API"
      apiLink="https://thedogapi.com/"
      content={
        dogUrl ? (
          <img src={dogUrl} alt="A random dog" className="rounded-md w-full" />
        ) : (
          <p>Loading…</p>
        )
      }
      footer={<Button onClick={fetch}>New Dog</Button>}
    />
    
  );
}
