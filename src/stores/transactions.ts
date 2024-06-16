import type { Product } from "@/constants/types/product.type";
import type { Transaction } from "@/constants/types/transaction.type";
import getQueryVariable from "@/lib/helpers/getQueryVariable";
import setQueryVariable from "@/lib/helpers/setQueryVariable";
import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";
import { defineStore } from "pinia";

const PAGE_SIZE = 10;

function removeUnwantedFormValues(transaction: Transaction) {
  transaction.categories = undefined;
}

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
    filter: {
      categoryId: "",
      status: "",
    },
    categories: null,
    products: null,
    pageCount: null,
    currentPage: Number(getQueryVariable("page")) || 1,
    transactions: null,
    transactionCount: 0,
    defaultPage: Number(getQueryVariable("page")) || 1,
    loading: false,
    reloading: false,
    errorMessage: "",
  }),
  getters: {
    getSelectedCategoryIdFilter: (state) => {
      return state.filter.categoryId;
    },
    getSelectedStatusFilter: (state) => {
      return state.filter.status;
    },
    getFormStatus: (state) => {
      return (
        !state.newTransaction.categoryId ||
        !state.newTransaction.product ||
        !state.newTransaction.price ||
        !state.newTransaction.profit ||
        !state.newTransaction.quantity
      );
    },
  },
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
      },
      categoryId = getQueryVariable("categoryId") === "undefined"
        ? undefined
        : getQueryVariable("categoryId"),
      status = getQueryVariable("status") === "undefined"
        ? undefined
        : getQueryVariable("status")
    ) {
      this.loading = true;
      this.fetchTransactionsCount(date, categoryId, status);

      setQueryVariable(
        `?page=${page}&startDate=${date.start}&endDate=${date.end}&categoryId=${categoryId}&status=${status}`
      );

      const res = supabase
        .from("transaction_history")
        .select("*, categories(*)")
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)
        .gte("created_at", date.start)
        .lte("created_at", date.end)
        .order("created_at", { ascending: false });

      if (categoryId) {
        res.eq("category_id", categoryId);
      }

      if (status) {
        res.eq("status", status);
      }

      if (!(await res).error) {
        this.transactions = (await res).data;
        this.loading = false;
      } else {
        this.errorMessage = (await res).error.message;
      }
    },
    async fetchTransactionsCount(
      date: any,
      categoryId?: string,
      status?: string
    ) {
      const res = supabase
        .from("transaction_history")
        .select("*", { count: "exact", head: true })
        .gte("created_at", date.start)
        .lte("created_at", date.end);

      if (categoryId) {
        res.eq("category_id", categoryId);
      }

      if (status) {
        res.eq("status", status);
      }

      if ((await res).error) {
        this.pageCount = 0;
      } else {
        this.transactionCount = (await res).count;
        this.pageCount = Math.ceil((await res).count / PAGE_SIZE);
      }
    },

    async updateTransaction(transaction: Transaction) {
      removeUnwantedFormValues(transaction);
      const { data: _, error } = await supabase
        .from("transaction_history")
        .update({
          ...transaction,
          product_name: this.products.find(
            (product: Product) => product.id === transaction.product_id
          ).name,
        })
        .eq("id", transaction.id)
        .select();

      if (!error) {
        this.reloading = false;
        this.fetchTransactions();
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
      } else {
        this.errorMessage = error.message;
      }
    },
    async fetchProductsByCategoryId(id: string) {
      const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", id);
      if (!error) {
        this.products = products;
      } else {
        this.errorMessage = error.message;
      }
    },
    resetFilters() {
      this.filter = {
        categoryId: "",
        status: "",
      };
    },
  },
});
