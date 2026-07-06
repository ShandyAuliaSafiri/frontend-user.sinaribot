import axios from 'axios'
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

type Props = {
  params: {
    id: string
  }
}

async function getNews(id: string) {

  try {

    const res =
      await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/news/${id}`,
      )

    return res.data

  } catch {

    return null
  }
}

export default async function NewsDetailPage({
  params,
}: Props) {

  const news =
    await getNews(params.id)

  if (!news) {

    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        News tidak ditemukan 😭
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-gray-50">

      <div className="max-w-4xl mx-auto px-4 py-10">

  <div className="mb-6 space-y-2">

    <div className="text-sm text-gray-500">
      <Link
        href="/"
        className="hover:text-emerald-600 transition-colors"
      >
        Beranda
      </Link>

      <span className="mx-2">/</span>

      <span className="text-gray-700">
        {news.title}
      </span>
    </div>

    <Link
      href="/"
      className="
        inline-flex
        items-center
        gap-2
        text-emerald-600
        hover:text-emerald-700
        font-medium
      "
    >
      <ArrowLeft className="h-4 w-4" />
      Kembali ke Beranda
    </Link>

  </div>

  <div className="bg-white rounded-3xl overflow-hidden shadow"></div>

        <div className="bg-white rounded-3xl overflow-hidden shadow">

          <div className="relative w-full h-[400px]">

            <img
  src={`${process.env.NEXT_PUBLIC_API_URL}/${news.imageUrl.replace(/^\/+/, '')}`}  
  alt={news.title}
  className="w-full h-full object-cover"
/>

          </div>

          <div className="p-8">

            <p className="text-sm text-gray-500 mb-3">
              {new Date(
                news.createdAt,
              ).toLocaleDateString()}
            </p>

            <h1 className="text-4xl font-bold mb-6">
              {news.title}
            </h1>

            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {news.content}
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}