import { Annotation } from "~/types/Annotation";
import { client } from "./fetchClient";

export const getAnnotations = () => {
  return client.get<Annotation[]>('');
};

export const addAnnotation = (annotation: Annotation) => {
  return client.post<Annotation>(``, annotation);
};

export const deleteAnnotation = (id: number) => {
  return client.delete(`/${id}`);
};
