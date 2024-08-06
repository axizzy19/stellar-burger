import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  clearAll,
  selectConstructorItems
} from '../../slices/constructorSlice';
import {
  closeOrderRequest,
  newOrder,
  selectOrderModalData,
  selectOrderRequest
} from '../../slices/newOrderSlice';
import { selectIsAuthenticated } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useAppSelector(selectConstructorItems);

  const orderRequest = useAppSelector(selectOrderRequest);

  const orderModalData = useAppSelector(selectOrderModalData);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login', { replace: true });
    }

    if (constructorItems.bun._id && constructorItems.ingredients.length) {
      const ingredientsIndexes = constructorItems.ingredients.map(
        (item) => item._id
      );
      dispatch(
        newOrder([
          constructorItems.bun._id,
          ...ingredientsIndexes,
          constructorItems.bun._id
        ])
      );
    }
  };

  const closeOrderModal = () => {
    dispatch(closeOrderRequest());
    dispatch(clearAll());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price! * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
