import type { Product } from "@/constants/types/Product.type";
import getQueryVariable from "@/helpers/getQueryVariable";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";
import { defineStore } from "pinia";

const PAGE_SIZE = 10;

export const useProductsStore = defineStore("products", {
  state: () => ({
    newProduct: {
      name: "",
      category: "",
      price: null,
      profit: null,
    },
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
    async createNewProduct() {
      this.reloading = true;
      let { data: user } = await supabase.auth.getSession();
      console.log(
        JSON.stringify(
          {
            name: this.newProduct.name,
            category: this.newProduct.category,
            price: this.newProduct.price,
            price_identifiable: this.newProduct.price ? true : false,
            profit: this.newProduct.profit,
            profit_identifiable: this.newProduct.profit ? true : false,
            created_at: dayjs().format(),
            created_by: user?.session?.user?.id,
          },
          null,
          4
        )
      );
      const { data: _, error } = await supabase
        .from("products")
        .insert([
          {
            name: this.newProduct.name,
            category: this.newProduct.category,
            price: this.newProduct.price,
            price_identifiable: this.newProduct.price ? true : false,
            profit: this.newProduct.profit,
            profit_identifiable: this.newProduct.profit ? true : false,
            created_at: dayjs().format(),
            created_by: user?.session?.user?.id,
          },
        ])
        .select();

      if (!error) {
        this.reloading = false;
      } else {
        this.errorMessage = error.message;
      }
    },
    async fetchCategories() {
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
  },
});
