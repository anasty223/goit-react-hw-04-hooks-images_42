import { useEffect, useState } from "react";
import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";
import fetchImages from "./servises/fetchImages";
import Modal from "./components/Modal/Modal";
import { ButtonLoadMore } from "./components/Button/Button";
import { Loader } from "./components/Loader/Loader";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  const formSubmitHandler = (searchQuery) => {
    if (searchQuery.trim() === "") {
      return NotificationManager.error("Error", "Enter text!", 3000);
    }

    setSearchQuery(searchQuery);
    setIsPending(true);
    setImages([]);
    setPage(1);
  };

  const toggleModal = (image, alt) => {
    setShowModal((prev) => ({
      showModal: !prev.showModal,

      modalImg: image,
      modalAlt: alt,
    }));
    setModalAlt(alt);
    setModalImg(image);
    // setPage((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    if (isPending) {
      fetchImages(searchQuery, page)
        .then((img) => {
          if (img.length === 0) {
            setImages([]);
            setIsPending(false);

            return NotificationManager.warning(
              "Warning ",
              `Not found "${searchQuery}"`,
              3000
            );
          }

          setIsPending(false);
          // setPage(1); //это была ошибка кей и страниц
          setImages((prev) => [...prev, ...img]);
        })
        .catch((error) => {
          console.log(error.massage);
        });
    }
  }, [isPending, page, searchQuery]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    setIsPending(true);
  };

  return (
    <>
      <Searchbar onSubmit={formSubmitHandler} />
      {images.length >= 1 && (
        <ImageGallery images={images} handleTogleModal={toggleModal} />
      )}
      {isPending && <Loader />}
      {images.length >= 12 && (
        <ButtonLoadMore handleLoadMore={handleLoadMore} />
      )}
      {showModal.showModal && (
        <Modal
          modalImg={modalImg}
          handleTogleModal={toggleModal}
          tag={modalAlt}
        />
      )}
      <NotificationContainer />
    </>
  );
}

// class App extends Component {
//   state = {
//     images: [],
//     searchQuery: "",
//     page: 1,
//     isPending: false,
//     showModal: false,
//     modalImg: "",
//     modalAlt: "",
//   };
// toggleModal = (image, alt) => {
//   this.setState(({ showModal }) => ({
//     showModal: !showModal,
//     modalImg: image,
//     modalAlt: alt,
//   }));
// };

// formSubmitHandler = (searchQuery) => {
//   console.log("searchQuery", searchQuery);
//   this.setState({ searchQuery, isPending: true, images: [], page: 1 });
// };
//   componentDidUpdate() {
//     const { searchQuery, page, isPending } = this.state;
//     if (isPending) {
//       fetchImages(searchQuery, page)
//         .then((img) => {
//           console.log("img", img);
//           if (img.length === 0) {
//             return NotificationManager.warning(
//               "Warning ",
//               `Not found "${searchQuery}"`,
//               3000
//             );
//           }
//           this.setState({ isPending: false, page: 1 });

//           if (searchQuery.trim() === "") {
//             return NotificationManager.error("Error", "Enter text!", 3000);
//           }

//           this.setState((prev) => ({
//             images: page > 1 ? [...prev.images, ...img] : img,

//             isPending: false,
//           }));
//         })
//         .catch((error) => {
//           console.log(error.massage);
//         });
//     }
//   }
//   handleLoadMore = () => {
//     this.setState((prev) => ({ page: prev.page + 1, isPending: true }));
//   };

//   render() {
//     const { images, isPending, showModal } = this.state;
//     return (
//       <>
//         <Searchbar onSubmit={this.formSubmitHandler} />

//         {images.length >= 1 && (
//           <ImageGallery images={images} handleTogleModal={this.toggleModal} />
//         )}

//         {isPending && <Loader />}
//         {images.length >= 12 && (
//           <ButtonLoadMore handleLoadMore={this.handleLoadMore} />
//         )}

//         {showModal && (
//           <Modal
//             modalImg={this.state.modalImg}
//             handleTogleModal={this.toggleModal}
//             tag={this.state.modalAlt}
//           />
//         )}
//         <NotificationContainer />
//       </>
//     );
//   }
// }

// export default App;
