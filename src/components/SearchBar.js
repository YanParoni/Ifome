import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import searchCase from '../service/apiSearchBar';

function SearchBar({ mealOrDrink }) {
  const stateReduxSearch = useSelector(({ searchItems }) => searchItems);
  const [search, setSearch] = React.useState('');
  const [radioQuery, setRadioQuery] = React.useState('');
  const dispatch = useDispatch();
  const { dataApi } = stateReduxSearch;
  const comidasOuBebidas = mealOrDrink === 'meal' ? 'comidas' : 'bebidas';
  const mealsOrDrinks = mealOrDrink === 'meal' ? 'meals' : 'drinks';
  const caseMOrD = mealOrDrink === 'meal' ? 'Meal' : 'Drink';

  React.useEffect(() => {
    if (dataApi[mealsOrDrinks] === null && !stateReduxSearch.loading) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.'); // eslint-disable-line no-alert
    }
  }, [dataApi, mealsOrDrinks, stateReduxSearch.loading]);

  return (
    <div className="container">
      <input
        className="form-control"
        type="text"
        placeholder="Buscar Receita"
        data-testid="search-input"
        value={search}
        onChange={({ target }) => setSearch(target.value)}
      />
      <button
        className="btn btn-default "
        data-testid="exec-search-btn"
        type="button"
        onClick={async () => {
          if (search.length > 1 && radioQuery === 'primeiraletra') {
            alert('Sua busca deve conter somente 1 (um) caracter'); // eslint-disable-line no-alert
          }
          dispatch(await searchCase(mealOrDrink, radioQuery, search));
        }}
      >
        Buscar
      </button>

      <div className="form-check form-check-inline ml-2">
        <input
          className="form-check-input"
          type="radio"
          data-testid="ingredient-search-radio"
          value="ingrediente"
          onChange={({ target }) => setRadioQuery(target.value)}
          name="cases"
        />      
        

       Ingrediente
        </div>
        <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          data-testid="name-search-radio"
          value="nome"
          onChange={({ target }) => setRadioQuery(target.value)}
          name="cases"
        />
        Nome
        </div>
        <div className="form-check form-check-inline">

        <input
          className="form-check-input"
          type="radio"
          data-testid="first-letter-search-radio"
          value="primeiraletra"
          onChange={({ target }) => {
            setRadioQuery(target.value);
            if (search.length > 1) {
              alert('Sua busca deve conter somente 1 (um) caracter'); // eslint-disable-line no-alert
            }
          }}
          name="cases"
        />
        Primeira letra
        </div>

      {stateReduxSearch.giveId && (
        <Redirect
          to={`/${comidasOuBebidas}/${
            dataApi[mealsOrDrinks][0][`id${caseMOrD}`]
          }`}
        />
      )}
    </div>
  );
}

SearchBar.propTypes = {
  mealOrDrink: PropTypes.string.isRequired,
};

export default SearchBar;
