import { Flex, FormControl, FormLabel, Input, Select, Textarea } from "@chakra-ui/react";
import React from 'react';
import { FormProps } from "components/types";

export const Form1: React.FC<FormProps> = (props) => {

  return (
    <Flex flexDir="column" width="100%" gap={4}>
      <FormControl>
        <FormLabel htmlFor='name'>Project name</FormLabel>
        <Input
          required
          id='name'
          onChange={(e) => { props.setProjectData({ ...props.projectData, name: e.target.value }) }}
          value={props.projectData?.name}
          placeholder='Stepping Stones'
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='description'>Description</FormLabel>
        <Textarea
          required
          onChange={(e) => { props.setProjectData({ ...props.projectData, description: e.target.value }) }}
          value={props.projectData?.description}
          id='description'
          placeholder='Recalibrate with Acupoints designed by Oriental Acupuncture methodology. Apex cushioning, energy return, arch support, sustainable!'
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor='name'>Category</FormLabel>
        {/* duplcaited in SearchSection */}
        <Select
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
          <option value='file&design'>Film & Video</option>
        </Select>
      </FormControl>
    </Flex>
  );
};