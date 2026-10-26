import Image from "next/image";
import { CheckIcon } from "@/components/icons";

const journey = ["Find", "Connect", "Qualify", "Book", "Convert"];

export function HeroPreview() {
  return (
    <div className="hero-art" role="group" aria-label="Founder portrait and illustrative iAcquireOS workflow">
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <figure className="hero-founder-portrait">
        <Image
          src="/images/argel-platon-in-car.jpg"
          width={673}
          height={1200}
          alt="Argel Platon, founder of iAcquireOS"
          sizes="(max-width: 700px) calc(100vw - 32px), (max-width: 920px) 680px, (max-width: 1440px) 46vw, 560px"
          loading="eager"
        />
        <figcaption className="hero-portrait-caption">
          <span>Founder-led · iAcquireOS</span>
          <b>Argel Platon</b>
          <small>Based in the Philippines</small>
        </figcaption>
      </figure>
      <div className="hero-flow-card">
        <span className="hero-flow-kicker"><i /> Illustrative system flow</span>
        <b className="hero-flow-title">One connected client journey</b>
        <ol aria-label="Five connected acquisition stages">
          {journey.map((stage, index) => (
            <li key={stage}><small>{String(index + 1).padStart(2, "0")}</small><span>{stage}</span></li>
          ))}
        </ol>
        <p><CheckIcon /> People approve sensitive actions and commitments.</p>
      </div>
    </div>
  );
}
