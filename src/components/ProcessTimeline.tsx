import { GitBranch, Shield, FileText, RotateCcw } from "lucide-react";

const steps = [
  {
    icon: GitBranch,
    title: "Branching Strategy",
    description: "Main + hotfix branches from last-known-good.",
  },
  {
    icon: Shield,
    title: "Controls & Gates",
    description: "Manual validation → approvals → release notes.",
  },
  {
    icon: FileText,
    title: "Traceability",
    description: "Artifact hashes, change logs, runbooks.",
  },
  {
    icon: RotateCcw,
    title: "Recovery",
    description: "Tested rollbacks, hotfix cadence.",
  },
];

export const ProcessTimeline = () => {
  return (
    <section id="process" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Process</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Four pillars of reliable release engineering.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
