import toast from "react-hot-toast";
import PropTypes from "prop-types";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

const ImageGallery = ({ images }) => {
  console.log(images);
  if (images.length === 0) {
    toast.error("No images found for your query.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return;
  }

  return (
    <ul className={styles.galleryList}>
      {images.map((image) => (
        <li className={styles.galleryItem} key={image.id}>
          <ImageCard key={image.id} image={image} />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
