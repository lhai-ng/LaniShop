const products = [
    new Products({
        id: 1,
        name: 'burger',
        price: '$11',
        category: 'unhealthy',
        colors: ['red', 'blue'], 
    }),
    new Products({
        id: 2,
        name: 'salad',
        price: '$12',
        category: 'healthy',
    }),
    new Products({
        id: 3,
        name: 'steak',
        price: '$13',
        category: 'healthy', 
    }),
    new Products({
        id: 4,
        name: 'coke',
        price: '$14',
        category: 'unhealthy',
    }),
    new Products({
        id: 5,
        name: 'fries',
        price: '$15',
        category: 'unhealthy',
        colors:['red', 'green'], 
    }),
    new Products({
        id: 6,
        name: 'chicken',
        price: '$16',
        category: 'healthy',
        colors:['blue', 'green'], 
    }),
    new Products({
        id: 7,
        name: 'spaghetti',
        price: '$17',
        category: 'healthy',
    }),
    new Products({
        id: 8,
        name: 'gum',
        price: '$18',
        category: 'unhealthy', 
    }),
]

function Products(options = {}) {
    this.opt = Object.assign({
        filter: false,
        priceCondition: null,
        colors: [],
    }, options)

    this.id = this.opt.id;
    this.name = this.opt.name;
    this.price = this.opt.price;
    this.category = this.opt.category;
    this.colors = this.opt.colors;

    this.filter = this.opt.filter;
    this._cleanRegex = /[^a-zA-Z0-9]/g;
    this._radioStates = {};

    this._activeFilter = {
        category: null,
        price: null,
        colors: [],
    }
    
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

Products.prototype._renderListCard = function (product) {
    const card = document.createElement('a');
    card.href = `productdetail.html?id=${product.id}`;
    card.className = 'card';
    card.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.price}</p>
    `;
    return card;
}

Products.prototype._renderProducts = function (productList, productArray) {
    productList.innerHTML = '';
    productArray.forEach(product => {
        const card = this._renderListCard(product);
        productList.appendChild(card);
    });
}

Products.prototype._renderDetail = function (product) {
    const cardDetail = document.createElement('div');
    cardDetail.innerHTML = `
        <h3>${product.id}. ${product.name}</h3>
        <p>${product.price}</p>
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

Products.prototype.priceCallback = function (status, filterValue) {
    this._activeFilter.price = status ? filterValue : null;
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

    if (this._activeFilter.price) {
        const priceRange = this.opt.priceCondition(this._activeFilter.price);
        const minValue = priceRange.minValue;
        const maxValue = priceRange.maxValue;
            
        productsToShow = productsToShow.filter(p => {
            p = parseInt(p.price.replace(this._cleanRegex, ''));
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
    }
});

