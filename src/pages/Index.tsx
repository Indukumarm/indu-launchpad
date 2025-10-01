import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Logo3DWatermark } from "@/components/Logo3DWatermark";
import { Hero } from "@/components/Hero";
import { SignalBar } from "@/components/SignalBar";
import { ValuePillars } from "@/components/ValuePillars";
import { KeyAchievements } from "@/components/KeyAchievements";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { CaseStudies } from "@/components/CaseStudies";
import { ToolchainStrip } from "@/components/ToolchainStrip";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { About } from "@/components/About";
import { EducationCertifications } from "@/components/EducationCertifications";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check theme
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = stored === "dark" || (!stored && prefersDark);
    setIsDark(shouldBeDark);

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

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
    <div className="min-h-screen relative">
      <Logo3DWatermark />
      <div className="relative z-10">
        <Header />
      <main id="content">
        <Hero />
        <About />
        <SignalBar />
        <ValuePillars />
        <KeyAchievements />
        <ExperienceTimeline />
        <CaseStudies />
        <ToolchainStrip />
        <ProcessTimeline />
        <EducationCertifications />
        <ContactForm />
      </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
