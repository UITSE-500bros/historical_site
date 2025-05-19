import Link from "next/link";

export default function ArticleCard({ id, title }: { id: string; title: string }) {
  return (
    <Link href={`/explore/${id}`} className="block">
      <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 border border-gray-200 hover:border-blue-400">
        <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600">
          {title}
        </h2>
        <p className="text-sm text-gray-500 mt-2">Xem chi tiết →</p>
      </div>
    </Link>
  );
}
