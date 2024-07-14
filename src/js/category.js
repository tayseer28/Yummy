import { Meal } from "./meal.js";
export class Category extends Meal {
    #categoryName = "";
    #categoryDescription;
    #categoryImage;
    #categories = [];
    #meals = [];
    constructor() {
        super();
        this.showCategories(this.buildApi(this.#categoryName));

    }
    async showCategories(apiUrl, sectionId = "#categoriesSection") {
        try {
            let categories = await this.getCategories(apiUrl);
            this.#categories = categories;
            // console.log(categories);
            let content = ``;

            categories.forEach(category => {
                let limitWords = this.limitWords(category.strCategoryDescription)
                console.log(limitWords)
                content += `
                <figure class="relative rounded-lg group text-center">
                  <img src="${category.strCategoryThumb}" class="w-full" alt="${category.strCategory}">
                  <figcaption class=" flex flex-col justify-center items-center ">
                    <h2>${category.strCategory}</h2>
                    <p>${limitWords}</p>
                  </figcaption>
                </figure>
                `});
            $(`${sectionId} .container .grid-content`).html(content);

        }
        catch (error) {
            console.log(error);
        }
    }
    buildApi(categoryName = "") {
        this.#categoryName = categoryName;
        let url = this.#categoryName !== ""
            ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.#categoryName}`
            : `https://www.themealdb.com/api/json/v1/1/categories.php`;
        console.log(url);
        return url;
    }
    async getCategories(url) {
        try {
            let response = await fetch(url);
            let categories = await response.json();
            // console.log(categories.categories);
            return categories.categories;
        }
        catch (error) {
            console.log(error);
        }
    }
      async showMealInCategDeatils(mealName) {
        //url: www.themealdb.com/api/json/v1/1/search.php?s=
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
        console.log(mealName, "meal name inside showMealInCategDeatils");
        try
        {
            let meal = await fetch(url);
            let data = await meal.json();
            console.log(data);
            let details = ``;
            //print the meal details
            details += `
            <!-- meal image -->
               <div class="meal-image md:w-2/5">
                    <img src="${data.meals[0].strMealThumb}" class="block w-full mb-1 rounded-lg" alt="${data.meals[0].strMeal}">
                    <h2 class="text-3xl font-bold mb-4 text-white">${data.meals[0].strMeal}</h2>
                </div>

                <!-- meal details -->
          <div class="meal-details md:w-3/5">
                <div class="w-full p-4 text-white">
                  <h3 class="text-3xl font-semibold mb-3">Instructions:</h3>
                 <p class="mb-4 mt-4 tracking-wide">${data.meals[0].strInstructions}</p>
                 <p class="mb-2 text-3xl font-bold">Area: ${data.meals[0].strArea}</p>
                 <p class="mb-4 font-bold text-3xl">Category: ${data.meals[0].strCategory}</p>
              <div class="recipe mb-4">
                <p class="font-semibold text-3xl mb-2">Recipes:</p>
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
              if(data.meals[0].strTags)
              {
                let tags  = data.meals[0].strTags.split(",");
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
    async getMealInCateg(mealName) {
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
        try {
            let meal = await fetch(url);
            let data = await meal.json();
            console.log(data);
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }
    limitWords(text, wordLimit) {
        let words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ');
        }
        return text;
    }
    // setMealsArray(meals)
    // {
    //     this.#meals = meals;
    // }
    // getMealsArray()
    // {
    //     return this.#meals;
    // }

}