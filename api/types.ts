export interface Category {
    id: string;
    name: string
    description: string;
}

export type CategoryMutation = Omit<Category, 'id'>;

export interface Place {
    id: string;
    name: string;
    description: string;
}

export type PlaceMutation = Omit<Place, 'id'>;

export interface Item {
    id: string;
    categoryId: string;
    placeId: string;
    name: string;
    description: string;
    productionDate: string;
    image: string | null;
}

export type ItemMutation = Omit<Item, 'id'>;