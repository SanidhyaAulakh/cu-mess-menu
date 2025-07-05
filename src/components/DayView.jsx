import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import MealCard from "./MealCard";

function DayView({ day, data, editMode, setMenu, menu }) {
  const allMealsOrdered = ["Breakfast", "Lunch", "Snacks", "Dinner"];
  const mealTypes = allMealsOrdered.filter((meal) => data.meals[meal]);

  const [mealFilter, setMealFilter] = useState(["All"]);

  const toggleMeal = (meal) => {
    if (meal === "All") {
      setMealFilter(["All"]);
    } else {
      const updated = mealFilter.includes(meal)
        ? mealFilter.filter((m) => m !== meal)
        : [...mealFilter.filter((m) => m !== "All"), meal];

      setMealFilter(updated.length === 0 ? ["All"] : updated);
    }
  };

  const filteredMeals = mealFilter.includes("All")
    ? mealTypes
    : mealTypes.filter((meal) => mealFilter.includes(meal));

  const handleMealChange = (mealType, updatedItems) => {
    setMenu((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        meals: {
          ...prev[day].meals,
          [mealType]: {
            ...prev[day].meals[mealType],
            items: updatedItems,
          },
        },
      },
    }));
  };

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "menus", "july"), menu);
      alert("✅ Changes saved to Firestore");
    } catch (err) {
      console.error("Save failed:", err);
      alert("❌ Failed to save changes.");
    }
  };

  return (
    <div className="flex-1 p-6 sm:p-8">
      <h1 className="text-4xl font-bold text-pink-600 mb-1">{day}</h1>
      <p className="text-indigo-500 mb-6 text-sm">{data.date}</p>

      {/* Meal Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["All", "Breakfast", "Lunch", "Snacks", "Dinner"].map((meal) => (
          <button
            key={meal}
            onClick={() => toggleMeal(meal)}
            className={`px-4 py-1 rounded-full text-sm font-medium border transition-all ${
              mealFilter.includes(meal)
                ? "bg-pink-500 text-white shadow"
                : "bg-white/80 text-gray-700 border-gray-300 hover:bg-pink-100"
            }`}
          >
            {meal}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeals.map((type) => (
          <MealCard
            key={type}
            type={type}
            time={data.meals[type].time}
            items={data.meals[type].items}
            editMode={editMode}
            onChange={handleMealChange}
          />
        ))}
      </div>

      {editMode && (
        <div className="mt-8 text-center">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 shadow transition"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}

export default DayView;
