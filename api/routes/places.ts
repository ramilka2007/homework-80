import express from "express";
import {PlaceMutation} from "../types";
import placeDb from "../placeDb";

const placesRouter = express.Router();


placesRouter.post('/', async (req, res) => {
    if (!req.body.name) {
        return res.status(404).send({"error": "Name is required"});
    }

    let newPlace: PlaceMutation = {
        name: req.body.name,
        description: req.body.description ? req.body.description : '',
    };

    newPlace = await placeDb.addItem(newPlace);

    return res.send(newPlace);
});

placesRouter.get("/", async (req, res) => {
    const places = await placeDb.getItems();
    return res.send(places);
});

placesRouter.get('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({"error": "Id params must be in url"});
    }

    let place = await placeDb.findPlaceById(req.params.id);

    if (place) {
        return res.send(place);
    } else {
        return res.send('This place was not found');
    }
});

placesRouter.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({"error": "Id params must be in url"});
    }

    let place = await placeDb.deletePlaceById(req.params.id);
    return res.send(place);
});

export default placesRouter;