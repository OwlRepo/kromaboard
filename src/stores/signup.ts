import validators from "@/lib/helpers/formValidators";
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
    errorMessage: "",
  }),
  getters: {},
  actions: {
    async userSignUp() {
      let { data: _, error } = await supabase.auth.signUp({
        email: this.email,
        password: this.password,
      });

      if (!validators.validateEmail(this.email)) {
        this.errorMessage = "Invalid email";
        return;
      }

      if (!validators.validatePassword(this.password)) {
        this.errorMessage =
          "A password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match";
        return;
      }

      if (this.password.length < 8) {
        this.errorMessage = "Password must be at least 8 characters";
        return;
      }

      if (!error) {
        this.successSignUp = true;
        window.location.href = "/";
      } else {
        this.errorMessage = error.message;
      }
    },
  },
});
