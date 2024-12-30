import { useState, useEffect } from "react";
import styles from "./App.module.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_KEY = "jE-CmhYKhGw3Y2Lhbhiyi6TG9ZlyTRDGXUtT01p0PAI";
  const BASE_URL = "https://api.unsplash.com/search/photos";

  useEffect(() => {
    if (!query) return;
    async function fetchImages() {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(BASE_URL, {
          params: {
            query,
            page,
            per_page: 12,
            client_id: API_KEY,
          },
        });

        setImages((prevImages) => [...prevImages, ...response.data.results]);
      } catch (error) {
        setError(error.message);
        toast.info("No images found. Please try a different query.");
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [query, page]);

  const handleSearch = (value) => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(null);
  };
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };
  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <div className={styles.containerParent}>
      <h1 className={styles.titleImageApp}>IMAGES HUNT</h1>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={showModal}
          onClose={closeModal}
          largeImageURL={selectedImage.urls.full}
          alt={selectedImage.alt_description}
        />
      )}
    </div>
  );
}

export default App;
