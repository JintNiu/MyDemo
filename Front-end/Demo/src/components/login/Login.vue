<template>
  <div class="login">
    <el-row style="margin-top:150px">
      <el-col :span="6" :offset="8">
        <el-form
          :model="loginForm"
          status-icon
          :rules="loginRules"
          ref="loginForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [{ validator: validateName, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {

    check(){
      // 数据库
      // 查user表是否存在该用户，并且密码一致
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("登录成功");
          // 验证成功后，可以调用后台接口，验证用户名密码是否正确。
          // this.check();
          // 如果check成功，返回true，将当前用户保存在localStorage中，并进行跳转
          localStorage.setItem('User', this.loginForm.username);
          this.$router.push('/home');
          // 否则返回false

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="sass" scoped>

</style>

