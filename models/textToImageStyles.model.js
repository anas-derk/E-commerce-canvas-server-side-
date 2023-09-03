// Import Mongoose And Text To Image Style Model Object

const { mongoose, textToImageStyleModel } = require("../models/all.models");

// Import Database URL

const DB_URL = require("../global/DB_URL");

async function get_all_category_Styles_Data(categoryName) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        const categoryStylesData = await textToImageStyleModel.find({ categoryName }).sort({ sortNumber: 1 });
        if (categoryStylesData) {
            await mongoose.disconnect();
            return categoryStylesData;
        }
        else {
            mongoose.disconnect();
            return "Sorry, There Is No Styles For This Category Data Now !!";
        }
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function addNewStyle(styleData) {
    try {
        await mongoose.connect(DB_URL);
        const stylesCount = await textToImageStyleModel.countDocuments({ categoryName: styleData.categoryName });
        const newStyleData = new textToImageStyleModel({
            imgSrc: styleData.imgSrc,
            name: styleData.styleName,
            prompt: styleData.stylePrompt,
            negative_prompt: styleData.styleNegativePrompt,
            modelName: styleData.modelName,
            categoryName: styleData.categoryName,
            sortNumber: stylesCount + 1,
        });
        await newStyleData.save();
        await mongoose.disconnect();
        return "Adding New Category Style For Text To Image Page Process Is Succesfuly !!";
    }
    catch (err) {
        console.log(err);
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function updateStyleData(styleId, categoryName, newCategoryStyleSortNumber, newName, newPrompt, newNegativePrompt) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        const theSecondStyle = await textToImageStyleModel.findOne({ sortNumber: newCategoryStyleSortNumber, categoryName: categoryName });
        const theFirstStyle = await textToImageStyleModel.findOneAndUpdate({ _id: styleId }, {
            name: newName,
            prompt: newPrompt,
            negative_prompt: newNegativePrompt,
            sortNumber: newCategoryStyleSortNumber,
        }, { returnOriginal: true });
        await textToImageStyleModel.updateOne({
            _id: theSecondStyle._id,
        }, {
            sortNumber: theFirstStyle.sortNumber,
        });
        await mongoose.disconnect();
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

async function deleteStyleData(styleId) {
    try {
        // Connect To DB
        await mongoose.connect(DB_URL);
        // Check If Email Is Exist
        const result = await textToImageStyleModel.deleteOne({
            _id: styleId,
        });
        await mongoose.disconnect();
        if (result.deletedCount === 0) return "Sorry, This Style Is Not Exist, Please Send Valid Style Id !!";
        return "Category Style Deleting Process Is Succesfuly !!";
    }
    catch (err) {
        // Disconnect In DB
        await mongoose.disconnect();
        throw Error("Sorry, Error In Process, Please Repeated This Process !!");
    }
}

module.exports = {
    get_all_category_Styles_Data,
    updateStyleData,
    deleteStyleData,
    addNewStyle,
}