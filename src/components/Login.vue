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
          <h4>Login to Chat</h4>
          <input
            type="text"
            v-model="email"
            class="form-control mb-4 mt-4"
            placeholder="Enter your email..."
          />
          <input
            type="password"
            v-model="password"
            class="form-control mb-4"
            placeholder="Enter your password..."
            v-on:keyup.enter="login"
          />
          <router-link :to="{ path: 'signup' }">
            <h6 class="mb-3" style="font-weight: 600">Create an account</h6>
          </router-link>
  
          <button
            type="button"
            v-on:click="login"
            class="btn btn-primary"
            style="font-weight: 600"
          >Login</button>
        </div>
      </form>
    </div>
  </template>
   

  <script>
  import firebase from "@/firebase.js";
 import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const login = async () => {
      try {
        const auth = getAuth();
        const res = await signInWithEmailAndPassword(auth, email.value, password.value);

        if (res.user) {
          const db = getFirestore();
          const q = query(collection(db, 'users'), where('id', '==', res.user.uid));
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach(doc => {
            const userData = doc.data();
            localStorage.setItem('id', userData.id);
            localStorage.setItem('name', userData.name);
            localStorage.setItem('email', userData.email);
            localStorage.setItem('password', userData.password);
            localStorage.setItem('photoURL', userData.URL);
            localStorage.setItem('description', userData.description);
            localStorage.setItem('FirebaseDocumentId', doc.id);
          });

          router.push('/chat');
        }
      } catch (err) {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.error(errorCode, errorMessage);
        
      }
    };

    onMounted(() => {
      if (localStorage.getItem('id')) router.push('/chat');
    });

    return {
      email,
      password,
      login
    };
  }
};

  

</script>


<style scoped>
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

.detail-box {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

input[type="text"],
input[type="password"] {
  margin: 0 auto;
  width: 80%;
  border: 1px solid #ced4da;
  padding: 10px;
  border-radius: 4px;
}

input[type="text"]::placeholder,
input[type="password"]::placeholder {
  color: #6c757d;
}

h2,
h4 {
  color: #007bff;
  font-weight: 600;
}

h2 {
  margin-bottom: 20px;
}

.create-account-link {
  font-weight: 600;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
}

.create-account-link:hover {
  text-decoration: underline;
}

.login-button {
  width: 80%;
  font-weight: 600;
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
}
</style>