const remerasContainer = document.querySelector(".prod-container");
const vermasBoton = document.querySelector(".ver-mas");
const contCategories = document.querySelector(".btn-category");
const listCategories = document.querySelectorAll(".category");
const cartButton = document.querySelector(".nav-cart");
const menuButton = document.querySelector(".menu-button");
const menuCarrito = document.querySelector(".carrito");
const menuPuntos = document.querySelector(".list-nav");
const overlay = document.querySelector(".overlay");

// Productos render

const createProductTemplate = (product) => {
  const { id, name, desc, precio, prodPic } = product;
  return `
    <div class="product">
      <img src="${prodPic}" alt="${name} />
      <div class="product-txt">
        <h3>${name}</h3>
        <p>${desc}</p>
        <p class="precio"><span>Precio contado:</span> $${precio}</p>
        <div class="btn-purchase">
          <a href="#" class="add-cart_btn-2" data-id="${id}">Agregar al carrito</a>
          <a href="#" class="add-cart_btn-3" data-id="3">Ver Detalles</a>
        </div>
      </div>
    </div>`;
};

const renderProducts = (listaProductos) => {
  remerasContainer.innerHTML += listaProductos
    .map(createProductTemplate)
    .join("");
};

// Ver mas
const mostrarMas = () => {
  appState.productsIndex += 1;

  let { products, productsIndex } = appState;

  renderProducts(products[productsIndex]);

  if (productsIndex === appState.limProducts - 1) {
    vermasBoton.classList.add("hidden");
  }
};

const setShowMoreVisibility = () => {
  if (!appState.activeFilter) {
    vermasBoton.classList.remove("hidden");
  }

  vermasBoton.classList.add("hidden");
};

const btnActiveState = (selectCat) => {
  const categories = [...listCategories];

  categories.forEach((catBtn) => {
    if (catBtn.dataset.category !== selectCat) {
      catBtn.classList.remove("active");
      return;
    }

    catBtn.classList.add("active");
  });
};

// Filtros
const changeFiltersState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  btnActiveState(appState.activeFilter);
  setShowMoreVisibility(appState.activeFilter);
};
// -----------------------------------------------
// Funcion filtro productos

const renderFilteredProducts = () => {
  const filteredProducts = prodInfo.filter(
    (product) => product.category === appState.activeFilter
  );

  renderProducts(filteredProducts);
};

// Filtros categoria
const applyFilter = ({ target }) => {
  if (!btnIsInactive(target)) return;
  changeFiltersState(target);
  remerasContainer.innerHTML = "";
  if (appState.activeFilter) {
    renderFilteredProducts();
    appState.currentProductsIndex = 0;
    return;
  }
  renderProducts(appState.products[0]);
};
// ----------------------------------------------------

const btnIsInactive = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};

// Menu carrito modal

const openCart = () => {
  menuCarrito.classList.toggle("open-cart");
  if (menuPuntos.classList.contains("open-menu")) {
    menuPuntos.classList.remove("open-menu");
    return;
  }
};
const openMenu = () => {
  menuPuntos.classList.toggle("open-menu");
  if (menuCarrito.classList.toggle("open-cart")) {
    menuCarrito.classList.remove("open-cart");
    return;
  }
};

const closeMenuScroll = () => {
  if (
    menuPuntos.classList.contains("open-menu") &&
    menuCarrito.classList.contains("open-cart")
  )
    return;

  menuPuntos.classList.remove("open-menu");
  menuCarrito.classList.remove("open-cart");
};

// Init
const init = () => {
  renderProducts(appState.products[0]);
  vermasBoton.addEventListener("click", mostrarMas);
  contCategories.addEventListener("click", applyFilter);

  cartButton.addEventListener("click", openCart);
  menuButton.addEventListener("click", openMenu);
  window.addEventListener("scroll", closeMenuScroll);
};

init();
