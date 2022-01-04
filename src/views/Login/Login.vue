

<template>
    <div class="login-container">
        <!-- 头部 -->
        <van-nav-bar title="黑马头条 - 登录" fixed />
        <!-- 登录的表单 -->
        <van-form @submit="login">
            <van-field :rules="rules.mobile" v-model="form.mobile" type="tel" label="手机号码" placeholder="请输入手机号码" required></van-field>
            <van-field :rules="rules.code" v-model="form.code" type="password" label="登录密码" placeholder="请输入登录密码" required></van-field>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
        
    </div>
    
    
</template>

<script>
import { loginAPI } from '@/api/userAPI'
// 1. 按需导入辅助方法
import { mapMutations } from 'vuex'
export default {
    name: "Login",
    data() {
        return {
            // 登录表单的数据， 最终要双向绑定到form
            form: {
                mobile: '',
                code: ''
            },
            // 表单的校验规则对象
            rules: {
                mobile: [{required: true, message: '请填写您的手机号', trigger: 'onBlur'},
                         // 11 位手机号的校验规则                        
                         {pattern: /^1[3-9]\d{9}$/, message: '请填写正确的手机号', trigger: 'onBlur'}

                ],
                code: [{required: true, message: '请填写您的密码', trigger: 'onBlur'}]
            }
        }
    },
    methods: {
        // 2. 映射 mutations 中的方法
        ...mapMutations(['updateTokenInfo']),
        async login() {
            const { data: resp} = await loginAPI(this.form)
            if (resp.message == "OK") {
                // 3. 把登录成功的结果，存储到 vuex 中
                this.updateTokenInfo(resp.data)
                // 4. 登录成功后， 跳转到首页
                this.$router.push('/')
            }
        },

    },
};
</script>

<style lang="less" scoped>
.login-container {
    padding-top: 46px;
}
</style>