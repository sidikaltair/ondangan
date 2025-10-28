import React from "react";

export default function Footer() {
  return (
    <div>
      <div className="mt-8 flex flex-col items-center text-center space-y-3 px-4">
        <p className="text-white text-sm leading-relaxed">
          Menjadi sebuah kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
          berkenan hadir dalam hari bahagia kami. Terima kasih atas segala
          ucapan, doa, dan perhatian yang diberikan.
        </p>
        <p className="text-white text-sm font-medium">
          See you on our wedding day! 🤍
        </p>
        <p className="text-white text-sm italic">
          Can’t wait to see u again! &lt;3
        </p>
      </div>
      <div className="mt-8 flex flex-col items-center">
        <p className="text-[10px] text-[#A3A1A1] mb-6">
          E-Invitation made with ♥ by{" "}
          <a
            className="underline"
            target="_blank"
            rel="noreferrer"
            href="https://www.facebook.com/arifintajul4"
          >
            Tajul Arifin S
          </a>
        </p>
      </div>
    </div>
  );
}
