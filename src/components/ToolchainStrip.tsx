const tools = [
  "Azure DevOps",
  "TFS",
  "Jenkins",
  "GitLab",
  "SVN",
  "Git",
  "Redgate Change Automation",
  "qTest",
  "NeoLoad",
  "Docker",
  "Kubernetes",
  ".NET",
  "Guidewire (Tomcat)",
];

export const ToolchainStrip = () => {
  return (
    <section id="tooling" className="py-16 px-6 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-sm uppercase tracking-widest text-muted-foreground text-center mb-8">
          Toolchain
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {tools.map((tool, index) => (
            <span
              key={index}
              className="px-4 py-2 rounded-full bg-muted text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200 cursor-default"
              title={tool}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
