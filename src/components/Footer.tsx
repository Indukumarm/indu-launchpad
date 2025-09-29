const LINKEDIN_URL = "https://www.linkedin.com/in/indu-mallampali";
const GITHUB_URL = "https://github.com/indu-mallampali";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-muted-foreground">
            <p>© {currentYear} Indukumar Mallampali. All rights reserved.</p>
            <p className="mt-1">Last updated: {lastUpdated}</p>
          </div>

          <nav className="flex items-center gap-6" aria-label="Footer navigation">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
            >
              LinkedIn
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
            >
              GitHub
            </a>
            <button
              onClick={() => {
                alert("Privacy statement placeholder");
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
            >
              Privacy
            </button>
            <button
              onClick={() => {
                alert("Accessibility statement placeholder");
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
            >
              Accessibility
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
};
