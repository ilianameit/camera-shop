import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, filterCategoryParamsState, filterLevelParamState, filterTypeParamState } from '../../const/const';
import { State } from '../../types/state';
import { Camera, CameraCategoryParams, CameraLevelParams, CameraTypeParams, InitialPriceType, SortTypeBy, SortTypeName } from '../../types/types';

export const getCameras = (state: State) => state[NameSpace.Camera].cameras;
export const getPromo = (state: State) => state[NameSpace.Camera].promo;
export const getStatusLoadingCameras = (state: State) => state[NameSpace.Camera].loadingCameras;

export const getOneCamera = (state: State) => state[NameSpace.Camera].oneCamera;
export const getStatusLoadingOneCamera = (state: State) => state[NameSpace.Camera].loadingOneCamera;

export const getSimilarCameras = (state: State) => state[NameSpace.Camera].similarCameras;

export const getPriceFilteredCameras = (state: State) => state[NameSpace.Camera].camerasFilteredByPrice;
export const getStatusLoadingPriceFiltered = (state: State) => state[NameSpace.Camera].camerasFilteredByPriceLoading;

export const getSortedCameras = createSelector(
  [
    (cameras: Camera[], sortingType: SortTypeName | undefined, sortingBy: SortTypeBy | undefined) => ({sortingType, sortingBy, cameras})
  ],
  ({sortingType, sortingBy, cameras}) => {
    switch (sortingType) {
      case 'sortPrice':
        if(sortingBy === 'up') {
          return cameras.slice().sort((a, b) => a.price - b.price);
        }
        return cameras.slice().sort((a, b) => b.price - a.price);
      case 'sortPopular':
        if(sortingBy === 'up') {
          return cameras.slice().sort((a, b) => a.reviewCount - b.reviewCount);
        }
        return cameras.slice().sort((a, b) => b.reviewCount - a.reviewCount);
      default:
        return cameras;
    }
  }
);

export const getFilteredCameras = createSelector(
  [
    (
      cameras: Camera[],
      filterCategoryParams: CameraCategoryParams | undefined | string,
      filterTypeParams: CameraTypeParams | undefined | string,
      filterLevelParams: CameraLevelParams | undefined | string
    ) => ({filterCategoryParams, filterTypeParams, filterLevelParams, cameras})
  ],
  ({filterCategoryParams, filterTypeParams, filterLevelParams, cameras}) => {
    const filterCategories = filterCategoryParams ? filterCategoryParamsState[filterCategoryParams as CameraCategoryParams] : undefined;
    const filterType = filterTypeParams ? filterTypeParamState[filterTypeParams as CameraTypeParams] : undefined;
    const filterLevel = filterLevelParams ? filterLevelParamState[filterLevelParams as CameraLevelParams] : undefined;
    return cameras
      .filter((camera) => {

        if(!filterCategories?.label) {
          return true;
        }
        return camera.category === filterCategories.label;
      })
      .filter((camera) => {
        if(!filterType?.label) {
          return true;
        }
        return camera.type === filterType.label;
      })
      .filter((camera) => {
        if(!filterLevel?.label) {
          return true;
        }
        return camera.level === filterLevel.label;
      });
  }
);

export const getFilteredCamerasRangePrice = createSelector(
  [
    (
      cameras: Camera[],
      priceRange: InitialPriceType,
    ) => ({priceRange, cameras})
  ],
  ({cameras, priceRange}) => cameras
    .filter((camera) => camera.price >= priceRange.from && camera.price <= priceRange.to)
);
