document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  
    // Limpiar resultados previos
    document.getElementById('resultsContainer').innerHTML = '';
  
    // Realizar la petición a la API
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          data.meals.forEach(meal => {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');
            card.innerHTML = `
              <div class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <button class="btn btn-info" data-toggle="modal" data-target="#recipeModal" onclick="showRecipeDetails('${meal.idMeal}')">Ver Detalles</button>
                </div>
              </div>
            `;
            document.getElementById('resultsContainer').appendChild(card);
          });
        } else {
          alert('No se encontraron recetas.');
        }
      })
      .catch(error => {
        console.error('Error al obtener las recetas:', error);
      });
  });
  
  function showRecipeDetails(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const meal = data.meals[0];
        document.getElementById('recipeModalLabel').innerText = meal.strMeal;
        document.getElementById('recipeImage').src = meal.strMealThumb;
        document.getElementById('recipeInstructions').innerText = meal.strInstructions;
      })
      .catch(error => {
        console.error('Error al obtener detalles de la receta:', error);
      });
  }
  