function getPricesByProductName(req, res) {
    const productName = req.query.productName;
    if (!productName) res.status(400).json("Please Send Product Name !!");
    else if (
        productName !== "poster" &&
        productName !== "wooden-frame" &&
        productName !== "hanger" &&
        productName !== "canvas"
    ) res.status(400).json("Please Send Valid Product Name !!");
    else {
        const { getPricesByProductName } = require("../models/prices.model");
        getPricesByProductName(productName)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    }
}

function putProductPrice(req, res) {
    const productId = req.params.productId;
    const   newProductPriceBeforeDiscount = req.body.newProductPriceBeforeDiscount,
            newProductPriceAfterDiscount = req.body.newProductPriceAfterDiscount;
    console.log(productId, newProductPriceBeforeDiscount, newProductPriceAfterDiscount)
    if (!productId) res.status(400).json("Please Send Product Id !!");
    else {
        const { updateProductPrice } = require("../models/prices.model");
        updateProductPrice(productId, newProductPriceBeforeDiscount, newProductPriceAfterDiscount)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    }
}

function getPriceByProductDetails(req, res) {
    const   productName = req.query.productName,
            position = req.query.position,
            dimentions = req.query.dimentions;
    if (!productName || !dimentions || !position) res.status(400).json("Please Send All Product Details !!");
    else {
        const { getPriceByProductDetails } = require("../models/prices.model");
        getPriceByProductDetails(productName, position, dimentions)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
}

module.exports = {
    getPricesByProductName,
    putProductPrice,
    getPriceByProductDetails,
}