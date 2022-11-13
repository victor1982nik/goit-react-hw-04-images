import { useState, useEffect } from 'react';
import { fetchData } from './Api/fetchData';
import { Box } from './App.styled';
import { BtnLoadMore } from './Button/BtnLoadMore';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { SearchBar } from './SearchBar/SearchBar';

export function App() {
  const [pictures, setPictures] = useState([]);
  const [picture, setPicture] = useState(null);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (filter === '') return;
    try {
      setIsLoading(true);
      const getData = async () => {
        const resp = await fetchData(filter, page);
        if (!resp.data.hits.length) {
          return;
        }
        setPictures(state => [...state, ...resp.data.hits]);
        setTotal(resp.data.total);
      };
      getData();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [page, filter]);

  const handlerFormSubmit = e => {
    e.preventDefault();

    if (input === filter) {
      return;
    }
    setFilter(input);
    setPictures([]);
    setPage(1);
  };

  const handleModal = bigPicture => {
    setPicture(bigPicture);
  };

  return (
    <Box>
      <SearchBar
        inputValue={input}
        onSubmit={handlerFormSubmit}
        onChange={e => setInput(e.target.value)}
      ></SearchBar>
      {error && <div>{error}</div>}
      {pictures.length > 0 && (
        <ImageGallery data={pictures} onClick={handleModal} />
      )}
      {isLoading && <Loader />}
      {pictures.length > 0 && pictures.length < total && (
        <BtnLoadMore
          text="Load More"
          onClick={() => setPage(state => state + 1)}
        />
      )}
      {picture && (
        <Modal picture={picture} onClose={() => setPicture(null)}></Modal>
      )}
    </Box>
  );
}

// const createRenderList = () => {
//   if (pictures) {
//     return pictures.map(item => ({
//       id: item.id,
//       small: item.webformatURL,
//       big: item.largeImageURL,
//     }));
//   }
// };

// let options = createRenderList();

// class oldApp extends Component {
//   state = {
//     pictures: [],
//     picture: null,
//     error: null,
//     filter: '',
//     isLoading: false,
//     total: null,
//     page: 1,
//     input: '',
//   };

//   async componentDidUpdate(_, prevState) {
//     const { filter, page } = this.state;
//     if (prevState.page !== page || prevState.filter !== filter) {
//       try {
//         this.setState({ isLoading: true });
//         const response = await fetchData(filter, page);
//         if (!response.data.hits.length) {
//           return;
//         }
//         //console.log(page, prevState.pictures, response.data.hits);
//         //debugger;
//         //     if(!response) {return}
//         this.setState(prevState => {
//           return {
//             pictures: [...prevState.pictures, ...response.data.hits],
//             total: response.data.total,
//           };
//         });
//       } catch (error) {
//         this.setState({ error: 'Что-то пошло не так, перезагрузите страницу' });
//       } finally {
//         this.setState({ isLoading: false });
//       }
//     }
//   }

//   handleInput = e => {
//     this.setState({ input: e.target.value });
//   };

//   handlerFormSubmit = e => {
//     e.preventDefault();

//     const { input, filter } = this.state;
//     if (input === filter) {
//       return;
//     }

//     this.setState({
//       filter: input,
//       pictures: [],
//       page: 1,
//     });
//   };

//   handleModal = bigPicture => {
//     this.setState({ picture: bigPicture });
//   };

//   closeModal = () => {
//     this.setState({ picture: null });
//   };

//   onClickLoadMore = async e => {
//     this.setState(prevState => {
//       return {
//         page: prevState.page + 1,
//       };
//     });
//   };

//   createRenderList() {
//     const { pictures } = this.state;
//     if (pictures) {
//       return pictures.map(item => ({
//         id: item.id,
//         small: item.webformatURL,
//         big: item.largeImageURL,
//       }));
//     }
//   }

//   render() {
//     const { pictures, isLoading, input, picture, error, total } = this.state;
//     let options = this.createRenderList();

//     return (
//       <Box>
//         <SearchBar
//           inputValue={input}
//           onSubmit={this.handlerFormSubmit}
//           onChange={this.handleInput}
//         ></SearchBar>
//         {error && <div>{error}</div>}
//         {options && <ImageGallery data={options} onClick={this.handleModal} />}
//         {isLoading && <Loader />}
//         {pictures.length > 0 && pictures.length < total && (
//           <BtnLoadMore text="Load More" onClick={this.onClickLoadMore} />
//         )}
//         {picture && <Modal picture={picture} onClose={this.closeModal}></Modal>}
//       </Box>
//     );
//   }
// }
