<template>
  <div>
    <table class="table">
        <thead>
          <tr class="row">
            <th scope="col" class="col col-3 border-0">Product</th>
            <th scope="col" class="col col-3 border-0"></th>
            <th scope="col" class="col col-2 border-0">Price</th>
            <th scope="col" class="col col-2 border-0">QTY</th>
            <th scope="col" class="col col-2 border-0">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <!-- 加的動態 Key 對不對呢 -->
          <tr v-for="product in cartList"
              :key="product.id"
              class="row">
              <th scope="row"
                  class="col col-3">
                  <img :src="product.product.imageUrl[0]"
                      :alt="product.product.title"
                      class="w-50">
              </th>
              <td class="col col-3">{{product.product.title}}</td>
              <td class="col col-2">{{product.product.price}}</td>
              <td class="col col-2">
                  <div class="btn-group btn-group-sm" role="group" aria-label="">
                      <button type="button" class="btn btn-outline-secondary"
                              @click="editCart(product.product.id, product.quantity - 1)">-</button>
                      <button type="button" class="btn btn-outline-dark" disabled>{{product.quantity}}</button>
                      <button type="button" class="btn btn-outline-secondary"
                              @click="editCart(product.product.id, product.quantity + 1)">+</button>
                  </div>
              </td>
              <td class="col col-2">
                  <p class="d-inline">{{product.product.price * product.quantity}}</p>
                  <button class="btn float-right p-0" type="button"
                          @click.prevent="deleteCartItem(product.product.id)">
                          <span class="material-icons align-middle">clear</span>
                  </button>
              </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>
<script>
export default {
  props: [],
  data () {
    return {
      user: {
        apiLink: 'https://course-ec-api.hexschool.io',
        uuid: '1874925e-73c7-44be-80e4-108aedfb48f0'
      },
      cartList: []
    }
  },
  methods: {
    getCartList () {
      const url = `${this.user.apiLink}/api/${this.user.uuid}/ec/shopping`
      const vm = this
      vm.$emit('change-loading-state')
      this.$http
        .get(url)
        .then((res) => {
          console.log(res)
          vm.cartList = res.data.data
          var totalBill = 0
          vm.cartList.forEach((item) => {
            totalBill += item.product.price * item.quantity
          })
          vm.$emit('change-loading-state')
          vm.$emit('show-total-bill', totalBill)
          // console.log(totalBill)
        })
        .catch((err) => {
          console.log(err)
          vm.$emit('change-loading-state')
        })
    },
    editCart (nowProductId, quantity) {
      const url = `${this.user.apiLink}/api/${this.user.uuid}/ec/shopping`
      const vm = this
      if (quantity === 0) {
        vm.deleteCartItem(nowProductId)
      } else {
        vm.$emit('change-loading-state')
        this.$http
          .patch(url, {
            product: nowProductId,
            quantity: quantity.toString()
          })
          .then((res) => {
            console.log(res)
            vm.$emit('change-loading-state')
            vm.getCartList()
          })
          .catch((err) => {
            console.log(err)
            vm.$emit('change-loading-state')
          })
      }
    },
    deleteCartItem (nowProductId) {
      const url = `${this.user.apiLink}/api/${this.user.uuid}/ec/shopping/${nowProductId}`
      const vm = this
      vm.$emit('change-loading-state')
      this.$http
        .delete(url, {
          product: nowProductId
        })
        .then((res) => {
          console.log(res)
          vm.getCartList()
          vm.$emit('change-loading-state')
        })
        .catch((err) => {
          console.log(err)
          vm.$emit('change-loading-state')
        })
    }
  },
  created () {
    this.getCartList()
  }
}
</script>
