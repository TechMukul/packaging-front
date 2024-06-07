// hooks/useData.js
import { useQuery } from '@tanstack/react-query';

const fetchCarouselData = async () => {
  const response = await fetch('https://www.api.woxnpackagingsolution.com/carousels/all-carousel');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const fetchCategoriesData = async () => {
  const response = await fetch('https://www.api.woxnpackagingsolution.com/data/all-category');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useCarouselData = () => {
    return useQuery({
      queryKey: ['carouselData'],
      queryFn: fetchCarouselData,
      config: {
        staleTime: 60 * 1000, // 1 minute
      },
    });
  };
  
  export const useCategoriesData = () => {
    return useQuery({
      queryKey: ['categoriesData'],
      queryFn: fetchCategoriesData,
      config: {
        staleTime: 60 * 1000, // 1 minute
      },
    });
  };
  