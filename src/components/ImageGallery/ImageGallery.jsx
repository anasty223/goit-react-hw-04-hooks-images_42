import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { List } from "./ImageGallery.styles";
import PropTypes from "prop-types";

const ImageGallery = ({ images, handleTogleModal }) => {
  return (
    <List>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          img={webformatURL}
          tags={tags}
          handleTogleModal={handleTogleModal}
          modalImg={largeImageURL}
        />
      ))}
    </List>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  handleTogleModal: PropTypes.func.isRequired,
};
export default ImageGallery;
