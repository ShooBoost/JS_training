new Vue({
    el: '#app',
    data: {
        productsList: [
            {
                id: '1',
                title:'Bird eggs',
                category:'Eggs',
                content:'A fresh bird egg necessary for making dishes such as omelets or crepes',
                description:'Egg size tends to be proportional to the size of the adult bird',
                imageUrl:'https://images.pexels.com/photos/4197912/pexels-photo-4197912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                enabled: true,
                origin_price: 180,
                price: 160,
                unit: '12pcs/box',
            },
            {
                id: '2',
                title:'Pineapple',
                category:'Fruit',
                content:'Juicy fruit that grows in hotter regions',
                description:'A large tropical fruit with a rough orange or brown skin and pointed leaves on top',
                imageUrl:'https://images.pexels.com/photos/4195527/pexels-photo-4195527.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
                enabled: true,
                origin_price: 120,
                price: 120,
                unit: '1pcs',
            },
            {
                id: '3',
                title:'Cherry tomato',
                category:'Fruit',
                content:'Cherry tomatoes are easy-going fruits',
                description:'Cherry tomatoes range in size from a thumbtip up to the size of a golf ball',
                imageUrl:'https://images.pexels.com/photos/4197906/pexels-photo-4197906.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                enabled: true,
                origin_price: 160,
                price: 120,
                unit: '1kg',
            },
        ],
        nowModalMode: '',
        nowEditProduct: {
            id: '',
            title:'',
            category:'',
            content:'',
            description:'',
            imageUrl:'',
            enabled: false,
            origin_price: 0,
            price: 0,
            unit: '',
        },
        nowIndex: -1,
    },
    methods: {
        showModal(nowMode, nowIndex){
            // console.log(`nowMode 是 ${nowMode}，且 nowIndex 是 ${nowIndex}`);
            this.nowIndex = nowIndex;
            switch (nowMode){
                case 'Edit Product':
                    this.nowModalMode = 'Edit Product';
                    // 別直接 by reference 的複製啊啊啊
                    this.nowEditProduct = JSON.parse(JSON.stringify(this.productsList[nowIndex]));
                    break
                case 'Add New Product':
                    this.nowModalMode = 'Add New Product';
                    // 用 timestamp 作為新產品的 id
                    this.nowEditProduct.id = Math.floor(Date.now());
                    // 預設都先不開啟
                    this.nowEditProduct = {enabled: false};
                    break
                case 'Delete Product':
                    this.nowModalMode = 'Delete Product';
                    this.nowEditProduct = JSON.parse(JSON.stringify(this.productsList[nowIndex]));
                    break
            }
        },
        confirmModal(nowMode){
            switch (nowMode){
                case 'Edit Product':
                    // 用 $set 綁定渲染
                    this.$set(this.productsList, this.nowIndex, this.nowEditProduct);
                    break
                case 'Add New Product':
                    // Add New Product 模式下，我在 html 傳入參數時，傳入的 nowIndex 是 nowEditProduct.length
                    this.$set(this.productsList, this.nowIndex, this.nowEditProduct);
                    break
                case 'Delete Product':
                    this.productsList.splice(this.nowIndex, 1);
                    break
            }
        },
    },
})
