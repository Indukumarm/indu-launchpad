const toolGroups = [
  {
    category: "CI/CD & SCM",
    tools: ["Jenkins", "Azure DevOps", "GitHub Actions", "GitHub Workflows", "GitHub Runners", "Git", "SVN"]
  },
  {
    category: "Cloud & Orchestration",
    tools: ["Azure", "AWS toolset", "Docker", "Kubernetes"]
  },
  {
    category: "Quality & Governance",
    tools: ["SonarQube", "CI gates", "Audit logs", "Compliance frameworks"]
  },
  {
    category: "Release & Governance",
    tools: ["Release Management", "Change Management", "DevOps Leadership"]
  },
  {
    category: "Monitoring & Analytics",
    tools: ["Grafana", "Splunk"]
  },
  {
    category: "Languages & Stacks",
    tools: ["Python", ".NET", "Groovy", "SQL", "SSIS/SSRS"]
  },
  {
    category: "Infrastructure",
    tools: ["Ansible", "IaC (Infrastructure as Code)", "Linux", "Windows"]
  },
  {
    category: "ITSM & Collaboration",
    tools: ["Jira", "Confluence", "Cherwell", "ServiceNow"]
  },
  {
    category: "Domain Apps",
    tools: ["Guidewire (Tomcat)", "Insurance (Workers' Comp)", "Medicaid", "Child Care", "SNAP/FNS"]
  }
];

export const ToolchainStrip = () => {
  return (
    <section id="tooling" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Toolchain & Proficiency</h2>
        <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
          I bring a full-stack DevOps toolkit, enabling both <strong>technical delivery</strong> and <strong>strategic leadership</strong>.
        </p>
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
