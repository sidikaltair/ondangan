import React, { useState } from "react";
import data from "../../../data/config.json";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const GalleryItem = ({ src, onClick }) => (
  <img
    src={src}
    onClick={onClick}
    className="rounded-md hover:scale-105 w-full object-cover cursor-pointer transition-transform duration-300"
    style={{
      minHeight: "200px",
    }}
  />
);

export default function OurGallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div>
      <h2 className="text-lg leading-5 text-white font-bold mb-4">
        Our Gallery
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {data.gallery.map((item, idx) => (
          <GalleryItem
            key={idx}
            src={item}
            onClick={() => {
              setIndex(idx);
              setOpen(true);
            }}
          />
        ))}
      </div>

      {/* Lightbox viewer */}
      <Lightbox
        open={open}
        index={index}
        close={() => setOpen(false)}
        slides={data.gallery.map((src) => ({ src }))}
        plugins={[Thumbnails, Zoom]}
        carousel={{ finite: false, swipe: true }}
        zoom={{ maxZoomPixelRatio: 2, scrollToZoom: true }}
      />
    </div>
  );
}
