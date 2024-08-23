import express from "express";
import {imagesUpload} from "../multer";
import {ItemMutation} from "../types";
import itemDb from "../itemDb";

const itemsRouter = express.Router();

itemsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if (!req.body.name || !req.body.categoryId || !req.body.placeId) {
        return res.status(400).send({error: 'Category id, place id, name are required!'});
    }
    console.log(req.body.file);

    const newItem: ItemMutation = {
        categoryId: req.body.categoryId,
        placeId: req.body.placeId,
        name: req.body.name,
        description: req.body.description ? req.body.description : '',
        image: req.file ? req.file.filename : null,
        productionDate: req.body.productionDate ? req.body.productionDate : null,
    }

    const item = await itemDb.addItem(newItem);
    return res.send(item);
});

itemsRouter.get("/", async (req, res) => {
    const items = await itemDb.getItems();
    return res.send(items);
});

itemsRouter.get('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({"error": "Id params must be in url"});
    }

    let item = await itemDb.findItemById(req.params.id);

    if (item) {
        return res.send(item);
    } else {
        return res.send('This item was not found');
    }
});

itemsRouter.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({"error": "Id params must be in url"});
    }

    let item = await itemDb.deleteItemById(req.params.id);
    return res.send(item);
});

export default itemsRouter;