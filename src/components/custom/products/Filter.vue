<template>
  <Card class="lg:sticky lg:top-10">
    <CardHeader class="flex flex-row items-center justify-between">
      <div class="grid gap-2">
        <CardTitle>Filter</CardTitle>
        <CardDescription> Filter by product, date and status. </CardDescription>
      </div>
    </CardHeader>
    <CardContent class="flex flex-col space-y-6 items-stretch">
      <div class="flex flex-col space-y-2">
        <b>Created At</b>
        <div class="flex flex-row items-center">
          <DateRangePicker @filterTable="filterByDate" />
        </div>
        <hr class="border-muted-foreground/10" />
      </div>
      <a :href="defualtCategoryPageRoute.path">
        <Button class="w-full">Reset</Button>
      </a>
    </CardContent>
  </Card>
</template>

<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DateRangePicker from "@/components/custom/form/DateRangePicker.vue";
import dayjs from "dayjs";
import Button from "@/components/ui/button/Button.vue";
import { LOGGED_IN_ROUTES } from "@/constants";
import setQueryVariable from "@/helpers/setQueryVariable";
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();
const defualtCategoryPageRoute = LOGGED_IN_ROUTES.find((route) =>
  route.path.includes("products")
);
function filterByDate(data) {
  const date = {
    start: dayjs(`${data.start.year}-${data.start.month}-${data.start.day}`)
      .startOf("day")
      .format(),
    end: dayjs(`${data.end.year}-${data.end.month}-${data.end.day}`)
      .endOf("day")
      .format(),
  };

  setQueryVariable(`&startDate=${date.start}&endDate=${date.end}`);
  productsStore.fetchProducts(1, date);
}
</script>
