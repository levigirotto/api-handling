import DogCard from '@/components/cards/DogCard.tsx';
import CatCard from '@/components/cards/CatCard.tsx';
import DadJokeCard from '@/components/cards/DadJokeCard.tsx';
import ExcuseCard from '@/components/cards/ExcuseCard.tsx';
import ISSCard from "@/components/cards/ISSCard.tsx";
import PistonCard from "@/components/cards/PistonCard.tsx";
import GeoapifyCard from "@/components/cards/GeoapifyCard.tsx";
import BibleCard from "@/components/cards/BibleCard.tsx";

const cards = [
  DogCard, 
  CatCard, 
  DadJokeCard, 
  ExcuseCard, 
  ISSCard,
  PistonCard,
  GeoapifyCard,
  BibleCard,
];

export default function CardGrid() {
  return (
    <div className='w-[90vw] md:w-[80vw] space-y-4 gap-8 p-4 columns-1 sm:columns-1 md:columns-2 lg:columns-3 xl:columns-4'>
      {cards.map((Card, index) => (
        <Card key={index} />
       ))}
    </div>
  )
}
