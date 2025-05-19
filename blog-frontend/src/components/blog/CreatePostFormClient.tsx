"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import FileUpload from "../forms/FileUpload";

interface Category {
  value: string;
  label: string;
}

interface CreatePostFormClientProps {
  categories: Category[];
}

interface CreatePostData {
  title: string;
  content: string;
  slug: string;
  author: string;
  publishedDate: string;
  coverImage?: number;
}

export default function CreatePostFormClient({
  categories,
}: CreatePostFormClientProps) {
  const [formData, setFormData] = useState<CreatePostData>({
    title: "",
    content: "",
    slug: "",
    author: "",
    publishedDate: new Date().toISOString().split("T")[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]); 
  const [category, setCategory] = useState<string>(""); 
  const [coverImageId, setCoverImageId] = useState<number | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [coverImageName, setCoverImageName] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "category") {
      setCategory(value);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({
        ...prev,
        slug,
      }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prev) => [...prev, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleFileUpload = (
    fileId: number,
    fileUrl: string,
    fileName: string
  ) => {
    setCoverImageId(fileId);
    setCoverImageUrl(fileUrl);
    setCoverImageName(fileName);
    setUploadError(null);
  };

  const handleFileError = (errorMessage: string) => {
    setUploadError(errorMessage);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!coverImageId) {
        throw new Error("Cover image is required");
      }

      if (!formData.publishedDate) {
        throw new Error("Published date is required");
      }
      const postData = {
        title: formData.title,
        content: formData.content,
        slug: formData.slug,
        author: formData.author,
        publishedDate: formData.publishedDate,
        coverImage: coverImageId,
      };

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: postData }),
      });

      const responseText = await response.text();

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse response:", e);
        throw new Error("Invalid server response");
      }

      if (!response.ok) {
        throw new Error(result.error || "Failed to create post");
      }

      setSuccess(true);

      setTimeout(() => {
        setFormData({
          title: "",
          content: "",
          slug: "",
          author: "",
          publishedDate: new Date().toISOString().split("T")[0],
        });
        setTags([]);
        setCategory("");
        setCoverImageId(null);
        setCoverImageUrl(null);
        setCoverImageName(null);
      }, 3000);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-green-600 text-5xl mb-4" aria-hidden="true">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Post Created Successfully!
        </h2>
        <p className="text-gray-600 mb-6">Your blog post has been published.</p>
        <div className="flex justify-center space-x-4">
          <Link
            href={`/blog/${formData.slug}`}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Post
          </Link>
          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Create Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white rounded-lg p-6 shadow-sm"
      aria-label="Create blog post form"
    >
      {error && (
        <div
          className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter post title"
            disabled={isSubmitting}
            aria-required="true"
          />
        </div>

        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            URL Slug *
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="url-slug"
            disabled={isSubmitting}
            aria-required="true"
          />
          <p className="text-xs text-gray-500 mt-1">
            Only lowercase letters, numbers, and hyphens allowed
          </p>
        </div>
      </div>

      <div>
        <label
          htmlFor="publishedDate"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Published Date *
        </label>
        <input
          type="date"
          id="publishedDate"
          name="publishedDate"
          value={formData.publishedDate}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          disabled={isSubmitting}
          aria-required="true"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Content *
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={12}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Write your post content here..."
          disabled={isSubmitting}
          aria-required="true"
        />
      </div>

      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Author *
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Author name"
          disabled={isSubmitting}
          aria-required="true"
        />
        <p className="text-xs text-gray-500 mt-1">Maximum 50 characters</p>
      </div>

      {/* Keep UI elements for category and tags, but mark them as experimental/not functional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category (Experimental)
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={isSubmitting}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Category feature is coming soon
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (Experimental)
          </label>
          <div
            className="flex flex-wrap gap-2 mb-3"
            role="list"
            aria-label="Selected tags"
          >
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                  aria-label={`Remove tag ${tag}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter a tag"
              disabled={isSubmitting}
              aria-label="New tag"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={isSubmitting}
              aria-label="Add tag"
            >
              Add
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Tags feature is coming soon
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cover Image *
        </label>
        {uploadError && (
          <div
            className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm"
            role="alert"
          >
            {uploadError}
          </div>
        )}

        <div className="mb-4">
          <FileUpload
            onFileUpload={handleFileUpload}
            onError={handleFileError}
            acceptedFileTypes="image/*"
            maxSizeMB={5}
            buttonText="Choose Cover Image"
          />
        </div>

        {coverImageUrl && (
          <div className="mt-4 border rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Image Preview
            </p>
            <div className="relative h-48 overflow-hidden rounded-lg">
              <Image
                src={coverImageUrl}
                alt={coverImageName || "Cover preview"}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
            {coverImageName && (
              <p className="text-xs text-gray-500 mt-2 truncate">
                {coverImageName}
              </p>
            )}
          </div>
        )}
        <p className="text-xs text-gray-500 mt-1">Required for post creation</p>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={isSubmitting || !coverImageId}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Creating...</span>
            </>
          ) : (
            "Publish Post"
          )}
        </button>
      </div>
    </form>
  );
}
