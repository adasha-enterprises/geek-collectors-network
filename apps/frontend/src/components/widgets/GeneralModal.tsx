import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { ModalProps } from '../../types/types';


function GeneralModal({ onClose, isOpen, headerContent, bodyContent, footerContent } : ModalProps) {
  return (

    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent className="modal">
        <ModalHeader className="modal-header">{headerContent}</ModalHeader>
        <ModalCloseButton className="close-button" />
        <ModalBody>{bodyContent}</ModalBody>
        <ModalFooter>{footerContent}</ModalFooter>
      </ModalContent>
    </Modal>

  );
}

export default GeneralModal;
