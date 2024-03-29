import { Box } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ImageCard } from '../ProjectCard';

const FundFlowSwiper = (props: { projects: readonly {
    name: string;
    url: string;
    totalFundingGoal: bigint;
    totalRound: bigint;
    currentRound: bigint;
    creator: `0x${string}`;
    status: number;
}[] | undefined }) => {

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
                className="fundflowSwiper"
            >
                {props.projects?.length ? (
                    props.projects.map((project, index) => (
                        <SwiperSlide key={index}>
                            <div onClick={() => { console.log(project) }}>
                                <ImageCard project={project} id={index} />
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