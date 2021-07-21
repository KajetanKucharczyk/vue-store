<template>
  <router-link v-bind:to="{name: 'product', params: {id: data.id, route: 'products-details'}}">
    <div class="product border-radius shadow color-dark">
    <b-container>
      <b-row>
        <b-col cols="12" md="4">
          <img class="product__image border-radius shadow" v-bind:src="_imageParser(data)" v-bind:alt="data.image.alt" />
        </b-col>
        <b-col cols="12" md="8">
          <b-container>
            <b-row class="product__header">
              <b-col>
                <h2>{{data.name}}</h2>
              </b-col>
            </b-row>
            <b-row>
              <h4>{{data.shortDesc | shortenDesc(this.previewDescWordCount)}}</h4>
            </b-row>
            <b-row class="product__price">
              <p>{{data.price | formatPrice}}</p>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "ProductPreview",
  props: ['data'],
  methods: {
    _imageParser: function(product) {
      return product.image.src
    }
  },
  data() {
    return {
      previewDescWordCount: 25
    }
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
    },
    shortenDesc: function(shortDesc, descLength) {
      let newWord = ""
      shortDesc.split(" ").forEach((word, key) => {
        if(key < descLength)
          newWord += (word + " ")
      })

      return shortDesc.split('').length <= newWord ? shortDesc : newWord.trimEnd() + "..."
    }
  },
}
</script>

<style scoped lang="scss">
.product {
  position: relative;
  margin: 20px;
  border: 1px solid $dark-color;
  transition: 0.2s background-color ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: $light-color;
  }

  &__header {
    padding: 50px 0px 50px 0px;
  }
  &__image {
    width: 100%;
    position: sticky;
    top: 100px;
    margin: 10px 0px;
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