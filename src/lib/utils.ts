import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (path: string) => {
  if (!path) return '';
  
  // Handle Google Drive links
  if (path.includes('drive.google.com')) {
    const match = path.match(/[?&]id=([\w-]+)/) || path.match(/\/d\/([\w-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
    }
  }

  if (path.startsWith('http') || path.startsWith('data:')) return path;
  
  let relativePath = path.startsWith('/') ? path.slice(1) : path;
  if (relativePath.startsWith('src/assets/')) {
    relativePath = relativePath.replace('src/assets/', 'images/');
  }
  
  return `${import.meta.env.BASE_URL}${relativePath}`;
};
