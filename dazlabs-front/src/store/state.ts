import { create } from 'zustand';

export interface Items {
    _id?: string;
    breed: string;
    origin: string;
    image: string;
}

interface Store {
    items: Items[];
    addItem: (data: Items) => void;
    loadData: (data: Items[]) => void
    //update: (data: Items) => void;
    //delete: (id: number) => void;
    // openDialog: () => void;
}

export const useStoreApp = create<Store>()((set) => ({
    items: [],
    addItem: (data: Items) => set((state) => ({
        items: [{...data}, ...state.items]
    })),
    loadData: (data: Items[]) => set((state) => ({
        items: data
    }))
}))