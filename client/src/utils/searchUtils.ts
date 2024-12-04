export const formatCategoryName = (category: string): string => {
    // Replace '-' with ' ' and capitalize the first letter
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
  };

export const formatTags = (tags: string[]): string => {
    return tags.join('  -  ');
  };
  