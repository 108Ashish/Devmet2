"use client"

import Sidebar from "../../components/Sidebar"
import axios from "axios";
import { useState } from "react"
import { Layout,Image } from "antd"
const {Content} = Layout

export default function Page() {
  const [activeTab, setActiveTab] = useState("Work")
  

  return (
    <Layout style={{ minHeight: "100vh", display: "flex" }}>
      <Sidebar/>
      <Content><div className=" bg-[#141414] text-white " /* style={{paddingLeft:"130px",paddingTop:"40px"}} */ >
      {/* Header with purple gradient */}
      <div className="relative mr-auto" >
        <div className="h-40 bg-gradient-to-r"></div>

        {/* Profile section */}
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row gap-6 -mt-16 relative">
            {/* Profile image */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#121212]">
              <Image
    width={200}
    src="https://i.pravatar.cc/40?img=3"
  />
              </div>
            </div>

            {/* Profile info */}
            <div className="flex-grow pt-4 md:pt-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">Harshit Shrivastava</h1>
                    <span className="bg-[#5D3FD3] text-white text-xs px-2 py-0.5 rounded-full">PRO</span>
                  </div>
                  <p className="text-gray-300 mt-1">Interface and Brand Designer</p>
                  <p className="text-gray-400 text-sm">based in India</p>
                </div>

                {/* Stats for desktop */}
                <div className="hidden md:flex items-center gap-8 mt-4 md:mt-0">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Followers</p>
                    <p className="text-xl font-bold">2,985</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Following</p>
                    <p className="text-xl font-bold">132</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">Likes</p>
                    <p className="text-xl font-bold">548</p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-4">
                <button onClick={()=>handleFollow()} className="bg-[#1E1E1E] hover:bg-[#2A2A2A] text-white px-6 py-2 rounded-full font-medium transition" >
                  Follow
                </button>
                <button className="bg-transparent border border-gray-700 hover:border-gray-500 text-white px-6 py-2 rounded-full font-medium transition">
                  Get in touch
                </button>
              </div>

              {/* Stats for mobile */}
              <div className="flex md:hidden items-center justify-between mt-6">
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Followers</p>
                  <p className="text-xl font-bold">2,985</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Following</p>
                  <p className="text-xl font-bold">132</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-sm">Likes</p>
                  <p className="text-xl font-bold">548</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="mt-8 border-b border-gray-800">
            <nav className="flex">
              {["Work", "Moodboards", "Likes", "About"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium relative ${
                    activeTab === tab ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {tab}
                  {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Portfolio grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* VPN Mobile App */}
          <div className="bg-[#1A1A1A] rounded-xl overflow-hidden">
            <div className="relative h-48 bg-[#1E293B] overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="VPN Mobile App"
                width={400}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">VPN Mobile App</h3>
              <p className="text-gray-400 text-sm mt-1">Mobile UI, Research</p>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-red-500"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  <span className="text-sm">517</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-gray-400"
                  >
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">9.3k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Property Dashboard */}
          <div className="bg-[#1A1A1A] rounded-xl overflow-hidden">
            <div className="relative h-48 bg-[#1E293B] overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Property Dashboard"
                width={400}
                height={300}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">UI</div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">Property Dashboard</h3>
              <p className="text-gray-400 text-sm mt-1">Web interface</p>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-red-500"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  <span className="text-sm">983</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-gray-400"
                  >
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">14k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Healthcare Mobile App */}
          <div className="bg-[#1A1A1A] rounded-xl overflow-hidden">
            <div className="relative h-48 bg-[#1E293B] overflow-hidden">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="Healthcare Mobile App"
                width={400}
                height={300}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">UI</span>
                <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">Br</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">Healthcare Mobile App</h3>
              <p className="text-gray-400 text-sm mt-1">Mobile UI, Branding</p>
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-red-500"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  <span className="text-sm">875</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 text-gray-400"
                  >
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                    <path
                      fillRule="evenodd"
                      d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">13.5k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></Content>
       
      
   </Layout>
   
  )
}

