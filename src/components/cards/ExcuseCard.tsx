import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ApiCard from "@/components/cards/ApiCard.tsx"

export default function ExcuseCard() {
  const [excuse, setExcuse] = useState<string | null>(null);
  const effectRan = useRef(false);
  const fetch = async () => {
    try {
      const res = await axios.get("https://excuser-three.vercel.app/v1/excuse");
      setExcuse(res.data[0].excuse);
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
      title="Excuses..."
      description="Excuser API"
      apiLink="https://excuser-three.vercel.app/"
      content={
        excuse ? (
          <>
            <p>Sorry, the fetching failed because...</p>
            <p className="text-lg font-semibold text-chart-3">{excuse}</p>
          </>
        ) : (
          <p>Loading…</p>
        )
      }
      footer={<Button onClick={fetch}>New Excuse</Button>}
    />
    
  );
}
