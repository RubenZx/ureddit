import { Modal } from '@zeit-ui/react'
import React from 'react'
import { modalTypes } from '../Navbar'
import modalContent from './ModalContents'

export interface TypeHandler {
  typeHandler: (type: modalTypes) => void
}

interface MyModalProps extends TypeHandler {
  type: 'login' | 'register' | 'forgotPassword'
  open: boolean
  closeHandler: () => void
}

const MyModal = ({ type, open, closeHandler, typeHandler }: MyModalProps) => {
  return (
    <Modal open={open} onClose={closeHandler}>
      <Modal.Content>
        {React.createElement(
          modalContent[type] as React.ComponentClass<TypeHandler>,
          { typeHandler: typeHandler },
        )}
      </Modal.Content>
    </Modal>
  )
}

export default MyModal
