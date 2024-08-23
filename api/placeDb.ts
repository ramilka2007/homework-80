import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Place, PlaceMutation} from "./types";
import itemDb from "./itemDb";

const filename = './places.json';
let data: Place[] = [];

const placeDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(filename);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async getItems() {
        return data;
    },
    async addItem(item: PlaceMutation) {
        const id = crypto.randomUUID();
        const place = {id, ...item};
        data.push(place);
        await this.save();
        return place;
    },
    async findPlaceById(id: string) {
        if (data.length > 0 && id) {
            let category: Place | undefined = data.find(category => category.id === id);

            if (category !== undefined) {
                return category;
            } else  {
                return null;
            }
        }
    },
    async deletePlaceById(id: string) {
        if (data.length > 0 && id) {
            let place = await this.findPlaceById(id);
            let itemByPlaceId = await itemDb.findItemByCategoryIdOrPlaceId(id);

            if (place === null) {
                return 'This place was not found';
            }

            if (place && !itemByPlaceId) {
                data = data.filter(category => category.id !== id);
                await this.save();
                return 'Place was deleted';
            } else if (place && itemByPlaceId) {
                return 'Item has this place id, so first delete item with that placeId';
            }
        }
    },
    async save() {
        return fs.writeFile(filename, JSON.stringify(data, null, 2));
    }
};

export default placeDb;
