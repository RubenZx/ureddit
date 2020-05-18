import { Modal } from '@zeit-ui/react'
import React from 'react'
import UploadImage from './UploadImage'

const MAX_SIZE_25MB = 26_214_400

export default ({
  open,
  setClose,
  setFile,
  file,
}: {
  open: boolean
  setClose: () => void
  setFile: (file: File[]) => void
  file: File[] | undefined
}) => {
  return (
    <Modal open={open} onClose={setClose} width={'500px'}>
      <UploadImage
        file={file}
        setFile={setFile}
        dropZoneOptions={{
          accept: 'image/*',
          multiple: false,
          maxSize: MAX_SIZE_25MB,
        }}
      />
    </Modal>
  )
}
