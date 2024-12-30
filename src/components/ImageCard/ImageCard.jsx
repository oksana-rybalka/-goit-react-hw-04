import styles from "./ImageCard.module.css";
import PropTypes from "prop-types";

const ImageCard = ({ image }) => {
  return (
    <div className={styles.imageCard}>
      <img
        src={image.urls.small}
        width={360}
        alt={image.alt_description || "Image"}
      />
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
