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
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button size="sm" class="w-fit space-x-2">
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
          <Select>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Category..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple"> Apple </SelectItem>
                <SelectItem value="banana"> Banana </SelectItem>
                <SelectItem value="blueberry"> Blueberry </SelectItem>
                <SelectItem value="grapes"> Grapes </SelectItem>
                <SelectItem value="pineapple"> Pineapple </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-2">
          <Label
            >Select product
            <span class="text-red-400">*</span>
          </Label>
          <Select>
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Product..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple"> Apple </SelectItem>
                <SelectItem value="banana"> Banana </SelectItem>
                <SelectItem value="blueberry"> Blueberry </SelectItem>
                <SelectItem value="grapes"> Grapes </SelectItem>
                <SelectItem value="pineapple"> Pineapple </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-2">
          <Label for="item-count"
            >Transaction Amount
            <span class="text-red-400">*</span>
          </Label>
          <Input
            id="item-count"
            type="number"
            min="1"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="item-count"
            >Business Profit
            <span class="text-red-400">*</span>
          </Label>
          <Input
            id="item-count"
            type="number"
            min="1"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="item-count"
            >How many items?
            <span class="text-red-400">*</span>
          </Label>
          <Input
            id="item-count"
            type="number"
            min="1"
            placeholder="m@example.com"
            required
          />
        </div>

        <div class="grid gap-2">
          <Label
            >Transaction Status
            <span class="text-red-400">*</span>
          </Label>
          <Select>
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
            id="remarks"
            type="text"
            min="1"
            placeholder="m@example.com"
            required
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button type="submit"> Submit </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
