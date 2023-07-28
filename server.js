/* Start Import And Create Express App */

const express = require("express");

const app = express();

/* End Import And Create Express App */

/* Start Config The Server */

const cors = require("cors"),
    bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());

require('dotenv').config();

/* End Config The Server */

/* Start direct the browser to statics files path */

const path = require("path");

app.use("/assets", express.static(path.join(__dirname, "assets")));

/* End direct the browser to statics files path */

/* Start Running The Server */

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`The Server Is Running On: http://localhost:${PORT}`));

/* End Running The Server */

/* Start Handle The Routes */

const usersRouter = require("./routes/users.router"),
    adminRouter = require("./routes/admin.router"),
    textToImageRouter = require("./routes/textToImage.router"),
    imageToImageRouter = require("./routes/imageToImage.router"),
    productsRouter = require("./routes/products.router"),
    ordersRouter = require("./routes/orders.router"),
    categoriesRouter = require("./routes/categories.router");

app.use("/users", usersRouter);

app.use("/admin", adminRouter);

app.use("/text-to-image", textToImageRouter);

app.use("/image-to-image", imageToImageRouter);

app.use("/products", productsRouter);

app.use("/orders", ordersRouter);

app.use("/categories", categoriesRouter);

app.post("/download-created-image", (req, res) => {
    const { get } = require('axios');
    const { createWriteStream } = require('fs');
    const imageData = req.body;
    imageData.imageName = imageData.imageName.replaceAll(" ", "_");
    const randomImageName = `${Math.random()}_${Date.now()}__${imageData.imageName}`;
    const destination = path.join(__dirname, "assets", "images" , "generatedImages", randomImageName);
    get(imageData.imageUrl, { responseType: 'stream' })
        .then(response => {
            response.data.pipe(createWriteStream(destination));
            res.json({ msg: "success file downloaded !!", imageUrl: `assets/images/generatedImages/${randomImageName}`});
        })
        .catch(error => {
            console.error('حدث خطأ أثناء تحميل الصورة:', error);
            res.status(500).json(error);
        });
});

/* End Handle The Routes */