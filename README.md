# Union-UI_026 (Chronotech)


## Introduction
Chronotech is an e-commerce website designed to sell watches, musical instruments, and calculators. The core functionality of the site includes user authentication, product search, sorting, filtering, and management of cart, wishlist, and wallet. The project aims to provide a seamless shopping experience with an intuitive and responsive user interface.

## Project Type
Fullstack

## Deplolyed App
Frontend: https://chronotech.netlify.app/ <br>
Database: [API link](https://chronotech-api-1.onrender.com)

## Directory Structure
my-app/<br>
├─ backend/<br>
├─ frontend/<br>
│  ├─ index.html<br>
│  ├─ product.html<br>
│  ├─ ProductDetails.html<br>
│  ├─ authentication.html<br>
│  ├─ css/<br>
│  │  ├─ index.css<br>
│  │  ├─ product.css<br>
│  │  ├─ ProductDetails.css<br>
│  │  ├─ authentication.css<br>
│  ├─ js/<br>
│  │  ├─ index.js<br>
│  │  ├─ product.js<br>
│  │  ├─ ProductDetails.js<br>
│  │  ├─ authentication.js<br>


## Video Walkthrough of the project
Attach a very short video walkthough of all of the features [ 1 - 3 minutes ]

## Features
List out the key features of your application.

- User login/signup
- Product search
- Product sorting
- Product filtering
- Cart management
- Wishlist management
- Wallet functionality

## design decisions or assumptions
- The website uses a JSON server deployed on Render.com for backend data management.
- The user interface is built using HTML, CSS, JavaScript, and Bootstrap for responsiveness.
- Separate HTML, CSS, and JavaScript files are maintained for different pages to ensure modularity and ease of maintenance.

## Installation & Getting started
Detailed instructions on how to install, configure, and get the project running.

```bash
# Clone the repository
git clone https://github.com/abhishek3042/Union-UI_026.git

# Navigate to the project directory
cd Union-UI_026

# Install dependencies
npm install

# Start the server
npm start

```

### Home Page
<img src=".\images\screencapture-127-0-0-1-5500-index-html-2024-07-21-19_59_12.png">

### Login and Signup
<img src="images\screencapture-127-0-0-1-5500-authencation-html-2024-07-21-20_10_12.png">

### Products Page
<img src="images\screencapture-127-0-0-1-5500-products-html-2024-07-21-20_01_09.png">

### Product Details
<img src="images\screencapture-127-0-0-1-5500-ProductDetails-html-2024-07-21-20_02_17.png">

### Cart, Whishlist wallet and Order
<img src="images\screencapture-127-0-0-1-5500-order-html-2024-07-21-20_03_42.png">

## Credentials
Username: abskmsra <br>
Password: 123456

## APIs Used
- JSON Server for mock backend data management
[API link](https://chronotech-api-1.onrender.com)

## API Endpoints
- GET    /Watches
- POST   /users
- PUT    /users/:id
- PATCH  /users/:id
- DELETE /users/:id

Resources:<br>
https://chronotech-api-1.onrender.com/Watches 40x<br>
https://chronotech-api-1.onrender.com/Musical_Instruments 52x<br>
https://chronotech-api-1.onrender.com/Calculators 16x<br>
https://chronotech-api-1.onrender.com/users 3x<br>

## Technology Stack

- HTML
- CSS
- JavaScript
- Bootstrap
- JSON Server
- Other libraries/modules