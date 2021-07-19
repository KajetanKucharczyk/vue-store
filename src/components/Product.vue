<template>
  <div class="product color-dark">
    <b-container>
      <b-row class="product__header">
        <b-col cols="12" md="4">
        </b-col>
        <b-col cols="12" md="8">
          <h2>{{productData.name}}</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="4">
          <div class="product__image-container">
            <img class="product__image border-radius shadow" v-bind:src="_imageParser(productData)" v-bind:alt="productData.image.alt" />
            <Button class="product__back-button" v-bind:clickFunction="routeHome">
              Powrót
            </Button>
          </div>
        </b-col>
        <b-col cols="12" md="8">
          <b-container>
            <b-row class="product__short-desc">
              <h4>{{productData.shortDesc}}</h4>
            </b-row>
            <b-row class="product__desc">
              <p>{{productData.desc}}</p>
            </b-row>
            <b-row class="product__price">
              <p>{{productData.price | formatPrice}}</p>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
    <Button v-bind:clickFunction="() => addToCart(productData.id)" v-bind:updateVisible="() => canAddToCart(productData)">
      <span v-if="_lastPieces">Ostatnie sztuki (zostało {{_countAvailableItems}})</span>
      <span v-else-if="_lastPiece">Ostatnia sztuka</span>
      <span v-else-if="_empty">Brak wystarczającej ilośći produktów na stanie</span>
      <span v-else>Dodaj do koszyka (zostało {{_countAvailableItems}})</span>
    </Button>
  </div>

</template>

<script>

import Button from "@/components/Button";

export default {
  name: 'Product',
  props: ['productData', 'addToCart', 'canAddToCart', 'availableItems', 'navigate'],
  components: {
    Button
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
      return this.availableItems(this.productData) === 2
    },
    _lastPiece: function() {
      return this.availableItems(this.productData) === 1
    },
    _empty: function() {
      return this.availableItems(this.productData) === 0
    },
    _countAvailableItems: function() {
      return this.availableItems(this.productData);
    }
  },
  methods: {
    _imageParser: function(product) {
      return product.image.src
    },
    routeHome: function() {
      this.navigate('home')
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