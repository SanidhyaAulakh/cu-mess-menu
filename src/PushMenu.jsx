// src/PushMenu.jsx
import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { julyMenuISO } from "./data/julyMenuISO";

function PushMenu() {
  useEffect(() => {
    const upload = async () => {
      try {
        await setDoc(doc(db, "menus", "july"), julyMenuISO);
        alert("✅ Menu uploaded successfully to Firestore.");
      } catch (err) {
        console.error("Error uploading menu:", err);
        alert("❌ Upload failed. See console.");
      }
    };
    upload();
  }, []);

  return <div className="p-8 text-center">Uploading menu...</div>;
}

export default PushMenu;
