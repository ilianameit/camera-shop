import { Navigation, A11y, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import 'swiper/css';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getSimilarCameras } from '../../store/camera-slice/selectors';
import { fetchSimilarCamerasAction } from '../../store/api-actions';
import CardItem from '../card-item/card-item';
import styles from './style.module.css';

type ProductSimilarSliderProps = {
  id: string;
  onBuyClick: () => void;
}

function ProductSimilarSlider({id, onBuyClick}: ProductSimilarSliderProps): JSX.Element {
  const swiper = useSwiper();
  const dispatch = useAppDispatch();
  const similarCameras = useAppSelector(getSimilarCameras);

  useEffect(() => {
    dispatch(fetchSimilarCamerasAction(id));
  }, [id, dispatch]);

  return(
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <Swiper
              modules={[Navigation, A11y, Keyboard]}
              keyboard={{
                enabled: true,
              }}
              slidesPerView={3}
              slidesPerGroupSkip={0}
              spaceBetween={16}
              centeredSlides = {false}
              navigation={{
                prevEl: '.slider-controls--prev',
                nextEl: '.slider-controls--next',
              }}
              breakpoints={{
                0: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
              }}
              className="product-similar__slider-list"
            >
              {similarCameras.map((cameraValue) => (
                <SwiperSlide key={`similar-item-${cameraValue.id}`} className={`product-card is-active ${styles.card}`}>
                  <CardItem camera={cameraValue} onBuyClick={onBuyClick} isSwiperCard />
                </SwiperSlide>
              ))}

              <button
                className="slider-controls slider-controls--prev"
                type="button"
                aria-label="Предыдущий слайд"
                onClick={() => swiper.slidePrev()}
                style={{ pointerEvents: 'auto' }}
              >
                <svg width={7} height={12} aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>
              <button
                className="slider-controls slider-controls--next"
                type="button"
                aria-label="Следующий слайд"
                onClick={() => swiper.slideNext()}
                style={{ pointerEvents: 'auto' }}
              >
                <svg width={7} height={12} aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductSimilarSlider;