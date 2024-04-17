import Sidebar from "components/chat/Sidebar"
import { Default } from "components/layouts/Default"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "config/firebaseConfig"
import { Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import React from "react";

const Community = () => {
    const [isMobile] = useMediaQuery('(max-width: 768px)')
    const [user] = useAuthState(auth)

    return (
        <Default pageName="Community">
            {
                !user && <Heading textAlign="center">Connect Your Wallect to Enable Community Feature</Heading>
            }
            <Flex
                direction={'row'}
                grow={1}
                height="75vh">
                {!isMobile && user && <Sidebar fullWidth={isMobile} />}
            </Flex>
        </Default>
    )
}

export default Community