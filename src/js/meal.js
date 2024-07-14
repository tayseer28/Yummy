export class Meal{

    // #id = 0;
    // #category = "";
    // #mealImage = "";
    #mealName = "";
    #meals = [];
    constructor() {
        // this.#id = id;
        // this.#mealImage = mealImage;
        this.showMeal(this.buildAP(this.#mealName));
        //when click on the meal(figure) show the meal details
    }
    async showMeal(apiUrl, sectionId = "#meals") {
        try {
            let meals = await this.getMeal(apiUrl);
            this.#meals = meals;
            // console.log(meals);
            let content = ``;
            meals.forEach(meal => {
                content += `
                <figure class="relative rounded-lg group transition-all duration-1000">
                  
                  <img src="${meal.strMealThumb}" class="w-full" alt="${meal.strMeal}">
                  
                  <figcaption class = "caption flex items-center justify-start">
                    <p class = "text-black text-2xl font-bold">${meal.strMeal}</p>
                  </figcaption>
                </figure>
                `});
            $(`${sectionId} .container .grid-content`).html(content);
            console.log(`${sectionId}`);
        }
        catch (error) {
            console.log(error);
            //if meals in null or empty do not display the meals
            $(`${sectionId} .container .grid-content`).html("No meals found");


        }

    }
    buildAP(mealName) {
        //if the meal name is one character
        const url = mealName.length === 1 ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealName}` :
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

        // url: www.themealdb.com/api/json/v1/1/search.php?s=
        // const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
        // const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
        return url;

    }
    async getMeal(url) {
        try {
            let response = await fetch(url);
            let meals = await response.json();
            return meals.meals;
        }
        catch (error) {
            console.log(error);
        }

    }
    showMealDetails(mealName) {
        
        console.log(this.#meals);
        console.log("meals array in meal class");
        let meal = this.#meals.find(meal => meal.strMeal === mealName);
        
        let details = ``;
        // let ingredients = meal.strIngredients;
        details += `
            <!-- meal image -->
          <div class="meal-image md:w-2/5">
            <img src="${meal.strMealThumb}" class="block w-full mb-1 rounded-lg" alt="${meal.strMeal}">
            <h2 class="text-3xl font-bold mb-4 text-white">${meal.strMeal}</h2>
          </div>

          <!-- meal details -->
          <div class="meal-details md:w-3/5">
            <div class="w-full p-4 text-white">
              <h3 class="text-3xl font-semibold mb-3">Instructions:</h3>
              <p class="mb-4 mt-4 tracking-wide">${meal.strInstructions}</p>
              <p class="mb-2 text-3xl font-bold">Area: ${meal.strArea}</p>
              <p class="mb-4 font-bold text-3xl">Category: ${meal.strCategory}</p>
              <div class="recipe mb-4">
                <p class="font-semibold text-3xl mb-2">Recipes:</p>
                <div class="flex flex-wrap">
                `;
        for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== "") {//we use trim to remove any white space
                details += `<span class="py-2 px-1 bg-[#CFF4FC] text-[#055160] m-2 rounded-xl">${measure}  ${ingredient}</span>`;
            } else {
                break;
            }
        }
        details += `
                </div>
              </div>`
            if (meal.strTags) {
                let tags = meal.strTags.split(",");
                details += `<div class="tags mb-4">

                             <p class="font-semibold  text-2xl">Tags:</p>`
                tags.forEach(tag => {
                    details += `<span class = "p-2 bg-red-200 rounded-lg mt-3 me-3 inline-block">${tag}</span>`;
                });
                details += `</div> `
                details += `            
              <div class="group-button flex space-x-4">
                <button class="p-3 bg-[#198754] hover:bg-[#13653f] transition-all duration-300 text-black rounded" onclick="window.open('${meal.strSource}', '_blank')" >Source</button>
                <button class="p-3 bg-red-500 text-white rounded" onclick ="window.open('${meal.strYoutube}')">YouTube</button>
              </div>
            </div>
        </div>
      </div>`
                $("#mealDetail #mainContent").html(details);
            }

    }
    searchByName(mealName, sectionId) {
        //get the value of the input
        this.#mealName = mealName;
        //build the api
        let apiUrl = this.buildAP(mealName);
        //get the meal
        this.showMeal(apiUrl, sectionId);


    }
    setMealsArray(meals) {
        this.#meals = meals;
    }
    getMealsArray() {
        return this.#meals;
    }
}