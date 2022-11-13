import PropTypes from 'prop-types';
import { Image, ListItem } from '../ImageGallery.styled';

export const ImageGalleryItem = ({ smallPict, bigPict, onClick }) => {
  return (
    <ListItem>
      <Image src={smallPict} alt="" onClick={() => onClick(bigPict)} />
    </ListItem>
  );
};

ImageGalleryItem.propTypes = {
  smallPict: PropTypes.string.isRequired,
  bigPict: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
