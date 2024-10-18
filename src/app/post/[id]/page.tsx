"use client";
import React, { useState } from "react";
import useSwr from "swr";
import { getDataForPath } from "@/service/service";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "@/components/common/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import VideoPlayer from "@/components/common/videoPlayer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function page({ params }: { params: { id: string } }) {
  const [isSaved, setIsSaved] = useState(false);
  const { data, isLoading, error } = useSwr(
    `api/json/v1/1/lookup.php?i=${params?.id}`,
    getDataForPath
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  const meal = data?.meals[0];

  // Extract ingredients and measures dynamically
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className=" gap-8 mb-8">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">Delicious {meal?.strMeal}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              <span>{meal?.strArea}</span>
            </div>
            <div className="flex items-center">
              <span>{meal?.strCategory}</span>
            </div>
          </div>
          <div className="mb-6 flex gap-1.5 md:flex-nowrap flex-wrap">
            <Image
              src={meal?.strMealThumb}
              alt={meal?.strMeal}
              width={0}
              height={0}
              objectFit="fill"
              quality={100}
              loading="lazy"
              className="rounded-lg border  border-gray-200 md:h-[500px] h-96 w-full"
            />
            <Card className="h-fit w-80">
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {meal?.strTags && meal.strTags.trim() !== "" ? (
                    meal.strTags
                      .split(",")
                      .map((tag: string, index: number) => (
                        <div key={index}>
                          <Badge variant="secondary">{tag.trim()}</Badge>
                        </div>
                      ))
                  ) : (
                    <div className="text-gray-500">
                      <Badge variant="secondary">No tags available</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="ingredients" className="mb-6">
            <TabsList>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
            </TabsList>
            <TabsContent value="ingredients">
              <ul className="list-disc pl-5 space-y-2">
                {ingredients.map(({ ingredient, measure }, index) => (
                  <li key={index}>
                    {measure} {ingredient}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="instructions">
              <ScrollArea className="h-[500px] rounded-md border p-4">
                <div
                  className="whitespace-pre-wrap h-96 " // Added CSS class for no gaps while breaking
                  dangerouslySetInnerHTML={{
                    __html: meal?.strInstructions
                      // Replace STEP numbers with 'Step x: '
                      .replace(/STEP (\d+)/g, "<strong>Step $1:</strong> ")
                      // Use <br> for line breaks
                      .replace(/\r\n/g, "<br/>"),
                  }}
                />
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-4xl font-bold mb-4">
          {meal?.strMeal} Recipi Video
        </h1>
        <VideoPlayer data={data?.meals[0]?.strYoutube} 
        
        />
      </div>
    </main>
  );
}

export default page;
