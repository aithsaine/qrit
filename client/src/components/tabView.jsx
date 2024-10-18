import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { useSelector } from 'react-redux';
import ProductCard from './card/ProductCard';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


export default function CustomTabView({categories}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const {products}= useSelector(state=>state)
  const handleTabChange = (e) => {
    setActiveIndex(e.index);
  };
  return (
    <div className="p-4">
      <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
        {/* TabPanel 1 */}
       {categories.map((item,index)=>{
        return(
<TabPanel
          header={item?.name}
          headerClassName={`cursor-pointer px-4 py-2 ${
            activeIndex === index
              ? 'border-b-4 border-red-500 text-red-500 font-bold'
              : 'text-gray-500 hover:text-red-500'
          } transition-colors duration-300`}
        >
           <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
          
          {products.filter(product=>product.category_id==item.id).map(product=>{
            return (
            <SwiperSlide key={product.id}>

              <ProductCard image={`${process.env.REACT_APP_BACKEND_URI}/storage/products/${product?.image}`} name={product?.name} price={product?.price}/>
              </SwiperSlide>
            )
          })}
      
      </Swiper>
        </TabPanel>
        )
       }) }

      
      </TabView>
    </div>
  );
}
