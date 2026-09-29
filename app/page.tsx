import Image from "next/image";
import Notes from "@/components/Notes";
import FounderWall from "@/components/FounderWall";
import Stickers from "@/components/Stickers";
import Spotlight from "@/components/Spotlight";

export default function Home() {
  return (
    <>
      <Spotlight />

      <main className="moodboard" id="top">
        <Stickers />

        <header className="topbar">
          <Image src="/forma-logo-full-white.svg" alt="Forma" width={88} height={16} priority />
        </header>

        <Notes />
        <FounderWall />

        <footer className="footer">
          <Image className="footer-sticker" src="/stickers/residency.svg" alt="Forma Residency" width={84} height={17} />
        </footer>
      </main>
    </>
  );
}
