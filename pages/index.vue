<template>
  <div class="vh-100-ns flex flex-column bg-dark-gray assistant relative">
    <MenuHeader class="z-10" :menu-fixed="true" />
    <!-- Slider div container -->
    <div ref="container" class="swiper-container h-100 w-100">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <swiper-slide>
          <div class="flex items-center absolute w-100 h-100 white items-end">
            <div class="absolute w-100 h-100 z--1 op o-50">
              <video
                class="db w-100"
                autoplay
                loop
                muted
                playsinline
                poster="gifs/open.jpg"
                defaultMuted
              >
                <source src="gifs/open.mp4" type="video/mp4" />
                <source src="gifs/open.webp" type="video/webp" />
              </video>
            </div>
            <article class="measure ml6-ns ph3 relative center tc">
              <h1 class="day-sans f1-ns f3 lh-title">Doing a Double Take</h1>
              <h3 class="roboto-mono fw3 f3-ns f4 lh-title">
                Four Deepfake Scenarios That Mess With Our Minds
              </h3>
              <h4 class="assistant normal">By Zoe Harwood</h4>
              <h4 class="assistant normal">12.02.20</h4>
            </article>
            <small class="absolute left-1 bottom-1 o-20"
              >Photo by Youtube / Matthias Niessner</small
            >
          </div>
        </swiper-slide>
        <swiper-slide>
          <article class="ph3 white flex-ns flex-wrap justify-center h-auto">
            <div
              class="measure lh-copy center"
              v-html="articleData.intro.text"
            ></div>
            <div class="center flex items-center h-auto measure ph3-ns">
              <div>
                <video
                  class="db w-100"
                  autoplay
                  loop
                  muted
                  playsinline
                  :poster="`${articleData.intro.image}.jpg`"
                >
                  <source
                    :src="`${articleData.intro.image}.webp`"
                    type="video/webp"
                  />
                  <source
                    :src="`${articleData.intro.image}.mp4`"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </article>
        </swiper-slide>
        <template v-for="(scenario, i) in scenarios">
          <scenario-question
            ref="scenarios"
            :key="`scenario-prompt-${i}`"
            :scenario="scenario"
            :next="(i + 1) % scenarios.length"
            @next-page="nextPage"
          ></scenario-question>
        </template>
        <swiper-slide ref="conclusion">
          <article class="measure lh-copy ph3 white">
            <div v-html="articleData.conclusion.text"></div>
            <ShareContainer
              :title="postData.title"
              :description="postData.description"
              :tweet-message="postData.tweetMessage"
              :vertical-mode="false"
            />
          </article>
        </swiper-slide>
        <swiper-slide>
          <article class="white measure ml6-ns ph3 relative center lh-copy">
            <h3 class="roboto-mono fw6 f3-ns f4 lh-title">CREDITS</h3>
            <div v-html="articleData.credits.text"></div>

            <template v-for="credit in articleData.credits.list">
              <dl :key="credit.ttitle" class="lh-title mv2">
                <dt class="dib b green">{{ credit.title }}:</dt>
                <dd class="di ml0">{{ credit.names }}</dd>
              </dl>
            </template>
          </article>
        </swiper-slide>
      </div>
      <!-- If we need pagination -->
      <div ref="pagination" class="swiper-pagination" />

      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev" />
      <div class="swiper-button-next" />

      <!-- If we need scrollbar -->
      <div class="swiper-scrollbar" />
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import scrollIntoView from 'scroll-into-view-if-needed'
import CommonUtils from '../mixins/CommonUtils'
import POSTCONFIG from '../post.config'
import MenuHeader from '~/components/Header/MenuHeader'
import ShareContainer from '~/components/Custom/ShareContainer'
import SwiperSlide from '~/components/Custom/SwiperSlide'
import ScenarioQuestion from '~/components/Custom/ScenarioQuestion'

import ArticleData from '~/data/data.json'

export default {
  components: {
    MenuHeader,
    ShareContainer,
    SwiperSlide,
    ScenarioQuestion,
  },
  mixins: [CommonUtils],
  asyncData(ctx) {
    return {
      postData: POSTCONFIG,
      articleData: ArticleData.content[0],
      scenarios: ArticleData.content[0].scenarios,
    }
  },
  data() {
    return {
      swiper: null,
    }
  },
  computed: {},
  watch: {},
  mounted() {
    window.addEventListener('resize', this.resizeFn)
    this.resizeFn()
  },
  methods: {
    nextPage(next) {
      const el = next
        ? this.$refs.scenarios[next].$el
        : this.$refs.conclusion.$el

      if (window.innerWidth > 800 && window.innerHeight > 640) {
        this.swiper.slideNext()
        return
      }
      scrollIntoView(el, {
        block: 'end',
        behavior: 'smooth',
      })
    },
    resizeFn() {
      if (window.innerWidth > 800 && window.innerHeight > 640) {
        this.swiper = new Swiper(this.$refs.container, {
          loop: false,
          keyboard: {
            enabled: true,
            onlyInViewport: false,
          },
          threshold: 5,
          mousewheel: {
            eventsTarget: document.body,
            sensitivity: 1,
            releaseOnEdges: true,
          },
          direction: 'vertical',

          pagination: {
            el: this.$refs.pagination,
            clickable: true,
            renderBullet(index, className) {
              return `<span class="${className}"></span>`
            },
          },
        })
      } else {
        this.swiper = null
      }
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/css/styles';

@media screen and (min-height: 641px) and (min-width: 800px) {
  @import '~@/node_modules/swiper/swiper';
  .swiper-pagination {
    position: absolute;
    display: flex;
    flex-direction: column;
    z-index: 1;
    bottom: 0;
    right: 0;
    padding: 0.5rem;
  }
  .swiper-pagination-bullet {
    background-color: rgba(white, 0.2);
    height: 10px;
    width: 10px;
    border-radius: 99999px;
    display: inline-block;
    margin: 0.1rem;
    cursor: pointer;
  }

  .swiper-pagination-bullet-active {
    background-color: rgba(white, 0.9);
  }
}
.disable-mouse {
  pointer-events: none;
}
.swiper-slide {
  // min-height: 100vh;
}
video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
button {
  font-family: $assistant;
}
</style>
