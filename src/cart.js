let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];


let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)

    // console.log("he vai kaj kortasi");
};

calculation();

let generateCartItems = () => {
    if(basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            console.log(x);
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return `
            <div class="cart-item">
                <img width="100" src="${search.img}" alt="" /> 
                <h1>${search.name}</h1>
                <div class="name">  <h2>$ ${search.price}</h2></div>
                <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">
                    ${item}
                    </div>
                <i onclick="increament(${id})" class="bi bi-plus-lg"></i>
            </div>
                    <div class="name1">  <h2>$ ${item * search.price}</h2></div>
             <iconify-icon onclick="removeItem(${id})" class="cross" icon="charm:circle-cross"></iconify-icon>
            </div>
            `;
        }).join(""));
     
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Back to home</button>
        </a>
        `;
    }
};

generateCartItems();

let increament = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);

    if(search === undefined) {
        basket.push({
            id: selectedItem,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }
    update(selectedItem);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem);

    if(search === undefined) return
    else if(search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem);
    basket = basket.filter((x) => x.item !==0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id === id)
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();

    localStorage.setItem("data", JSON.stringify(basket));
}


let TotalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket
        .map((x) => {
            let { item, id } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];

            return item * search.price;
        })
        .reduce((x, y) => x+y, 0);
        // console.log(amount);
        label.innerHTML = `
       <div class="TotalDetails">
       <h2>Total Bill : $ ${amount}</h2>
       <button class="chackout">Chackout</button>
       <button onclick="clearCart()" onclick="clearCart()" class="removeAll">Clear Cart</button>
       </div>
        `
    } else return;
};

TotalAmount();




