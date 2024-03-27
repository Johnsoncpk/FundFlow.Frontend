import { Divider, Flex, Text } from "@chakra-ui/react";
import { FormProps } from 'components/types';
import { Form1, Form2, Form3 } from ".";
import React from "react";

export const Form4: React.FC<FormProps> = (props) => {
    return (
        <Flex flexDir="column" width="100%" margin={"auto"} gap={4}>
            <Divider />
            <Text fontSize='3xl'>Basic Information</Text>
            <Form1 projectData={props.projectData} setProjectData={props.setProjectData} />
            <Divider />
            <Text fontSize='3xl'>Round Setting</Text>
            <Form2 projectData={props.projectData} setProjectData={props.setProjectData} />
            <Divider />
            <Text fontSize='3xl'>Project Details</Text>
            <Form3 projectData={props.projectData} setProjectData={props.setProjectData} />
            <Divider />
        </Flex>
    );
};