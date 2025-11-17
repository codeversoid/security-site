import AboutHero from "@/components/blocks/about/AboutHero";
import DirectorMessage from "@/components/blocks/about/DirectorMessage";
import TeamGrid from "@/components/blocks/about/TeamGrid";
import Timeline from "@/components/blocks/about/Timeline";
import Badges from "@/components/blocks/about/Badges";
import PartnersMarquee from "@/components/blocks/about/PartnersMarquee";
import Certifications from "@/components/blocks/about/Certifications";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <DirectorMessage />
      <Badges />
      <PartnersMarquee />
      <TeamGrid />
      <Certifications />
      <Timeline />
    </>
  );
}