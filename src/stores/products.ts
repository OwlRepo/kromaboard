import type { Product } from "@/constants/types/product.type";
import getQueryVariable from "@/lib/helpers/getQueryVariable";
import setQueryVariable from "@/lib/helpers/setQueryVariable";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";
import { defineStore } from "pinia";

const PAGE_SIZE = 10;

function removeUnwantedFormValues(product: Product) {
  product.categories = undefined;
}

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
    currentPage: Number(getQueryVariable("page")) || 1,
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
    async fetchProducts(page = Number(getQueryVariable("page"))) {
      this.loading = true;
      this.fetchProductCount();

      setQueryVariable(`?page=${page}`);

      const { data: products, error } = await supabase
        .from("products")
        .select("*, categories(*)")
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)
        .order("created_at", { ascending: false });

      if (!error) {
        this.products = products;
        this.loading = false;
      } else {
        this.errorMessage = error.message;
      }
    },
    async fetchProductCount() {
      const { data: _, count: productCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      if (!productCount) {
        this.pageCount = 0;
      } else {
        this.productCount = productCount;
        this.pageCount = Math.ceil(productCount / PAGE_SIZE);
      }
    },
    async updateProduct(product: Product) {
      removeUnwantedFormValues(product);
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
        this.fetchProducts();
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
    async fetchProductsByCategoryId(id: string) {
      const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", id);
      if (!error) {
        this.products = products;
      } else {
        this.errorMessage = error.message;
      }
    },
  },
});
