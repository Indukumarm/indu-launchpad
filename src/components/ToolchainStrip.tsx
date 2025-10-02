import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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

const ToolCard = ({ tool, index }: { tool: string; index: number }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      whileHover={{ 
        scale: 1.05,
        y: -2,
        transition: { duration: 0.2 }
      }}
      className="px-4 py-2 rounded-full bg-muted text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200 cursor-default shadow-sm hover:shadow-md"
      title={tool}
    >
      {tool}
    </motion.span>
  );
};

export const ToolchainStrip = () => {
  return (
    <section id="tooling" className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Toolchain & Proficiency
        </motion.h2>
        <motion.p 
          className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          I bring a full-stack DevOps toolkit, enabling both <strong>technical delivery</strong> and <strong>strategic leadership</strong>.
        </motion.p>
        <div className="space-y-8">
          {toolGroups.map((group, groupIndex) => (
            <motion.div 
              key={groupIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
            >
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground/70 text-center mb-4">
                {group.category}
              </h4>
              <div className="flex flex-wrap justify-center gap-3">
                {group.tools.map((tool, toolIndex) => (
                  <ToolCard key={toolIndex} tool={tool} index={toolIndex} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
