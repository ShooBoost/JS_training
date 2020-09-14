import cartCompo from './components/cart.js';

Vue.component('cart-detail-compo', cartCompo);

// 全域註冊 Vue-Loading-Layout component
Vue.component('loading', VueLoading);

Vue.component('validation-observer', VeeValidate.ValidationObserver);
Vue.component('validation-provider',VeeValidate.ValidationProvider);
// Class 設定檔案
VeeValidate.configure({
    classes: {
      valid: 'is-valid',
      invalid: 'is-invalid',
    }
  });

var app = new Vue({
    el: '#app',
    data: {
        isLoading: false,
        totalBill: 0,
        isChecking: false,
        formInfo:{
            name:'',
            tel: '',
            email: '',
            address: '',
            payment: ''
        },
        user: {
            apiLink: 'https://course-ec-api.hexschool.io',
            uuid: '1874925e-73c7-44be-80e4-108aedfb48f0',
        },
        orderSubmit: false,
        orderId:"FgVzTBcaffw377fPt5uNdQFq2D3b6vGETq4VoEbd0GdNyutGS5K2A0ARC2AOVo0f",
        orderInfo: {},
    },
    components: {
    },
    methods: {
        changeLoadingState(){
            this.isLoading = !this.isLoading;
            console.log(this.isLoading)
        },
        showTotalBill(totalBill){
            this.totalBill = totalBill;
            console.log(totalBill)
        },
        submitForm(){
            const url = `${this.user.apiLink}/api/${this.user.uuid}/ec/orders`;
            const vm = this;
            vm.$emit('change-loading-state')
            axios.post(url,vm.formInfo)
                .then(res =>{
                    console.log(res)
                    vm.orderInfo = res.data.data;
                    vm.orderSubmit = true;
                    vm.getOrderInfo(vm.orderInfo.id)
                    vm.$emit('change-loading-state')
                })
                .catch(err =>{
                    console.log(err)
                    vm.$emit('change-loading-state')
                })
        },
        getOrderInfo(orderId = this.orderId){
            const url = `${this.user.apiLink}/api/${this.user.uuid}/ec/orders/${orderId}`;
            const vm = this;
            vm.$emit('change-loading-state')
            axios.get(url)
                .then(res =>{
                    console.log(res)
                    
                    
                    vm.$emit('change-loading-state')
                })
                .catch(err =>{
                    console.log(err)
                    vm.$emit('change-loading-state')
                })
        }
    },
    created() {
    },
})