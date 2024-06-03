<template>
    <div class="w-100 mt-3">
      <h2 class="fw-600">Welcome to Profile section</h2>
      <div class="profile">
        <img class="br-06" :src="photoURL" width="100%" height="100%" />
        <label class="avatar">
          <font-awesome-icon icon="pencil-alt" />
          <input type="file" name="upload" class="w-0" @change="changeAvatar" />
        </label>
      </div>
      <div class="form-group">
        <label>Name</label>
        <input type="text" name="name" class="form-control" v-model="name" />
      </div>
      <div class="form-group">
        <label>Tell me about yourself</label>
        <input type="text" name="aboutMe" class="form-control" v-model="aboutMe" />
      </div>
      <button type="button" class="btn btn-primary" v-on:click="uploadAvatar">Save</button>
      <button type="button" class="btn btn-info" v-on:click="goBack">Back</button>
    </div>
  </template>
 
 

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { firestore, storage } from "@/firebase.js"; // Đảm bảo rằng đoạn mã này đúng với việc xuất thể hiện của lưu trữ Firebase
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { updateDoc, doc } from 'firebase/firestore';

const firebaseDocId = ref(localStorage.getItem("FirebaseDocumentId"));
const id = ref(localStorage.getItem("id"));
const name = ref(localStorage.hasOwnProperty("name") ? localStorage.getItem("name") : "");
const aboutMe = ref(localStorage.hasOwnProperty("description") ? localStorage.getItem("description") : "");
const photoURL = ref(localStorage.getItem("photoURL"));
const newPhoto = ref(null);

const router = useRouter();

function goBack() {
  router.push("/chat");
}

function changeAvatar(event) {
  if (event.target.files && event.target.files[0]) {
    const fileType = event.target.files[0].type.toString();
    if (fileType.indexOf("image") != 0) {
      return;
    }
    newPhoto.value = event.target.files[0];
    photoURL.value = URL.createObjectURL(event.target.files[0]);
  }
}

function uploadAvatar() {
  if (newPhoto.value) {
    const fileRef = storageRef(storage, `${id.value}`); // Tạo một tham chiếu đến vị trí lưu trữ
    const uploadTask = uploadBytesResumable(fileRef, newPhoto.value); // Bắt đầu tải lên

    uploadTask.on('state_changed',
      (snapshot) => {
        // Quan sát các sự kiện thay đổi trạng thái như tiến trình, tạm dừng và tiếp tục
      }, 
      (error) => {
        // Xử lý tải lên không thành công
        console.error("Lỗi trong khi tải lên:", error);
      }, 
      () => {
        // Xử lý tải lên thành công khi hoàn thành
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Tệp có sẵn tại', downloadURL);
          updateUserInfo(true, downloadURL);
        });
      }
    );
  } else {
    updateUserInfo(false, null);
  }
}

function updateUserInfo(isUrlPresent, downloadURL) {
  let newInfo = {
    name: name.value,
    description: aboutMe.value,
  };
  if (isUrlPresent) {
    newInfo.URL = downloadURL;
  }
  const userDocRef = doc(firestore, "users", firebaseDocId.value);
  updateDoc(userDocRef, newInfo).then(() => {
    localStorage.setItem("name", name.value);
    localStorage.setItem("description", aboutMe.value);
    if (isUrlPresent) {
      localStorage.setItem("photoURL", downloadURL);
    }
  }).catch(error => {
    console.error("Error updating document: ", error);
  });
}

onMounted(() => {
  if (!id.value) {
    router.push("/");
  }
  return {
       firebaseDocId,
       id,
       name,
       aboutMe,
       photoURL,
       newPhoto,
       goBack,
       changeAvatar,
       uploadAvatar,
     };
});
</script>





 
 
 

 
<style scoped>
input[type="text"] {
  margin: 0 auto;
  width: 25%;
}
label {
  font-size: 18px;
  font-weight: 600;
}
.fw-600 {
  font-weight: 600;
}
.w-100 {
  width: 100vw;
}
.w-0 {
  width: 0;
}
.br-06 {
  border-radius: 0.6rem;
}
.profile {
  margin: 20px auto;
  width: 150px;
  height: 150px;
  background-color: royalblue;
  position: relative;
  border-radius: 0.6rem;
}
.avatar {
  width: 35px;
  height: 35px;
  background: #f46e13;
  border-radius: 0.6rem;
  position: absolute;
  top: 115px;
  right: 0px;
  padding: 2px 0px 0px 7px;
}
</style>