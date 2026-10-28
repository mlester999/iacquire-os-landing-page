import Image from "next/image";

export function HeroFounderPortrait() {
  return (
    <div className="reference-hero-portrait-wrap">
      <Image
        className="reference-hero-portrait"
        src="/images/argel-platon-hero.jpg"
        width={1094}
        height={1438}
        alt="Argel Platon, founder of iAcquireOS, seated outdoors"
        sizes="(max-width: 900px) min(100vw - 32px, 520px), (max-width: 1280px) 42vw, 520px"
        loading="eager"
      />
      <div className="reference-hero-location"><span aria-hidden="true" />Based in the Philippines</div>
    </div>
  );
}
