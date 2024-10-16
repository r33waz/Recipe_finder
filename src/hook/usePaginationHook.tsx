import { useState } from "react";

// Define the type for the data items
interface PaginatedItem {
  id: number;
  name: string;
}

// Define the return type of the custom hook
interface UsePaginationReturn {
  currentData: PaginatedItem[];
  pageCount: number;
  handlePageClick: (event: { selected: number }) => void;
  currentPage: number;
}

// Custom hook for pagination
const usePagination = (data: PaginatedItem[] = [], itemsPerPage: number): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  // Ensure data is available and default to an empty array
  const offset = currentPage * itemsPerPage;
  const currentData = data?.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(data?.length / itemsPerPage);

  // Handle page change
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return {
    currentData,
    pageCount,
    handlePageClick,
    currentPage,
  };
};

export default usePagination;
