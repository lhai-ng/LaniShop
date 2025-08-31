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
        description: `
            <p>
                <strong>Anti-Fungi Spray</strong> is a fast-acting cleaning solution designed to remove and prevent 
                mold on multiple surfaces around the home. It works effectively on painted walls, tiles, grout, 
                kitchen areas, plastic, stainless steel, and coated wood. The water-based formula penetrates quickly, 
                lifts mold stains, neutralizes musty odors, and leaves a thin protective layer to help slow down 
                regrowth.
            </p>
            <ul>
                <li><strong>Quick results:</strong> Cleans mold spots and dark stains efficiently.</li>
                <li><strong>Mild formula:</strong> Gentle scent, low irritation, no harsh chlorine smell.</li>
                <li><strong>Multi-purpose:</strong> Suitable for most sealed household surfaces.</li>
                <li><strong>Long-lasting:</strong> Provides light protection against mold recurrence.</li>
            </ul>
        `,
        productDetail: `
            <table>
                <tbody>
                <tr>
                    <th>Brand</th>
                    <td>CitySprout</td>
                </tr>
                <tr>
                    <th>Volume</th>
                    <td>500 ml spray bottle</td>
                </tr>
                <tr>
                    <th>Formula</th>
                    <td>Water-based solution with anti-fungal agents</td>
                </tr>
                <tr>
                    <th>Suitable Surfaces</th>
                    <td>Painted walls, tiles, grout, stainless steel, plastic, coated wood</td>
                </tr>
                <tr>
                    <th>Not Recommended</th>
                    <td>Raw wood, fabrics, natural leather</td>
                </tr>
                <tr>
                    <th>Scent</th>
                    <td>Mild and fresh, fades quickly</td>
                </tr>
                <tr>
                    <th>SKU</th>
                    <td>AFS-500</td>
                </tr>
                <tr>
                    <th>Shelf Life</th>
                    <td>36 months from manufacturing date</td>
                </tr>
                </tbody>
            </table>
        `,
    }),
    new Products({
        id: 2,
        image: 'images/balconyrailingplanters.png',
        name: 'Balcony-railing Planter',
        price: '$12.99',
        category: 'healthy',
        readyToShip: true,
        rating: 3.6,
    }),
    new Products({
        id: 3,
        image: 'images/basil.png',
        name: 'Basil',
        price: '$13.23',
        category: 'healthy', 
        rating: 2.4,
    }),
    new Products({
        id: 4,
        image: 'images/bioorganicfertilizer.png',
        name: 'Bio-organic Fertilizer',
        price: '$14.4',
        category: 'unhealthy',
        rating: 2.6,
    }),
    new Products({
        id: 5,
        image: 'images/blueberry.png',
        name: 'Blueberry',
        price: '$15.24',
        category: 'unhealthy',
        rating: 4.7,
        sold: true,
    }),
    new Products({
        id: 6,
        image: 'images/butterflypea.png',
        name: 'Butterfly Pea',
        price: '$16.52',
        category: 'healthy',
        readyToShip: true,
        rating: 5,
    }),
    new Products({
        id: 7,
        image: 'images/cabbage.png',
        name: 'Cabbage',
        price: '$17.24',
        prevPrice: '$18.43',
        category: 'healthy',
        rating: 1.2,
    }),
    new Products({
        id: 8,
        image: 'images/carrot.png',
        name: 'Carrot',
        price: '$18.24',
        category: 'unhealthy', 
        readyToShip: true,
        rating: 3.4,
    }),
]

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
