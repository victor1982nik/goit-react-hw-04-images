import PropTypes from 'prop-types';
import { List } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ data, onClick }) => {
  return (
    <List>
      {data.map(item => {
        return (
          <ImageGalleryItem
            key={item.id}
            smallPict={item.webformatURL}
            bigPict={item.largeImageURL}
            onClick={onClick}
          />
        );
      })}
    </List>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
