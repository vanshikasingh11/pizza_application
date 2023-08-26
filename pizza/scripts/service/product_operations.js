// Contains the Logic for Fetching ,
// Adding, Sorting, Searching,
 // Deletion , Updation
 /*
  It talk to Network Layer to Bring the JSON, and
  convert JSON into Objects vice-versa

 */
  import Product from '../models/product.js';
  import makeNetworkCall from '../service/apiclient.js';
  
  const product_Operations = {
      pizzas:[],
      carts:[],
      addToCart(product){
          this.carts.push(product);
      },
      removeFromCart(product){
        
          this.carts =  this.carts.filter(pizza =>pizza.id != product.id)
       },
   
       search(pizzaId){

      const pizza=  this.pizzas.find((e)=>e.id == pizzaId);
      pizza.isAddedInCart=true;
      console.log(this.pizzas)
       },
      async loadProducts(){
          const pizzas = await makeNetworkCall();
          const pizzaArray = pizzas['Vegetarian'];
          const productsArray = pizzaArray.map(pizza=>{
              const currentPizza = new Product(pizza.id, pizza.name,
                   pizza.menu_description, pizza.price, pizza.assets.product_details_page[0].url);
                   
                  return currentPizza;
                  })
                  this.pizzas=productsArray;
                  console.log('PPPPPPPPPPPPPPPPP',this.pizzas)
                  console.log('Product Array ', productsArray);

                  this.pizzas=productsArray;
                  return productsArray;  // Wrap in Promise
              },
      sortProducts(){
          
      },
      getProductsInCart(){
      const allpizzaincart=this.pizzas.filter((e)=>e.isAddedInCart);
      console.log(allpizzaincart)
      return allpizzaincart
      },
      searchProducts(id){
          console.log('PPPPPPPPPPPPPPPPP',this.pizzas)
          // const searchedPizzaArray=pizzas.Vegetarian;
          console.log('SEARCH Pizza ::::::: ', this.pizzas.length, 'Id ', id);
          const searched =  this.pizzas.filter(pizza=>pizza['id']===id);
          return searched;
  
      }
  }
  export default product_Operations;