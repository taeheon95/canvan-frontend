export interface List {
  id: number;
  seq: number;
  title: string;
  insert_time: string;
  update_time: string;
  cardList: Card[];
}

export interface Card {
  id: number;
  seq: number;
  title: string;
  insert_time: string;
  update_time: string;
}
