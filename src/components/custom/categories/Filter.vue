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
      </div>
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
import { useCategoriesStore } from "@/stores/categories";
import dayjs from "dayjs";

const categoriesStore = useCategoriesStore();

function filterByDate(data) {
  const date = {
    start: dayjs(`${data.start.year}-${data.start.month}-${data.start.day}`)
      .startOf("day")
      .format(),
    end: dayjs(`${data.end.year}-${data.end.month}-${data.end.day}`)
      .endOf("day")
      .format(),
  };

  if (window.history.pushState) {
    const newURL = new URL(window.location.href);
    newURL.search = `&startDate=${date.start}&endDate=${date.end}`;
    window.history.pushState({ path: newURL.href }, "", newURL.href);
  }
  categoriesStore.fetchCategories(1, date);
}
</script>
