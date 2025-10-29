import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import supabase from "../../../lib/supabaseClient";
import badwords from "indonesian-badwords";

const WishItem = forwardRef(({ name, message, color }, ref) => (
  <div ref={ref} className="flex gap-2">
    <div>
      <img
        width={24}
        height={24}
        src="images/face.png"
        style={{
          backgroundColor: color,
          minWidth: 24,
          minHeight: 24,
        }}
        className="rounded-sm"
      />
    </div>
    <div>
      <p className="text-white text-md -mt-1">{name}</p>
      <p className="text-xs text-[#A3A1A1]">{message}</p>
    </div>
  </div>
));

const colorList = ["red", "#ffdb58", "#6bc76b", "#48cae4"];

export default function WishSection() {
  const containerRef = useRef(null);
  const lastChildRef = useRef(null);

  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 10;

  // 🔹 Fetch ucapan per halaman (pagination)
  const fetchData = useCallback(
    async (pageNum = 0, append = false) => {
      const start = pageNum * LIMIT;
      const end = start + LIMIT - 1;

      const { data: newData, error } = await supabase
        .from(import.meta.env.VITE_APP_TABLE_NAME)
        .select("name, message, color")
        .not("message", "is", null) // 🔹 hanya yang punya pesan
        .neq("message", "") // 🔹 bukan string kosong
        .order("id", { ascending: false }) // 🔹 urut terbaru dulu
        .range(start, end);

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      if (newData.length < LIMIT) setHasMore(false);

      setData((prev) => (append ? [...prev, ...newData] : newData));
    },
    [LIMIT]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 3) {
      setError("Nama minimal 3 karakter!");
      return;
    }

    if (message.length < 10) {
      setError("Pesan minimal 10 karakter!");
      return;
    }

    if (badwords.flag(name)) {
      setError("Gabolah kata kasar!");
      return;
    }

    setLoading(true);
    setError(null);

    const randomColor = colorList[data.length % colorList.length];
    const newmessage = badwords.censor(message);

    const { error } = await supabase
      .from(import.meta.env.VITE_APP_TABLE_NAME)
      .insert([{ name, message: newmessage, color: randomColor }]);

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      // Refresh data dari awal
      setPage(0);
      setHasMore(true);
      fetchData(0);
      setTimeout(scrollToTop, 300);
      setName("");
      setMessage("");
    }
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // 🔹 Deteksi scroll bawah untuk load lebih banyak
  const handleScroll = () => {
    if (!containerRef.current || loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      // Hampir sampai bawah
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage, true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* === Form di atas === */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <h2 className="text-lg leading-5 text-white font-bold">
          Kirim Ucapan & Doa 💌
        </h2>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="space-y-1">
          <label>Name</label>
          <input
            required
            minLength={3}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full focus:outline-none px-2 py-1 text-black rounded-sm"
          />
        </div>
        <div className="space-y-1">
          <label>Message</label>
          <textarea
            required
            minLength={10}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full focus:outline-none px-2 py-1 text-black rounded-sm"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-white text-black rounded-sm"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {/* === List ucapan di bawah === */}
      <h2 className="text-lg leading-5 text-white font-bold mb-5">
        Ucapan dan doa dari teman 💬
      </h2>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="max-h-[20rem] overflow-auto space-y-4 wish-container"
      >
        {data.map((item, index) => (
          <WishItem
            name={item.name}
            message={item.message}
            color={item.color}
            key={index}
            ref={index === data.length - 1 ? lastChildRef : null}
          />
        ))}

        {hasMore ? (
          <p className="text-center text-gray-400 text-xs py-2">
            Scroll untuk melihat lebih banyak...
          </p>
        ) : (
          <p className="text-center text-gray-500 text-xs py-2">
            Terimakasih atas Doa Nya
          </p>
        )}
      </div>
    </div>
  );
}
