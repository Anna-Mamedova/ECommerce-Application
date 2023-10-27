import React, { CSSProperties } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { ISliderProps } from '../../interfaces/detailedPage.interface';
import Zoom from 'react-img-zoom';
import { Close } from '@mui/icons-material';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './Slider.module.css';

type CustomCSSProperties = CSSProperties & {
  '--swiper-navigation-color': string;
  '--swiper-pagination-color': string;
};

export function Slider({
  slides,
  handleClick,
  isModal,
  handleClose,
  image,
}: ISliderProps & {
  handleClick: (img: string) => void;
  isModal?: boolean;
  handleClose: () => void;
}) {
  const swiperStyles: CustomCSSProperties = {
    '--swiper-navigation-color': 'black',
    '--swiper-pagination-color': 'black',
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      loop={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      style={swiperStyles}
    >
      {slides.map((slide) => (
        <SwiperSlide
          key={slide.image}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {isModal ? (
            <>
              <Zoom img={image} zoomScale={2} width={620} height={700} />
              <Close onClick={handleClose} className={styles.close} />
            </>
          ) : (
            <img
              src={slide.image}
              className={styles.swiper}
              onClick={() => handleClick(slide.image)}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
