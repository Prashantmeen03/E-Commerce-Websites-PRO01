import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],

  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),

  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    const state = get();
    return state.items.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0);
  },

  getItemCount: () => get().items.length,
}));

export default useCartStore;
