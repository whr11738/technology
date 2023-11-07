<template>
  <!-- 表单页面模板 -->
  <!-- 记得引入样式 -->
  <!-- <com-edit
      v-if="editVisible"
      :close="
        () => {
          editVisible = false
        }
      "
      :data="{ x: 1 }"
    ></com-edit> -->
  <div>
    <el-dialog title="表单" visible="visible" width="30%" :before-close="close">
      <el-form :model="form" :rules="rulesRef" ref="formRef" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>

        <el-form-item label="备注" prop="desc">
          <el-input v-model="form.desc" />
        </el-form-item>

        <el-form-item label="数量" prop="number">
          <el-input-number :min="0" v-model="form.number" />
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否" prop="yes">
          <el-radio-group v-model="form.yes" size="small">
            <el-radio-button :label="1">是</el-radio-button>
            <el-radio-button :label="0">否</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="时间" prop="time">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div class="f">
          <div class="fa"></div>
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import '@/assets/css/baseStyle.css'
export default {
  props: {
    close: {
      type: Function
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      visible: true,
      rulesRef: {
        name: [
          {
            required: true,
            validator: async (_rule, value) => {
              if (value === '' || !value) {
                throw new Error('此项必填')
              }
            }
          }
        ],
        desc: []
      },
      options: [
        {
          label: '类型1',
          value: 1
        },
        {
          label: '类型2',
          value: 2
        }
      ],
      form: {
        name: '',
        desc: '',
        number: 0,
        type: 1,
        yes: 0,
        time: []
      }
    }
  },
  methods: {
    async onSubmit() {
      console.log('onSubmit')
      console.log(this.form)
      this.$refs['formRef'].validate((valid) => {
        console.log(valid)
      })
    }
  },
  mounted() {
    console.log(this.data)
  }
}
</script>
<style scoped></style>
