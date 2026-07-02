import api from "@/lib/api"

import {
  News,
} from "@/types/news"

export const newsService = {

  async getAll():
    Promise<News[]> {

    const res =
      await api.get(
        "/news",
      )

    return res.data
  },

  async getById(
    id: number,
  ): Promise<News> {

    const res =
      await api.get(
        `/news/${id}`,
      )

    return res.data
  },
}