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

export interface Contact {
  id: number;
  age: number;
  description: string;
  email: string;
  name: string;
  phoneNumber: string;
}
