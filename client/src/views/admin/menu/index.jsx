import React from 'react'
import NewCategoryModal from 'components/category/store';
import CustomTabView from 'components/tabView';
import NewProductModal from 'components/product/AddProduct';
import { useSelector } from 'react-redux';

export default function Menu() {
  const {categories} = useSelector(state=>state)
 
  return (
    <div className='flex w-full mt-4 flex-col'>
      <div className='flex space-x-2 my-4'>
      <NewCategoryModal/>
      <NewProductModal/>
        {/* <Button text="Ajouter Un Plat"/> */}
      </div>
      
<CustomTabView categories={categories}/>


    </div>
  )
}
