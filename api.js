// API Module - Handles all API communications
//  Users TheMealDB API (free, no key required)
// Reference: https://www.themealdb.com/api.php

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

/**
 * Requirements Use fetch API to communicate with external API
 * Reference: MDN Web Docs - Fetch API
 * Searches for recipes by name
 */

export async function searchRecipesByName(query) {
  try {
    const response = await fetch(`${API_BASE_URL}/search.php?s=${query}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.meals || [];
  } catch (err) {
    console.error("Error searching recipes;", error);
    throw new Error("Failed to search recipes. Please try again.");
  }
}

export async function getRecipesByCategory(category) {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.meals || [];
  } catch (err) {
    console.error("Error fetching recipes by category;", error);
    throw new Error("Failed to fetch recipes by category.");
  }
}

export async function getRecipesByID(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.meals ? data.meals[0] : null;
  } catch (err) {
    console.error("Error fetching recipes details;", error);
    throw new Error("Failed to fetch recipe details.");
  }
}

export async function getRandomRecipe() {
  try {
    const response = await fetch(`${API_BASE_URL}/random.php?`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    resolve(data.meals[0]);
  } catch (err) {
    console.error("Error fetching recipes details;", error);
    throw new Error("Failed to fetch recipe details.");
  }
}


export async function getMultipleRandomRecipes(count = 6) {
  try {
    const promises = [];
    for (let i = 0; i < count; i++) {
      promises.push(getRandomRecipe());
    }


    const recipes = await Promise.all(promises);
    return recipes;
  } catch (err) {
    console.error("Error fetching multip;e random recipes:", error);
    throw new Error("Failed to fetch recipes.");
  }
}

export async function getAllCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories.php?`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.categories || [];
  } catch (err) {
    console.error("Error fetching categories;", error);
    throw new Error("Failed to fetch category.");
  }
}