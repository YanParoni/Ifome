import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { returnToInitialState } from '../actions/mainPageRecipe';

function Footer() {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div className="container-fluid fixed-bottom">
      <footer className="row" data-testid="footer">
        <button
          className="btn btn-default col-4"
          type="button"
          data-testid="drinks-bottom-btn"
          onClick={ () => {
            history.push('/bebidas');
            dispatch(returnToInitialState());
          } }

        >
          <img
            className="icon"
            src={ drinkIcon }
            alt="drink-icon"
          />
        </button>
        <button
          className="btn btn-default col-4"
          type="button"
          data-testid="explore-bottom-btn"
          onClick={ () => history.push('/explorar') }
        >
          <img
            className="icon"
            src={ exploreIcon }
            alt="explore-icon"
          />
        </button>
        <button
          className="btn btn-default col-4"
          type="button"
          data-testid="food-bottom-btn"
          onClick={ () => {
            history.push('/comidas');
            dispatch(returnToInitialState());
          } }
        >
          <img
            className="icon"
            src={ mealIcon }
            alt="meal-icon"
          />
        </button>
      </footer>
    </div>
  );
}

export default Footer;
