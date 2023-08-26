// Product Controller - It is a Glue B/w View and Model
// Controller - I/O View Layer

import product_Operations from "../service/product_operations.js";

// Data Exchange B/w View and Model.
async function loadPizzas(){
    const pizzas = await product_Operations.loadProducts();
    console.log('Pizzas are ', pizzas);
    for(let pizza of pizzas){
        preparePizzaCard(pizza);
        
    }
}
loadPizzas();

/*
 <div class="col-4">
                  <div class="card" style="width: 18rem;">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                  </div>
*/

function addToCart(){
  // this - keyword (Current calling object reference)
  console.log('Add to Cart Called...', this);
  const currentButton = this;
  const pizzaId = currentButton.getAttribute('product-id');
  console.log('Pizza Id is ', pizzaId);
  product_Operations.search(pizzaId);
 const pizzas= product_Operations.getProductsInCart()
//  console.log("cart product ",pizzas)

  printBasket(pizzas);
}



function preparePizzaCard(pizza){
    const outputDiv = document.querySelector('#output');
    const colDiv = document.createElement('div');
    colDiv.className = 'col-4';
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style = "width: 18rem;";
    colDiv.appendChild(cardDiv);
    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = 'card-img-top';
    cardDiv.appendChild(img);
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDiv.appendChild(cardBody);
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;
    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerText = pizza.desc;
    const button = document.createElement('button');
    button.setAttribute('product-id', pizza.id);
    button.addEventListener('click', addToCart);// Event Bind
    button.innerText = 'Add to Cart';
    button.className = 'btn btn-primary';
    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    cardBody.appendChild(button);
    outputDiv.appendChild(colDiv);


}
console.log("hello")
function printBasket(pizzas) {

  const basket = document.querySelector('#basket')
  basket.innerHTML='';
  for (let product of pizzas){
      const li=document.createElement('li')
      li.innerText=`${product.name}: Rs.${product.price}`
      li.className="alert alert-light"
      li.style="width:20rem"
      basket.appendChild(li);
  }    
  const Total=document.createElement('div')
  Total.className="alert alert-success text-center";
  Total.innerText=`Taxes=Rs. ${getTotal().gst}
  Total= Rs.${getTotal().Total}`
  basket.appendChild(Total)
}
function getTotal() {
  const Items= productOperations.getProductsInCart();
  let Total= Items.reduce((sum,item)=>{return sum+item.price},0);
  let gst=Total*0.18
  Total=Total*1.18
  gst=Math.round(gst)
  Total=Math.round(Total)
  if(Items.length){
      return {Total,gst};
  }
}