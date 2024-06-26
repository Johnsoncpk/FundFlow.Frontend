import { Flex, Text, useColorMode } from "@chakra-ui/react";
import { FormProps } from 'utils/types';
import React from "react";
import { Editor } from '@tinymce/tinymce-react';

export const Form3: React.FC<FormProps> = (props) => {
  const { colorMode } = useColorMode();

  return (
    <Flex flexDir="column" width="100%" margin={"auto"} gap={4}>
      <Text fontSize='xl'>Edit this page and add any information you want, images, videos are suppoerted!</Text>
      {
        colorMode === 'light' &&
        <Editor
          id='editor-light'
          apiKey={process.env.NEXT_PUBLIC_TIMYMCE_API_KEY}
          init={{
            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            autoresize_bottom_margin: 0,
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (_: unknown, respondWith: { string: (arg0: () => string) => string; }) => respondWith.string(() => "See docs to implement AI Assistant"),
            skin: 'oxide',
            content_css: 'default'
          }}
          value={props.projectData.editorState}
          onEditorChange={(newValue, _) => {
            props.setProjectData({ ...props.projectData, editorState: newValue });
          }}
        />
      }
      {
        colorMode !== 'light' &&
        <Editor
          id='editor-dark'
          apiKey={process.env.NEXT_PUBLIC_TIMYMCE_API_KEY}
          init={{
            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            autoresize_bottom_margin: 0,
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            ai_request: (_: unknown, respondWith: { string: (arg0: () => string) => string; }) => respondWith.string(() => "See docs to implement AI Assistant"),
            skin: 'oxide-dark',
            content_css: 'dark',
          }}
          value={props.projectData.editorState}
          onEditorChange={(newValue, _) => {
            props.setProjectData({ ...props.projectData, editorState: newValue });
          }}
        />
      }
    </Flex>
  );
};