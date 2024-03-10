export const AccessorKey = {
  Title: "title",
  Published: "published",
  Keywords: "keywords",
  Score: "score",
  Review: "reaction",
  MatchedCases: "matchedCases",
  MatchedBlogs: "matchedBlogs",
} as const;

export const options = [
  {value: 10, label: "10"},
  {value: 20, label: "20"},
  {value: 30, label: "30"},
  {value: 40, label: "40"},
  {value: 50, label: "50"},
] as const;
