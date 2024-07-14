export class Ingredient {
    #ingredientName = ``;
    #ingredients = [];
    constructor() {
        this.showIngredients(this.buildApi(this.#ingredientName));
    }
    async showIngredients(apiUrl, sectionId = "#ingredientsSection") {
        console.log("hello from showIngredients");
        try {
            let ingredients = await this.getIngredients(apiUrl);
            this.#ingredients = ingredients;
            console.log(ingredients);


            //display 20 items of the reults
            let limitedIngredients = ingredients.slice(0, 20);
            console.log(limitedIngredients);


            let content = ``;
            limitedIngredients.forEach(ingredient => {
                let limitWords = this.limitWords(ingredient.strDescription, 20);
                console.log(limitWords)
                content += `
                    <div class="cursor-pointer" data-ingredients="${ingredient.strIngredient}">
                    <i class="fa-solid fa-drumstick-bite text-7xl block text-white text-center "></i>
                    <h2 class = "text-white text-center font-bold text-2xl">${ingredient.strIngredient}</h2>
                    <p class = "text-white text-center w-full overflow-hidden mb-3" >${limitWords}</p>
                  
                  </div>
                `});
            console.log(content);
            $(`#ingredientsSection .container .grid-content`).html(content);

        }
        catch (error) {
            console.log(error);
        }
    }

    buildApi(ingredientName = ``) {
        this.#ingredientName = ingredientName;
        console.log(this.#ingredientName);
        let url = this.#ingredientName !== ``
            ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.#ingredientName}`
            : `https://www.themealdb.com/api/json/v1/1/list.php?i=list`;
        console.log(url);
        return url;
    }

    async getIngredients(url) {
        try {
            let response = await fetch(url);
            let ingredients = await response.json();
            console.log(ingredients, "before flat");
            // console.log(ingredients.meals);

            //we need toconvert the nested array to a single array
            // let rowArray = ingredients.meals.flat();
            // console.log(rowArray);
            // console.log(rowArray, "after flat");
            // return ingredients.meals;
            // return rowArray;
            return ingredients.meals;
        }
        catch (error) {
            console.log(error);
        }
    }

    limitWords(text, wordLimit) {
        let words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ');//return the first 20 words
        }
        return text;
    }
    async showMealsOfIngredient(ingredientName) {
        let meals = await this.getIngredients(ingredientName);
        meals = Array.from(meals || []); // Ensure meals is an array
        console.log(meals);
        let content = ``;
        meals.forEach(meal => {
            content += `
                <figure class="relative rounded-lg group">
                  <img src="${meal.strMealThumb}" class="w-full" alt="${meal.strMeal}">
                  <figcaption class=" ">
                    <p>${meal.strMeal}</p>
                  </figcaption>
                </figure>
                `;
        });
        $(`#mealsOfIngredient .container .grid-content`).html(content);
    }
    async showMealOfIngredientDetails(mealName) {
        //get meals array of that url: https://www.themealdb.com/api/json/v1/1/search.php?s={mealName}
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
        try {
            let meal = await fetch(url);
            let data = await meal.json();
            console.log(data);
            let details = ``;
            //print the meal details
            details += `
            <!-- meal image -->
                <div class="meal-image>
                    <img src="${data.meals[0].strMealThumb}" class="block w-full mb-1 rounded-lg" alt="${data.meals[0].strMeal}">
                    <h2 class="text-2xl font-bold mb-4 text-white">${data.meals[0].strMeal}</h2>
                </div>

             <!-- meal details -->
            <div class="meal-details">
                <div class="w-full p-4 text-white">
                  <h3 class="text-xl font-semibold mb-3">Instructions:</h3>
                 <p class="mb-4 mt-4">${data.meals[0].strInstructions}</p>
                 <p class="mb-2">Area: ${data.meals[0].strArea}</p>
                 <p class="mb-4">Category: ${data.meals[0].strCategory}</p>
              <div class="recipe mb-4">
                <p class="font-semibold mb-2">Recipes:</p>
                <div class="flex flex-wrap">
                `;
            for (let i = 1; i <= 20; i++) {
                let ingredient = data.meals[0][`strIngredient${i}`];
                let measure = data.meals[0][`strMeasure${i}`];
                if (ingredient && ingredient.trim() !== "") {//we use trim to remove any white space
                    details += `<span class="py-2 px-1 bg-[#CFF4FC] text-[#055160] m-2 rounded-xl">${measure}  ${ingredient}</span>`;
                } else {
                    break;
                }
            }
            details += `
                </div>
              </div>`
            if (data.meals[0].strTags) {
                let tags = data.meals[0].strTags.split(",");
                details += `<div class="tags mb-4">

                             <p class="font-semibold  text-2xl">Tags:</p>`
                tags.forEach(tag => {
                    details += `<span class = "p-2 bg-red-200 rounded-lg mt-3 me-3 inline-block">${tag}</span>`;
                });
                details += `</div> `
                details += `            
              <div class="group-button flex space-x-4">
                <button class="p-3 bg-[#198754] hover:bg-[#13653f] transition-all duration-300 text-black rounded" onclick="window.open('${data.meals[0].strSource}', '_blank')" >Source</button>
                <button class="p-3 bg-red-500 text-white rounded" onclick ="window.open('${data.meals[0].strYoutube}')">YouTube</button>
              </div>
            </div>
        </div>
      </div>`
                $("#mealDetail #mainContent").html(details);
            }
        }
        catch (error) {
            console.log(error);
        }

    }
}