const products = [
    new Products({
        id: 1,
        name: 'burger',
        price: '$11',
        category: 'unhealthy'
    }),
    new Products({
        id: 2,
        name: 'salad',
        price: '$12',
        category: 'healthy'
    }),
    new Products({
        id: 3,
        name: 'steak',
        price: '$13',
        category: 'healthy'
    }),
    new Products({
        id: 4,
        name: 'coke',
        price: '$14',
        category: 'unhealthy'
    }),
    new Products({
        id: 5,
        name: 'fries',
        price: '$15',
        category: 'unhealthy'
    }),
    new Products({
        id: 6,
        name: 'chicken',
        price: '$16',
        category: 'healthy'
    }),
    new Products({
        id: 7,
        name: 'spaghetti',
        price: '$17',
        category: 'healthy'
    }),
    new Products({
        id: 8,
        name: 'gum',
        price: '$18',
        category: 'unhealthy'
    }),
]

function Products(options = {}) {
    this.opt = Object.assign({
        filter: false,
    }, options)

    this.id = this.opt.id;
    this.name = this.opt.name;
    this.price = this.opt.price;
    this.category = this.opt.category;

    this.filter = this.opt.filter;
    this._cleanRegex = /[^a-zA-Z0-9]/g;

    this._activeFilter = {
        category: null,
        price: null,
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

Products.prototype.addFilterRadio = function (filterName, filterProperty, filterValue, cssClass, callback) {
    const filterToggle = document.createElement('div');

    const labelFilter = document.createElement('label');
    labelFilter.setAttribute('for', `input-filter-${filterValue}`);
    labelFilter.textContent = `${filterName}`;

    const inputFilter = document.createElement('input');
    inputFilter.id = `input-filter-${filterValue}`;
    inputFilter.name = filterProperty;
    inputFilter.type = 'radio';
    inputFilter.addEventListener('change', (e) => {
        callback(e.target.checked, filterValue)
    });

    filterToggle.append(inputFilter, labelFilter);
    this._filterControls.appendChild(filterToggle);
}

Products.prototype.categoryCallback = function (status, filterValue) {
    this._activeFilter.category = status ? filterValue : null;
    this._allFilterProducts();
}

Products.prototype.valueCallback = function (status, filterValue) {
    this._activeFilter.price = status ? filterValue : null;
    this._allFilterProducts();
}

Products.prototype._allFilterProducts = function () {
    let productsToShow = products;

    if (this._activeFilter.category) {
        productsToShow = productsToShow.filter(p => p.category === this._activeFilter.category);
    }

    if (this._activeFilter.price) {
        let minValue, maxValue;
            if (this._activeFilter.price === 'under $15') {
                minValue = 0;
                maxValue = 15;
            } else if (this._activeFilter.price === 'from $15') {
                minValue = 15;
                maxValue = Infinity;
            }
        productsToShow = productsToShow.filter(p => {
            p = parseInt(p.price.replace(protoCall._cleanRegex, ''));
            return minValue <= p && p < maxValue;
        });
    }

    this._renderProducts(this._productList, productsToShow);
}

const protoCall = new Products({
    filter: true,
});

