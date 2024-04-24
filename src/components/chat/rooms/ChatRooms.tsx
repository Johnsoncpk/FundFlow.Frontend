import { Avatar, Flex, useColorMode, Text, Tooltip } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { getEllipsisTxt } from "utils/format"
import { chatRoomProps } from "utils/types"

export default function ChatRooms({ data, id }: chatRoomProps) {
  const { colorMode } = useColorMode()
  const router = useRouter()

  const handleClick = () => {
    router.push(`/community/${id}`)
  }

  return (
    <Flex
      align="center"
      p={4}
      cursor="pointer"
      _hover={{ bg: colorMode === 'light' ? 'gray.200' : 'gray.700' }}
      onClick={handleClick}
    >
      <Avatar src={data.coverImage} size={'lg'} />
      <Tooltip label={data.roomName}>
        <Text size={'sm'} ml={4}>{getEllipsisTxt(data.roomName, 13)}</Text>
      </Tooltip>
    </Flex>
  )
}
