import React, { useState } from "react";
import data from "../../../data/config.json";
import { Copy, CheckCircle } from "lucide-react"; // npm i lucide-react
import { motion, AnimatePresence } from "framer-motion"; // npm i framer-motion

console.log("WeddingGift loaded ✅");

export default function WeddingGift() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!data.show_menu?.wedding_gift) return null;

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="text-center text-white p-6 rounded-2xl bg-gradient-to-b from-[#0F2027] via-[#203A43] to-[#2C5364] shadow-xl">
      <h2 className="text-2xl font-extrabold text-[#00FFC8] mb-3">
        Wedding Gift 💫
      </h2>
      <p className="text-gray-300 mb-6">
        Terima kasih atas doa dan dukungan dari teman-teman sekalian 💖
      </p>

      <div className="space-y-4">
        {data.wedding_gift?.map((gift, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative bg-black/40 border border-[#00FFC8]/30 rounded-xl p-4 shadow-lg hover:shadow-[#00FFC8]/50 transition-all duration-300"
          >
            {/* Logo Bank */}
            {gift.logo && (
              <img
                src={gift.logo}
                alt={gift.bank}
                className="h-6 object-contain mx-auto mb-2"
              />
            )}

            {/* Nama Bank */}

            {/* Nomor Rekening + Tombol Copy */}
            <div className="flex justify-center items-center gap-2 mt-1">
              <span className="tracking-wide text-white font-mono select-all">
                {gift.number}
              </span>

              <button
                onClick={() => handleCopy(gift.number, i)}
                className="flex items-center gap-1 text-[#00FFC8] hover:text-white text-sm relative"
              >
                {copiedIndex === i ? (
                  <CheckCircle size={16} />
                ) : (
                  <Copy size={16} />
                )}
                <span className="font-medium">
                  {copiedIndex === i ? "Copied!" : "Copy"}
                </span>

                {/* Animasi Copied */}
                <AnimatePresence>
                  {copiedIndex === i && (
                    <motion.span
                      key="copied"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.4 }}
                      className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-[#00FFC8]"
                    >
                      Copied ✅
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Nama Pemilik */}
            <p className="text-gray-400 text-sm mt-1">a.n. {gift.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Optional link gift */}
      {data.gift_link && (
        <p className="mt-6 text-gray-300">
          Kirimkan gift melalui{" "}
          <a
            href={data.gift_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00FFC8] font-semibold hover:underline"
          >
            link berikut 🎁
          </a>
        </p>
      )}
    </div>
  );
}
