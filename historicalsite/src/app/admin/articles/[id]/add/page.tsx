"use client";
import React, { useState } from "react";
// Nếu bạn chưa cài uuid, hãy chạy: npm install uuid
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

// Kiểu dữ liệu cho nội dung bài viết
interface ArticleContent {
  contentId: string;
  content: string;
}

export default function AddEventArticlePage() {
  const [articleName, setArticleName] = useState("");
  const [articleContentList, setArticleContentList] = useState<
    ArticleContent[]
  >([{ contentId: uuidv4(), content: "" }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const url = "http://localhost:8888/articles"

  // Xử lý thay đổi nội dung
  const handleContentChange = (index: number, value: string) => {
    setArticleContentList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, content: value } : item))
    );
  };

  // Thêm nội dung mới
  const handleAddContent = () => {
    setArticleContentList((prev) => [
      ...prev,
      { contentId: uuidv4(), content: "" },
    ]);
  };

  // Xóa nội dung
  const handleRemoveContent = (index: number) => {
    setArticleContentList((prev) => prev.filter((_, i) => i !== index));
  };

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!articleName.trim()) {
      setMessage("Event name is required.");
      return;
    }
    if (articleContentList.some((c) => !c.content.trim())) {
      setMessage("Content cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleType: "EVENT",
          articleName,
          articleContentList,
        }),
      });
      if (!res.ok) throw new Error("Failed to add article");
      setMessage("Article added successfully!");
      // Chuyển hướng về trang danh sách articles sau 1s
      setTimeout(() => {
        router.push("/admin/articles");
      }, 1000);
    } catch (err: any) {
      setMessage(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Article Name</label>
          <input
            className="border rounded px-3 py-2 w-full"
            value={articleName}
            onChange={(e) => setArticleName(e.target.value)}
            placeholder="Enter article name"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Article Content</label>
          {articleContentList.map((item, idx) => (
            <div key={item.contentId} className="flex items-center mb-2 gap-2">
              <input
                className="border rounded px-3 py-2 flex-1"
                value={item.content}
                onChange={(e) => handleContentChange(idx, e.target.value)}
                placeholder={`Content #${idx + 1}`}
                disabled={loading}
              />
              {articleContentList.length > 1 && (
                <button
                  type="button"
                  className="text-red-500 px-2"
                  onClick={() => handleRemoveContent(idx)}
                  disabled={loading}
                  title="Remove content"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="mt-2 px-3 py-1 bg-blue-100 rounded text-blue-700"
            onClick={handleAddContent}
            disabled={loading}
          >
            + Add content
          </button>
        </div>
        {message && (
          <div
            className={`text-sm ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded font-semibold"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Event"}
        </button>
      </form>
    </div>
  );
}
