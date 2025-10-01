import { CheckCircle2 } from "lucide-react";

const achievements = [
  {
    title: "Stabilized post-incident releases (prod-only).",
    description: "Re-established hotfix flow from last-known-good, manual validation gates, rollback playbook; restored predictable cadence."
  },
  {
    title: "Database release automation with Redgate.",
    description: "Built traceable DB promotion on TFS/Azure DevOps with approvals, artifact provenance, and audit-ready logs."
  },
  {
    title: "Org-wide Git SSL fix.",
    description: "Led incident to resolve SSL verification failures; documented remediation and prevention runbook."
  },
  {
    title: "Guidewire CI/CD on Tomcat.",
    description: "Standardized build/package/deploy steps; integrated checks and environment-safe configs for repeatable releases."
  },
  {
    title: "Migration & governance uplift.",
    description: "Moved teams toward modern Git/Azure DevOps practices; improved review gates and compliance evidence."
  },
  {
    title: "Performance & quality guardrails.",
    description: "Introduced CI quality gates (SonarQube), branch protections, and lightweight release notes templates."
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
