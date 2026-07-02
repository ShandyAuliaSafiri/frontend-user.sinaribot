import api from '@/lib/api'

export const chatService = {
  sendMessage: async (
    message: string,
  ) => {
    const res =
      await api.post(
        '/chatbot',
        {
          question: message,
        },
      )

    return res.data
  },
}