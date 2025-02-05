export interface IBook {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  description: string;
  image: string;
  isNew?: boolean;
}
