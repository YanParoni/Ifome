import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import randomFetch from '../service/apiRandomRecipe';

function Explore({ localOrigin, mealOrDrink }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { dataApi } = useSelector(({ randomRecipe }) => randomRecipe);

  React.useEffect(() => {
    async function fetchDidMount() {
      const trar = mealOrDrink;
      dispatch(await randomFetch(trar));
    }
    fetchDidMount();
  }, [dispatch, mealOrDrink]);

  const checker = () => {
    if (mealOrDrink === 'comidas') {
      return dataApi.meals && dataApi.meals.map((e) => e.idMeal);
    }
    return dataApi.drinks && dataApi.drinks.map((e) => e.idDrink);
  };

  const random = checker();
  return (
    <div className="container">
      <div className="row">
        <div className="explore-card col-12">
          <button
            className="btn col-12"
            type="button"
            data-testid="explore-by-ingredient"
            onClick={() => {
              history.push(`/explorar/${mealOrDrink}/ingredientes`);
            }}
          >
            <span className="rec-name">Por Ingredientes </span>
          </button>
        </div>

        {localOrigin && (
          <div className="explore-card col-12">
            <button
              className="btn col-12"
              type="button"
              data-testid="explore-by-area"
              onClick={() => {
                history.push(`/explorar/${mealOrDrink}/area`);
              }}
            >
              <span className="rec-name"> Por Local de Origem </span>
            </button>
          </div>
        )}
        <div className="explore-card col-12">
          <button
            className="btn col-12"
            type="button"
            data-testid="explore-surprise"
            onClick={() => {
              history.push(`/${mealOrDrink}/${random}`);
            }}
          >
            <span className="rec-name">Me Surpreenda!</span>
          </button>
        </div>
      </div>
    </div>
  );
}

Explore.propTypes = {
  localOrigin: PropTypes.bool.isRequired,
  mealOrDrink: PropTypes.string.isRequired,
};

export default Explore;
