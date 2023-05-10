import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import { fetchImages } from '../helpers/api/index';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { AppWrap } from './App.styled';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setStatus('pending');

        if (currentPage !== 1) {
          const { hits } = await fetchImages(search, currentPage);

          setImages(prev => [...prev, ...hits]);
          setStatus('resolved');

          return;
        }

        const { hits, totalHits } = await fetchImages(search);

        setImages(hits);
        setTotalHits(totalHits);
        setStatus('resolved');

        if (hits.length === 0) {
          toast.info(`on request ${search} Nothing found`);
        }
      } catch (error) {
        setStatus('rejected');
        toast.error('ooops something went wrong');
      }
    };
    fetchData();
  }, [search, currentPage]);

  const handleSearchValue = ({ theme }, { resetForm }) => {
        setSearch(theme);
    setCurrentPage(1);
    resetForm();
  };

  const handleLoadMore = () => setCurrentPage(prev => prev + 1);

  const handleCurrentImgClick = evt => setCurrentImage(evt);

  return (
    <AppWrap>
      <Searchbar onSubmit={handleSearchValue} />
      <ImageGallery imgList={images} onClick={handleCurrentImgClick} />

      {status === 'resolved' && images.length < totalHits && (
        <Button onClick={handleLoadMore} />
      )}

      {currentImage && (
        <Modal
          image={currentImage}
          handleModalClose={() => setCurrentImage(null)}
        />
      )}

      {status === 'pending' && <Loader />}
      <ToastContainer />
    </AppWrap>
  );
};
