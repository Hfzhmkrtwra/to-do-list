import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  where
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDGYnq4VKq-YGu4RbfoI_ZHez9fishYjZo",
  authDomain: "insan-cemerlang-afd2f.firebaseapp.com",
  projectId: "insan-cemerlang-afd2f",
  storageBucket: "insan-cemerlang-afd2f.appspot.com",
  messagingSenderId: "686649580589",
  appId: "1:686649580589:web:61374bbbd68adb604eaca4",
  measurementId: "G-LNZTQBCE26"
};

//inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

// tambahkan fungsi untuk menampilkan daftar to do list

// Import fungsi yang dibutuhkan dari Firebase Firestore
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { basisdata } from "./firebaseConfig"; // Sesuaikan path ke konfigurasi Firebase Anda

export async function ambilDaftarTodo() {
  try {
    const refDokumen = collection(basisdata, "todo"); // Pastikan koleksi bernama "todo"
    const kueri = query(refDokumen, orderBy("teks")); // Urutkan berdasarkan teks tugas
    const cuplikanKueri = await getDocs(kueri);

    const hasilKueri = [];

    cuplikanKueri.forEach((dokumen) => {
      const data = dokumen.data();
      hasilKueri.push({
        id: dokumen.id,
        teks: data.teks,
        status: data.status
      });
    });

    return hasilKueri;
  } catch (error) {
    console.error("Gagal mengambil daftar todo:", error);
    throw error;
  }
}
