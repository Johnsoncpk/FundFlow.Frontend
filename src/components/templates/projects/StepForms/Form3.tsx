import { Flex } from "@chakra-ui/react";
import { CustomEditor } from "components/modules/CustomEditor";
import { FormProps } from 'components/types';

export const Form3: React.FC<FormProps> = (props) => {
  return (
    <Flex flexDir="column" width="100%">
      <CustomEditor formProps={props} />
    </Flex>
  );
};