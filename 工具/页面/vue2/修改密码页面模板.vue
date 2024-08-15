<template>
  <!-- 表单页面模板 -->
  <!-- 记得引入样式 -->
  <!-- <com-change-pw
      v-if="editVisible"
      :close="
        () => {
          editVisible = false
        }
      "
      :data="{ x: 1 }"
    ></com-change-pw> -->
  <div>
    <el-dialog title="修改密码" :visible="visible" width="30%" :before-close="close">
      <el-form :model="form" :rules="rulesRef" ref="formRef" label-width="120px">
        <el-form-item label="密码" prop="pw1">
          <el-input v-model="form.pw1" placeholder="请输入密码" />
        </el-form-item>

        <el-form-item label="确认密码" prop="pw2">
          <el-input v-model="form.pw2" placeholder="请确认密码" />
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
        pw1: [
          {
            required: true,
            validator: async (_rule, value) => {
              if (value === '' || !value) {
                throw new Error('此项必填')
              }
              if (this.form.pw2 !== '' && this.form.pw1 !== this.form.pw2) {
                throw new Error('两个密码不一样')
              }
            }
          }
        ],
        pw2: [
          {
            required: true,
            validator: async (_rule, value) => {
              if (value === '' || !value) {
                throw new Error('此项必填')
              }
              if (this.form.pw1 !== '' && this.form.pw1 !== this.form.pw2) {
                throw new Error('两个密码不一样')
              }
            }
          }
        ]
      },
      form: {
        pw1: '',
        pw2: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      console.log('onSubmit')
      console.log(this.form)
      this.$refs['formRef'].validate((valid) => {
        console.log(valid)
        return
      })
    }
  },
  mounted() {
    console.log(this.data)
  }
}
</script>
<style scoped></style>
