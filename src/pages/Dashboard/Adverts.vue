<template>
  <q-layout class="page_">
    <div class="">
      <q-card v-if="modal1" class="create_ad container">
        <div class="dialog_top">
          <img src="/images/flag.png" alt="" />
          <div class="create">Create advert</div>
        </div>

        <div class="text">
          Upload the shot that best sells your design. High quality images
          attract more customers. We recommend your images are taken by a
          professional and when possible get a model to wear them.
        </div>

        <div class="previewMain">
          <div class="form">
            <q-file
              type="file"
              v-if="edit"
              v-model="EditfilesImages"
              accept=".jpg,.png,.svg,.jpeg"
              name="uploads"
              @update:model-value="setEditFile"
              class="previewinput"
              multiple
              @rejected="EditonRejected"
            />
            <q-file
              type="file"
              v-else
              v-model="filesImages"
              accept=".jpg,.png,.svg,.jpeg"
              name="uploads"
              @update:model-value="setFile"
              class="previewinput"
              max-files="5"
              multiple
              @rejected="onRejected"
            />

            <div class="previewDiv">
              <template v-if="preview">
                <img :src="preview" class="previewimg" />
                <!-- <img src="/images/click.png" class="click" alt="" /> -->
              </template>
            </div>
          </div>
        </div>
        <div v-if="deleteImg">
          <q-spinner-ball color="primary" size="2em" />
        </div>

        <div v-if="uploadedImages.length" class="images">
          <div
            v-for="(image, index) in uploadedImages"
            :key="index"
            class="uploaded_thumbs"
          >
            <img :src="image.url" alt="" />
            <q-btn @click="removeImageUp(index)" flat>
              <i class="fa-solid fa-xmark"></i>
            </q-btn>
          </div>
        </div>
        <div v-if="edit" class="images">
          <div
            v-for="(image, index) in editData.uploads"
            :key="index"
            class="uploaded_thumbs"
          >
            <img :src="image.url" alt="" />
            <q-btn @click="removeImage(index)" flat>
              <i class="fa-solid fa-xmark"></i>
            </q-btn>
            <!-- <q-btn :loading="deleteImg" @click="removeImage(index)" flat>
              <i class="fa-solid fa-xmark"></i>
            </q-btn> -->
          </div>
        </div>

        <div class="create q-pt-xl">Advert Details</div>

        <!-- <div class="form"></div> -->
        <form id="form">
          <!-- <div class="q-mt-sm" v-if="loading">Loading</div> -->
          <div class="input-box active-grey">
            <label class="input-label">Category</label>
            <select
              v-model="data2.category"
              @change="getSubCategory(data2.category)"
              name=""
              id=""
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.slug"
              >
                {{ category.name }}
              </option>
            </select>
            <div v-if="showsubCat" class="input-box active-grey">
              <!-- <q-btn flat style="min-height: unset"> Reset </q-btn> -->
              <label class="input-label q-pa-xs">Select Sub Category </label>
              <select
                @change="getUploadRequirements(data.subcategory)"
                v-model="data.subcategory"
                name=""
                id=""
              >
                <option
                  v-for="subcategory in subcategories"
                  :key="subcategory.id"
                  :value="subcategory.id"
                >
                  {{ subcategory.name }}
                </option>
              </select>
            </div>
            <div class="input-box active-grey">
              <label class="input-label">Location</label>
              <select
                v-model="data2.location"
                @change="getAreas(data2.location)"
                name=""
                id=""
              >
                <option
                  v-for="state in states"
                  :key="state.id"
                  :value="state.id"
                >
                  {{ state.name }}
                </option>
              </select>
            </div>
            <div v-if="showarea" class="input-box active-grey">
              <label class="input-label">Select Exact Location</label>
              <select v-model="data.area" name="" id="">
                <option v-for="area in areas" :key="area.id" :value="area.id">
                  {{ area.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="wraps">
            <div class="input-box active-grey">
              <label class="input-label">Advert Title</label>
              <input v-model="data.name" type="text" class="input-1" />
            </div>
            <div class="input-box active-grey">
              <label class="input-label">Brand</label>
              <input v-model="data.brand" type="text" class="input-1" />

              <small v-if="errors.brand" class="text-weight-bold text-red">
                {{ errors.brand[0] }}
              </small>
            </div>
          </div>

          <div class="input-box active-grey">
            <label class="input-label">Advert Description </label>
            <!-- <textarea
              v-model="data.description"
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea> -->
            <!-- :definitions="{
                save: {
                  tip: 'Save your work',
                  icon: 'save',
                  label: 'Save',
                  handler: saveWork,
                },
                upload: {
                  tip: 'Upload to cloud',
                  icon: 'cloud_upload',
                  label: 'Upload',
                  handler: uploadIt,
                },
              }" -->
            <q-editor v-model="data.description" min-height="5rem" />
            <!-- <q-editor
              v-model="data.description"
              :definitions="{
                bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
              }"
            /> -->
          </div>

          <div class="wraps">
            <div class="input-box active-grey">
              <label class="input-label">Condition</label>
              <select v-model="data.condition" name="" id="">
                <option value="Brand new">Brand new</option>
                <option value="Used">Used</option>
              </select>
            </div>

            <div class="price">
              <div class="input-box active-grey">
                <label class="input-label">Price</label>
                <input
                  @blur="formatPrice"
                  v-model="data.price"
                  class="input-1"
                  type="text"
                />
              </div>
              <div>
                <q-checkbox
                  color="negative"
                  v-model="data.negotiable"
                  label="Negotiable"
                />
              </div>
            </div>
          </div>

          <q-btn type="button" @click="create" color="primary" class="btn"
            >Proceed</q-btn
          >
          <div class="clear"></div>
        </form>
      </q-card>
      <q-card v-if="modal2" class="create_ad container">
        <div class="dialog_top">
          <img src="/images/flag.png" alt="" />

          <div class="create">Create advert</div>
        </div>
        <!-- {{ errors }} -->
        <div class="text">
          <p class="more">Add more details</p>
          Upload the shot that best sells your design. High quality images
          attract more customers. We recommend your images are taken by a
          professional and when possible get a model to wear them.
        </div>
        <!-- {{ data }} -->
        <div class="form"></div>
        <div class="wraps">
          <template v-for="(requirement, index) in requirements" :key="index">
            <div class="input-box active-grey">
              <label class="input-label">{{ requirement.name }}</label>
              <select v-model="data[requirement.name]" name="" id="">
                <option
                  v-for="(option, index) in requirement.fields"
                  :key="index"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
              <!-- {{ requirement }} -->
              <!-- {{ errors[requirement.name] }} -->
              <small
                v-if="errors[requirement.name]"
                class="text-red text-weight-bold"
              >
                {{ errors[requirement.name][0] }}
              </small>
            </div>
          </template>

          <!-- <div class="input-box active-grey">
              <label class="input-label">Make</label>
              <select name="" id="">
                <option value="+243">+243</option>
                <option value="+243">+243</option>
                <option value="+243">+243</option>
              </select>
            </div> -->
        </div>

        <div class="input-box active-grey">
          <label class="input-label">Model</label>
          <input v-model="data.model" type="text" class="input-1" />
          <small v-if="errors.model" class="text-red text-weight-bold">
            {{ errors.model[0] }}
          </small>
        </div>

        <!-- <div class="price">
              <div class="input-box active-grey">
                <label class="input-label">Color</label>
                <input type="text" class="input-1" />
              </div>
            </div> -->

        <!-- <div class="q-py-lg advert q-gutter-sm">
          <label class="adDet">Advert Details</label>
          <q-editor
            v-model="editor"
            :definitions="{
              save: {
                tip: 'Save your work',
                icon: 'save',
                label: 'Save',
                handler: saveWork,
              },
              upload: {
                tip: 'Upload to cloud',
                icon: 'cloud_upload',
                label: 'Upload',
                handler: uploadIt,
              },
            }"
            :toolbar="[
              ['bold', 'italic', 'strike', 'underline'],
              ['upload', 'save'],
            ]"
          />
        </div> -->

        <div class="row btnns no-wrap items-center justify-between">
          <q-btn
            v-if="!edit"
            @click="finish"
            :loading="loading"
            type="button"
            color="primary"
            class="btn"
            >Proceed</q-btn
          >
          <q-btn
            v-else
            @click="EditProduct"
            :loading="loading"
            type="button"
            color="primary"
            class="btn q-mr-md"
            no-caps
            >Edit Listing</q-btn
          >
          <q-btn @click="prev" type="button" outline class="btn prev"
            >Prev</q-btn
          >
        </div>
        <div class="clear"></div>
      </q-card>

      <q-card v-if="modal3" class="card container finshAd">
        <div class="dialog_content">
          <div class="dialog_top">
            <img src="/images/flag.png" alt="" />

            <div class="create">Create advert</div>
          </div>
          <div class="dialog_top advert">
            <div class="left_dialog">
              <img :src="createdProduct.media[0].url" alt="" />
            </div>

            <div class="det">
              <div class="title">{{ createdProduct.name }}</div>
              <div class="price">
                ₦{{ createdProduct.price.toLocaleString() }}
              </div>
            </div>
          </div>
          <div class="row ad justify-between items-center">
            <p>Boost this advert for {{ selectedAdsDuration }}</p>
            <p class="text-weight-bold">₦{{ selectedAdAmt }}</p>
          </div>

          <div class="middle advert">
            <!-- <div class="items">
              <q-btn
                :class="selectedAdsDuration === 'Free' ? 'active' : ''"
                @click="selectDuration('Free')"
              >
                Free
              </q-btn>
            </div> -->
            <div class="items btr">
              <q-btn
                v-for="(plan, index) in plans"
                :key="index"
                :class="selectedAdsDuration === plan.name ? 'active' : ''"
                @click="selectDuration(plan, plan.id)"
              >
                {{ plan.name }}
              </q-btn>
            </div>
            <!-- <div class="items">
              <q-btn
                :class="selectedAdsDuration === '7 days' ? 'active' : ''"
                @click="selectDuration('7 days')"
              >
                7 Days
              </q-btn>
            </div>
            <div class="items">
              <q-btn
                :class="selectedAdsDuration === '30 days' ? 'active' : ''"
                @click="selectDuration('30 days')"
              >
                30 Days
              </q-btn>
            </div> -->
          </div>

          <div class="row items-center justify-between">
            <q-btn @click="skip" type="button" color="info" class="prev btn"
              >Skip</q-btn
            >
            <q-btn
              @click="handleBoost"
              type="button"
              outline
              :loading="boostBtn"
              color="primary"
              class="btn post"
              >Post Ad</q-btn
            >
          </div>
          <div class="clear"></div>
        </div>
      </q-card>

      <q-dialog v-model="successModal">
        <q-card class="create_ad container">
          <div class="dialog_top">
            <img src="/images/flag.png" alt="" />

            <div class="create">Create advert</div>
          </div>
          <!-- {{ errors }} -->
          <div class="text successful">
            <img src="/images/congrats.svg" alt="" />
            <p class="congrats">
              Congratulations, your listing is now in review.
            </p>
            <div class="more">
              We are currently reviewing your listing. This process typically
              takes a few miniutes.
            </div>
            <q-btn :to="{ name: 'business.dashboard' }" no-caps class="return">
              Return to Dashboard
            </q-btn>
          </div>
        </q-card>
      </q-dialog>
      <q-dialog v-model="successeditModal">
        <q-card>
          <q-card-section>
            <div class="text successful">
              <img src="/images/congrats.svg" alt="" />
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            You have successfully edited your listing
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              :to="{ name: 'listings' }"
              flat
              class="bg-primary text-white"
              label="Go Back"
              no-caps
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import useQuasar from "quasar/src/composables/use-quasar.js";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
import { useAuthStore } from "stores/auth";
import { Dialog } from "quasar";
let store = useAuthStore();
export default {
  name: "MyLayout",
  data() {
    return {
      preview: "/images/previewnew.svg",
      previewAvatar: "/images/sqrpreview.png",
      image: null,
      successModal: false,
      modal1: true,
      modal2: false,
      modal3: false,
      price: true,
      air: false,
      boostBtn: false,
      modal3: false,
      categories: [],
      selectedAdsDuration: "1 day",
      selectedAdAmt: "1000",
      subcategories: [],
      states: [],
      showarea: false,
      requirements: [],
      uploadedImagesImage: null,
      uploadedImagesToSend: [],
      deleteImg: false,
      showsubCat: false,
      loadingAvatar: false,
      avatar: {},
      areas: [],
      plans: [],
      selectedAd: "",
      edit: false,
      errors: {},
      uploadedImages: [],
      editData: {},
      loading: false,
      dialogAvatar: false,
      data: { negotiable: true, description: "" },
      data2: {},
      createdProduct: {},
      successeditModal: false,
    };
  },

  setup() {
    const $q = useQuasar();

    const leftDrawerOpen = ref(false);
    const search = ref("");
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    let role = store.userDetails.role[0].name;
    return {
      role,
      editor: ref(""),

      saveWork() {
        $q.notify({
          message: "Saved your text to local storage",
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
        });
      },
      uploadIt() {
        $q.notify({
          message: "Server unavailable. Check connectivity.",
          color: "red-5",
          textColor: "white",
          icon: "warning",
        });
      },
      fabYoutube,
      leftDrawerOpen,
      search,
      filesImages: ref(null),
      EditfilesImages: ref(null),
      notifications: ref([]),
      toggleLeftDrawer,
    };
  },

  created() {
    this.getCategory();
    this.getStates();
    this.getPlans();
    if (this.$router.currentRoute.value.query.listing) {
      this.getListing();
    }
    // this.getUploadRequirements();
  },

  methods: {
    formatPrice() {
      const numericValue = parseFloat(this.data.price.replace(/,/g, ""));

      if (!isNaN(numericValue)) {
        const formattedValue = numericValue.toLocaleString(undefined, {
          useGrouping: true,
        });
        this.data.price = formattedValue;
      }
    },

    skip() {
      this.modal3 = false;
      this.successModal = true;
    },

    selectDuration(arg, plan) {
      this.selectedAdsDuration = arg.name;
      this.selectedAdAmt = arg.price;
      this.selectedAd = plan;
    },

    getVendor() {
      this.$api
        .get(`vendor/${this.$store.leegoluauth.vendorDetails.slug}`)
        .then((response) => {
          // console.log(response);
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
    getListing() {
      // console.log(this.$router.currentRoute.value.query);
      this.$api
        .get(`product/${this.$router.currentRoute.value.query.listing}`)
        .then((response) => {
          this.edit = true;
          // console.log(response);
          // console.log(response.data.data.name);
          this.getUploadRequirements(response.data.data.subcategory.id);
          this.getSubCategory(response.data.data.category.slug);
          this.getAreas(response.data.data.area.state_id);
          this.showarea = true;
          this.showsubCat = true;
          this.editData = response.data.data;
          this.data.name = response.data.data.name;
          this.data.brand = response.data.data.brand;
          this.data.description = response.data.data.description;
          this.data.price = response.data.data.price;
          this.data.condition = response.data.data.condition;
          this.data.area = response.data.data.area.id;
          this.data2.category = response.data.data.category.slug;
          this.data2.location = response.data.data.area.state_id;
          this.data.subcategory = response.data.data.subcategory.id;
          this.data.gender = response.data.data.details.gender;
          this.data.brand = response.data.data.details.brand;
          this.data.jewelry_brand = response.data.data.details.jewelry_brand;
          this.data.jewelry_type = response.data.data.details.jewelry_type;
          this.data.main_material = response.data.data.details.main_material;
          this.data.main_stone = response.data.data.details.main_stone;
          this.data.model = response.data.data.details.model;
          this.data.pc_type = response.data.data.details.pc_type;
          this.data.processor = response.data.data.details.processor;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    onRejected() {
      this.$q.notify({
        type: "negative",
        message: `Your upload size should be less than 10mb and you should not upload more than 5 images`,
      });
    },
    EditonRejected() {
      this.$q.notify({
        type: "negative",
        message: `you did something wrong`,
      });
    },

    setFile(props) {
      this.uploadedImagesToSend = props;
      props.forEach((element) => {
        var reader = new FileReader();

        reader.onload = () => {
          this.uploadedImages.push({ url: reader.result });
        };

        if (element) {
          reader.readAsDataURL(element);
        }
      });
    },
    setEditFile(props) {
      console.log(props);
      if (this.editData.uploads.length + props.length > 5) {
        const maxLength = 5;
        // Calculate the total length of both arrays
        const totalLength = this.editData.uploads.length + props.length;
        // Determine the maximum number of elements that can be added
        const maxElementsToAdd = Math.abs(totalLength - maxLength);
        // console.log(Math.abs(maxElementsToAdd));
        // Add elements to the arrays while maintaining the maximum length limit
        if (maxElementsToAdd > 0) {
          // Example: Adding elements to array1
          props.splice(0, maxElementsToAdd);
          props.forEach((element) => {
            var reader = new FileReader();
            reader.onload = () => {
              this.uploadedImages.push({ url: reader.result });
            };
            if (element) {
              reader.readAsDataURL(element);
            }
          });
          this.$q.notify({
            message:
              "You cannot upload more than five images, try deleting those you have uploaded before.",
            color: "red-5",
            textColor: "white",
            icon: "warning",
          });
        }
      } else {
        props.forEach((element) => {
          var reader = new FileReader();
          reader.onload = () => {
            this.uploadedImages.push({ url: reader.result });
          };
          if (element) {
            reader.readAsDataURL(element);
          }
        });
      }
    },

    removeImageUp(index) {
      this.uploadedImages.splice(index, 1);
    },
    removeImage(index) {
      this.deleteImg = true;
      this.$api
        .delete(
          `${this.$router.currentRoute.value.query.id}/media/remove?index=${index}`
        )
        .then((response) => {
          console.log(response);
          // this.editData.uploads.splice(index, 1);
          this.editData = response.data.product;
          this.deleteImg = false;
        })
        .catch(({ response }) => {
          this.deleteImg = false;
          this.errors = error.errors || {};
        });
    },

    prev() {
      this.modal2 = false;
      this.modal1 = true;
    },

    getCategory() {
      this.$api
        .get("categories")
        .then((response) => {
          // console.log(response);
          this.categories = response.data.data;
          // this.vendordetails.business_type = response.data.data[0].id;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    getSubCategory(category) {
      this.loading = true;
      this.showsubCat = true;
      this.$api
        .get(`${category}/sub`)
        .then((response) => {
          // console.log(response);
          this.subcategories = response.data.data;
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    getStates() {
      this.$api
        .get("states")
        .then((response) => {
          console.log(response);
          this.states = response.data.data;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
    getAreas(id) {
      this.showarea = true;
      this.loading = true;
      this.$api
        .get(`${id}/areas`)
        .then((response) => {
          // console.log(response);
          this.loading = false;
          this.areas = response.data.data;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    getUploadRequirements(id) {
      this.$api
        .get(`${id}/requirement`)
        .then((response) => {
          console.log(response);
          this.requirements = response.data.data.length
            ? response.data.data[0].dropdowns
            : response.data.data;
        })
        .catch((e) => {
          console.log(e);
          this.loading = false;
          this.errors = error.errors || {};
        });
    },
    getPlans() {
      this.$api
        .get(`boost/plans`)
        .then((response) => {
          console.log(response);
          this.plans = response.data.data;
        })
        .catch((e) => {
          this.loading = false;
          this.errors = error.errors || {};
        });
    },

    handleBoost() {
      this.boostBtn = true;
      this.$api
        .post(`${this.createdProduct.id}/purchase/boost`, {
          plan: this.selectedAd,
        })
        .then(({ data }) => {
          console.log(data);
          window.location.href = data.url;
          this.boostBtn = false;
          this.modal3 = false;
          this.successModal = true;
        })
        .catch(({ response }) => {
          this.boostBtn = false;
        });
    },

    finish() {
      this.data.negotiable = this.data.negotiable ? 1 : 0;
      const cleanedString = this.data.price.replace(/,/g, "");
      let data = {
        ...this.data,
        price: cleanedString,
      };
      let createproductObject = data;
      // console.log(this.postFormData);
      let imageFiles = this.filesImages;
      // console.log(imageFiles[0]);
      const formData = new FormData();
      imageFiles.forEach((image) => {
        formData.append("media[]", image);
      });
      // formData.append("uploads[]", imageFiles[0]);
      // formData.append("uploads[]", imageFiles[1] ? imageFiles[1] : null);
      // formData.append("uploads[]", imageFiles[2] ? imageFiles[2] : null);
      // formData.append("uploads[]", imageFiles[3] ? imageFiles[3] : null);
      // formData.append("uploads[]", imageFiles[4] ? imageFiles[4] : null);
      // console.log();
      // formData.append("uploads", this.data.uploads[0]);
      // formData.append("uploads[]", this.data.uploads);
      // formData.append("uploads[]", this.data.uploads);
      // formData.append("uploads[]", this.data.uploads);
      // formData.append("uploads", this.data.uploads);
      for (var key in createproductObject) {
        formData.append(key, createproductObject[key]);
      }

      // console.log(formData);
      this.loading = true;
      this.$api
        .post(
          `${
            this.role === "regular"
              ? `${this.$store.leegoluauth.userDetails.id}/product/upload`
              : `${this.$store.leegoluauth.vendorDetails.slug}/product/upload`
          }`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log("Success:", response);
          this.createdProduct = response.data.product;
          this.loading = false;
          this.$q.notify({
            message: response.data.message,
            color: "green",
            timeout: 100000,
            position: "top",
            actions: [{ icon: "close", color: "white" }],
          });
          this.modal1 = false;
          this.modal2 = false;
          this.modal3 = true;
          // this.successModal = true;
          this.data = { negotiable: true, uploads: "" };
        })
        .catch((e) => {
          console.log(e.response);
          console.log(e.response.status);
          this.errors = e.response.data.errors ? e.response.data.errors : {};
          this.loading = false;
          this.$q.notify({
            message: e.response.data.message,
            color: "red",
            position: "top",
            timeout: 1223432,
            actions: [{ icon: "close", color: "white" }],
          });

          if (e.response.status === 403) {
            Dialog.create({
              title: "Usage Alert!",
              message:
                "You've reached your upload limit. Buy a suitable plan to extend you upload limit.",
              ok: {
                push: true,
                label: "Buy plan",
                color: "green",
              },
              persistent: true,
            })
              .onOk(() => {
                this.$router.replace({
                  name: "Plans",
                });
              })
              .onCancel(() => {
                // console.log('>>>> Cancel')
              })
              .onDismiss(() => {
                // console.log('I am triggered on both OK and Cancel')
              });
          }
          // console.log("Error:", response);
        });
    },
    EditProduct() {
      this.data.negotiable = this.data.negotiable ? 1 : 0;
      let data = {
        ...this.data,
      };
      let createproductObject = data;
      // console.log(this.postFormData);
      let imageFiles = this.EditfilesImages;
      // console.log(imageFiles[0]);
      const formData = new FormData();
      // formData.append("METHOD", 'PUT')
      if (this.uploadedImages.length) {
        imageFiles.forEach((image) => {
          formData.append("media[]", image);
        });
        // formData.append("uploads[]", imageFiles[0]);
        // formData.append("uploads[]", imageFiles[1] ? imageFiles[1] : null);
        // formData.append("uploads[]", imageFiles[2] ? imageFiles[2] : null);
        // formData.append("uploads[]", imageFiles[3] ? imageFiles[3] : null);
        // formData.append("uploads[]", imageFiles[4] ? imageFiles[4] : null);
      }

      for (var key in createproductObject) {
        formData.append(key, createproductObject[key]);
      }
      // console.log(formData);
      this.loading = true;
      this.$api
        .post(
          `${this.$router.currentRoute.value.query.id}/product/edit`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log("Success:", response);
          // this.createdProduct = response.data.product;
          this.loading = false;
          this.modal2 = false;
          this.successeditModal = true;
          this.$q.notify({
            message: response.data.message,
            color: "green",
            timeout: 100000,
            position: "top",
            actions: [{ icon: "close", color: "white" }],
          });
        })
        .catch((e) => {
          // console.log(e.response);
          this.errors = e.response.data.errors;
          this.loading = false;
          this.$q.notify({
            message: e.response.data.message,
            color: "red",
            position: "top",
            actions: [{ icon: "close", color: "white" }],
          });
          // console.log("Error:", response);
        });
    },

    create() {
      if (!this.uploadedImages.length && !this.edit) {
        this.$q.notify({
          color: "red",
          message: "Image field field is required",
        });
      } else if (!this.data.subcategory) {
        this.$q.notify({
          color: "red",
          message: "Sub Category field is required",
        });
        return;
      } else if (!this.data.area) {
        this.$q.notify({
          color: "red",
          message: "Location field is required",
        });
        return;
      } else if (!this.data.name) {
        this.$q.notify({
          color: "red",
          message: "Name field is required",
        });
        return;
      } else if (!this.data.description) {
        this.$q.notify({
          color: "red",
          message: "Description field is required",
        });

        return;
      } else if (!this.data.condition) {
        this.$q.notify({
          color: "red",
          message: "Condition field is required",
        });
        return;
      } else if (!this.data.price) {
        this.$q.notify({
          color: "red",
          message: "Price field is required",
        });
        return;
      } else if (!this.data.negotiable) {
        this.$q.notify({
          color: "red",
          message: "The Negotiable field is required",
        });
        return;
      } else {
        this.modal1 = false;
        this.modal2 = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.Features {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
  color: #000000;
}

.menu {
  display: none;
  color: #000000;
  min-height: 0;
}

.mybtn::before {
  box-shadow: none;
}
.wraps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.adDet {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  text-transform: capitalize;
  color: #000000;
}

.bar input {
  width: 100%;
  border: none;
  background: transparent;
  padding: 0 1rem;
}

input:focus {
  outline: none;
}

.uploaded_thumbs {
  position: relative;
}
.uploaded_thumbs .q-btn {
  position: absolute;
  top: 1%;
  right: 1%;
  background: #ee4e36;
  color: white;
  padding: 3px 5px;
  font-size: 10px;
  min-height: auto;
}

.search-btn {
  min-height: 0;
}

::placeholder {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #9a9a9a;
}

.links {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  // color: #000000;
}

.q-list {
  padding: 2rem 1rem;
}

.avater_side {
  min-width: 0;
}

.q-item.q-router-link--active,
.q-item--active {
  background: #1f7bb5;
  border-radius: 5px;
  color: white;
}

.successful {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.successful img {
  width: 149px;
  height: 149px;
  object-fit: contain;
}
.successful .return {
  background: #1f7bb5;
  border-radius: 9px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  color: #ffffff;
  margin-top: 0.7rem;
}
.items.btr {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.successful .congrats {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  margin-bottom: 0;
  margin-top: 1rem;
  color: #000000;
}

.successful .more {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #000000;
  margin: 0.3rem 0.8rem;
}

.images {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1rem 0 0;
}

.images img {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  object-fit: contain;
  border: 1px solid rgba(53, 113, 150, 0.26);
}
// modals

@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,700");

$color: #80868b;
$active-color: #1a73e8;
$error-color: #f44336;
$input-value-color: #202124;
$border-color: 1px solid #dadce0;

$border-color-active: 2px solid $active-color;
$default-background: #fff;

/* Buttons */
$btn-default-bg-color: #fff;
$btn-default-bgh-color: #ddd;
$btn-default-text-color: #333;

.img img {
  width: 100px;
}
input,
select,
textarea {
  background: $default-background;
}

#form {
  margin: 0 auto;
}
.input-box.active-grey {
  .input-1,
  select,
  textarea {
    border: 1.5px solid #9d9d9d;
  }
  select,
  textarea {
    width: 100%;
  }
  .input-label {
    // color: $color;
    top: -8px;
    background: $default-background;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-transform: capitalize;
    color: #000000;
    transition: 250ms;
  }
}
.input-box {
  position: relative;
  margin: 35px 0 0;
  .input-label {
    position: absolute;
    color: $color;
    font-size: 16px;
    font-weight: 400;
    max-width: calc(100% - (2 * 8px));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    left: 8px;
    top: 13px;
    padding: 0 8px;
    transition: 250ms;
    user-select: none;
    pointer-events: none;
  }
  .input-1,
  select,
  textarea {
    box-sizing: border-box;
    height: 50px;
    width: 100%;
    border-radius: 4px;
    color: $input-value-color;
    border: $border-color;
    padding: 13px 15px;

    transition: 250ms;
    &:focus {
      outline: none;
      border: 2px solid #1a73e8;
      transition: 250ms;
    }
  }
}
.input-box.error {
  .input-label {
    color: $error-color;
    top: -8px;
    background: $default-background;
    font-size: 11px;
    transition: 250ms;
  }
  .input-1 {
    border: 2px solid $error-color;
  }
}
.input-box.focus,
.input-box.active {
  .input-label {
    color: $active-color;
    top: -8px;
    background: $default-background;
    font-size: 11px;
    transition: 250ms;
  }
}
.input-box.active {
  .input-1 {
    border: 2px solid #1a73e8;
  }
}
.btn {
  color: $btn-default-text-color;
  cursor: pointer;
  border: none;
  white-space: normal;
  letter-spacing: 0.25px;
  font-weight: 400;
  font-size: 14px;
  padding: 13px;
  border-radius: 4px;
  line-height: 20px;
  min-width: 88px;
  transition: 250ms;
  width: 207px;
  height: 47px;
  border-radius: 9px;
  margin-top: 2rem;

  &:hover {
    background: $btn-default-bgh-color;
    transition: 250ms;
  }
  &:focus {
    outline: none;
  }
}
.clear {
  clear: both;
}

::placeholder {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #000000;
}

// modal
.create_ad {
  padding: 2rem;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  border-radius: 14px;
}
.dialog_top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dialog_top img {
  width: 22px;
  height: 26px;
}

.create_ad .create {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #000000;
}

.check_wraps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  // align-items: center;
  gap: 1rem;
}

.create_ad .text {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  margin: 2.5rem 0;
  color: #000000;
  // max-width: 500px;
}
p.more {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 0;
  color: #000000;
}
//preview
.previewMain {
  width: fit-content;
}
.previewDiv {
  position: relative;
}

.previewDiv .click {
  position: absolute;
  left: 30%;
  top: 27%;
}

.form {
  margin-top: 1rem;
  position: relative;
}
.form img.previewimg {
  width: 158px;
  height: 158px;
  // border: 5px solid rgba(53, 113, 150, 0.26);
  border-radius: 21px;
  border: none;
}
.form img.click {
  width: 70px;
}

.previewinput {
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: transparent;
  opacity: 0;
}

// modal 3

// dialog

.card {
  min-width: 363px;
  background: #ffffff;
  // box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  // border-radius: 4px;
  width: 466px;
  border-radius: 14px !important;

  // height: 522px;
}

.dialog_content {
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  padding: 1rem;
  position: relative;
}
.dialog_content .dialog_top {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.dialog_content .dialog_top .title {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  // text-align: center;
  color: #000000;
}
.dialog_content .dialog_top .price {
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  // text-align: center;
  text-transform: capitalize;

  color: #000000;
}
.dialog_content .ad p:last-of-type {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: right;
  color: #000000;
  margin-bottom: 8px;
}

.dialog_content .ad p:first-of-type {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  margin-bottom: 8px;
}
.dialog_content .dialog_top.advert {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin: 1.5rem 0;
  background: #edf1f4;
  border-radius: 17px;
  padding: 1.5rem;
}
.dialog_content .dialog_top.advert .det {
  margin: 1.5rem 0;
}
.dialog_content .dialog_top img {
  width: 22px;
  height: 26px;
}

.create_ad .create,
.dialog_top .create {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
  color: #000000;
}

p.advert {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  margin-bottom: 0;
  padding: 0rem 0;
  color: #000000;
}

.dialog_content .dialog_top.advert img {
  width: 172px;
  height: 172px;
  border: 3px solid rgba(176, 176, 176, 0.5);
  border-radius: 3px;
  object-fit: cover;
}

.dialog_content .middle.advert {
  display: flex;
  gap: 2rem;
  border-top: 1px solid #d1d1d1;
  border-bottom: 1px solid #d1d1d1;
  align-items: center;
  padding: 1rem;
  margin: 0rem 0 0rem;
}
.dialog_content .middle.advert .q-btn {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #1f7bb5;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #c9c9c9;
  border-radius: 14.5px;
}

.dialog_content .middle.advert .q-btn.active {
  background: #1f7bb5;
  color: #fff;
}
.dialog_content .middle.advert .q-btn::before {
  box-shadow: none;
}

.dialog_content .middle p {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 0;
  color: #000000;
}

.dialog_content .boost {
  margin-top: 1.5rem;
}

.dialog_content .q-btn.post {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  display: flex;
  align-items: center;
  text-align: center;
  width: 207px;
  height: 47px;
  color: #ffffff;
  color: #ffffff !important;
  background: #1f7bb5 !important;
  border-radius: 9px;
  text-transform: capitalize;
}
.q-btn.prev {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #1f7bb5 !important;
  background: rgba(255, 255, 255, 0.5) !important;
  border: 2px solid #b0b0b0;
  border-radius: 5px;
  width: auto;
  width: 103px;
  height: 46px;
  text-transform: capitalize;
}
@media (min-width: 600px) {
  .create_ad {
    max-width: 882px !important;
    width: 90% !important;
    margin: 0rem auto 2rem;
  }
}
@media (max-width: 950px) {
  .bar .input_wrap {
    width: 70%;
    margin-left: 0;
  }
}
@media (max-width: 900px) {
  .mybtn {
    font-size: 12px;
    width: 150px;
  }

  .bar .input_wrap {
    width: 70%;
    margin-left: 0;
  }
  .menu {
    display: block;
  }
  .card {
    width: 95% !important;
    margin: 2rem auto;
    min-width: 95% !important;
  }
  // .create_ad {
  //   margin: 2rem auto;
  // }
}
@media (max-width: 500px) {
  .dialog_content .middle.advert {
    // flex-wrap: wrap;
    gap: 0.5rem 1rem;
    padding: 1rem 0;
  }

  .successful img {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
  .successful .return {
    font-size: 14px;
  }

  .successful .congrats {
    font-size: 16px;
    line-height: 17px;
  }
  .images img {
    width: 80px;
    height: 80px;
  }

  .successful .more {
    font-size: 12px;
    line-height: 12px;
  }

  .dialog_content .dialog_top.advert img {
    width: 122px;
    height: 122px;
  }
  .dialog_content .dialog_top .title {
    font-size: 16px;
    line-height: 18px;
    margin-bottom: 0.4rem;
  }

  .dialog_content .dialog_top .price {
    font-size: 14px;
  }

  .dialog_content .middle.advert .q-btn {
    font-size: 10px;
    white-space: nowrap;
  }
  .dialog_content .ad p:first-of-type {
    font-size: 12px;
  }
  .dialog_content .ad p:last-of-type {
    font-size: 16px;
  }
  .dialog_content .dialog_top.advert {
    padding: 1rem;
  }
  .dialog_content .q-btn.post {
    font-size: 14px;
    width: auto;
    height: 37px;
  }

  .mybtn {
    width: 160px;
  }

  .btn {
    font-size: 12px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    margin-top: 1rem;
  }

  .q-btn.prev {
    height: 40px;
    font-size: 12px;
    // width: auto;
  }

  .btnns {
    flex-wrap: wrap;
    flex-direction: column;
  }
  .btnns .q-btn {
    width: 100%;
  }
  .btnns .q-btn:first-of-type {
    margin-top: 2rem;
  }
  .btnns .q-btn:last-of-type {
    margin-top: 0.5rem;
  }

  .create_ad .text {
    font-size: 12px;
    line-height: 16px;
    margin: 1.5rem 0;
  }

  .form img.previewimg {
    width: 128px;
    height: 138px;
    // border: 3px solid rgba(53, 113, 150, 0.26);
  }
  .form img.click {
    width: 50px;
  }

  // .row {
  //   gap: 1rem;
  // }
}
</style>
