import { supabase } from "@/lib/supabase";
import { defineStore } from "pinia";

export const useSignUpStore = defineStore("sign-up", {
  state: () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    successSignUp: false,
  }),
  getters: {},
  actions: {
    async userSignUp() {
      let { data: _, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
      });

      if (!error) {
        // let { data, error } = await supabase.from("users").insert({
        //   first_name: this.firstName,
        //   last_name: this.lastName,
        // });
        this.successSignUp = true;
      }
    },
  },
});
