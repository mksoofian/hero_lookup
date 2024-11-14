import { Spinner } from "@chakra-ui/react";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";

// Create new client
const queryClient = new QueryClient();
// Type
type HeroApi = {
  response: string;
  id: string; //number as a string
  name: string;
  powerstats: {
    intelligence: string; //number as a string
    strength: string; //number as a string
    speed: string; //number as a string
    durability: string; //number as a string
    power: string; //number as a string
    combat: string; //number as a string
  };
  biography: {
    "full-name": string;
    "alter-egos": string;
    aliases: string[];
    "place-of-birth": string;
    "first-appearance": string;
    publisher: string;
    alignment: string;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    "eye-color": string;
    "hair-color": string;
  };
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    "group-affiliation": string;
    relatives: string;
  };
  image: {
    url: string;
  };
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroStats />
    </QueryClientProvider>
  );
}

const randomNumGenerator = () => {
  // Hero id's are an integer between 1 and 731
  const num = Math.floor(Math.random() * (731 - 1) + 1);

  return num;
};

function HeroStats() {
  const [heroID, setHeroID] = useState(1);
  const {
    isPending,
    error,
    data: hero,
  } = useQuery({
    queryKey: ["hero", heroID],
    queryFn: async (): Promise<HeroApi> => {
      const response = await fetch(
        `https://superheroapi.com/api.php/5bf23cfc69135a54a7e6ed124672c8fb/${heroID}` // fixed CORS error by adding .php
      );
      return await response.json();
    },
  });

  const handleClickNext = () => {
    setHeroID(randomNumGenerator());
  };

  if (isPending) return <Spinner size="lg" />;

  if (error || hero.response !== "success")
    return <p>Error: {error ? error.message : hero.response}</p>;

  const image = hero.image;
  const biography = hero.biography;
  //   const powerstats = hero.powerstats;
  //   const appearance = hero.appearance;
  //   const work = hero.work;
  //   const connections  = hero.connections

  return (
    <div className="flex flex-col gap-8 ">
      <div className="card flex flex-wrap md:flex-nowrap outline gap-4 rounded-lg bg-slate-50 md:h-96 w-full">
        <div className="w-full  min-w-56 h-96">
          <img
            src={image.url}
            alt={hero.name}
            className="object-cover w-full h-full img"
          />
        </div>

        <div className="flex flex-col justify-between items-start  md:min-w-96 py-4  px-2 md:pr-4  h-full">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-5xl font-bold text-slate-800 text-left">
              {hero.name}
            </h1>
            <p className="font-semibold text-slate-500">
              {biography["full-name"]}
            </p>
          </div>

          {biography["first-appearance"] &&
            biography["first-appearance"] !== "-" && (
              <p className="text-left text-wrap">
                First appeared in {biography["first-appearance"]}
              </p>
            )}
        </div>
      </div>

      <button
        className="rounded-md py-2 px-4 font-semibold bg-slate-100 outline-dotted hover:outline-none hover:bg-slate-700 hover:text-slate-50 transition-colors"
        onClick={handleClickNext}
      >
        Next Random Hero
      </button>
    </div>
  );
}
