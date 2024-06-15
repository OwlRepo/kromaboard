import validators from "@/lib/helpers/formValidators";
import { supabase } from "@/lib/supabase";
import { defineStore } from "pinia";

export const useForgotPassword = defineStore("forgot-password", {
  state: () => ({
    email: "",
    successResetPasswordRequest: false,
    requestToken: "",
    errorMessage: null,
  }),
  getters: {},
  actions: {
    async userForgotPassword() {
      let { data: _, error } = await supabase.auth.resetPasswordForEmail(
        this.email
      );

      if (validators.validateEmail(this.email)) {
        this.errorMessage = "Unable to validate email address: invalid format";
        return;
      }

      if (!error) {
        this.successResetPasswordRequest = true;
        window.location.href = "/";
      } else {
        this.errorMessage = error.message;
      }
    },
  },
});
