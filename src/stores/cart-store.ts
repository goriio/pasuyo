import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  quantity: number;
  checked: boolean;
};

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  toggleCheck: (id: string) => void;
  isAllSelected: () => boolean;
  toggleSelectAll: () => void;
  deleteSelected: () => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === newItem.id
          );

          if (!existingItem) {
            return { items: [...state.items, newItem] };
          }

          return {
            items: state.items.map((item) => {
              return item.id === newItem.id
                ? {
                    ...item,
                    quantity: item.quantity + newItem.quantity,
                  }
                : item;
            }),
          };
        }),
      incrementQuantity: (id: string) =>
        set((state) => {
          return {
            items: state.items.map((item) => {
              return item.id === id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item;
            }),
          };
        }),
      decrementQuantity: (id: string) =>
        set((state) => {
          return {
            items: state.items.map((item) => {
              return item.id === id
                ? {
                    ...item,
                    quantity:
                      item.quantity > 1 ? item.quantity - 1 : item.quantity,
                  }
                : item;
            }),
          };
        }),
      toggleCheck: (id: string) =>
        set((state) => {
          return {
            items: state.items.map((item) => {
              return item.id === id
                ? {
                    ...item,
                    checked: !item.checked,
                  }
                : item;
            }),
          };
        }),
      isAllSelected: () => get().items.every((item) => item.checked),
      toggleSelectAll: () =>
        set((state) => {
          const isAllSelected = get().isAllSelected();

          return {
            items: state.items.map((item) => {
              return {
                ...item,
                checked: !isAllSelected,
              };
            }),
          };
        }),
      deleteSelected: () => {
        set((state) => {
          return {
            items: state.items.filter((item) => !item.checked),
          };
        });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "cart" }
  )
);
