import { supabase } from "@/lib/supabase";
import dayjs from "dayjs";
import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    annualRevenue: null,
    yesterdayRevenue: null,
    weeklyRevenue: null,
    monthlyRevenue: null,
  }),
  getters: {},
  actions: {
    async fetchTotalRevenue() {
      const annualRevenue = await supabase.rpc("get_annual_revenue");
      const dailyRevenue = await supabase.rpc("get_daily_revenue");
      const weeklyRevenue = await supabase.rpc("get_weekly_revenue");
      const monthlyRevenue = await supabase.rpc("get_monthly_revenue");

      if (
        !annualRevenue.error &&
        !dailyRevenue.error &&
        !weeklyRevenue.error &&
        !monthlyRevenue.error
      ) {
        this.annualRevenue = annualRevenue.data[0];
        this.yesterdayRevenue = dailyRevenue.data[0];
        this.weeklyRevenue = weeklyRevenue.data[0];
        this.monthlyRevenue = monthlyRevenue.data[0];
      }
    },
  },
});
