// src/utils/uploadMenu.js
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import julyMenu from "../data/menuData";

export const uploadJulyMenu = async () => {
  try {
    await setDoc(doc(db, "menus", "july"), julyMenu);
    alert("✅ July menu uploaded successfully!");
  } catch (err) {
    console.error("❌ Error uploading menu:", err);
    alert("Failed to upload menu to Firestore.");
  }
};
