$(document).ready(async function () {
  $(".loading").css("z-index", "100");
  await searchByNameEvent(" ");
});

const defaultImg = "../images/default.png";
let selectedIngredient,
  selectedArea,
  areaData,
  ingredientsData,
  mealDataId,
  data,
  selectedMealIndex,
  searchValue,
  CategoryData,
  mealByCategoryData;
let selectedMeal;
let selectedCategory;
let nameElement,
  emailElement,
  phoneElement,
  ageElement,
  passElement,
  RePassElement;

function setSearchContainer() {
  $(".htmlContainer").html("");
  $(".htmlContainer").html(`<div class="container">
      <div class="row search-bar g-3 pb-4">
        <div class="col-md-6">
          <div class="search search-name">
            <input
              type="text"
              class="form-control form-changes"
              id="searchName"
              placeholder="Search By Name"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="search search-first-litter">
            <input
              maxlength="1"
              type="text"
              class="form-control form-changes"
              id="searchFirsLetter"
              placeholder="Search By First Letter"
            />
          </div>
        </div>
      </div>
      <div class="row g-4" id="searchMeals"></div>
    </div>`);
}
function setCookingContainer() {
  $(".htmlContainer").html("");
  $(".htmlContainer").html(`<div class="container">
        <div class="row">
          <div class="col-md-4">
            <img
            id="cookImg"
              src=""
              alt=""
              class="w-100 rounded-2"
            />
            <h2 id="cookingName" class="mt-2 text-white"></h2>
          </div>
          <div class="col-md-8">
            <h3>Instructions</h3>
            <p id="cookingInstructions">
              
            </p>
            <h3 id="cookingArea">Area : <span></span></h3>
            <h3 id="cookingCategory">Category : <span></span></h3>
            <h3 id="cookingRecipes">Recipes :</h3>
            <ul class="list-unstyled gap-2 ps-2 d-flex flex-wrap"> 
            </ul>
            <h3 id="cookingTags">Tags :</h3>
            <ul class="list-unstyled gap-2 ps-2 mb-3 d-flex flex-wrap">
              <li class="alert mb-0 p-1 alert-danger"></li>
              <li class="alert mb-0 p-1 alert-danger"></li>
            </ul>

            <a href="" target="_blank" id="cookingSource" class="btn btn-success">Source</a>
            <a href="" target="_blank" id="cookingYoutube" class="btn btn-danger">Youtube</a>
          </div>
        </div>
      </div>`);
}
function setMealContainer() {
  $(".htmlContainer").html("");
  $(".htmlContainer").html(`<div class="container">
        <div class="row g-4" id="searchMeals">
        </div>
      </div>`);
}
function setCategoryContainer() {
  $(".htmlContainer").html("");
  $(".htmlContainer").html(`<div class="container">
        <div class="row g-4" id="categoryContainer">
        </div>
      </div>`);
}
function setAreaContainer() {
  $(".htmlContainer").html("");
  $(".htmlContainer").html(`<div class="container">
        <div class="row g-4" id="countryContainer">
        </div>
      </div>`);
}
function setIngredientsContainer() {
  $(".htmlContainer").html("");
  $(".htmlContainer").html(`<div class="container">
        <div class="row g-4" id="ingredientsContainer">
          
        </div>
      </div>`);
}
function setContactContainer() {
  $(".htmlContainer").html("");
  $(".htmlContainer").html(`<div
      class="m-n min-vh-100 d-flex justify-content-center align-items-center"
    >
      <div class="container">
        <div class="row m-auto ">
          <div class="col-md-6">
            <div class="form-inner">
              <input
                type="text"
                class="form-control form-changes mt-3"
                id="userName"
                placeholder="Enter your name"
              />
              <p class="mt-2 p-2 d-none alert alert-danger">
                Special characters and numbers not allowed
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-inner">
              <input
                type="email"
                class="form-control form-changes mt-3"
                id="userEmail"
                placeholder="Enter your email"
              />
              <p class="mt-2 p-2 d-none alert alert-danger">
                Email not valid *exemple@yyy.zzz
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-inner">
              <input
                type="tel"
                class="form-control form-changes mt-3"
                id="userPhone"
                placeholder="Enter your Phone"
              />
              <p class="mt-2 p-2 d-none alert alert-danger">
                Enter valid Phone Number
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-inner">
              <input
                type="number"
                class="form-control form-changes mt-3"
                id="userAge"
                placeholder="Enter your Age"
              />
              <p class="mt-2 p-2 d-none alert alert-danger">Enter valid age</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-inner">
              <input
                type="password"
                class="form-control form-changes mt-3"
                id="userPassword"
                placeholder="Enter your password"
              />
              <p class="mt-2 p-2 d-none alert alert-danger">
                Enter valid password *Minimum eight characters, at least one
                letter and one number:*
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-inner">
              <input
                type="password"
                class="form-control form-changes mt-3"
                id="userRePassword"
                placeholder="Re-password"
                
              />
              <p class="mt-2 p-2 d-none alert alert-danger">
                No Match, Enter valid re-password
              </p>
            </div>
          </div>
          <div class="col-12">
            <div class="d-flex justify-content-center align-items-center">
              <button
                type="button"
                class="mt-4 btn btn-outline-danger disabled login"
                id="signup"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>`);
}

$("#navSearch").click(function () {
  closeNav();
  $(".loading").fadeIn(300);
  setSearchContainer();
  $(".loading").fadeOut(300);
});

$("#navCategory").click(async function (e) {
  closeNav();
  $(".loading").fadeIn(300);
  setCategoryContainer();

  await GetCategory();
  CategoryData.categories
    ? CategoryData.categories.sort((a, b) =>
        a.strCategory.localeCompare(b.strCategory)
      )
    : (CategoryData = { categories: [] });
  displayCategory();
  $(".loading").fadeOut(300);
});

$("#navArea").click(async function (e) {
  closeNav();
  $(".loading").fadeIn(300);
  setAreaContainer();

  await GetArea();
  areaData.meals
    ? areaData.meals.sort((a, b) => a.strArea.localeCompare(b.strArea))
    : (CategoryData = { categories: [] });
  displayArea();
  $(".loading").fadeOut(300);
});

$("#navIngredients").click(async function (e) {
  closeNav();
  $(".loading").fadeIn(300);
  setIngredientsContainer();

  await GetIngredients();
  displayIngredients();
  $(".loading").fadeOut(300);
});

$("#navContact").click(function () {
  closeNav();
  $(".loading").fadeIn(300);
  setContactContainer();
  $(".loading").fadeOut(300);
  nameElement = document.getElementById("userName");
  emailElement = document.getElementById("userEmail");
  phoneElement = document.getElementById("userPhone");
  ageElement = document.getElementById("userAge");
  passElement = document.getElementById("userPassword");
  RePassElement = document.getElementById("userRePassword");
});

// ? ////////////////////////////////////////////////////////////////////////
// nav //
$("body").on("click", ".fa-align-justify", async function () {
  openNav();
});
$("body").on("click", ".fa-x", async function () {
  closeNav();
});
closeNav();
function openNav() {
  $(".nav-content-ul").slideUp(0);
  $(".nav-side-bar").animate({ left: 0 }, 500, function () {
    $(".nav-content-ul").slideDown(300);
  });
  $(".change-nav").addClass("fa-x");
  $(".change-nav").removeClass("fa-align-justify");
}
function closeNav() {
  $(".nav-content-ul").slideUp(300, function () {
    $(".nav-side-bar").animate({ left: "-254px" }, 500);
  });
  $(".change-nav").removeClass("fa-x");
  $(".change-nav").addClass("fa-align-justify");
}

// ? ////////////////////////////////////////////////////////////////////////
// search //

async function getMealById(name) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`
  );
  mealDataId = await response.json();
  selectedMeal = mealDataId.meals[0];
}
async function search(method, param, name = "a") {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/${method}.php?${param}=${name}`
  );
  data = await response.json();
}
async function setSearch(searchVal, method, param) {
  $(".loading").fadeIn(300);
  await search(method, param, searchVal);
  data.meals
    ? data.meals.sort((a, b) => a.strMeal.localeCompare(b.strMeal))
    : (data = { meals: [] });
  displayMeals("#searchMeals", data.meals);
  $(".loading").fadeOut(300);
}
function displayMeals(element, receivedData) {
  $(element).html("");

  for (i = 0; i < receivedData.length; i++) {
    $(element).append(`<div class="col-md-3">
            <div
              class="meal-card card-container cursor-pointer rounded-2 overflow-hidden position-relative"
            >
              <img src="${
                receivedData[i].strMealThumb || defaultImg
              }" alt="" class="w-100" />
              <div
                class="meal-layer card-layer position-absolute w-100 h-100 d-flex align-items-center p-2"
              >
                <h3 class="text-start text-black">${
                  receivedData[i].strMeal
                }</h3>
              </div>
            </div>
          </div>`);
  }
  $(".meal-card").click(function () {
    selectedMeal = receivedData[$(".meal-card").index(this)];
  });
}

function displayCooking() {
  let cookingRecipes = ``;
  for (i = 1; i <= 20; i++) {
    if (selectedMeal[`strIngredient${i}`] != "") {
      cookingRecipes += `<li class="alert mb-0 p-1 alert-info">${
        selectedMeal[`strMeasure${i}`]
      }  ${selectedMeal[`strIngredient${i}`]}</li>`;
    }
  }

  let cookingTags = ``;
  if (selectedMeal.strTags !== null) {
    let cookingTagsArr = selectedMeal.strTags.split(",");
    for (i = 0; i < cookingTagsArr.length; i++) {
      cookingTags += `<li class="alert mb-0 p-1 alert-danger">${cookingTagsArr[i]}</li>`;
    }
  }
  $("#cookingName").html(selectedMeal.strMeal);
  $("#cookImg").attr("src", selectedMeal.strMealThumb || defaultImg);
  $("#cookingInstructions").html(selectedMeal.strInstructions);
  $("#cookingArea span").html(selectedMeal.strArea);
  $("#cookingCategory span").html(selectedMeal.strCategory);
  $("#cookingRecipes+ul").html(cookingRecipes);
  $("#cookingTags+ul").html(cookingTags);
  $("#cookingSource").attr("href", selectedMeal.strSource || "#");
  $("#cookingYoutube").attr("href", selectedMeal.strYoutube || "#");
}
$("body").on("keyup", "#searchName", function (e) {
  searchByNameEvent(e.target.value);
});
async function searchByNameEvent(a) {
  $("#searchFirsLetter").val("");
  searchValue = a;
  await setSearch(searchValue, "search", "s");
}
$("body").on("keyup", "#searchFirsLetter", function (e) {
  $("#searchName").val("");
  searchValue = e.target.value;
  if (searchValue == "") {
    setSearch("a", "search", "f");
    return;
  }

  setSearch(searchValue, "search", "f");
  return searchValue;
});

$("body").on("click", ".meal-card", async function () {
  await getMealById(selectedMeal.idMeal);
  localStorage.removeItem("selectedMeal");
  localStorage.setItem("selectedMeal", JSON.stringify(selectedMeal));
  setCookingContainer();
  displayCooking();
});

// ? ///////////////////////////////////////////////////////////////
// category //

async function GetCategory() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  CategoryData = await response.json();
}
function displayCategory() {
  $("#categoryContainer").html("");

  for (i = 0; i < CategoryData.categories.length; i++) {
    $("#categoryContainer")
      .append(`<div class="col-md-3 category-container-card">
            <div
              class="category-card card-container cursor-pointer rounded-2 overflow-hidden position-relative"
            >
              <img src="${
                CategoryData.categories[i].strCategoryThumb || defaultImg
              }" alt="" class="w-100" />
              <div
                class="category-layer flex-column card-layer position-absolute w-100 h-100 d-flex align-items-center p-2"
              >
                <h3 class="text-center text-black">${
                  CategoryData.categories[i].strCategory
                }</h3>
                <p class="text-center text-black">${
                  CategoryData.categories[i].strCategoryDescription
                }</p>
              </div>
            </div>
          </div>`);
  }
  $(".category-container-card").click(function (e) {
    selectedCategory =
      CategoryData.categories[$(".category-container-card").index(this)];
  });
}

$("body").on("click", ".category-container-card", async function () {
  setMealContainer();
  localStorage.removeItem("selectedCategory");
  localStorage.setItem("selectedCategory", JSON.stringify(selectedCategory));
  await getMealsBy("c", selectedCategory.strCategory);
  displayMeals("#searchMeals", data.meals);
});

async function getMealsBy(param, value) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?${param}=${value}`
  );
  data = await response.json();
}

// ? ///////////////////////////////////////////////////////////////
// area //

async function GetArea() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  areaData = await response.json();
}
function displayArea() {
  $("#countryContainer").html("");

  for (i = 0; i < areaData.meals.length; i++) {
    $("#countryContainer").append(`<div class="col-md-3 area-container-card">
            <div
              class="country-card bg-card cursor-pointer d-flex justify-content-center align-items-center rounded-2"
            >
              <a
                class="link-underline-opacity-0 text-center link link-light d-inline-block w-100 py-3 h-100"
              >
                <i class="fa-solid fa-house-laptop text-light fa-6x"></i>
                <h2 class="country-name pt-1 fs-2 mb-0">${areaData.meals[i].strArea}</h2>
              </a>
            </div>
          </div>`);
  }
  $(".area-container-card").click(function (e) {
    selectedArea = areaData.meals[$(".area-container-card").index(this)];
  });
}

$("body").on("click", ".area-container-card", async function () {
  setMealContainer();
  localStorage.removeItem("selectedArea");
  localStorage.setItem("selectedArea", JSON.stringify(selectedCategory));
  await getMealsBy("a", selectedArea.strArea);
  displayMeals("#searchMeals", data.meals);
});
// ? ///////////////////////////////////////////////////////////////
// ingredients //

async function GetIngredients() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  ingredientsData = await response.json();
  ingredientsData = { meals: ingredientsData.meals.slice(0, 20) };
}
function displayIngredients() {
  $("#ingredientsContainer").html("");

  for (i = 0; i < ingredientsData.meals.length; i++) {
    $("#ingredientsContainer").append(`
      <div class="col-md-3 ingredients-container-card">
            <div
              class="ingredient-card bg-card cursor-pointer d-flex justify-content-center align-items-center rounded-2"
            >
              <a
                class="link-underline-opacity-0 text-center link link-light d-inline-block w-100 py-3 h-100"
              >
                <i class="fa-solid fa-drumstick-bite text-light fa-4x"></i>
                <h2 class="ingredient-name pt-1 fs-2">${
                  ingredientsData.meals[i].strIngredient
                }</h2>
                <p class="ingredient-discription mb-0">
                ${ingredientsData.meals[i].strDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}
                </p>
              </a>
            </div>
          </div>`);
  }

  $(".ingredients-container-card").click(function (e) {
    selectedIngredient =
      ingredientsData.meals[$(".ingredients-container-card").index(this)];
  });
}

$("body").on("click", ".ingredients-container-card", async function () {
  setMealContainer();
  await getMealsBy("i", selectedIngredient.strIngredient);
  displayMeals("#searchMeals", data.meals);
});
// ? ///////////////////////////////////////////////////////////////
// contact //

const validateName = /^[a-z0-9_-]{3,15}[ ]?[a-z0-9_-]{0,15}$/gim;
const validateEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm;
const validatePassword =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm;
const validateNum =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim;
const validateAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;

$("body").on("keyup", ".form-changes", function (e) {
  checkAllValidation();
});
$("body").on("keyup", "#userName", function (e) {
  validate(validateName, e.target.value, nameElement);
});
$("body").on("keyup", "#userEmail", function (e) {
  validate(validateEmail, e.target.value, emailElement);
});
$("body").on("keyup", "#userPhone", function (e) {
  validate(validateNum, e.target.value, phoneElement);
});
$("body").on("keyup", "#userAge", function (e) {
  validate(validateAge, e.target.value, ageElement);
});
$("body").on("keyup", "#userPassword", function (e) {
  validate(validatePassword, e.target.value, passElement);
});
$("body").on("keyup", "#userRePassword", function (e) {
  validate(validatePassword, e.target.value, RePassElement);
  matchPassword();
});

function matchPassword() {
  if (validate(validatePassword, $("#userRePassword").val(), RePassElement)) {
    if ($("#userRePassword").val() !== $("#userPassword").val()) {
      $("#userRePassword").next().removeClass("d-none").addClass("d-block");
      return false;
    } else {
      return true;
    }
  }
}

function validate(regex, inputValue, element) {
  if (inputValue.match(regex)) {
    element.nextElementSibling.classList.add("d-none");
    element.nextElementSibling.classList.remove("d-block");
    return true;
  } else {
    element.nextElementSibling.classList.remove("d-none");
    element.nextElementSibling.classList.add("d-block");
  }
  if (inputValue == "") {
    element.nextElementSibling.classList.add("d-none");
    element.nextElementSibling.classList.remove("d-block");
    return false;
  }
}

function checkAllValidation() {
  if (
    validate(validateName, $("#userName").val(), nameElement) &&
    validate(validateEmail, $("#userEmail").val(), emailElement) &&
    validate(validateName, $("#userPhone").val(), phoneElement) &&
    validate(validateAge, $("#userAge").val(), ageElement) &&
    validate(validatePassword, $("#userPassword").val(), passElement) &&
    validate(validatePassword, $("#userRePassword").val(), RePassElement) &&
    matchPassword()
  ) {
    $("#signup").removeClass("disabled");
    console.log("hi true");
  } else {
    console.log("hi false");
    $("#signup").addClass("disabled");
  }
}
