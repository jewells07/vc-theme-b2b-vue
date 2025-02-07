<template>
  <VcContainer :class="{ 'pointer-events-none opacity-50': loading }">
    <h1 class="-ml-0.5 text-28 font-bold uppercase lg:text-34">{{ fulfillmentCenter?.name }}</h1>

    <div class="mt-4 lg:mt-6 lg:flex lg:items-start">
      <div class="lg:drop-shadow-md-x lg:grow lg:rounded lg:border lg:bg-white">
        <div
          class="drop-shadow-md-x rounded border bg-white px-[1.4rem] py-5 text-base lg:rounded-none lg:border-0 lg:bg-transparent lg:px-8 lg:pb-5 lg:pt-6 lg:drop-shadow-none"
        >
          <div class="mb-1 mt-0.5 lg:mb-0.5">
            <div class="mb-1 mr-1 font-bold lg:mb-2">{{ $t("pages.branch.address") }}</div>
            <div class="break-words">
              {{ fulfillmentCenter?.address ? fulfillmentCenter?.address : "&ndash;" }}
            </div>
          </div>

          <div class="mb-1 flex flex-wrap">
            <div class="mr-1 font-bold">{{ $t("pages.branch.phone") }}</div>
            <a v-if="fulfillmentCenter?.phone" :href="`tel:${fulfillmentCenter?.phone}`" class="hover:underline">
              {{ fulfillmentCenter?.phone }}
            </a>
            <div v-else>&ndash;</div>
          </div>
        </div>

        <div
          v-if="fulfillmentCenter?.description"
          class="drop-shadow-md-x mt-6 rounded border bg-white text-base lg:mt-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:drop-shadow-none"
        >
          <div class="hidden h-[18px] bg-gradient-to-b from-[#94949421] lg:block"></div>

          <div id="description" v-html-safe="fulfillmentCenter?.description" class="break-words"></div>
        </div>
      </div>

      <div class="drop-shadow-md-x mt-6 rounded border bg-white text-base lg:ml-8 lg:mt-0 lg:w-[21.125rem] lg:shrink-0">
        <div class="border-b px-6 py-4 lg:pb-4 lg:pt-5">
          <h2 class="text-19 font-extrabold uppercase lg:text-21">{{ $t("pages.branch.other_branches") }}</h2>
        </div>
        <div class="px-11 pb-7 pt-5 lg:px-12 lg:pb-9 lg:pt-3.5">
          <!-- TODO: Replace with VcList -->
          <ul class="list-disc space-y-7">
            <li v-for="(branch, index) in otherBranches" :key="index" class="text-primary marker:text-xl">
              <router-link
                :to="`/branch/${branch.id}`"
                class="mb-1 text-[1.063rem] font-extrabold text-link lg:text-base"
              >
                {{ branch.name }}
              </router-link>
              <div v-if="branch.address" class="break-words text-sm text-[color:var(--color-body-text)]">
                {{ branch.address }}
              </div>
              <div class="text-sm text-[color:var(--color-body-text)]">
                <b>{{ $t("pages.branch.phone") }}</b>
                <a v-if="branch.phone" :href="`tel:${branch.phone}`" class="hover:underline">{{ branch.phone }}</a>
                <span v-else>&ndash;</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </VcContainer>
</template>

<script setup lang="ts">
import { watch, computed } from "vue";
import { useFulfillmentCenters } from "@/shared/fulfillmentCenters";

const props = defineProps({
  branchId: {
    type: String,
    default: "",
  },
});

const { loading, loadFulfillmentCenter, fulfillmentCenter, loadFulfillmentCenters, fulfillmentCenters } =
  useFulfillmentCenters();

const otherBranches = computed(() => fulfillmentCenters.value.filter((item) => item.id !== props.branchId));
loadFulfillmentCenter(props.branchId);
loadFulfillmentCenters();

watch(
  () => props.branchId,
  () => {
    loadFulfillmentCenter(props.branchId);
  },
);
</script>

<style lang="scss">
#description {
  @apply pb-6 px-6 border-b lg:pb-9 lg:px-8 lg:border-b-0;

  h2,
  h3 {
    @apply -mx-6 px-6 py-4 uppercase text-19 font-extrabold border-b lg:mx-0 lg:px-0 lg:text-21 lg:border-b-0;
  }

  table {
    @apply table-fixed border-separate border-0 w-full mt-[1.375rem] text-15 font-medium lg:mt-1.5;
    border-spacing: 0px 0px;
  }

  th {
    @apply px-3.5 py-2.5 border-b border-t text-left lg:px-5 lg:pt-3;

    &:first-child {
      @apply w-5/12 lg:w-52 border-l rounded-tl;
    }

    &:last-child {
      @apply border-r rounded-tr;
    }
  }

  tr {
    @apply even:bg-[#FAFAFA];

    &:last-child {
      td {
        &:first-child {
          @apply rounded-bl;
        }
        &:last-child {
          @apply rounded-br;
        }
      }
    }
  }

  td {
    @apply px-3.5 py-3.5 lg:px-5 lg:py-[1.035rem] border-b;

    &:first-child {
      @apply border-l;
    }

    &:last-child {
      @apply border-r;
    }
  }
}
</style>
