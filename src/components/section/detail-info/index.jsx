import React from "react";
import TitleInfo from "../title-info";
import BreakingNews from "../breaking-news";
import Bridegroom from "../bride-groom";
//import LoveStory from "../love-story";
import OurGallery from "../our-gallery";
import WishSection from "../wish";
import Footer from "../footer";
import data from "../../../data/config.json";
import SongButton from "../../ui/song-button";
import WeddingGift from "../gift/WeddingGift";

export default function DetailInfo() {
  return (
    <div className="space-y-5 pb-10">
      <div className="text-center pb-4"></div>
      <div className="px-4 space-y-4">
        <TitleInfo />
        {data.show_menu.breaking_news && <BreakingNews />}
        {data.show_menu.bride_and_groom && <Bridegroom />}
        {/*(data.show_menu.love_story = false && <LoveStory />)*/}
        {data.show_menu.gallery && (
          <OurGallery gallery={data.gallery} show_menu={data.show_menu} />
        )}

        <div className="text-center pb-4">
          <div className="mb-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d832.4267435684754!2d107.7750589806829!3d-7.043183090101321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c7d14779f1af%3A0x35714342df1e7f2c!2sTOKO%20NUR%20BAROKAH%2FTOKO%20SUNJAYA!5e0!3m2!1sen!2sid!4v1761627149331!5m2!1sen!2sid"
              style={{
                border: 0,
                width: "100%",
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <a
            className="text-center underline"
            href="https://maps.app.goo.gl/hRsPWco3iBpu2beV6"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lihat Lokasi 📌
          </a>
        </div>
        {data.show_menu.wedding_gift && <WeddingGift />}
        {data.show_menu.wish && import.meta.env.VITE_APP_TABLE_NAME ? (
          <WishSection />
        ) : null}
        <video className="w-full" autoPlay muted loop playsInline>
          <source src={data.url_video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <Footer />
      <SongButton />
    </div>
  );
}
