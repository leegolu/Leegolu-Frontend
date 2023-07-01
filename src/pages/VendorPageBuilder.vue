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
      class="row nav_area q-py-md no-wrap items-center container justify-between q-my-sm"
    >
      <div class="logo row no-wrap">
        <q-btn
          @click="drawer = !drawer"
          class="menu q-mr-xs"
          flat
          icon="fa-solid fa-bars"
        ></q-btn>
        Page Editor
      </div>

      <!-- <div class="right_nav q-col-gutter-x-md row items-center">

      </div> -->
      <div class="right_nav no-wrap row q-col-gutter-x-md items-center">
        <div class="lay no-wrap row items-center q-col-gutter-x-md">
          <div
            @click="colorschemeModal = true"
            class="span cursor-pointer nav_btn_icon no-wrap q-col-gutter-x-sm row items-center"
          >
            <img src="/images/scheme.svg" alt="" /> <span>Color Scheme</span>
          </div>
          <div
            @click="pageLayoutModal = true"
            class="span nav_btn_icon cursor-pointer no-wrap q-col-gutter-x-sm row items-center"
          >
            <img src="/images/layout.svg" alt="" /> <span>Page Layout</span>
          </div>
        </div>
        <div style="gap: 0.6rem" class="q-ml-xl row items-center no-wrap">
          <div class="span">
            <q-btn
              @click="toggleView('desktop')"
              flat
              round
              class="desktop_icon"
              size="10px"
            >
              <img src="/images/desktop.svg" alt="" />
            </q-btn>
          </div>
          <div class="span mobile">
            <q-btn @click="toggleView('mobile')" flat round size="10px">
              <img src="/images/mobile.svg" alt="" />
            </q-btn>
          </div>
          <div class="span">
            <q-btn
              @click="previewRender"
              style="color: white"
              label="Preview"
              class="preview"
            />
          </div>
          <div class="span">
            <q-btn :to="{ name: 'manage-shop' }" flat round size="10px">
              <img src="/images/cancel.svg" alt="" />
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="row text-center hide_desktop justify-center items-center">
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
    </div> -->
    <div
      v-if="data.coveruploads"
      :style="`background: url(${coverpreview}); background-repeat: no-repeat; background-size:cover`"
      class="editor_hero"
      @click="uploadCoverModal = true"
    >
      <q-btn @click="uploadCoverModal = true" class="outline">
        <img src="/images/camerabtn.svg" alt="" />
        Upload <span> | Cover photo</span>
      </q-btn>
    </div>
    <div v-else @click="uploadCoverModal = true" class="editor_hero">
      <q-btn @click="uploadCoverModal = true" class="outline">
        <img src="/images/camerabtn.svg" alt="" /> Upload
        <span> | Cover photo</span>
      </q-btn>
    </div>
    <!-- {{ data }} -->
    <div class="upload_logo_area">
      <div class="upload_wrap container row justify-between items-center">
        <div class="left">
          <div
            class="left_wrap mobile row no-wrap items-center q-col-gutter-x-md"
          >
            <div @click="uploadModal = true" class="left_logo_area">
              <img v-if="showlogovalue" :src="preview" alt="" />
              <template v-else>
                <div class="initials logoside">{{ initials }}</div>
              </template>
              <q-btn @click="uploadModal = true" class="outline">
                <img src="/images/camerabtn.svg" alt="" />
                Upload <span>| Logo</span>
              </q-btn>
            </div>
            <div class="left_details">
              <div class="left_details_title">{{ data.business_name }}.</div>
              <div class="left_details_desc q-mt-sm">
                {{
                  data.business_tagline !== ""
                    ? data.business_tagline
                    : "This is a custom tagline, please edit"
                }}
              </div>

              <!-- <div class="rating row items-center">
                <q-rating
                  v-model="ratingModel"
                  size="1em"
                  :max="5"
                  color="secondary"
                  class="q-my-sm"
                />
                <span class="rate">240</span>
              </div> -->

              <div class="location">
                <i class="fa-solid fa-location"></i>
                <!-- {{ vendor.address }} -->
                {{ vendor.area }}
              </div>
              <!-- {{ data.description }} -->
              <div class="left_paragraph">
                <span class="none_"
                  >{{
                    data.description !== ""
                      ? data.description
                      : "Add a brief summary of what your business does."
                  }}
                </span>
                <q-btn @click="businessDetailsModal = true" class="outline">
                  <img src="/images/editbtn.svg" alt="" />
                  <span>Edit</span> <span>| Details</span>
                </q-btn>
              </div>
            </div>
          </div>
        </div>

        <div class="right">
          <q-btn class="none_" flat>
            <img src="/images/cal.svg" alt="" />
            <span class="q-ml-sm">Contact Business</span></q-btn
          >

          <div class="row none_desktop q-gutter-md no-wrap items-center">
            <q-btn
              class="none_desktop"
              icon="fa-solid fa-heart"
              label=""
              flat
            />
            <q-btn
              class="none_desktop"
              icon="fa-solid fa-phone"
              label=""
              flat
            />
          </div>
        </div>
      </div>
    </div>
    <!-- {{ data }} -->
    <div v-if="data.segments === 'Segment A'" class="segment_wrap">
      <div class="row manage_seg q-mr-md justify-end">
        <div class="left_paragraph">
          <q-btn @click="segmentsModal = true" class="outline">
            <img src="/images/editbtn.svg" alt="" />
            Manage <span>| Segment</span>
          </q-btn>
        </div>
      </div>
      <div class="mobile_categories">
        <div class="row items-center no-wrap justify-center">
          <q-btn flat class="drop" color="white" label="All Products" />
          <div class="input_search">
            <input
              v-model="sorted"
              placeholder="Search products..."
              type="text"
            />
            <i class="fa-solid text-primary fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
      <div class="top container">
        <div class="sort_area">
          <div class="left">
            <!-- <q-btn class="">  </q-btn> -->
            <div class="segmentA">All Products</div>
          </div>

          <div class="right">
            <div class="input_search">
              <input
                v-model="sorted"
                placeholder="Search products..."
                type="text"
              />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="holder">
        <div class="desc_text">
          <div class="des_">
            {{
              data.description !== ""
                ? data.description
                : `It’s how we’ve
            always described our bars. What’s inside.
            What isn’t. We think it’s everything you need...`
            }}

            <!-- <q-btn
              style="min-height: 0; padding: 0; text-transform: capitalize"
              flat
              class="text-weight-bold"
            >
              Read more
            </q-btn> -->
          </div>

          <q-btn @click="businessDetailsModal = true" class="outline">
            <img src="/images/editbtn.svg" alt="" />
            <span>Edit</span> <span>| Details</span>
          </q-btn>
        </div>
        <!-- <div class="segmentA q-pt-lg container">My Collections</div> -->
        <div
          v-if="!loading && vendor && products.length"
          class="responsive_autofit_grid container"
        >
          <DashboardHomeListingVue
            v-for="(listing, index) in sortproducts"
            :key="index"
            :listing="listing"
          />
        </div>
        <div v-else class="empty">
          <img src="/images/empty.svg" alt="" />

          <div class="empty_text">
            You currently have not listed any products
          </div>
        </div>
      </div>
    </div>
    <div v-if="data.segments === 'Segment B'" class="segment_wrap">
      <div class="row manage_seg q-mr-md justify-end">
        <div class="left_paragraph">
          <q-btn @click="segmentsModal = true" class="outline">
            <img src="/images/editbtn.svg" alt="" />
            Manage <span>| Segment</span>
          </q-btn>
        </div>
      </div>
      <div class="mobile_categories">
        <div class="row items-center no-wrap justify-center">
          <q-btn-dropdown
            flat
            class="drop"
            color="white"
            label="Categorized Collections"
          >
            <q-list>
              <q-item
                v-for="(collections, index) in grandAllProductsArr"
                :key="index"
                clickable
                v-close-popup
                @click="grandselectCollection(collections)"
              >
                <q-item-section>
                  <q-item-label>{{ collections.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <div class="input_search">
            <input
              v-model="sortingCriteria"
              placeholder="Search products..."
              type="text"
            />
            <i class="fa-solid text-primary fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
      <div class="top container">
        <div class="sort_area">
          <div class="left">
            <q-btn
              v-for="(collections, index) in grandAllProductsArr"
              :key="index"
              @click="grandselectCollection(collections)"
              :class="
                collections.id === grandselectedCollectionId
                  ? 'active'
                  : 'regular'
              "
            >
              {{ collections.name }}
            </q-btn>
            <!-- <q-btn class="regular"> Sneakers </q-btn>
            <q-btn class="regular"> Corporate </q-btn>
            <q-btn class="regular"> Casuals </q-btn>
            <q-btn class="regular"> Loafers </q-btn>
            <q-btn class="regular"> Boots </q-btn> -->
          </div>

          <div class="right">
            <div class="input_search">
              <input
                v-model="sortingCriteria"
                placeholder="Search products..."
                type="text"
              />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="holder">
        <div class="desc_text">
          <div class="">
            {{
              data.description !== ""
                ? data.description
                : `It’s how we’ve
            always described our bars. What’s inside.
            What isn’t. We think it’s everything you need...`
            }}
            <!-- <q-btn
              style="min-height: 0; padding: 0; text-transform: capitalize"
              flat
              class="text-weight-bold"
            >
              Read more
            </q-btn> -->
          </div>

          <q-btn @click="businessDetailsModal = true" class="outline">
            <img src="/images/editbtn.svg" alt="" />
            <span>Edit</span> <span>| Details</span>
          </q-btn>
        </div>
        <div
          v-if="grandselectedCollectionProducts.length"
          class="responsive_autofit_grid container"
        >
          <DashboardHomeListingVue
            v-for="(listing, index) in sortedProducts"
            :key="index"
            :listing="listing"
          />
        </div>
        <div v-else class="empty">
          <img src="/images/empty.svg" alt="" />

          <div class="empty_text">
            You currently have not listed any products under this collection
          </div>
        </div>
      </div>
    </div>
    <div v-if="data.segments === 'Segment C'" class="segment_wrap">
      <div class="row manage_seg q-mr-md justify-end">
        <div class="left_paragraph">
          <q-btn @click="segmentsModal = true" class="outline">
            <img src="/images/editbtn.svg" alt="" />
            Manage <span>| Segment</span>
          </q-btn>
        </div>
      </div>
      <div class="mobile_categories">
        <div class="row items-center no-wrap justify-center">
          <q-btn-dropdown
            flat
            class="drop"
            color="white"
            label="All Collections"
          >
            <q-list>
              <q-item clickable v-close-popup @click="showCollectionsFnc">
                <q-item-section>
                  <q-item-label>All Collections</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <div class="input_search">
            <input
              v-if="showCollections"
              v-model="sortedCollections"
              placeholder="Search collections..."
              type="text"
            />
            <input
              v-if="!showCollections"
              v-model="sortingcolCriteria"
              placeholder="Search products..."
              type="text"
            />
            <i class="fa-solid text-primary fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
      <div class="top container">
        <div class="sort_area">
          <div class="left">
            <div class="segmentA">All Collections</div>
          </div>

          <div class="right">
            <div class="input_search">
              <input
                v-if="showCollections"
                v-model="sortedCollections"
                placeholder="Search collections..."
                type="text"
              />
              <input
                v-if="!showCollections"
                v-model="sortingcolCriteria"
                placeholder="Search products..."
                type="text"
              />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="holder">
        <div class="desc_text">
          <div class="">
            {{
              data.description !== ""
                ? data.description
                : `It’s how we’ve
            always described our bars. What’s inside.
            What isn’t. We think it’s everything you need...`
            }}
            <!-- <q-btn
              style="min-height: 0; padding: 0; text-transform: capitalize"
              flat
              class="text-weight-bold"
            >
              Read more
            </q-btn> -->
          </div>

          <q-btn @click="businessDetailsModal = true" class="outline">
            <img src="/images/editbtn.svg" alt="" />
            <span>Edit</span> <span>| Details</span>
          </q-btn>
        </div>

        <!-- {{ collections.length }} -->
        <div v-if="showCollections">
          <div
            v-if="collections.length"
            class="responsive_autofit_grid q-pt-lg q-pb-xl container"
          >
            <div
              @click="selectCollection(collection)"
              v-for="(collection, index) in sortCollections"
              :key="index"
            >
              <img :src="collection.avatar.url" alt="" />
              <div class="collection_name">
                {{ collection.name }}
              </div>
            </div>
          </div>
          <div v-else class="empty">
            <img src="/images/empty.svg" alt="" />

            <div class="empty_text">
              You currently have not created any collections
            </div>
          </div>
        </div>

        <div v-if="!showCollections">
          <div
            v-if="selectedCollectionProducts.length"
            class="responsive_autofit_grid container"
          >
            <DashboardHomeListingVue
              v-for="(listing, index) in sortedColProducts"
              :key="index"
              :listing="listing"
            />
          </div>
          <div v-else class="empty">
            <img src="/images/empty.svg" alt="" />

            <div class="empty_text">
              You currently have not listed any products on this collection
            </div>
          </div>

          <div class="flex justify-center">
            <q-btn
              @click="showCollectionsFnc"
              v-if="!showCollections"
              flat
              class="showcollections"
            >
              Show Collections
            </q-btn>
          </div>
        </div>
      </div>
    </div>

    <q-dialog :style="colorSchemeStyles" v-model="businessDetailsModal">
      <q-card class="card modal">
        <div class="row items-center justify-between">
          <div class="title">Business Details</div>
          <q-btn flat @click="businessDetailsModal = false" class="close">
            <i class="fa-light fa-xmark"></i>
          </q-btn>
        </div>
        <div class="row q-mt-lg no-wrap items-center justify-between">
          <div :class="namevalue ? 'det active_' : 'det'">
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
          <div :class="tagvalue ? 'det active_' : 'det'">
            <div class="business_name">Tagline</div>
            <input
              :disabled="enableTagEdit"
              v-model="data.business_tagline"
              class="company"
            />
          </div>
          <q-toggle v-model="tagvalue" />
        </div>
        <div class="row no-wrap items-center justify-between">
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
            v-model="data.description"
            filled
            class="texta"
            style="color: black"
            label="Write a brief summary about your business...."
            type="textarea"
          />
        </div>

        <div class="submit">
          <q-btn
            @click="businessDetailsModal = false"
            class="submitBTN bg-newcolor"
          >
            Save Changes
          </q-btn>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog :style="colorSchemeStyles" v-model="uploadModal">
      <q-card class="card modal">
        <div class="row items-center justify-between">
          <div class="title">Upload Images</div>
          <q-btn flat @click="uploadModal = false" class="close">
            <i class="fa-light fa-xmark"></i>
          </q-btn>
        </div>
        <div class="row q-mt-sm items-center justify-between">
          <div class="previewMain">
            <div v-if="showlogovalue" class="form">
              <q-file
                type="file"
                v-model="data.uploads"
                accept=".jpg,.png,.svg,.jpeg"
                name="uploads"
                @update:model-value="setFile"
                class="previewinput"
              />

              <div class="previewDiv">
                <img :src="preview" class="previewimg" />
                <img src="/images/upload.png" class="click" alt="" />
              </div>
            </div>
            <div v-else class="form">
              <div class="initials">{{ initials }}</div>
            </div>
          </div>
        </div>
        <div class="row q-my-md items-center no-wrap justify-between">
          <div class="det">
            <div class="business_name">Branding</div>
            <div class="company">Show Profile Image</div>
          </div>
          <q-toggle v-model="showlogovalue" />
        </div>

        <div class="submit">
          <q-btn flat @click="uploadModal = false" class="submitBTN q-btn"
            >Save Changes</q-btn
          >
        </div>
      </q-card>
    </q-dialog>
    <q-dialog :style="colorSchemeStyles" v-model="uploadCoverModal">
      <q-card class="card modal">
        <div class="row items-center justify-between">
          <div class="title">Upload Cover Photo</div>
          <q-btn flat @click="uploadCoverModal = false" class="close">
            <i class="fa-light fa-xmark"></i>
          </q-btn>
        </div>
        <div class="row q-mt-sm items-center justify-between">
          <div class="previewMain">
            <div v-if="covervalue" class="form">
              <q-file
                type="file"
                v-model="data.coveruploads"
                accept=".jpg,.png,.svg,.jpeg"
                name="uploads"
                @update:model-value="setcoverFile"
                class="previewinput"
              />

              <div class="previewDiv">
                <img :src="coverpreview" class="previewimg cover" />
                <img src="/images/upload.png" class="click" alt="" />
              </div>
            </div>
            <div v-else class="form">
              <div class="initialsCover"></div>
            </div>
          </div>
        </div>
        <div class="row q-my-md items-center no-wrap justify-between">
          <div class="det">
            <div class="business_name">Branding</div>
            <div class="company">Show Cover Image</div>
          </div>
          <q-toggle v-model="covervalue" />
        </div>

        <div class="submit">
          <q-btn flat @click="uploadCoverModal = false" class="submitBTN q-btn"
            >Save Changes</q-btn
          >
        </div>
      </q-card>
    </q-dialog>

    <q-dialog :style="colorSchemeStyles" v-model="segmentsModal">
      <q-card class="card modal">
        <div class="row items-center justify-between">
          <div class="title">Segments</div>
          <q-btn flat @click="segmentsModal = false" class="close">
            <i class="fa-light fa-xmark"></i>
          </q-btn>
        </div>
        <div
          v-for="segment in segments"
          :key="segment.name"
          @click="checkSegment(segment)"
          :class="
            segment.name === data.segments
              ? 'row q-mt-lg modal_segs active_segment no-wrap items-center justify-between'
              : 'row q-mt-lg no-wrap items-center justify-between'
          "
        >
          <div class="det row no-wrap items-center q-col-gutter-md">
            <div class="img">
              <img src="/images/segment1.svg" alt="" />
            </div>

            <div class="category">{{ segment.showname }}</div>
          </div>
          <q-radio v-model="data.segments" :val="segment.name" />
        </div>
      </q-card>
    </q-dialog>
    <q-dialog :style="colorSchemeStyles" v-model="pageLayoutModal">
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
          <div
            @click="checkLayout(pageLayout)"
            v-for="(pageLayout, index) in pageLayouts"
            :key="index"
            class="layout"
          >
            <img src="/images/layout1.png" alt="" />
            <div class="row items-center justify-between">
              <div class="layout_text">{{ pageLayout.name }}</div>
              <q-radio
                color="secondary"
                v-model="data.pageLayout"
                :val="pageLayout.name"
              />
            </div>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog :style="colorSchemeStyles" v-model="colorschemeModal">
      <q-card class="card colorscheme modal">
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
            <input
              v-model="colorschemesearch"
              placeholder="Search color schemes..."
              type="text"
            />
            <i class="fa-solid text-primary fa-magnifying-glass"></i>
          </div>
        </div>

        <div
          v-for="(scheme, index) in sortedschemes"
          :key="index"
          @click="checkScheme(scheme)"
          class="q-mt-sm scheme items-center justify-between"
        >
          <div class="color">
            <div class="color_text">{{ scheme.name }}</div>

            <div
              style="gap: 0.5rem"
              class="row no-wrap justify-between items-center"
            >
              <div
                style="gap: 0.5rem"
                class="row no-wrap justify-between items-center"
              >
                <div
                  :style="`width:29.13px; height:29.08px; background: ${color}`"
                  v-for="color in scheme.colors"
                  :key="color"
                ></div>
              </div>
              <q-radio
                color="secondary"
                v-model="data.colorScheme"
                :val="scheme.name"
              />
            </div>
          </div>
          <!-- <q-radio
            color="secondary"
            v-model="data.colorScheme"
            :val="scheme.name"
          /> -->
        </div>
        <!-- {{ data.colorScheme }} -->
      </q-card>
    </q-dialog>

    <q-drawer
      v-model="drawer"
      :width="200"
      :breakpoint="700"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'white'"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list class="q-px-md q-py-xl" padding>
          <div
            @click="colorschemeModal = true"
            class="span q-col-gutter-x-sm row items-center"
          >
            <img src="/images/scheme.svg" alt="" /> <span>Color Scheme</span>
          </div>
          <!-- <q-seperator /> -->
          <div
            @click="pageLayoutModal = true"
            class="span q-col-gutter-x-sm row items-center"
          >
            <img src="/images/layout.svg" alt="" /> <span>Page Layout</span>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
import { ref } from "vue";
import DashboardHomeListingVue from "src/components/listings/DashboardHomeListing.vue";
export default {
  data() {
    return {
      description: "",
      data: {
        colorScheme: "default",
        pageLayout: "Default",
        segments: "Segment B",
        description: "",
        uploads: null,
        coveruploads: null,
      },
      value: false,
      drawer: false,
      tagvalue: false,
      namevalue: false,
      enableEdit: true,
      covervalue: false,
      enableTagEdit: true,
      logoUploaded: "",
      coverUploaded: "",
      coverpreview: "/images/sqrpreview.png",
      preview: "/images/sqrpreview.png",
      ratingModel: ref(4),
      vendor: {},
      businessDetailsModal: false,
      showlogovalue: false,
      uploadModal: false,
      uploadCoverModal: false,
      // preview: "/images/sqrpreview.png",
      segmentsModal: false,
      radio: false,
      loading: true,
      pageLayoutModal: false,
      colorschemeModal: false,
      colorScheme: "default",
      pageLayout: "grid",
      collections: [],
      showCollections: true,
      products: [],
      collectionsArr: [],
      allProductsArr: [],
      grandAllProductsArr: [],
      selectedCollectionId: null,
      grandselectedCollectionId: "allpro",
      selectedCollectionProducts: [],
      grandselectedCollectionProducts: [],
      sortingCriteria: "",
      sortingcolCriteria: "",
      colorschemesearch: "",
      sorted: "",
      sortedCollections: "",
      colorSchemes: [
        {
          name: "default",
          variables: {
            "--primary-color": "#000000",
            "--secondary-color": "#EE4E36",
            "--color-one": "#1F7BB5",
            "--color-two": "#CEDFEB",
            "--color-three": "#CCCCCC",
            "--color-four": "rgba(31, 123, 181, 0.4)",
            // Add more CSS variables for the color scheme
          },
          colors: [
            "#000",
            "#EE4E36",
            "#1F7BB5",
            "rgba(31, 123, 181, 0.57)",
            "#CCCCCC",
          ],
        },
        // {
        //   name: "dark",
        //   img: "",
        //   variables: {
        //     "--primary-color": "#000",
        //     "--secondary-color": "#1C9E73",
        //     "--color-one": "#33CC99",
        //     "--color-two": "#93E6CA",
        //     "--color-three": "#CCCCCC",
        //     // Add more CSS variables for the color scheme
        //   },
        //   colors: ["#000", "#1C9E73", "#33CC99", "#93E6CA", "#CCCCCC"],
        // },
        {
          name: "Mint Green",
          img: "",
          variables: {
            "--primary-color": "#000",
            "--secondary-color": "#1C9E73",
            "--color-one": "#33CC99",
            "--color-two": "#93E6CA",
            "--color-three": "#CCCCCC",
            "--color-four": "rgb(51, 204, 153,.2)",
            // Add more CSS variables for the color scheme
          },
          colors: ["#000", "#1C9E73", "#33CC99", "#93E6CA", "#CCCCCC"],
        },
        {
          name: "Purple",
          variables: {
            "--primary-color": "#000",
            "--secondary-color": "#461FB5",
            "--color-one": "#B336EE",
            "--color-two": "rgba(160, 31, 181, 0.57)",
            "--color-three": "#CCCCCC",
            "--color-four": "rgba(160, 31, 181, 0.27)",
            // Add more CSS variables for the color scheme
          },

          colors: [
            "#000",
            "#461FB5",
            "#B336EE",
            "rgba(160, 31, 181, 0.57)",
            "#CCCCCC",
          ],
        },
        {
          name: "Yellow",
          variables: {
            "--primary-color": "#000",
            "--secondary-color": "#CB9200",
            "--color-one": "#D9C831",
            "--color-two": "rgba(202, 220, 0, 0.57)",
            "--color-three": "#CCCCCC",
            "--color-four": "rgba(202, 220, 0, 0.27)",
            // Add more CSS variables for the color scheme
          },
          colors: [
            "#000",
            "#CB9200",
            "#D9C831",
            "rgba(202, 220, 0, 0.57)",
            "#CCCCCC",
          ],
        },
        {
          name: "Blue",
          variables: {
            "--primary-color": "#000",
            "--secondary-color": "#002C83",
            "--color-one": "#1F7BB5",
            "--color-two": "rgba(31, 123, 181, 0.57)",
            "--color-three": "#CCCCCC",
            "--color-four": "rgba(31, 123, 181, 0.27)",
            // Add more CSS variables for the color scheme
          },
          colors: [
            "#000",
            "#002C83",
            "#1F7BB5",
            "rgba(31, 123, 181, 0.57)",
            "#CCCCCC",
          ],
        },
        {
          name: "Red",
          variables: {
            "--primary-color": "#000",
            "--secondary-color": "#920000",
            "--color-one": "#D93131",
            "--color-two": "rgba(220, 0, 0, 0.57)",
            "--color-three": "#CCCCCC",
            "--color-four": "rgba(220, 0, 0, 0.27)",
            // Add more CSS variables for the color scheme
          },

          colors: [
            "#000",
            "#920000",
            "#D93131",
            "rgba(220, 0, 0, 0.57)",
            "#CCCCCC",
          ],
        },
        // Add more color schemes
      ],

      pageLayouts: [
        {
          name: "Default",
          class: "grid-layout",
          // Add more properties specific to the grid layout
        },
        // {
        //   name: "flexbox",
        //   class: "flexbox-layout",
        //   // Add more properties specific to the flexbox layout
        // },
        // Add more page layouts
      ],

      segments: [
        {
          name: "Segment A",
          showname: "Display all products",
          class: "segment-a",
          // Add more properties specific to the segment
        },

        {
          name: "Segment B",
          showname: "Display Categorized collections",
          class: "segment-b",
          // Add more properties specific to the segment
        },

        {
          name: "Segment C",
          showname: "Display Collections",
          class: "segment-c",
          // Add more properties specific to the segment
        },
        // Add more segment options
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
    showlogovalue: {
      handler() {
        if (this.showlogovalue === true) {
          this.preview = "/images/sqrpreview.png";
        } else {
        }
      },
      immediate: true,
    },
    covervalue: {
      handler() {
        if (this.covervalue === true) {
          // this.preview = "/images/sqrpreview.png";
        } else {
        }
      },
      immediate: true,
    },
    "data.segments": {
      handler() {
        this.$q.loading.show({
          message: "Your changes are taking effect",
        });
        setTimeout(() => {
          this.$q.loading.hide();
        }, 1000);
        // console.log(this.data.segments);
      },
      immediate: true,
    },
    "data.pageLayout": {
      handler() {
        // console.log(this.data.pageLayout);
        // console.log(this.data.segments);
      },
      immediate: true,
    },
  },

  components: {
    DashboardHomeListingVue,
  },

  created() {
    this.getVendor();
    this.getCollections();
    this.loadData();
  },

  computed: {
    initials() {
      // Logic to extract initials from the person's name
      // Replace this with your own implementation
      const name = this.data.business_name
        ? this.data.business_name
        : "Hello there";
      // const nameParts = name.split(" ");
      // let initials = "";

      const nameParts = name.split(" ");
      const initials = nameParts.map((part) => part.charAt(0)).join("");
      return initials;

      // if (nameParts.length > 0) {
      //   initials += nameParts[0][0].toUpperCase();

      //   if (nameParts.length > 1) {
      //     initials += nameParts[nameParts.length - 1][0].toUpperCase();
      //   }
      // }

      // if (nameParts.length > 0) {
      //   initials += nameParts[0].substring(0, 3).toUpperCase();

      //   if (nameParts.length > 1) {
      //     initials += nameParts[nameParts.length - 1][0].toUpperCase();
      //   }
      // }

      // return initials;
    },
    colorSchemeStyles() {
      const selectedScheme = this.colorSchemes.find(
        (scheme) => scheme.name === this.data.colorScheme
      );
      this.data.selectedcoScheme = selectedScheme;
      return selectedScheme ? selectedScheme.variables : {};
    },
    pageLayoutClass() {
      const selectedLayout = this.pageLayouts.find(
        (layout) => layout.name === this.pageLayout
      );
      return selectedLayout ? selectedLayout.class : "";
    },

    sortedProducts() {
      let products = this.grandselectedCollectionProducts;

      if (this.sortingCriteria) {
        // products = products.sort((a, b) => a.name.localeCompare(b.name));
        products = products.filter((product) =>
          product.name
            .toLowerCase()
            .includes(this.sortingCriteria.toLowerCase())
        );
      }

      return products;
    },
    sortedColProducts() {
      let products = this.selectedCollectionProducts;

      if (this.sortingcolCriteria) {
        products = products.filter((product) =>
          product.name
            .toLowerCase()
            .includes(this.sortingcolCriteria.toLowerCase())
        );
      }

      return products;
    },

    sortedschemes() {
      let schemes = this.colorSchemes;

      if (this.colorschemesearch) {
        schemes = schemes.filter((schemes) =>
          schemes.name
            .toLowerCase()
            .includes(this.colorschemesearch.toLowerCase())
        );
      }

      return schemes;
    },
    sortproducts() {
      let products = this.products;

      if (this.sorted) {
        products = products.filter((product) =>
          product.name.toLowerCase().includes(this.sorted.toLowerCase())
        );
      }

      return products;
    },
    sortCollections() {
      let products = this.collections;

      if (this.sortedCollections) {
        products = products.filter((product) =>
          product.name
            .toLowerCase()
            .includes(this.sortedCollections.toLowerCase())
        );
      }

      return products;
    },
  },

  methods: {
    // toggleView(view) {
    //   console.log(view);
    //   if (view === "mobile") {
    //     window.innerWidth = 450;
    //   } else {
    //     window.innerWidth = window.screen.width;
    //   }
    // },
    // toggleView(view) {
    //   if (view === "mobile") {
    //     const mobileWindow = window.open("", "_blank", `width=450,height=800`);
    //     mobileWindow.resizeTo(450, window.outerHeight);
    //   } else {
    //     // window.location.reload();
    //   }
    // },
    // toggleView(view) {
    //   // if (view === "mobile") {
    //   //   const mobileWindow = window.open("", "_blank", `width=450,height=800`);
    //   //   mobileWindow.document.write(`
    //   //     <html>
    //   //       <head>
    //   //         <title>Mobile View</title>
    //   //       </head>
    //   //       <body>
    //   //         ${document.documentElement.innerHTML}
    //   //       </body>
    //   //     </html>
    //   //   `);
    //   //   mobileWindow.document.close();
    //   // } else {
    //   //   window.location.reload();
    //   // }
    //   if (view === "mobile") {
    //     // console.log(window.location.href);
    //     const mobileWindow = window.open(
    //       `${window.location.href}/business/page-builder`,
    //       "_blank",
    //       `width=450,height=800`
    //     );
    //     mobileWindow.document.open();
    //     mobileWindow.document.write(document.documentElement.outerHTML);
    //     mobileWindow.document.close();
    //   } else {
    //     window.location.reload();
    //   }
    // },
    toggleView(view) {
      if (view === "mobile") {
        window.addEventListener("beforeunload", this.openMobileView);
        window.open(window.location.href, "_blank", `width=450,height=800`);
      } else {
        // window.location.reload();
        // if (this.mobileWindow) {
        //   this.mobileWindow.close();
        // }
      }
    },
    openMobileView() {
      const mobileWindow = window.open("", "_blank", `width=450,height=800`);
      mobileWindow.document.write(document.documentElement.outerHTML);
      mobileWindow.document.close();
      window.removeEventListener("beforeunload", this.openMobileView);
    },
    checkLayout(arg) {
      // console.log(this.data.pageLayout);
      // console.log(this.data);
      this.data.pageLayout = arg.name;
      // console.log(arg);
    },
    checkScheme(arg) {
      this.data.colorScheme = arg.name;
    },
    checkSegment(arg) {
      this.data.segments = arg.name;
    },
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

    selectCollection(collection) {
      // console.log(collection);
      this.selectedCollectionId = collection.id;
      this.selectedCollectionProducts = collection.products;
      this.showCollections = false;
    },
    grandselectCollection(collection) {
      // console.log(collection);
      if (collection.name === "All products") {
        this.grandselectedCollectionProducts = this.allProductsArr;
      } else {
        const selectedCollection = this.collectionsArr.find(
          (c) => c.id === collection.id
        );
        // console.log(selectedCollection);
        this.grandselectedCollectionProducts = selectedCollection.products;
        // this.grandselectedCollectionProducts = this.allProductsArr.filter(
        //   (product) => selectedCollection.products.includes(product)
        // );
      }
      this.grandselectedCollectionId = collection.id;
    },

    showCollectionsFnc() {
      this.selectedCollectionId = null;
      this.selectedCollectionProducts = [];
      this.showCollections = true;
    },

    previewRender() {
      // console.log(datar);
      // const reader1 = new FileReader();
      // const reader2 = new FileReader();
      // if (this.data.uploads && this.data.coveruploads) {
      // if (this.data.coveruploads) {
      // this.loading = true;

      // reader1.onload = () => {
      //   const base64Data = reader1.result.split(",")[1];
      //   this.data.uploads = base64Data;
      // };
      // reader2.onload = () => {
      //   const base64Data2 = reader2.result.split(",")[1];
      //   this.data.coveruploads = base64Data2;
      // };

      // reader1.readAsDataURL(this.data.uploads);
      // reader2.readAsDataURL(this.data.coveruploads);

      // setTimeout(() => {
      //   this.loading = false;
      //   this.$store.leegoluauth.pageBuilderData = this.data;
      //   // this.coverUploaded =
      //   // this.readFileData();

      //   this.$router.replace({
      //     name: "vendor.page",
      //     params: { slug: this.$store.leegoluauth.vendor.slug },
      //   });
      // }, 2000);istores/builder/update
      // let persistBuilder = this.data;
      const formData = new FormData();
      formData.append("coverimg", this.data.coveruploads);
      formData.append("logo", this.data.uploads);
      // formData.append(
      //   "selectedcoScheme",
      //   JSON.stringify(this.data.selectedcoScheme)
      // );
      // formData.append("METHOD", "PUT");
      formData.append("business_name", this.data.business_name);
      formData.append("description", this.data.description);
      formData.append("business_tagline", this.data.business_tagline);
      formData.append("colorScheme", this.data.colorScheme);
      formData.append("pageLayout", this.data.pageLayout);
      formData.append("segments", this.data.segments);
      formData.append("initials", this.initials);
      formData.append(
        "selectedcoScheme[name]",
        this.data.selectedcoScheme.name
      );
      // formData.append(
      //   "selectedcoScheme[colors]",
      //   this.data.selectedcoScheme.colors
      // );
      formData.append(
        "selectedcoScheme[colors][]",
        this.data.selectedcoScheme.colors[0]
      );
      formData.append(
        "selectedcoScheme[colors][]",
        this.data.selectedcoScheme.colors[1]
      );
      formData.append(
        "selectedcoScheme[colors][]",
        this.data.selectedcoScheme.colors[2]
      );
      formData.append(
        "selectedcoScheme[colors][]",
        this.data.selectedcoScheme.colors[3]
      );
      formData.append(
        "selectedcoScheme[colors][]",
        this.data.selectedcoScheme.colors[4]
      );
      formData.append(
        "selectedcoScheme[variables][--primary-color]",
        this.data.selectedcoScheme.variables["--primary-color"]
      );
      formData.append(
        "selectedcoScheme[variables][--secondary-color]",
        this.data.selectedcoScheme.variables["--secondary-color"]
      );
      formData.append(
        "selectedcoScheme[variables][--color-one]",
        this.data.selectedcoScheme.variables["--color-one"]
      );
      formData.append(
        "selectedcoScheme[variables][--color-two]",
        this.data.selectedcoScheme.variables["--color-two"]
      );
      formData.append(
        "selectedcoScheme[variables][--color-three]",
        this.data.selectedcoScheme.variables["--color-three"]
      );
      formData.append(
        "selectedcoScheme[variables][--color-four]",
        this.data.selectedcoScheme.variables["--color-four"]
      );

      this.$q.loading.show({
        message: "Your changes are taking effect",
      });
      this.$api
        .post(
          `${this.$store.leegoluauth.vendorDetails.slug}/builder/update`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log("Success:", response);
          this.$q.loading.hide();
          this.$q.notify({
            message: response.data.message,
            color: "green",
            position: "bottom",
          });
          this.$router.replace({
            name: "vendor.page",
            params: { slug: this.$store.leegoluauth.vendorDetails.slug },
          });
        })
        .catch(({ response }) => {
          // console.log(response);
          this.errors = response.data.message;
          this.$q.loading.hide();
          this.$q.notify({
            message: response.data.message,
            color: "red",
            position: "bottom",
            actions: [{ icon: "close", color: "white" }],
          });
        });
      // } else {
      //   this.$q.notify({
      //     message: "Please upload a cover photo and a logo",
      //     color: "red",
      //   });
      // }

      // console.log(this.data);
    },

    async loadData() {
      try {
        const [collections, allProducts] = await Promise.all([
          this.loadCollections(),
          this.loadAllProducts(),
        ]);
        this.collectionsArr = collections;
        this.allProductsArr = allProducts;
        this.grandselectedCollectionProducts = allProducts;

        // console.log(collections, allProducts);
        this.combineProducts();
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
    loadCollections() {
      return this.$api
        .get(`collection/${this.$store.leegoluauth.vendorDetails.slug}/all`)
        .then((response) => response.data.data);
    },
    loadAllProducts() {
      return this.$api
        .get(`vendor/${this.$store.leegoluauth.vendorDetails.slug}`)
        .then((response) => response.data.vendor.products);
    },
    combineProducts() {
      let allPData = {
        name: "All products",
        id: "allpro",
        products: [...this.allProductsArr],
      };
      this.grandAllProductsArr = [allPData, ...this.collectionsArr];
    },

    getVendor() {
      this.loading = true;
      this.$api
        .get(`vendor/${this.$store.leegoluauth.vendorDetails.slug}`)
        .then((response) => {
          this.vendor = response.data.vendor;
          this.products = response.data.vendor.products;
          this.loading = false;
          this.data.business_name = response.data.vendor.business_name;
          this.data.business_tagline = "";
          // console.log(response);
        })
        .catch(({ response }) => {
          this.loading = false;
        });
    },

    getCollections() {
      this.$api
        .get(`collection/${this.$store.leegoluauth.vendorDetails.slug}/all`)
        .then(({ data }) => {
          // console.log(data);
          this.collections = data.data;
          this.loading = false;
        })
        .catch(({ response }) => {
          // console.log(response);
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
  border: 1px dashed var(--primary-color);
  margin: 8rem auto 4rem;
  width: 95%;
}

.upload_logo_area {
  width: 95%;
  margin: 0 auto;
}

.segment_wrap .left_paragraph .outline.q-btn {
  margin-top: -4rem;
}

.nav_area {
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  margin: 0.5rem auto;
  padding-left: 1.3rem;
  padding-right: 1.3rem;
  position: sticky;
  top: 0.4%;
  z-index: 100;
  width: 95%;
  height: 59px;
  max-width: 100%;
  // color: rgb(51, 204, 153,.2);
}

.logo {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  color: var(--primary-color);
}
.right_nav img {
  width: 25px;
  height: 21px;
}
.editor_hero {
  height: 40vh;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  position: relative;
  width: 95%;
  margin: 0 auto;
  background: var(--color-one);
}

.left_paragraph .outline.q-btn {
  margin-left: 0.4rem;
}

.mobile {
  max-width: 450px;
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
  color: var(--primary-color);
}

.desktop_icon {
  background: rgba(160, 160, 160, 0.51);
  border-radius: 19px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rating .rate {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  line-height: 10px;
  color: #000000;
}

.nav_btn_icon {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  color: #000000;
}

.nav_btn_icon span {
  white-space: nowrap;
}

.initialsCover {
  width: 296px;
  height: 256px;
  // border-radius: 50%;
  background-color: var(--color-one);
}

.initials {
  width: 296px;
  height: 256px;
  // border-radius: 50%;
  background-color: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  font-family: "PT Serif";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 21px;
  display: flex;
  border-radius: 10px;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  color: #ffffff;
}

.editor_hero .q-btn span {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: var(--primary-color);
}

.color_text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 12px;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.preview {
  margin: 0 1.5rem;
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

.preview,
.right .none_ {
  background: var(--color-one);
  color: #fff;
  width: 115px;
  height: 39px;
  text-transform: capitalize;
  border-radius: 5px;
}

.preview {
  background: #1f7bb5;
}

@media (min-width: 980px) {
  .preview,
  .right .none_ {
    width: auto;
  }
}

.collection_name {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
}

.q-btn.none_,
.showcollections {
  background: var(--secondary-color);
  color: #a15858;
}

.q-btn.none_ img {
  width: 17px;
  height: 17px;
}

.search {
  margin-top: 1rem;
}

.drop {
  background: var(--color-one);
  color: white;
  border: 0.5px solid var(--color-one);
  border-radius: 20px;
  text-transform: capitalize;
}

.left_details_desc {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-top: 4px;
  color: var(--primary-color);
}

@media (min-width: 700px) {
  .left_details_desc {
    margin-top: 0;
  }
}

.segmentA {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #010101;
}

.desc_text {
  padding: 0 1.5rem;
}
.desc_text .des_ {
  width: 90%;
}

.active_segment {
  background: #ffffff;
  border: 3px solid #1f7bb5 !important;
  border-radius: 17px !important;
  padding: 1rem;
}

.desc_text,
.desc_text .q-btn {
  display: none;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  color: var(--primary-color);
}
.desc_text > .q-btn {
  margin-top: 0.5rem;
}

.desc_text .q-btn span,
.desc_text .q-btn img {
  position: relative;
}

.det {
  width: 100%;
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
  color: var(--color-one);
  margin-top: 0.3rem;
  // color: #1f7bb5;
}

.left_details_title {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: var(--primary-color);
}

.left_paragraph {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: var(--primary-color);
}

.left_wrap .left_paragraph {
  padding-bottom: 1rem;
  white-space: nowrap;
}

.layout {
  margin: 1rem 0;
}

.none_desktop {
  display: none;
}

.none_desktop.q-btn {
  color: var(--color-one) !important;
  text-transform: capitalize;
  text-align: center;
  background: white;
  // background: var(--secondary-color);
  // background: var(--color-one) !important;
}

.layout_text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: var(--primary-color);
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

.right .q-btn.none_ {
  white-space: nowrap;
  width: auto;
}

.upload_logo_area {
  background: var(--color-two);
  // background: var(--primary-color);
  // background: #cedfeb;
  height: 132px;
}
.upload_wrap {
  padding-top: 1.2rem;
}

.left_logo_area img {
  width: 147.72px;
  height: 147.72px;
  border: 6px solid var(--color-two);
  // border: 6px solid #cedfeb;
  border-radius: 10px;
}

.left_logo_area .logoside {
  width: 147.72px;
  height: 147.72px;
  border: 6px solid var(--color-two);
  border-radius: 10px;
  margin-bottom: 0.5rem;
  background: #000000;
  border-radius: 10px;
}

.left_logo_area {
  position: relative;
}

.left_logo_area .outline.q-btn {
  position: absolute;
  bottom: 20%;
  background: #ffffff;
  left: -5%;
  z-index: 5;
}

.outline.q-btn {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  text-transform: capitalize;
  color: var(--primary-color);
  padding: 4px 8px;
  background: #ffffff;
}

.outline.q-btn img {
  width: 25px;
  height: 25px;
  border: none;
  margin: 0 0.3rem 0 0;
}

.outline.q-btn::before {
  background: #ffffff;
  border: 1px solid var(--primary-color);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.44);
  border-radius: 5px 5px 0px 0px;
}
.outline.q-btn span {
  font-weight: 500;
  margin-left: 0.3rem;
}

.sort_area {
  // background: #f5f5f5;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0 0;
  margin: 0.1rem 0 1rem;
  flex-wrap: nowrap;
  padding-bottom: 0.6rem;
  // overflow-x: scroll;
}

.sort_area .left {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: scroll;
  gap: 1rem;
}

.sort_area .left::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

.sort_area .left::-webkit-scrollbar-track {
  background: #f4f4f4;
}

.sort_area .left::-webkit-scrollbar-thumb {
  background-color: #ee4e36;
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
  white-space: nowrap;
  background: var(--color-one);
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
  white-space: nowrap;
  color: var(--primary-color);
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
  width: 95%;
  margin: 0 auto;
}

.holder {
  background: #ffffff;
  // width: 95%;
  // margin: 0 auto;
}

@media (min-width: 980px) {
  .holder {
    background: none;
  }
}

.holder .responsive_autofit_grid {
  // width: 95%;
  // margin: 0 auto;
  padding-bottom: 3rem;
  gap: 2rem 1rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
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
  color: #000;
  // color: #9a9a9a;
  padding: 1rem;
  height: 42px;
  width: 100%;
}

.input_search i {
  padding: 1rem;
  font-size: 1rem;
  color: var(--color-one) !important;
}

.colorscheme .scheme {
  margin-bottom: 1rem;
}
.card {
  padding: 1rem;
  min-width: 363px;
  background: #ffffff;
  width: 466px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 9px;
  position: relative;
  // height: 522px;
}

.modal label {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  display: block;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.modal .title {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: var(--primary-color);
}

.modal .business_name {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: var(--primary-color);
}

.modal .company {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  width: 100%;
  color: var(--primary-color);
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
.submit .submitBTN {
  width: 100%;
  height: 55px;
  background: var(--color-one);
  border-radius: 5px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  text-transform: capitalize;
  text-align: center;
  color: white;
}

.manage_seg .q-btn {
  margin-right: 1.5rem;
}

.submit .submitBTN .q-btn__content {
  justify-content: center;
}
.close {
  font-size: 2rem;
  min-height: 0;
  position: absolute;
  top: 2%;
  right: 3%;
}
.close i {
  color: var(--color-two);
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
  background: url("/images/sqrpreview.png") no-repeat center;
  background-position: center;
  background-size: cover;
  height: 256px;
}
.previewDiv::before {
  position: absolute;
  content: "";
  background: rgba(0, 0, 0, 0.3);
  // border: 6px solid var(--color-one);
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
  height: 100%;
  max-height: 280px;
  border-radius: 0;
  border: none;
}
.form img.previewimg.cover {
  width: 296px;
  height: 256.55px;
  border-radius: 0;
  border: none;
  position: relative;
  object-fit: cover;
  // z-index: -1;
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
.sort_area .right {
  padding-top: 0rem;
}

.active_ {
  background: linear-gradient(0deg, #d9d9d9 -10%, rgba(217, 217, 217, 0) 80%);
  border-bottom: 1px solid #1f7bb5;
}

@media (max-width: 1250px) {
  .holder .responsive_autofit_grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 1050px) {
  .left_logo_area .outline.q-btn {
    left: -2%;
  }

  .segment_wrap {
    margin: 6rem auto 0rem;
  }
}
@media (max-width: 971px) {
  // .form img.previewimg.cover {
  //   width: 100%;
  // }
  .left_logo_area .outline.q-btn {
    right: -30%;
  }

  .holder .responsive_autofit_grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  .lay {
    // display: none;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0 1rem;
  }

  // .right_nav .q-ml-xl {
  //   margin-left: 0.3rem !important;
  // }
  .preview {
    margin: 0 0.5rem;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    width: 85px;
  }

  .left_paragraph .outline.q-btn img {
    width: 12px;
    height: 13px;
    margin-right: 0.3rem;
  }

  .mobile_categories {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    background: var(--color-four);
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

  .left_paragraph .q-btn {
    margin-top: 0.8rem;
  }

  .segment_wrap {
    margin-top: 7.5rem;
    background: transparent;
    border: none;
    width: 100%;
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

  .desc_text {
    padding: 1.5rem;
  }

  .manage_seg {
    margin-top: -48px;
  }
  .left_wrap .left_paragraph .q-btn {
    display: none;
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

  .desc_text,
  .desc_text .q-btn {
    display: inline-block;
  }

  .desc_text > .q-btn {
    display: flex;
  }
  .desc_text .q-btn {
    font-weight: 700;
  }

  // .responsive_autofit_grid {
  //   background: #fff;
  // }
}

@media (max-width: 700px) {
  .lay {
    display: none;
  }
  .menu {
    display: block;
    padding: 0;
    min-height: 0;
  }

  .outline.q-btn img {
    width: 15px;
    height: 12.75px;
  }

  .q-list .span span {
    font-size: 15px;
  }
  .search .input_search {
    height: 45px;
  }

  .color_text {
    font-size: 12px;
    margin-bottom: 0.2rem;
  }
  .q-list .span img {
    width: 26px;
    height: 26px;
  }

  .upload_logo_area {
    height: auto;
    padding-bottom: 0.5rem;
  }

  .fit .span {
    margin: 0.5rem 0;
  }
}
@media (min-width: 500px) {
  .hide_desktop {
    display: none;
  }
}
@media (max-width: 980px) {
  .submit .submitBTN {
    height: 45px;
    font-size: 15px;
  }

  .holder {
    width: 95%;
    margin: 0 auto;
  }
  .rating .rate {
    font-size: 8px;
  }
  .det .img img {
    width: 60px;
  }
  .modal .category {
    font-size: 13px;
  }
  // .holder .responsive_autofit_grid {
  //   grid-template-columns: repeat(1, 1fr);
  // }

  .holder .responsive_autofit_grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    // grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  .listing_s_hold {
    margin: 0.5rem 0;
  }

  .resp .modal .title {
    font-size: 16px;
  }

  .desc_text .outline.q-btn span {
    color: #000;
  }
  .logo {
    white-space: nowrap;
  }

  .desc_text .outline.q-btn img {
    width: 15px;
    height: 15px;
    margin: 0;
  }

  .lay {
    display: none;
  }

  .segment_wrap {
    margin-top: 2rem;
  }
  .desc_text {
    display: block;
    margin-bottom: 2rem;
    padding: 2rem 2rem 0;
  }

  // .holder {
  //   background-color: #ffffff;
  //   width: 95%;
  //   margin: 0 auto;
  // }

  // .holder .responsive_autofit_grid {
  //   width: 95%;
  //   margin: 0 auto;
  // }

  .left_logo_area {
    width: 100%;
  }

  .outline.q-btn {
    background: #ffffff;
    border: 1px solid #000000;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.44);
    border-radius: 5px;
  }

  .left_logo_area .outline.q-btn {
    // right: -1%;
    width: fit-content;
    right: 2%;
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
    margin-top: 10px;
  }
  .outline.q-btn,
  .outline.q-btn span {
    font-size: 10px;
    // height: 23px;
  }
  .editor_hero {
    height: 20vh;
  }

  .drop {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    color: #ffffff;
  }

  .nav_area {
    height: 45px;
    padding-left: 0.8rem;
    padding-right: 0.5rem;
  }

  .preview {
    height: 38.07px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .input_search {
    background: transparent;
    border: none;
  }

  .mobile_categories .input_search input {
    display: none;
  }

  .input_search i {
    font-size: 1.5rem;
  }

  .segment_wrap {
    width: 100%;
  }

  .right_nav .q-ml-xl {
    margin: 0;
    gap: 0rem !important;
  }
  .preview {
    margin: 0 0.1rem;
    width: 74.67px;
    height: 28.07px;
  }

  .desktop_icon {
    width: 30px;
    height: 30px;
  }

  .span .q-btn {
    padding: 5px;
    min-height: auto;
    text-transform: capitalize;
  }

  // .location {
  //   margin-bottom: 0.5rem;
  // }

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
  .upload_logo_area {
    margin-top: -8%;
    // margin-top: -20%;
  }
  .left_logo_area img,
  .left_logo_area .logoside {
    width: 83px;
    height: 83px;
    // margin-left: 1.4rem;
    margin-bottom: 0.3rem;
  }

  .left_logo_area {
    margin-bottom: 0.3rem;
  }

  .left_logo_area .logoside {
    background: #000000;
    border: 2px solid white;
    // border: 2px solid var(--color-one);
    border-radius: 10px;
  }

  // .left_wrap.mobile {
  //   padding-left: 1rem;
  // }

  .left_details {
    padding: 0;
  }

  .desktop_icon img {
    width: 22.69px;
    height: 22.69px;
  }

  .span img,
  .desktop_icon img {
    width: 16.69px;
    height: 16.69px;
  }

  .q-drawer .span img {
    width: 25px;
    height: 25px;
  }
  .colorscheme .scheme {
    margin-bottom: 0.5rem;
  }

  .modal_segs {
    margin-top: 13px;
  }
}

@media (max-width: 800px) {
  .upload_logo_area {
    margin-top: -10%;
    // margin-top: -20%;
  }
}
@media (max-width: 500px) {
  .upload_logo_area {
    // margin-top: -15%;
    margin-top: -18%;
  }
  .preview {
    margin: 0 0.5rem;
  }
  .manage_seg .q-btn {
    margin-right: 0rem;
  }

  .span.mobile {
    display: none;
  }
}
@media (max-width: 400px) {
  .upload_logo_area {
    // margin-top: -15%;
    margin-top: -20%;
  }
}
@media (max-width: 360px) {
  .span img {
    width: 15.69px !important;
    height: 15.69px !important;
  }
  .desktop_icon {
    width: 25px;
    height: 25px;
  }
  .right_nav .q-ml-xl {
    gap: 0rem !important;
  }

  // .holder .responsive_autofit_grid {
  //   grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  // }

  .desc_text {
    padding: 2rem 1rem 0;
  }
}
@media (max-width: 340px) {
  .logo {
    font-size: 14px;
  }

  .logo .q-btn {
    font-size: 12px;
  }

  .preview {
    margin: 0 0.1rem;
    width: 49.67px;
    height: 22.07px;
  }
}
</style>
