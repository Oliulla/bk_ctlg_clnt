type Review = {
  comment: string;
};

export interface IBooks {
  _id?: string;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  reviews?: Review[];
}
