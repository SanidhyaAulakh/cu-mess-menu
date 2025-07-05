function Sidebar({
  selectedDayKey,
  setSelectedDayKey,
  weeks,
  currentWeek,
  setCurrentWeek,
  menu,
  mobileOpen,
}) {
  if (!weeks.length) return <div className="p-4">Loading sidebar...</div>;

  return (
    <div
      className={`
    ${mobileOpen ? "block" : "hidden"} 
    md:block
    w-full md:w-64 
    bg-white/60 backdrop-blur-md 
    border-r border-gray-200 
    shadow-sm 
    p-4 
    sticky top-0 z-30 
    h-screen 
    md:h-auto 
    overflow-y-auto
  `}
    >
      {/* Week Switcher */}
      <div className="flex gap-2 mb-4 justify-center">
        {weeks.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentWeek(i)}
            className={`text-sm px-3 py-1 rounded-full transition ${
              i === currentWeek
                ? "bg-pink-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-pink-100"
            }`}
          >
            Week {i + 1}
          </button>
        ))}
      </div>

      {/* Days List */}
      <ul className="space-y-1">
        {weeks[currentWeek].map((key) => {
          const entry = menu[key];
          return (
            <li key={key}>
              <button
                onClick={() => setSelectedDayKey(key)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                  key === selectedDayKey
                    ? "bg-pink-100 text-pink-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {entry?.day}
                <div className="text-xs text-gray-500">{entry?.date}</div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
