import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";
import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    annualProfit: null,
    yesterdayProfit: null,
    weeklyProfit: null,
    monthlyProfit: null,
    loading: true,
  }),
  getters: {},
  actions: {
    async fetchTotalProfit() {
      const annualProfit = await supabase.rpc("get_annual_profit");
      const dailyRevenue = await supabase.rpc("get_daily_profit");
      const weeklyProfit = await supabase.rpc("get_weekly_profit");
      const monthlyProfit = await supabase.rpc("get_monthly_profit");

      if (
        !annualProfit.error &&
        !dailyRevenue.error &&
        !weeklyProfit.error &&
        !monthlyProfit.error
      ) {
        this.annualProfit = annualProfit.data[0];
        this.yesterdayProfit = dailyRevenue.data[0];
        this.weeklyProfit = weeklyProfit.data[0];
        this.monthlyProfit = monthlyProfit.data[0];
        this.loading = false;
      }
    },
  },
});
