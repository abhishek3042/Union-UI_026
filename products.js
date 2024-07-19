
let productsDisplay=document.getElementById("products_display");
let scrollsection=document.getElementById("sorting_filtering_section");
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

let start=1;
let limit=12;

let baseURL="http://localhost:3000/";


let displayProducts= async(URL)=>{
let data=await fetchData(URL);
// productsDisplay.innerHTML=""
// document.getElementById("totalItems").innerText=`${data.length} Items`;
for(let i=start;i<start+limit;i++){
    let product=data[i];
    let card=document.createElement("div");
    card.className="card";
    let img=document.createElement("img");
    img.src=product.image;
    let h3=document.createElement("h5");
    h3.innerText=product.title;
    let productName=document.createElement("p");
    productName.innerText=product.product_name;
    // let p=document.createElement("p");
    // p.innerText=product.description;
    let price=document.createElement("p");
    price.innerText=`₹ ${product.price} (incl. of all taxes)`;
    card.append(img,h3,productName,price);
    productsDisplay.append(card);
    // scrollsection.append(card);
}
}
displayProducts(`${baseURL}Watches`);
// displayProducts(`${baseURL}Musical_Instruments`);
// displayProducts(`${baseURL}Calculators`);



function handleScroll(){
    let scrollHeight=document.documentElement.scrollHeight;
    let scrollTop=document.documentElement.scrollTop;
    let clientHeight=document.documentElement.clientHeight;
    console.log(scrollHeight,scrollTop,clientHeight);
    if(scrollHeight-clientHeight<=Math.ceil(scrollTop)){
        start+=limit;
        console.log(start);
        displayProducts(`${baseURL}Watches`);
    }
}
window.addEventListener("scroll",handleScroll);

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