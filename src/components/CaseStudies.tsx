import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CaseStudy {
  title: string;
  summary: string;
  context: string;
  role: string;
  approach: string;
  outcome: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: "After a security event, shipping from one environment—safely.",
    summary: "Redesigned release workflow post-incident with production-only deployments.",
    context:
      "Following a security incident, the organization mandated all deployments flow through a single production environment, eliminating traditional staging/pre-prod.",
    role:
      "Lead Release Engineer responsible for redesigning the entire release workflow to maintain auditability and safety.",
    approach:
      "Implemented branch-based releases with strict approval gates, manual validation checkpoints, and comprehensive release notes. Created detailed runbooks and rollback procedures.",
    outcome:
      "Achieved zero-downtime deployments with full audit trails. Stakeholders gained confidence in the new process, and compliance requirements were met.",
  },
  {
    title: "Database releases with Redgate + TFS/Azure DevOps.",
    summary: "Automated database deployments with change tracking and rollback capabilities.",
    context:
      "Manual database changes were error-prone, lacked version control, and created bottlenecks in the release pipeline.",
    role:
      "Designed and implemented the database CI/CD pipeline using Redgate Change Automation.",
    approach:
      "Integrated Redgate with TFS/Azure DevOps for automated schema comparisons, migrations, and rollback scripts. Established peer review process for all DB changes.",
    outcome:
      "Reduced database deployment time by 70%. Eliminated manual errors and created full change history with artifact traceability.",
  },
  {
    title: "Human services programs (Medicaid/Childcare/SNAP/TANF/FNS).",
    summary: "Managed complex releases for critical public sector programs.",
    context:
      "Multi-program platform serving vulnerable populations required zero-downtime deployments with strict compliance requirements.",
    role:
      "Release Engineering Lead coordinating across multiple program teams and stakeholders.",
    approach:
      "Established program-specific release trains with coordinated deployment windows. Implemented feature flags for gradual rollouts and emergency shutoffs.",
    outcome:
      "Maintained 99.9% uptime for critical services. Enabled faster feature delivery while meeting NIST and state compliance requirements.",
  },
  {
    title: "When Git clones broke across the org (SSL failures).",
    summary: "Resolved organization-wide Git access issues under time pressure.",
    context:
      "SSL certificate issues caused Git clones to fail across the entire engineering organization, halting all development work.",
    role:
      "Incident responder and fix coordinator.",
    approach:
      "Quickly diagnosed root cause (expired SSL certificates on Git servers). Coordinated with infrastructure team for certificate renewal. Created temporary workarounds and communicated status to all teams.",
    outcome:
      "Restored Git access within 4 hours. Documented incident response and created monitoring alerts to prevent future occurrences.",
  },
];

export const CaseStudies = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  return (
    <section id="work" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Selected Work</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Real challenges, practical solutions, measurable outcomes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((study, index) => (
            <button
              key={index}
              onClick={() => setSelectedCase(study)}
              className="text-left p-8 rounded-2xl border border-border bg-card hover:shadow-lg hover:border-accent/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              <h3 className="text-xl font-semibold mb-3">{study.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{study.summary}</p>
              <span className="text-accent text-sm font-medium mt-4 inline-block">
                Read case study →
              </span>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold pr-8">
              {selectedCase?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedCase && (
            <div className="space-y-6 pt-4">
              <div>
                <h4 className="font-semibold text-lg mb-2">Context</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedCase.context}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Role</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedCase.role}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Approach</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedCase.approach}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-lg mb-2">Outcome</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedCase.outcome}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
