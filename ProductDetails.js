document.addEventListener("DOMContentLoaded", () => {
    const productDetails = JSON.parse(localStorage.getItem("current_productdetails"));

    if (productDetails) {
        document.querySelector("#main_productImage img").src = productDetails.image;
        document.querySelector("#Details").innerHTML = `
            <h3>${productDetails.title}</h3>
            <h5>${productDetails.main_product_name}</h5>
            <p>Price: ₹${productDetails.price} (incl. of all taxes)</p>
        `;
    }
});