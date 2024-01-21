import { Box, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const links = {
  linkedin_johnson: 'https://github.com/ethereum-boilerplate/ethereum-boilerplate/',
  linkedin_gigi: 'https://forum.moralis.io/',
  github: 'https://moralis.io/?utm_source=boilerplatehosted&utm_medium=todo&utm_campaign=ethereum-boilerplate',
};

const Footer = () => {
  return (
    <Box textAlign={'center'} w="full" p={6}>
      <Text>
        📖 Code repo here {' '}
        <Link href={links.github} isExternal alignItems={'center'}>
          Github <ExternalLinkIcon />
        </Link>
      </Text>
      <Text>
        ⭐️ Done by two CityU students {' '}
      </Text>
      <Text>
        <Link href={links.linkedin_johnson} isExternal alignItems={'center'}>
          Johnson <ExternalLinkIcon />
        </Link>
        {' '} And {' '}
        <Link href={links.linkedin_gigi} isExternal alignItems={'center'}>
          Gigi <ExternalLinkIcon />
        </Link>
      </Text>
    </Box>
  );
};

export default Footer;
