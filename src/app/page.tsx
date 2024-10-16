// pages/index.tsx
"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import useSwr from "swr";
import { getDataForPath } from "@/service/service";
import Loading from "@/components/common/loading";
import SearchDropdown from "@/components/common/searchBox";
import Link from "next/link";

const DEBOUNCE_DELAY = 500; // milliseconds

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMeals, setFilteredMeals] = useState([]);
  const { data, isLoading, error } = useSwr(
    `api/json/v1/1/search.php?s=${""}`,
    getDataForPath
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        const results = data?.meals?.filter((meal) =>
          meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMeals(results || []);
      } else {
        setFilteredMeals([]);
      }
    }, DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, data]);

  if (error) return <div>Failed to load</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-muted py-12 md:py-24">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              Find Your Perfect Recipe
            </h1>
            <p className="text-xl mb-8">
              Discover delicious meals for every occasion
            </p>
            <div className="max-w-2xl mx-auto flex relative">
              <Input
                type="search"
                placeholder="Search recipes..."
                className="flex-grow border dark:border-white border-black"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredMeals.length > 0 && (
                <SearchDropdown
                  filteredMeals={filteredMeals}
                  searchTerm={searchTerm}
                  onMealSelect={(id) => setSearchTerm("")}
                />
              )}
            </div>
          </div>
        </section>

        {/* Featured Recipes Section */}
        <section className="py-12">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8">Featured Recipes</h2>
            {isLoading ? (
              <div className="flex justify-center items-center w-full">
                <Loading />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.meals?.slice(0, 6).map((i, idx) => (
                  <Card key={idx}>
                    <CardHeader className="p-0">
                      <Image
                        src={i?.strMealThumb}
                        alt={`Featured recipe ${i.strMeal}`}
                        width={400}
                        height={200}
                        className="object-cover w-full h-48 rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent className="p-4 flex justify-between items-center">
                      <CardTitle>Delicious Recipe - {i.strMeal}</CardTitle>
                      <Link href={`/recipe/${i.idMeal}`}>
                        <Button className="text-xs h-6 dark:hover:text-black hover:text-white bg-dark_mode dark:text-white hover:bg-zinc-600">
                          View Recipe
                        </Button>
                      </Link>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <p className="flex gap-1 h-6 items-center">
                        <span>Category:</span> {i?.strCategory}
                      </p>
                      <p className="flex h-6 items-center gap-1">
                        <span>Cuisine:</span> {i?.strArea}
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8">Recipe Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Breakfast",
                "Lunch",
                "Dinner",
                "Desserts",
                "Vegetarian",
                "Vegan",
                "Gluten-Free",
                "Quick & Easy",
              ].map((category) => (
                <Link
                  href={`/category/${category.toLowerCase()}`}
                  key={category}
                  className="block"
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold">{category}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
