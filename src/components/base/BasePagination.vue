<template>
  <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a href="#" aria-label="Предыдущая страница"
          class="pagination__link pagination__link--arrow"
          :class="disableClassArrow(1)"
          @click.prevent="priviousPage()"
        >
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>
      <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
        <a href="#" class="pagination__link" :class="disablePageLink(pageNumber)" @click.prevent="paginate(pageNumber)">
          {{ pageNumber }}
        </a>
      </li>
      <li class="pagination__item">
        <a href="#" aria-label="Следующая страница"
          class="pagination__link pagination__link--arrow"
          :class="disableClassArrow(pages)"
          @click.prevent="nextPage()"
        >
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
    </ul>
</template>

<script>
export default {
  model: {
    prop: 'pageCurrent',
    event: 'paginate',
  }, // model
  props: ['pageCurrent', 'count', 'perPage'],
  methods: {
    isCurrent(pageNumber) {
      return this.pageCurrent === pageNumber;
    },
    disablePageLink(pageNumber) {
      return {
        'pagination__link--current': this.isCurrent(pageNumber),
        'pagination__link--disabled': this.isCurrent(pageNumber),
      };
    },
    disableClassArrow(stopPage) {
      return {
        'pagination__link--disabled': this.pageCurrent === stopPage,
      };
    },
    priviousPage() {
      if (this.pageCurrent > 1) {
        this.paginate(this.pageCurrent - 1)
      }
    },
    nextPage() {
      if (this.pageCurrent < this.pages) {
        this.paginate(this.pageCurrent + 1)
      }
    },
    paginate(pageCurrent) {
      this.$emit('paginate', pageCurrent);
    },
  }, // methods
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  }, // computed
};

</script>
