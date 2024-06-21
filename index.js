//! GLOBAL VARIBLES
let allProducts;
const filters={
    searchItems: "",
}

//? SELECTS
const searchInput = document.querySelector(".header__search-input");
const productList = document.querySelector(".product-list");
const filterBtns = document.querySelectorAll(".header__filter-btn");

//! EVENTS
document.addEventListener("DOMContentLoaded", loadContent);
searchInput.addEventListener("input", getInputValue);
filterBtns.forEach(btn => {
    btn.addEventListener("click",filterBasedOnBtn)
})


//? FUNCTIONS
async function loadContent(){
    try{
        const {data} = await axios.get("http://localhost:3000/items");
        allProducts = data;
        renderProducts(allProducts, filters);
    }catch(err){
        toast(err.message)
    }
}

function renderProducts(allProducts, filters){
    const filteredProducts = allProducts.filter( p => p.title.toLowerCase().trim().includes(filters.searchItems.toLowerCase().trim()))
    let products = "";

    productList.innerHTML = "";

    filteredProducts.forEach(p => {
        products += `<div class="product-card">
            <div class="product__image-container">
                <img src=${p.image} alt=${p.title}>
            </div>
            <div class="product-info">
                <span class="product-price">${p.price}</span>
                <span class="product-name">${p.title}</span>
            </div>
        </div>`;
    });
    productList.innerHTML = products;

}

function getInputValue(e){
    filters.searchItems = e.target.value;
    renderProducts(allProducts, filters)
}

function filterBasedOnBtn(e){
    filters.searchItems = e.target.dataset.filter;
    renderProducts(allProducts, filters)
}

// TOSTIFY
function toast(text){Toastify({
    text: text,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right", 
    stopOnFocus: true, 
    style: {
        background: "#EF7545",
      background: "linear-gradient(135deg, #EF7545, #BF413F)",
    },
    onClick: function(){}
  }).showToast();
}