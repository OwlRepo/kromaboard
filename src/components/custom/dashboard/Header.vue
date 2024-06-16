<script setup>
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-vue-next";
import { useDashboardStore } from "@/stores/dashboard";
import { onMounted } from "vue";
import dayjs from "dayjs";
import formatCurrencyToPHP from "@/lib/helpers/formateCurrencyToPHP";
const dashboardStore = useDashboardStore();

onMounted(() => {
  dashboardStore.fetchTotalRevenue();
});
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
    <Card>
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <CardTitle class="text-sm font-medium"> Annual Revenue </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ formatCurrencyToPHP(dashboardStore.annualRevenue?.total_sum) }}
        </div>
        <p class="text-xs text-muted-foreground">
          from
          {{
            new dayjs(dashboardStore.annualRevenue?.date).format(
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
        <CardTitle class="text-sm font-medium"> Monthly Revenue </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ formatCurrencyToPHP(dashboardStore.monthlyRevenue?.total_sum) }}
        </div>
        <p class="text-xs text-muted-foreground">
          from
          {{
            new dayjs(dashboardStore.monthlyRevenue?.date).format(
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
        <CardTitle class="text-sm font-medium"> Weekly Revenue </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ formatCurrencyToPHP(dashboardStore.weeklyRevenue?.total_sum) }}
        </div>
        <p class="text-xs text-muted-foreground">
          from
          {{
            new dayjs(dashboardStore.weeklyRevenue?.date).format(
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
        <CardTitle class="text-sm font-medium"> Daily Revenue </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ formatCurrencyToPHP(dashboardStore.yesterdayRevenue?.total_sum) }}
        </div>
        <p class="text-xs text-muted-foreground">
          from
          {{
            new dayjs(dashboardStore.yesterdayRevenue?.date).format(
              "MMMM DD, YYYY"
            )
          }}
        </p>
      </CardContent>
    </Card>
  </div>
</template>
