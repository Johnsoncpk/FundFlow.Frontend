import { SettingsIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  FormControl,
  useMediaQuery,
  FormLabel,
  chakra,
} from '@chakra-ui/react'
import { setDoc, doc } from 'firebase/firestore'
import { ChangeEvent, useState } from "react"
import {  db } from 'config/firebaseConfig'
import { chatUserModalProps } from "utils/types"

export default function UserModal({ displayName, photoURL, userId }: chatUserModalProps & { userId?: string }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const [user, setUser] = useState<chatUserModalProps>({
    displayName,
    photoURL
  })

  const handleSubmit = async () => {
    if (userId) {
      setDoc(doc(db, "users", userId),
        {
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        { merge: true }
      )
    }
    onClose()

  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setUser({
          ...user,
          photoURL: reader.result
        })
      };
    }
  };
  
  return (
    <>
      <Button leftIcon={<SettingsIcon />} size={isMobile ? "sm" : "md"} onClick={onOpen}>Profile Setting </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update User Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor='displayName'>Display Name</FormLabel>
              <Input required placeholder={'display name'} value={user.displayName} onChange={(e) => {
                setUser({ ...user, displayName: e.target.value })
              }} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Cover Photo</FormLabel>
              <chakra.input
                type="file"
                w="100%"
                p="2"
                borderColor="grey.100"
                borderRadius="md"
                textColor="gray.500"
                borderWidth="1px"
                as={"input"}
                accept="image/*"
                onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                  handleFileChange(e)
                }}
                css={{
                  "&::file-selector-button": {
                    alignItems: "center",
                    textAlign: "center",
                    display: "none",
                    backgroundColor: "blue.400",
                    _hover: {
                      backgroundColor: "blue.500",
                    },
                    _active: {
                      backgroundColor: "blue.600",
                    },
                  },
                }}
              />
              {
                user.photoURL &&
                <img src={user.photoURL as string} alt="Preview" />
              }
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              onClick={handleSubmit}
              colorScheme='teal'
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}