import { Items, Image } from "./ImageGalleryItem.styles";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ img, modalImg, tags, handleTogleModal }) => {
  return (
    <Items
      onClick={({ target: { alt } }) => {
        handleTogleModal(modalImg, alt);
      }}
    >
      <Image src={img} alt={tags} />
    </Items>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  modalImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  handleTogleModal: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
