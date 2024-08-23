import {promises as fs} from 'fs';
import crypto from 'crypto';
import {Category, CategoryMutation} from "./types";

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
    async save() {
        return fs.writeFile(filename, JSON.stringify(data, null, 2));
    }
};

export default categoryDb;
