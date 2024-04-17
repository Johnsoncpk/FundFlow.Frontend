import { Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select, Textarea, chakra } from "@chakra-ui/react";
import React, { ChangeEvent } from 'react';
import { FormProps } from "utils/types";

export const Form1: React.FC<FormProps & { isDisabled?: boolean }> = ({ projectData, setProjectData, isDisabled = false }) => {

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProjectData({
          ...projectData,
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
          isDisabled={isDisabled}
          id='name'
          onChange={(e) => { setProjectData({ ...projectData, name: e.target.value }) }}
          value={projectData?.name}
          placeholder='Stepping Stones'
        />
        <FormHelperText>
          Display name of the project
        </FormHelperText>
        {
          (projectData.name === "") &&
          <FormErrorMessage>Name is required</FormErrorMessage>
        }
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor='description'>Description</FormLabel>
        <Textarea
          isDisabled={isDisabled}
          onChange={(e) => { setProjectData({ ...projectData, description: e.target.value }) }}
          value={projectData?.description}
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
          isDisabled={isDisabled}
          isRequired
          textAlign={'center'}
          width={'auto'}
          id='category'
          value={projectData?.category}
          onChange={(e) => { setProjectData({ ...projectData, category: e.target.value }) }}>
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
          disabled={isDisabled}
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
          projectData.image &&
          <img src={projectData.image as string} alt="Preview" />
        }
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='name'>External Site (Optional)</FormLabel>
        <Input
          isDisabled={isDisabled}
          id='external_url'
          onChange={(e) => { setProjectData({ ...projectData, external_url: e.target.value }) }}
          value={projectData?.external_url}
          placeholder='https://fund-flow.vercel.app/'
        />
        <FormHelperText>
          Link to your organization/company
        </FormHelperText>
      </FormControl>
    </Flex>
  );
};