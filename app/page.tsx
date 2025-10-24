import { Hero } from "@/components/sections/Hero";
import { Collections } from "@/components/sections/Collections";
import { BestSellers } from "@/components/sections/BestSellers";
import { Experiences } from "@/components/sections/Experiences";
import { Testimonials } from "@/components/sections/Testimonials";
import { ProfessionalSuite } from "@/components/sections/ProfessionalSuite";

export default function HomePage() {
  return (
    <div className="space-y-24">
      <Hero />
      <Collections />
      <BestSellers />
      <Experiences />
      <ProfessionalSuite />
      <Testimonials />
    </div>
  );
}
