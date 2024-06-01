import { supabase } from "@/lib/supabase";
import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", {
  state: () => ({
    email: "",
    password: "",
    loading: false,
    errorMessage: "",
  }),
  getters: {},
  actions: {
    async userLogin() {
      this.loading = true;
      let { data, error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });

      if (data?.session?.access_token) {
        window.localStorage.setItem("hasSession", "true");
        window.location.href = "/dashboard";
        this.loading = false;
      } else {
        this.errorMessage = error.message;
        this.loading = false;
      }
    },
  },
});
