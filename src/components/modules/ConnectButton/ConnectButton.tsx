import { useAccountEffect } from "wagmi"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from 'config/firebaseConfig';
import { getEmail, getPassword } from "utils/firebaseHelper";
import { doc, serverTimestamp, setDoc, getDoc } from 'firebase/firestore'

export default function ConnectButton() {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      getDoc(userRef).then(
        (userSnap) => {
          if (!userSnap.exists()) {
            setDoc(doc(db, "users", user.uid),
              {
                displayName: user.email,
                email: user.email,
                lastActive: serverTimestamp(),
                photoURL: user.photoURL,
              },
              { merge: true }
            )
          }else{
            setDoc(doc(db, "users", user.uid),
              {
                lastActive: serverTimestamp(),
              },
              { merge: true }
            )
          }
        }
      )
    }
  })

  useAccountEffect({
    onConnect(data) {
      const email = getEmail(data.address)
      const password = getPassword(data.address)

      signInWithEmailAndPassword(auth, email, password)
        .catch((_: any) => {
          createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
              signInWithEmailAndPassword(auth, email, password)
                .catch(() => {
                  console.log('sign in again failed')
                })
            })
            .catch((e: any) => {
              console.log(e)
            });
        });

    },
    onDisconnect() {
      signOut(auth)
        .catch((error: any) => {
          console.log(error.code, error.message)
        });
    },
  })

  return <w3m-button />
}
