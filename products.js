const productsDisplay = document.getElementById("products_display");
const scrollSection = document.getElementById("sorting_filtering_section");
const allProductsBtn = document.getElementById("displayallProducts");
const watchesBtn = document.getElementById("displayWatches");
const musicalInstrumentsBtn = document.getElementById("displayMusicalInstruments");
const calculatorsBtn = document.getElementById("displayCalculators");
const searchInput = document.getElementById('searchInput');
const totalItems = document.getElementById("totalProducts");
const baseURL = "https://chronotech-api-1.onrender.com/";
let allProductsData = [];
let currentData = [];
let start = 0;
const limit = 12;

const home=document.querySelector(".logo");

home.addEventListener("click", function() {
    window.location.href = "index.html"
}); 

const fetchData = async (URL) => {
    try {
        let res = await fetch(URL);
        let data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
};

const getAllProducts = async () => {
    allProductsData = [];
    let watchesData = await fetchData(`${baseURL}Watches`);
    let musicalInstrumentsData = await fetchData(`${baseURL}Musical_Instruments`);
    let calculatorsData = await fetchData(`${baseURL}Calculators`);
    
    allProductsData = [...watchesData, ...musicalInstrumentsData, ...calculatorsData];
    currentData = allProductsData;
    displayProducts(currentData);
};

const displayProducts = (data) => {
    totalItems.innerText = data.length;
    // If starting from the beginning, clear the previous content
    if (start === 0) productsDisplay.innerHTML = "";

    for (let i = start; i < start + limit && i < data.length; i++) {    
        let product = data[i];
        let card = document.createElement("div");
        card.className = "card";
        let img_div=document.createElement("div");
        img_div.className="img_div";
        let img = document.createElement("img");
        img.className = "product-image";
        img.src = product.image;
        img_div.append(img)
        let title = document.createElement("h5");
        title.className = "product-title";
        title.innerText = product.title;

        let productName = document.createElement("p");
        productName.className = "product-name";
        productName.innerText = product.product_name;

        let price = document.createElement("p");
        price.className = "product-price";
        price.innerText = `₹ ${product.price} (incl. of all taxes)`;
        card.addEventListener("click", () => {
            localStorage.setItem("current_productdetails", JSON.stringify(product));
            window.location.href="ProductDetails.html"
        });
        card.append(img_div,title, productName, price);
        productsDisplay.append(card);
    }
};

const handleScroll = () => {
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let clientHeight = document.documentElement.clientHeight;

    console.log('Scroll Height:', scrollHeight);
    console.log('Scroll Top:', scrollTop);
    console.log('Client Height:', clientHeight);

    if (scrollHeight - clientHeight <= Math.ceil(scrollTop + 1)) {
        console.log('Load more products...');
        start += limit;
        displayProducts(currentData);
    }
};

window.addEventListener("scroll", handleScroll);


const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Show the button when scrolling down 20px from the top
    window.onscroll = function() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = 'block';
      } else {
        scrollToTopBtn.style.display = 'none';
      }
    };

    // Scroll to the top of the page when the button is clicked
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
allProductsBtn.addEventListener("click", () => {
    start = 0;
    currentData = allProductsData;
    displayProducts(currentData);
});

watchesBtn.addEventListener("click", async () => {
    start = 0;
    currentData = await fetchData(`${baseURL}Watches`);
    displayProducts(currentData);
});

musicalInstrumentsBtn.addEventListener("click", async () => {
    start = 0;
    currentData = await fetchData(`${baseURL}Musical_Instruments`);
    displayProducts(currentData);
});

calculatorsBtn.addEventListener("click", async () => {
    start = 0;
    currentData = await fetchData(`${baseURL}Calculators`);
    displayProducts(currentData);
});

const sortProducts = (selectedSort) => {
    switch (selectedSort) {
        case 'Hightolow':
            currentData.sort((a, b) => b.price - a.price);
            break;
        case 'Lowtohigh':
            currentData.sort((a, b) => a.price - b.price);
            break;
        default:
            break;
    }
    start = 0; // Reset start to 0 for new sort
    displayProducts(currentData);
};

const filterProductsByPrice = (selectedValues) => {
    const filteredProducts = currentData.filter(product => {
        if (selectedValues.includes('Below5000') && product.price < 5000) return true;
        if (selectedValues.includes('5to10') && product.price >= 5000 && product.price <= 10000) return true;
        if (selectedValues.includes('10to20') && product.price >= 10000 && product.price <= 20000) return true;
        if (selectedValues.includes('20to30') && product.price >= 20000 && product.price <= 30000) return true;
        if (selectedValues.includes('30to40') && product.price >= 30000 && product.price <= 40000) return true;
        if (selectedValues.includes('40to50') && product.price >= 40000 && product.price <= 50000) return true;
        if (selectedValues.includes('50to60') && product.price >= 50000 && product.price <= 60000) return true;
        if (selectedValues.includes('Above50000') && product.price > 50000) return true;
        return false;
    });
    start = 0; // Reset start to 0 for new filter
    currentData=filteredProducts
    displayProducts(currentData);
};

document.getElementById('applySort').addEventListener('click', () => {
    const selectedSort = document.querySelector('input[name="sort"]:checked').value;
    sortProducts(selectedSort);
});

document.getElementById('applyFilter').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('input[name="price-range"]:checked');
    const selectedValues = Array.from(checkboxes).map(cb => cb.value);
    filterProductsByPrice(selectedValues);
});

const debounce = (func, delay) => {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
}

const searchProduct = (query) => {
    const filteredProducts = currentData.filter((product) => {
        return product.title && product.title.toLowerCase().includes(query.toLowerCase());
    });
    
    start = 0; // Reset start to 0 for new search
    displayProducts(filteredProducts);
};

searchInput.addEventListener('input', debounce(() => {
    const query = searchInput.value;
    searchProduct(query);
}, 2000));

// Initialize the product display with all products
getAllProducts();