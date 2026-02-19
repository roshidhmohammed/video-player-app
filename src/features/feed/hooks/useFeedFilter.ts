import { useMemo } from "react";

// types
import type { CategoryData } from "../../../shared/types";

export const useFeedFilter = (
  data: CategoryData[],
  selectedCategory: string,
) => {
  return useMemo(() => {
    if (selectedCategory === "All") return data;
    return data.filter((c) => c.category.name === selectedCategory);
  }, [data, selectedCategory]);
};
