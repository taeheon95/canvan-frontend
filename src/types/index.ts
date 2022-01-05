export interface List {
  id: number;
  seq: number;
  title: string;
  insert_time: number;
  update_time: number;
  cardList: Card[];
}

export interface Card {
  id: number;
  seq: number;
  title: string;
  insert_time: number;
  update_time: number;
}

export interface Contact {
  id: number;
  age: number;
  description: string;
  email: string;
  name: string;
  phoneNumber: string;
}
