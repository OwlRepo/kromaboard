<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button
        aria-label="edit-category"
        size="sm"
        variant="outline"
        @click="
          () => {
            prepareForm(), (isDraft = true);
          }
        "
      >
        <Edit v-if="!isDraft" class="h-4 w-4" />
        <TooltipProvider v-else>
          <Tooltip>
            <TooltipTrigger as-child>
              <CircleAlert class="h-4 w-4 text-red-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Changes are not saved</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Button>
    </DialogTrigger>
    <DialogContent class="max-w-[90vw] lg:max-w-[50vw] rounded-lg">
      <DialogHeader>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogDescription> Edit the product information. </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <Label
            >Select Category
            <span class="text-red-400">*</span>
          </Label>
          <Select v-model="productStore.products[index].category_id">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Category..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="category in productStore.productCategories"
                  :value="category.id"
                >
                  {{ category.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-2">
          <Label for="product_name"
            >Product Name <span class="text-red-400">*</span></Label
          >
          <Input
            v-model="productStore.products[index].name"
            id="product_name"
            type="text"
            required
          />
        </div>

        <div class="grid gap-2">
          <Label for="product_price" class="flex justify-between"
            >Product Price</Label
          >
          <Input
            id="product_price"
            type="number"
            min="1"
            required
            v-model="productStore.products[index].price"
          />
          <span class="text-xs font-normal italic ml-auto">
            ( Leave blank if not applicable )
          </span>
        </div>

        <div class="grid gap-2">
          <Label for="product_profit" class="flex justify-between"
            >Profit per unit sold</Label
          >
          <Input
            id="product_profit"
            type="number"
            min="1"
            required
            v-model="productStore.products[index].profit"
          />
          <span class="text-xs font-normal italic ml-auto">
            ( Leave blank if not applicable )
          </span>
        </div>

        <div class="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            v-model:checked="productStore.products[index].is_active"
          />
          <Label for="airplane-mode">Active</Label>
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button
            type="submit"
            @click.prevent="
              () => {
                isDraft = false;
                productStore.updateProduct(productStore.products[index]);
              }
            "
          >
            Save
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleAlert, Edit } from "lucide-vue-next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCategoriesStore } from "@/stores/categories";
import DialogClose from "@/components/ui/dialog/DialogClose.vue";
import Switch from "@/components/ui/switch/Switch.vue";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { onUnmounted, ref } from "vue";
import { useProductsStore } from "@/stores/products";
import Select from "@/components/ui/select/Select.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectGroup from "@/components/ui/select/SelectGroup.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";

const productStore = useProductsStore();
const isDraft = ref(false);
function prepareForm() {
  productStore.fetchCategories();
}
defineProps({
  index: {
    type: Number,
    required: true,
  },
});
</script>
