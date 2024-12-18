let currentPage = 1; // Current page number
let limit = 5;       // Items per page
let totalPages = 0;  // Total number of pages
const cache = new Map(); // Cache to store prefetched pages

function addCart() {
    // Add item to cart
    const idContainer = document.getElementById("hehe");
    let quantity = 1;
    const quantityContainer = document.getElementById("each-production-quanity");
    if (quantityContainer.value === "") {
        notify({type: "warning", msg: "Please fill in a number of product"})
        return;
    }
    if (!isNaN(quantityContainer.value) && Number(quantityContainer.value) > 0) {
        quantity = Number(quantityContainer.value);
    }
    console.log(quantity);
    fetch("https://wad-ga-08.vercel.app/cart", {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            productID: idContainer.innerText,
            quantity: quantity,
        })
    })
        .then(response => response.json())
        .then(data => {
            notify({ type: data.status, msg: data.msg });
        })
        .then(() => {
            updateCartCount();
        })
        .catch(error => console.error('Error adding to cart:', error));
    
}

function updateCartCount(increment = 1) {
    fetch("https://wad-ga-08.vercel.app/cart/", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            const cartCount = document.getElementById('cart-count');
            var __cart_count = 0;
            for (const item of data.cart) {
                __cart_count += item.quantity;
            }
            cartCount.innerText = __cart_count;
        });
    
}

// Prefetch next page data
function prefetchPage(page) {
    if (cache.has(page) || page > totalPages || page < 1) return;

    fetch(`https://wad-ga-08.vercel.app/product/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, limit })

    })
        .then(response => response.json())
        .then(data => {
            cache.set(page, data.item);
        })
        .catch(error => console.error(`Error prefetching page ${page}:`, error));
}

// Load products for the current page
function loadProducts() {
    if (cache.has(currentPage)) {
        renderProducts(cache.get(currentPage));
        return;
    }
    showSpinner(); // Hiển thị spinner
    fetch(`https://wad-ga-08.vercel.app/product/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: currentPage, limit })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            hideSpinner(); // Ẩn spinner
            const { totalPages: total, item } = data;
            totalPages = total; // Update total pages
            cache.set(currentPage, item); // Cache the current page
            renderProducts(item); // Render products
            prefetchPage(currentPage + 1); // Prefetch the next page
        })
        .catch(error => console.error('Error loading products:', error));
}


// Render products on the page
function renderProducts(products) {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = ''; // Clear current items

    const fragment = document.createDocumentFragment();
    products.forEach(product => {
        const productElement = createProductElement(product);
        fragment.appendChild(productElement);
    });
    itemsContainer.appendChild(fragment); // Append all at once

    document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages;
}

// Create product card
function createProductElement(product) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card_img">
            <a href="/product/${product._id}">
                <img src="data:image/png;base64,${product.image}" alt="${product.name}" class="card-img-top">
            </a>
        </div>
        <div class="card_content">
            <div class="card_price">
                <div class="card_price_fake">
                    <div class="card_price_value">${product.price}</div>
                </div>
            </div>
            <div class="card_detail">
                <div class="card_title">
                    <a href="/product/${product._id}">
                        <h5 class="card-title">${product.name}</h5>
                    </a>
                </div>
                <div class="card_description">
                    <p>${product.description}</p>
                </div>
            </div>
        </div>`;
    return card;
}

// Event listeners for pagination buttons
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadProducts();
        prefetchPage(currentPage - 1); // Prefetch previous page
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        loadProducts();
        prefetchPage(currentPage + 1); // Prefetch next page
    }
});

function filterProducts() {
    // Get filter values from the UI
    // const searchValue = document.getElementById('search__bar__product').value.trim();
    const selectedBrands = Array.from(
        document.querySelectorAll('#brand-filter input[type="checkbox"]:checked')
    ).map(input => input.id.replace('checkbox_', ''));

    const selectedModels = Array.from(
        document.querySelectorAll('#model-filter input[type="checkbox"]:checked')
    ).map(input => input.id.replace('checkbox_', ''));

    // const selectedPrice = document.getElementById('price-filter').value;

    const selectedSort = document.querySelector('#sort-filter input[type="radio"]:checked')?.id || '';

    const filterPayload = {
        // search: searchValue,
        page: currentPage,
        limit: limit,
        brands: selectedBrands, // Array
        models: selectedModels, // Array
        // price: selectedPrice, // Số hoặc chuỗi nếu backend cần
        sortType: selectedSort.includes('asc') ? 'asc' : 'desc', // Phân tích từ id
        sortBy: 'price', // Hoặc một trường cụ thể

    };

    console.log(filterPayload);
    showSpinner();
    // Fetch filtered products
    fetch('https://wad-ga-08.vercel.app/product/filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filterPayload)
    })
        .then(response => response.json())
        .then(data => {
            hideSpinner();
            const { totalPages: total, item } = data;
            totalPages = total; // Update total pages
            cache.clear(); // Clear the cache as filters have changed
            cache.set(currentPage, item); // Cache the new filtered results
            renderProducts(item); // Render filtered products
            prefetchPage(currentPage + 1); // Prefetch next page for filtered results
        })
        .catch(error => console.error('Error filtering products:', error));
}

function showSpinner() {
    document.getElementById('loading-spinner').classList.remove('hidden');
}

function hideSpinner() {
    document.getElementById('loading-spinner').classList.add('hidden');
}

function showBrand() {
    const brandFilterArea = document.getElementById('brand-filter');
    console.log("hehe");
    var brands = [];
    const selectedBrands = Array.from(
        document.querySelectorAll('#brand-filter input[type="checkbox"]:checked')
    ).map(input => input.id.replace('checkbox_', ''));
    
    fetch('https://wad-ga-08.vercel.app/product/brands', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            brands = data.data;
            for (const brand of brands) {
                const brandElement = document.createElement('div');
                brandElement.innerHTML = `
                    <input type="checkbox" id="checkbox_${brand}" ${selectedBrands.includes(brand) ? 'checked' : ''}>
                    <label class="btn btn-outline-warning" for="checkbox_${brand}">${brand}</label>
                `;
                brandFilterArea.appendChild(brandElement);
            }
        })
        .catch(error => console.error('Error loading brands:', error));
}

function showModel() {
    const modelFilterArea = document.getElementById('model-filter');
    var models = [];
    const selectedModels = Array.from(
        document.querySelectorAll('#model-filter input[type="checkbox"]:checked')
    ).map(input => input.id.replace('checkbox_', ''));
    
    fetch('https://wad-ga-08.vercel.app/product/models', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            models = data.data;
            for (const model of models) {
                const modelElement = document.createElement('div');
                modelElement.innerHTML = `
                    <input type="checkbox" id="checkbox_${model}" ${selectedModels.includes(model) ? 'checked' : ''}>
                    <label class="btn btn-outline-warning" for="checkbox_${model}">${model}</label>
                `;
                modelFilterArea.appendChild(modelElement);
            }
        })
        .catch(error => console.error('Error loading models:', error));
}

function loadSideBar() {
    showBrand();
    showModel();
}


// Initial load
loadSideBar();
loadProducts();
updateCartCount(0);
