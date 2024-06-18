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
    filter: {
      categoryId: getQueryVariable("categoryId"),
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
  getters: {
    getSelectedCategoryIdFilter: (state) => {
      return state.filter.categoryId;
    },
  },
  actions: {
    async createNewProduct() {
      this.reloading = true;
      let { data: user } = await supabase.auth.getSession();
      const { data: _, error } = await supabase
        .from("products")
        .insert([
          {
            name: this.newProduct.name,
            category_id: this.newProduct.category,
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
      categoryId = getQueryVariable("categoryId") === "undefined"
        ? undefined
        : getQueryVariable("categoryId")
    ) {
      this.loading = true;
      this.fetchProductCount(categoryId);

      setQueryVariable(`?page=${page}&categoryId=${categoryId}`);

      const res = supabase
        .from("products")
        .select("*, categories(*)")
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)
        .order("created_at", { ascending: false });

      if (categoryId) {
        res.eq("category_id", categoryId);
      }

      if (!(await res).error) {
        this.products = (await res).data;
        this.loading = false;
      } else {
        this.errorMessage = (await res).error.message;
      }
    },
    async fetchProductCount(categoryId?: string) {
      const res = supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      if (categoryId) {
        res.eq("category_id", categoryId);
      }

      if (!(await res).error) {
        this.productCount = (await res).count;
        this.pageCount = Math.ceil((await res).count / PAGE_SIZE);
      } else {
        this.pageCount = 0;
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
        .select("*")
        .eq("is_active", true);

      if (!error) {
        this.productCategories = categories;
        this.loading = false;
      } else {
        this.errorMessage = error.message;
      }
    },
    resetFilters() {
      this.filter = {
        categoryId: "",
      };
    },
  },
});
