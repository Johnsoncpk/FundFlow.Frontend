import { Flex } from "@chakra-ui/react";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "config/firebaseConfig";
import { chatProps } from "utils/types"
import Message from "./Message";

export default function ChatMessages({ scrollRef, id }: chatProps) {

  const [values] = useCollectionData(
    query(collection(db, `rooms`, id, "messages"), orderBy("createdAt", 'asc'))
  )
  const messages = values?.map((msg) => (
    <Message key={Math.random()} id={msg.uid} message={msg.Message} photoURL={msg.photoURL} />
  ))

  return (
    <Flex
      grow="1"
      align="start"
      direction="column"
      overflowY="scroll"
      p="10px"
    >
      {messages}
      <div ref={scrollRef}></div>
    </Flex>
  )

}