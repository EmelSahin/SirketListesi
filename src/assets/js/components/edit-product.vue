<template>
  <div id="update-product">
    <notification v-bind:notifications="notifications"></notification>

    <form v-on:submit.prevent="editProduct">
      <div class="form-group">
        <label name="id">ID</label>
        <input
          type="text"
          class="form-control"
          disabled
          v-model="product.id"
          id="id"
        />
      </div>

      <div class="form-group">
        <label name="product_sirket_ismi">*Şirket İsmi</label>
        <input
          type="text"
          class="form-control"
          v-model="product.sirket_ismi"
          id="sirket_ismi"
        />
      </div>

      <div class="form-group">
        <label name="product_sirket_adresi">*Şirket Adresi</label>
        <input
          type="text"
          class="form-control"
          v-model="product.sirket_adresi"
          id="sirket_adresi"
          required
        />
      </div>
      <div class="form-group">
        <label name="product_sirket_email">*Şirket E-mail</label>
        <input
          type="text"
          class="form-control"
          v-model="product.sirket_email"
          id="sirket_email"
          required
        />
      </div>

      <div class="form-group">
        <label name="product_sirket_gsm">*Şirket GSM</label>
        <input
          type="text"
          class="form-control"
          v-model="product.sirket_gsm"
          id="sirket_gsm"
          required
        />
      </div>
      <button type="button" class="btn btn-labeled btn-dangerr">
        <span class="btn-label"><i class="glyphicon glyphicon-trash"></i></span>
      </button>
      <div class="form-group">
        <div class="form-group">
          <button class="btn btn-primary">
            <span class="btn-label"><i class="glyphicon glyphicon-ok"></i></span
            >Şirketi Güncelle
          </button>
        </div>

        <p>
          <router-link :to="{ name: 'all_products' }" class="btn btn-successs">
            <span class="btn-label"
              ><i class="glyphicon glyphicon-refresh"></i></span
            >Geri Dön</router-link
          >
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import Notification from "./notifications.vue";

export default {
  data() {
    return {
      product: {},
      notifications: [],
    };
  },

  created: function () {
    this.getProduct();
  },

  methods: {
    getProduct: function () {
      this.$http
        .get("http://localhost:3000/api/product/" + this.$route.params.id)
        .then(
          (response) => {
            this.product = response.body;
          },
          (response) => {}
        );
    },

    editProduct: function () {
      this.$http
        .patch(
          "http://localhost:3000/api/product/edit/" + this.$route.params.id,
          this.product,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(
          (response) => {
            this.notifications.push({
              type: "success",
              message: "Güncelleme Yapılmıştır...",
            });
          },
          (response) => {
            this.notifications.push({
              type: "error",
              message: "Güncellenme Yapılamadı...",
            });
          }
        );
    },
  },

  components: {
    notification: Notification,
  },
};
</script>
<style>
.form-control {
  display: block;
  width: 83%;
  height: 34px;
  padding: 6px 12px;
  margin-bottom: 4px;
  float: right;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
}
body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
  background-color: #fff;
  margin-top: 50px;
}
.form-group {
  margin-bottom: 30px;
}
.btn-primary {
  background: rgb(240, 178, 7);
  color: #000;
  margin-left: 250px;
  width: 150px;
  margin-top: 50px;
}
.btn-dangerr {
  width: 40px;
  color: #fff;
  background-color: #d9534f;
  border-color: #d43f3a;
  margin-left: 250px;
}
.btn-successs {
  background: #ccc;
  color: #000;
  border-style: 1px solid;
  border-color: #ccc;
  margin-left: 480px;
  margin-top: -115px;
  width: 150px;
}
.btn-label {
  margin-right: 10px;
}
.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  margin-bottom: 15p;
}
</style>