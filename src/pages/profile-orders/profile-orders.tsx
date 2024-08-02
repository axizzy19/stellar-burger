import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useEffect } from 'react';
import { useAppSelector, useDispatch } from '../../services/store';
import { getUserOrders, selectOrders } from '../../slices/userOrdersSlice';
import { getIngredientsList } from '../../slices/ingredientsSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useAppSelector(selectOrders);
  return <ProfileOrdersUI orders={orders} />;
};
