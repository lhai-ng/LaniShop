const products = [
    new Products({
        id: 1,
        image: 'images/antifungispray.png',
        name: 'Anti Fungi Spray',
        price: '$11',
        prevPrice: '$13,99',
        category: 'unhealthy',
        rating: 4.1,
        sold: true,
    }),
    new Products({
        id: 2,
        image: 'images/balconyrailingplanters.png',
        name: 'Balcony-railing Planter',
        price: '$12',
        category: 'healthy',
        readyToShip: true,
        rating: 3.6,
    }),
    new Products({
        id: 3,
        image: 'images/basil.png',
        name: 'Basil',
        price: '$13',
        category: 'healthy', 
        rating: 2.4,
    }),
    new Products({
        id: 4,
        image: 'images/bioorganicfertilizer.png',
        name: 'Bio-organic Fertilizer',
        price: '$14',
        category: 'unhealthy',
        rating: 2.6,
    }),
    new Products({
        id: 5,
        image: 'images/blueberry.png',
        name: 'Blueberry',
        price: '$15',
        category: 'unhealthy',
        rating: 4.7,
        sold: true,
    }),
    new Products({
        id: 6,
        image: 'images/butterflypea.png',
        name: 'Butterfly Pea',
        price: '$16',
        category: 'healthy',
        readyToShip: true,
        rating: 5,
    }),
    new Products({
        id: 7,
        image: 'images/cabbage.png',
        name: 'Cabbage',
        price: '$17',
        prevPrice: '$18.43',
        category: 'healthy',
        rating: 1.2,
    }),
    new Products({
        id: 8,
        image: 'images/carrot.png',
        name: 'Carrot',
        price: '$18',
        category: 'unhealthy', 
        readyToShip: true,
        rating: 3.4,
    }),
]

function Products(options = {}) {
    this.opt = Object.assign({
        filter: false,
        priceCondition: null,
        colors: [],
        prevPrice: '',
        sold: false,
    }, options)

    this.id = this.opt.id;
    this.image = this.opt.image
    this.name = this.opt.name;
    this.price = this.opt.price;
    this.prevPrice = this.opt.prevPrice;
    this.category = this.opt.category;
    this.rating = this.opt.rating;
    this.sold = this.opt.sold
    this.readyToShip = this.opt.readyToShip

    this.filter = this.opt.filter;
    this._cleanRegex = /[^a-zA-Z0-9]/g;
    this._radioStates = {};

    this._activeFilter = {
        price: null,
        rating: null,

        category: null,
        readyToShip: null,
    }
}

// Render Card
Products.prototype._renderListCard = function (product) {
    const card = document.createElement('a');
    card.href = `productdetail.html?id=${product.id}`;
    card.className = 'card';

    const cardImage = this._renderImage(product);
    const cardRating = this._renderRating(product);
    const cardName = this._renderName(product);
    const cardPrice = this._renderPrice(product);
    const cardPrevPrice = this._renderPrevPrice(product);
    const cardButton = this._renderCardBtn(product, 'Add to cart!');
    card.append(cardImage, cardRating, cardName, cardPrice, cardPrevPrice, cardButton);
   
    return card;
}

// Render Card & Cart Detail
Products.prototype._renderImage = function (product) {
    const cardImage = document.createElement('img');
    cardImage.className = 'card-image';
    cardImage.setAttribute('src', product.image);
    return cardImage;
}

Products.prototype._renderRating = function(product) {
    const cardRating = document.createElement('p');
    cardRating.className = 'card-rating';
    cardRating.textContent = `⭐ ${product.rating}`;
    return cardRating;
}

Products.prototype._renderName = function (product) {
    const cardName = document.createElement('h4');
    cardName.className = 'card-name';
    cardName.textContent = product.name;
    return cardName;
}

Products.prototype._renderPrice = function (product) {
    const cardPrice = document.createElement('p');
    cardPrice.className = 'card-price';
    cardPrice.textContent = product.price;
    return cardPrice
}

Products.prototype._renderPrevPrice = function (product) {
    const cardPrevPrice = document.createElement('p');
    cardPrevPrice.className = 'card-revprice';
    cardPrevPrice.textContent = product.prevPrice;
    return cardPrevPrice
}

Products.prototype._renderCardBtn = function (product, content) {
    const cardButton = document.createElement('button');
    cardButton.className = `add-to-cart ${product.sold ? 'sold' : ''}`;
    if (cardButton.classList.contains('sold')) {
        cardButton.disabled = true;
        cardButton.style.cursor = 'default';
    };
    
    cardButton.innerHTML = content;
    cardButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this._addToCart(product.id);
    })
    return cardButton;
}

Products.prototype._renderQuantityBtns = function (item, quantity, cart, cartList) {
    const quantityBoard = document.createElement('div');
    quantityBoard.className = 'quantity-board';

    const displayQuantity = document.createElement('input');
    displayQuantity.className = 'display-quantity';
    displayQuantity.value = `${quantity}`;
    displayQuantity.onchange = () => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const cartItem = cart.find(i => i.product.id === item.product.id);
        if (displayQuantity.value === '' || parseInt(displayQuantity.value) < 0) {
            displayQuantity.value = `${cartItem.quantity}`;
            return;
        } 
        displayQuantity.value = `${parseInt(displayQuantity.value)}`;
        cartItem.quantity = parseInt(displayQuantity.value);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.loadCart();
    }

    const addOneProduct = document.createElement('button');
    addOneProduct.textContent = '+';
    addOneProduct.className = 'adjust-quantity';
    addOneProduct.onclick = () => {
        displayQuantity.value = this._adjustQuantity(1, item, displayQuantity.value);
        this.loadCart();
    }

    const removeOneProduct = document.createElement('button');
    removeOneProduct.textContent = '-';
    removeOneProduct.className = 'adjust-quantity';
    removeOneProduct.onclick = () => {
        displayQuantity.value = this._adjustQuantity(-1, item, displayQuantity.value);
        this.loadCart();
    }

    quantityBoard.append(removeOneProduct, displayQuantity, addOneProduct);
    return quantityBoard;
}
Products.prototype._adjustQuantity = function (number, item, value) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartItem = cart.find(i => i.product.id === item.product.id);
    cartItem.quantity += number;
    if (cartItem.quantity <= 0) cartItem.quantity = 0;
    value = cartItem.quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    return value;
}

Products.prototype._renderTotal = function (product, quantity) {
    const total = document.createElement('div');
    total.className = 'cart-total';
    total.textContent = `Total: $${
        parseFloat(product.price.replace(this._cleanRegex, "")) * quantity
    }`;
    return total;
}

Products.prototype._renderRemoveBtn = function (index) {
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
        if (confirm('Are you sure want to remove this product from cart?')) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            this.loadCart();
        }
    }
    return removeBtn;
}

// Add To Cart
Products.prototype._addToCart = function (selectedId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === selectedId);
    
    const existing = cart.find(item => item.product.id === selectedId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({product, quantity: 1});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Added ${product.name} to cart!`);
}

Products.prototype.loadCart = function (cartListClass = '.cart-list') {
    const cartList = document.querySelector(cartListClass);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartList.innerHTML = ''

    const emptyCart = document.createElement('h6');
    emptyCart.textContent = 'Cart is empty, no product to show';
    if (cart.length === 0) {
        cartList.appendChild(emptyCart);
    }

    this._renderListCart(cart, cartList);
    this._renderSubtotal(cart, cartList);
    this._renderCheckoutBtn(cartList);

    localStorage.setItem('cart', JSON.stringify(cart));
}

Products.prototype._renderListCart = function (cart, cartList) {
    cart.forEach((item, index) => {
        const cartBox = document.createElement('div');
        cartBox.className = 'cart-box';
        const product = item.product;

        const cartImage = this._renderImage(product);
        const cartRating = this._renderRating(product);
        const cartName = this._renderName(product);
        const cartPrice = this._renderPrice(product);
        const cartPrevPrice = this._renderPrevPrice(product);
        const cartQuantityButtons = this._renderQuantityBtns(item, item.quantity);
        const cartTotal = this._renderTotal(product, item.quantity);
        const removeBtn = this._renderRemoveBtn(index);
        cartBox.append(
            cartImage,
            cartRating, 
            cartName, 
            cartPrice, 
            cartPrevPrice, 
            cartQuantityButtons, 
            cartTotal,
            removeBtn
        );
        cartList.appendChild(cartBox);
    })
}

Products.prototype._renderSubtotal = function (cart, cartList) {
    const subtotalBox = document.createElement('h3');
    const subtotalValue = document.createElement('span');
    subtotalBox.className = 'subtotal-box';
    this.subtotal = 0;
    cart.forEach(item => {
        this.subtotal += 
            parseFloat(item.product.price.replace(this._cleanRegex, "")) 
            * item.quantity
    })
    subtotalValue.textContent = `$${this.subtotal}`;
    subtotalBox.textContent = 'Subtotal: ';
    subtotalBox.appendChild(subtotalValue);
    cartList.appendChild(subtotalBox);
}

Products.prototype._renderCheckoutBtn = function (cartList) {
    const checkoutBtn = document.createElement('button');
    checkoutBtn.className = 'checkout-btn';
    checkoutBtn.textContent = "Checkout!"
    checkoutBtn.onclick = () => {
        alert('Proceeding to checkout...')
    }
    cartList.appendChild(checkoutBtn);
}

// Render Product Detail
Products.prototype._renderDetail = function (container, products) {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedId = urlParams.get('id');
    const product = products.find(p => p.id === parseInt(selectedId));

    const imageContainer = document.createElement('div');
    const inforContainer = document.createElement('div');
    const cardImage = this._renderImage(product);
    const cardRating = this._renderRating(product);
    const cardName = this._renderName(product);
    const cardPrice = this._renderPrice(product);
    const cardPrevPrice = this._renderPrevPrice(product);
    const cardButton = this._renderCardBtn(product, `<h1>ADD TO CART!</h1>`);
    
    imageContainer.appendChild(cardImage);
    inforContainer.append(cardName, cardRating, cardPrice, cardPrevPrice, cardButton);

    container.append(imageContainer, inforContainer);
}

// Render Product List
Products.prototype._renderProducts = function (productList, productArray) {
    productList.innerHTML = '';
    productArray.forEach(product => {
        const card = this._renderListCard(product);
        productList.appendChild(card);
    });
}

Products.prototype.renderProductList = function () {
    if (this.filter) {
        this.filterControls = document.createElement('aside'); 
        this.filterControls.id = 'filter-controls';
        document.body.appendChild(this.filterControls);
    }
    this._productList = document.createElement('section');
    this._productList.id = 'product-list';
    document.body.appendChild(this._productList);
    this._renderProducts(this._productList, products);
}

// Filter Types
Products.prototype.addFilterRadio = function (filterName, filterProperty, filterValue, cssClass, callback) {
    const filterAssets = this._createFilter('radio', filterName, filterProperty, filterValue, cssClass);
    const filterToggle = filterAssets[0];
    const inputFilter = filterAssets[1];
    const labelFilter = filterAssets[2];

    this._radioStates[inputFilter.id] = false;

    inputFilter.addEventListener('click', (e) => {
        if (this._radioStates[e.target.id] && e.target.checked) {
            this._radioStates[e.target.id] = false;
            e.target.checked = false;
            callback(false, filterValue);
        } else {
            this._radioStates[e.target.id] = true;
            const otherRadios = document.querySelectorAll(`input[name=${filterProperty}]`);
            otherRadios.forEach( radio => {
                if (radio !== e.target) {
                    this._radioStates[radio.id] = false;
                }
            });
            callback(true, filterValue);
        }
        
    });

    filterToggle.append(inputFilter, labelFilter);
    return filterToggle;
}

Products.prototype.addFilterCheckbox = function (filterName, filterProperty, filterValue, cssClass, callback) {
    const filterAssets = this._createFilter('checkbox', filterName, filterProperty, filterValue, cssClass);
    const filterToggle = filterAssets[0];
    const inputFilter = filterAssets[1];

    inputFilter.addEventListener('click', (e) => callback(e.target.checked, filterValue));
    return filterToggle;
}

Products.prototype._createFilter = function (filterType, filterName, filterProperty, filterValue, cssClass) {
    const filterToggle = document.createElement('div');

    const labelFilter = document.createElement('label');
    labelFilter.setAttribute('for', `input-filter-${filterValue}`);
    labelFilter.textContent = `${filterName}`;

    const inputFilter = document.createElement('input');
    inputFilter.id = `input-filter-${filterValue}`;
    inputFilter.name = filterProperty;
    inputFilter.type = filterType;
    filterToggle.append(inputFilter, labelFilter);

    return [filterToggle, inputFilter, labelFilter];
}

// Callback Types
Products.prototype.categoryCallback = function (status, filterValue) {
    this._activeFilter.category = status ? filterValue : null;
    this._allFilterProducts();
}

Products.prototype.readyToShipCallback = function (status, filterValue) {
    this._activeFilter.readyToShip = status ? filterValue : null;
    this._allFilterProducts();
}

Products.prototype.priceCallback = function (status, filterValue) {
    this._activeFilter.price = status ? filterValue : null;
    this._allFilterProducts();
}

Products.prototype.ratingCallback = function (status, filterValue) {
    this._activeFilter.rating = status ? filterValue : null;
    this._allFilterProducts();
}


// Render products by filters
Products.prototype._allFilterProducts = function () {
    productsToShow = products;

    if (this._activeFilter.category) {
        productsToShow = productsToShow.filter(p => p.category === this._activeFilter.category);
    }

    if (this._activeFilter.readyToShip) {
        productsToShow = productsToShow.filter(p => p.readyToShip === this._activeFilter.readyToShip);
    }

    if (this._activeFilter.price) {
        const priceRange = this.opt.priceCondition(this._activeFilter.price);
        const minValue = priceRange.minValue;
        const maxValue = priceRange.maxValue;
            
        productsToShow = productsToShow.filter(p => {
            p = parseInt(p.price.replace(this._cleanRegex, ''));
            return minValue <= p && p < maxValue;
        });
    }

    if (this._activeFilter.rating) {
        const ratingRange = this.opt.ratingCondition(this._activeFilter.rating);
        const minValue = ratingRange.minValue;
        const maxValue = ratingRange.maxValue;
            
        productsToShow = productsToShow.filter(p => {
            p = parseInt(p.rating);
            return minValue <= p && p < maxValue;
        });
    }
    
    this._renderProducts(this._productList, productsToShow);
}

const protoCall = new Products({
    filter: true,
    priceCondition: (filterValue) => {
        if (filterValue === 'under $15') {
            return {minValue: 0, maxValue: 15};
        } else if (filterValue === 'from $15') {
            return {minValue: 15, maxValue: Infinity};
        }
        return {minValue: 0, maxValue: Infinity};
    },
    ratingCondition: (filterValue) => {
        switch (filterValue) {
            case 'from 1*':
                return {minValue: 1, maxValue: 6};
                break;
            case 'from 2*':
                return {minValue: 2, maxValue: 6};
                break;
            case 'from 3*':
                return {minValue: 3, maxValue: 6};
                break;
            case 'from 4*':
                return {minValue: 4, maxValue: 6};
                break;
            case '5*':
                return {minValue: 5, maxValue: 6};
                break;
        }
        return {minValue: 0, maxValue: 6};
    }
});

