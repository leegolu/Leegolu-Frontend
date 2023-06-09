<template>
  <div class="loader" v-if="loading">
    <div>
      <q-spinner-comment color="primary" size="5em" />
    </div>
  </div>
  <!-- class="bg-white" -->
  <div
    v-if="!loading"
    :style="colorSchemeStyles"
    :class="['page-builder', pageLayoutClass]"
  >
    <div
      class="row q-py-md no-wrap items-center container justify-between q-my-sm"
    >
      <div class="logo row no-wrap">
        <q-btn class="menu q-mr-xs" flat icon="fa-solid fa-bars"></q-btn>
        Page Editor
      </div>

      <!-- <div class="right_nav q-col-gutter-x-md row items-center">

      </div> -->
      <div class="right_nav no-wrap row q-col-gutter-x-md items-center">
        <div class="lay row items-center q-col-gutter-x-md">
          <div
            @click="colorschemeModal = true"
            class="span q-col-gutter-x-sm row items-center"
          >
            <img src="/images/scheme.svg" alt="" /> <span>Color Scheme</span>
          </div>
          <div
            @click="pageLayoutModal = true"
            class="span q-col-gutter-x-sm row items-center"
          >
            <img src="/images/layout.svg" alt="" /> <span>Page Layout</span>
          </div>
        </div>
        <!-- <div class="q-ml-xl span">
          <q-btn flat round size="10px" icon="fa-solid fa-desktop" />
        </div>
        <div class="span">
          <q-btn flat round size="10px" icon="fa-solid fa-mobile" />
        </div> -->
        <div class="span">
          <q-btn
            @click="previewRender"
            style="color: white"
            color="secondary"
            label="Preview"
          />
        </div>
        <!-- <div class="span">
          <q-btn flat round size="10px" icon="fa-solid fa-xmark" />
        </div> -->
      </div>
    </div>
    <div class="row text-center hide_desktop justify-center items-center">
      <div
        @click="colorschemeModal = true"
        class="span q-col-gutter-x-sm row items-center"
      >
        <img
          style="width: 30px; height: 30px"
          src="/images/scheme.svg"
          alt=""
        />
        <span>Color Scheme</span>
      </div>
      <div
        @click="pageLayoutModal = true"
        class="span q-ml-sm q-col-gutter-x-sm row items-center"
      >
        <img
          style="width: 40px; height: 40px"
          src="/images/layout.svg"
          alt=""
        />
        <span>Page Layout</span>
      </div>
    </div>
    <div
      :style="`background: url(${coverpreview}); background-repeat: no-repeat; background-size:cover`"
      class="editor_hero"
    >
      <q-btn @click="uploadCoverModal = true" icon="camera" class="outline">
        Upload <span> | Cover photo</span>
      </q-btn>
    </div>

    <div class="upload_logo_area">
      <div class="upload_wrap container row justify-between items-center">
        <div class="left">
          <div class="left_wrap mobile row items-center q-col-gutter-x-md">
            <div class="left_logo_area">
              <img :src="preview" alt="" />
              <q-btn @click="uploadModal = true" icon="camera" class="outline">
                Upload <span>| Logo</span>
              </q-btn>
            </div>
            <div class="left_details">
              <div class="left_details_title">{{ data.business_name }}.</div>
              <div class="left_details_desc q-mt-sm">
                Makers of African designs
              </div>

              <div class="rating row items-center">
                <q-rating
                  v-model="ratingModel"
                  size="1em"
                  :max="5"
                  color="secondary"
                  class="q-my-sm"
                />
                <span>240</span>
              </div>

              <div class="location">
                <i class="fa-solid fa-location"></i>
                {{ vendor.address }}
                {{ vendor.area }}
              </div>

              <div class="left_paragraph">
                <span class="none_"
                  >Add a brief summary of what your business does.</span
                >
                <q-btn
                  @click="businessDetailsModal = true"
                  icon="edit"
                  class="outline"
                >
                  Edit <span>| Details</span>
                </q-btn>
              </div>
            </div>
          </div>
        </div>

        <div class="right">
          <q-btn
            class="none_"
            color="secondary"
            icon="fa-solid fa-phone-volume"
            label="Contact Business"
          />

          <div class="row none_desktop q-gutter-md no-wrap items-center">
            <q-btn
              class="none_desktop"
              color="secondary"
              icon="fa-solid fa-heart"
              label=""
            />
            <q-btn
              class="none_desktop"
              color="secondary"
              icon="fa-solid fa-phone-volume"
              label=""
            />
          </div>
        </div>
      </div>
    </div>

    <div class="segment_wrap">
      <div class="row manage_seg q-mr-md justify-end">
        <div class="left_paragraph">
          <q-btn @click="segmentsModal = true" icon="edit" class="outline">
            Manage <span>| Segment</span>
          </q-btn>
        </div>
      </div>
      <div class="mobile_categories">
        <div class="row items-center no-wrap justify-center">
          <q-btn-dropdown flat class="drop" color="white" label="All Products">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>All Products</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Sneakers</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Corporate</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Casuals</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Loafers</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Boots</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <div class="input_search">
            <input placeholder="Search products..." type="text" />
            <i class="fa-solid text-primary fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
      <div class="top container">
        <div class="sort_area">
          <div class="left">
            <q-btn class="active"> All Products </q-btn>
            <q-btn class="regular"> Sneakers </q-btn>
            <q-btn class="regular"> Corporate </q-btn>
            <q-btn class="regular"> Casuals </q-btn>
            <q-btn class="regular"> Loafers </q-btn>
            <q-btn class="regular"> Boots </q-btn>
          </div>

          <div class="right">
            <div class="input_search">
              <input placeholder="Search products..." type="text" />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <div class="desc_text q-pt-lg container">
          It’s how we’ve always described our bars. What’s inside. <br />
          What isn’t. We think it’s everything you need...
          <q-btn
            style="min-height: 0; padding: 0; text-transform: capitalize"
            flat
            class="text-weight-bold"
          >
            Read more
          </q-btn>
        </div>
        <div class="responsive_autofit_grid container">
          <DashboardHomeListingVue
            v-for="(listing, index) in vendor.products"
            :key="index"
            :listing="listing"
          />
        </div>
      </div>
    </div>

    <q-dialog v-model="businessDetailsModal">
      <q-card class="card modal">
        <div class="row items-center justify-between">
          <div class="title">Business Details</div>
          <q-btn flat @click="businessDetailsModal = false" class="close">
            <i class="fa-light fa-xmark"></i>
          </q-btn>
        </div>
        <div class="row q-mt-lg no-wrap items-center justify-between">
          <div class="det">
            <div class="business_name">Business Name</div>
            <input
              :disabled="enableEdit"
              v-model="data.business_name"
              class="company"
            />
          </div>
          <q-toggle v-model="namevalue" />
        </div>
        <div class="row q-my-md no-wrap items-center justify-between">
          <div class="det">
            <div class="business_name">Tagline</div>
            <input
              :disabled="enableTagEdit"
              v-model="data.business_tagline"
              class="company"
            />
          </div>
          <q-toggle v-model="tagvalue" />
        </div>
        <div class="row items-center justify-between">
          <div class="det">
            <div class="business_name">Review</div>
            <div class="rating row items-center">
              <q-rating
                v-model="ratingModel"
                size="1em"
                :max="5"
                color="secondary"
                class="q-my-sm"
              />
              <span>240</span>
            </div>
          </div>
          <q-toggle v-model="value" />
        </div>

        <div class="q-mt-lg textarea">
          <label for="">About your business</label>
          <q-input
            v-model="data.abouttext"
            filled
            class="texta"
            style="color: black"
            label="Write a brief summary about your business...."
            type="textarea"
          />
        </div>

        <div class="submit">
          <q-btn @click="businessDetailsModal = false" flat class="q-btn"
            >Save Changes</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="uploadModal">
      <q-card class="card modal">
        <div class="row items-center justify-between">
          <div class="title">Upload Images</div>
          <q-btn flat @click="uploadModal = false" class="close">
            <i class="fa-light fa-xmark"></i>
          </q-btn>
        </div>
        <div class="row q-mt-sm items-center justify-between">
          <div class="previewMain">
            <div class="form">
              <q-file
                type="file"
                v-model="data.uploads"
                accept=".jpg,.png,.svg,.jpeg"
                name="uploads"
                @update:model-value="setFile"
                class="previewinput"
              />

              <div class="previewDiv">
                <template v-if="preview">
                  <img :src="preview" class="previewimg" />
                  <img src="/images/upload.png" class="click" alt="" />
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="row q-my-md items-center justify-between">
          <div class="det">
            <div class="business_name">Branding</div>
            <div class="company">Show Profile Image</div>
          </div>
          <q-toggle v-model="value" />
        </div>

        <div class="submit">
          <q-btn flat @click="uploadModal = false" class="q-btn"
            >Save Changes</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="uploadCoverModal">
      <q-card class="card modal">
        <div class="row items-center justify-between">
          <div class="title">Upload Cover Photo</div>
          <q-btn flat @click="uploadCoverModal = false" class="close">
            <i class="fa-light fa-xmark"></i>
          </q-btn>
        </div>
        <div class="row q-mt-sm items-center justify-between">
          <div class="previewMain">
            <div class="form">
              <q-file
                type="file"
                v-model="data.coveruploads"
                accept=".jpg,.png,.svg,.jpeg"
                name="uploads"
                @update:model-value="setcoverFile"
                class="previewinput"
              />

              <div class="previewDiv">
                <template v-if="coverpreview">
                  <img :src="coverpreview" class="previewimg cover" />
                  <img src="/images/upload.png" class="click" alt="" />
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="row q-my-md items-center justify-between">
          <div class="det">
            <div class="business_name">Branding</div>
            <div class="company">Show Cover Image</div>
          </div>
          <q-toggle v-model="value" />
        </div>

        <div class="submit">
          <q-btn flat @click="uploadCoverModal = false" class="q-btn"
            >Save Changes</q-btn
          >
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="segmentsModal">
      <q-card class="card modal">
        <div class="row items-center justify-between">
          <div class="title">Segments</div>
          <q-btn flat @click="segmentsModal = false" class="close">
            <i class="fa-light fa-xmark"></i>
          </q-btn>
        </div>
        <div class="row q-mt-lg items-center justify-between">
          <div class="det row no-wrap items-center q-col-gutter-md">
            <div class="img">
              <img src="/images/segment1.svg" alt="" />
            </div>

            <div class="category">Display Categorized product list</div>
          </div>
          <q-radio v-model="radio" val="hello" />
        </div>
        <div class="row no-wrap q-mt-lg items-center justify-between">
          <div class="det row items-center q-col-gutter-md">
            <div class="img">
              <img src="/images/segment1.svg" alt="" />
            </div>

            <div class="category">Display category list</div>
          </div>
          <q-radio v-model="radio" val="hello" />
        </div>
        <div class="row no-wrap q-mt-lg items-center justify-between">
          <div class="det row items-center q-col-gutter-md">
            <div class="img">
              <img src="/images/segment1.svg" alt="" />
            </div>

            <div class="category">Display all products</div>
          </div>
          <q-radio v-model="radio" val="hello" />
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="pageLayoutModal">
      <q-card class="card modal">
        <div class="row items-center justify-between">
          <div class="row items-center">
            <img
              style="width: 19.64px; height: 21.99px"
              src="/images/layout.svg"
              alt=""
            />
            <div class="title q-ml-sm">Page Layout</div>
          </div>
          <q-btn flat @click="pageLayoutModal = false" class="close">
            <i class="fa-light fa-xmark"></i>
          </q-btn>
        </div>
        <div class="search">
          <div class="input_search layout q-mt-sm q-mb-md">
            <input placeholder="Search Layouts..." type="text" />
            <i class="fa-solid text-primary fa-magnifying-glass"></i>
          </div>
        </div>
        <div class="layouts">
          <div class="layout">
            <img src="/images/layout1.png" alt="" />
            <div class="row items-center justify-between">
              <div class="layout_text">Default Layout</div>
              <q-radio color="secondary" v-model="radio" val="hello" />
            </div>
          </div>
          <div class="layout">
            <img src="/images/layout1.png" alt="" />
            <div class="row items-center justify-between">
              <div class="layout_text">Mandarine</div>
              <q-radio color="secondary" v-model="radio" val="hello" />
            </div>
          </div>
          <div class="layout">
            <img src="/images/layout1.png" alt="" />
            <div class="row items-center justify-between">
              <div class="layout_text">Quick Fox</div>
              <q-radio color="secondary" v-model="radio" val="hello" />
            </div>
          </div>
          <div class="layout">
            <img src="/images/layout1.png" alt="" />
            <div class="row items-center justify-between">
              <div class="layout_text">Omni Display</div>
              <q-radio color="secondary" v-model="radio" val="hello" />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="colorschemeModal">
      <q-card class="card modal">
        <div class="row items-center justify-between">
          <div class="row items-center">
            <img
              style="width: 19.64px; height: 21.99px"
              src="/images/scheme.svg"
              alt=""
            />
            <div class="title">Color Scheme</div>
          </div>
          <q-btn flat @click="colorschemeModal = false" class="close">
            <i class="fa-light fa-xmark"></i>
          </q-btn>
        </div>
        <div class="search">
          <div class="input_search schemes q-mt-sm q-mb-md">
            <input placeholder="Search color schemes..." type="text" />
            <i class="fa-solid text-primary fa-magnifying-glass"></i>
          </div>
        </div>

        <div class="row q-mt-sm items-center justify-between">
          <div class="color">
            <div class="color_text">Leegolu default</div>

            <div class="q-gutter-sm">
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="primary"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="secondary"
                icon=""
              />
              <q-btn
                size="10px"
                style="width: 29.13px; height: 29.08px"
                square
                color="amber"
                glossy
                text-color="black"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="brown-5"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="deep-orange"
                icon=""
              />
            </div>
          </div>
          <q-radio color="secondary" v-model="radio" val="hello" />
        </div>
        <div class="row q-mt-md items-center justify-between">
          <div class="color">
            <div class="color_text">Leegolu default</div>

            <div class="q-gutter-sm">
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="primary"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="secondary"
                icon=""
              />
              <q-btn
                size="10px"
                style="width: 29.13px; height: 29.08px"
                square
                color="amber"
                glossy
                text-color="black"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="brown-5"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="deep-orange"
                icon=""
              />
            </div>
          </div>
          <q-radio color="secondary" v-model="radio" val="hello" />
        </div>
        <div class="row q-mt-md items-center justify-between">
          <div class="color">
            <div class="color_text">Leegolu default</div>

            <div class="q-gutter-sm">
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="primary"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="secondary"
                icon=""
              />
              <q-btn
                size="10px"
                style="width: 29.13px; height: 29.08px"
                square
                color="amber"
                glossy
                text-color="black"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="brown-5"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="deep-orange"
                icon=""
              />
            </div>
          </div>
          <q-radio color="secondary" v-model="radio" val="hello" />
        </div>
        <div class="row q-mt-md items-center justify-between">
          <div class="color">
            <div class="color_text">Leegolu default</div>

            <div class="q-gutter-sm">
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="primary"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="secondary"
                icon=""
              />
              <q-btn
                size="10px"
                style="width: 29.13px; height: 29.08px"
                square
                color="amber"
                glossy
                text-color="black"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="brown-5"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="deep-orange"
                icon=""
              />
            </div>
          </div>
          <q-radio color="secondary" v-model="radio" val="hello" />
        </div>
        <div class="row q-mt-md items-center justify-between">
          <div class="color">
            <div class="color_text">Leegolu default</div>

            <div class="q-gutter-sm">
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="primary"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="secondary"
                icon=""
              />
              <q-btn
                size="10px"
                style="width: 29.13px; height: 29.08px"
                square
                color="amber"
                glossy
                text-color="black"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="brown-5"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="deep-orange"
                icon=""
              />
            </div>
          </div>
          <q-radio color="secondary" v-model="radio" val="hello" />
        </div>
        <div class="row q-mt-md items-center justify-between">
          <div class="color">
            <div class="color_text">Leegolu default</div>

            <div class="q-gutter-sm">
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="primary"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="secondary"
                icon=""
              />
              <q-btn
                size="10px"
                style="width: 29.13px; height: 29.08px"
                square
                color="amber"
                glossy
                text-color="black"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="brown-5"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="deep-orange"
                icon=""
              />
            </div>
          </div>
          <q-radio color="secondary" v-model="radio" val="hello" />
        </div>
        <div class="row q-mt-md items-center justify-between">
          <div class="color">
            <div class="color_text">Leegolu default</div>

            <div class="q-gutter-sm">
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="primary"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="secondary"
                icon=""
              />
              <q-btn
                size="10px"
                style="width: 29.13px; height: 29.08px"
                square
                color="amber"
                glossy
                text-color="black"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="brown-5"
                icon=""
              />
              <q-btn
                style="width: 29.13px; height: 29.08px"
                size="10px"
                square
                color="deep-orange"
                icon=""
              />
            </div>
          </div>
          <q-radio color="secondary" v-model="radio" val="hello" />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import DashboardHomeListingVue from "src/components/listings/DashboardHomeListing.vue";
export default {
  data() {
    return {
      abouttext: "",
      data: {},
      value: false,
      tagvalue: false,
      namevalue: false,
      enableEdit: true,
      enableTagEdit: true,
      logoUploaded: "",
      coverUploaded: "",
      coverpreview: "/images/coverbg.svg",
      preview: "/images/sqrpreview.png",
      ratingModel: ref(4),
      vendor: {},
      businessDetailsModal: false,
      value: false,
      uploadModal: false,
      uploadCoverModal: false,
      preview: "/images/sqrpreview.png",
      segmentsModal: false,
      radio: false,
      loading: true,
      pageLayoutModal: false,
      colorschemeModal: false,
      colorScheme: "dark",
      pageLayout: "grid",
      colorSchemes: [
        {
          name: "default",
          variables: {
            "--primary-color": "#007bff",
            "--secondary-color": "#6c757d",
            // Add more CSS variables for the color scheme
          },
        },
        {
          name: "dark",
          variables: {
            "--primary-color": "#343a40",
            "--secondary-color": "#6c757d",
            // Add more CSS variables for the color scheme
          },
        },
        // Add more color schemes
      ],

      pageLayouts: [
        {
          name: "grid",
          class: "grid-layout",
          // Add more properties specific to the grid layout
        },
        {
          name: "flexbox",
          class: "flexbox-layout",
          // Add more properties specific to the flexbox layout
        },
        // Add more page layouts
      ],
    };
  },

  watch: {
    namevalue: {
      handler() {
        if (this.namevalue === true) {
          this.enableEdit = false;
        } else {
          this.enableEdit = true;
        }
      },
      immediate: true,
    },
    tagvalue: {
      handler() {
        if (this.tagvalue === true) {
          this.enableTagEdit = false;
        } else {
          this.enableTagEdit = true;
        }
      },
      immediate: true,
    },
  },

  components: {
    DashboardHomeListingVue,
  },

  created() {
    this.getVendor();
  },

  computed: {
    colorSchemeStyles() {
      const selectedScheme = this.colorSchemes.find(
        (scheme) => scheme.name === this.colorScheme
      );
      return selectedScheme ? selectedScheme.variables : {};
    },
    pageLayoutClass() {
      const selectedLayout = this.pageLayouts.find(
        (layout) => layout.name === this.pageLayout
      );
      return selectedLayout ? selectedLayout.class : "";
    },
  },

  methods: {
    previewImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        };
        // this.image = input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },

    setFile(props) {
      // console.log(props);
      var reader = new FileReader();
      reader.onload = (e) => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(props);
    },
    setcoverFile(props) {
      var reader = new FileReader();
      reader.onload = (e) => {
        this.coverpreview = e.target.result;
      };
      reader.readAsDataURL(props);
    },
    onItemClick() {
      console.log("onItemClick");
    },

    previewRender() {
      this.loading = true;

      // console.log(datar);
      const reader1 = new FileReader();
      const reader2 = new FileReader();

      reader1.onload = () => {
        const base64Data = reader1.result.split(",")[1];
        this.data.uploads = base64Data;
      };
      reader2.onload = () => {
        const base64Data2 = reader2.result.split(",")[1];
        this.data.coveruploads = base64Data2;
      };

      reader1.readAsDataURL(this.data.uploads);
      reader2.readAsDataURL(this.data.coveruploads);

      // console.log(this.data);

      setTimeout(() => {
        this.loading = false;
        this.$store.leegoluauth.pageBuilderData = this.data;
        // this.coverUploaded =
        // this.readFileData();

        this.$router.replace({
          name: "vendor.page",
          params: { slug: this.$store.leegoluauth.vendor.slug },
        });
      }, 2000);
    },

    getVendor() {
      this.loading = true;
      this.$api
        .get(`vendor/${this.$store.leegoluauth.vendor.slug}`)
        .then((response) => {
          this.vendor = response.data.vendor;
          this.loading = false;
          this.data.business_name = response.data.vendor.business_name;
          this.data.business_tagline = "This is a custom tagline";
          // console.log(response);
        })
        .catch(({ response }) => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.segment_wrap {
  // margin-top: 11rem;
  background: rgba(217, 217, 217, 0.31);
  border: 1px dashed #000000;
  margin: 11rem auto 0rem;
  width: 90%;
}

.segment_wrap .left_paragraph .outline.q-btn {
  margin-top: -4rem;
}

.logo {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
}
.right_nav img {
  width: 25px;
  height: 21px;
}
.editor_hero {
  height: 40vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  background: var(--primary-color);
}

.editor_hero .q-btn {
  position: absolute;
  top: 5%;
  right: 2%;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  background: #ffffff;

  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #000000;
}

.editor_hero .q-btn span {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #000000;
}

.color_text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #000000;
  margin-bottom: 0.5rem;
}

.drop {
  background: #1f7bb5;
  color: white;
  border: 0.5px solid #1f7bb5;
  border-radius: 20px;
  text-transform: capitalize;
}

.left_details_desc {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
}

.desc_text {
  display: none;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: #000000;
}

.menu {
  display: none;
}
.location {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: var(--primary-color);
  // color: #1f7bb5;
}

.left_details_title {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
}

.left_paragraph {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
}

.layout {
  margin: 1rem 0;
}

.none_desktop {
  display: none;
}

// .none_desktop.q-btn {
//   color: #1f7bb5 !important;
//   text-transform: capitalize;
//   text-align: center;
//   background: #ffffff;
// }

.layout_text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
}

.right .q-btn {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
}

.upload_logo_area {
  background: var(--primary-color);
  // background: #cedfeb;
  height: 132px;
}
.upload_wrap {
  padding-top: 1.2rem;
}

.left_logo_area img {
  width: 147.72px;
  height: 147.72px;
  border: 6px solid var(--secondary-color);
  // border: 6px solid #cedfeb;
  border-radius: 10px;
}

.left_logo_area {
  position: relative;
}

.left_logo_area .outline.q-btn {
  position: absolute;
  bottom: 20%;
  background: #ffffff;
  left: -10%;
  z-index: 5;
}

.outline.q-btn {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #000000;
  background: #ffffff;
}

.outline.q-btn::before {
  background: #ffffff;
  border: 1px solid #000000;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.44);
  border-radius: 5px 5px 0px 0px;
}
.outline.q-btn span {
  font-weight: 500;
}

.sort_area {
  // background: #f5f5f5;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0 0;
  margin: 0.1rem 0 0;
}

.sort_area .left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sort_area .active {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: #ffffff;
  height: 34px;
  text-align: center;
  color: #ffffff;
  white-space: nowrap;
  background: #1f7bb5;
  border-radius: 17px;
  text-transform: capitalize;
}
.sort_area .regular {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  text-transform: capitalize;
  color: #000000;
}

.sort_area .regular::before {
  box-shadow: none;
}

.sort_area .regular.boosted {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  background: #03ae1e;
  border-radius: 17px;
}

.sort_area .right .q-btn {
  width: 215px;
  height: 34px;
}
.sort_area .right .q-btn::before {
  box-shadow: none;
}

.mobile_categories {
  display: none;
}

.input_search {
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 2px solid #cccccc;
  border-radius: 50px;
}
.input_search.schemes {
  display: flex;
  align-items: center;
  background: #f0f0f0;
  border: 1px solid #bebcbc;
  border-radius: 8px;
}
.input_search.layout {
  border: 1px solid #bebcbc;
  border-radius: 8px;
}

.input_search input {
  border: none;
  background: transparent;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #9a9a9a;
  padding: 1rem;
  height: 42px;
  width: 100%;
}

.input_search i {
  padding: 1rem;
  font-size: 1rem;
}

.card {
  padding: 1rem;
  min-width: 363px;
  background: #ffffff;
  width: 466px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 9px;
  // height: 522px;
}

.modal label {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  display: block;
  color: #000000;
  margin-bottom: 0.5rem;
}

.modal .title {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #000000;
}

.modal .business_name {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #000000;
}

.modal .company {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  border: none;
  background: transparent;
}

.modal .category {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #64737c;
}

.submit {
  margin: 1rem 0;
}
.submit .q-btn {
  width: 100%;
  height: 55px;
  background: #1f7bb5;
  border-radius: 5px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #ffffff;
}

.submit .q-btn .q-btn__content {
  justify-content: center;
}
.close {
  font-size: 2rem;
  min-height: 0;
}
.close i {
  color: #979797;
}

.left_wrap {
  background: unset;
  width: unset;
  padding: unset;
}

// .left_wrap .left_details {
//   padding-left: 0;
// }
//preview
.previewMain {
  width: 100%;
}
.previewDiv {
  position: relative;
}
.previewDiv::before {
  position: absolute;
  content: "";
  background: rgba(0, 0, 0, 0.5);
  border: 6px solid #cedfeb;
  border-radius: 10px;
  width: 100%;
  height: 100%;
}

.previewDiv .click {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.form {
  margin-top: 1rem;
  position: relative;
  display: flex;
  justify-content: center;
}
.form img.previewimg {
  width: 296px;
  height: 296px;
}
.form img.previewimg.cover {
  width: 411px;
  height: 200px;
}
.form img.click {
  width: 120px;
}

.previewinput {
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0;
}

@media (max-width: 950px) {
  .form img.previewimg.cover {
    width: 100%;
  }

  .lay {
    display: none;
  }

  .mobile_categories {
    display: flex;
    justify-content: space-between;
    background: rgba(31, 123, 181, 0.24);
    padding: 0.5rem;
    background: rgba(31, 123, 181, 0.74);
  }

  .mobile_categories > .row {
    width: 100%;
    justify-content: space-between;
    gap: 3rem;
  }
  .mobile_categories > .row .input_search {
    border-radius: 40px;
    height: 40px;
  }

  .sort_area {
    display: none;
  }

  .left_logo_area .outline.q-btn {
    top: 5%;
    right: -60%;
    bottom: unset;
    left: unset;
  }

  .segment_wrap {
    margin-top: 7.5rem;
    background: transparent;
    border: none;
    padding-bottom: 2rem;
  }
  .segment_wrap .left_paragraph .outline.q-btn {
    margin-top: -1rem;
  }
  .listings_hold {
    background: #fff;
  }

  .card {
    min-width: 100%;
  }

  .upload_logo_area {
    height: auto;
    padding-bottom: 2rem;
  }

  .manage_seg {
    margin-top: -48px;
  }

  .upload_wrap {
    align-items: flex-end;
  }

  .upload_wrap .right > div {
    margin-bottom: 2rem;
  }

  .span {
    padding-left: 0;
  }

  .none_ {
    display: none !important;
  }

  .logo {
    font-size: 16px;
  }

  .menu {
    display: block;
    padding: 0;
    min-height: 0;
  }

  .none_desktop {
    display: flex;
  }

  .left_wrap.mobile {
    flex-direction: column;
  }

  .left_logo_area img {
    width: auto;
    border: unset;
  }

  .left_logo_area {
    padding-left: 0;
  }

  .desc_text {
    display: block;
  }

  .responsive_autofit_grid {
    background: #fff;
  }
}

@media (min-width: 500px) {
  .hide_desktop {
    display: none;
  }
}
@media (max-width: 500px) {
  .submit .q-btn {
    height: 45px;
    font-size: 15px;
  }
  .logo {
    white-space: nowrap;
  }

  .segment_wrap {
    margin-top: 2rem;
  }
  .desc_text {
    display: block;
    margin-bottom: 3rem;
  }

  .left_details_title {
    font-size: 15px;
    line-height: 4px;
  }

  .right .q-btn {
    font-size: 10px;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .left_details_desc {
    font-size: 10px;
    line-height: 13px;
  }
  .outline.q-btn {
    font-size: 10px;
  }
  .editor_hero {
    height: 30vh;
  }

  .segment_wrap {
    width: 100%;
  }

  .span img {
    width: 30px !important;
    height: 30px !important;
  }

  .span .q-btn {
    padding: 5px;
    min-height: auto;
    text-transform: capitalize;
  }

  .location {
    margin-bottom: 0.5rem;
  }

  .span span {
    font-size: 12px;
  }

  .modal .business_name {
    font-size: 10px;
  }

  .modal .company {
    font-size: 13px;
  }

  .textarea .texta {
    font-size: 10px;
    color: #000;
  }
}
</style>
