import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function VisionSection({ data }) {
  const { title, description, photo, alt, imgTitle } = data;

  return (
    <section className="  py-5">
      <div className="md:mx-12 md:px-4 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          <ReactQuill value={description} readOnly={true} theme="bubble" className="text-gray-600 text " />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img
            src={`/api/image/download/${photo[0]}`}
            alt={alt[0]}
            title={imgTitle[0]}
            className="w-full h-64 object-cover rounded-lg shadow-sm"
          />
          <img
            src={`/api/image/download/${photo[1]}`}
            alt={alt[1]}
            title={imgTitle[1]}
            className="w-full h-64 object-cover rounded-lg shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}

export default VisionSection;