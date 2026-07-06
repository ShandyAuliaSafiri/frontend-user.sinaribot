"use client"

import {
  Sparkles,
  MessageCircle,
  Shirt,
  Truck,
  Clock3,
  ArrowRight,
} from "lucide-react"

import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

import ChatbotWidget from "@/components/chatbot/chatbot-widget"


import PromoSection
from "@/components/home/promo-section"

import NewsSection
from "@/components/home/news-section"



export default function HomePage() {

  const openChatbot = () => {

    const button =
      document.querySelector(
        "#chatbot-trigger",
      ) as HTMLButtonElement

    button?.click()
  }

  return (

    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-emerald-50
        via-white
        to-teal-50
      "
    >

  

      {/* NAVBAR */}
      <nav
        className="
          sticky
          top-0
          z-50
          flex
          items-center
          justify-between
          px-6
          lg:px-20
          py-5
          border-b
          bg-white/70
          backdrop-blur-md
        "
      >

        <div className="flex items-center gap-3">

          <img
            src="/images/logo.sinari.jpeg"
            alt="SINARI"
            className="
              h-11
              w-11
              rounded-full
              object-cover
              border
              shadow
            "
          />

          <div>

            <h1
              className="
                font-bold
                text-lg
                text-gray-900
              "
            >
              SINARIBOTS
            </h1>

            <p
              className="
                text-xs
                text-gray-500
              "
            >
              AI Laundry Assistant
            </p>

          </div>
        </div>

        <Button
  onClick={openChatbot}
  className="
  bg-yellow-400
  hover:bg-yellow-500
  text-black
  font-semibold
  gap-2
"
>
  <MessageCircle className="h-4 w-4" />
  Mulai Chat
</Button>

      </nav>

      {/* HERO */}
      <section
        className="
          px-6
          lg:px-20
          py-24
        "
      >

        <div
          className="
            grid
            lg:grid-cols-2
            gap-12
            items-center
          "
        >

          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.6,
            }}

            className="space-y-8"
          >

            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-yellow-100
                text-yellow-700
                px-4
                py-2
                rounded-full
                text-sm
                font-medium
              "
            >

              <Sparkles className="h-4 w-4" />

              AI Powered Laundry

            </div>

            <div className="space-y-5">

              <h1
                className="
                  text-5xl
                  lg:text-6xl
                  font-black
                  leading-tight
                  text-gray-900
                "
              >
                Laundry Modern
                dengan

                <span className="text-yellow-500">
                  {" "}AI Assistant
                </span>

              </h1>

              <p
                className="
                  text-lg
                  text-gray-600
                  leading-relaxed
                  max-w-xl
                "
              >
                SINARIBOTS membantu pelanggan
                laundry mendapatkan layanan cepat,
                otomatis, dan responsif berbasis AI.
              </p>

            </div>

            <div className="flex">

  <Button
  size="lg"
  className="
    bg-emerald-600
    hover:bg-emerald-700
    text-white
    gap-2
    font-semibold
  "
  onClick={() => {
    document
      .getElementById("services")
      ?.scrollIntoView({
        behavior: "smooth",
      })
  }}
>
  Lihat Layanan
  <ArrowRight className="h-5 w-5" />
</Button>

</div>

          </motion.div>

          {/* RIGHT CARD */}
          <motion.div

            initial={{
              opacity: 0,
              scale: 0.9,
            }}

            animate={{
              opacity: 1,
              scale: 1,
            }}

            transition={{
              duration: 0.7,
            }}

            className="relative"
          >

            <div
              className="
                bg-white
                rounded-3xl
                shadow-2xl
                p-8
                border
              "
            >

              <div className="space-y-6">

                {/* CARD 1 */}
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    p-4
                    rounded-2xl
                    bg-yellow-50
                  "
                >

                  <div
                    className="
                      p-3
                      rounded-xl
                      bg-yellow-400
                      text-black
                    "
                  >
                    <Shirt className="h-6 w-6" />
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      Cuci Kiloan
                    </h3>

                    <p className="text-sm text-gray-500">
                      Cepat & bersih
                    </p>

                  </div>

                </div>

                {/* CARD 2 */}
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    p-4
                    rounded-2xl
                    bg-emerald-50
                  "
                >

                  <div
                    className="
                      p-3
                      rounded-xl
                      bg-emerald-600
                      text-white
                    "
                  >
                    <Truck className="h-6 w-6" />
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      Antar Jemput
                    </h3>

                    <p className="text-sm text-gray-500">
                      Praktis tanpa keluar rumah
                    </p>

                  </div>

                </div>

                {/* CARD 3 */}
                <div
                  className="
                    flex
                    items-center
                    gap-4
                    p-4
                    rounded-2xl
                    bg-orange-50
                  "
                >

                  <div
                    className="
                      p-3
                      rounded-xl
                      bg-orange-500
                      text-white
                    "
                  >
                    <Clock3 className="h-6 w-6" />
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      Express Service
                    </h3>

                    <p className="text-sm text-gray-500">
                      Selesai lebih cepat
                    </p>

                  </div>

                </div>

              </div>
            </div>

          </motion.div>

        </div>

      </section>

      {/* PROMO */}
      <PromoSection />

      {/* NEWS */}
      <NewsSection />

      {/* SERVICES */}
      <section
        id="services"
        className="
          px-6
          lg:px-20
          py-20
        "
      >

        <div
          className="
            text-center
            space-y-4
            mb-14
          "
        >

          <div
            className="
              inline-flex
              items-center
              gap-2
              bg-yellow-100
              text-yellow-700
              px-4
              py-2
              rounded-full
              text-sm
              font-medium
            "
          >
            Layanan Kami
          </div>

          <h2
            className="
              text-4xl
              font-black
              text-gray-900
            "
          >
            Solusi Laundry Modern
          </h2>

    <p
      className="
        text-gray-600
        leading-relaxed
        max-w-2xl
        mx-auto
      "
    >
      SINARIBOTS menyediakan layanan laundry cepat, modern, dan terintegrasi AI assistant.
    </p>

  </div>

  <div
    className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-4
      gap-6
    "
  >

    {[
      {
        title: 'Self Service',
        icon: '🧺',
        desc:
          'Cuci dan dryer mandiri dengan mesin modern cepat dan praktis.',
      },

      {
        title: 'Cuci Kiloan',
        icon: '👕',
        desc:
          'Layanan cuci lipat dan cuci setrika untuk kebutuhan laundry harian.',
      },

      {
        title: 'Setrika Saja',
        icon: '🔥',
        desc:
          'Pakaian dirapikan dan disetrika harum tanpa proses pencucian.',
      },

      {
        title: 'Laundry Satuan',
        icon: '🧸',
        desc:
          'Cuci sepatu, karpet, boneka, helm, bed cover, dan pakaian premium.',
      },
    ].map((service, index) => (

      <div
        key={index}
        className="
          bg-white
          rounded-3xl
          p-8
          border
          hover:shadow-xl
          transition-all
          duration-300
          hover:-translate-y-1
        "
      >

        <div className="text-5xl mb-5">
          {service.icon}
        </div>

        <h3
          className="
            text-2xl
            font-bold
            mb-3
            text-gray-900
          "
        >
          {service.title}
        </h3>

        <p
          className="
            text-gray-600
            leading-relaxed
          "
        >
          {service.desc}
        </p>

      </div>

    ))}

  </div>

</section>

      {/* CHATBOT */}
      <ChatbotWidget />

    </main>
  )
}