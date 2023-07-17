<template>
  <section class="products q-pt-xl container">
    <div class="category_wrapper">
      <div class="left">
        <div class="section">
          <div class="section_main_text">
            <!-- {{ thiscategory.category }} -->
            Shorts
            <span class="count">| {{ videos.length }}</span>
          </div>

          <div class="each_category_wrap">
            <div
              v-for="(each, index) in thiscategory.subcategories"
              :key="index"
              class="each_category"
            >
              <q-item
                :to="{ name: 'subcategory-page', params: { slug: each.slug } }"
              >
                {{ each.name }}
              </q-item>
              <!-- <span class="count"> | {{ each.count }} </span> -->
            </div>
          </div>
        </div>
      </div>

      <div class="righ">
        <div class="search_text_wrap q-pb-lg row justify-end items-center">
          <!-- <q-btn
            dense
            v-if="!$q.screen.gt.xs"
            unelevated
            label="Filter"
            color="secondary"
            no-caps
            icon="chevron_left"
            @click="drawer = !drawer"
          /> -->

          <div class="sort row items-center">
            <span class="sort_by q-mr-sm">Sort By:</span
            ><q-select
              class="text-secondary"
              v-model="modelSort"
              :options="optionsSort"
            />
          </div>
        </div>
        <div v-if="videos.length" class="product_cards">
          <div id="container">
            <div
              v-for="(video, index) in videos"
              :key="index"
              ref="videoRefs"
              class="short-video"
            >
              <video
                controls
                :id="'video' + index"
                :autoplay="index === 0"
                muted
                @ended="videoEnded(index)"
                :src="video.media.url"
                class="video"
              ></video>
            </div>
          </div>
        </div>

        <div v-else>No shorts at this time</div>
      </div>
    </div>

    <q-drawer
      v-model="drawer"
      :width="280"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'white'"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list class="q-px-md q-py-xl" padding>
          <div class="left">
            <div class="section">
              <div class="section_main_text">
                Shorts
                <span class="count">| {{ videos.length }}</span>
              </div>

              <div class="each_category_wrap">
                <div
                  v-for="(each, index) in thiscategory.subcategories"
                  :key="index"
                  class="each_category"
                >
                  <q-item
                    :to="{
                      name: 'subcategory-page',
                      params: { slug: each.slug },
                    }"
                  >
                    {{ each.name }}
                  </q-item>
                </div>
              </div>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </section>

  <FooterVue class="q-mt-xl" />
</template>

<script>
import FooterVue from "src/components/Footer.vue";
import { defineComponent, ref } from "vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
// Default theme
import "@splidejs/vue-splide/css";
// or only core styles
import "@splidejs/vue-splide/css/core";
export default defineComponent({
  name: "IndexPage",
  setup() {
    const miniState = ref(false);
    return {
      ratingModel: ref(4),
      miniState,
      drawer: ref(false),

      drawerClick(e) {
        if (miniState.value) {
          miniState.value = false;

          e.stopPropagation();
        }
      },
    };
  },
  components: {
    FooterVue,
    Splide,
    SplideSlide,
  },
  data() {
    return {
      products: [],
      videos: [],
      currentVideoIndex: 0,
      thiscategory: [],
      error: {},
      options: [
        "Lagos, Nigeria",
        "Enugu, Nigeria",
        "Ebonyi, Nigeria",
        "Abuja, Nigeria",
        "Akwa Ibom, Nigeria",
        "Delta, Nigeria",
      ],
      optionsSort: [
        "none",
        "Lowest Price - Highest Price",
        "Highest Price - Lowest Price",
      ],
      group: ref("All"),
      pricegroup: ref("All"),
      optionsG: [
        { label: "All", value: "All" },
        { label: "Brand New", value: "Brand New" },
        { label: "Used", value: "Used" },
      ],
      priceOptions: [
        { label: "All", value: "All" },
        { label: "₦2,000 - ₦5,000", value: "2000 - 5000" },
        { label: "₦5,000 - ₦10,000", value: "5000 - 10000" },
        { label: "₦10,000 - ₦20,000", value: "10000 - 20000" },
        { label: "₦20,000 - ₦50,000", value: "20000 - 50000" },
        {
          label: "₦50,000 - ₦100,000",
          value: "59000 - 100000",
        },
      ],

      model: "",
      modelAreas: "",
      modelSort: "none",
      selectedLocation: "",
      showState: true,
      val: false,
      observer: null,
      videoWrappers: [],
      ratingModel: ref(3),
      currentVideoIndex: 0,
    };
  },

  created() {
    this.getVideos();
    // this.getsubCategoryProducts();
  },

  watch: {
    videos: {
      immediate: true,
      handler(newVideos) {
        if (newVideos.length > 0) {
          this.$nextTick(() => {
            this.observeVideos();
          });
        }
      },
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.observeVideos();
    });
  },
  methods: {
    getVideos() {
      this.$api
        .get(`index/videos/all`)
        .then((response) => {
          console.log(response);
          this.videos = response.data.data;
        })
        .catch((e) => {
          this.loading = false;
          // this.errors = error.errors || {};
        });
    },

    observeVideos() {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target.querySelector("video");
            const index = parseInt(video.id.replace("video", ""), 10);
            // console.log(this.currentVideoIndex);
            // console.log(index);
            // console.log(entry.isIntersecting);
            // console.log(video.paused);
            if (entry.isIntersecting && video.paused) {
              console.log("paused");
              this.currentVideoIndex = index;
            }
            if (entry.isIntersecting) {
              // this.currentVideoIndex++;
              if (index === this.currentVideoIndex) {
                video.play();
              } else {
                video.pause();
              }
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.5 }
      );

      this.$nextTick(() => {
        // console.log(this.$refs);
        if (this.$refs.videoRefs) {
          this.$refs.videoRefs.forEach((video) => {
            this.observer.observe(video);
          });
        }
      });
    },

    videoEnded(index) {
      // console.log(this.currentVideoIndex);
      // console.log(index);
      if (index === this.currentVideoIndex) {
        this.currentVideoIndex =
          (this.currentVideoIndex + 1) % this.videos.length;
        this.scrollToVideo(this.currentVideoIndex);
      }
    },
    scrollToVideo(index) {
      // console.log(index);
      const videoElement = this.$refs["videoRefs"][index];

      if (videoElement && index < this.$refs["videoRefs"].length) {
        videoElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        // window.scrollBy(0, -offset);
      } else if (index === this.$refs["videoRefs"].length) {
        this.$refs["videoRefs"][0];
      }
    },
  },
});
</script>

<style scoped>
p {
  margin-bottom: 5px;
}

.video-wrapper {
  width: 100%;
  margin: 1rem 0;
  height: 90vh;
}

.video {
  width: 100%;
  max-width: 450px;
  height: 100%;
  object-fit: cover;
}
#container {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  /* height: 100vh; */
  scroll-snap-type: y mandatory;
}

/* Style each short video */
.short-video {
  flex: 0 0 75vh;
  /* max-width: 500px; */
  /* margin: 1rem auto; */
  margin: 1rem 0;
  margin-right: auto;
  /* margin-left: auto; */
  max-height: 80vh;
  width: 100%;
  scroll-snap-align: center;
}

.wrapper {
  text-align: center;
  width: 55%;
}

.wrapper .main_text {
  font-weight: 700;
  font-size: 48px;
  line-height: 58px;
  color: #ffffff;
}

.wrapper p {
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  margin-bottom: 0.8rem;
  color: #ffffff;
}

.wrapper input {
  padding: 0 1rem;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #9a9a9a;
  background: white;
  border-radius: 10px 0 0 10px;
  height: 59.63px;
  width: 799px;
  border: none;
}

.wrapper input::placeholder {
  font-family: "Montserrat", sans-serif;
}
.wrapper button {
  height: 59.63px;
  background: #ee4e36;
  border-radius: 0px 10px 10px 0px;
  border: none;
  width: 68.57px;
  color: #ffffff;
}
.wrapper button i {
  font-size: 1.5rem;
}

/* process */

.process {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding-top: 1rem;
}

.process img {
  width: 90%;
}

.category_wrapper {
  display: grid;
  grid-template-columns: 1.5fr 4fr;
  gap: 2rem;
}
.category_wrapper .left {
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 2rem;
  position: sticky;
  min-width: 250px;
  top: 20%;
  height: fit-content;
}

.left .section_main_text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-transform: capitalize;
}

.left span.count {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
  color: #b0b0b0;
}

.left .each_category {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 17px;
  text-transform: capitalize;
  color: #000000;
  margin: 1rem 0;
}

.search_text_wrap .search_small {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
}
.search_text_wrap .main_result_text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  text-transform: capitalize;
  color: #000000;
  margin-bottom: 2rem;
}
.search_text_wrap span.main_result_text_span {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-transform: capitalize;
  color: rgba(100, 115, 124, 0.6);
}
.search_text_wrap .sort_by {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
}
/* prodcut card */
.product_cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem 1rem;
}

.product img {
  height: 150px;
  /* height: 206px; */
  object-fit: contain;
}

.product_cards .product {
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  padding: 0.8rem;
  position: relative;
}

.product_cards .product .love {
  position: absolute;
  right: 5px;
  top: 5px;
  background: rgba(0, 0, 0, 0.29);
  border-radius: 30px;
  width: 27px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.product_cards .product .love i {
  color: #ffffff;
}
.product_cards .product .location p {
  font-weight: 400;
  font-size: 8px;
  line-height: 10px;
  text-transform: capitalize;
  color: #000000;
}
.product_cards .product .name p {
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  text-transform: capitalize;
  color: #000000;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.product_cards .product .price p {
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
  color: #000000;
}
.product_cards .product .desc {
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-transform: capitalize;
  color: #9d9d9d;
}

.product_cards .product .kinds {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0 1.5rem;
}
.product_cards .product .kinds p {
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-transform: capitalize;
  color: #357196;
  background: rgba(53, 113, 150, 0.26);
  border-radius: 5px;
  padding: 0.5rem;
}

.product_cards .product .owners {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.product_cards .product .owners p {
  font-weight: 500;
  font-size: 11px;
  line-height: 13px;
  text-transform: capitalize;
  color: #000000;
}
.product_cards .product p.ratings {
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-transform: capitalize;
  color: #000000;
}

@media (min-width: 1300px) {
  .product_cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 1100px) {
  .product_cards {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  .product_cards .product .owners {
    gap: 0rem;
    flex-wrap: wrap;
  }
}
@media (max-width: 600px) {
  .category_wrapper {
    grid-template-columns: 1fr;
  }

  .category_wrapper .left {
    display: none;
  }

  .q-pt-xl {
    padding-top: 28px;
  }

  .search_text_wrap {
    margin-bottom: 2rem;
  }
  .video {
    width: 100%;
  }
}
</style>
