// IIFE Immediately invoked function Expressions
(async function () {
    const response = await fetch("./recipes.json");
    const recipes = await response.json();
  
    const inputEl = document.getElementById("searchInput");
    const btnEl = document.getElementById("searchBtn");
    const listEl = document.getElementById("recipe-list");
    const detailsEl = document.getElementById("recipeDetailsContainer");
  
    function loadRecipeDetails(recipe){
        detailsEl.innerHTML = `
            <div id="recipeDetailsInner" class="card p-2">
                <h2 class="card-title">${recipe.title}</h2>
                <h3>Ingredients</h3>
                <ul class="ingredients">${recipe.ingredients.map(function (ingredient){
                    return "<li>" + ingredient + "</li>"
                }).join("")}
                </ul>
                <h3>Instructions</h3>
                <p class="instructions card-text">${recipe.instructions}</p>
            </div>
        `
    }

    function displaySearchResearch(results){
        listEl.innerHTML = ""
        results.forEach(function(recipe){
            const li = document.createElement("li")
            const listItem = `
                <h3 class="title">${recipe.title}</h3>
                <p class="description">${recipe.description}</p>
            `
            li.innerHTML = listItem
            li.addEventListener("click",function () {
                loadRecipeDetails(recipe)
            })
            listEl.appendChild(li)
        })

    }
    
    function search() {
        const query = inputEl.value.toLowerCase();
        const results = recipes.filter(function (recipe) {
          return (recipe.title.toLowerCase().includes(query) ||
          recipe.ingredients.join(" ").toLowerCase().includes(query))
        });
    
        displaySearchResearch(results);
      }
    
      btnEl.addEventListener("click", search);
})();