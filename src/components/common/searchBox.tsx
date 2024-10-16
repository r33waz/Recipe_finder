import Link from "next/link";

interface SearchDropdownProps {
  filteredMeals: any[];
  searchTerm: string;
  onMealSelect: (id: string) => void;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
  filteredMeals,
  searchTerm,
  onMealSelect,
}) => {
  return (
    <div className="absolute z-10 w-full bg-white border border-gray-200 mt-1 max-h-60 overflow-y-auto top-10">
      {filteredMeals.length > 0 ? (
        filteredMeals.map((meal) => (
          <Link key={meal.idMeal} href={`/recipe/${meal.idMeal}`} onClick={() => onMealSelect(meal.idMeal)}>
            <div className="p-2 hover:bg-gray-100 cursor-pointer">
              {meal.strMeal}
            </div>
          </Link>
        ))
      ) : (
        <div className="p-2">No results found for "{searchTerm}"</div>
      )}
    </div>
  );
};

export default SearchDropdown;
