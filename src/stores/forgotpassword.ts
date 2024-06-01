import { supabase } from "@/lib/supabase";
import { defineStore } from "pinia";

export const useForgotPassword = defineStore("forgot-password", {
  state: () => ({
    email: "",
    successResetPasswordRequest: false,
    errorMessage: null,
  }),
  getters: {},
  actions: {
    async userForgotPassword() {
      let { data, error } = await supabase.auth.resetPasswordForEmail(
        this.email,
        {
          redirectTo: `http://${
            import.meta.env.PUBLIC_BASE_URL
          }/reset-password`,
        }
      );

      if (!error) {
        this.successResetPasswordRequest = true;
        console.log("success_data", data);
        console.log("error_data", error);
      } else {
        this.errorMessage = error.message;
      }
    },
  },
});
