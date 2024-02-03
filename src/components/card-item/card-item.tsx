import { Camera } from '../../types/types';
import { AppRoutes, RATING_STAR } from '../../const/const';
import { Link } from 'react-router-dom';
type CardItemProps = {
  camera: Camera;
}

function CardItem({camera}: CardItemProps): JSX.Element{
  const {id, previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, rating, reviewCount, price} = camera;
  return(
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}/>
          <img src={previewImg} srcSet={`${previewImg2x} 2x`} width="280" height="240" alt={name} />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            Array.from({length: RATING_STAR}, (_, index) => index).map((value) => (
              <svg key={rating} width="17" height="16" aria-hidden="true">
                <use xlinkHref={value < rating ? '#icon-full-star' : '#icon-star'}></use>
              </svg>
            ))
          }
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price.toLocaleString('ru-RU')} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        {
          // <a className="btn btn--purple-border product-card__btn product-card__btn--in-cart" href="#">
          //   <svg width="16" height="16" aria-hidden="true">
          //     <use xlinkHref="#icon-basket"></use>
          //   </svg>В корзине
          // </a>
        }
        <Link className="btn btn--transparent" to={`${AppRoutes.Product}${id}`}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CardItem;
