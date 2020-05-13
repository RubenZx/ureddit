import React, { useState } from 'react'

const UploadFile = () => {
  const [image, setImage] = useState({ preview: '', raw: '' })

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      })
    }
  }

  const handleUpload = async (e: any) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', image.raw)

    await fetch('YOUR_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
  }

  return (
    <>
      <input
        type="file"
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <button onClick={handleUpload}>Upload</button>
    </>
  )
}

export default UploadFile
