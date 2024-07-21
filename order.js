document.addEventListener("DOMContentLoaded", () => {
    const home=document.querySelector(".logo");

    home.addEventListener("click", function() {
        window.location.href = "index.html"
    });
    const currentUser = JSON.parse(localStorage.getItem("current_user"));

    if (currentUser) {
        fetchUserDetails(currentUser.id);
    } else {
        console.error('User not logged in.');
        alert('Please log in to view your order.');
    }

    function fetchUserDetails(userId) {
        fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                displayWalletBalance(user.wallet);
                displayCartItems(user.cart || [], userId, user.wallet);
                displayWishlistItems(user.wishlist || [], userId);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function displayWalletBalance(wallet) {
        const walletBalance = document.getElementById('walletBalance');
        walletBalance.textContent = `Wallet Balance: ₹${wallet.toFixed(2)}`;
    }

    function displayCartItems(cart, userId, wallet) {
        const orderContainer = document.getElementById('orderContainer');
        orderContainer.innerHTML = '';

        if (cart.length === 0) {
            orderContainer.innerHTML = '<p>Your cart is empty.</p>';
            document.getElementById('totalValue').textContent = '';
            document.getElementById('checkoutButton')?.remove(); // Remove checkout button if cart is empty
            return;
        }

        let totalValue = 0;

        cart.forEach(item => {
            totalValue += item.price * item.quantity;

            const cartItem = document.createElement('div');
            cartItem.className = 'cartItem';

            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cartItemDetails">
                    <h3>${item.title}</h3>
                    <p>${item.main_product_name}</p>
                    <p>Product type: ${item.productType}</p>
                    <p>Price: ₹${item.price}</p>
                    <p>Quantity: 
                        <button class="decrease" data-id="${item.id}">-</button> 
                        ${item.quantity} 
                        <button class="increase" data-id="${item.id}">+</button>
                    </p>
                    <button class="delete" data-id="${item.id}">Remove</button>
                    <button class="wishlistButton" data-id="${item.id}">Move to Wishlist</button>
                </div>
            `;

            orderContainer.appendChild(cartItem);
        });

        document.getElementById('totalValue').textContent = `Total Cart Value: ₹${totalValue.toFixed(2)}`;

        const addMoneySection = document.getElementById('addMoneySection');
        if (wallet < totalValue) {
            addMoneySection.innerHTML = `
                <p>Insufficient wallet balance. <button id="addMoneyButton">Add Money</button></p>
            `;

            document.getElementById('addMoneyButton').addEventListener('click', () => {
                const amount = prompt('Enter amount to add to wallet:');
                if (amount) {
                    addMoney(userId, parseFloat(amount));
                }
            });
        } else {
            addMoneySection.innerHTML = '';
        }

        const checkoutButton = document.createElement('button');
        checkoutButton.id = 'checkoutButton';
        checkoutButton.textContent = 'Checkout';
        checkoutButton.addEventListener('click', () => {
            checkout(userId, totalValue);
        });
        document.getElementById('orderSummary').appendChild(checkoutButton);

        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', (e) => {
                updateQuantity(userId, e.target.dataset.id, 1);
            });
        });

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', (e) => {
                updateQuantity(userId, e.target.dataset.id, -1);
            });
        });

        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', (e) => {
                removeProduct(userId, e.target.dataset.id);
            });
        });

        document.querySelectorAll('.wishlistButton').forEach(button => {
            button.addEventListener('click', (e) => {
                moveToWishlist(userId, e.target.dataset.id);
            });
        });
    }

    function displayWishlistItems(wishlist, userId) {
        const wishlistContainer = document.getElementById('wishlistContainer');
        wishlistContainer.innerHTML = '';

        if (wishlist.length === 0) {
            wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
            return;
        }

        wishlist.forEach(item => {
            const wishlistItem = document.createElement('div');
            wishlistItem.className = 'wishlistItem';

            wishlistItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="wishlistItemDetails">
                    <h3>${item.title}</h3>
                    <p>${item.main_product_name}</p>
                    <p>Price: ₹${item.price}</p>
                    <button class="moveToCart" data-id="${item.id}">Move to Cart</button>
                    <button class="removeFromWishlist" data-id="${item.id}">Remove from Wishlist</button>
                </div>
            `;

            wishlistContainer.appendChild(wishlistItem);
        });

        document.querySelectorAll('.moveToCart').forEach(button => {
            button.addEventListener('click', (e) => {
                moveToCart(userId, e.target.dataset.id);
            });
        });

        document.querySelectorAll('.removeFromWishlist').forEach(button => {
            button.addEventListener('click', (e) => {
                removeFromWishlist(userId, e.target.dataset.id);
            });
        });
    }

    function updateQuantity(userId, productId, change) {
        fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                const cart = user.cart || [];
                const productIndex = cart.findIndex(item => item.id === productId);

                if (productIndex > -1) {
                    cart[productIndex].quantity += change;
                    if (cart[productIndex].quantity <= 0) {
                        cart.splice(productIndex, 1);
                    }

                    fetch(`http://localhost:3000/users/${userId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ cart: cart })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Cart updated:', data);
                        displayCartItems(cart, userId, user.wallet);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function removeProduct(userId, productId) {
        fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                const cart = user.cart || [];
                const productIndex = cart.findIndex(item => item.id === productId);

                if (productIndex > -1) {
                    cart.splice(productIndex, 1);

                    fetch(`http://localhost:3000/users/${userId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ cart: cart })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Product removed from cart:', data);
                        displayCartItems(cart, userId, user.wallet);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function moveToWishlist(userId, productId) {
        fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                const cart = user.cart || [];
                const wishlist = user.wishlist || [];
                const productIndex = cart.findIndex(item => item.id === productId);

                if (productIndex > -1) {
                    const [product] = cart.splice(productIndex, 1);
                    wishlist.push(product);

                    fetch(`http://localhost:3000/users/${userId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ cart: cart, wishlist: wishlist })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Product moved to wishlist:', data);
                        displayCartItems(cart, userId, user.wallet);
                        displayWishlistItems(wishlist, userId);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function moveToCart(userId, productId) {
        fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                const cart = user.cart || [];
                const wishlist = user.wishlist || [];
                const productIndex = wishlist.findIndex(item => item.id === productId);

                if (productIndex > -1) {
                    const [product] = wishlist.splice(productIndex, 1);
                    const existingProduct = cart.find(item => item.id === product.id);

                    if (existingProduct) {
                        existingProduct.quantity += 1;
                    } else {
                        product.quantity = 1;
                        cart.push(product);
                    }

                    fetch(`http://localhost:3000/users/${userId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ cart: cart, wishlist: wishlist })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Product moved to cart:', data);
                        displayCartItems(cart, userId, user.wallet);
                        displayWishlistItems(wishlist, userId);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function checkout(userId, totalValue) {
        fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                if (user.wallet < totalValue) {
                    alert('Insufficient wallet balance. Please add money to your wallet.');
                    return;
                }

                const updatedWallet = user.wallet - totalValue;
                const updatedOrders = user.orders || [];
                const updatedCart = user.cart || [];

                updatedOrders.push(...updatedCart);
                user.cart = [];

                fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ wallet: updatedWallet, cart: [], orders: updatedOrders })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Checkout successful:', data);
                    displayCartItems([], userId, updatedWallet);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function addMoney(userId, amount) {
        fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                const updatedWallet = user.wallet + amount;

                fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ wallet: updatedWallet })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Money added:', data);
                    displayWalletBalance(updatedWallet);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function removeFromWishlist(userId, productId) {
        fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(user => {
                const wishlist = user.wishlist || [];
                const productIndex = wishlist.findIndex(item => item.id === productId);

                if (productIndex > -1) {
                    wishlist.splice(productIndex, 1);

                    fetch(`http://localhost:3000/users/${userId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ wishlist: wishlist })
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Product removed from wishlist:', data);
                        displayWishlistItems(wishlist, userId);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
