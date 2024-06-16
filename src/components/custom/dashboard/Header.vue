<script setup>
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-vue-next";
import { useDashboardStore } from "@/stores/dashboard";
import { onMounted } from "vue";
import dayjs from "dayjs";
import formatCurrencyToPHP from "@/lib/helpers/formateCurrencyToPHP";
const dashboardStore = useDashboardStore();

onMounted(() => {
  dashboardStore.fetchTotalProfit();
});
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium"> Annual Profit </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ formatCurrencyToPHP(dashboardStore.annualProfit?.total_sum) }}
        </div>
        <p class="text-xs text-muted-foreground">
          from
          {{
            new dayjs(dashboardStore.annualProfit?.date).format("MMMM DD, YYYY")
          }}
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium"> Monthly Profit </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ formatCurrencyToPHP(dashboardStore.monthlyProfit?.total_sum) }}
        </div>
        <p class="text-xs text-muted-foreground">
          from
          {{
            new dayjs(dashboardStore.monthlyProfit?.date).format(
              "MMMM DD, YYYY"
            )
          }}
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium"> Weekly Profit </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ formatCurrencyToPHP(dashboardStore.weeklyProfit?.total_sum) }}
        </div>
        <p class="text-xs text-muted-foreground">
          from
          {{
            new dayjs(dashboardStore.weeklyProfit?.date).format("MMMM DD, YYYY")
          }}
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium"> Daily Profit </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ formatCurrencyToPHP(dashboardStore.yesterdayProfit?.total_sum) }}
        </div>
        <p class="text-xs text-muted-foreground">
          from
          {{
            new dayjs(dashboardStore.yesterdayProfit?.date).format(
              "MMMM DD, YYYY"
            )
          }}
        </p>
      </CardContent>
    </Card>
  </div>
</template>
