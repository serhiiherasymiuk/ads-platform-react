import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { FC, useState } from "react";

interface Props {
  id: number;
  text: string;
  deleteFunc: (id: number) => void;
}

export const ModalAdvertisementsDelete: FC<Props> = ({
  id,
  text,
  deleteFunc,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = async () => {
    deleteFunc(id);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={(event) => {
          setShowDeleteModal(true);
        }}
      >
        <i className="bi bi-trash3"></i>
      </button>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {text}?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowDeleteModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowDeleteModal(false);
              handleDelete();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
