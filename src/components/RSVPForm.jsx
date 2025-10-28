import { useState, useEffect } from "react";
import supabase from "../lib/supabaseClient";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [ucapanList, setUcapanList] = useState([]);

  // Ambil data ucapan dari Supabase
  useEffect(() => {
    fetchUcapan();
  }, []);

  async function fetchUcapan() {
    const { data, error } = await supabase
      .from("rsvp")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.error(error);
    else setUcapanList(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const { error } = await supabase.from("rsvp").insert([{ name, message }]);
    if (error) {
      console.error(error);
      setStatus("❌ Gagal menyimpan, coba lagi.");
    } else {
      setStatus("✅ Terima kasih atas ucapan / konfirmasinya!");
      setName("");
      setMessage("");
      fetchUcapan(); // Refresh data setelah kirim
    }

    setIsSubmitting(false);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">
        💌 RSVP / Ucapan
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nama kamu"
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Ucapan atau konfirmasi..."
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="3"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`py-2 rounded-lg text-white transition ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isSubmitting ? "Mengirim..." : "Kirim"}
        </button>
        {status && <p className="text-center text-sm mt-2">{status}</p>}
      </form>

      {/* Daftar ucapan */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">✨ Ucapan dari tamu:</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {ucapanList.length > 0 ? (
            ucapanList.map((u) => (
              <div
                key={u.id}
                className="bg-white/60 p-2 rounded-lg shadow-sm border border-gray-100"
              >
                <p className="font-medium text-green-700">{u.name}</p>
                <p className="text-gray-700">{u.message}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Belum ada ucapan.</p>
          )}
        </div>
      </div>
    </div>
  );
}
