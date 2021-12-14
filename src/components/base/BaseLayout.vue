<template>
  <div id="app">

    <header>
      <BaseHeader>
        <template v-slot:siteName>
          {{siteName}}
        </template>
      </BaseHeader>
    </header>

    <slot name="content"></slot>

    <footer>
      <BaseFooter />
    </footer>

  </div>
</template>

<script>

import BaseHeader from '@/components/base/BaseHeader.vue'
import BaseFooter from "@/components/base/BaseFooter"

export default {
  name: 'BaseLayout',
  components: {
    BaseHeader,
    BaseFooter,
  },
  data () {
    return {
      siteName: "SKLEPik"
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;

  header {
    position: sticky;
    top:0px;
    z-index: 1;
  }
}
</style>
