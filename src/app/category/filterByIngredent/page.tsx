"use client";
import useSwr from "swr";
import { getDataForPath } from "@/service/service";
import ReactPaginate from "react-paginate";
import usePagination from "@/hook/usePaginationHook";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Loading from "@/components/common/loading";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hook/useDebounce";
import { useEffect, useState } from "react";

function FilterCategory() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce the search term by 500ms

  const router = useRouter();
  const { data, error, isLoading } = useSwr(
    `api/json/v1/1/filter.php?c=${debouncedSearchTerm || "Seafood"}`,
    getDataForPath
  );

  const itemsPerPage = 12;

  // Always call usePagination, it can handle undefined data
  const { currentData, pageCount, handlePageClick, currentPage } =
    usePagination(data?.meals || [], itemsPerPage); // Fallback to an empty array if data.meals is undefined

  // Effect to handle the debounced search term
  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log(`Searching for ${debouncedSearchTerm}`);
    }
  }, [debouncedSearchTerm]);

  // Loading state

  return (
    <>
      <div className="flex w-full justify-between items-center pt-2">
        <p className="text-muted-foreground mb-4">
          Find recipes based on main ingredients
        </p>
        {/* Search bar */}
        <Input
          type="text"
          placeholder="Search by ingredients"
          className="md:w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : // Render the current data
      currentData?.length === 0 ? (
        <div className="flex justify-center text-gray-400">No data found</div>
      ) : (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-2 pt-2">
          {currentData?.map((item, idx) => (
            <Card className="w-full max-w-sm overflow-hidden" key={idx}>
              <div className="relative h-48 w-full">
                <Image
                  src={item?.strMealThumb}
                  alt="Recipe Image"
                  layout="fill"
                  objectFit="cover"
                  className="transition-all hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-medium">{item?.strMeal}</CardTitle>
              </CardHeader>
              <CardFooter>
                <Button
                  className="w-full text-white hover:text-white"
                  onClick={() => {
                    router.push(`/recipe/${item?.idMeal}`);
                  }}
                >
                  View More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
      <p>Current Page: {currentPage + 1}</p>
    </>
  );
}

export default FilterCategory;
