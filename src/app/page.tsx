import Hero from "@/components/home/Hero";
import PortraitReveal from "@/components/home/PortraitReveal";
import CareerTimeline from "@/components/home/CareerTimeline";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import CreativeProcess from "@/components/home/CreativeProcess";
import BrandCollaborations from "@/components/home/BrandCollaborations";
import Metrics from "@/components/home/Metrics";
// import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <PortraitReveal />
      <CareerTimeline />
      <FeaturedProjects />
      <CreativeProcess />
      <BrandCollaborations />
      <Metrics />
      {/* <Testimonials /> */}
    </>
  );
}
