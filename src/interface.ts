export interface UserInterface {
  _id: string;
  Hours: number;
  invalid: number;
  skip: number;
  sqb: number;
  update_at: string;
  anuncios: boolean;
  annoucements: AnunciosInterface[];
}
export interface AnunciosInterface extends Array<AnuncioInterface> {
  author: string;
  title: string;
  body: string;
  extra: string;
  date: string;
  urgent: boolean;
  number: number;
}

export interface AnuncioInterface {
  author: string;
  title: string;
  body: string;
  extra: string;
  date: string;
  urgent: boolean;
  number: number;
}
export interface PayoutInterface extends Array<PayoutInterface> {
  user_id: string;
  date: string;
  payout: string;
  hours: number;
  quality: number;
  speed: number;
  bonus: number;
  extra: number;
  total: number;
}
