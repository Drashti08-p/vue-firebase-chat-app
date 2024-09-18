import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Filter } from "bad-words";
import { ref, onUnmounted, computed } from "vue";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmXkFs8rowpSdekGlov_4Mpueq3yPle_0",
  authDomain: "vue-firebase-chat-app-eb7f4.firebaseapp.com",
  projectId: "vue-firebase-chat-app-eb7f4",
  storageBucket: "vue-firebase-chat-app-eb7f4",
  messagingSenderId: "790339232047",
  appId: "1:790339232047:web:0d7dc535bcff3a4d2f01da",
  measurementId: "G-BYW2JBVW23",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

// Auth logic
export function useAuth() {
  const user = ref(null);
  const unsubscribe = onAuthStateChanged(auth, (_user) => (user.value = _user));
  console.log("unsubscribe: ", unsubscribe);
  onUnmounted(unsubscribe);
  const isLogin = computed(() => user.value !== null);

  const signIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider);
  };
  const signOutUser = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return { user, isLogin, signIn, signOutUser };
}

// Fire-store chat logic
const messagesCollection = collection(firestore, "messages");
const messagesQuery = query(
  messagesCollection,
  orderBy("createdAt", "desc"),
  limit(100)
);
const filter = new Filter();

export function useChat() {
  const messages = ref([]);
  const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
    messages.value = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .reverse();
  });
  onUnmounted(unsubscribe);

  const { user, isLogin } = useAuth();
  const sendMessage = async (text) => {
    if (!isLogin.value) return;
    const { photoURL, uid, displayName } = user.value;
    await addDoc(messagesCollection, {
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: filter.clean(text),
      createdAt: serverTimestamp(),
    });
  };

  return { messages, sendMessage };
}
