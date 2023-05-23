
import CardVideo from "../cardVideo/CardVideo"
import "./containerVideoCard.css"

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';

import useVideoQuestion from "../../hooks/useVideoQuestion";



const ContainerVideoCard = () => {

    let { dataVQ } = useVideoQuestion()
    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={4}
            navigation
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        >
            {dataVQ.map((dataVideodadda, i) => <SwiperSlide key={i + 'cvc'}>
                <CardVideo dataVideo={dataVideodadda}></CardVideo>
            </SwiperSlide>)}
        </Swiper>
    )
}

export default ContainerVideoCard