import styles from "./ImageCard.module.css";
import PropTypes from "prop-types";

const ImageCard = ({ image, onClick }) => {
  return (
    <div className={styles.imageCard} onClick={() => onClick(image)}>
      <img
        src={image.urls.small}
        width={360}
        alt={image.alt_description || "Image"}
      />
      <div className={styles.imageInfo}>
        <p className={styles.textInfo}>❤️ Likes: {image.likes}</p>
        <p className={styles.textInfo}>📷 Author: {image.user.name}</p>
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  image: PropTypes.shape({
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
  }).isRequired,
};

export default ImageCard;
