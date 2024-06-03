<template>
  <div class="wrapper">
    <!-- Sidebar  -->
    <nav style="color: white" id="sidebar">
      <div class="sidebar-header d-flex justify-content-around">
        <div
          class="d-flex pointer"
          style="margin-right: 25px; width: 160px"
          @click="onProfileClick"
        >
          <img
            :src="photoURL"
            alt="user"
            width="50px"
            height="50px"
            style="border-radius: 50%; background: white;"
          />
        </div>
        <button type="button" class="btn btn-primary" @click="logout">Logout</button>
      </div>
      <div style="height: 1px; border-bottom: 1px solid #00388b"></div>
      <ul class="list-unstyled components">
        <li
          class="active mb-3"
          @click="letsChat(item)"
          v-for="item in searchUsers"
          :key="item.id"
          v-show="item.id != currentUserId"
        >
          <div class="d-flex" style="cursor: pointer; padding-bottom: 15px; width: 100%">
            <div style="width: 30%">
              <img
                :src="item.URL"
                alt="user"
                width="50px"
                height="50px"
                style="border-radius: 50%; background: white;"
              />
            </div>
            <div
              style="padding: 10px 0px 0px; width: 50%; display: flex; justify-content: space-between"
            >
              <h6 style="line-height: 2; font-weight: 600">{{item.name}}</h6>
            </div>
          </div>
          <div style="height: 1px; border-bottom: 1px solid #00388b"></div>
        </li>
      </ul>
    </nav>

    <!-- Page Content  -->
    <div id="content" v-if="!currentPeerUser">
      <div class="my-4">
        <img :src="photoURL" width="200px" class="br-50" />
      </div>
      <div>
        <h2>Welcome {{currentUserName}},</h2>
        <h3>Let's spread love</h3>
      </div>
    </div>
    <div v-else class="header-width">
      <ChatBox :currentPeerUser="currentPeerUser" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import {firestore} from "@/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import ChatBox from "./ChatBox.vue";
import { useRouter } from 'vue-router';

export default {
  app: "Chat",
  components: {
    ChatBox
  },
  setup() {
    const currentUserName = ref(localStorage.getItem("name"));
    const currentPeerUser = ref(null);
    const currentUserId = ref(localStorage.getItem("id"));
    const currentUserPhoto = ref(localStorage.getItem("photoURL"));
    const searchUsers = ref([]);
    const photoURL = ref(localStorage.getItem("photoURL"));
    const router = useRouter();

    const onProfileClick = () => {
      router.push("/profile");
    };

    const logout = () => {
      router.push("/");
      localStorage.clear();
    };

    const letsChat = (item) => {
      currentPeerUser.value = item;
    };

    const getUserList = async () => {
  const querySnapshot = await getDocs(collection(firestore, "users"));
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      searchUsers.value.push({
        documentKey: doc.id,
        id: userData.id,
        name: userData.name,
        URL: userData.URL,
        description: userData.description
      });
    });
  }
};


    onMounted(() => {
      if (!localStorage.hasOwnProperty("id")) router.push("/");
      getUserList();
    });

    return {
      currentUserName,
      currentPeerUser,
      currentUserId,
      currentUserPhoto,
      searchUsers,
      photoURL,
      onProfileClick,
      logout,
      letsChat
    };
  }
};
</script>





<style scoped>
.pointer {
  cursor: pointer;
}
.br-50 {
  border-radius: 50%;
}
.header-width {
  width: calc(100% - 350px);
  min-height: 100vh;
  transition: all 0.3s;
  position: absolute;
  top: 0;
  right: 0;
}
</style>