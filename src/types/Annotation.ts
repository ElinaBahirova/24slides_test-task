export interface Annotation {
  id: number;
  author: string;
  comment: string;
  pos: {
    x: number;
    y: number;
  };
};