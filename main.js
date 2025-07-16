
function Products(options = {}) {
    this.opt = Object.assign({
        filter: false,
    }, options)

    this.id = this.opt.id;
    this.name = this.opt.name;
    this.price = this.opt.price;
    this.category = this.opt.category;

    this.filter = this.opt.filter;
}

// To-do: Create renderProductList, including rendering filterList

Products.prototype.renderListCard = function (product) {
    const card = document.createElement('a');
    card.href = `productdetail.html?id=${product.id}`;
    card.className = 'card';
    card.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.price}</p>
    `;
    return card;
}

Products.prototype.renderProducts = function (productList, productArray) {
    productList.innerHTML = '';
    productArray.forEach(product => {
        const card = product.renderListCard(product);
        productList.appendChild(card);
    });
}

Products.prototype.renderDetail = function (product) {
    const cardDetail = document.createElement('div');
    cardDetail.innerHTML = `
        <h3>${product.id}. ${product.name}</h3>
        <p>${product.price}</p>
    `;
    return cardDetail;
}

Products.prototype.addFilter = function (sortName, cssClass, callback) {
    console.log(this.filter);
}

const protoCall = new Products({
    filter: true,
});

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