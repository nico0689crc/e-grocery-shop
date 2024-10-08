const fs = require('fs');

const reviews = JSON.parse(fs.readFileSync('reviews.json', 'utf8'));
const categoriesData = JSON.parse(fs.readFileSync('categories.json', 'utf8'));
const categoriesToSave = [];

const products = JSON.parse(fs.readFileSync('products.json', 'utf8')).filter((product) => product.shop_id === 6).map((product) => {
    const { 
        name, 
        slug, 
        description, 
        price, 
        sale_price: salePrice, 
        min_price: minPrice, 
        max_price: maxPrice, 
        quantity: stock, 
        in_stock: inStock, 
        status, 
        categories,
        tags,
        unit,
        height,
        width,
        length,
        image,
        gallery,
        video,
        deleted_at: deletedAt,
        created_at: createdAt,
        updated_at: updatedAt, 
        ratings,
        total_reviews: totalReviews,
        rating_count: ratingCount,
    } = product;

    return { 
        name, 
        slug, 
        description, 
        price, 
        salePrice, 
        minPrice, 
        maxPrice, 
        stock, 
        inStock, 
        status, 
        tags,
        unit,
        height,
        width,
        length, 
        catagories: categories.map((category) => {

            const categoryIndex = categoriesToSave.findIndex((_category) => category.id === _category.id);

            if (categoryIndex === -1) {
               const { 
                    id,
                    name,
                    slug,
                    parent_id: parentId,
                    children,
                    created_at: createdAt,
                    updated_at: updatedAt,
                    deleted_at: deletedAt,
                } = categoriesData.find(_category => category.id === _category.id);

                categoriesToSave.push({ 
                    id,
                    name,
                    slug,
                    parent_id: parentId,
                    children: children.map((child) => child.id),
                    created_at: createdAt,
                    updated_at: updatedAt,
                    deleted_at: deletedAt,
                });
            }

            return category.id;
        }),
        attachements: {
            images : [
                {
                    thumbnail: image.thumbnail,
                    original: image.original,
                    isPrimary: true,
                    order: 1
                },
                ...gallery.map((image, index) => ({
                    thumbnail: image.thumbnail,
                    original: image.original,
                    isPrimary: false,
                    order: index + 2
                })),
            ],
            videos: video ? video.map((video, index) => ({
                url: video.url,
                order: index + 1
            })) : [],
        }, 
        ratings,
        ratingCount,
        totalReviews,
        reviews: reviews.filter((review) => review.product_id === product.id).map(({
            comment,
            rating,
            deleted_at: deletedAt,
            created_at: createdAt,
            updated_at: updatedAt,
            positive_feedbacks_count: positiveFeedbacksCount,
            negative_feedbacks_count: negativeFeedbacksCount,
            user
        }) => ({
            comment,
            rating,
            positiveFeedbacksCount,
            negativeFeedbacksCount,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            createdAt,
            updatedAt,
            deletedAt,
        })),
        createdAt,
        updatedAt,
        deletedAt,
    };
});

// const catagories = JSON.parse(fs.readFileSync('categories.json', 'utf8')).filter((category) => category.shop_id === 6).map((category) => {
//     const { 
//         id,
//         name,
//         slug,
//         parent_id: parentId,
//         children,
//         created_at: createdAt,
//         updated_at: updatedAt,
//         deleted_at: deletedAt,
//     } = category;

//     return { 
//         id,
//         name,
//         slug,
//         parentId,
//         children: children.map((child) => child.id),
//         createdAt,
//         updatedAt,
//         deletedAt,
//     };
// });

fs.writeFile('products_updated.json', JSON.stringify({products, categories: categoriesToSave}, null, 2), 'utf8', err => {
    if (err) {
        console.error('Error al escribir el archivo:', err);
        return;
    }
    console.log('Archivo actualizado guardado como products_updated.json');
});