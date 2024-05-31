import { supabase } from "@/lib/supabase";
import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", {
  state: () => ({
    email: "",
    password: "",
  }),
  getters: {},
  actions: {
    async userLogin() {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });

      console.log("data", data);
      console.log("error", error);
    },
  },
});
