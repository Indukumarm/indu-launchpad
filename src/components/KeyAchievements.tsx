import { CheckCircle2 } from "lucide-react";

const achievements = [
  {
    title: "1000+ CI/CD Pipelines Optimized",
    description: "Reduced errors by 30%, standardized build/release automation."
  },
  {
    title: "Zero-Downtime Deployments",
    description: "Delivered 3 major Go-Lives with zero post-production issues."
  },
  {
    title: "Stabilized Post-Security-Incident Releases",
    description: "Rebuilt hotfix process, restored reliable production cadence."
  },
  {
    title: "Database Release Automation with Redgate",
    description: "Added traceability, approvals, and audit-ready logging."
  },
  {
    title: "Recognition & Awards",
    description: "3× Key Contributor Award, STAR Award 2021."
  },
  {
    title: "Org-wide Git & SSL Modernization",
    description: "Led migration efforts, documented remediation playbooks."
  }
];

export const KeyAchievements = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Key Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-card border border-border hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-success shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-3 leading-snug">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
