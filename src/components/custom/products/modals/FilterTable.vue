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
            <p>Filter by category</p>
          </div>
        </div>
        <div class="flex flex-col space-y-6 items-stretch">
          <div class="flex flex-col space-y-2">
            <b>Category</b>
            <div class="flex flex-row items-center">
              <Select v-model="productsStore.filter.categoryId">
                <SelectTrigger class="w-full">
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="category in productsStore.productCategories"
                      :value="category.id"
                    >
                      {{ category.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <a
            :href="defualtCategoryPageRoute.path"
            @click="productsStore.resetFilters()"
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
import Button from "@/components/ui/button/Button.vue";
import { LOGGED_IN_ROUTES } from "@/constants";
import setQueryVariable from "@/lib/helpers/setQueryVariable";
import Select from "@/components/ui/select/Select.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectGroup from "@/components/ui/select/SelectGroup.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import { onUnmounted, watch } from "vue";
import { useProductsStore } from "@/stores/products";

const productsStore = useProductsStore();
const defualtCategoryPageRoute = LOGGED_IN_ROUTES.find((route) =>
  route.path.includes("products")
);

function filterByCategory(categoryId: string) {
  setQueryVariable(`?page=1&categoryId=${categoryId}`);
  productsStore.currentPage = 1;
  productsStore.fetchProducts(1, categoryId);
}

function prepareFilter() {
  productsStore.fetchCategories();
}

onUnmounted(() => {
  productsStore.resetFilters();
});

watch(
  () => productsStore.getSelectedCategoryIdFilter,
  (newValue) => {
    filterByCategory(newValue as string);
  }
);
</script>
