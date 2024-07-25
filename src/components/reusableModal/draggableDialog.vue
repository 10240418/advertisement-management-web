<template>
  <!-- 可操作的多开弹窗模板 -->
  <!-- <el-button plain @click="dialogVisible = true">
    Open a draggable Dialog
  </el-button> -->



  <el-dialog 
    v-model="$props.visible" 
    title="Tips" 
    width="500" 
    draggable
    :modal="false"
    :close-on-click-modal="false"
    modal-class="dialog_class"
  >
    <span>It's a draggable Dialog</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="$emit('close',$props.meter)">Cancel</el-button>
        <el-button type="primary" @click="$emit('save',$props.meter)">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import { PropType, ref} from 'vue'
import {meter_type} from '../../data/meter'

const props = defineProps({
  meter: {type: Object as PropType<meter_type>, required: true},
  visible: {type: Boolean, default: false},
  index:{type: Number, default: 0}
})
console.log(props)
const emit = defineEmits<{
  (event: 'close',meter: any): void
  (event: 'save' , meter : any):void
}>()
// const dialogVisible = ref(false)

</script>
<style>

.dialog_class {
  pointer-events: none;
}
 
.el-dialog {
  pointer-events: auto;
}

</style>
