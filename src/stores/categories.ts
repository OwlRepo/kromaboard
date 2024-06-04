import type { Category } from "@/constants/types/category.type";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";
import { defineStore } from "pinia";

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    newCategoryName: "",
    categories: null,
    loading: false,
    reloading: false,
    errorMessage: "",
  }),
  getters: {},
  actions: {
    async createNewCategory() {
      this.reloading = true;
      let { data: user } = await supabase.auth.getSession();

      const { data: _, error } = await supabase
        .from("categories")
        .insert([
          {
            name: this.newCategoryName,
            created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            created_by: user?.session?.user?.id,
          },
        ])
        .select();

      if (!error) {
        this.reloading = false;
        this.fetchCategories();
      } else {
        this.errorMessage = error.message;
      }
    },
    async fetchCategories() {
      this.loading = true;
      const { data: categories, error } = await supabase
        .from("categories")
        .select("*");

      if (!error) {
        this.categories = categories;
        this.loading = false;
      } else {
        this.errorMessage = error.message;
      }
    },
    async updateCategory(category: Category) {
      const { data: _, error } = await supabase
        .from("categories")
        .update({ ...category })
        .eq("id", category.id)
        .select();

      if (!error) {
        this.reloading = false;
        this.fetchCategories();
      } else {
        this.errorMessage = error.message;
      }
    },
  },
});
