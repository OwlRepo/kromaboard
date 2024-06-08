import type { Product } from "@/constants/types/Product.type";
import getQueryVariable from "@/lib/helpers/getQueryVariable";
import setQueryVariable from "@/lib/helpers/setQueryVariable";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";
import { defineStore } from "pinia";

const PAGE_SIZE = 10;

export const useTransactionsStore = defineStore("transactions", {
  state: () => ({
    newTransaction: {
      categoryId: "",
      product: "",
      price: null,
      profit: null,
      quantity: null,
      status: null,
      remarks: null,
    },
    categories: null,
    products: null,
    pageCount: null,
    transactions: null,
    transactionCount: 0,
    defaultPage: Number(getQueryVariable("page")) || 1,
    loading: false,
    reloading: false,
    errorMessage: "",
  }),
  getters: {},
  actions: {
    async createNewTransaction() {
      this.reloading = true;
      let { data: user } = await supabase.auth.getSession();
      const { data: _, error } = await supabase
        .from("transaction_history")
        .insert([
          {
            created_by: user?.session?.user?.id,
            created_at: dayjs().format(),
            product_id: JSON.parse(this.newTransaction.product).id,
            category_id: this.newTransaction.categoryId,
            product_name: JSON.parse(this.newTransaction.product).name,
            quantity: this.newTransaction.quantity,
            transaction_amount: this.newTransaction.price,
            business_profit: this.newTransaction.profit,
            status: this.newTransaction.status,
            remarks: this.newTransaction.remarks,
          },
        ])
        .select();

      if (!error) {
        this.reloading = false;
        this.fetchTransactions();
      } else {
        this.errorMessage = error.message;
      }
    },
    async fetchTransactions(
      page = Number(getQueryVariable("page")),
      date = {
        start: getQueryVariable("startDate"),
        end: getQueryVariable("endDate"),
      }
    ) {
      this.loading = true;
      this.fetchTransactionsCount(date);

      setQueryVariable(
        `?page=${page}&startDate=${date.start}&endDate=${date.end}`
      );

      const { data: transactions, error } = await supabase
        .from("transaction_history")
        .select("*")
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)
        .gte("created_at", date.start)
        .lte("created_at", date.end)
        .order("created_at", { ascending: false });

      if (!error) {
        this.transactions = transactions;
        this.loading = false;
      } else {
        this.errorMessage = error.message;
      }
    },
    async fetchTransactionsCount(date: any) {
      const { data: _, count: transactionCount } = await supabase
        .from("transaction_history")
        .select("*", { count: "exact", head: true })
        .gte("created_at", date.start)
        .lte("created_at", date.end);

      if (!transactionCount) {
        this.pageCount = 0;
      } else {
        this.transactionCount = transactionCount;
        this.pageCount = Math.ceil(transactionCount / PAGE_SIZE);
      }
    },
    async fetchCategories() {
      const { data: categories, error } = await supabase
        .from("categories")
        .select("*");
      if (!error) {
        this.categories = categories;
      } else {
        this.errorMessage = error.message;
      }
    },
    async fetchProductsByCategoryId(id) {
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
