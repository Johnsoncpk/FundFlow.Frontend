import { Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import { auth, db } from "config/firebaseConfig";
import { doc } from "firebase/firestore";
import React, { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatMessages from "components/chat/ChatMessages";
import Chatbox from "components/chat/Chatbox";
import Sidebar from "components/chat/Sidebar";
import { useRouter } from "next/router";
import { useDocumentData } from "react-firebase-hooks/firestore";
import RoomsHeader from "components/chat/rooms/RoomsHeader";
import { Default } from "components/layouts/Default";

export default function Chatroom() {
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const router = useRouter()
  const { id } = router.query
  const lastMessage = useRef(null)
  const [user] = useAuthState(auth)

  const [values] = useDocumentData(
    //@ts-ignore
    doc(db, "rooms", id?.toString() ?? "0")
  )

  return (
    <Default pageName="Community">
      {
        user &&
        <Flex
          direction={'row'}
          grow={1}
          height="75vh">

          {!isMobile && <Sidebar fullWidth={isMobile} />}
          <Flex
            direction="column"
            grow="1"
          >
            <Flex height="71px">
              {/*@ts-ignore*/}
              {id && <RoomsHeader chatData={values} user={user} />}
            </Flex>
            {
              id &&
              <>
                <ChatMessages scrollRef={lastMessage} id={id.toString()} />
                <Chatbox scrollRef={lastMessage} id={id.toString()} />
              </>
            }
          </Flex>
        </Flex>
      }
      {
        !user && <Heading textAlign="center">Connect Your Wallect to Enable Community Feature</Heading>
      }
    </Default>
  )
}
