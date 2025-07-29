const products = [
    new Products({
        id: 1,
        image: 'images/antifungispray.png',
        name: 'Anti Fungi Spray',
        price: '$11',
        prevPrice: '$13,99',
        category: 'unhealthy',
        colors: ['red', 'blue'],
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
        colors:['red', 'green'], 
        rating: 4.7,
        sold: true,
    }),
    new Products({
        id: 6,
        image: 'images/butterflypea.png',
        name: 'Butterfly Pea',
        price: '$16',
        category: 'healthy',
        colors:['blue', 'green'], 
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
        sold: false,
        prevPrice: '',
    }, options)

    this.id = this.opt.id;
    this.image = this.opt.image
    this.name = this.opt.name;
    this.price = this.opt.price;
    this.prevPrice = this.opt.prevPrice;
    this.category = this.opt.category;
    this.colors = this.opt.colors;
    this.rating = this.opt.rating;
    this.sold = this.opt.sold
    this.readyToShip = this.opt.readyToShip

    this.filter = this.opt.filter;
    this._cleanRegex = /[^a-zA-Z0-9]/g;
    this._radioStates = {};

    this._activeFilter = {
        price: null,
        colors: [],
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
    
    this._renderImage(card, product);
    this._renderRating(card, product);
    this._renderName(card, product);
    this._renderColors(card, product);
    this._renderPrice(card, product);
    this._renderPrevPrice(card, product);
    this._renderButton(card, product)
   
    return card;
}

Products.prototype._renderImage = function (card, product) {
    const cardImage = document.createElement('img');
    cardImage.className = 'card-image';
    cardImage.setAttribute('src', product.image);
    card.appendChild(cardImage)
}

Products.prototype._renderRating = function(card, product) {
    const cardRating = document.createElement('p');
    cardRating.className = 'card-rating';
    cardRating.textContent = product.rating;
    card.appendChild(cardRating);
}

Products.prototype._renderName = function (card, product) {
    const cardName = document.createElement('h4');
    cardName.className = 'card-name';
    cardName.textContent = product.name;
    card.appendChild(cardName);
}

Products.prototype._renderColors = function (card, product) {
    const colorList = document.createElement('div');
    colorList.className = 'color-list';
    card.appendChild(colorList);
    if (product.colors.length > 0) {
        product.colors.forEach(color => {
            const colorSelection = document.createElement('div');
            colorSelection.className = 'color-selection';
            colorSelection.style.background = color;
            colorList.appendChild(colorSelection);
        });
    }
}

Products.prototype._renderPrice = function (card, product) {
    const cardPrice = document.createElement('p');
    cardPrice.className = 'card-price';
    cardPrice.textContent = product.price;
    card.appendChild(cardPrice);
}

Products.prototype._renderPrevPrice = function (card, product) {
    const cardPrevPrice = document.createElement('p');
    cardPrevPrice.className = 'card-revprice';
    cardPrevPrice.textContent = product.prevPrice;
    card.appendChild(cardPrevPrice);
}

Products.prototype._renderButton = function (card, product) {
    const cardButton = document.createElement('button');
    cardButton.className = `add-to-cart ${product.sold ? 'sold' : ''}`;
    cardButton.textContent = 'Add to cart!';
    card.appendChild(cardButton);
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
        this._filterControls = document.createElement('aside'); 
        this._filterControls.id = 'filter-controls';
        document.body.appendChild(this._filterControls);
    }
    this._productList = document.createElement('section');
    this._productList.id = 'product-list';
    document.body.appendChild(this._productList);
    this._renderProducts(this._productList, products);
}

Products.prototype._renderDetail = function (product) {
    const cardDetail = document.createElement('div');
    cardDetail.innerHTML = `
        <img class="card-image" src=${product.image}>
        <p>${product.rating}</p>
        <h3>${product.id}. ${product.name}</h3>
        <p>${product.price}</p>
        <p>${product.prevPrice}</p>
        <button class="add-to-cart ${product.sold ? 'sold' : ''}">Add to cart!</button>
    `;
    return cardDetail;
}

// Filter Types

Products.prototype.addFilterRadio = function (filterName, filterProperty, filterValue, cssClass, callback) {
    const filterToggle = document.createElement('div');

    const labelFilter = document.createElement('label');
    labelFilter.setAttribute('for', `input-filter-${filterValue}`);
    labelFilter.textContent = `${filterName}`;

    const inputFilter = document.createElement('input');
    inputFilter.id = `input-filter-${filterValue}`;
    inputFilter.name = filterProperty;
    inputFilter.type = 'radio';

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
    this._filterControls.appendChild(filterToggle);
}

Products.prototype.addFilterCheckbox = function (filterName, filterProperty, filterValue, cssClass, callback) {
    const filterToggle = document.createElement('div');

    const labelFilter = document.createElement('label');
    labelFilter.setAttribute('for', `input-filter-${filterValue}`);
    labelFilter.textContent = `${filterName}`;

    const inputFilter = document.createElement('input');
    inputFilter.id = `input-filter-${filterValue}`;
    inputFilter.name = filterProperty;
    inputFilter.type = 'checkbox';

    inputFilter.addEventListener('click', (e) => callback(e.target.checked, filterValue));
    
    filterToggle.append(inputFilter, labelFilter);
    this._filterControls.appendChild(filterToggle);
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

Products.prototype.colorCallback = function (status, filterValue) {
    if (status) {
        if (!this._activeFilter.colors.includes(filterValue)) {
            this._activeFilter.colors.push(filterValue);
        }
    } else {
        this._activeFilter.colors = this._activeFilter.colors.filter(color => color !== filterValue);
    }
    this._allFilterProducts();
}

// Render Products by filters
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

    if (this._activeFilter.colors.length > 0) {
        productsToShow = productsToShow.filter(p => {
            return p.colors.some(color => this._activeFilter.colors.includes(color));
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

