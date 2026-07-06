"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { newsService } from "@/services/news.service"

export default function PromoSection() {
  const [promos, setPromos] = useState<any[]>([])

  useEffect(() => {
    fetchPromos()
  }, [])

  const fetchPromos = async () => {
    try {
      const data = await newsService.getAll()

      setPromos(
        data.filter((item) => item.category === "PROMO")
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold">
            Promo Spesial ✨
          </h2>

          <p className="text-gray-500 mt-2">
            Promo terbaru dari SINARIBOTS
          </p>
        </div>

        {/* PROMO LIST */}
        <div className="grid md:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <Link
              key={promo.id}
              href={`/news/${promo.id}`}
            >
              <div
                className="
                  group
                  rounded-3xl
                  overflow-hidden
                  border
                  bg-white
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-300
                  cursor-pointer
                "
              >
                {promo.imageUrl && (
                  <img
                   src={`${process.env.NEXT_PUBLIC_API_URL}${promo.imageUrl}`}
                    alt={promo.title}
                    className="
                      h-52
                      w-full
                      object-cover
                      group-hover:scale-105
                      transition-transform
                      duration-500
                    "
                  />
                )}

                <div className="p-5">
                  <div
                    className="
                      inline-flex
                      px-3
                      py-1
                      rounded-full
                      bg-yellow-100
                      text-yellow-700
                      text-xs
                      font-semibold
                      mb-3
                    "
                  >
                    PROMO
                  </div>

                  <h3 className="font-bold text-lg">
                    {promo.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {promo.content}
                  </p>

                  <div
                    className="
                      mt-4
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      font-medium
                      text-emerald-600
                      group-hover:text-emerald-700
                    "
                  >
                    Lihat Promo
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}