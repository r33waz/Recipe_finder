"use client";
import useSwr from "swr";
import { getDataForPath } from "@/service/service";
import ReactPaginate from "react-paginate";
import usePagination from "@/hook/usePaginationHook";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Loading from "@/components/common/loading";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hook/useDebounce";
import { useEffect, useState } from "react";

function FilterArea() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce the search term by 500ms

  const router = useRouter();
  const { data, isLoading } = useSwr(
    `api/json/v1/1/filter.php?a=${debouncedSearchTerm || "Canadian"}`,
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
  return (
    <>
      <div className="flex w-full justify-between items-center pt-2 md:flex-nowrap flex-wrap">
        <p className="text-muted-foreground mb-4">
          Find recipes based on main area
        </p>
        {/* Search bar */}
        <Input
          type="text"
          placeholder="Search by area"
          className="md:w-96 w-full dark:border-white border-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {isLoading ? (
        <div className="h-screen flex justify-center items-center">
          <Loading />
        </div>
      ) : // Render the current data
      currentData?.length === 0 ? (
        <div className="flex justify-center text-gray-400">No data found</div>
      ) : (
        <div className="grid md:grid-cols-4 grid-cols-1 gap-4 pt-4">
          {currentData?.map((item, idx) => (
            <Card className="w-full overflow-hidden" key={idx}>
              <div className="relative h-48 w-full">
                <Image
                  src={item?.strMealThumb}
                  alt="Recipe Image"
                  layout="fill"
                  objectFit="cover"
                  className="transition-all hover:scale-105"
                  loading="lazy"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-medium">
                  {item?.strMeal.length > 35
                    ? item?.strMeal.slice(0, 35) + "..."
                    : item?.strMeal}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Button
                  className="w-full text-white  dark:text-black hover:bg-gray-500 dark:hover:text-white duration-300"
                  onClick={() => {
                    router.push(`/post/${item?.idMeal}`);
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
        previousLabel={"<<"}
        nextLabel={">>"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"flex gap-3 bg-black"}
        activeClassName="bg-black dark:bg-white dark:text-black text-white rounded"
        activeLinkClassName="w-full"
        pageClassName="px-3 py-1 border border-gray-300 rounded "
        previousClassName={`px-3 py-1 border border-gray-300 rounded ${
          currentPage === 0
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-200 dark:hover:bg-blue-500 "
        }`}
        nextClassName={`px-3 py-1 border border-gray-300 rounded ${
          currentPage === pageCount - 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-200 dark:hover:bg-blue-500 "
        }`}
        className="flex gap-3 pt-5"
        disableInitialCallback={true}
      />
    </>
  );
}

export default FilterArea;
