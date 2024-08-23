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