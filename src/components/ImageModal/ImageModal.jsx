import { useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, largeImageURL, alt }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <img src={largeImageURL} alt={alt} />
      </div>
    </Modal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

ImageModal.defaultProps = {
  alt: "Image preview",
};

export default ImageModal;
