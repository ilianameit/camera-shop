import { Link } from 'react-router-dom';
import { Camera } from '../../types/types';
import RatingStarsList from '../rating-stars-list/rating-stars-list';
import { returnFormatedPrice } from '../../utils/common';
import { AppRoutes } from '../../const/const';
import { memo } from 'react';
import { useAppSelector } from '../../hooks';
import { getCamerasFromCart } from '../../store/basket-slice/selectors';

type DefaultCardItemProps = {
  camera: Camera;
  onBuyClick: () => void;
}
function DefaultCardItemComponent({camera, onBuyClick}: DefaultCardItemProps): JSX.Element {
  const {id, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, category, rating, reviewCount, price} = camera;
  const camerasInCart = useAppSelector(getCamerasFromCart);
  const isCameraInCart = camerasInCart.find((cameraInCart) => cameraInCart.id === id);

  return(
    <>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}/>
          <img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width={280} height={240} alt={`${category} «${name}»`} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStarsList id={id} rating={rating} />
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{returnFormatedPrice(price)}
        </p>
      </div>
      <div className="product-card__buttons">
        {
          !isCameraInCart ?
            <button
              className="btn btn--purple product-card__btn"
              type="button"
              onClick={onBuyClick}
            >
              Купить
            </button> :
            <Link
              className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
              to={AppRoutes.Basket}
            >
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-basket"></use>
              </svg>В корзине
            </Link>
        }

        <Link className="btn btn--transparent" to={`${AppRoutes.Product}${id}`}>Подробнее
        </Link>
      </div>
    </>
  );
}

const DefaultCardItem = memo(DefaultCardItemComponent);
export default DefaultCardItem;
