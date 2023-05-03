import axios from "axios";
import { Response } from "./types";

const baseURL = "https://rickandmortyapi.com/api/";

const location = axios.create({
  baseURL: baseURL + "location",
});

const character = axios.create({
  baseURL: baseURL + "character",
});

export const rickAndMortyAPI = {
  getLocations: (locationPage: number) => {
    return location
      .get<Response>("", {
        params: {
          page: locationPage,
        },
      })
      .then((res) => res);
  },

  getCharacters: (locationPage: number) => {
    return character
      .get<Response>("", {
        params: {
          page: locationPage,
        },
      })
      .then((res) => res);
  },
};
