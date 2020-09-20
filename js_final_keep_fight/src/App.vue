<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-light bg-info px-sm-0 sticky-top">
      <div class="container">
        <a class="nav-link px-0 d-md-none px-4" href="#">
          <span class="material-icons">
            shopping_cart</span>
        </a>
        <router-link class="navbar-brand mr-md-5" to="/">
          <img class="brandLogo" src="./assets/Natural_Mama_logo.png" alt="Natural_Mama_logo">
        </router-link>
        <button class="navbar-toggler border-0 px-4" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav d-flex w-100">
            <router-link class="nav-link active mr-md-4" to="/">
              <span class="align-text-top">Home</span>
              <span class="sr-only">(current)</span>
            </router-link>
            <router-link class="nav-link mr-md-4" to="/Products">
              <span class="align-text-top">Products</span>
            </router-link>
            <router-link class="nav-link mr-md-auto" to="/about">
              <span class="align-text-top">About</span>
            </router-link>
            <router-link class="nav-link px-0 d-none d-md-block" to="/checkout">
              <span class="material-icons">
                shopping_cart
              </span>
              <span>{{cartList.length}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      cartList: [],
      isLoading: false
    }
  },
  methods: {
    getCartList () {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      const vm = this
      vm.changeLoadingState('getCartList')
      this.$http.get(url)
        .then(res => {
          console.log(res)
          vm.cartList = res.data.data
          vm.changeLoadingState('getCartList')
        })
        .catch(err => {
          console.log(err)
          vm.changeLoadingState('getCartList')
        })
    },
    changeLoadingState (nowMethod) {
      this.isLoading = !this.isLoading
      console.log(nowMethod, this.isLoading)
    },
    watchCart () {
      this.$bus.$on('cartRenew', newCartList => {
        // 只要被監聽到有其他元件用 this.$bus.$emit('cartRenew', vm.cartList) 發出信號
        // 就會觸發現在箭頭函式裡的事件
        this.cartList = newCartList
      })
    }
  },
  created () {
    this.getCartList()
    this.watchCart()
  }
}
</script>

<style lang="scss">
// @import "assets/scss/_variables.scss";
$mama-green:    #234C2A !default;
$mama-green-grey:    #8AA28A !default;
$mama-green-navbar:    #E9EDDD !default;
$mama-green-white:    #F7FAEE !default;

* {
  // font-family: 'Tajawal', sans-serif;
  font-family: 'Cormorant Garamond', serif;
}

body {
  background: $mama-green-white;
}

.font-family-Cormorant-Garamond{
  font-family: 'Cormorant Garamond', serif;
}

.z-index-negative-1 {
  z-index: -1;
}

.line-height-2 {
  line-height: 2;
}

.letter-spacing-1 {
  letter-spacing: 0.05rem;
}

.object-fit-cover {
    object-fit: cover;
    z-index: -1;
    // left: 0;
    // top: 0;
}
.alignLeftTop {
  left: 0;
  top: 0;
}

.brandLogo {
  width: 150px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
