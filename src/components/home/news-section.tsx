"use client"

import {
  useEffect,
  useState,
} from "react"

import Link from "next/link"

import {
  CalendarDays,
  ArrowRight,
} from "lucide-react"

import {
  motion,
} from "framer-motion"

import {
  newsService,
} from "@/services/news.service"

import {
  Button,
} from "@/components/ui/button"

export default function NewsSection() {

  const [news,
    setNews] =
    useState<any[]>([])

  const [loading,
    setLoading] =
    useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews =
    async () => {

      try {

        const data =
          await newsService.getAll()

        setNews(
  data
    .filter((item) =>
      ["NEWS", "ARTICLE", "ANNOUNCEMENT"].includes(
        item.category,
      ),
    )
    .slice(0, 3),
)

      } catch (error) {

        console.error(error)

      } finally {

        setLoading(false)
      }
    }

  return (

    <section
      className="
        px-6
        lg:px-20
        py-20
        bg-white
      "
    >

      {/* HEADER */}
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-end
          lg:justify-between
          gap-6
          mb-14
        "
      >

        <div className="space-y-4">

          <div
            className="
              inline-flex
              items-center
              gap-2
              bg-emerald-100
              text-emerald-700
              px-4
              py-2
              rounded-full
              text-sm
              font-medium
            "
          >
            Berita 
          </div>

          <h2
            className="
              text-4xl
              font-black
              text-gray-900
            "
          >
            Berita Terbaru
          </h2>

          <p
            className="
              text-gray-600
              max-w-2xl
            "
          >
            Informasi terbaru, artikel, dan pengumuman mengenai layanan SINARIBOTS Laundry.
          </p>

        </div>

     
  

      </div>

      {/* LOADING */}
      {loading ? (

        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >

          {[1, 2, 3].map(
            (item) => (

              <div
                key={item}
                className="
                  h-[350px]
                  rounded-3xl
                  bg-gray-100
                  animate-pulse
                "
              />
            ),
          )}

        </div>

      ) : (

        <div
          className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >

          {news.map(
            (
              item,
              index,
            ) => (

              <Link
                href={`/news/${item.id}`}
                key={item.id}
              >

                <motion.div

                  initial={{
                    opacity: 0,
                    y: 30,
                  }}

                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    duration: 0.4,
                    delay:
                      index * 0.1,
                  }}

                  viewport={{
                    once: true,
                  }}

                  className="
                    group
                    bg-white
                    rounded-3xl
                    overflow-hidden
                    border
                    shadow-sm
                    hover:shadow-2xl
                    transition-all
                    cursor-pointer
                  "
                >

                  {/* IMAGE */}
                  <div
                    className="
                      relative
                      overflow-hidden
                      h-56
                    "
                  >

                    <img
                      src={
                        item.imageUrl
                          ? `http://localhost:3000${item.imageUrl}`
                          : "https://placehold.co/600x400"
                      }

                      alt={item.title}

                      className="
                        w-full
                        h-full
                        object-cover
                        group-hover:scale-105
                        transition-transform
                        duration-500
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/50
                        to-transparent
                      "
                    />

                  </div>

                  {/* CONTENT */}
                  <div className="p-6 space-y-4">

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-gray-500
                      "
                    >

                      <CalendarDays className="h-4 w-4" />

                      {new Date(
                        item.createdAt,
                      ).toLocaleDateString(
                        "id-ID",
                      )}

                    </div>

                    <h3
                      className="
                        text-xl
                        font-bold
                        text-gray-900
                        line-clamp-2
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        text-sm
                        text-gray-600
                        line-clamp-3
                        leading-relaxed
                      "
                    >
                      {item.content}
                    </p>

                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        text-emerald-600
                        group-hover:text-emerald-700
                        font-medium
                        text-sm
                      "
                    >

                      Baca Selengkapnya

                      <ArrowRight className="h-4 w-4" />

                    </div>

                  </div>

                </motion.div>

              </Link>
            ),
          )}

        </div>
      )}

    </section>
  )
}