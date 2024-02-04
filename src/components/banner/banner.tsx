import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { getPromo } from '../../store/camera-slice/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPromoAction } from '../../store/api-actions';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const/const';

import 'swiper/css';
import 'swiper/css/pagination';
import './pagination.css';

function Banner(): JSX.Element {
  const PROMO_COUNT = 3;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPromoAction());
  }, [dispatch]);

  const promos = useAppSelector(getPromo).slice(0, PROMO_COUNT);
  const progressContent = useRef(null);
  return(
    <Swiper
      spaceBetween={30}
      centeredSlides
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
    >
      {
        promos.map((promo) => (
          <SwiperSlide key={`${promo.id}-promo`} className='banner'>
            <picture>
              <source type="image/webp" srcSet={`${promo.previewImgWebp}, ${promo.previewImgWebp2x} 2x`}/><img src={promo.previewImg} srcSet={`${promo.previewImg2x} 2x`} width="1280" height="280" alt="баннер"/>
            </picture>
            <p className="banner__info" slot="container-end">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">{promo.name}</span>
              <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
              <Link className="btn" to={`${AppRoutes.Product}${promo.id}`}>Подробнее</Link>
            </p>
          </SwiperSlide>
        ))
      }
      <div className="autoplay-progress" >
        <span ref={progressContent}></span>
      </div>
    </Swiper>
  );
}

export default Banner;