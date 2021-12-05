export interface List {
  id: number;
  name: string;
  cardList: Card[];
}

export interface Card {
  id: number;
  name: string;
}
