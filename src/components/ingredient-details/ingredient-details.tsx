import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { useNavigate, useParams } from 'react-router-dom';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useEffect } from 'react';
import { useAppSelector, useDispatch } from '../../services/store';
import {
  getIngredientsList,
  selectIngredients,
  selectIngredientsState
} from '../../slices/ingredientsSlice';
import { useSelector } from 'react-redux';

export const IngredientDetails: FC = () => {
  const params = useParams<{ id: string }>();
  const { ingredients } = useSelector(selectIngredientsState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredientsList());
    }
  }, []);

  /** TODO: взять переменную из стора */
  const ingredientData = useAppSelector(selectIngredients).find(
    (item) => item._id === params.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
