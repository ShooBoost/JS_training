<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- 標題 開始 -->
    <div class="container pt-5">
      <div class="row d-none d-md-block mb-5">
        <div class="col offset-md-1 text-left">
          <router-link class="w-100 text-decoration-none" to="/Products">
            Products
          </router-link>
            /{{productDetail.title}}
        </div>
      </div>
    </div>
    <!-- 標題 結束 -->
    <!-- 來不及做 RWD 的 產品明細 開始 -->
    <section class="container">
      <div class="row">
        <!-- 產品圖片放左邊 開始 -->
        <div class="col col-4 offset-1">
          <img v-for="item in productDetail.imageUrl"
              :key="item.id"
              class="w-100 mb-3"
              :src="item" :alt="item.title">
        </div>
        <!-- 產品圖片放左邊 結束 -->
        <!-- 希望產品說明文字可以
              1. 先 position fixed
              2. 隨著使用者滾動頁面
              3. 待使用者瀏覽完所有產品圖片後
              4. 再變 position relative 的固定再該 row 的最下方
        開始 -->
        <div class="col col-5 offset-1 position-relative">
          <div class="d-flex justify-content-start flex-column position-fixed">
            <h2 class="text-left">{{productDetail.title}}</h2>
            <p class="text-left">{{productDetail.price}}/{{productDetail.unit}}
              <s class="ml-5">{{productDetail.origin_price}}/{{productDetail.unit}}</s>
            </p>
            <p class="text-left">{{productDetail.content}}</p>
            <p class="text-left mb-8">{{productDetail.description}}</p>
            <p class="text-left mb-1" for="">Quantity</p>
            <div class="w-50 btn-group btn-group-sm mb-5" role="group" aria-label="">
              <button type="button" class="btn btn-outline-primary"
                      @click="changeNowQuantity(-1)">-</button>
              <button type="button" class="px-8 btn btn-outline-primary border-primary" disabled>{{nowQuantity}}</button>
              <button type="button" class="btn btn-outline-primary"
                      @click="changeNowQuantity(1)">+</button>
            </div>
            <button @click="addToCart(productDetail.id, nowQuantity)" class="w-50 btn btn-outline-primary mb-1">Add To Cart</button>
            <button @click="buyNow(productDetail.id, nowQuantity)" class="w-50 btn btn-primary mb-1">Buy Now</button>
          </div>
        </div>
        <!-- 希望產品說明文字可以
              1. 先 position fixed
              2. 隨著使用者滾動頁面
              3. 待使用者瀏覽完所有產品圖片後
              4. 再變 position relative 的固定再該 row 的最下方
        結束 -->
      </div>
    </section>
    <!-- 來不及做 RWD 的 產品明細 結束 -->
    <!-- 來不及做 RWD 與 slider 的 更多產品推薦 開始 -->
    <section class="container">
      <h3 class="mb-5">- Popular Collections -</h3>
      <div class="row">
        <div class="col col-3" v-for="item in productsList.slice(0, 4)" :key="item.id">
          <img :src="item.imageUrl[0]" :alt="item.title" class="w-100">
        </div>
      </div>
    </section>
    <!-- 來不及做 RWD 與 slider 的 更多產品推薦 結束 -->
  </div>

</template>
<script>
export default {
  data () {
    return {
      isLoading: false,
      productsList: [],
      nowProductId: '',
      productDetail: [],
      nowQuantity: 1,
      cartList: []
    }
  },
  methods: {
    // 都會跳轉到 checkout 後，addToCart 的一系列動作才回結束，崩潰
    // 這樣進到結帳業，購物車也還沒更新啊啊啊啊啊
    buyNow (nowProductId, quantity) {
      this.addToCart(nowProductId, quantity)
      this.$router.push('/checkout')
    },
    changeNowQuantity (num) {
      if (this.nowQuantity + num <= 0) {
        this.nowQuantity = 0
      } else {
        this.nowQuantity += num
      }
    },
    getProductDetails (id = this.nowProductId) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`
      vm.changeLoadingState('getProducts')
      this.$http.get(url)
        .then(res => {
          console.log(res)
          vm.productDetail = res.data.data
          vm.changeLoadingState('getProducts')
        })
        .catch(err => {
          console.log(err)
          vm.changeLoadingState('getProducts')
        })
    },
    getProducts (page = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`
      vm.changeLoadingState('getProducts')
      this.$http.get(url, { page: page })
        .then(res => {
          console.log(res)
          vm.productsList = res.data.data
          vm.changeLoadingState('getProducts')
        })
        .catch(err => {
          console.log(err)
          vm.changeLoadingState('getProducts')
        })
    },

    getCartList () {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      const vm = this
      vm.changeLoadingState('getCartList')
      this.$http.get(url)
        .then(res => {
          console.log(res)
          vm.cartList = res.data.data
          vm.changeLoadingState('getCartList')

          // 更新購物車資訊，監聽者來自 App.vue 喔喔喔
          this.$bus.$emit('cartRenew', vm.cartList)
        })
        .catch(err => {
          console.log(err)
          vm.changeLoadingState('getCartList')
        })
    },
    addToCart (nowProductId = this.nowProductId, quantity = this.nowQuantity) {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      const vm = this
      var nowCartItem = vm.cartList.find(function (item) {
        return item.product.id === nowProductId
      })
      if (nowCartItem) {
        console.log('already exists')
        vm.editCart(nowProductId, nowCartItem.quantity + quantity)
      } else {
        console.log(`{
          product: ${nowProductId},
          quantity: ${quantity.toString()}
        }`)
        this.$http.post(url, {
          product: nowProductId,
          quantity: quantity.toString()
        })
          .then((res) => {
            vm.getCartList()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    editCart (nowProductId, quantity) {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      const vm = this
      this.$http.patch(url, {
        product: nowProductId,
        quantity: quantity.toString()
      })
        .then(res => {
          console.log(res)
          vm.getCartList()
        })
        .catch(err => console.log(err))
    },
    changeLoadingState (nowMethod) {
      this.isLoading = !this.isLoading
      console.log(nowMethod, this.isLoading)
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.nowProductId = this.$route.params.id
    this.getProductDetails()
    this.getProducts()
    this.getCartList()
  }
}
</script>
