import { Flex } from "@chakra-ui/react";
// import { CustomEditor } from "components/modules/CustomEditor";
import { FormProps } from 'components/types';
import React from "react";
import { Editor } from '@tinymce/tinymce-react';
import DEFAULT_CONTENT from './DefaultWYSIWYGValue';
export const Form3: React.FC<FormProps> = (props) => {

  return (
    <Flex flexDir="column" width="100%">
      {/* <CustomEditor formProps={props} /> */}
      <Editor
        apiKey={process.env.TIMYMCE_API_KEY}
        init={{
          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ],
          ai_request: (_, respondWith: { string: (arg0: () => string) => string; }) => respondWith.string(() => "See docs to implement AI Assistant"),
        }}
        value={props.projectData.editorState}
        onEditorChange={(newValue, _) => {
          props.setProjectData({ ...props.projectData, editorState: newValue });
        }}
        initialValue={DEFAULT_CONTENT}
      />
    </Flex>
  );
};