import { supabase } from "@/lib/supabase";
import { defineStore } from "pinia";

export const useResetPassword = defineStore("reset-password", {
  state: () => ({
    password: "",
    successResetPassword: false,
    errorMessage: null,
  }),
  getters: {},
  actions: {
    async userResetPassword() {
      let { data, error } = await supabase.auth.updateUser({
        password: this.password,
      });

      if (!error) {
        this.successResetPassword = true;
        console.log("success_data", JSON.stringify(data, null, 4));
        window.location.href = "/";
      } else {
        this.errorMessage = error.message;
        console.log("error_data", error);
      }
    },
  },
});
