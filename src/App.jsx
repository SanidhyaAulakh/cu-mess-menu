import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

import Sidebar from "./components/Sidebar";
import DayView from "./components/DayView";

function App() {
  const [menu, setMenu] = useState(null);
  const [selectedDayKey, setSelectedDayKey] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [weeks, setWeeks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Load admin flag
  useEffect(() => {
    const adminFlag = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminFlag);
  }, []);

  // Load menu
  useEffect(() => {
    const fetchMenu = async () => {
      const snap = await getDoc(doc(db, "menus", "july"));
      if (snap.exists()) {
        const data = snap.data();
        setMenu(data);

        const sortedKeys = Object.keys(data).sort(
          (a, b) => new Date(a) - new Date(b)
        );

        const groupedWeeks = [];
        for (let i = 0; i < sortedKeys.length; i += 7) {
          groupedWeeks.push(sortedKeys.slice(i, i + 7));
        }

        setWeeks(groupedWeeks);

        const todayISO = new Date().toISOString().slice(0, 10);
        const todayIndex = sortedKeys.indexOf(todayISO);
        const defaultKey = todayIndex !== -1 ? todayISO : sortedKeys[0];
        const weekIndex = todayIndex !== -1 ? Math.floor(todayIndex / 7) : 0;

        setSelectedDayKey(defaultKey);
        setCurrentWeek(weekIndex);
      } else {
        alert("❌ No menu found in Firestore.");
      }
    };

    fetchMenu();
  }, []);

  const toggleEdit = () => {
    if (!isAdmin) {
      const pass = prompt("Enter admin password:");
      if (pass === "cu-mess2025") {
        setIsAdmin(true);
        setEditMode(true);
      } else {
        alert("Wrong password.");
      }
    } else {
      setEditMode(!editMode);
    }
  };

  if (!menu || !selectedDayKey)
    return <div className="text-center mt-10">Loading menu...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef9f9] via-[#fffde7] to-[#e0f7fa] text-gray-800 font-display overflow-x-hidden">
      {/* ✅ Edit Mode Button */}
      {isAdmin && (
        <button
          onClick={toggleEdit}
          className="fixed bottom-4 right-4 z-50 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full shadow"
        >
          {editMode ? "Exit" : "Edit"}
        </button>
      )}

      {/* ✅ Mobile Header with ☰ and Today */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur border-b border-gray-200">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="text-2xl text-pink-600 font-bold"
        >
          ☰
        </button>
        <div className="text-sm font-semibold text-gray-700 text-center">
          {menu[selectedDayKey]?.day} — {menu[selectedDayKey]?.date}
        </div>
        <div style={{ width: "1.5rem" }} />
      </div>

      {/* ✅ Layout */}
      <div className="flex">
        <Sidebar
          selectedDayKey={selectedDayKey}
          setSelectedDayKey={(key) => {
            setSelectedDayKey(key);
            setMobileSidebarOpen(false); // close sidebar after selection
          }}
          weeks={weeks}
          currentWeek={currentWeek}
          setCurrentWeek={setCurrentWeek}
          menu={menu}
          mobileOpen={mobileSidebarOpen}
        />

        <DayView
          day={menu[selectedDayKey].day}
          data={menu[selectedDayKey]}
          editMode={editMode}
          setMenu={setMenu}
          menu={menu}
          dayKey={selectedDayKey}
        />
      </div>
    </div>
  );
}

export default App;
