import React, { useState, useRef, useEffect } from "react";
import { hideModal } from "../../Redux/features/featSlice";
import { useDispatch } from "react-redux";
import { handleClickOutside } from '../../helper'
import './recipe.css'

const Recipes = () => {

  const dispatch = useDispatch();
  const containerRef = useRef()

  useEffect(() => {
    const cleanup = handleClickOutside(containerRef, dispatch, 'recipes');
    return cleanup;
  }, []);

  const [recipeList, setRecipeList] = useState({
    recipeList: null,
    error: ''
  })
  const [recipe, setRecipe] = useState(null)
  const [recipeInput, setRecipeInput] = useState('')

  // fetching recipes list
  function fetchRecipes() {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeInput}`)
      .then(res => res.json())
      .then(data => {
        if (data.meals) setRecipeList({
          ...recipeList,
          recipeList: data.meals
        })
      })
      .catch(error => {
        setRecipeList({
          ...recipeList,
          error: error.message
        })
        console.error('Error fetching quotes:', error);
      });

    setRecipeInput('')
    setRecipe(null)
  }

  //fetching single recipe ingredient
  function showIngredients(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => setRecipe(data.meals[0]))
    console.log(recipe)
  }

  return (
    <div className="main z-20">
      <div className="inner-main" ref={containerRef}>
        <div className="p-2 heading">
          <h1>Recipes</h1>
        </div>
        <div className="h w-full bg-white min-h-[150px] grid place-content-center rounded p-6">


          {recipeList.recipeList != null && recipe === null ? <h2 className="mb-3 text-lg font-normal">Dishes list -</h2> : null}


          {
            recipe === null ? (
              <ul className={`${recipeList.recipeList != null ? 'recipe-list' : ''}`} >
                {
                  recipeList.recipeList && recipeList.recipeList.map(list => {

                    return (
                      <li className="flex gap-2 text-lg" key={list.idMeal} onClick={() => showIngredients(list.idMeal)}>
                        <div className=" font-medium leading-6 cursor-pointer">
                          {list.strMeal}
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            ) : (
              <div className="mb-3 w-[100%] recipe-list pb-3 text-lg font-normal">
                <p className="font-medium mb-4">
                  {recipe && recipe.strMeal}
                </p>
                <img src={recipe.strMealThumb} className=" rounded-md mb-2" />
                <p className="border-b border-grey mb-2 pb-2"> {recipe.strArea}, {recipe.strCategory}</p>
                <p className="mb-3"> Instructions -</p>
                <div className="bg-white md:p-5 md:pb-0 rounded-md">
                  {
                    recipe.strInstructions.split('. ').map((sentence, index) => (
                      <p key={index} className="mb-4 font-light text-base md:text-lg  text-justify">
                        - {sentence}
                      </p>
                    ))
                  }
                </div>
              </div>
            )
          }

          <input className="input-generic rounded mb-3" placeholder="eg. chicken" onChange={(e) => setRecipeInput(e.target.value)} />

          <button className="button-generic rounded " onClick={fetchRecipes}>Get Recipes</button>
        </div>
      </div>
    </div>
  );
};

export default Recipes;
