import { useState } from 'react'
import { Upload } from 'lucide-react'

export default function DocumentUpload({ onUpload, loading, multiple = false }) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      onUpload(files[0])
    }
  }

  const handleChange = (e) => {
    const files = e.target.files
    if (files && files[0]) {
      onUpload(files[0])
    }
  }

  return (
    <div className="card">
      <form
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition ${
          dragActive
            ? 'border-gov-blue bg-blue-50'
            : 'border-gray-300 bg-gray-50'
        }`}
      >
        <input
          type="file"
          id="file-input"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleChange}
          className="hidden"
          disabled={loading}
          multiple={multiple}
        />

        <label htmlFor="file-input" className="cursor-pointer">
          <Upload className="w-12 h-12 mx-auto mb-4 text-gov-blue" />
          <p className="text-xl font-semibold text-gray-800 mb-2">
            Drag and drop your document here
          </p>
          <p className="text-gray-600 mb-4">
            or click to select file
          </p>
          <p className="text-sm text-gray-500">
            Supported formats: PDF, JPG, JPEG, PNG (Max 10MB)
          </p>
        </label>
      </form>
    </div>
  )
}
