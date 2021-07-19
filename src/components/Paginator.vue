<template>
  <b-container>
    <b-row v-for="item in filteredSourceItems" v-bind:key="item.id" v-on:click="route(item)">
      <component v-bind:is="component" v-bind:navigate="navigate" v-bind:data="item"></component>
    </b-row>
    <b-row>
      <ul class="paginator">
        <li class="border-radius shadow color-dark first" v-on:click="loadPage(1)">Pierwszy</li>
        <li class="border-radius shadow color-dark" v-for="page in getPageNumbers" v-bind:key="page" v-on:click="loadPage(page)">
          {{ page }}
        </li>
        <li class="border-radius shadow color-dark last" v-on:click="loadPage(getPageNumbers)">Ostatni</li>
      </ul>
    </b-row>
  </b-container>
</template>

<script>

import ProductPreview from "@/components/ProductPreview";

export default {
  name: "Paginator",
  props: ['component', 'sourceItems', 'navigate', 'fallback'],
  methods: {
    route: function(product) {
      this.fallback(product)
      this.navigate("product")
    },
    loadPage: function(page) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      this.currentPage = (page - 1)
    }
  },
  components: {
    ProductPreview
  },
  data() {
    return {
      perPage: 5,
      currentPage: 0
    }
  },
  computed: {
    getCurrentPage: function() {
      return this.currentPage
    },
    getCurrentRange: function() {
      return (this.perPage * this.currentPage + this.perPage) > this.sourceItems.length ? this.sourceItems.length : (this.perPage * this.currentPage + this.perPage)
    },
    getPageNumbers: function() {
      let additionalPage = this.sourceItems.length % this.perPage > 0 ? 1 : 0
      return parseInt(this.sourceItems.length / this.perPage) + additionalPage
    },
    filteredSourceItems: function() {
      return this.sourceItems.filter((item, key) => {
        return key >= this.perPage * this.getCurrentPage && key < this.getCurrentRange
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .paginator {
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;

    li {
      list-style: none;
      margin: 0;
      padding: 0;
      height: 50px;
      border: 1px solid $dark-color;
      margin-right: 10px;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s background-color ease-in-out;
      cursor: pointer;

      &:hover {
        background-color: $light-color;
      }

      &.first, &.last {
        width: 100px;
      }
    }
  }
</style>