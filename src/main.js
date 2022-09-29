// ! for navber
let open = document.getElementById("open");
let close = document.getElementById("close");
let menu = document.getElementById("menu");

// ! for cart 
let shop = document.getElementById("shop");



// ? for navber
common = (x, y, z) => {
    x.addEventListener("click", () => {
        x.classList.toggle("hide");
        y.classList.toggle("hide");

        if(z== "slide-in"){
            menu.classList.toggle("slide")
        }

        if(z== "slide-out"){
            menu.classList.toggle("slide")
        }
    })
}

common(open,close, "slide-in");
common(close,open, "slide-out");


// ? for cart
let basket = JSON.parse(localStorage.getItem("data")) || [];


let generateShop = () => {
    
    return shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, desc, catagory, catagory1, catagory2, price, img } = x;
        let search = basket.find((x)=> x.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
            <img src=${img} alt="">
            <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <h4>Catagory:- <span class="catagory">${catagory}</span>
                    <span class="catagory1">${catagory1}</span>
                    <span class="catagory2">${catagory2}</span>
                    </h4>
                <div class="price-quantity">
                    <h2>price:- $ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">
                            ${search.item === undefined? 0: search.item}
                            </div>
                        <i onclick="increament(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        
        </div>    
        `
    }).join("")
};
generateShop();

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
    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id === id)
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)

    // console.log("he vai kaj kortasi");
};

calculation();
 