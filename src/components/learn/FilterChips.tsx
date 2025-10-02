import { Badge } from "@/components/ui/badge";

interface FilterChipsProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const FilterChips = ({ label, options, selected, onChange }: FilterChipsProps) => {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((o) => o !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Badge
            key={option}
            variant={selected.includes(option) ? "default" : "outline"}
            className="cursor-pointer transition-all hover:scale-105"
            onClick={() => toggleOption(option)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleOption(option);
              }
            }}
            aria-pressed={selected.includes(option)}
          >
            {option}
          </Badge>
        ))}
      </div>
    </div>
  );
};
