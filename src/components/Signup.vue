<template>
   <div class="logo">
    <img src="../assets/Truong-Cao-dang-Kinh-te-TPHCM.webp" alt="">
    <h5>GV hướng dẫn</h5>
    <h5>Phạm Đằng Phương</h5>
    
  </div>
    <div class="mt-4">
      <h2>Welcome to Chat App</h2>
      <form class="detail-box my-5">
        <div class="form-group my-3">
          <h4>Signup to Chat</h4>
          <input
            type="text"
            v-model="name"
            class="form-control mb-4 mt-4"
            placeholder="Enter your name..."
          />
          <input
            type="text"
            v-model="email"
            class="form-control mb-4"
            placeholder="Enter your email..."
          />
          <input
            type="password"
            v-model="password"
            class="form-control mb-4"
            placeholder="Enter your password..."
          />
          <router-link :to="{ path: '/' }">
            <h6 class="mb-3" style="font-weight: 600">Back to login</h6>
          </router-link>
          <button
            style="font-weight: 600"
            type="button"
            v-on:click="signup"
            class="btn btn-primary"
          >Signup</button>
        </div>
      </form>
    </div>
  </template>
 
  <script>
   import firebase from "@/firebase.js";
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
  import { getFirestore, collection, addDoc } from 'firebase/firestore';

export default {
  name: 'Signup',
  setup() {
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const signup = async () => {
      try {
        const auth = getAuth();
        const res = await createUserWithEmailAndPassword(auth, email.value, password.value);

        const db = getFirestore();
        const docRef = await addDoc(collection(db, 'users'), {
          name: name.value,
          id: res.user.uid,
          email: email.value,
          password: password.value,
          URL: '',
          description: ''
        });

        localStorage.setItem('id', res.user.uid);
        localStorage.setItem('name', name.value);
        localStorage.setItem('email', email.value);
        localStorage.setItem('password', password.value);
        localStorage.setItem('photoURL', '');
        localStorage.setItem('description', '');
        localStorage.setItem('FirebaseDocumentId', docRef.id);

        name.value = '';
        email.value = '';
        password.value = '';

        router.push('/chat');
      } catch (err) {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.error(errorCode, errorMessage);
      
      }
    };

    return {
      name,
      email,
      password,
      signup
    };
  }
};

  </script>

<style scoped >
body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

.logo {
  text-align: left;
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #dee2e6;
}


.logo img {
  width: 50px;
  vertical-align: middle;
  margin-right: 10px;
}

.logo h5 {
  
  margin: 0;
  font-size: 14px;
  color: dodgerblue;
}

.container {
  text-align: center;
  padding: 20px;
}
input[type="text"],
input[type="password"] {
  margin: 0 auto;
  width: 80%;
}
.detail-box {
  padding: 5px;
  border: 1px solid lightgrey;
  width: 400px;
  min-height: 250px;
  margin: 0 auto;
}
h2,
h4 {
  color: dodgerblue;
  font-weight: 600;
}
</style>
