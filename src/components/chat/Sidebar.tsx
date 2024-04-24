import {
  Flex,
  Stack,
  Avatar,
  useColorMode,
  VStack,
  Text
} from '@chakra-ui/react'
import { collection, query, where } from "firebase/firestore"
import { useCollection } from 'react-firebase-hooks/firestore'
import { auth, db } from "config/firebaseConfig"
import UserModal from 'components/chat/UserModal'
import ChatRooms from 'components/chat/rooms/ChatRooms'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

const Sidebar = ({ fullWidth }: { fullWidth?: boolean }) => {
  const { colorMode } = useColorMode()
  const [user] = useAuthState(auth)

  const [roomValues] = useCollection(
    // @ts-ignore
    query(collection(db, "rooms"), where('users', 'array-contains', user.email))
  )

  const [value] = useDocument(doc(
    db, `users`, user!.uid
  ))

  const rooms = roomValues?.docs.map((room: any) =>
    <ChatRooms key={room.id} id={room.id} data={room.data()} />
  )

  return (
    <Flex
      height="75vh"
      maxWidth={fullWidth ? "100vw" : "30vw"}
      width={fullWidth ? "100vw" : ""}
      direction="column"
      borderRight="1px solid"
      borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
    >
      {
        value &&
        <Flex flexWrap="wrap" direction="column" position="sticky" top="0">
        <Flex
          justify="space-between"
          height="71px"
          align="center"
          p="10px"
        >
          <Stack direction="row" align="center" p="10px">
            <Avatar src={value?.data()?.photoURL} name={value?.data()?.displayName} />
            <VStack>
              <Text>{value?.data()?.displayName}</Text>
              <UserModal userId={value?.id} displayName={value?.data()?.displayName} photoURL={value?.data()?.photoURL} />
            </VStack>
          </Stack>
        </Flex>
      </Flex>
      }
      
      <Stack
        direction="column"
      >
        {rooms}
      </Stack>
    </Flex >
  )
}
export default Sidebar