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
          <h2>{{ product.name }}</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col
            cols="12"
            md="4"
        >
          <div class="product__image-container">
            <img
                class="product__image border-radius custom-shadow"
                v-bind:src="product.image.src"
                v-bind:alt="product.image.alt"
            />
            <BaseButton
                class="product__back-button"
                v-bind:clickFunction="() => $router.push({name: 'products'}).catch(() => {})"
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
                {{ product.shortDesc }}
              </h4>
            </b-row>
            <b-row class="product__desc">
              <p>
                {{ product.desc }}
              </p>
            </b-row>
            <b-row class="product__price">
              <p>
                {{ product.price | formatPrice }}
              </p>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>

    <BaseButton
        v-bind:clickFunction="() => addToCart(product.id)"
        v-bind:updateVisible="() => canAddToCart(product)"
    >

      <span v-if="lastPieces">
        Ostatnie sztuki (zostało {{countAvailableItems}})
      </span>

      <span v-else-if="lastPiece">
        Ostatnia sztuka
      </span>

      <span v-else-if="empty">
        Brak wystarczającej ilośći produktów na stanie
      </span>

      <span v-else>
        Dodaj do koszyka (zostało {{countAvailableItems}})
      </span>

    </BaseButton>

  </div>
</template>

<script>

import BaseButton from "@/components/BaseButton";

export default {
  name: 'ProductDetails',
  components: {
    BaseButton
  },
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
  computed: {
    lastPieces: function() {
      return this.availableItems(this.product) === 2
    },
    
    lastPiece: function() {
      return this.availableItems(this.product) === 1
    },
    
    empty: function() {
      return this.availableItems(this.product) === 0
    },
    
    countAvailableItems: function() {
      return this.availableItems(this.product);
    },
    
    product: function() {
      return this.products.find(el => el.id === parseInt(this.$route.params.id))
    },
  },
  created() {
    document.title = this.product.name
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