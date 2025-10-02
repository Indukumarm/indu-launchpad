import { CheckCircle2, Rocket, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-bold text-4xl text-primary">
      {count}{suffix}
    </span>
  );
};

const getAchievementIcon = (title: string) => {
  if (title.includes("Zero-Downtime") || title.includes("Go-Lives")) {
    return Rocket;
  }
  if (title.includes("Leadership") || title.includes("Culture")) {
    return Users;
  }
  if (title.includes("Optimized") || title.includes("Reduced")) {
    return Zap;
  }
  return CheckCircle2;
};

export const KeyAchievements = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Leadership & Key Achievements
        </motion.h2>

        {/* Animated Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <AnimatedCounter value={9} suffix="+" />
            <p className="text-sm text-muted-foreground mt-2">Years Experience</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <AnimatedCounter value={1000} suffix="+" />
            <p className="text-sm text-muted-foreground mt-2">Pipelines Optimized</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-card border border-border">
            <AnimatedCounter value={3} suffix="×" />
            <p className="text-sm text-muted-foreground mt-2">Key Awards</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = getAchievementIcon(achievement.title);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                className="p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 + 0.2 }}
                  >
                    <Icon className="w-6 h-6 text-primary shrink-0 mt-1" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 leading-snug">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
