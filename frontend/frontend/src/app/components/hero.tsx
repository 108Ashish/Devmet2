"use client"

import { Button } from "antd"
import { motion } from "framer-motion"
import { FileText, Sparkles } from "lucide-react"
import { FloatingPaper } from  "./floating-paper"
import { RoboAnimation } from "./robo-animation"
import { useRouter } from "next/navigation"


export default function Hero() {
    const route = useRouter();
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-2xl lg:text-3xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {" "}
                DevMeet
              </span>
              – Connect, Collaborate, Create. Build the future with developers worldwide!
              
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
          >
            Post your projects, ideas, or research, and let our platform connect you with like-minded developers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button type="primary" className="bg-purple-600 hover:bg-purple-700 text-white px-8" onClick={()=>route.push("/signin")}>
              {/* <FileText className="mr-2 h-5 w-5" /> */}
              Sign in
            </Button>
            <Button type="primary" className="text-white border-purple-500 hover:bg-purple-500/20" onClick={()=>route.push("/signup")}>
              {/* <Sparkles className="mr-2 h-5 w-5" /> */}
              Sign up
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <RoboAnimation />
      </div>
    </div>
  )
}

