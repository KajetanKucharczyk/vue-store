<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <h2
            class="header"
            v-if="anyItem"
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
    <b-row v-if="anyItem">
      <b-col cols="12">
        <h2 class="header">
          Podsumowanie
        </h2>
      </b-col>
    </b-row>
    <b-row v-if="anyItem">
      <b-col cols="3">
        Łączna ilość predniotów:
      </b-col>
      <b-col cols="3">
        {{anyItem}}
      </b-col>
    </b-row>
    <b-row v-if="anyItem">
      <b-col cols="3">
        Łączna kwota do zapłaty:
      </b-col>
      <b-col cols="3">
        {{ totalProductsPrice | formatPrice }}
      </b-col>
    </b-row>
    <b-row>

      <Button
          v-if="anyItem"
          v-bind:clickFunction="() => routeForm.route()"
      >
        Finalizuj zamówienie
      </Button>

      <Button
          v-else
          v-bind:clickFunction="() => routeForm.routeBack()"
      >
        Powrót
      </Button>

    </b-row>

  </b-container>
</template>

<script>
import {computed} from "@vue/composition-api";

import Button from "@/components/BaseButton";

import userProducts from "@/compositions/useProducts";
import useRoute from "@/compositions/useRoute";
import useCart from "@/compositions/useCart";

export default {
  name: "Cart",
  components: {
    Button
  },
  setup(props, context) {
    const {products} = userProducts(props, context)
    const routeForm = useRoute('form', props, context)
    const {removeFromCart, getCart} = useCart()

    console.log(products)

    let cart = getCart()

    const cartItems = computed(() => getItems(cart))
    const anyItem = computed(() => cart.length)
    const totalProductsPrice = computed(cart.reduce((a, b) => {return typeof getItem(a) === "undefined" ? (a + getItem(b).price) : (getItem(a).price + getItem(b).price)}))

    function getItems(items) {
      return products.filter(item => {
        return items.includes(item.id);
      })
    }

    function getItem(item) {
      return products.find(el => el.id === item)
    }

    function totalProductCount(item) {
      return getCart.filter(el => el === item.id).length
    }

    function totalProductPrice(item) {
      return totalProductCount(item) * item.price
    }

    return {
      products,
      routeForm,
      removeFromCart,
      getCart,
      cartItems,
      anyItem,
      totalProductsPrice,
      getItem,
      totalProductCount,
      totalProductPrice
    }
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