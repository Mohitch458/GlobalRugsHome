import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  
  let relativePath = path.startsWith('/') ? path.slice(1) : path;
  if (relativePath.startsWith('src/assets/')) {
    relativePath = relativePath.replace('src/assets/', 'images/');
  }
  
  return `${import.meta.env.BASE_URL}${relativePath}`;
};
