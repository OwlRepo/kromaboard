<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between">
      <div class="grid gap-2">
        <CardTitle>Filter</CardTitle>
        <CardDescription> Filter by product, date and status. </CardDescription>
      </div>
    </CardHeader>
    <CardContent class="flex flex-col space-y-6 items-stretch">
      <div class="flex flex-col space-y-2">
        <b>Creation Date</b>
        <div class="flex flex-row items-center">
          <DateRangePicker client:visible />
        </div>
      </div>
      <div class="flex flex-row justify-between space-x-2">
        <Button class="w-full" variant="outline">Reset</Button>
        <Button class="w-full">Filter</Button>
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import DateRangePicker from "@/components/custom/form/DateRangePicker.vue";
import Button from "@/components/ui/button/Button.vue";
</script>
