<template>
  <div class="detail q-pt-xl">
    <div class="product_detail_wrap container">
      <div class="left">
        <section
          id="main-carousel"
          class="splide"
          aria-label="My Awesome Gallery"
        >
          <div class="splide__track">
            <ul class="splide__list">
              <li class="splide__slide">
                <img src="/images/car.png" alt="" />
              </li>
              <li class="splide__slide">
                <img src="/images/car.png" alt="" />
              </li>
              <li class="splide__slide">
                <img src="/images/car.png" alt="" />
              </li>
              <li class="splide__slide">
                <img src="/images/car.png" alt="" />
              </li>
              <li class="splide__slide">
                <img src="/images/car.png" alt="" />
              </li>
            </ul>
          </div>
        </section>
        <ul id="thumbnails" class="thumbnails">
          <li class="thumbnail">
            <img src="/images/car.png" alt="" />
          </li>
          <li class="thumbnail">
            <img src="/images/car.png" alt="" />
          </li>
          <li class="thumbnail">
            <img src="/images/car.png" alt="" />
          </li>
          <li class="thumbnail">
            <img src="/images/car.png" alt="" />
          </li>
        </ul>
      </div>

      <div class="right">
        <div class="location">KETU, lAGOS</div>
        <div class="title q-mb-xs">Hisense 1.5HP Split Air Conditioner</div>
        <div class="price">₦210,000</div>

        <div class="q-mt-md q-pb-xs row items-center justify-between posted">
          <small>Posted 2hrs Ago</small>
          <small>2567 Views</small>
        </div>
        <hr class="q-mb-md" />

        <p class="desc">
          This is a firstbody 2011 model Toyota Camry for cheaper rate! Car is
          in good condition, it buy and drive! Be sure inform the seller you get
          the contact on Olist
        </p>

        <div class="owner">
          <div class="owner_left">
            <img src="/images/owner.png" alt="" />
          </div>
          <div class="owner_right">
            <p class="owner_title">Idafe Motors <span> | 7 Months</span></p>
            <div class="ratings_area">
              <span class="rating_main_text">4.0</span>
              <q-rating
                v-model="ratingModel"
                size="1.5em"
                :max="4"
                color="secondary"
              />
              <span class="ratings_subtext"> (2345) </span>
            </div>
          </div>
        </div>

        <div class="btns q-mt-lg">
          <q-btn
            color="secondary"
            icon="fa-solid fa-phone-volume"
            label="Show Contact"
          />
          <q-btn
            color="primary"
            icon="fa-solid fa-message"
            label="Chat Seller"
          />
        </div>
        <hr class="q-mt-xl q-mb-md" />

        <div class="buyer">
          <p class="guide">
            <i class="fa-regular fa-file"></i>
            Buyer Guide
          </p>

          <ul>
            <li>Keep in mind not to send any prepayments.</li>
            <li>
              Arrange to meet with the seller to pay for & pickup your item.
            </li>
            <li>Meet the vendor in a well-lit area.</li>
            <li>Check the products to ensure they are what you require.</li>
            <li>Verify all the paperwork, and only pay if you're pleased.</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="product_information">
      <div class="info_main_text">Product Information</div>

      <hr class="q-mt-lg" />

      <div class="info_detail">
        <div class="info_item">
          <p>TOYOTA</p>
          <small>MAKE</small>
        </div>
        <div class="info_item">
          <p>COROLLA</p>
          <small>MODEL</small>
        </div>
        <div class="info_item">
          <p>2019</p>
          <small>YEAR</small>
        </div>
        <div class="info_item">
          <p>FOREIGN USED</p>
          <small>CONDITION</small>
        </div>
        <div class="info_item">
          <p>AUTOMATIC</p>
          <small>TRANSMISSION</small>
        </div>
        <div class="info_item">
          <p>BLACK</p>
          <small>COLOR</small>
        </div>
        <div class="info_item">
          <p>NO FAULTS</p>
          <small>FAULTS</small>
        </div>
        <div class="info_item">
          <p>NO</p>
          <small>REGISTERED </small>
        </div>
        <div class="info_item">
          <p>34,000 KM</p>
          <small>MILEAGE</small>
        </div>
        <div class="info_item">
          <p>MALAMI00937747748</p>
          <small>VIN</small>
        </div>
      </div>

      <hr class="q-mb-lg" />

      <div class="product_info_hold">
        <div class="left">
          <div class="info_main_text">Product Details</div>

          <ul class="q-mt-md">
            <li>6 Cyliner Engine</li>

            <li>
              Buy with confidence, if you have any product or installation
              issue, please feel free to contact us, we will try to help you out
              within 24 hours
            </li>

            <li>
              Directly replacement, just plug and play, no other parts or
              modifications needed and no error message warning on dashboard for
              99% vehicle, no mercury, UV, IR or other deleterious radiation
            </li>

            <li>
              Bulbs will strobe at braking mode, so that people could notice
              your car easily and keep safe distance to avoid any automotive
              cars, trucks, SUVs getting rear-end collision
            </li>
            <li>Complete paperwork, and no fines or traffic violations</li>
          </ul>
        </div>
        <div class="right">
          <div class="info_main_text">Features</div>

          <div class="features_hold">
            <div class="feature">
              <p>Air Conditioning</p>
            </div>
            <div class="feature">
              <p>FM/AM Radio</p>
            </div>
            <div class="feature">
              <p>Cruise Control</p>
            </div>
            <div class="feature">
              <p>CD Player</p>
            </div>
            <div class="feature">
              <p>Sun Roof</p>
            </div>
            <div class="feature">
              <p>Air Conditioning</p>
            </div>
            <div class="feature">
              <p>Air Conditioning</p>
            </div>
            <div class="feature">
              <p>Air Conditioning</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    return {
      ratingModel: ref(4),
    };
  },

  mounted() {
    var splide = new Splide("#main-carousel", {
      pagination: false,
    });

    var thumbnails = document.getElementsByClassName("thumbnail");
    var current;

    for (var i = 0; i < thumbnails.length; i++) {
      initThumbnail(thumbnails[i], i);
    }

    function initThumbnail(thumbnail, index) {
      thumbnail.addEventListener("click", function () {
        splide.go(index);
      });
    }

    splide.on("mounted move", function () {
      var thumbnail = thumbnails[splide.index];

      if (thumbnail) {
        if (current) {
          current.classList.remove("is-active");
        }

        thumbnail.classList.add("is-active");
        current = thumbnail;
      }
    });

    splide.mount();
  },
};
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0;
}
.product_detail_wrap {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  align-items: center;
  width: 95%;
}

.right {
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 2.2rem 1rem 1rem;
  height: 100%;
}
.product_detail_wrap .location {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
}
.product_detail_wrap .title {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  text-transform: capitalize;
}
.product_detail_wrap .price {
  font-weight: 800;
  font-size: 36px;
  line-height: 44px;
  text-transform: capitalize;
  color: #000000;
}

.posted small {
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  text-transform: capitalize;
  color: #9d9d9d;
}

p.desc {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-transform: capitalize;
  color: #000000;
  margin-bottom: 2rem;
}

.owner {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.owner_left {
  padding-top: 0.5rem;
}

p.owner_title {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
  color: #000000;
}
p.owner_title span {
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  text-transform: capitalize;
  color: #9d9d9d;
  margin-left: 0.5rem;
}

.owner .ratings_area {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.2rem;
}

.owner .ratings_area .ratings_main_text {
  font-weight: 700;
  font-size: 11px;
  line-height: 13px;
  text-transform: capitalize;
  color: #000000;
}
.owner .ratings_area .ratings_subtext {
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  text-transform: capitalize;
  color: #9d9d9d;
}

hr {
  background: #b0b0b0;
}

.btns {
  display: grid;
  gap: 1.5rem;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
}
.btns .q-btn {
  padding: 0.75rem;
  font-weight: 700;
  font-size: 100%;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
}

p.guide {
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
  color: #000000;
  padding-top: 1rem;
  margin-bottom: 0.7rem;
}
.right ul {
  margin-left: 1rem;
}
ul li {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  margin: 0.3rem 0;
  list-style-type: disc;
}

// thumbnail

.splide__slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.splide__slide {
  opacity: 0.6;
}

.splide__slide.is-active {
  opacity: 1;
}

/* thunmnail */

.thumbnails {
  display: flex;
  margin: 0.3rem auto 0;
  padding: 0;
  gap: 0.5rem;
  justify-content: center;
}

.thumbnail {
  width: 143px;
  height: 180px;
  overflow: hidden;
  list-style: none;
  margin: 0.5rem 0 0;
  cursor: pointer;
  opacity: 0.3;
}

.thumbnail.is-active {
  opacity: 1;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
.splide img {
  object-fit: contain;
}

// info

.product_information {
  width: 95%;
  margin: 6rem auto 0;
  background: #ffffff;
  /* Leegolu Segment Box Shadow */

  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  padding: 1.5rem;
}

.product_information .right {
  background: none;
  box-shadow: none;
  padding: 0;
}
.product_information .left ul {
  margin-left: 1rem;
}

.info_main_text {
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  text-transform: capitalize;
}

.info_detail .info_item p {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-transform: capitalize;
}
.info_detail .info_item small {
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  text-transform: capitalize;
}

.product_info_hold {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem;
  align-items: flex-start;
}

.product_info_hold li {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
  list-style-type: disc;
}

.features_hold {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  align-items: flex-start;
  margin-top: 1.5rem;
}

.info_item {
  padding: 1.5rem 0;
}

.info_detail {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  align-items: flex-start;
  margin-top: 1.5rem;
}

.features_hold .feature {
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 20px;
  text-align: center;
  padding: 0.5rem;
}

.features_hold .feature p {
  font-weight: 500;
  font-size: 10px;
  line-height: 20px;
  color: #000000;
}
</style>
