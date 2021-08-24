import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { apiDetailsId } from '../service/apiDetailsId';
import Recomendation from '../components/Detail/Recomendation';
import ButtonStart from '../components/Detail/ButtonStart';
import ShareAndFavorite from '../components/ShareAndFavorite';

function RecipesId({ match }) {
  const { params, path } = match;
  const { id } = params;
  const typeDrinkorMeal = path.split('/')[1];
  const dispatch = useDispatch();
  const { dataApi, loading } = useSelector(({ detailsId }) => detailsId);
  const { drinks } = dataApi;
  const { meals } = dataApi;
  const mealsOrDrinks = typeDrinkorMeal === 'comidas' ? 'meals' : 'drinks';
  const [detail, setDetail] = useState({
    idItem: 0,
    title: '',
    imgThumb: '',
    category: '',
    instructions: '',
    instructionsIT: '',
    ingredient: [],
    video: '',
    alcoholic: '',
    tags: [],
    update: true,
  });

  const { title, imgThumb, category, instructions, video, update, ingredient } =
    detail;

  function getReduxMealsOrDrinks() {
    if (drinks !== undefined) {
      // console.log(dataApi[mealsOrDrinks][0][`str${MealOrDrink}`]);
      const {
        idDrink,
        strDrink,
        strDrinkThumb,
        strCategory,
        strAlcoholic,
        strInstructions,
        strVideo,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strTags,
      } = drinks[0];
      setDetail({
        idItem: idDrink,
        title: strDrink,
        imgThumb: strDrinkThumb,
        category: strAlcoholic,
        alcoholic: strCategory,
        instructions: strInstructions,
        video: strVideo,
        ingredient: [
          `${strIngredient1} ${strMeasure1}`,
          `${strIngredient2} ${strMeasure2}`,
          `${strIngredient3} ${strMeasure3}`,
          `${strIngredient4} ${strMeasure4}`,
          `${strIngredient5} ${strMeasure5}`,
        ],
        tags: strTags,
        update: false,
      });
    }
    if (meals !== undefined && !loading) {
      // console.log(dataApi[mealsOrDrinks][0][`str${MealOrDrink}`]);
      const {
        idMeal,
        strMeal,
        strMealThumb,
        strCategory,
        strInstructions,
        strYoutube,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strTags,
      } = meals[0];
      setDetail({
        idItem: idMeal,
        title: strMeal,
        imgThumb: strMealThumb,
        category: strCategory,
        instructions: strInstructions,
        ingredient: [
          `${strIngredient1} ${strMeasure1}`,
          `${strIngredient2} ${strMeasure2}`,
          `${strIngredient3} ${strMeasure3}`,
          `${strIngredient4} ${strMeasure4}`,
          `${strIngredient5} ${strMeasure5}`,
          `${strIngredient6} ${strMeasure6}`,
          `${strIngredient7} ${strMeasure7}`,
          `${strIngredient8} ${strMeasure8}`,
        ],
        video: strYoutube,
        tags: strTags,
        update: false,
      });
    }
  }

  if (update === true) {
    getReduxMealsOrDrinks();
  }

  useEffect(() => {
    async function getApi() {
      dispatch(
        await apiDetailsId(
          typeDrinkorMeal === 'comidas' ? 'meals' : 'drinks',
          id
        )
      );
    }
    getApi();
  }, [dispatch, id, typeDrinkorMeal]);
  const urlVideo = video.replace('watch?v=', 'embed/');
  return (
    <div className="container ">
      <div className="row">
        <img
          data-testid="recipe-photo"
          className="col-8 xl-8 offset-2 recipe-photo"
          src={imgThumb}
          alt={title}
          width="30%"
        />
      </div>

      <div className="row">
        <h1 className="col-8 xl-8  recipe-title" data-testid="recipe-title">
          {title}
        </h1>
        <ShareAndFavorite
        share
        favorite
        data={dataApi[mealsOrDrinks]}
        testFavorite="favorite-btn"
        testShare="share-btn"
        comidasOuBebidas={typeDrinkorMeal}
        id={id}
      />
      </div>

    
      <h2 className='m-5 recipe-title' data-testid="recipe-category ">Type of dish: {category}</h2>
      <h2>Ingredients</h2>
      <ul className='list-group list-group-flush mb-5 '>

      {ingredient.map((item, index) => (
        <li className='list-group-item' data-testid={`${index}-ingredient-name-and-measure`} key={index}>
          {item}
        </li >
      ))}
              </ul>

        <h2>Instructions</h2>
        
      <span className='m-5 recipe-title' data-testid="instructions">{instructions}</span>
      <div className='container-fluid'>
          <div className='row'>
      {video &&  <iframe   title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen className='col-12 m-5' width="420" height="400"
src={urlVideo}>
</iframe> 
      }</div>
      </div>
      <Recomendation
        recomendInverse={typeDrinkorMeal === 'comidas' ? 'meals' : 'drinks'}
      />
      <ButtonStart typeDrinkorMeal={typeDrinkorMeal} detail={detail} />
    </div>
  );
}

export default RecipesId;

RecipesId.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
