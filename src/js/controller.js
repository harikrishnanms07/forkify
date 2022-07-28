import * as model from './model.js';
import recipeView from './new/recipeView.js';
import searchView from './new/searchView.js';
import resultsView from './new/resultsView.js';
import bookmarksView from './new/bookmarksView.js';
import PaginationView from './new/paginationView.js';
import addRecipeView from './new/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
//
//

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultsView from './new/resultsView.js';
import searchView from './new/SearchView.js';
import View from './new/view.js';
import paginationView from './new/paginationView.js';
//
// https://forkify-api.herokuapp.com/v2
//
// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;
    recipeView.renderSpinner();

    resultsView.update(model.getSearchResultspage());
    bookmarksView.update(model.state.bookmarks);
    // loading recipe
    await model.loadRecipe(id);
    // controlServings();

    // render recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};
const controlSearchResults = async function () {
  try {
    console.log(resultsView);
    const query = searchView.getQuery();
    if (!query) return;
    resultsView.renderSpinner();
    await model.loadSearchResults(query);
    console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultspage(1));
    //
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
// controlSearchResults();

const controlPagination = function (gotoPage) {
  resultsView.render(model.getSearchResultspage(gotoPage));
  //
  PaginationView.render(model.state.search);
};
const controlServings = function (newservings) {
  model.updateServings(newservings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  //
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
  //
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newrecipe) {
  try {
    addRecipeView.renderSpinner();
    // console.log(newrecipe);
    await model.uploadRecipe(newrecipe);
    console.log(model.state.recipe);
    //
    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();
    //
    bookmarksView.render(model.state.bookmarks);
    //
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('**', err);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
