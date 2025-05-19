import CreatePostFormClient from "./CreatePostFormClient";

export default function CreatePostFormContainer() {
  const categories = [
    { value: "technology", label: "Technology" },
    { value: "ai-machine-learning", label: "AI & Machine Learning" },
    { value: "web-development", label: "Web Development" },
    { value: "data-science", label: "Data Science" },
    { value: "blockchain", label: "Blockchain" },
  ];

  return <CreatePostFormClient categories={categories} />;
}
