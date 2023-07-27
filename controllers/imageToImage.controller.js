function getAllCategoriesData(req, res) {
    const { getAllCategoriesData } = require("../models/imageToImageCategories.model");
    getAllCategoriesData()
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

function get_all_category_Styles_Data(req, res) {
    let categoryName = req.query.categoryName;
    const { get_all_category_Styles_Data } = require("../models/imageToImageStyles.model");
    get_all_category_Styles_Data(categoryName)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

function addNewCategory(req, res) {
    const bodyData = req.body;
    const categoryInfo = {
        ...Object.assign({}, bodyData),
        ...Object.assign({}, req.files),
    };
    const { addNewCategory } = require("../models/imageToImageCategories.model");
    addNewCategory(categoryInfo).then((result) => {
        res.json(result);
    })
    .catch(err => {
        console.log(err);
        const { unlinkSync } = require("fs");
        unlinkSync(req.files["categoryImgFile"][0].path);
        unlinkSync(req.files["styleImgFile"][0].path);
        res.json(err);
    });
}

function addNewStyle(req, res) {
    const bodyData = req.body;
    const styleData = {
        ...Object.assign({}, bodyData),
        imgSrc: req.file.path,
    };
    const { addNewStyle } = require("../models/imageToImageStyles.model");
    addNewStyle(styleData).then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.log(err);
        const { unlinkSync } = require("fs");
        unlinkSync(req.file.path);
        res.json(err);
    });
}

function putCategoryData(req, res) {
    const categoryId = req.params.categoryId;
    const oldCategoryName = req.query.oldCategoryName;
    const newCategoryName = req.body.newCategoryName;
    console.log(categoryId, oldCategoryName, newCategoryName);
    if (!categoryId || !oldCategoryName || !newCategoryName) return "Sorry, Please Send Category Id And Old Category Name And New Category Name !!";
    const { updateCategoryData } = require("../models/imageToImageCategories.model");
    updateCategoryData(categoryId, oldCategoryName, newCategoryName)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

function putStyleData(req, res) {
    let styleId = req.params.styleId;
    let newPrompt = req.body.newPrompt,
        newNegativePrompt = req.body.newNegativePrompt;
        newDdimSteps = req.body.newDdimSteps;
        newStrength = req.body.newStrength;
    const { updateStyleData } = require("../models/imageToImageStyles.model");
    updateStyleData(styleId, newPrompt, newNegativePrompt, newDdimSteps, newStrength)
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json(err));
}

function deleteCategoryData(req, res) {
    const categoryId = req.params.categoryId;
    if (!categoryId) return "Sorry, Please Send Category Id"; 
    const { deleteCategoryData } = require("../models/imageToImageCategories.model");
    deleteCategoryData(categoryId)
        .then((result) => {
            console.log(result)
            if (result !== "Sorry, This Category Is Not Exist, Please Send Valid Category Id !!") {
                const { unlinkSync } = require("fs");
                unlinkSync(result.categoryData.imgSrc);
                for(let i = 0; i < result.categoryStylesData.length; i++) {
                    unlinkSync(result.categoryStylesData[i].imgSrc);
                }
                res.json("Category Deleting Process Is Succesfuly !!");
            }
        })
        .catch((err) => res.status(500).json(err));
}

function deleteStyleData(req, res) {
    const styleId = req.params.styleId;
    if (!styleId) return "Sorry, Please Send Style Id"; 
    const { deleteStyleData } = require("../models/imageToImageStyles.model");
    deleteStyleData(styleId)
        .then((result) => {
            if (result === "Category Style Deleting Process Is Succesfuly !!") {
                const { unlinkSync } = require("fs");
                unlinkSync(req.query.imgSrc);
                res.json(result);
            }
        })
        .catch((err) => res.status(500).json(err));
}

module.exports = {
    getAllCategoriesData,
    get_all_category_Styles_Data,
    addNewCategory,
    addNewStyle,
    putCategoryData,
    putStyleData,
    deleteCategoryData,
    deleteStyleData,
}