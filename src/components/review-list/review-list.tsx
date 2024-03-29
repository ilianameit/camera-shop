import { memo, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getReviews } from '../../store/review/selectors';
import { sortByDate } from '../../utils/common';
import { fetchReviewsAction } from '../../store/api-actions';
import ReviewItem from '../review-item/review-item';
import { Id, Review } from '../../types/types';

type ReviewListProps = {
  id: Id;
  onReviewClick: () => void;
}

const REVIEWS_PER_COUNT = 3;

function ReviewListComponent({id, onReviewClick}: ReviewListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const reviews = useAppSelector(getReviews);
  const reviewsSorted = useMemo(() => reviews.slice().sort(sortByDate), [reviews]);

  const [shownReviews, setShownReviews] = useState(REVIEWS_PER_COUNT);

  const currentPerReviews: Review[] = useMemo(() => reviewsSorted.slice(0, shownReviews), [reviewsSorted, shownReviews]);

  function handleLoadReviewsClick() {
    setShownReviews((prevShownReviews) => prevShownReviews + REVIEWS_PER_COUNT);
  }
  useEffect(() => {
    dispatch(fetchReviewsAction(id));
  }, [dispatch, id]);

  return(
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button
              className="btn"
              type="button"
              onClick={onReviewClick}
            >
              Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {
              currentPerReviews.map((review) =>
                <ReviewItem key={review.id} review={review}/>
              )
            }
          </ul>
          {
            shownReviews < reviews.length &&
            <div className="review-block__buttons">
              <button
                className="btn btn--purple"
                type="button"
                onClick={handleLoadReviewsClick}
              >
                Показать больше отзывов
              </button>
            </div>
          }
        </div>
      </section>
    </div>
  );
}

const ReviewList = memo(ReviewListComponent);
export default ReviewList;
