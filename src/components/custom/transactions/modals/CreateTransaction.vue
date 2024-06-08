<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button @click.prevent="prepareForm" size="sm" class="w-fit space-x-2">
        <span>New Transaction</span>
        <Plus class="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent class="max-w-[90vw] lg:max-w-[50vw] rounded-lg">
      <DialogHeader>
        <DialogTitle>New Transaction</DialogTitle>
        <DialogDescription> Create a new transaction. </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid gap-2">
          <Label
            >Select category
            <span class="text-red-400">*</span>
          </Label>
          <Select v-model="transactionsStore.newTransaction.categoryId">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Category..." />
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
        <div class="grid gap-4" v-if="transactionsStore.products">
          <div class="grid gap-2">
            <Label
              >Select product
              <span class="text-red-400">*</span>
            </Label>
            <Select v-model="transactionsStore.newTransaction.product">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Product..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="product in transactionsStore.products"
                    :value="
                      JSON.stringify({
                        id: product.id,
                        name: product.name,
                      })
                    "
                  >
                    {{ product.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="grid gap-2">
            <Label for="transaction_amount"
              >Transaction Amount
              <span class="text-red-400">*</span>
            </Label>
            <Input
              v-model="transactionsStore.newTransaction.price"
              id="transaction_amount"
              type="number"
              min="1"
              required
            />
          </div>
          <div class="grid gap-2">
            <Label for="business_profit"
              >Business Profit
              <span class="text-red-400">*</span>
            </Label>
            <Input
              v-model="transactionsStore.newTransaction.profit"
              id="business_profit"
              type="number"
              min="1"
              required
            />
          </div>
          <div class="grid gap-2">
            <Label for="item_count"
              >Quantity
              <span class="text-red-400">*</span>
            </Label>
            <Input
              v-model="transactionsStore.newTransaction.quantity"
              id="item_count"
              type="number"
              min="1"
              required
            />
          </div>
          <div class="grid gap-2">
            <Label
              >Transaction Status
              <span class="text-red-400">*</span>
            </Label>
            <Select v-model="transactionsStore.newTransaction.status">
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
          <div class="grid gap-2">
            <Label for="remarks">Remarks (optional)</Label>
            <Input
              v-model="transactionsStore.newTransaction.remarks"
              id="remarks"
              type="text"
              min="1"
              required
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button @click.prevent="transactionsStore.createNewTransaction()">
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
import { watch } from "vue";
import { useTransactionsStore } from "@/stores/transactions";

const transactionsStore = useTransactionsStore();
const defaultForm = {
  categoryId: "",
  product: "",
  price: null,
  profit: null,
  quantity: null,
  status: null,
  remarks: null,
};

function prepareForm() {
  transactionsStore.newTransaction = { ...defaultForm };
  transactionsStore.categories = null;
  transactionsStore.products = null;
  transactionsStore.fetchCategories();
}

watch(
  () => transactionsStore?.newTransaction?.categoryId,
  (newValue) => {
    if (transactionsStore.newTransaction.categoryId) {
      transactionsStore.fetchProductsByCategoryId(newValue);
    }
  }
);
</script>
