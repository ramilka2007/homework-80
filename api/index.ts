import express from 'express';
import cors from 'cors';
import itemsRouter from "./routes/items";
import placesRouter from "./routes/places";
import categoriesRouter from "./routes/categories";
import categoryDb from "./categoryDb";
import placeDb from "./placeDb";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use('/categories', categoriesRouter);
app.use('/places', placesRouter);
app.use('/items', itemsRouter);

const run = async () => {
    await categoryDb.init();
    await placeDb.init();

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(console.error);

