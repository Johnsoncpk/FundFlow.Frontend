import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from "@chakra-ui/react";
import { FormProps } from 'components/types';
import { Form1, Form2, Form3 } from ".";
import React from "react";

export const Form4: React.FC<FormProps & {isDisabled?: boolean, defaultIndex?: number[]}> = ({projectData, setProjectData, isDisabled=false, defaultIndex=[0, 1, 2]}) => {
    return (
        <Accordion width="100%" margin={"auto"} gap={4} defaultIndex={defaultIndex} allowMultiple>
            <AccordionItem>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                        <Text fontSize='3xl'>Basic Information</Text>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                    <Form1 isDisabled={isDisabled} projectData={projectData} setProjectData={setProjectData} />
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                        <Text fontSize='3xl'>Round Setting</Text>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                    <Form2 isDisabled={isDisabled} projectData={projectData} setProjectData={setProjectData} />
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                        <Text fontSize='3xl'>Project Details</Text>
                    </Box>
                    <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                    <Form3 projectData={projectData} setProjectData={setProjectData} />
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};