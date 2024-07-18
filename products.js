let fetchData= async(URL)=>{
    try{
        let res=await fetch(URL);
        let data=await res.json();
        return data;
    }
    catch(err){
        console.log(err);
    }
}
let baseURL="http://localhost:3000/";
let displayProducts= async(URL)=>{
let data=await fetchData(URL);
let products=data;
let productsDisplay=document.getElementById("products_display");
// productsDisplay.innerHTML=""
products.forEach((product)=>{
    let card=document.createElement("div");
    card.className="card";
    let img=document.createElement("img");
    img.src=product.image;
    let h3=document.createElement("h3");
    h3.innerText=product.title;
    let productName=document.createElement("h2");
    productName.innerText=product.product_name;
    // let p=document.createElement("p");
    // p.innerText=product.description;
    let price=document.createElement("p");
    price.innerText=`₹ ${product.price} (incl. of all taxes)`;
    card.append(img,h3,productName,price);
    productsDisplay.append(card);
})
}
displayProducts(`${baseURL}Watches`);
// displayProducts(`${baseURL}Musical_Instruments`);
// displayProducts(`${baseURL}Calculators`);