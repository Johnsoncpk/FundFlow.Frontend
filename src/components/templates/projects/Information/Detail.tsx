import {
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorMode
} from '@chakra-ui/react';
import React from 'react';
import { ProjectProps } from 'components/types';
import { Editor } from '@tinymce/tinymce-react';

const Detail: React.FC<ProjectProps> = ({ project }) => {
    const { colorMode } = useColorMode();

    return (
        <Tabs marginTop={"2vw"}>
            <TabList>
                <Tab>Campaign</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    {
                        colorMode === 'light' &&
                        <Editor
                            id='editor-light'
                            apiKey={process.env.NEXT_PUBLIC_TIMYMCE_API_KEY}
                            initialValue={project.metadata?.editorState}
                            init={{
                                statusbar: false,
                                plugins: 'autoresize',
                                autoresize_bottom_margin: 0,
                                menubar: false,
                                toolbar: false,
                                readonly: true,
                                skin: 'oxide',
                                content_css: 'default'
                            }}
                        />
                    }
                    {
                        colorMode !== 'light' &&
                        <Editor
                            id='editor-dark'
                            apiKey={process.env.NEXT_PUBLIC_TIMYMCE_API_KEY}
                            initialValue={project.metadata?.editorState}
                            init={{
                                statusbar: false,
                                plugins: 'autoresize',
                                autoresize_bottom_margin: 0,
                                menubar: false,
                                toolbar: false,
                                readonly: true,
                                skin: 'oxide-dark',
                                content_css: 'dark',
                            }}
                        />
                    }
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export { Detail }