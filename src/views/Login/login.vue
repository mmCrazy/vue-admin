<template lang="">
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">
                    {{item.txt}}</li>
            </ul>
             <!-- 表单 start-->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="邮箱" for="username" prop="username">
              <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" for="password" prop="password" >
              <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="8" maxlength="20"></el-input>
            </el-form-item>

          <el-form-item label="确认密码" for="passwords" prop="passwords" v-if="model === 'register'">
              <el-input id="passwords" type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="8" maxlength="20"></el-input>
            </el-form-item>

            <el-form-item label="验证码" for="code" prop="code">
              <el-row :gutter="20">
            <el-col style="padding:0" :span="10">
              <el-input id="code" v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="12">
              <el-button type="success" @click="getSms()" :disabled="codeButtonStatus.status">{{ codeButtonStatus.text }}</el-button>
            </el-col>
          </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" class="block" :disabled="loginButtonStatus">{{model === 'login'? '登录' : '注册'}}</el-button>
            </el-form-item>
          </el-form>
        </div>
    </div>
</template>
<script>
import sha1 from "sha1";
import { GetSms, Register, Login } from "../../api/login";
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
      } else if (value != this.ruleForm.password) {
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
      //登录按钮的禁用
      loginButtonStatus: true,
      //倒计时定时器
      timer: null,
      //获取验证码按钮的禁用与文字
      codeButtonStatus: {
        status: false,
        text: "获取验证码"
      },
      // 表单数据  ---开始
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      rules: {
        username: [
          {
            validator: validateUsername,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: validatePassword,
            trigger: "blur"
          }
        ],
        passwords: [
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
      //重置表单
      this.resetFormData();
      //清除获取验证码的定时器和改变text
      this.clearCountDown();
    },

    //重置表单
    resetFormData() {
      this.$refs["ruleForm"].resetFields();
    },

    //修改获取验证码按钮的状态
    updataButtonStatus(params) {
      this.codeButtonStatus.status = params.status;
      this.codeButtonStatus.text = params.text;
    },

    /**
     * 获取验证码
     * */
    getSms() {
      //提示
      if (this.ruleForm.username == "") {
        this.$message.error("邮箱不能为空");
        return false;
      }
      //此时验证码按钮为禁用和文字为发送中
      this.updataButtonStatus({
        status: true,
        text: "发送中"
      });
      // this.codeButtonStatus.status = true;
      // this.codeButtonStatus.text = "发送中";
      //请求接口
      let requestDate = {
        username: this.ruleForm.username,
        module: this.model
      };
      setTimeout(() => {
        GetSms(requestDate)
          .then(response => {
            let data = response.data;
            this.$message({
              showClose: true,
              message: data.message,
              type: "success"
            });
            //启用登录注册按钮
            this.loginButtonStatus = false;
            this.countDown(60);
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      }, 3000);
    },

    //获取验证码倒计时
    countDown(number) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      let time = number;
      this.timer = setInterval(() => {
        time--;
        console.log(time);
        if (time == 0) {
          clearInterval(this.timer);
          this.updataButtonStatus({
            status: false,
            text: "获取验证码"
          });
          // this.codeButtonStatus.status = false;
          // this.codeButtonStatus.text = "获取验证码";
        } else {
          this.codeButtonStatus.text = `倒计时${time}秒`;
        }
      }, 1000);
    },

    //清除倒计时的方法
    clearCountDown() {
      //验证码按钮高亮
      this.updataButtonStatus({
        status: false,
        text: "获取验证码"
      });
      // this.codeButtonStatus.status = false;
      // this.codeButtonStatus.text = "获取验证码";
      //清除定时器
      clearInterval(this.timer);
    },

    /**
     * 注册请求
     */
    register() {
      let registerData = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code,
        module: "register"
      };
      Register(registerData)
        .then(response => {
          let data = response.data;
          console.log(data);
          this.$message({
            showClose: true,
            message: data.message,
            type: "success"
          });
          //注册成功后跳转到登录的界面
          this.toggleMenu(this.menuTab[0]);
          this.clearCountDown();
        })
        .catch(error => {
          console.log(error);
          // this.$message.error(error);
        });
    },
    /**
     * 登录请求
     */
    login() {
      let LoginDate = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code
      };

      this.$store
        .dispatch("login", LoginDate)
        .then(response => {
          let data = response.data;
          console.log(response);
          console.log("登录成功");
          this.$message({
            showClose: true,
            message: data.message,
            type: "success"
          });
          //清理定时器
          this.clearCountDown();
          //控制台页面的跳转
          this.$router.push({
            name: "Layout",
            params: {
              id: "",
              user: ""
            }
          });
        })
        .catch(error => {
          console.log(error);
          // this.$message.error(error);
        });

      // Login(LoginDate)
      //   .then(response => {
      //     let data = response.data;
      //     console.log(response);
      //     console.log("登录成功");
      //     this.$message({
      //       showClose: true,
      //       message: data.message,
      //       type: "success"
      //     });
      //     //清理定时器
      //     this.clearCountDown();
      //     //控制台页面的跳转
      //     this.$router.push({
      //       name:"Layout",
      //       params:{
      //         id:'',
      //         user:''
      //       }
      //     })
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     // this.$message.error(error);
      //   });
    },
    /**
     * 提交表单
     */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        //表单验证通过
        if (valid) {
          // console.log(this.model)
          this.model === "login" ? this.login() : this.register();
        } else {
          this.clearCountDown();
          console.log("error submit!!");
          return false;
        }
      });
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
  box-sizing: border-box;
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