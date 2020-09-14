import cartCompo from './components/cart.js';

Vue.component('cart-compo', cartCompo);
Vue.component('loading', VueLoading);
new Vue({
    el: '#app',
    data: {
        productsList: [],
        user: {
            apiLink: 'https://course-ec-api.hexschool.io',
            uuid: '1874925e-73c7-44be-80e4-108aedfb48f0',
        },
        cartList: [],
        isLoading: false,

    },
    methods: {
        getProducts( page=1 ){
            const vm = this;
            const url = `${this.user.apiLink}/api/${this.user.uuid}/ec/products`;
            vm.changeLoadingState('getProducts');
            axios.get(url,{'page':page})
                .then(res =>{
                    console.log(res);
                    vm.productsList = res.data.data
                    vm.changeLoadingState('getProducts');
                })
                .catch(err =>{
                    console.log(err)
                    vm.changeLoadingState('getProducts');
                })
        },
        getCartList(){
            const url = `${this.user.apiLink}/api/${this.user.uuid}/ec/shopping`;
            const vm = this;
            vm.changeLoadingState('getCartList');
            axios.get(url)
                .then(res => {
                    console.log(res);
                    vm.cartList = res.data.data;
                    vm.changeLoadingState('getCartList');
                })
                .catch(err => {
                    console.log(err)
                    vm.changeLoadingState('getCartList');
                })
        },
        addToCart(nowProductId, quantity=1){
            const url = `${this.user.apiLink}/api/${this.user.uuid}/ec/shopping`;
            const vm= this;
            var nowCartItem = vm.cartList.find(function(item){
                return item.product.id === nowProductId}
            )
            if(nowCartItem){
                console.log('already exists');
                vm.editCart(nowProductId, nowCartItem.quantity + quantity)
            }else{
                axios.post(url,{
                    'product': nowProductId,
                    'quantity': quantity.toString()
                })
                .then((res) => {
                    console.log(res);
                    vm.getCartList()
                })
                .catch((err) => {
                    console.log(err);
                })

            }

        },
        editCart(nowProductId, quantity){
            const url = `${this.user.apiLink}/api/${this.user.uuid}/ec/shopping`;
            const vm = this;
            axios.patch(url, {
                'product': nowProductId,
                'quantity': quantity.toString()
            })
                .then(res => {
                    console.log(res);
                    vm.getCartList()
                })
                .catch(err => console.log(err))
        },
        changeLoadingState(nowMethod){
            this.isLoading = !this.isLoading;
            console.log(nowMethod, this.isLoading)
        },
    },
    created(){
        this.changeLoadingState('created');
        this.getProducts();
        this.getCartList();
        this.changeLoadingState('created');
    }
})