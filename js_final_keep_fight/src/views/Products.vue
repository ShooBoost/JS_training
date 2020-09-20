<template>
  <div>
    <!-- product banner 開始 -->
    <section class="mb-4 mb-lg-7 d-none d-md-block">
      <div class="container-fluid p-0 position-relative productsBanner">
        <img class="w-100 h-100 position-absolute object-fit-cover alignLeftTop" src="../assets/image/fruit_banner.png" alt="">
        <div class="h-100 d-flex align-items-center">
          <div class="container">
            <div class="row">
              <div class="col offset-1 offset-md-1">
                <h2 class="line-height-2 text-primary text-md-left letter-spacing-1">Life is full of<br>Wonderful Flavor</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- product banner 結束 -->
    <h3 class="mb-4 mb-lg-7">Product</h3>
    <!-- product list 開始 -->
    <section class="container">
      <ul class="list-unstyled row">
        <li v-for="item in productsList"
            :key="item.id"
            class="btnHoverShow col col-6 offset-0 col-sm-6 col-md-4 col-lg-3
                  btn py-3 border-0 text-primary btn-outline-info text-decoration-none">
          <router-link :to="`/Product/${item.id}`" class="text-decoration-none w-100">
            <div class="remainRatio2To3 mb-3">
              <img class="" :src="item.imageUrl[0]" alt="item.title">
            </div>
            <h5 class="mb-2">{{item.title}}</h5>
            <p class="mb-2">{{item.price}} NTD/ {{item.unit}}</p>
          </router-link>
          <button @click="addToCart(item.id)"
                  class="btn border-0 btn-outline-primary w-100 text-decoration-none">
            Add to Cart
          </button>
        </li>
      </ul>
    </section>
    <!-- product list 結束 -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      productsList: {},
      cartList: [],
      isLoading: false
    }
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`
      // vm.changeLoadingState('getProducts')
      this.$http.get(url, { page: page })
        .then(res => {
          console.log(res)
          vm.productsList = res.data.data
          // vm.changeLoadingState('getProducts')
        })
        .catch(err => {
          console.log(err)
          // vm.changeLoadingState('getProducts')
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
    addToCart (nowProductId, quantity = 1) {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      const vm = this
      var nowCartItem = vm.cartList.find(function (item) {
        return item.product.id === nowProductId
      })
      if (nowCartItem) {
        console.log('already exists')
        vm.editCart(nowProductId, nowCartItem.quantity + quantity)
      } else {
        this.$http.post(url, {
          product: nowProductId,
          quantity: quantity.toString()
        })
          .then((res) => {
            console.log(res)
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
    this.changeLoadingState('created')
    this.getProducts()
    this.getCartList()
    this.changeLoadingState('created')
  }
}
</script>
<style lang="scss" scoped>
  .productsBanner {
    height: 400px
  }
  .btnHoverShow:hover {
    .btn {
      background-color: $mama-green;
      color: white;
      &:hover {
        background-color: rgba($mama-green, 0.8);
        // color: $mama-green;
      }
    }
  }
  .remainRatio2To3 {
    position: relative;
    width: 100%;
    padding-top: 150%;
    overflow: hidden;
    img {
      position:  absolute;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
</style>
