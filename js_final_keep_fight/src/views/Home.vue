<template>
  <div class="home">
    <!-- home_banner 開始 -->
    <section class="mb-7">
      <div class="container-fluid p-0 position-relative homeBanner">
        <img class="w-100 h-100 position-absolute object-fit-cover alignLeftTop" src="../assets/image/home_banner.png" alt="">
        <div class="h-100 d-flex align-items-center">
          <div class="container">
            <div class="row">
              <div class="col col-6 offset-3 offset-md-6">
                <h2 class="line-height-2 text-primary text-md-left letter-spacing-1">Enjoy every bite<br>Wonderful meal made our life</h2>
              </div>
              <div class="col col-6 col-md-2 offset-3 offset-md-9">
                <router-link to="/Products" class="btn btn-outline-primary align-bottom w-100 text-decoration-none">
                  <span class="align-text-top">Shop Now</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- home_banner 結束 -->
    <!-- popular collection 開始 -->
    <section class="container">
      <h3 class="mb-7">- Popular Collections -</h3>
      <ul class="list-unstyled row">
        <li class="col col-10 offset-1 offset-sm-0 col-sm-6 col-md-3 mb-3">
          <router-link to="/Products" class="btn p-0 pb-3 border-0 btn-outline-primary w-100 text-decoration-none">
            <img class="w-100 mb-5" src="../assets/image/home_fruit.png" alt="Fresh Fruit">
            <h5 class="font-family-Cormorant-Garamond">Fresh Fruit</h5>
          </router-link>
        </li>
        <li class="col col-10 offset-1 offset-sm-0 col-sm-6 col-md-3 mb-3">
          <router-link to="/Products" class="btn p-0 pb-3 border-0 btn-outline-primary w-100 text-decoration-none">
            <img class="w-100 mb-5" src="../assets/image/home_vegetable.png" alt="Vegetable">
            <h5 class="font-family-Cormorant-Garamond">Vegetable</h5>
          </router-link>
        </li>
        <li class="col col-10 offset-1 offset-sm-0 col-sm-6 col-md-3 mb-3">
          <router-link to="/Products" class="btn p-0 pb-3 border-0 btn-outline-primary w-100 text-decoration-none">
            <img class="w-100 mb-5" src="../assets/image/home_seasonings.png" alt="Seasonings">
            <h5 class="font-family-Cormorant-Garamond">Seasonings</h5>
          </router-link>
        </li>
        <li class="col col-10 offset-1 offset-sm-0 col-sm-6 col-md-3 mb-3">
          <router-link to="/Products" class="btn p-0 pb-3 border-0 btn-outline-primary w-100 text-decoration-none">
            <img class="w-100 mb-5" src="../assets/image/home_protein.png" alt="Protein">
            <h5 class="font-family-Cormorant-Garamond">Protein</h5>
          </router-link>
        </li>
      </ul>
      <div class="row mb-8">
        <div class="col col-12 col-md-2 offset-md-5">
          <router-link to="/Products" class="btn btn-primary align-bottom w-100 text-decoration-none">
              <span class="align-text-top">Shop All</span>
          </router-link>
          <!-- <button class="btn btn-primary w-100">Shop All</button> -->
        </div>
      </div>
    </section>
    <!-- popular collection 結束 -->
    <!-- demo 開始 -->
    <section class="container">
      <div class="row">
        <router-link to="/Products" class="col col-12 col-md-6 mb-5">
          <div class="coverHoverWhite proteinShowInHover w-100">
            <img class="w-100" src="../assets/image/home_protein3.png" alt="Protein">
          </div>
        </router-link>
        <router-link to="/Products" class="col col-12 col-md-6 mb-5">
          <div class="coverWhite proteinHideInHover w-100">
            <img class="w-100" src="../assets/image/home_protein2.png" alt="Protein">
          </div>
        </router-link>
        <router-link to="/Products" class="col col-12 col-md-6 mb-5">
          <div class="coverWhite carboHideInHover w-100">
            <img class=" w-100" src="../assets/image/home_carbo1.png" alt="Protein">
          </div>
        </router-link>
        <router-link to="/Products" class="col col-12 col-md-6 mb-5">
          <div class="coverHoverWhite carboShowInHover w-100">
            <img class=" w-100" src="../assets/image/home_carbo2.png" alt="Protein">
          </div>
        </router-link>
      </div>
    </section>
    <!-- demo 結束 -->
    <!-- banner2 開始 -->
    <section class="container-fluid p-0 position-relative homeBanner">
        <img class="w-100 h-100 position-absolute object-fit-cover alignLeftTop" src="../assets/image/home_banner2.png" alt="home_banner2">
        <div class="h-100 d-flex align-items-center">
          <div class="container">
            <div class="row">
              <div class="col col-10 col-md-6 offset-1 offset-md-3">
                <h2 class="line-height-2 text-primary letter-spacing-1">
                  Stay Hungry Stay Foolish<br>Learn from what we eat
                </h2>
              </div>
              <div class="col col-4 col-md-2 offset-4 offset-md-5">
                <router-link to="/about" class="btn btn-outline-primary align-bottom w-100 text-decoration-none">
                    <span class="align-text-top">About Us</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
    </section>
    <!-- banner2 結束 -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>

<style lang="scss">
  body {
    background: $mama-green-white;
  }
  .homeBanner {
    height: 500px;
  }
  .coverWhite {
    position: relative;
    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba($color: white, $alpha: 0.6);
      top: 0;
      left: 0;
      transition: 2s;
    }
    &::after {
      content: '';
      display: block;
      position: absolute;
      font-size: 48px;
      font-weight: 500;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: 2s;
    }
    &:hover {
      &::before, &::after {
        display: none;
        transition: 8s;
      }
    }
  }
  .coverHoverWhite {
    position: relative;
      &::before, &::after {
        display: none;
        transition: 8s;
      }
    &:hover {
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba($color: white, $alpha: 0.6);
        top: 0;
        left: 0;
        transition: 2s;
      }
      &::after {
        content: '';
        display: block;
        position: absolute;
        font-size: 48px;
        font-weight: 500;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: 2s;
      }
    }
  }
  .proteinShowInHover {
    &:hover {
      &::after {
        content: 'Protein';
      }
    }
  }
  .carboShowInHover {
    &:hover {
      &::after {
        content: 'Carbo';
      }
    }
  }
  .proteinHideInHover {
    &::after {
        content: 'Protein';
      }
  }
  .carboHideInHover {
    &::after {
      content: 'Carbo';
    }
  }

</style>
