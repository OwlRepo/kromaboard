<template>
  <Popover>
    <PopoverTrigger>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <FilterIcon @click="prepareFilter" class="h-5 w-5" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Filter Table</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </PopoverTrigger>
    <PopoverContent>
      <div class="flex flex-col space-y-6">
        <div class="flex flex-row items-center justify-between">
          <div class="grid">
            <b class="text-lg">Filter</b>
            <p>Filter by category, status or date.</p>
          </div>
        </div>
        <div class="flex flex-col space-y-6 items-stretch">
          <div class="flex flex-col space-y-2">
            <b>Category</b>
            <div class="flex flex-row items-center">
              <Select v-model="transactionsStore.filter.categoryId">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="category in transactionsStore.categories"
                      :value="category.id"
                    >
                      {{ category.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div class="flex flex-col space-y-2">
            <b>Status</b>
            <Select v-model="transactionsStore.filter.status">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="success"> Success </SelectItem>
                  <SelectItem value="pending"> Pending </SelectItem>
                  <SelectItem value="refunded"> Refunded </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col space-y-2">
            <b>Created At</b>
            <div class="flex flex-row items-center">
              <DateRangePicker @filterTable="filterByDate" />
            </div>
          </div>
          <a
            :href="defualtCategoryPageRoute.path"
            @click="transactionsStore.resetFilters()"
          >
            <Button class="w-full">Reset</Button>
          </a>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Tooltip from "@/components/ui/tooltip/Tooltip.vue";
import TooltipContent from "@/components/ui/tooltip/TooltipContent.vue";
import TooltipProvider from "@/components/ui/tooltip/TooltipProvider.vue";
import TooltipTrigger from "@/components/ui/tooltip/TooltipTrigger.vue";
import { FilterIcon } from "lucide-vue-next";
import DateRangePicker from "@/components/custom/form/DateRangePicker.vue";
import dayjs from "dayjs";
import Button from "@/components/ui/button/Button.vue";
import { LOGGED_IN_ROUTES } from "@/constants";
import setQueryVariable from "@/lib/helpers/setQueryVariable";
import { useTransactionsStore } from "@/stores/transactions";
import Select from "@/components/ui/select/Select.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectGroup from "@/components/ui/select/SelectGroup.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import { onUnmounted, watch } from "vue";
import getQueryVariable from "@/lib/helpers/getQueryVariable";

const transactionsStore = useTransactionsStore();
const defualtCategoryPageRoute = LOGGED_IN_ROUTES.find((route) =>
  route.path.includes("transactions")
);
const defaultForm = {
  categoryId: null,
  status: null,
};
function filterByDate(data: any) {
  const date = {
    start: dayjs(`${data.start.year}-${data.start.month}-${data.start.day}`)
      .startOf("day")
      .format(),
    end: dayjs(`${data.end.year}-${data.end.month}-${data.end.day}`)
      .endOf("day")
      .format(),
  };

  setQueryVariable(
    `?page=1&startDate=${date.start}&endDate=${
      date.end
    }&categoryId=${getQueryVariable("categoryId")}`
  );
  transactionsStore.currentPage = 1;
  transactionsStore.fetchTransactions(1, date, getQueryVariable("categoryId"));
}

function filterByCategory(categoryId: string) {
  setQueryVariable(
    `?page=1&startDate=${getQueryVariable(
      "startDate"
    )}&endDate=${getQueryVariable(
      "endDate"
    )}&categoryId=${categoryId}&status=${getQueryVariable("status")}`
  );
  transactionsStore.currentPage = 1;
  transactionsStore.fetchTransactions(
    1,
    undefined,
    categoryId,
    getQueryVariable("status")
  );
}

function filterByStatus(status: string) {
  setQueryVariable(
    `?page=1&startDate=${getQueryVariable(
      "startDate"
    )}&endDate=${getQueryVariable("endDate")}&categoryId=${getQueryVariable(
      "categoryId"
    )}&status=${status}`
  );
  transactionsStore.currentPage = 1;
  transactionsStore.fetchTransactions(1, undefined, undefined, status);
}

function prepareFilter() {
  transactionsStore.fetchCategories();
}

onUnmounted(() => {
  transactionsStore.resetFilters();
});

watch(
  () => transactionsStore.getSelectedCategoryIdFilter,
  (newValue) => {
    filterByCategory(newValue);
  }
);
watch(
  () => transactionsStore.getSelectedStatusFilter,
  (newValue) => {
    filterByStatus(newValue);
  }
);
</script>
