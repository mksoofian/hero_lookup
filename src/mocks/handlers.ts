import { http, HttpResponse } from "msw";

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get(
    "https://superheroapi.com/api.php/5bf23cfc69135a54a7e6ed124672c8fb/1",
    () => {
      // ...and respond to them using this JSON response.
      return HttpResponse.json({
        response: "success",
        id: "444", //number as a string
        name: "Mera",
        powerstats: {
          intelligence: "56", //number as a string
          strength: "62", //number as a string
          speed: "79", //number as a string
          durability: "60", //number as a string
          power: "92", //number as a string
          combat: "80", //number as a string
        },
        biography: {
          "full-name": "Mera",
          "alter-egos": "No alter egos found.",
          aliases: [
            "Queen of Atlantis",
            "Aquawoman",
            "Aquagirl",
            "Water-Woman",
          ],
          "place-of-birth": "-",
          "first-appearance": "Aquaman #11 (October, 1963)",
          publisher: "DC Comics",
          alignment: "good",
        },
        appearance: {
          gender: "Female",
          race: "Atlantean",
          height: ["5'9", "175 cm"],
          weight: ["160 lb", "72 kg"],
          "eye-color": "Blue",
          "hair-color": "Red",
        },
        work: {
          occupation:
            "Former queen of Atlantis; Former queen of Dimension Aqua",
          base: "Atlantis",
        },
        connections: {
          "group-affiliation": "Aquaman Family; formerly Red Lantern Corps",
          relatives:
            "Aquaman (husband); Aquababy (son, deceased); A.J. (son); Siren (Hila, twin sister)",
        },
        image: {
          url: "https://www.superherodb.com/pictures2/portraits/10/100/1388.jpg",
        },
      });
    }
  ),
];
