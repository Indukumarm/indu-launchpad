const toolGroups = [
  {
    category: "CI/CD & SCM",
    tools: ["Jenkins", "Azure DevOps", "GitHub Actions", "GitHub Workflows", "GitHub Runners", "Git", "SVN"]
  },
  {
    category: "Cloud & Orchestration",
    tools: ["Azure", "AWS", "Docker", "Kubernetes"]
  },
  {
    category: "Quality & Governance",
    tools: ["SonarQube", "CI checks", "Audit trails"]
  },
  {
    category: "Platforms & OS",
    tools: ["Linux", "Windows"]
  },
  {
    category: "Languages & Stacks",
    tools: ["Python", ".NET"]
  },
  {
    category: "Apps & Domain",
    tools: ["Guidewire (Tomcat)", "Insurance (Workers' Comp)", "Medicaid/Child Care/SNAP/FNS"]
  }
];

export const ToolchainStrip = () => {
  return (
    <section id="tooling" className="py-16 px-6 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-sm uppercase tracking-widest text-muted-foreground text-center mb-8">
          Toolchain & Proficiency
        </h3>
        <div className="space-y-8">
          {toolGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground/70 text-center mb-4">
                {group.category}
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {group.tools.map((tool, toolIndex) => (
                  <span
                    key={toolIndex}
                    className="px-4 py-2 rounded-full bg-muted text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200 cursor-default"
                    title={tool}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
