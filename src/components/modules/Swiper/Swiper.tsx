import { Box } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ImageCard } from '../ProjectCard';
import { EvmNft } from 'moralis/common-evm-utils';

const FundFlowSwiper = (props: { nfts: EvmNft[] | undefined }) => {

    return (
        <Box w={'full'} h={'40vh'} bg={'dark'}>
            <Swiper
                slidesPerView={4}
                spaceBetween={10}
                breakpoints={{
                    480: {
                        slidesPerView: 2,
                    },
                    640: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {props.nfts?.length ? (
                    props.nfts.map((nft, key) => (
                        <SwiperSlide key={key}>
                            <div onClick={() => { console.log("hi") }}>
                                <ImageCard nft={nft} key={key} />
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <Box>Looks Like You Are The First User Of The Platform</Box>
                )}
            </Swiper>
        </Box>
    );
};

export default FundFlowSwiper;