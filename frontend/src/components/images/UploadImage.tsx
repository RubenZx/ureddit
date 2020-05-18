import { Row, Spacer, Text } from '@zeit-ui/react'
import { File, X } from '@zeit-ui/react-icons'
import React, { useCallback, useState } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import IconButton from '../buttons/IconButton'
import { useTheme } from '../ThemeContext'

const UploadImage: React.FC<{
  dropZoneOptions?: Omit<DropzoneOptions, 'onDrop'>
  setFile: (file: File[]) => void
  file: File[] | undefined
}> = ({ children: _, dropZoneOptions = {}, setFile, file, ...props }) => {
  const [isUploaded, setIsUploaded] = useState(false)
  const onDrop = useCallback(
    async (files: File[]) => {
      setFile(files)
      setIsUploaded(true)
    },
    [setFile],
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...dropZoneOptions,
    onDrop,
  })

  const { palette } = useTheme()

  return (
    <>
      {file &&
        file.map((f, k) => (
          <Row
            justify="space-between"
            align="middle"
            key={k}
            style={{ width: '100%' }}
          >
            <Text style={{ marginLeft: '5px' }}>{f.name}</Text>
            <IconButton
              icon={X}
              onClick={() => setFile([])}
              style={{
                paddingRight: '0rem',
                paddingLeft: '0.5rem',
                color: 'red',
              }}
            />
          </Row>
        ))}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          borderWidth: '1px',
          borderRadius: '2px',
          border: 'dashed',
          borderColor: palette.accents_2,
          padding: '20px',
          cursor: 'pointer',
        }}
        {...getRootProps()}
      >
        <File />
        <Spacer x={0.5} />
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : isUploaded && file!.length > 0 ? (
          <p>Image uploaded successfully!</p>
        ) : (
          <p>Drag 'n' drop your file here, or click to select a file</p>
        )}
      </div>
    </>
  )
}

export default UploadImage
