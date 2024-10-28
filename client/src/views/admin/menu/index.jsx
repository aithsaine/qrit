import React from 'react'
import NewCategoryModal from 'components/category/store';
import CustomTabView from 'components/tabView';
import NewProductModal from 'components/product/AddProduct';
import { useSelector } from 'react-redux';

export default function Menu() {
  const {categories} = useSelector(state=>state)
 
  return (
    <div className='flex w-full mt-4 flex-col'>
<div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-4'>
<NewCategoryModal/>
      <NewProductModal/>
        {/* <Button text="Ajouter Un Plat"/> */}
      </div>
      
<CustomTabView categories={categories}/>


    </div>
  )
}
