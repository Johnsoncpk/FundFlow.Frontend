import { Avatar, Box, Center, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "config/firebaseConfig";
import { messageProps } from "utils/types";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "config/firebaseConfig";

export default function Message({ message, id }: messageProps) {
  const { colorMode } = useColorMode()
  const [user] = useAuthState(auth)
  // @ts-ignore
  const { uid } = user
  const bgColor = { light: "gray.300", dark: "gray.600" }
  const textColor = { light: "black", dark: "white" }

  const [value] = useDocument(doc(
    db, `users`, id
  ))

  return (
    <Box
      bg={uid === id ? "blue.500" : bgColor[colorMode]}
      w="fit-content"
      py={1}
      px={3}
      rounded="xl"
      margin={2}
      ml={uid === id ? "auto" : "0"}
      position="relative"
      textAlign={uid === id ? "right" : "left"}
      wordBreak="break-word"
      color={uid === id ? "white" : textColor[colorMode]}
    >
      {
        uid === id ?
          <Flex justifyContent="flex-end">
            <Center>
              <Text size={'sm'} as={'u'} color="grey.500" >{value?.data()?.displayName}</Text>
              <Avatar marginLeft={'4px'} src={value?.data()?.photoURL} size={'sm'} />
            </Center>
          </Flex>
          :
          <Flex gap={2}>
            <Center>
              <Avatar marginRight={'4px'} src={value?.data()?.photoURL} size={'sm'} />
              <Text size={'sm'} as={'u'} color="grey.500" >{value?.data()?.displayName}</Text>
            </Center>
          </Flex>
      }
      <Text>{message}</Text>
    </Box>
  )
}