import { Button, Flex, FormControl, Input } from "@chakra-ui/react"
import { addDoc, setDoc, doc, collection, serverTimestamp } from "firebase/firestore"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "config/firebaseConfig"
import { chatProps } from "utils/types"

export default function Chatbox({ scrollRef, id }: chatProps) {
  const [user] = useAuthState(auth)
  const messageRef = collection(db, `rooms`, id, "messages")
  const [chat, setChat] = useState("")
  const handleChange = (e: any) => {
    setChat(e.target.value)
  }

  const sendMessage = async (e: any) => {
    const { uid, photoURL }: any = user;
    e.preventDefault()
    if (chat !== "") {
      await addDoc(messageRef, {
        Message: chat,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      })

      setDoc(doc(db, "rooms", id),
        {
          lastSent: serverTimestamp(),
        },
        { merge: true }
      )
    }
    setChat("")
    scrollRef.current.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <Flex direction="row" position="sticky" bottom={0}>
      <FormControl
        p={2}
        zIndex={3}
        as="form"
        display="flex"
        alignItems="center"
      >
        <Input
          size="lg"
          value={chat}
          onChange={handleChange}
          placeholder="Type Message"
        />
        <Button size="lg" type="submit" onClick={sendMessage}>
          Send
        </Button>
      </FormControl>
    </Flex>
  )
}
