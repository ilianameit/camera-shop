import classNames from 'classnames';
import { TabName } from '../../const/const';
import { Description, FeatureItem, TabType } from '../../types/types';
import DescriptionTabContent from '../tabs-content/description-tab-content/description-tab-content';
import FeatureTabContent from '../tabs-content/feature-tab-content/feature-tab-content';

type ProductTabsProps = {
  currentTab: TabType;
  features: FeatureItem;
  description: Description;
  onTabButtonClick: (type: TabType) => void;
}
function ProductTabs({currentTab, features, description, onTabButtonClick}: ProductTabsProps): JSX.Element {
  const { vendorCode, category, type, level } = features;
  return(
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={
            classNames(
              'tabs__control',
              {'is-active': currentTab === TabName.Feature}
            )
          }
          type="button"
          onClick={() => onTabButtonClick(TabName.Feature)}
        >
          Характеристики
        </button>
        <button
          className={
            classNames(
              'tabs__control',
              {'is-active': currentTab === TabName.Description}
            )
          }
          type="button"
          onClick={() => onTabButtonClick(TabName.Description)}
        >
          Описание
        </button>
      </div>
      <div className="tabs__content">
        <div className="tabs__element is-active">
          {
            currentTab === TabName.Feature &&
            <FeatureTabContent vendorCode={vendorCode} category={category} type={type} level={level} />
          }
          {
            currentTab === TabName.Description &&
            <DescriptionTabContent description={description} />
          }
        </div>
      </div>
    </div>
  );
}

export default ProductTabs;
