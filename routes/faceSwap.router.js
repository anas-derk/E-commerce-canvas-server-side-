const faceSwapRouter = require("express").Router();

const faceSwapController = require("../controllers/faceSwap.controller");

faceSwapRouter.get("/generate-image", faceSwapController.generateImage);

faceSwapRouter.get("/styles/styles-data", faceSwapController.getAllStylesData);

module.exports = faceSwapRouter;