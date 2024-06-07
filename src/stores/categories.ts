import type { Category } from "@/constants/types/category.type";
import getQueryVariable from "@/helpers/getQueryVariable";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";
import { defineStore } from "pinia";

const PAGE_SIZE = 10;

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    newCategoryName: "",
    categories: null,
    pageCount: null,
    categoryCount: 0,
    defaultPage: Number(getQueryVariable("page")) || 1,
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
            created_at: dayjs().format(),
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
    async fetchCategories(
      page = Number(getQueryVariable("page")),
      date = {
        start: getQueryVariable("startDate"),
        end: getQueryVariable("endDate"),
      }
    ) {
      this.loading = true;
      this.fetchCategoryCount(date);

      if (window.history.pushState) {
        const newURL = new URL(window.location.href);
        newURL.search = `?page=${page}&startDate=${date.start}&endDate=${date.end}`;
        window.history.pushState({ path: newURL.href }, "", newURL.href);
      }

      const { data: categories, error } = await supabase
        .from("categories")
        .select("*")
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)
        .gte("created_at", date.start)
        .lte("created_at", date.end)
        .order("created_at", { ascending: false });

      if (!error) {
        this.categories = categories;
        this.loading = false;
      } else {
        this.errorMessage = error.message;
      }
    },
    async fetchCategoryCount(date: any) {
      const { data: _, count: categoryCount } = await supabase
        .from("categories")
        .select("*", { count: "exact", head: true })
        .gte("created_at", date.start)
        .lte("created_at", date.end);

      if (!categoryCount) {
        this.pageCount = 0;
      } else {
        this.categoryCount = categoryCount;
        this.pageCount = Math.ceil(categoryCount / PAGE_SIZE);
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
