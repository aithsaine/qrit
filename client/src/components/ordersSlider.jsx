import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import OrderCard from "./card/OrderCard";

export default function OrdersSlider() {
const orders = useSelector(state=>state.orders)

  const [category, setCategory] = useState("pending"); 
//   const products = useSelector((state) => state?.products); 
  const categories = [{id:"pending",name:"pending orders"},{id:"confirmed",name:"confirmed orders"}]; 
  const swiperRef = useRef(null); // Reference to Swiper instance

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    swiperRef.current?.slideTo(categories.findIndex((cat) => cat.id === selectedCategory)); 
  };
  const colors = [
    "#FFA500", // Orange
    "#008000", // Green
    "#FF00FF", // Magenta

    "#FFC0CB", // Pink
    "#0000FF", // Blue
    "#00FF00", // Lime
    "#FF0000", // Red
    "#FFFF00", // Yellow
    "#800080", // Purple
    "#808080", // Gray
    "#00FFFF", // Cyan
    "#808000", // Olive
    "#000080", // Navy
    "#008080", // Teal
    "#800000", // Maroon
    "#FFD700", // Gold
    "#40E0D0", // Turquoise
    "#FF1493", // Deep Pink
    "#F0E68C", // Khaki
  ];


  return (
    <div id="products" className="p-2 pb-72 ">

      <div className="flex">
        {categories.map((cat, index) => (
          <span
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`text-center ${cat?.name?.length>10?"text-sm":""}  w-1/2 md:w-[300px] mx-2 cursor-pointer  py-2 border-b-2 ${
              category === cat.id 
                ? `font-bold text-[${colors[index ]}] border-[${colors[index]}]` 
                : "text-gray-800 dark:text-white   border-gray-600"
            }`}
            style={{
              fontWeight: category === cat.id ? 'bold' : 'normal',
              color: category === cat.id ? colors[index ] : '',
              borderColor: category === cat.id ? colors[index] : 'black',
            }}
          >
            {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
          </span>
        ))}
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        onSlideChange={(swiper) => {
          const newCategory = categories[swiper.activeIndex]?.id;
          if (newCategory) setCategory(newCategory);
        }}
        initialSlide={categories.findIndex((cat) => cat.id === category)}
        onSwiper={(swiper) => (swiperRef.current = swiper)}  
      >
        {categories.map((cat) => (
          <SwiperSlide 
          key={cat.id}>
            <div className="flex max-w-[620px] flex-col space-y-3 mt-3 items-start">
              {orders
                ?.filter((item) => item?.status === cat.id) 
                ?.map((elem, index) => (
                  <OrderCard
                    key={index}
                    status={elem?.status}
                    date={elem?.date}
                    totalPrice={elem?.total}
                    tableNumber={elem?.table}
                  />
                ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
