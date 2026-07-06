"use client"

import {
  useEffect,
  useState,
} from "react"

import {
  newsService,
} from "@/services/news.service"
import type { News } from "@/types/news"

export default function AnnouncementBar() {

  const [announcement, setAnnouncement] =
  useState<News | null>(null)

  useEffect(() => {
    fetchAnnouncement()
  }, [])

  const fetchAnnouncement =
    async () => {

      try {

        const data =
          await newsService.getAll()

        const latest =
          data.find(
            (item) =>
              item.category ===
              "ANNOUNCEMENT",
          )

        setAnnouncement(latest ?? null)

      } catch (error) {
        console.error(error)
      }
    }

  if (!announcement)
    return null

 return (
  <div
    className="
      bg-emerald-600
      text-white
      py-2
      px-4
      text-sm
      font-medium
      text-center
    "
  >
    📢 {announcement.title}
  </div>
)
}