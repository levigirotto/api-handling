import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ApiCard from "@/components/cards/ApiCard.tsx"

export default function CatCard() {
  const [catUrl, setCatUrl] = useState<string | null>(null);
  const effectRan = useRef(false);
  const fetch = async () => {
    try {
      const res = await axios.get("https://api.thecatapi.com/v1/images/search");
      setCatUrl(res.data[0].url);
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
      title="Random Cat"
      description="The Cat API"
      apiLink="https://thecatapi.com/"
      content={
        catUrl ? (
          <img src={catUrl} alt="A random cat" className="rounded-md w-full" />
        ) : (
          <p>Loading…</p>
        )
      }
      footer={<Button onClick={fetch}>New Cat</Button>}
    />
    
  );
}
