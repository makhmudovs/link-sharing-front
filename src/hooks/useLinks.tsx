import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import { Link } from '../types';

// Function to fetch links using apiClient
const fetchLinks = async (page: number, limit: number): Promise<Link[]> => {
  const response = await apiClient.get('/links', {
    params: { page, limit },
  });
  return response.data; // Axios automatically parses JSON, and response.data is the array of links
};

// Custom hook to fetch links
export const useLinks = (page: number, limit: number) => {
  return useQuery<Link[], Error>({
    queryKey: ['links', page, limit],
    queryFn: () => fetchLinks(page, limit),
  });
};