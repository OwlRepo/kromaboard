import { supabase } from "@/lib/supabase";
import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", {
  state: () => ({
    email: "",
    password: "",
    errorMessage: "",
  }),
  getters: {},
  actions: {
    async userLogin() {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });
      if (data?.session?.access_token) {
        window.localStorage.setItem("hasSession", "true");
        window.location.href = "/dashboard";
      } else {
        this.errorMessage = error.message;
      }
    },
  },
});
