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

const transactionsStore = useTransactionsStore();
const defualtCategoryPageRoute = LOGGED_IN_ROUTES.find((route) =>
  route.path.includes("transactions")
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
  transactionsStore.fetchTransactions(1, date);
}
</script>

<template>
  <Popover>
    <PopoverTrigger>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <FilterIcon class="h-5 w-5" />
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
            <p>Filter by product, date and status.</p>
          </div>
        </div>
        <div class="flex flex-col space-y-6 items-stretch">
          <div class="flex flex-col space-y-2">
            <b>Created At</b>
            <div class="flex flex-row items-center">
              <DateRangePicker @filterTable="filterByDate" />
            </div>
          </div>
          <a :href="defualtCategoryPageRoute.path">
            <Button class="w-full">Reset</Button>
          </a>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
