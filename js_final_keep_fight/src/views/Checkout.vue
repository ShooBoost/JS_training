<template>
  <div id="app">
    <div v-if="!orderSubmit" class="container py-5">
      <loading :active.sync="isLoading"></loading>
      <!-- <a class="material-icons text-secondary text-decoration-none" href="products.html">
          arrow_back
      </a> -->
      <!-- cart table 開始 -->
      <div class="row">
        <cart-detail-compo class="col col-12"
                    @change-loading-state="changeLoadingState"
                    @show-total-bill="showTotalBill">
        </cart-detail-compo>
      </div>
      <!-- cart table 結束 -->
      <h5 class="text-right h3">total: {{totalBill}}</h5>
      <button class="btn btn-secondary align-self-right mb-5" type="button"
              @click="isChecking = !isChecking"
              v-if="!isChecking && totalBill > 0">CheckOut</button>
      <!-- 表單 開始 -->
      <validation-observer v-slot="{ invalid }">
        <!-- v-slot="{  }" 看你想吐什麼出訊息，現在希望表單只要有一格不合規定，就視整個表單無效 -->
        <form v-if="isChecking"
              @submit.prevent="submitForm">
              <!-- .prevent 避免預設 -->
          <h3>Customer Info</h3>
          <div class="form-row">
            <div class="col col-5 mb-4 offset-md-1">
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <!-- rules="" 看你想檢驗什麼規則，現在要確定姓名必填 -->
                <label for="fullName">Full Name</label>
                <!-- 用 v-model 綁定要被檢驗的值 -->
                <input id="fullName" type="text"
                      :class="classes"
                      v-model="formInfo.name" class="form-control" placeholder="Full Name">
                <span class="invalid-feedback">{{errors[0]}}</span>
              </validation-provider>
            </div>
            <div class="col col-5 mb-4">
              <validation-provider rules="required|min:8" v-slot="{ errors, classes }">
                <label for="contactNumber">Contact Number</label>
                <input id="contactNumber" type="tel"
                      :class="classes"
                      v-model="formInfo.tel" class="form-control" placeholder="Contact Number">
                <span class="invalid-feedback">{{errors[0]}}</span>
              </validation-provider>
            </div>
            <div class="col col-5 mb-4 offset-md-1">
              <validation-provider rules="required|email" v-slot="{ errors, classes }">
                <label for="email">Email Address</label>
                <input id="email" type="text"
                      :class="classes"
                      v-model="formInfo.email" class="form-control" placeholder="Email Address">
                <span class="invalid-feedback">{{errors[0]}}</span>
              </validation-provider>
            </div>
            <div class="col col-5 mb-4">
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <label for="address">Address</label>
                <input id="address" type="text"
                      :class="classes"
                      v-model="formInfo.address" class="form-control" placeholder="Address">
                <span class="invalid-feedback">{{errors[0]}}</span>
              </validation-provider>
            </div>
          </div>
          <h3>Payment Detail</h3>
          <div class="form-row">
            <div class="col col-5 mb-4 offset-md-1">
              <validation-provider rules="required" v-slot="{ errors, classes }">
                <label for="paymentMethod">Payment Method</label>
                <select id="paymentMethod"
                        v-model="formInfo.payment"
                        :class="classes" class="form-control custom-select">
                  <option selected disabled>Choose...</option>
                  <option value="WebATM">WebATM</option>
                  <option value="ATM">ATM</option>
                  <option value="Barcode">Barcode</option>
                  <option value="Credit">Credit</option>
                  <option value="ApplePay">ApplePay</option>
                  <option value="GooglePay">GooglePay</option>
                </select>
                <span class="invalid-feedback">{{errors[0]}}</span>
              </validation-provider>
            </div>
          </div>
          <!-- 確保整個表單合乎規定，submit 的按鈕才能按 -->
          <button :disabled="invalid"
                  type="submit" class="btn btn-primary">Submit</button>
        </form>
      </validation-observer>
      <!-- 表單 結束 -->
    </div>
    <div v-if="orderSubmit" class="container pt-5">
      <h5>Dear {{orderInfo.user.name}}, we got your order, Thank you!</h5>
    </div>
  </div>
</template>
<script>
// import cartCompo from './components/cart.js'

// Vue.component('cart-detail-compo', cartCompo)

// // 全域註冊 Vue-Loading-Layout component
// Vue.component('loading', VueLoading)

// Vue.component('validation-observer', VeeValidate.ValidationObserver)
// Vue.component('validation-provider', VeeValidate.ValidationProvider)
// // Class 設定檔案
// VeeValidate.configure({
//   classes: {
//     valid: 'is-valid',
//     invalid: 'is-invalid'
//   }
// })
export default {
  data  () {
    return {
      isLoading: false,
      totalBill: 0,
      isChecking: false,
      formInfo: {
        name: '',
        tel: '',
        email: '',
        address: '',
        payment: '',
        user: {
          apiLink: 'https://course-ec-api.hexschool.io',
          uuid: '1874925e-73c7-44be-80e4-108aedfb48f0'
        }
      },
      orderSubmit: false,
      orderId:
        'FgVzTBcaffw377fPt5uNdQFq2D3b6vGETq4VoEbd0GdNyutGS5K2A0ARC2AOVo0f',
      orderInfo: {}
    }
  },
  methods: {
    changeLoadingState () {
      this.isLoading = !this.isLoading
      console.log(this.isLoading)
    },
    showTotalBill (totalBill) {
      this.totalBill = totalBill
      console.log(totalBill)
    },
    submitForm () {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders`
      const vm = this
      vm.$emit('change-loading-state')
      this.$http
        .post(url, vm.formInfo)
        .then((res) => {
          console.log(res)
          vm.orderInfo = res.data.data
          vm.orderSubmit = true
          vm.getOrderInfo(vm.orderInfo.id)
          vm.$emit('change-loading-state')
        })
        .catch((err) => {
          console.log(err)
          vm.$emit('change-loading-state')
        })
    },
    getOrderInfo (orderId = this.orderId) {
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders/${orderId}`
      const vm = this
      vm.$emit('change-loading-state')
      this.$http
        .get(url)
        .then((res) => {
          console.log(res)

          vm.$emit('change-loading-state')
        })
        .catch((err) => {
          console.log(err)
          vm.$emit('change-loading-state')
        })
    }
  }
}
</script>
