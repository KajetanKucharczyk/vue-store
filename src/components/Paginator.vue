<template>
  <div>
    <b-container>
      <b-row>
        <b-col>
          <b-form-select class="sort-select border-radius shadow color-dark" v-model="sortType" v-bind:options="sortOptions"></b-form-select>
        </b-col>
      </b-row>
    </b-container>
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
  </div>
</template>

<script>

import ProductPreview from "@/components/ProductPreview";

export default {
  name: "Paginator",
  props: {
    component: {
      type: String,
      required: true
    },
    sourceItems: {
      type: Array,
      required: true
    },
    navigate: {
      type: Function,
      required: true
    },
    fallback: {
      type: Function,
      default: function() {
        return false
      }
    }
  },
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
      currentPage: 0,
      sortType: 'alpha-asc',
      sortOptions: [
        { value: 'alpha-asc', text: 'Alfabetycznie rosnąco' },
        { value: 'alpha-desc', text: 'Alfabetycznie malejąco' },
        { value: 'index-asc', text: 'Indeks rosnąco' },
        { value: 'index-desc', text: 'Indeks malejąco' },
      ]
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

      let compare;

      switch (this.sortType) {
        case "alpha-asc":
          compare = function(a, b) {
            if(a.name < b.name)
              return -1
            if(b.name < a.name)
              return 1
            return 0
          }
        break;
        case "alpha-desc":
          compare = function(a, b) {
            if(a.name > b.name)
              return -1
            if(b.name > a.name)
              return 1
            return 0
          }
          break;
        case "index-asc":
          compare = function(a, b) {
            if(a.id < b.id)
              return -1
            if(b.id < a.id)
              return 1
            return 0
          }
          break;
        case "index-desc":
          compare = function(a, b) {
            if(a.id > b.id)
              return -1
            if(b.id > a.id)
              return 1
            return 0
          }
          break;
      }

      return this.sourceItems.slice().sort(compare).filter((item, key) => {
        return key >= this.perPage * this.getCurrentPage && key < this.getCurrentRange
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .sort-select {
    width: 100%;
    max-width: 300px;
    height: 50px;
    margin-top: 25px;
    margin-left: 5px;
    padding-left: 20px;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';

    &::-ms-expand {
      display: none;
    }
  }

  .paginator {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    margin: 0 0 30px;

    li {
      list-style: none;
      padding: 0;
      height: 50px;
      border: 1px solid $dark-color;
      margin: 0 10px 0 0;
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