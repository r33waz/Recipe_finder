import Link from "next/link";

interface SearchDropdownProps {
  filteredMeals: {
    idMeal: number;
    strMeal: string;
  }[];
  searchTerm: string;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  filteredMeals,
  searchTerm,
}) => {
  if (!searchTerm || (filteredMeals.length === 0 && !searchTerm)) {
    return null; // Do not render the dropdown if no search term or filteredMeals
  }

  return (
    <div className="absolute z-10 w-full bg-white border border-gray-200 mt-1 max-h-60 overflow-y-auto top-10 dark:bg-dark_mode rounded-lg dark:text-white">
      {filteredMeals.length > 0 ? (
        filteredMeals.map((meal) => (
          <Link key={meal?.idMeal} href={`/post/${meal.idMeal}`}>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">
              {meal?.strMeal}
            </div>
          </Link>
        ))
      ) : (
        <div className="p-2">No results found {`${searchTerm}`}</div>
      )}
    </div>
  );
};

export default SearchDropdown;
