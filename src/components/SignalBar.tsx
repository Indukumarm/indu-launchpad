const signals = [
  { label: "9+ Years in Release Engineering" },
  { label: "Primary Domain: Insurance (Workers' Compensation, Guidewire apps)" },
  { label: "Also Experienced: Medicaid, Child Care, SNAP/FNS" },
  { label: "Toolchains: Azure DevOps, TFS, Jenkins, GitLab, SVN, Redgate" },
  { label: "Calm Under Pressure: Incident & Hotfix Flow" },
];

export const SignalBar = () => {
  return (
    <section className="py-12 px-6 border-y border-border bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {signals.map((signal, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-card hover:shadow-md transition-shadow duration-200"
            >
              <p className="text-sm font-medium leading-relaxed">{signal.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
