import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './Banner.css'

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const Banner = () => {

    return (
        <React.Fragment>
            <div className="banner-ct">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    slidesPerGroup={1}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    speed={2000}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper banner">
                    <SwiperSlide><img src="https://seve7.vn/wp-content/themes/yootheme/cache/1-1-4-scaled-ae546fe9.jpeg" alt="" /></SwiperSlide>
                    <SwiperSlide><img src="https://estaticos-cdn.sport.es/clip/0f4fe6b9-8b4d-4305-8aa0-0d552628d293_alta-libre-aspect-ratio_default_0.jpg" alt="" /></SwiperSlide>
                    <SwiperSlide><img src="https://iphone14.com.vn/wp-content/uploads/2022/08/Banner_iPhone_14_Pro_Max.jpg" alt="" /></SwiperSlide>
                    <SwiperSlide><img src="https://macad.vn/upload/banner-watch-seri4.jpg" alt="" /></SwiperSlide>
                    <SwiperSlide><img src="https://d4u4h6j8.stackpathcdn.com/wp-content/uploads/2020/06/produtos-apple.jpg" alt="" /></SwiperSlide>
                </Swiper>
            </div>
        </React.Fragment>
    );
}

export default Banner;