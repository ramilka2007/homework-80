import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Item, ItemMutation} from "./types";
import categoryDb from "./categoryDb";
import placeDb from "./placeDb";

const filename = './items.json';
let data: Item[] = [];

const itemDb = {
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
    async addItem(product: ItemMutation) {
        const id = crypto.randomUUID();
        const item = {id, ...product};

        let category = await categoryDb.findCategoryById(product.categoryId);
        let place = await placeDb.findPlaceById(product.placeId);

        if (category !== null && place !== null) {
            data.push(item);
            await this.save();

            return item;
        } else {
            return 'Category id, place id are required';
        }
    },
    async findItemById(id: string) {
        if (data.length > 0 && id) {
            let item: Item | undefined = data.find(product => product.id === id);

            if (item !== undefined) {
                return item;
            } else  {
                return null;
            }
        }
    },
    async findItemByCategoryIdOrPlaceId(id: string) {
        if (data.length > 0 && id) {
            let itemByCategory: Item | undefined = data.find(item => item.categoryId === id);
            let itemByLocation: Item | undefined = data.find(item => item.placeId === id);

            return itemByCategory !== undefined || itemByLocation !== undefined;
        }
    },
    async deleteItemById(id: string) {
        if (data.length > 0 && id) {
            let item = await this.findItemById(id);

            if (item === null) {
                return 'This item was not found';
            }

            if (item) {
                data = data.filter(place => place.id !== id);
                await this.save();
                return 'Item was deleted';
            }
        }
    },
    async save() {
        return fs.writeFile(filename, JSON.stringify(data, null, 2));
    }
};

export default itemDb;
