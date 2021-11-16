<template>
  <div class="product color-dark">
    <b-container>
      <b-row class="product__header">
        <b-col
            cols="12"
            md="6"
        >
        </b-col>
        <b-col
            cols="12"
            md="6"
        >
          <h2>{{ currentProduct.name }}</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col
            cols="12"
            md="6"
        >
          <div class="product__image-container">
            <img
                class="product__image border-radius custom-shadow"
                v-bind:src="currentProduct.image.src"
                v-bind:alt="currentProduct.image.alt"
            />
            <BaseButton
                class="product__back-button"
                v-bind:clickFunction="() => route('products')"
            >
              Powrót
            </BaseButton>
          </div>
        </b-col>
        <b-col
            cols="12"
            md="6"
        >
          <b-container>
<!--            <b-row class="product__short-desc">-->
<!--              <h4>-->
<!--                {{ currentProduct.shortDesc }}-->
<!--              </h4>-->
<!--            </b-row>-->
<!--            <b-row class="product__desc">-->
<!--              <p>-->
<!--                {{ currentProduct.desc }}-->
<!--              </p>-->
<!--            </b-row>-->
            <b-row class="product__quantity">
              <p>
                {{ currentProduct.availableQuantity | formatQuantity }}
              </p>
            </b-row>
            <b-row class="product__price">
              <p>
                {{ currentProduct.price | formatPrice }}
              </p>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>

<!--    <BaseButton-->
<!--        v-bind:clickFunction="() => addtoCart(currentProduct.id)"-->
<!--        v-bind:updateVisible="canAddProductToCart"-->
<!--    >-->

<!--      <span v-if="() => countPieces(2)">-->
<!--        Ostatnie sztuki (zostało {{countAvailableItems}})-->
<!--      </span>-->

<!--      <span v-else-if="() => countPieces(1)">-->
<!--        Ostatnia sztuka-->
<!--      </span>-->

<!--      <span v-else-if="() => countPieces(0)">-->
<!--        Brak wystarczającej ilośći produktów na stanie-->
<!--      </span>-->

<!--      <span v-else>-->
<!--        Dodaj do koszyka (zostało {{countAvailableItems}})-->
<!--      </span>-->

<!--    </BaseButton>-->

  </div>
</template>

<script>

import BaseButton from "@/components/BaseButton";

import router from "@/mixins/router";
import products from "@/mixins/products";
import cart from "@/mixins/cart";

export default {
  name: 'ProductDetails',
  mixins: [router, products, cart],
  components: {
    BaseButton
  },
  methods: {

  },
  computed: {
    countPieces: function(howMuch) {
      return this.availableItems(this.currentProduct) === parseInt(howMuch)
    },

    countAvailableItems: function() {
      return this.availableItems(this.currentProduct);
    },

    canAddProductToCart: function() {
      return this.canAddToCart(this.currentProduct)
    },

  },
  created() {
    document.title = this.currentProduct.name
  }
}

</script>

<style scoped lang="scss">
.product {
  position: relative;
  &__header {
    padding: 50px 0px 50px 30px;
  }
  &__image-container {
    position: sticky;
    top: 100px;
  }
  &__image {
    width: 100%;
    margin-bottom: 20px;
  }
  &__short-desc {
    margin-bottom: 20px;
  }
  &__desc {

  }
  &__quantity, &__price {
    margin: 50px 0px;
    padding: 0px;
    font-size: 1.5rem;
    position: relative;

    p {
      padding: 0px;
      margin: 0px;
    }

    &:after {
      position: absolute;
      top: -12px;
      font-size: 12px;
    }
  }
  &__price {
    &:after {
      content: 'Cena:';
    }
  }
  &__quantity {
    &:after {
      content: 'Dostepna ilość:';
    }
  }
}
</style>