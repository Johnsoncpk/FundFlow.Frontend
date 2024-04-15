import { useAccountEffect } from "wagmi"
import { getAuth, signInWithCustomToken, signOut } from "firebase/auth";
// import { auth, db } from 'config/firebaseConfig';

export default function ConnectButton() {
  useAccountEffect({
    onConnect(data) {
      fetch(`${window.location.origin}/api/firebase/getCustomToken`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.address),
      }).then((res) => {
        res.json().then((data: { customToken: string }) => {
          signInWithCustomToken(getAuth(), data.customToken)
            .then((userCredential) => {
              const user = userCredential.user;
              console.log(user)
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage)
            });
        });
      })
    },
    onDisconnect() {
      signOut(getAuth())
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
        });
    },
  })

  return <w3m-button />
}