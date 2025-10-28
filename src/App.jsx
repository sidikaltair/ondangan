import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import supabase from "./lib/supabaseClient";
import UserWatch from "./components/section/user-watch";
import Thumbnail from "./components/section/thumbnail";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [guestName, setGuestName] = useState("Guest");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const slug = params.get("to");

    async function fetchGuest() {
      // Jika tidak ada query, tampil default UserWatch
      if (!slug) {
        setLoading(false);
        return;
      }

      // Cek ke database Supabase
      const { data, error } = await supabase
        .from("guests")
        .select("name")
        .ilike("slug", slug)
        .maybeSingle();

      if (error) {
        console.error("Supabase error:", error);
        setNotFound(true);
      } else if (data) {
        // Jika slug valid
        setGuestName(data.name);
        localStorage.setItem("guestName", data.name);
      } else {
        // Jika tidak ada slug yang cocok
        setNotFound(true);
      }

      setLoading(false);
    }

    fetchGuest();
  }, [location.search]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <p>Memuat undangan...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-white">
        <h2 className="text-xl font-semibold mb-2">Tamu tidak ditemukan</h2>
        <p className="text-gray-400">Link undangan ini tidak valid.</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-sm mx-auto">
        {isLogin ? (
          <Thumbnail guestName={guestName} />
        ) : (
          <UserWatch guestName={guestName} onClick={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}

export default App;
