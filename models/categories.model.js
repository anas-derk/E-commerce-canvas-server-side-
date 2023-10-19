// Import Mongoose And Category Model Object

const { mongoose, categoryModel } = require("../models/all.models");

async function getAllCategories() {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const categoriesList = await categoryModel.find({});
        await mongoose.disconnect();
        return categoriesList;
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function addNewCategory(categoryType, categoryName) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const category = await categoryModel.findOne({ categoryType: categoryType, name: categoryName });
        if (category) {
            await mongoose.disconnect();
            return "Sorry, This Category Has Already Been Added !!";
        }
        else {
            const newCategory = new categoryModel({
                categoryType: categoryType,
                name: categoryName,
            });
            await newCategory.save();
            await mongoose.disconnect();
            return "Congratulations, the category has been successfully added";
        }
        }
        catch (err) {
            // Disconnect In DB
            await mongoose.disconnect();
            throw Error("Sorry, Error In Process, Please Repeated This Process !!");
        }
}

async function addNewSubCategory(categoryType, categoryName, subCategoryName) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const category = await categoryModel.findOne({ categoryType: categoryType, name: categoryName });
        if (!category) {
            await mongoose.disconnect();
            return "Sorry, This Category Not Found !!";
        }
        else {
            const subCategoryIndex = category.subCategories.findIndex((subCategory) => subCategory.subCategoryName === subCategoryName);
            if (subCategoryIndex === -1) {
                await categoryModel.updateOne({
                    name: categoryName,
                }, {
                    $push: {
                        subCategories: [{
                            subCategoryName: subCategoryName,
                            subCategories: [],
                        }],
                    }
                });
                await mongoose.disconnect();
                return "Congratulations, the sub category has been successfully added";
            } else {
                await mongoose.disconnect();
                return "Sorry, This Sub Cateogory Has Already Been Added !!";
            }
        }
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function addNewSubCategoryFromSubCategory(categoryType, categoryName, subCategoryName, subCategoryFromSubCategoryName) {
    try {
        // Connect To DB
        await mongoose.connect(process.env.DB_URL);
        const category = await categoryModel.findOne({ categoryType: categoryType, name: categoryName });
        if (!category) {
            await mongoose.disconnect();
            return "Sorry, This Category Not Found !!";
        }
        else {
            const subCategoryIndex = category.subCategories.findIndex((subCategory) => subCategory.subCategoryName === subCategoryName);
            if (subCategoryIndex > -1) {
                const subCategoryFromSubCategoryIndex = category.subCategories[subCategoryIndex].subCategories.findIndex((subCategoryFromSubCatgory) => subCategoryFromSubCatgory.subCategoryName === subCategoryFromSubCategoryName);
                console.log(subCategoryFromSubCategoryIndex)
                if (subCategoryFromSubCategoryIndex === -1) {
                    category.subCategories[subCategoryIndex].subCategories.push({ subCategoryName: subCategoryFromSubCategoryName });
                    await categoryModel.updateOne({
                        name: categoryName,
                    }, {
                        $set: {
                            subCategories: category.subCategories,
                        }
                    });
                    await mongoose.disconnect();
                    return "Congratulations, the sub category has been successfully added";
                } else {
                    await mongoose.disconnect();
                    return "Sorry, This Sub Cateogory Has Already Been Added !!";
                }
            } else {
                await mongoose.disconnect();
                return "Sorry, This Sub Cateogory Not Found !!";
            }
        }
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

module.exports = {
    addNewCategory,
    getAllCategories,
    addNewSubCategory,
    addNewSubCategoryFromSubCategory,
}