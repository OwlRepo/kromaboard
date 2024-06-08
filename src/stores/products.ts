import type { Product } from "@/constants/types/Product.type";
import getQueryVariable from "@/lib/helpers/getQueryVariable";
import setQueryVariable from "@/lib/helpers/setQueryVariable";
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
      is_active: true,
    },
    productCategories: null,
    pageCount: null,
    products: null,
    productCount: 0,
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
      const { data: _, error } = await supabase
        .from("products")
        .insert([
          {
            name: this.newProduct.name,
            category: this.newProduct.category,
            price: this.newProduct.price ? this.newProduct.price : null,
            price_identifiable: this.newProduct.price ? true : false,
            profit: this.newProduct.profit ? this.newProduct.profit : null,
            profit_identifiable: this.newProduct.profit ? true : false,
            created_at: dayjs().format(),
            created_by: user?.session?.user?.id,
          },
        ])
        .select();

      if (!error) {
        this.reloading = false;
        this.fetchProducts();
      } else {
        this.errorMessage = error.message;
      }
    },
    async fetchProducts(
      page = Number(getQueryVariable("page")),
      date = {
        start: getQueryVariable("startDate"),
        end: getQueryVariable("endDate"),
      }
    ) {
      this.loading = true;
      this.fetchProductCount(date);

      setQueryVariable(
        `?page=${page}&startDate=${date.start}&endDate=${date.end}`
      );

      const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)
        .gte("created_at", date.start)
        .lte("created_at", date.end)
        .order("created_at", { ascending: false });

      if (!error) {
        this.products = products;
        this.loading = false;
      } else {
        this.errorMessage = error.message;
      }
    },
    async fetchProductCount(date: any) {
      const { data: _, count: productCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .gte("created_at", date.start)
        .lte("created_at", date.end);

      if (!productCount) {
        this.pageCount = 0;
      } else {
        this.productCount = productCount;
        this.pageCount = Math.ceil(productCount / PAGE_SIZE);
      }
    },
    async updateProduct(product: Product) {
      const { data: _, error } = await supabase
        .from("products")
        .update({
          ...product,
          price: product.price ? product.price : null,
          profit: product.profit ? product.profit : null,
          price_identifiable: product.price ? true : false,
          profit_identifiable: product.profit ? true : false,
        })
        .eq("id", product.id)
        .select();

      if (!error) {
        this.reloading = false;
        this.fetchCategories();
      } else {
        this.errorMessage = error.message;
      }
    },
    async fetchCategories() {
      const { data: categories, error } = await supabase
        .from("categories")
        .select("*");
      if (!error) {
        this.productCategories = categories;
        this.loading = false;
      } else {
        this.errorMessage = error.message;
      }
    },
  },
});