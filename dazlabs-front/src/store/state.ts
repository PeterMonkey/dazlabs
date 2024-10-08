import { create } from 'zustand';

export interface Items {
    breed: string;
    origin: string;
    image: string;
}

interface Store {
    items: Items[];
    addItem: (data: Items) => void;
    // updateItem: () => void;
    // deleteItem: () => void;
    // openDialog: () => void;
}

export const useStoreApp = create<Store>()((set) => ({
    items: [],
    addItem: (data: Items) => set((state) => ({
        items: [...state.items, {...data}]
    }))
}))