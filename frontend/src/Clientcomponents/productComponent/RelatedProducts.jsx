import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"

const colorMap = {
  GrDocumentTest: {
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
    hoverBgColor: "group-hover:bg-blue-500",
    hoverTextColor: "group-hover:text-white",
  },
  // ... (other color mappings)
}

const ServiceCard = ({ imageSrc, icon: Icon, title, slug, alt, imgTitle }) => {
  const iconName = Icon.displayName || Icon.name
  const colors = colorMap[iconName] || {
    bgColor: "bg-gray-100",
    textColor: "text-gray-600",
    hoverBgColor: "group-hover:bg-gray-200",
    hoverTextColor: "group-hover:text-white",
  }

  return (
    <div className={`bg-white shadow-lg group h-auto`}>
      <div className="overflow-hidden">
        <Link to={`/${slug}`}>
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={alt}
            title={imgTitle}
            className="w-full sm:h-56 h-auto bg-gray-100 object-cover transform group-hover:scale-125 transition duration-500"
          />
        </Link>
      </div>
      <div className="py-8 px-4 items-start justify-center flex flex-col gap-2 flex-wrap md:flex-nowrap">
        <div className="flex items-center w-full gap-4">
          <div
            className={`flex justify-center items-center ${colors.bgColor} ${colors.hoverBgColor} rounded-full p-4 h-fit`}
          >
            <Icon className={`${colors.textColor} ${colors.hoverTextColor} transition duration-300 text-[18px]`} />
          </div>
          <Link to={`/${slug}`} className={`text-[18px] font-bold text-gray-800`}>
            {title}
          </Link>
        </div>
        <div className="flex w-full justify-end">
          <Link to={`/${slug}`} className={`text-primary font-medium flex items-center text-[14px]`}>
            READ MORE <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export const RelatedProducts = ({ products, iconMap }) => {
  return (
    <div className="my-16 md:mx-20 m-4">
      <h2 className="text-2xl font-daysOne mb-4">__Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
        {products.map((product, index) => (
          <ServiceCard
            key={product.id}
            imageSrc={product.photo && product.photo.length > 0 && `/api/image/download/${product.photo[0]}`}
            icon={iconMap[index % iconMap.length]}
            title={product.title}
            imgTitle={product.imgTitle}
            alt={product.alt}
            slug={product.slug}
          />
        ))}
      </div>
    </div>
  )
}

