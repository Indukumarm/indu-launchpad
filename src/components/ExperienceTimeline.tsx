import { Briefcase } from "lucide-react";

const experiences = [
  {
    company: "AF Group",
    role: "Lead DevOps & Release Engineer",
    years: "2019–Present",
    highlights: [
      "Led CI/CD strategy, cloud orchestration, and mentored engineers in DevOps best practices",
      "Orchestrated Docker/Kubernetes deployments on Tomcat",
      "Drove CAB/eCAB readiness, compliance & release notes",
      "Transformed release governance by aligning automation with approval processes"
    ]
  },
  {
    company: "Connectix Corporation",
    role: "DevOps Engineer",
    years: "2017–2019",
    highlights: [
      "Coordinated releases, integrated build/release tools",
      "Migrated from SVN → Git; standardized branching strategies",
      "Automated deployments, optimized CI/CD flows"
    ]
  },
  {
    company: "Civicon Tech",
    role: "Build & Release Engineer",
    years: "2015–2017",
    highlights: [
      "Supported multi-stack application builds/releases",
      "Streamlined workflows, introduced automation into build pipelines"
    ]
  }
];

export const ExperienceTimeline = () => {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Experience</h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 border-l-2 border-border hover:border-accent transition-colors duration-200"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent border-2 border-background" />
              <div className="pb-8">
                <div className="flex items-start gap-3 mb-3">
                  <Briefcase className="w-5 h-5 text-accent shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold">{exp.company}</h3>
                    <p className="text-base text-muted-foreground">{exp.role}</p>
                    <p className="text-sm text-muted-foreground/70 mt-1">{exp.years}</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-8">
                  {exp.highlights.map((highlight, hIndex) => (
                    <li key={hIndex} className="text-sm text-muted-foreground leading-relaxed">
                      • {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
