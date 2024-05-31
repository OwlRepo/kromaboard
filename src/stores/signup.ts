import { supabase } from "@/lib/supabase";
import { defineStore } from "pinia";

export const useSignUpStore = defineStore("login", {
  state: () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }),
  getters: {},
  actions: {
    async userSignUp() {
      let { data, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
      });

      if (!error) {
        let { data, error } = await supabase.from("users").insert({
          first_name: this.firstName,
          last_name: this.lastName,
        });
      }
    },
  },
});
