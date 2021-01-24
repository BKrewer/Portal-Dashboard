<template>
  <div class="content donations col-md-9 offset-md-3 mt-4">
    <div class="card pb-3" v-for="donation in donations" :key="donation.id">
      <div class="card-header">
        <h5 class>{{ donation.name }}</h5>
        <button
          class="btn btn-primary"
          v-if="hasUser"
          @click="getDonation(donation.id)"
        >Estou precisando!</button>
        <button class="btn btn-primary" v-else @click="login">Efetue login</button>
      </div>
      <div class="mt-3 item-donation" v-for="item in donation.items" :key="item.id">
        <div class="col-3 img">
          <img src="https://brfulfillment.com.br/img/icons/design.svg" alt />
        </div>
        <div class="card-body col-9">
          <h5 class="card-title">{{item.name}}</h5>
          <p class="card-text">{{item.description}}</p>
        </div>
        <hr />
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Content",
  data() {
    return {
      donations: {},
      hasUser: this.$store.state.user ? true : false
    };
  },
  computed: mapState(["user"]),
  methods: {
    loadDonations() {
      const url = `${baseApiUrl}donation/getallactive`;
      axios.get(url).then(res => {
        this.donations = res.data;
      });
    },
    login() {
      this.$router.push({ path: "/auth" });
    },
    getDonation(donationId) {
      const applicantId = this.user.userResponse.id;
      axios
        .patch(
          `${baseApiUrl}donation/userrequest/${donationId}/${applicantId}/solicitado`
        )
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.loadDonations();
        });
    }
  },
  mounted() {
    this.loadDonations();
  }
};
</script>
<style>
.donations .card {
  margin-bottom: 20px;
}
.donations .img {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 0;
}
.donations img {
  width: 120px;
  height: 120px;
}
.donations .card-body {
  padding-left: 0;
}
.donations .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.donations .card-header h5 {
  margin-bottom: 0;
}
.donations .item-donation {
  display: flex;
  margin: 5px 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f8f8f8;
}
</style>