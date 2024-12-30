import styles from "./ErrorMessage.module.css";
import PropTypes from "prop-types";

const ErrorMessage = ({ message }) => {
  return (
    <div className={styles.errorContainer}>
      <p>Error: {message}</p>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
