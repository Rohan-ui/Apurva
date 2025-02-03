import { useState, useEffect } from "react"
import axios from "axios"
import ProcessSection from "./aboutUsComponent/ProcessSection"
import MissionSection from "./aboutUsComponent/MissionSection"
import VisionSection from "./aboutUsComponent/VisionSection"

function OurProcess() {
  const [activeSection, setActiveSection] = useState("process")
  const [missionData, setMissionData] = useState({})
  const [visionData, setVisionData] = useState({})

  useEffect(() => {
    fetchMission()
    fetchVisionData()
  }, [])

  const fetchMission = async () => {
    try {
      const response = await axios.get("/api/mission/getAllActiveMissions", { withCredentials: true })
      setMissionData(response.data.data || {})
    } catch (error) {
      console.error("Error fetching mission data:", error)
    }
  }

  const fetchVisionData = async () => {
    try {
      const response = await axios.get("/api/vision/getAllActiveVisions", { withCredentials: true })
      setVisionData(response.data.data || {})
    } catch (error) {
      console.error("Error fetching vision data:", error)
    }
  }

  return (
    <div className="flex justify-center  items-center pt-8 md:pt-16">
      <div className="px-4 pb-0">
        <div className="flex md:flex-row flex-col  gap-6 md:gap-0 justify-center md:space-x-2 mb-6">
          <button
            onClick={() => setActiveSection("process")}
            className={`bg-gray-200 p-2 md:px-16 md:py-6 xl:px-32 rounded hover:border-b-4 border-b-primary hover:text-gray-800 hover:bg-white hover:shadow-lg text-gray-500 font-bold ${activeSection === "process" && "border-b-primary text-gray-800 bg-white shadow-lg"}`}
          >
            OUR PROCESS
          </button>
          <button
            onClick={() => setActiveSection("mission")}
            className={`bg-gray-200 p-2 md:px-16 md:py-6 xl:px-32 rounded hover:border-b-4 border-b-primary hover:text-gray-800 hover:bg-white hover:shadow-lg text-gray-500 font-bold ${activeSection === "mission" && "border-b-primary text-gray-800 bg-white shadow-lg"}`}
          >
            OUR MISSION
          </button>
          <button
            onClick={() => setActiveSection("value")}
            className={`bg-gray-200 p-2 md:px-16 md:py-6 xl:px-32 rounded hover:border-b-4 border-b-primary hover:text-gray-800 hover:bg-white hover:shadow-lg text-gray-500 font-bold ${activeSection === "value" && "border-b-primary text-gray-800 bg-white shadow-lg"}`}
          >
            OUR VISION
          </button>
        </div>

        {activeSection === "process" && <ProcessSection />}
        {activeSection === "mission" && <MissionSection data={missionData} />}
        {activeSection === "value" && <VisionSection data={visionData} />}
      </div>
    </div>
  )
}

export default OurProcess

