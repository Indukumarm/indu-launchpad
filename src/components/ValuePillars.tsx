import { Shield, Zap, Heart, FileCheck } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Release Engineering, done right.",
    description:
      "Auditable trails, approvals, and predictable outcomes—even with production-only constraints.",
  },
  {
    icon: Zap,
    title: "CI/CD at scale.",
    description:
      "Pipelines on Azure DevOps/TFS/Jenkins/GitLab that cut lead time without risking quality.",
  },
  {
    icon: Heart,
    title: "Resilience under pressure.",
    description:
      "From org-wide SSL issues to post-incident hotfix trains—I stabilize and document.",
  },
  {
    icon: FileCheck,
    title: "Governed & compliant.",
    description:
      "Delivery aligned to NIST/ISO expectations with stakeholder-friendly documentation.",
  },
];

export const ValuePillars = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl border border-border hover:shadow-lg hover:border-accent/50 transition-all duration-300 group"
            >
              <pillar.icon className="h-10 w-10 text-accent mb-4 group-hover:scale-110 transition-transform duration-200" />
              <h3 className="text-xl font-semibold mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
