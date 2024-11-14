import { Spinner } from "@chakra-ui/react";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

// Create new client
const queryClient = new QueryClient();
// Type
// type HeroApi = {
//   response: string;
//   id: string; //number as a string
//   name: string;
//   powerstats: {
//     intelligence: string; //number as a string
//     strength: string; //number as a string
//     speed: string; //number as a string
//     durability: string; //number as a string
//     power: string; //number as a string
//     combat: string; //number as a string
//   };
//   biography: {
//     "full-name": string;
//     "alter-egos": string;
//     aliases: string[];
//     "place-of-birth": string;
//     "first-appearance": string;
//     publisher: string;
//     alignment: string;
//   };
//   appearance: {
//     gender: string;
//     race: string;
//     height: string[];
//     weight: string[];
//     "eye-color": string;
//     "hair-color": string;
//   };
//   work: {
//     occupation: string;
//     base: string;
//   };
//   connections: {
//     "group-affiliation": string;
//     relatives: string;
//   };
//   image: {
//     url: string;
//   };
// };

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroStats />
    </QueryClientProvider>
  );
}

const randomNumGenerator = () => {
  // Hero id' are an integer between 1 and 731
  const num = Math.floor(Math.random() * (731 - 1) + 1);
  console.log(num);
  return num;
};

function HeroStats() {
  const {
    isPending,
    error,
    data: hero,
  } = useQuery({
    queryKey: ["hero"],
    queryFn: async () => {
      const response = await fetch(
        `https://superheroapi.com/api/5bf23cfc69135a54a7e6ed124672c8fb/${randomNumGenerator()}`
      );
      return await response.json();
    },
  });

  if (isPending) return <Spinner size="lg" />;

  if (error) return <p>Error: {error.message}</p>;

  //   const powerstats = hero.powerstats;
  const biography = hero.biography;
  //   const appearance = hero.appearance;
  //   const work = hero.work;
  //   const connections  = hero.connections
  const image = hero.image;

  return (
    <div>
      <h1>{hero.name}</h1>
      <p>{biography.full_name}</p>
      <img src={image.url} alt={hero.name} />
      <p>first appeared in {biography.first_appearance} </p>
    </div>
  );
}
