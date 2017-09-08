<template lang='jade'>
    div

        form
            h2 登录
            input.input_style(type="text" placeholder='Username' v-model='name' required)
            input.input_style(type="text" placeholder='Password' v-model='password' required)
            button(type='button',@click='goLogin()') 登录
</template>

<script>

export default {
    name:'login',
    data() {
        return {
            name:'nina',
            password:'123456',
        }
    },
    mounted:function(){
        
    },
    methods:{
        goLogin: function(){
            let _this = this;
            let postData = {
                name: this.name,
                password: this.password
            }
            if(this.name && this.name){
                _this.$http.post('/api/login', postData).then(response => {
                    if(response.body.code == '0'){
                        alert('登录成功')
                        setTimeout(function(){
                            window.location.href='/';
                        },1000);
                    }else{
                        alert('用户名密码不正确');
                    }
                    
                    
                }, response => {
                    // error callback
                });
            }else{
                alert('请填写用户名和密码')
            }
        },

    }
} 
</script>

<style lang='less'>
@import '../assets/_common';
form{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 260px;
    text-align: center;
    h2{
        margin-bottom: 20px;
        color: @default_color;
    }
    .input_style{
        line-height: 34px;
        border: 1px solid #eaeaea;
        border-radius: 2px;
        margin-bottom: 20px;
        width: 100%;
        box-sizing:border-box;
        padding: 0px 20px;
    }
    button{
        width: 100%;
        border: 0px;
        background: @default_color;
        color: #fff;
        border-radius: 2px;
        line-height: 34px;
        margin-bottom: 40px;
        &:hover{
            cursor: pointer;
            background: @default_hover_color;
        }
        &:visited{
            boder:0px;
        }
    }
}
</style>
