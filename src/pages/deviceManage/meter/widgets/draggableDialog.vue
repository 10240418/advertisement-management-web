<template>
  <el-dialog v-model="$props.visible" width="700" draggable :modal="false" :close-on-click-modal="false"
    modal-class="dialog_class" :show-close="false" bg-color="red">

    <VaCard>
      <div class=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 items-end">
        <VaInput v-model="$props.meter.name" placeholder="Solid" label="Name" />
        <VaInput v-model="$props.meter.id" placeholder="Solid" label="id" />
        <VaInput v-model="$props.meter.unit_id" placeholder="Solid" label="unit_id" />
        <VaInput v-model="$props.meter.updated_at" placeholder="Solid" label="updated_at" />
        <VaInput v-model="$props.meter.gateway_id" placeholder="Solid" label="gateway_id" />
        <VaInput v-model="$props.meter.modbus_address" placeholder="Solid" label="modbus_address" />
      </div>
    </VaCard>


    <template #footer>
      <div class="dialog-footer">
        <el-button @click="$emit('close', $props.meter)">Cancel</el-button>
        <el-button type="primary" @click="$emit('save', $props.meter)">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { meter_type } from '../../../../data/meter'

const props = defineProps({
  meter: { type: Object as PropType<meter_type>, required: true },
  visible: { type: Boolean, default: false },
  index: { type: Number, default: 0 }
})

console.log(props)
const emit = defineEmits<{
  (event: 'close', meter: any): void
  (event: 'save', meter: any): void
}>()
// const dialogVisible = ref(false)

</script>
<style>
.dialog_class {
  pointer-events: none;
}

.el-dialog {
  pointer-events: auto;
  /* background: #eee; */
  border-radius: 2px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);

}
</style>
