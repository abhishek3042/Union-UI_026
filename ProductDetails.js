document.addEventListener("DOMContentLoaded", () => {

    const home=document.querySelector(".logo");

    home.addEventListener("click", function() {
        window.location.href = "index.html"
    });
    // Retrieve product details from local storage
    const productDetails = JSON.parse(localStorage.getItem("current_productdetails"));
    // Retrieve user information from local storage
    const currentUser = JSON.parse(localStorage.getItem("current_user"));

    if (productDetails) {
        document.querySelector("#main_productImage img").src = productDetails.image;
        document.querySelector("#Details").innerHTML = `
            <h3>${productDetails.title}</h3>
            <h5>${productDetails.main_product_name}</h5>
            <p>Price: ₹${productDetails.price} (incl. of all taxes)</p>
        `;
    }
    
    const buyButton = document.getElementById('buyButton');
    buyButton.addEventListener('click', function() {
        if (currentUser && productDetails) {
            addToCart(currentUser.id, productDetails);
        } else {
            console.error('User information or product details missing.');
        }
        window.location,href="order.html";
    });

    const wishlistButton = document.querySelector('#wishlistbtn');
    wishlistButton.addEventListener('click', function() {
        if (currentUser && productDetails) {
            addToWishlist(currentUser.id, productDetails);
        } else {
            console.error('User information or product details missing.');
        }
    });

    function addToCart(userId, product) {
        fetch(`https://chronotech-api-1.onrender.com/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                const cart = user.cart || [];

                const productIndex = cart.findIndex(item => item.id === product.id);
                if (productIndex > -1) {
                    cart[productIndex].quantity += 1;
                } else {
                    product.quantity = 1;
                    cart.push(product);
                }

                fetch(`https://chronotech-api-1.onrender.com/users/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ cart: cart })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Product added to cart:', data);
                    alert('Product added to cart successfully!');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
            
    }

    function addToWishlist(userId, product) {
        fetch(`https://chronotech-api-1.onrender.com/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                const wishlist = user.wishlist || [];

                const productIndex = wishlist.findIndex(item => item.id === product.id);
                if (productIndex === -1) {
                    wishlist.push(product);

                    fetch(`https://chronotech-api-1.onrender.com/users/${userId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ wishlist: wishlist })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Product added to wishlist:', data);
                        alert('Product added to wishlist successfully!');
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                } else {
                    alert('Product is already in your wishlist.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
