<template>
  <router-link
      class="product border-radius custom-shadow color-dark"
      v-bind:to="{
        name: 'product',
        params: {
          id: data.id,
          route: 'products-details'
        }
      }"
  >
    <b-container>
      <b-row>
        <b-col
            cols="12"
            md="4"
        >
          <img
              class="product__image border-radius custom-shadow"
              v-bind:src="data.image.src"
              v-bind:alt="data.image.alt"
          />
        </b-col>
        <b-col
            cols="12"
            md="8"
        >
          <b-container>
            <b-row class="product__header">
              <b-col>
                <h2>
                  {{data.name}}
                </h2>
              </b-col>
            </b-row>
            <b-row>
              <h4>
                {{data.shortDesc | shortenDesc(this.previewDescWordCount)}}
              </h4>
            </b-row>
            <b-row class="product__price">
              <p>
                {{data.price | formatPrice}}
              </p>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </router-link>
</template>

<script>
export default {
  name: "Product",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      previewDescWordCount: 25
    }
  },
  filters: {
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
  transition: 0.2s transform ease-in-out, 0.2s box-shadow ease-in-out;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: $hover-shadow;
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