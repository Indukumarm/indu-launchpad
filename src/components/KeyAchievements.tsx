import { CheckCircle2 } from "lucide-react";

const achievements = [
  {
    title: "Scaled DevOps Culture",
    description: "Mentored 10+ engineers, introduced Agile/DevOps practices org-wide."
  },
  {
    title: "Enterprise Transformation",
    description: "Led migration from SVN → Git and on-prem → cloud-native CI/CD."
  },
  {
    title: "Modernized Release Governance",
    description: "Aligned CAB/eCAB with DevOps automation for faster approvals."
  },
  {
    title: "1000+ Pipelines Optimized",
    description: "Reduced errors by 30% through CI/CD standardization."
  },
  {
    title: "Zero-Downtime Deployments",
    description: "Delivered 3 major Go-Lives with no post-production issues."
  },
  {
    title: "Resilient Release Flow",
    description: "Stabilized post-incident releases with hotfix strategy and rollback plan."
  },
  {
    title: "Database Release Automation",
    description: "Redgate integration with approvals & audit logging."
  },
  {
    title: "Recognition & Awards",
    description: "3× Key Contributor Award, STAR Award 2021."
  },
  {
    title: "Enterprise Modernization",
    description: "Led Git migration and SSL remediation across org."
  }
];

export const KeyAchievements = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Leadership & Key Achievements</h2>
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
