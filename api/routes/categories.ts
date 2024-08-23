import express from "express";
import categoryDb from "../categoriesDb";
import {CategoryMutation} from "../types";
import categoriesDb from "../categoriesDb";

const categoriesRouter = express.Router();


categoriesRouter.post('/', async (req, res) => {
    if (!req.body.name) {
        return res.status(404).send({"error": "Name is required"});
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

categoriesRouter.get('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({"error": "Id params must be in url"});
    }

    let category = await categoriesDb.findCategoryById(req.params.id);

    if (category) {
        return res.send(category);
    } else {
        return res.send('This category was not found');
    }
});

categoriesRouter.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({"error": "Id params must be in url"});
    }

    let category = await categoriesDb.deleteCategoryById(req.params.id);
    return res.send(category);
});


export default categoriesRouter;