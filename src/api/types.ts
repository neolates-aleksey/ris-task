export interface Info {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
}

export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Object[];
  url: string;
  created: string;
}

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  spices: string;
  type: string;
  gender: string;
  origin: Object[];
  location: Object[];
  image: string;
  episode: Object[];
  url: string;
  created: string;
}

export type Result = ICharacter | ILocation

export interface Response {
  info: Info;
  results: [Result];
}
