let currentPage = 1;  // Initial page number
let limit = 5;  // Number of products per page

function filterProducts() {
    // Get the selected brands, models, and sort options
    const selectedBrands = Array.from(document.querySelectorAll('#brand-filter input:checked')).map(input => input.id.split('_')[1]);
    const selectedModels = Array.from(document.querySelectorAll('#model-filter input:checked')).map(input => input.id.split('_')[1]);
    var selectedSortBy = "asc";
    console.log(selectedSortBy);
    if (document.querySelector('#sort-filter input:checked') != null) {
        selectedSortBy = document.querySelector('#sort-filter input:checked').id.split('_')[2];
    }
    // Make an AJAX request to get the filtered products
    fetch(`https://wad-ga-06.vercel.app/product/filter`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            page: currentPage,
            limit: limit,
            brands: selectedBrands.join(','),
            models: selectedModels.join(','),
            sorttype: "price",
            sortby: selectedSortBy,
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Data received:", data);  // Log the received data
            // Extract current page, total pages, and items from the response
            const { currentPage, totalPages, item } = data;

            // Update the products displayed on the page
            const itemsContainer = document.getElementById('items-container');
            itemsContainer.innerHTML = '';  // Clear the current content

            // Loop through the items and display each product
            item.forEach(product => {
                const productElement = createProductElement(product);
                itemsContainer.appendChild(productElement);
            });

            // Update the page info and pagination buttons
            document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;

            // Enable/disable the pagination buttons based on the current page
            document.getElementById('prev-btn').disabled = currentPage === 1;
            document.getElementById('next-btn').disabled = currentPage === totalPages;



        })
        .catch(error => {
            console.error('Error filtering products:', error);
        });
}

// Function to update the product list and pagination controls
function loadProducts() {
    console.log("loadProducts");
    // Make an AJAX request to get the products for the current page
    fetch(`https://wad-ga-06.vercel.app/product/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            page: currentPage,
            limit: limit
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log("Data received:", data);  // Log the received data
            // Extract current page, total pages, and items from the response
            const { currentPage, totalPages, item } = data;

            // Update the products displayed on the page
            const itemsContainer = document.getElementById('items-container');
            itemsContainer.innerHTML = '';  // Clear the current content

            // Loop through the items and display each product
            item.forEach(product => {
                const productElement = createProductElement(product);
                itemsContainer.appendChild(productElement);
            });

            // Update the page info and pagination buttons
            document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;

            // Enable/disable the pagination buttons based on the current page
            document.getElementById('prev-btn').disabled = currentPage === 1;
            document.getElementById('next-btn').disabled = currentPage === totalPages;
        })
        .catch(error => {
            console.error('Error loading products:', error);
        });
}
// Function to create the product card HTML dynamically
function createProductElement(product) {
    const card = document.createElement('div');
    card.classList.add('card');

    // Product image and link
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('card_img');
    const imageFake = document.createElement('div');
    imageFake.classList.add('card_img_fake1');
    imageContainer.appendChild(imageFake);

    const imageLink = document.createElement('a');
    imageLink.href = `/product/${product._id}`;
    const img = document.createElement('img');
    img.src = `data:image/png;base64,${product.image}`;
    img.classList.add('card-img-top');
    img.alt = product.name;
    imageLink.appendChild(img);
    imageContainer.appendChild(imageLink);
    card.appendChild(imageContainer);

    // Product details (price, name, description)
    const content = document.createElement('div');
    content.classList.add('card_content');

    const priceContainer = document.createElement('div');
    priceContainer.classList.add('card_price');
    const priceFake = document.createElement('div');
    priceFake.classList.add('card_price_fake');
    const priceValue = document.createElement('div');
    priceValue.classList.add('card_price_value');
    priceValue.textContent = product.price;
    priceFake.appendChild(priceValue);
    priceContainer.appendChild(priceFake);
    content.appendChild(priceContainer);

    const details = document.createElement('div');
    details.classList.add('card_detail');

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('card_title');
    const titleLink = document.createElement('a');
    titleLink.href = `/product/${product._id}`;
    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = product.name;
    titleLink.appendChild(title);
    titleContainer.appendChild(titleLink);
    details.appendChild(titleContainer);

    const description = document.createElement('div');
    description.classList.add('card_description');
    const descriptionText = document.createElement('p');
    descriptionText.textContent = product.description;
    description.appendChild(descriptionText);
    details.appendChild(description);

    content.appendChild(details);
    card.appendChild(content);

    return card;
}

// Set up event listeners for the pagination buttons
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadProducts();
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentPage++;
    loadProducts();
});

// Initially load the first page of products
loadProducts();