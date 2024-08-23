import express from "express";
import categoryDb from "../categoriesDb";
import {CategoryMutation} from "../types";
import categoriesDb from "../categoriesDb";

const categoriesRouter = express.Router();


categoriesRouter.post('/', async (req, res) => {
    if (!req.body.name) {
        res.status(404).send({"error": "Name is required"});
    }

    let newCategory: CategoryMutation = {
        name: req.body.name,
        description: req.body.description ? req.body.description : '',
    };

    newCategory = await categoriesDb.addItem(newCategory);

    return res.send(newCategory);
});

categoriesRouter.get("/", async (req, res) => {
    const categories = await categoryDb.getItems();
    return res.send(categories);
});


export default categoriesRouter;