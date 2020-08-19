var consoleState = false;
function showConsole(description,thingsYouWantToConsole){
    if (consoleState){
        console.log(description,thingsYouWantToConsole);
    };
};

var app = new Vue({
    el: '#app',
    data: {
        user: {
            hexApiPath: 'https://course-ec-api.hexschool.io/',
            myToken: document.cookie.replace(/(?:(?:^|.*;\s*)tokenInCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
            myUUID:'1874925e-73c7-44be-80e4-108aedfb48f0',
        },

        totalPages: 1, 
        nowPageNum: 1,

        productsListInNowPage: [],

        nowIndex: -1,
        nowModalMode: '',
        nowEditProduct: {
            id: '',
            title:'',
            category:'',
            content:'',
            description:'',
            imageUrl:[],
            enabled: false,
            origin_price: 0,
            price: 0,
            unit: '',
        },
    },
    methods: {
        // 將後端 指定頁面下的產品 存到本地端 開始
        getBackEndProducts(pageNum = this.nowPageNum) {
            // 讀出我們瀏覽器 cookie 裡存的 我們指定的 token
            const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)tokenInCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            const myUUID = '1874925e-73c7-44be-80e4-108aedfb48f0';
            // 管理員用的後台要顯示、新增、修改、刪除商品的話，我們需要傳送 token (夾帶在我們請求時的 header 裡面) 進行驗證
            axios.defaults.headers['Authorization'] = `Bearer ${myToken}`;
            const myApiPath = `${this.user.hexApiPath}api/${this.user.myUUID}/admin/ec/products?page=${pageNum}`;
            axios.get(myApiPath)
                .then(res => {
                    showConsole('getBackEndProducts 的 get res: ', res);
                    this.productsListInNowPage = res.data.data;
                    this.totalPages = res.data.meta.pagination.total_pages;
                    this.nowPageNum = pageNum
                })
                .catch(err => {
                    showConsole('getBackEndProducts 的 get err: ', err);
                })
        },

        showModal(nowMode, nowIndex){
            // console.log(`nowMode 是 ${nowMode}，且 nowIndex 是 ${nowIndex}`);
            this.nowIndex = nowIndex;
            switch (nowMode){
                case 'Edit Product':
                    this.nowModalMode = 'Edit Product';
                    // 別直接 by reference 的複製啊啊啊
                    this.nowEditProduct = JSON.parse(JSON.stringify(this.productsListInNowPage[nowIndex]));
                    break
                case 'Add New Product':
                    this.nowModalMode = 'Add New Product';
                    // 用 timestamp 作為新產品的 id
                    this.nowEditProduct.id = Math.floor(Date.now());
                    // 預設都先不開啟
                    this.nowEditProduct = {
                            id: '',
                            title:'',
                            category:'',
                            content:'',
                            description:'',
                            imageUrl:[],
                            enabled: false,
                            origin_price: 0,
                            price: 0,
                            unit: '',
                        }
                    break
                
                case 'Delete Product':
                    this.nowModalMode = 'Delete Product';
                    this.nowEditProduct = JSON.parse(JSON.stringify(this.productsListInNowPage[nowIndex]));
                    break
            };
            showConsole('showModal nowEditProduct: ', this.nowEditProduct);
        },
        logout(){
            document.cookie = `tokenInCookie=''; expires=''`;
            window.location ='login.html'
        },
    },
    created() {
        // 將後端所有產品存到本地端
        this.getBackEndProducts()
    },
});

Vue.component('deleteModal', {
    template: '#deleteModalTemplate',
    props: ['nowModalMode','nowEditProduct', 'user'],
    methods: {
        confirmModal(nowMode){
            const vm = this;
            showConsole(`deleteModal confirmModal nowMode: `, this.nowEditProduct);
            showConsole(`deleteModal confirmModal nowMode: `, nowMode);
            var myApiPath = `${vm.user.hexApiPath}api/${vm.user.myUUID}/admin/ec/product/${vm.nowEditProduct.id}`;
            axios.delete(myApiPath, vm.nowEditProduct)
                .then(function(res){
                    showConsole(`changeBackEndData Delete Product: `, res);
                    vm.$emit('confirmmodal');
                })
                .catch(function(err){
                    showConsole(`error Delete Product`, err)
                })
            
        },
    }
})

// editModal 開始
Vue.component('editModal',{
    template: '#editModalTemplate',
    props: ['nowModalMode','nowEditProduct', 'user'],
    data(){
        return {
            }
    },
    methods: {
        confirmModal(nowMode){
            const vm = this;
            showConsole(`editModal confirmModal nowMode: `, nowMode);
            showConsole(`editModal confirmModal nowMode: `, this.nowEditProduct);
            switch (nowMode){
                case 'Edit Product':
                    var myApiPath = `${vm.user.hexApiPath}api/${vm.user.myUUID}/admin/ec/product/${vm.nowEditProduct.id}`;
                    axios.patch(myApiPath, vm.nowEditProduct)
                        .then(function(res){
                            showConsole(`changeBackEndData: `, res);
                            vm.$emit('confirmmodal')
                        })
                        .catch(function(err){
                            showConsole(`error`, err)
                        })
                    break
                case 'Add New Product':
                    var myApiPath = `${vm.user.hexApiPath}api/${vm.user.myUUID}/admin/ec/product`;
                    // var newimgUrlList = [vm.nowEditProduct.imageUrl];
                    // vm.nowEditProduct.imageUrl = newimgUrlList;
                    axios.post(myApiPath, vm.nowEditProduct)
                        .then(function(res){
                            showConsole(`changeBackEndData Add New Product: `, res);
                            vm.$emit('confirmmodal');
                        })
                        .catch(function(err){
                            showConsole(`error Add New Product`, err)
                        })
                    break
            }


        },
    },
})
// editModal 結束

// 分頁元件 開始
Vue.component('myPagination', {
    template: '#paginationTemplate',
    props: ['totalPages'],
    data(){
        return{
            nowPage: 1,
        }
    },
    methods: {
        goToPage(pageNumber){
            switch (pageNumber) {
                case 'Previous':
                    if (this.nowPage > 1) {
                        this.nowPage -= 1;
                    }
                    break
                case 'Next':
                    if (this.nowPage < this.totalPages) {
                        this.nowPage += 1;
                    }
                    break
                default:
                    this.nowPage = pageNumber;
            }
            showConsole(`component myPagination goToPage case: ${pageNumber},so nowPage: `, this.nowPage);
            this.$emit('letsgotopage', this.nowPage)
        },
    },
    created(){
    }
})
// 分頁元件 結束