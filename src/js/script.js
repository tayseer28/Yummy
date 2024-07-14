import { Meal } from './meal.js';
import { Category } from './category.js';
import { Area } from "./area.js";
// import { Ingredient } from "./ingredient.js";
import { User } from "./user.js";
import { Ingredient } from "./ingredient.js";




// document ready function
$(document).ready(function () {
    let meal = new Meal();
    let category = new Category();
    let area = new Area();
    let ingredient = new Ingredient();
    let user = new User();


    $("#sideBar").css("left", `-${$(".colors").innerWidth()}px`);


    function closeSidebarAndShowLoading() {
        // Close the sidebar
        $("#sideBar").animate({
            left: `-${$(".colors").innerWidth()}px`
        }, 500);

        // Change the icon to the bar icon
        $("#sideBar .fa-xmark").removeClass("fa-xmark").addClass("fa-bars");

        // Show the loading layer
        $(".loading-layer").show().animate({ opacity: 1 }, 500);

        // Hide the loading layer after 2 seconds
        setTimeout(function () {
            $(".loading-layer").animate({ opacity: 0 }, 1000, function () {
                $(this).hide();
            });
        }, 500);
    }

    // Initial loading layer animation
    setTimeout(function () {
        $(".loading-layer").animate({ opacity: 0 }, 1000, function () {
            $(this).hide();
        });
    }, 500);

    // Sidebar toggle
    $("#sideBar .fa-bars").on("click", function () {
        if ($("#sideBar").css("left") == "0px") { // If the sidebar is open
            $("#sideBar ul").slideDown(1000);
            $("#sideBar").animate({
                left: `-${$(".colors").innerWidth()}px`
            }, 500);

            // Change the icon to the bar icon
            $(this).removeClass("fa-xmark").addClass("fa-bars");
            $(".colors").removeClass("d-none");
        } else { // If the sidebar is closed
            $("#sideBar").animate({
                left: "0px"
            }, 500);

            // Change the icon to the close icon
            $(this).removeClass("fa-bars").addClass("fa-xmark");
        }
    });

    // Function to handle user actions when the sidebar is open
    function handleUserAction() {
        if ($("#sideBar").css("left") == "0px") { // If the sidebar is open
            closeSidebarAndShowLoading();
        }
    }



    // $("#meals figure").on("mouseover", function () {
    //     $(this).children("figcaption").fadeIn(1000);
    //     console.log($(this).children("figcaption"));
    // }).on("mouseout", function () {
    //     $(this).children("figcaption").fadeOut(1000);
    //     console.log($(this).children("figcaption"));
    // });


    //if we click on the meal figure that display initially we will show the meal details
    $("#meals .container div").on("click", "figcaption", function () {
        let mealName = $(this).find("p").text();
        console.log(mealName);
        // Show the meal details
        meal.showMealDetails(mealName);
        //hide the meal section and show the meal details section
        closeSidebarAndShowLoading();
        $("#meals").css("display", "none", 500);
        $("#mealDetail").css("display", "block", 500);

    });

    // ===================================SideBar events==================================
    // event when i click over the li of the navbar it will show the section that has the same id of the li
    $("#sideBar ul li").on("click", function (event) {

        //get the id of the clicked li
        let elementId = event.target.id;
        console.log(elementId);
        closeSidebarAndShowLoading();
        $("section").css("display", "none", 500);
        $(`#${elementId}Section`).css("display", "block", 500);

        // console.log($(`#${elementId}`).css("display"));

    });


    // ===================================category events==================================
    //when clicl on the category figure
    // $("#categoriesSection .container div").on("click", "figcaption", function () {
    //     console.log("start")
    //     let categoryName = $(this).find("h2").text();
    //     console.log(categoryName);

    //     // $("#meals .container div").empty();
    //     console.log("before show meal that shows themeals inside the category");
    //     let api = category.buildApi(categoryName);
    //     category.showMeal(category.buildApi(categoryName), "#mealsOfCategory");
    //     //disply the meals of the category
    //     $("#categoriesSection").css("display", "none", 500);
    //     $("#mealsOfCategory").css("display", "block", 500);

    //     //if i clcik on the mealOfCategory figure show the meal details
    //     $("#mealsOfCategory .container div").on("click", "figcaption", function (event) {
    //         let mealName = event.target.querySelector("p").textContent;
    //         console.log(mealName);

    //         // Show the meal details
    //         console.log("hello before second similar jquery")
    //         // category.showMealDetails(mealName);
    //         category.showMealDetails(mealName);
    //         //hide the meal section and show the meal details section
    //         $("#mealsOfCategory").css("display", "none", 500);
    //         $("#mealDetail").css("display", "block", 500);
    //     });
    $("#categoriesSection .container div").on("click", "figcaption", function (event) {
        let categoryName = event.target.querySelector("h2").textContent;
        console.log(categoryName);
        closeSidebarAndShowLoading();

        let api = category.buildApi(categoryName);
        category.showMeal(api, "#mealsOfCategory");

        //show the meals of the selected category
        $("#categoriesSection").css("display", "none", 500);
        $("#mealsOfCategory").css("display", "block", 500);

        //when i click on mealsOfCategory figure show the meal details
        $("#mealsOfCategory .container div").on("click", "figcaption", function (event) {
            let mealName = event.target.querySelector("p").textContent;
            console.log(mealName);
            closeSidebarAndShowLoading();
            category.showMealInCategDeatils(mealName);

            $("#mealsOfCategory").css("display", "none", 500);
            $("#mealDetail").css("display", "block", 500);
        });

        //hide the category section and show the meal section
        // $("#categoriesSection").css("display", "none", 500);
        // $("#meals").css("display", "block", 500);


        //then if we click on the meal figure show the meal details
        // $("#categoriesSection .container div").on("click", "figcaption", function (event) {
        //     // let mealName = $(this).find("p").text();
        //     let mealName = event.target.querySelector("p").textContent;
        //     console.log(mealName);

        //     // Show the meal details
        //     console.log("hello before second similar jquery")
        //     category.showMealDetails(mealName);
        //     //hide the meal section and show the meal details section
        //     $("#meals").css("display", "none", 500);
        //     $("#mealDetail").css("display", "block", 500);
        // });
    });


    // ===================================search events==================================
    $("#searchByName , #searchByFirsistChar").on("keyup", function (event) {
        let mealName = event.target.value;
        console.log(mealName);
        meal.searchByName(mealName, "#searchSection");
    });

    // ===================================area events==================================
    // $("#areaSection .container div").on("click", function (event) {
    //     let areaName = event.targer.querySelector("h2").textContent;
    //     console.log(areaName);
    //     area.showMealsOfArea(areaName);
    //     //hide the area section and show the meals in the area section
    //     $("#areaSection").css("display", "none", 500);


    // });
    $("#areaSection .container div").on("click", function (event) {
        let areaName;

        // Use event delegation to target the clicked element correctly
        if (event.target.matches(".flex, .flex i, .flex h2")) {
            areaName = $(event.target).closest(".flex").find("h2").text().trim();
            console.log(areaName);
            closeSidebarAndShowLoading();
            area.showMealsOfArea(areaName);

            // Hide the area section with animation
            $("#areaSection").css("display", "none", 500);
            $("#mealsOfArea").css("display", "block", 500);

            //when i click on mealsOfArea figure show the meal details
            $("#mealsOfArea .container div").on("click", "figcaption", function (event) {
                let mealName = event.target.querySelector("p").textContent;
                console.log(mealName);


                // Show the meal details
                area.showMealOfAreaDetails(mealName);
                closeSidebarAndShowLoading();
                //hide the meal section and show the meal details section
                $("#mealsOfArea").css("display", "none", 500);
                $("#mealDetail").css("display", "block", 500);
            });
        }
    });
    // ===================================ingredient events==================================
    // $("# .container div").on("click", function (event) {
    //     // let ingredientName = event.target.querySelector("h2").textContent;
    //     event.stopPropagation();
    //     console.log(event.target);
    //     // console.log($this, "this");
    //     let ingredientName = event.target.querySelector("h2").value;
    //     console.log(ingredientName);
    //     ingredient.showMealsOfIngredient(ingredientName);
    //     closeSidebarAndShowLoading();
    //     //hide the ingredient section and show the meals in the ingredient section
    //     $("#ingredientsSection").css("display", "none", 500);
    //     $("#mealsOfIngredient").css("display", "block", 500);

    //     //when i click on mealsOfIngredient figure show the meal details
    //     $("#mealsOfIngredient .container div").on("click", "figcaption", function (event) {
    //         let mealName = event.target.querySelector("p").textContent;
    //         console.log(mealName);

    //         // Show the meal details
    //         ingredient.showMealOfIngredientDetails(mealName);
    //         closeSidebarAndShowLoading();
    //         //hide the meal section and show the meal details section
    //         $("#mealsOfIngredient").css("display", "none", 500);
    //         $("#mealDetail").css("display", "block", 500);
    //     });
    // });

    $(document).on("click", "#ingredientsSection .container div", function (event) {
        // let ingredientName = $(this).data - ("ingredients");
        // ingredient.showMealsOfIngredient(ingredientName);
        // console.log(ingredientName);
        // closeSidebarAndShowLoading();

        let ingredientName = $(event.target).find("h2").text();
        console.log(ingredientName);
        ingredient.showMealsOfIngredient(ingredientName);


        //hide the ingredient section and show the meals in the ingredient section
        $("#ingredientsSection").css("display", "none", 500);
        $("#mealsOfIngredient").css("display", "block", 500);

        // $("#mealsOfIngredient .container div").on("click", "figcaption", function (event) {

        //     let mealName = event.target.querySelector("p").textContent;
        //     //         console.log(mealName);

        //     // Show the meal details
        //     ingredient.showMealOfIngredientDetails(mealName);
        //     closeSidebarAndShowLoading();
        //     //hide the meal section and show the meal details section
        //     $("#mealsOfIngredient").css("display", "none", 500);
        //     $("#mealDetail").css("display", "block", 500);

        // });
        $(document).on("click", "#mealsOfIngredients .container figure", function (event) {
            let mealName = $(this).find("p").text();
            console.log(mealName);
    
            // Show the meal details
            ingredient.showMealOfIngredientDetails(mealName);
    
            // Hide the meals section and show the meal details section
            $("#mealsOfIngredients").hide(500);
            $("#mealDetail").show(500);
        });
    });



        // ===================================contacts events==================================
        $("#submitBtn").prop("disabled", true);

        $("#userName, #userEmail, #userPhone, #userAge, #userPassword, #passwordConfirmation").on("focus", function (event) {
            $(event.target).addClass("active");
        });

        // $("#userName , #userEmail , #userPhone , #userAge , #userPassword , #passwordConfirmation").on("keyup", function (event) {
        //     user.validateUser(event.target);
        //     if(user.validatefields())
        //     {
        //         $("#submitBtn").prop("disabled", false);
        //         console.log("disables removed");
        //     }
        //     else
        //     {

        //         $("#submitBtn").prop("disabled", true);
        //         console.log("disables added");
        //     }
        // });
        // Handle focus and keyup events on input fields
        $("#userName, #userEmail, #userPhone, #userAge, #userPassword, #passwordConfirmation").on("keyup", function (event) {
            user.validateUser(event.target);
            enableSubmitButton(); // Check if all fields are valid and enable the submit button
        });

        // Function to enable or disable submit button based on input validation
        function enableSubmitButton() {
            if (user.validatefields()) {
                $("#submitBtn").prop("disabled", false);
            } else {
                $("#submitBtn").prop("disabled", true);
            }
        }
        // $("#submitBtn").hover(
        //     function() {
        //         if ($(this).prop("disabled")) {
        //             $(this).css("cursor", "not-allowed");
        //         }
        //     },
        //     function() {
        //         $(this).css("cursor", "default");
        //     }
        // );
        // Prevent hover effects when button is disabled

        $("#submitBtn").hover(
            function () {
                if (!$(this).prop("disabled")) {
                    // Apply hover effect when button is not disabled
                    $(this).css("background-color", "#f00").css("color", "#fff");
                }
            },
            function () {
                // Reset styles on mouse out
                $(this).css("background-color", "transparent").css("color", "#900");
            }
        );


    });


