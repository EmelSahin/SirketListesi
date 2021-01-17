<template>
  <div id="all-products">

    <table class="table table-hover">
      <thead>
        <tr>
          <td>ID</td>
          <td>Şirket İsmi</td>
          <td>Şirket Adresi</td>
          <td>Şirket E-mail</td>
          <td>Şirket GSM</td>
          <td>
            <div class="form-group">
              <input
                type="text"
                name="search"
                v-model="productSearch"
                placeholder="Arama Yapmak İçin..."
                class="form-control"
                v-on:keyup="searchProducts"
              />
            </div>
          </td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="product in products">
          <td>{{ product.id }}</td>
          <td>{{ product.sirket_ismi }}</td>
          <td>{{ product.sirket_adresi }}</td>
          <td>{{ product.sirket_email }}</td>
          <td>{{ product.sirket_gsm }}</td>
          <td>
            <router-link
              :to="{ name: 'edit_product', params: { id: product.id } }"
              class="btn btn-success"
              ><span class="btn-label"><i class="glyphicon glyphicon-plus-sign"></i></span></router-link
            >
            <router-link
              :to="{ name: 'delete_product', params: { id: product.id } }"
              class="btn btn-danger btn-circle btn-lg"
              ><span class="btn-label"><i class="glyphicon glyphicon-trash"></i></span></router-link
            >


            <router-link

              :to="{ name: 'create_product', params: { id: product.id } }"
              class="btn" style="background:#9EA6B4 ; color:#fff"
              >Personel List</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      originalProducts: [],
      productSearch: "",
    };
  },

  created: function () {
    this.fetchProductData();
  },

  methods: {
    fetchProductData: function () {
      this.$http.get("http://localhost:3000/api/products").then(
        (response) => {
          this.products = response.body;
          this.originalProducts = this.products;
        },
        (response) => {}
      );
    },

    searchProducts: function () {
      if (this.productSearch == "") {
        this.products = this.originalProducts;
        return;
      }

      var searchedProducts = [];
      for (var i = 0; i < this.originalProducts.length; i++) {
        var productName = this.originalProducts[i]["name"].toLowerCase();
        if (productName.indexOf(this.productSearch.toLowerCase()) >= 0) {
          searchedProducts.push(this.originalProducts[i]);
        }
      }

      this.products = searchedProducts;
    },
  },
};
</script>
<style>
.table{
  border: 1px solid #B7C9D3;
  border-collapse: collapse;
  color:#9EA6B4
  
}
.btn-danger {
  width: 40px;
}
.btn-success {
  width: 40px;
}
.th{
  border: 1px solid #B7C9D3;
  border-collapse: collapse;
  color:#9EA6B4;
  
}
.table,th,td {
  border: 1px solid #B7C9D3;
  border-collapse: collapse;
  color:#9EA6B4
}
.list_product{
  background:#9EA6B4 ; 
  color:#fff;
  text-align:center
}
.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
    text-align: center;
    font-weight:bold; 

}
.container {
    width: 100%;
}
</style>
