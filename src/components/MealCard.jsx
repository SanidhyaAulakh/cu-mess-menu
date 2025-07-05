import { useEffect, useState } from "react";

const mealIcons = {
  Breakfast: "🍳",
  Lunch: "🥗",
  Snacks: "🍪",
  Dinner: "🌙",
};

function MealCard({ type, time, items, editMode, onChange }) {
  const [localItems, setLocalItems] = useState(items);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const handleChange = (e, index) => {
    const updated = [...localItems];
    updated[index] = e.target.value;
    setLocalItems(updated);
    onChange(type, updated);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-6 shadow-md transition-all">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-pink-600">
          {mealIcons[type]} {type}
        </h3>
        <span className="text-sm text-gray-500">{time}</span>
      </div>

      <ul className="space-y-1 text-sm">
        {localItems.map((item, idx) =>
          editMode ? (
            <li key={idx}>
              <input
                value={item}
                onChange={(e) => handleChange(e, idx)}
                className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </li>
          ) : (
            <li key={idx} className="text-gray-700 list-disc list-inside">
              {item}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default MealCard;
