import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const SortSelect = ({ value, onChange }: SortSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">Sort by</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]" aria-label="Sort topics">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="relevance">Relevance</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="shortest">Shortest Read</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
