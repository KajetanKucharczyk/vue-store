<template>
  <div>
    <b-container v-if="buttonsVisibility.sort || buttonsVisibility.perPage">
      <b-row>
        <b-col>
          <b-form-select
              v-if="buttonsVisibility.sort"
              class="sort-select border-radius custom-shadow color-dark custom-select"
              v-model="currentSortType"
              v-bind:options="sortOptions"
          />
          <b-form-select
              v-if="buttonsVisibility.perPage"
              class="per-page-select border-radius custom-shadow color-dark custom-select"
              v-model="perPage"
              v-bind:options="perPageOptions"
          />
        </b-col>
      </b-row>
    </b-container>
    <b-container>
      <b-row
          v-for="data in filteredSourceItems"
          v-bind:key="data.id"
          v-on:click="route(data)"
      >
        <component
            v-bind:is="component"
            v-bind="{data}"
        />
      </b-row>
      <b-row v-if="buttonsVisibility.pagination && getPageNumbers > 1">
        <ul class="paginator">
          <li
              v-if="buttonsVisibility.prev"
              class="border-radius custom-shadow color-dark first"
              v-on:click="loadPage(1)"
          >
            Pierwszy
          </li>
          <li
              class="border-radius custom-shadow color-dark"
              v-for="page in getPageNumbers"
              v-bind:key="page"
              v-on:click="loadPage(page)"
          >
            {{ page }}
          </li>
          <li
              v-if="buttonsVisibility.next"
              class="border-radius custom-shadow color-dark last"
              v-on:click="loadPage(getPageNumbers)"
          >
            Ostatni
          </li>
        </ul>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import Product from "@/components/Product";

export default {
  name: "BasePaginator",

  props: {
    component: {
      type: String,
      required: true
    },

    sourceItems: {
      type: Array,
      required: true
    },

    fallback: {
      type: Function,
      default: () => false
    },

    disableSort: {
      type: Boolean,
      default: () => false
    },

    disablePerPage: {
      type: Boolean,
      default: () => false
    },

    disablePagination: {
      type: Boolean,
      default: () => false
    },

    sortDefault: {
      type: String,
      default: () => 'id-asc'
    },

    sort: {
      type: Array,
      default: () => []
    },

    defaultPerPage: {
      type: Number,
      default: () => 5
    }
  },
  methods: {
    route: function(product) {
      this.fallback(product)
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
    Product
  },
  data() {
    return {
      perPage: this.defaultPerPage,
      currentPage: 0,
      currentSortType: this.sortDefault,
    }
  },
  computed: {
    getCurrentPage: function() {
      return this.currentPage
    },

    getCurrentRange: function() {
      return (this.perPage * this.currentPage + this.perPage) > this.sourceItems.length ? this.sourceItems.length : (this.perPage * this.currentPage + this.perPage)
    },

    addPage: function() {
      return this.sourceItems.length % this.perPage > 0 ? 1 : 0
    },

    getPageNumbers: function() {
      let pageCount = parseInt(this.sourceItems.length / this.perPage) + this.addPage
      return pageCount > 1 ? pageCount : 0
    },

    sortOptions: function() {
      let _sortOptions = []
      this.sort.map((a) => {
        _sortOptions.push({
          value: a.field + "-asc",
          text: a.textAsc
        })
        _sortOptions.push({
          value: a.field + "-desc",
          text: a.textDesc
        })
      })
      return _sortOptions
    },

    perPageOptions: () => {
      let values = [5, 10, 100]
      return values.map(el => {
          return {
            value: el,
            text: el.toString()
          }
      })
    },

    filteredSourceItems: function() {
      let compare;
      this.sort.forEach(el => {
        if(this.currentSortType.indexOf('-asc') !== -1) {
          if((el.field + '-asc') === this.currentSortType) {
            compare = function (a, b) {
              if (a[el.field] < b[el.field]) return -1
              if (b[el.field] < a[el.field]) return 1
              return 0
            }
          }
        } else if(this.currentSortType.indexOf('-desc') !== -1) {
          if((el.field + '-desc') === this.currentSortType) {
            compare = function (a, b) {
              if (a[el.field] > b[el.field]) return -1
              if (b[el.field] > a[el.field]) return 1
              return 0
            }
          }
        }
      })

      let filteredItems = this.sourceItems.slice().sort(compare).filter((item, key) => {
        return key >= this.perPage * this.getCurrentPage && key < this.getCurrentRange
      })

      filteredItems = filteredItems.map((el, key) => {
        el.key = key
        return el
      })

      return filteredItems
    },

    buttonsVisibility: function() {
      return {
        sort: !this.disableSort && this.sort.length,
        perPage: !this.disablePerPage,
        pagination: !this.disablePagination,
        prev: !(this.getCurrentPage === 0),
        next: !(this.getCurrentPage === (this.getPageNumbers - 1))
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .sort-select, .per-page-select {
    width: 100%;
    max-width: 300px;
    height: 50px;
    margin-top: 25px;
    margin-left: 5px;
    text-align-last: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
    cursor: pointer;

    &::-ms-expand {
      display: none;
    }
  }

  .per-page-select {
    max-width: 75px;
    text-align: center;
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