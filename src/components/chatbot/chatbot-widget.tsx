'use client'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  MessageCircle,
  Send,
  X,
  Sparkles,
  Trash2,
} from 'lucide-react'

import {
  motion,
  AnimatePresence,
} from 'framer-motion'


import {
  Button,
} from '@/components/ui/button'

import {
  Input,
} from '@/components/ui/input'
import axios from 'axios'

type Message = {
  sender: 'user' | 'bot'
  text: string
  time?: string
}

export default function ChatbotWidget() {

  const [open, setOpen] =
    useState(false)

  const [message, setMessage] =
    useState('')
const [customerName, setCustomerName] = useState('')
const [phoneNumber, setPhoneNumber] = useState('')


const [customerReady, setCustomerReady] =
  useState(false)
  const [loading, setLoading] =
    useState(false)

  const [messages, setMessages] =
    useState<Message[]>([])

  const bottomRef =
    useRef<HTMLDivElement>(
      null,
    )

  // =============================
  // QUICK ACTIONS
  // =============================
  const quickActions = [
    'Harga cuci lipat Pancoran',
    'Jam buka berapa?',
    'Lokasi cabang lainnya',
    'Layanan express',
  ]

  // =============================
  // LOAD HISTORY
  // =============================
  useEffect(() => {
const savedName =
  sessionStorage.getItem('customerName')

const savedPhone =
  sessionStorage.getItem('phoneNumber')

if (
  savedName &&
  savedPhone
) {
  setCustomerName(savedName)
  setPhoneNumber(savedPhone)
  setCustomerReady(true)
}
    const saved =
      localStorage.getItem(
        'sinari_chat_widget',
      )

    if (saved) {

      setMessages(
        JSON.parse(saved),
      )

    } else {

      setMessages([
        {
          sender: 'bot',
          text:
            'Hai kawan Sinari 💚✨\nAda yang bisa kami bantu hari ini?',
          time:
            new Date().toLocaleTimeString(
              [],
              {
                hour: '2-digit',
                minute:
                  '2-digit',
              },
            ),
        },
      ])
    }

  }, [])

  // =============================
  // SAVE HISTORY
  // =============================
  useEffect(() => {

    localStorage.setItem(
      'sinari_chat_widget',
      JSON.stringify(messages),
    )

  }, [messages])

  // =============================
  // AUTO SCROLL
  // =============================
  useEffect(() => {

    bottomRef.current?.scrollIntoView(
      {
        behavior: 'smooth',
      },
    )

  }, [messages, loading])

  // =============================
  // CLEAR CHAT
  // =============================
  const clearChat = () => {

  localStorage.removeItem('sinari_chat_widget')

  // Hapus identitas pelanggan
  sessionStorage.removeItem('customerName')
  sessionStorage.removeItem('phoneNumber')

  // Reset state
  setCustomerName('')
  setPhoneNumber('')
  setCustomerReady(false)

  setMessages([
    {
      sender: 'bot',
      text: 'Chat berhasil dibersihkan ✨',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    },
  ])
}

  // =============================
  // SEND MESSAGE
  // =============================
  const handleSendMessage = async (customMessage?: string) => {
    const messageToSend = customMessage || message
   if (!customerReady) {
  alert(
    'Silakan isi nama dan nomor telepon terlebih dahulu.',
  )
  return
}
    if (!messageToSend.trim()) return

    const userMsg: Message = {
      sender: 'user',
      text: messageToSend,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!customMessage) setMessage('')
    setLoading(true)

    try {
     const backendUrl = process.env.NEXT_PUBLIC_API_URL!;

    const res = await axios.post(
  `${backendUrl}/chatbot/ask`,
  {
    customerName,
    phoneNumber,
    question: messageToSend,
  },
  {
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' },
  }
)

      const botAnswer = res.data?.data?.answer || res.data?.answer || 'Maaf, tidak ada response'

      const botMsg: Message = {
        sender: 'bot',
        text: botAnswer,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }

      setMessages((prev) => [...prev, botMsg])
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
 } catch (error: unknown) {
  console.error("CHATBOT ERROR:", error)

  let message = "❌ Network error. Coba lagi nanti ya."

  if (axios.isAxiosError(error)) {
    message =
      error.response?.data?.message ??
      error.message
  }

  const botMsg: Message = {
    sender: "bot",
    text: message,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }

  setMessages((prev) => [...prev, botMsg])
} finally {
  setLoading(false)
} }

  return (
    <>

      {/* FLOAT BUTTON - RESPONSIF */}
      <motion.button
        id="chatbot-trigger"
        whileTap={{
          scale: 0.9,
        }}
        whileHover={{
          scale: 1.08,
        }}
        onClick={() =>
          setOpen(!open)
        }
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white p-3 sm:p-4 rounded-full shadow-[0_10px_40px_rgba(16,185,129,0.4)] transition-all"
      >

        {open ? (
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        ) : (
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
        )}

      </motion.button>

      {/* CHATBOX - RESPONSIVE DAN FLEKSIBEL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed inset-0 sm:inset-auto bottom-0 right-0 sm:bottom-24 sm:right-6 z-50 w-full sm:w-[380px] h-screen sm:h-[650px] max-h-screen sm:max-h-[85vh] bg-white rounded-none sm:rounded-2xl lg:rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:border overflow-hidden flex flex-col"
          >
            {/* HEADER */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white p-3 sm:p-5 shrink-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-2xl bg-white flex items-center justify-center border border-white/20 overflow-hidden shrink-0">
                    <img src="/images/logo.sinari.jpeg" alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-bold text-sm sm:text-lg">SINARIBOTS</h2>
                    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-emerald-100">
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-300 animate-pulse" />
                      <span className="truncate">Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="hover:bg-white/10 p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition shrink-0 sm:hidden"
                >
                  <X className="h-5 w-5" />
                </button>
                <button
                  onClick={clearChat}
                  className="hover:bg-white/10 p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition shrink-0 hidden sm:block"
                >
                  <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
              <div className="mt-2 sm:mt-4 bg-white/10 rounded-lg sm:rounded-2xl p-2 sm:p-3 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-emerald-50">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                  <span className="truncate">AI Assistant aktif 24 jam</span>
                </div>
              </div>
            </div>

            {/* CHAT AREA - SCROLLABLE */}
            <div 
              className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-5 relative min-h-0"
              style={{
                background: `linear-gradient(135deg, #f0fdf4 0%, #f0fdf4 50%, #ecfdf5 100%)`
              }}
            >
              {/* Subtle decorative pattern */}
              <div
                className="absolute inset-0 z-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)
                  `,
                }}
              />

              <div className="relative z-10 flex flex-col space-y-3 sm:space-y-5">
                {!customerReady && (
  <div className="bg-white p-4 rounded-xl border shadow-sm">
   <p className="text-sm font-medium text-gray-800">
  Sebelum memulai percakapan
</p>

<p className="text-xs text-gray-500 mt-1 mb-4 leading-5">
  Silakan isi nama dan nomor telepon terlebih dahulu agar kami dapat memberikan pelayanan yang lebih personal.
</p>

   <Input
  placeholder="Masukkan nama lengkap"
  value={customerName}
  onChange={(e) => setCustomerName(e.target.value)}
/>

<Input
  placeholder="Masukkan nomor telepon"
  value={phoneNumber}
  onChange={(e) => setPhoneNumber(e.target.value)}
/>

    <Button
  className="w-full mt-3"
  onClick={() => {

    const phone = phoneNumber.trim()

    if (!customerName.trim()) {
      alert('Silakan isi nama terlebih dahulu.')
      return
    }

    if (!/^\d+$/.test(phone)) {
      alert('Nomor telepon hanya boleh berisi angka.')
      return
    }

    if (phone.length < 10) {
      alert('Nomor telepon minimal 10 digit.')
      return
    }

    sessionStorage.setItem(
      'customerName',
      customerName,
    )

    sessionStorage.setItem(
      'phoneNumber',
      phone,
    )

    setCustomerReady(true)

  }}
>
  Mulai Chat
</Button>
  </div>
)}
                {messages.length === 0 && (
                  <div className="flex justify-start">
                    <div className="max-w-[82%] px-3 sm:px-4 py-2 sm:py-3 rounded-2xl sm:rounded-3xl text-xs sm:text-sm leading-relaxed shadow-sm whitespace-pre-line bg-white border border-emerald-100 text-gray-700 rounded-bl-md">
                      Hai kawan Sinari 💚✨
                      Ada yang bisa kami bantu?
                      <div className="text-[8px] sm:text-[10px] mt-1 sm:mt-2 text-emerald-500 font-medium">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                )}

                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[82%] px-3 sm:px-4 py-2 sm:py-3 rounded-2xl sm:rounded-3xl text-xs sm:text-sm leading-relaxed shadow-md whitespace-pre-wrap break-words transition-all ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-br-md shadow-emerald-200 hover:shadow-lg'
                          : 'bg-white border border-emerald-100 text-gray-800 rounded-bl-md font-medium hover:border-emerald-200'
                      }`}
                    >
                      {msg.text}
                      <div className={`text-[8px] sm:text-[10px] mt-1 sm:mt-2 font-medium ${msg.sender === 'user' ? 'text-emerald-100' : 'text-emerald-500'}`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-emerald-100 rounded-2xl sm:rounded-3xl rounded-bl-md px-3 sm:px-4 py-3 sm:py-4 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-xs sm:text-sm text-emerald-600 font-medium ml-1">Sedang mengetik...</span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>
            </div>

            {/* QUICK ACTIONS - SCROLLABLE */}
            <div className="px-3 sm:px-4 pt-2 sm:pt-3 overflow-x-auto scrollbar-hide bg-white border-t border-gray-50 shrink-0">
              <div className="flex gap-1 sm:gap-2 w-max pb-1">
                {quickActions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(item)}
                    className="text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border bg-gray-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all whitespace-nowrap"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* INPUT - STICKY */}
            <div className="p-2 sm:p-4 border-t bg-white flex items-center gap-2 sm:gap-3 shrink-0">
              <Input
                placeholder="Tulis pesan..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="rounded-xl sm:rounded-2xl h-10 sm:h-12 text-xs sm:text-sm flex-1"
              />

              <Button
                onClick={() => handleSendMessage()}
                disabled={loading}
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shrink-0"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}