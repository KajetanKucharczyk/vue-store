<template>
  <div class="product color-dark">
    <b-container>
      <b-row class="product__header">
        <b-col
            cols="12"
            md="4"
        >
        </b-col>
        <b-col
            cols="12"
            md="8"
        >
          <h2>{{products[this.$route.params.id].name}}</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col
            cols="12"
            md="4"
        >
          <div class="product__image-container">
            <img
                class="product__image border-radius shadow"
                v-bind:src="_imageParser(products[this.$route.params.id])"
                v-bind:alt="products[this.$route.params.id].image.alt"
            />
            <BaseButton
                class="product__back-button"
                v-bind:clickFunction="routeHome"
            >
              Powrót
            </BaseButton>
          </div>
        </b-col>
        <b-col
            cols="12"
            md="8"
        >
          <b-container>
            <b-row class="product__short-desc">
              <h4>
                {{products[this.$route.params.id].shortDesc}}
              </h4>
            </b-row>
            <b-row class="product__desc">
              <p>
                {{products[this.$route.params.id].desc}}
              </p>
            </b-row>
            <b-row class="product__price">
              <p>
                {{products[this.$route.params.id].price | formatPrice}}
              </p>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>

    <BaseButton
        v-bind:clickFunction="() => addToCart(products[this.$route.params.id].id)"
        v-bind:updateVisible="() => canAddToCart(products[this.$route.params.id])"
    >

      <span v-if="_lastPieces">
        Ostatnie sztuki (zostało {{_countAvailableItems}})
      </span>

      <span v-else-if="_lastPiece">
        Ostatnia sztuka
      </span>

      <span v-else-if="_empty">
        Brak wystarczającej ilośći produktów na stanie
      </span>

      <span v-else>
        Dodaj do koszyka (zostało {{_countAvailableItems}})
      </span>

    </BaseButton>

  </div>
</template>

<script>

import BaseButton from "@/components/BaseButton";

export default {
  name: 'ProductDetails',
  props: {
    products: {
      type: Array,
      required: true
    },
    addToCart: {
      type: Function,
      required: true
    },
    canAddToCart: {
      type: Function,
      required: true
    },
    availableItems: {
      type: Function,
      required: true
    }
  },
  components: {
    BaseButton
  },
  filters: {
    formatPrice: function(price) {

      let aPrice = (100 * price).toFixed(0).split("").reverse();
      let aString = ""

      aPrice.forEach((element, key) => {
        aString += element
        if(key == 1)                      aString += ","
        if(key > 1 && (key + 2) % 3 == 0) aString += " "
      })

      return aString.split("").reverse().join('') + " zł";
    }
  },
  computed: {
    _lastPieces: function() {
      return this.availableItems(this.products[this.$route.params.id]) === 2
    },
    _lastPiece: function() {
      return this.availableItems(this.products[this.$route.params.id]) === 1
    },
    _empty: function() {
      return this.availableItems(this.products[this.$route.params.id]) === 0
    },
    _countAvailableItems: function() {
      return this.availableItems(this.products[this.$route.params.id]);
    }
  },
  methods: {
    _imageParser: function(product) {
      return product.image.src
    },
    routeHome: function() {
      this.$router.push({
        name: 'products'
      });
    }
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
  &__price {
    margin: 50px 0px;
    padding: 0px;
    font-size: 1.5rem;

    p {
      padding: 0px;
      margin: 0px;
    }
  }
}
</style>