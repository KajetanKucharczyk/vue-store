<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <h2
            class="header"
            v-if="cartLength"
        >
          Twoje zamówienie
        </h2>
        <h2
            class="header header--no-products"
            v-else
        >
          Koszyk aktualnie jest pusty
        </h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-row
            class="product color-dark"
            v-for="item in cartItems"
            v-bind:key="item.id"
        >
          <b-col
              class="product__image"
              cols="2"
          >
              <img class="border-radius custom-shadow" v-bind:src="item.image.src" v-bind:alt="item.image.alt" />
          </b-col>
          <b-col
              class="product__name"
              cols="2"
          >
            <strong>
              {{ item.name }}
            </strong>
          </b-col>
          <b-col
              class="product__count"
              cols="1"
          >
            {{ totalProductCount(item) }}
          </b-col>
          <b-col
              class="product__price"
              cols="3"
          >
            {{ item.price | formatPrice }}
          </b-col>
          <b-col
              class="product__total-price"
              cols="3"
          >
            {{ totalProductPrice(item) | formatPrice }}
          </b-col>
          <b-col
              class="product__remove border-radius color-light custom-shadow"
              cols="1"
              v-on:click="removeFromCart(item.id)"
          >
            X
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row v-if="cartLength">
      <b-col cols="12">
        <h2 class="header">
          Podsumowanie
        </h2>
      </b-col>
    </b-row>
    <b-row v-if="cartLength">
      <b-col cols="3">
        Łączna ilość predniotów:
      </b-col>
      <b-col cols="3">
        {{cartLength}}
      </b-col>
    </b-row>
    <b-row v-if="cartLength">
      <b-col cols="3">
        Łączna kwota do zapłaty:
      </b-col>
      <b-col cols="3">
        {{ totalProductsPrice | formatPrice }}
      </b-col>
    </b-row>
    <b-row>

      <Button
          v-if="cartLength"
          v-bind:clickFunction="() => route('form')"
      >
        Finalizuj zamówienie
      </Button>

      <Button
          v-else
          v-bind:clickFunction="routeBack"
      >
        Powrót
      </Button>

    </b-row>

  </b-container>
</template>

<script>

import Button from "@/components/base/BaseButton";

import products from "@/mixins/products";
import cart from "@/mixins/cart";
import router from "@/mixins/router";

export default {
  name: "Cart",
  mixins: [cart, router, products],
  components: {
    Button
  },
  methods: {
    getItems: function(items) {
      return this.products.filter(item => {
        return items.includes(item.id);
      })
    },

    getItem: function(item) {
      return this.products.find(el => el.id === item)
    },

    totalProductCount: function(item) {
      return this.cart.filter(el => el === item.id).length
    },

    totalProductPrice: function(item) {
      return this.totalProductCount(item) * item.price
    },
  },
  computed: {
    cartItems: function() {
      return this.getItems(this.cart)
    },

    totalProductsPrice: function() {
      return this.cart.reduce((a, b) => {return typeof this.getItem(a) === "undefined" ? (a + this.getItem(b).price) : (this.getItem(a).price + this.getItem(b).price)})
    },
  }
}
</script>

<style scoped lang="scss">
  .header {
    margin: 50px 0px;
    &--no-products {
      text-align: center;
    }
  }
  .product{
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid $dark-color;
    border-top: 0px;
    padding: 5px;
    transition: 0.2s background-color ease-in-out;

    &:first-of-type {
      border: 1px solid $dark-color;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    &:last-of-type {
      margin-bottom: 50px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }

    &:hover {
      background-color: $light-color;
    }

    &__image {
      img {
        width: 100%;
      }
    }

    &__remove {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: lighten(red, 20);
      transition: 0.2s background-color ease-in-out;
      cursor: pointer;
      height: 35px;
      width: 35px;

      &:hover {
        background-color: red;
      }
    }
  }
</style>