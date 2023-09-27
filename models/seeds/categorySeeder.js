const db = require('../../config/mongoose')
const Category = require('../category')
const categoryList = require('./category.json')

db.once('open', async () => {
    try {
        for (const categoryData of categoryList) {
            const existingCategory = await Category.findOne({ name: categoryData.name }).lean();
            if (existingCategory) {
                console.log(`Category "${categoryData.name}" already exists.`);
            } else {
                await Category.create(categoryData);
                console.log(`Category "${categoryData.name}" seeded successfully!`);
            }
        }
        process.exit();
    } catch (error) {
        console.error('Error seeding categories:', error);
        process.exit(1);
    }
});