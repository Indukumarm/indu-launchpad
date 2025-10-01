import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    degree: "M.S. Computer Science",
    institution: "University of South Alabama"
  },
  {
    degree: "B.Tech Computer Science",
    institution: "Sree Vidyanikethan"
  }
];

const certifications = [
  "Certified Jenkins Engineer"
];

export const EducationCertifications = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Education & Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-semibold">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-shadow duration-200"
                >
                  <p className="font-semibold text-base mb-1">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-semibold">Certifications</h3>
            </div>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-card border border-border hover:shadow-md transition-shadow duration-200"
                >
                  <p className="font-semibold text-base">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
