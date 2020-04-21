<template lang="">
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">
                    {{item.txt}}</li>
            </ul>
             <!-- 表单 start-->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="邮箱" prop="username">
    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
  </el-form-item>

  <el-form-item label="密码" prop="passwrod" >
    <el-input type="password" v-model="ruleForm.passwrod" autocomplete="off" minlength="8" maxlength="20"></el-input>
  </el-form-item>

<el-form-item label="确认密码" prop="passwrods" v-if="model === 'register'">
    <el-input type="password" v-model="ruleForm.passwrods" autocomplete="off" minlength="8" maxlength="20"></el-input>
  </el-form-item>

  <el-form-item label="验证码" prop="code">
    <el-row :gutter="20">
  <el-col style="padding:0" :span="10">
    <el-input v-model.number="ruleForm.code"></el-input>
  </el-col>
  <el-col :span="12">
    <el-button type="success" >获取验证码</el-button>
  </el-col>
</el-row>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')" class="block">登陆</el-button>
  </el-form-item>
</el-form>
        </div>
    </div>
</template>
<script>
export default {
  name: "login",
  data() {
    // 输入用户名 ----验证邮箱正则验证
    var validateUsername = (rule, value, callback) => {
      let reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    //输入密码--- 验证密码正则验证
    var validatePassword = (rule, value, callback) => {
      let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,})$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("输入6-20位包含数字、字母的密码"));
      } else {
        callback();
      }
    };
    //输入重复密码----验证重复密码
    var validatePasswords = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.passwrod) {
        callback(new Error("输入密码不一致"));
      } else {
        callback();
      }
    };
    //输入验证码----验证码正则验证
    var checkCode = (rule, value, callback) => {
      let reg = /^[a-z0-9]{6}$/;
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        {
          txt: "登陆",
          current: true,
          type: "login"
        },
        {
          txt: "注册",
          current: false,
          type: "register"
        }
      ],
      // 模块的值
      model: "login",
      // 表单数据  ---开始
      ruleForm: {
        username: "",
        passwrod: "",
        passwrods: "",
        code: ""
      },
      rules: {
        username: [
          {
            validator: validateUsername,
            trigger: "blur"
          }
        ],
        passwrod: [
          {
            validator: validatePassword,
            trigger: "blur"
          }
        ],
        passwrods: [
          {
            validator: validatePasswords,
            trigger: "blur"
          }
        ],
        code: [
          {
            validator: checkCode,
            trigger: "blur"
          }
        ]
      }
      // 表单数据  ---结束
    };
  },
  created() {},
  mounted() {},
  methods: {
    toggleMenu(data) {
      this.menuTab.forEach(element => {
        element.current = false;
      });
      data.current = true;
      //修改模块值
      this.model = data.type;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
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
<style lang="scss" scoped>
.login-wrap {
  padding-right: 50px;
  width: 330px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.menu-tab {
  list-style: none;
  text-align: center;
  display: inline-block;
  margin-left: 70px;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    margin-right: 60px;
    cursor: default;
    margin-top: 10px;
    -webkit-user-select: none;
  }
  li:nth-child(2) {
    margin-right: 0;
  }
}

#login {
  padding-top: 100px;
  height: 100vh;
  background-image: url("../../assets/images/14.jpg");
  background-size: cover;
}
.login-form {
  label {
    color: #fff;
    float: left;
  }
}
.item-form {
  margin-bottom: 13px;
}
.block {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}
.current {
  background-color: rgba(0, 0, 0, 0.3);
}
.el-form-item--feedback {
  margin-top: 20px;
}
</style>