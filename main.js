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



// 🔹 Ambil semua todo
export async function ambilDaftarTodo() {
  const refDokumen = collection(basisdata, "todolist");
  const kueri = query(refDokumen, orderBy("judul"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      judul: dokumen.data().judul,
      deskripsi: dokumen.data().deskripsi,
      selesai: dokumen.data().selesai
    })
  })
  
  return hasilKueri;
}

// 🔹 Tambah todo
export async function tambahTodo(judul, deskripsi, selesai = false) {
  try {
    await addDoc(collection(basisdata, "todolist"), {
      teks: teks,
      status: status
    })
    console.log('Berhasil menambahkan todo');
  } catch (error) {
    console.log('Gagal menambahkan todo: ' + error);
  }
}

// 🔹 Hapus todo
export async function hapusTodo(id) {
  await deleteDoc(doc(basisdata, "todolist", id));
}

// 🔹 Ubah todo
export async function ubahTodo(id, judulBaru, deskripsiBaru, selesaiBaru) {
  await updateDoc(
    doc(basisdata, "todolist", id),
    {
      judul: judulBaru,
      deskripsi: deskripsiBaru,
      selesai: selesaiBaru
    }
  );
}

// 🔹 Ambil detail todo berdasarkan ID
export async function ambilTodo(id) {
  const refDokumen = doc(basisdata, "todolist", id);
  const snapshotDokumen = await getDoc(refDokumen);
  
  return snapshotDokumen.data();
}