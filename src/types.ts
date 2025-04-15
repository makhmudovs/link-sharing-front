export type Platform = 'youtube' | 'github' | 'linkedin' | 'codepen';

export interface Link {
  id: string;
  owner:string;
  platform:Platform;
  createdAt: string;
  updatedAt:string;
  url:string;
}

export interface Pagination {
  totalLinks: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
}

export interface LinksResponse {
  links: Link[];
  pagination: Pagination;
  err: boolean;
  msg: string;
}
