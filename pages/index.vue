<template>
  <div class="vh-100-ns flex flex-column bg-dark-gray assistant relative">
    <MenuHeader class="z-10" :menu-fixed="true" />
    <!-- Slider div container -->
    <div ref="container" class="swiper-container h-100 w-100">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <swiper-slide>
          <div
            class="flex items-center absolute w-100 h-100 white"
            style="
              background-image: url(gifs/opening-deepfakes.gif);
              background-position: center;
              background-size: cover;
            "
          >
            <article class="measure ml6-ns ph3">
              <h1 class="day-sans f1-ns f3 lh-title">
                What's Your Take On Deepfakes? Artificial Intelligence Gets
                "Real"
              </h1>
              <!-- <h3 class="roboto-mono fw3 f3-ns f4 lh-title">
                Five Social Media Moves That Helped And Hurt #BlackLivesMatter
              </h3> -->
              <h4 class="assistant normal">By Zoe Harwood</h4>
              <h4 class="assistant normal">11.25.20</h4>
            </article>
          </div>
        </swiper-slide>
        <swiper-slide>
          <article class="ph3 white flex-ns flex-wrap justify-center">
            <div
              class="measure lh-copy center"
              v-html="articleData.intro.text"
            ></div>
            <div class="center measure pl4-ns">
              <p></p>
              <video class="db w-100" autoplay loop muted playsinlines>
                <source :src="`${articleData.intro.image}.webm`" />
                <source :src="`${articleData.intro.image}.mp4`" />
                <img class="db w-100" :src="`${articleData.intro.image}.gif`" />
              </video>
            </div>
          </article>
        </swiper-slide>
        <template v-for="(scenario, i) in scenarios">
          <scenario-question
            :key="`scenario-prompt-${i}`"
            :scenario="scenario"
          ></scenario-question>
        </template>
        <swiper-slide>
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
          <article class="ph3 white">
            <h3 class="roboto-mono fw6 f3-ns f4 lh-title">CREDITS</h3>
            <dl class="f6 lh-title mv2">
              <dt class="dib b green">Writer</dt>
              <dd class="dib ml0">Zoe Harwood</dd>
            </dl>
            <dl class="f6 lh-title mv2">
              <dt class="dib b green">Editors</dt>
              <dd class="dib ml0">Marjerrie Masicat, Lissa Soep</dd>
            </dl>
            <dl class="f6 lh-title mv2">
              <dt class="dib b green">Producers</dt>
              <dd class="dib ml0">
                Victoria Balla, Zoe Harwood, Dante Ruberto, Ariel Tang, Nimah
                Gobir, Devin Glover
              </dd>
            </dl>
            <dl class="f6 lh-title mv2">
              <dt class="dib b green">Designer</dt>
              <dd class="dib ml0">Marjerrie Masicat</dd>
            </dl>
            <dl class="f6 lh-title mv2">
              <dt class="dib b green">Developer</dt>
              <dd class="dib ml0">Radamés Ajna</dd>
            </dl>
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
    resizeFn() {
      if (window.innerWidth > 800) {
        this.swiper = new Swiper(this.$refs.container, {
          loop: false,
          keyboard: {
            enabled: true,
            onlyInViewport: false,
          },
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

@media screen and (min-width: 800px) {
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
</style>
