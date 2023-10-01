import useModalStore from "@/shared/store/useModal";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Page } from "..";

const ModalProvider: React.FC = () => {
  const { properties, isOpen, dismiss } = useModalStore();


  if (!properties) return <>Wait</>

  return (
    <Modal show={isOpen} onHide={dismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{properties?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{properties?.content}</Modal.Body>
    </Modal>
  );
};

export default ModalProvider;
