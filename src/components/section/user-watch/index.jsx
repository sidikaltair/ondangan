import React, { useEffect, useState } from "react";
import supabase from "../../../lib/supabaseClient"; // pastikan path-nya sesuai proyekmu

export default function UserWatch({ onClick }) {
  const [guestName, setGuestName] = useState("Guest");

  useEffect(() => {
    async function fetchGuest() {
      if (typeof window === "undefined") return;

      const url = new URL(window.location.href);
      const slug = url.searchParams.get("to");
      if (!slug) return;

      // ambil data dari Supabase
      const { data, error } = await supabase
        .from("guests")
        .select("name")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Supabase error:", error);
      } else if (data) {
        setGuestName(data.name);
      }
    }

    fetchGuest();
  }, []);

  return (
    <div className="py-10 text-center space-y-28">
      <img
        className="mx-auto scale-110"
        src="assets/nikah/logoo.png"
        width={"300px"}
        height={"70px"}
        alt="RISMA & SIDIK"
      />
      <div>
        <p className="mb-10 text-2xl">Dear, </p>
        <div onClick={onClick} className="group cursor-pointer">
          <img
            className="mx-auto group-hover:scale-125"
            src="images/guest-icon.png"
            width={100}
            height={100}
            alt="guest"
          />
          <p className="text-xl mt-2 group-hover:scale-125 group-hover:pt-5">
            {guestName}
          </p>
        </div>
      </div>
    </div>
  );
}
