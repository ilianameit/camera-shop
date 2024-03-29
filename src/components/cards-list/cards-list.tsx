import { memo } from 'react';
import { Camera } from '../../types/types';
import CardItem from '../card-item/card-item';

type CardListProps = {
  cameras: Camera[];
  onBuyClick: (camera: Camera) => void;
}

function CardsListComponent({cameras, onBuyClick}: CardListProps): JSX.Element {
  return(
    <div className="cards catalog__cards" data-testid="cardsList">
      {
        cameras.map((camera) => (
          <CardItem key={`${camera.id}-camera`} camera={camera} onBuyClick={onBuyClick}/>
        ))
      }
    </div>
  );
}

const CardsList = memo(CardsListComponent);
export default CardsList;
