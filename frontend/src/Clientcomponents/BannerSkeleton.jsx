import React from 'react'

const BannerSkeleton = () => {
  return (
    <div>
          <div className="lg:flex lg:flex-row-reverse">
        {/* Image area skeleton with fixed dimensions */}
        <div className="lg:w-1/2 flex justify-center items-center mt-8 md:mt-0">
            <div className="flex items-center justify-center lg:relative">
                <div className="w-[70%] md:w-1/2 lg:h-[500px] lg:w-[450px] lg:mt-16 xl:h-[600px] xl:w-[500px] bg-gray-200 rounded"></div>
                <div className="hidden md:block md:w-[40%] lg:absolute lg:-right-5 lg:top-10 xl:top-56 xl:left-[360px]">
                    <div className="h-40 w-40 lg:h-60 lg:w-60 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>

        {/* Text area skeleton with fixed height */}
        <div className="lg:w-1/2 xl:flex xl:flex-col xl:justify-center p-4" style={{ minHeight: '400px' }}>
            <div className="space-y-4 py-5 pt-4 lg:pl-10">
                <div className="h-12 md:h-16 w-full max-w-xl bg-gray-200 rounded"></div>
                <div className="space-y-2 lg:py-7 xl:w-4/5">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                </div>
            </div>
            <div className="flex gap-2 justify-center items-center md:justify-start py-4 lg:pl-10 flex-row md:space-y-0 md:gap-6">
                <div className="h-14 w-40 bg-gray-300 rounded"></div>
                <div className="h-14 w-40 bg-gray-300 rounded"></div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default BannerSkeleton
