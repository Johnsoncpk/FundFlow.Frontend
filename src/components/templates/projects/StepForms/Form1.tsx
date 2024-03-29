import { Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select, Textarea, chakra, useMultiStyleConfig } from "@chakra-ui/react";
import React, { ChangeEvent } from 'react';
import { FormProps } from "components/types";
import { toBase64 } from "utils/format";

export const Form1: React.FC<FormProps> = (props) => {

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          props.setProjectData({ 
            ...props.projectData, 
            image: reader.result
          })
        };
    }
};

  return (
    <Flex flexDir="column" width="100%" gap={4}>
      <FormControl isRequired>
        <FormLabel htmlFor='name'>Project name</FormLabel>
        <Input
          id='name'
          onChange={(e) => { props.setProjectData({ ...props.projectData, name: e.target.value }) }}
          value={props.projectData?.name}
          placeholder='Stepping Stones'
        />
        <FormHelperText>
          Display name of the project
        </FormHelperText>
        {
          (props.projectData.name === "") &&
          <FormErrorMessage>Name is required</FormErrorMessage>
        }
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor='description'>Description</FormLabel>
        <Textarea
          onChange={(e) => { props.setProjectData({ ...props.projectData, description: e.target.value }) }}
          value={props.projectData?.description}
          id='description'
          placeholder='Recalibrate with Acupoints designed by Oriental Acupuncture methodology. Apex cushioning, energy return, arch support, sustainable!'
        />
        <FormHelperText>
          Give some short, precise description to your project
        </FormHelperText>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor='name'>Category</FormLabel>
        {/* duplcaited in SearchSection */}
        <Select
          isRequired
          textAlign={'center'}
          width={'auto'}
          id='category'
          value={props.projectData?.category}
          onChange={(e) => { props.setProjectData({ ...props.projectData, category: e.target.value }) }}>
          <option defaultChecked value=''>Please choose a category</option>
          <option value='art'>Art</option>
          <option value='comicts'>Comics</option>
          <option value='crafts'>Crafts</option>
          <option value='dance'>Dance</option>
          <option value='design'>Design</option>
          <option value='fashion'>Fashion</option>
          <option value='film&video'>Film & Video</option>
          <option value='music'>Music</option>
        </Select>
        <FormHelperText>
          Categorized the project for searching
        </FormHelperText>
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
        <FormHelperText>
          The cover for your project
        </FormHelperText>
        {
          props.projectData.image && 
          <img src={props.projectData.image as string} alt="Preview" />
        } 
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='name'>External Site (Optional)</FormLabel>
        <Input
          id='external_url'
          onChange={(e) => { props.setProjectData({ ...props.projectData, external_url: e.target.value }) }}
          value={props.projectData?.external_url}
          placeholder='https://fund-flow.vercel.app/'
        />
        <FormHelperText>
          Link to your organization/company
        </FormHelperText>
      </FormControl>
    </Flex>
  );
};