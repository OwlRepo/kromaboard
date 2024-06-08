<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button @click.prevent="prepareForm" size="sm" class="w-fit space-x-2">
        <span>New Product</span>
        <Plus class="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent class="max-w-[90vw] lg:max-w-[50vw] rounded-lg">
      <DialogHeader>
        <DialogTitle>New Product</DialogTitle>
        <DialogDescription> Create a new product. </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <Label
            >Select Category
            <span class="text-red-400">*</span>
          </Label>
          <Select v-model="productStore.newProduct.category">
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
            v-model="productStore.newProduct.name"
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
            v-model="productStore.newProduct.price"
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
            v-model="productStore.newProduct.profit"
          />
          <span class="text-xs font-normal italic ml-auto">
            ( Leave blank if not applicable )
          </span>
        </div>

        <div class="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            v-model:checked="productStore.newProduct.is_active"
          />
          <Label for="airplane-mode">Active</Label>
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button
            :disabled="
              !productStore.newProduct.name || !productStore.newProduct.category
            "
            type="submit"
            @click="createNewProduct"
          >
            Submit
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
import { Plus } from "lucide-vue-next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DialogClose from "@/components/ui/dialog/DialogClose.vue";
import { useProductsStore } from "@/stores/products";
import Switch from "@/components/ui/switch/Switch.vue";

const productStore = useProductsStore();
const defaultForm = {
  name: "",
  category: "",
  price: null,
  profit: null,
  is_active: true,
};

function createNewProduct() {
  productStore.createNewProduct();
}

function prepareForm() {
  productStore.newProduct = { ...defaultForm };
  productStore.fetchCategories();
}
</script>
