import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SignalBar } from "@/components/SignalBar";
import { ValuePillars } from "@/components/ValuePillars";
import { KeyAchievements } from "@/components/KeyAchievements";
import { CaseStudies } from "@/components/CaseStudies";
import { ToolchainStrip } from "@/components/ToolchainStrip";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { About } from "@/components/About";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Add JSON-LD structured data for SEO
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Indukumar Mallampali",
      jobTitle: "Lead DevOps & Release Engineering",
      url: "https://indumallampali.com",
      sameAs: [
        "https://www.linkedin.com/in/indu-mallampali",
        "https://github.com/indu-mallampali",
      ],
      knowsAbout: [
        "DevOps",
        "Release Engineering",
        "CI/CD",
        "Azure DevOps",
        "Jenkins",
        "GitLab",
      ],
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main id="content">
        <Hero />
        <SignalBar />
        <ValuePillars />
        <KeyAchievements />
        <CaseStudies />
        <ToolchainStrip />
        <ProcessTimeline />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
