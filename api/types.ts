export interface Category {
    id: string;
    name: string
    description: string;
}

export type CategoryMutation = Omit<Category, 'id'>;