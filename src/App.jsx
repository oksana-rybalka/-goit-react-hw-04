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
  const [totalImages, setTotalImages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            orientation: "landscape",
            client_id: API_KEY,
          },
        });
        console.log(response.data.results);
        if (response.data.results.length === 0) {
          toast.error("No images found for your query!", {
            position: "top-center",
            color: "red",
            fontSize: "20px",
          });
        } else {
          toast("Good job!", {
            icon: "👏",
            style: {
              color: "#ff3d00",
              fontSize: "20px",
            },
          });
        }

        setImages((prevImages) => [...prevImages, ...response.data.results]);
        setTotalImages(response.data.total);

        if (
          page > 1 &&
          images.length + response.data.results.length >= response.data.total
        ) {
          toast.success("That's all the images for your query!", {
            position: "top-center",
            duration: 4000,
            style: {
              fontSize: "20px",
              fontWeight: "normal",
              color: "#ff3d00",
              textAlign: "center",
              borderRadius: "10px",
              padding: "10px",
            },
          });
        }
      } catch (error) {
        setError(error.message);
        toast.error("Something went wrong. Please try again.", {
          position: "top-center",
          duration: 4000,
          style: {
            fontSize: "20px",
            fontWeight: "normal",
            backgroundColor: "red",
            color: "white",
            textAlign: "center",
            borderRadius: "10px",
            padding: "10px",
          },
        });
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
    setTotalImages(0);
  };
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.containerParent}>
      <h1 className={styles.titleImageApp}>IMAGES HUNT</h1>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && images.length < totalImages && !loading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          largeImageURL={selectedImage.urls.full}
          alt={selectedImage.alt_description}
        />
      )}
    </div>
  );
}

export default App;
