import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import supabase from "../lib/supabaseClient";

export function Undangan() {
  const { slug } = useParams(); // contoh: nita-daffa
  const [searchParams] = useSearchParams();
  const to = searchParams.get("to"); // contoh: IPA 4
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchGuest() {
      if (!slug || !to) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("slug", slug)
        .ilike("name", to)
        .maybeSingle();

      if (error) {
        console.error("Supabase Error:", error);
        setNotFound(true);
      }

      if (data) {
        // Simpan ke localStorage untuk diakses di halaman utama
        localStorage.setItem("guestName", data.name);
        localStorage.setItem("guestSlug", data.slug);
        localStorage.setItem("guestColor", data.color);
        navigate("/"); // kembali ke halaman utama
      } else {
        setNotFound(true);
      }

      setLoading(false);
    }

    fetchGuest();
  }, [slug, to, navigate]);

  if (loading) {
    return (
      <div className="text-white text-center mt-20">
        <p>Memuat undangan...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="text-center text-red-400 mt-20">
        <p>Maaf, undangan tidak ditemukan 🥺</p>
      </div>
    );
  }

  return null; // tidak tampil apa pun, karena langsung redirect
}
