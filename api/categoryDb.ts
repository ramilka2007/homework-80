import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Category, CategoryMutation} from "./types";
import itemDb from "./itemDb";

const filename = './categories.json';
let data: Category[] = [];

const categoryDb = {
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
    async addItem(item: CategoryMutation) {
        const id = crypto.randomUUID();
        const category = {id, ...item};
        data.push(category);
        await this.save();
        return category;
    },
    async findCategoryById(id: string) {
        if (data.length > 0 && id) {
            let category: Category | undefined = data.find(category => category.id === id);

            if (category !== undefined) {
                return category;
            } else  {
                return null;
            }
        }
    },
    async deleteCategoryById(id: string) {
        if (data.length > 0 && id) {
            let category = await this.findCategoryById(id);
            let itemByCategoryId = await itemDb.findItemByCategoryIdOrPlaceId(id);

            if (category === null) {
                return 'This category was not found';
            }

            if (category && !itemByCategoryId) {
                data = data.filter(category => category.id !== id);
                await this.save();
                return 'Category was deleted';
            } else if (category && itemByCategoryId) {
                return 'Item has this category id, so first delete item with that categoryId';
            }
        }
    },
    async save() {
        return fs.writeFile(filename, JSON.stringify(data, null, 2));
    }
};

export default categoryDb;
