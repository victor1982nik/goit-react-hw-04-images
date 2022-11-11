import PropTypes from 'prop-types';
import {  useEffect} from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ picture, onClose }) {  

  useEffect(() => {
    console.log("Mount");
    const handlekeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handlekeyDown);
    return ()=> {window.removeEventListener('keydown', handlekeyDown);}
  }, [onClose]);

  const handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackDropClick}>
      <ModalWindow>
        <img src={picture} alt="" />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
}

// class OldModal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handlekeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handlekeyDown);
//   }

//   handlekeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleBackDropClick = event => {
//     if (event.target === event.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <Overlay onClick={this.handleBackDropClick}>
//         <ModalWindow>
//           <img src={this.props.picture} alt="" />
//         </ModalWindow>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }

Modal.propTypes = {
  picture: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
