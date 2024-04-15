import { useColorMode } from '@chakra-ui/react';
import Image from 'next/image';

const FundFlowLogo = () => {
  const { colorMode } = useColorMode();

  return (
    <Image
      src={colorMode === 'dark' ? '/Fundflow-DarkBG.svg' : '/Fundflow-LightBG.svg'}
      priority={true}
      height={45}
      width={150}
      alt="FundFlow"
    />
  );
};

export default FundFlowLogo;
