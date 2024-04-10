import { Box, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const links = {
  linkedin_johnson: 'https://www.linkedin.com/in/johnsonccc/',
  linkedin_gigi: 'https://www.linkedin.com/in/chiangi28',
  github: 'https://github.com/Johnsoncpk/FundFlow.Frontend',
};

const Footer = () => {
  return (
    <Box textAlign={'center'} w="full" p={6}>
      <Text>
        📖 repo here {' '}
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
