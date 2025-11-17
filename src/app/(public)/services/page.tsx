import type { Metadata } from "next";
import ServicesHero from "@/components/blocks/services/ServicesHero";
import ExperienceIntro from "@/components/blocks/services/ExperienceIntro";
import Stats from "@/components/blocks/services/Stats";
import ServiceTiles from "@/components/blocks/services/ServiceTiles";
import Features from "@/components/blocks/services/Features";
import JobsCTA from "@/components/blocks/services/JobsCTA";
import CustomerServiceCTA from "@/components/blocks/services/CustomerServiceCTA";
import ProfileCTA from "@/components/blocks/services/ProfileCTA";

export const metadata: Metadata = {
  title: "Layanan",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ExperienceIntro />
      <Stats />
      <ServiceTiles />
      <Features />
      <JobsCTA />
      <CustomerServiceCTA />
      <ProfileCTA />
    </>
  );
}