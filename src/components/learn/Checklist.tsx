import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface ChecklistProps {
  items: string[];
  topicSlug: string;
}

export const Checklist = ({ items, topicSlug }: ChecklistProps) => {
  const storageKey = `checklist-${topicSlug}`;
  const [checkedItems, setCheckedItems] = useState<Set<number>>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(checkedItems)));
  }, [checkedItems, storageKey]);

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-3 py-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-3">
          <Checkbox
            id={`${topicSlug}-${index}`}
            checked={checkedItems.has(index)}
            onCheckedChange={() => toggleItem(index)}
            aria-label={item}
          />
          <label
            htmlFor={`${topicSlug}-${index}`}
            className={`text-sm cursor-pointer ${
              checkedItems.has(index) ? "line-through text-muted-foreground" : ""
            }`}
          >
            {item}
          </label>
        </div>
      ))}
    </div>
  );
};
