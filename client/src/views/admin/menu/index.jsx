import api from 'helpers/api';
import React, { useEffect, useState } from 'react'
import NewCategoryModal from 'components/category/store';
import CustomTabView from 'components/tabView';
import { useDispatch, useSelector } from 'react-redux';
import { initialiseData } from '../../../redux/actionCreators';

export default function Menu() {
  const {categories} = useSelector(state=>state)
    const dispatch = useDispatch()
      const getCategories = async ()=>{
        try {
            const {data} = await api.get("/api/home")
            if(data){
              dispatch(initialiseData(data))
            }
        } catch (error) {

        }
    }
    useEffect(()=>{
      getCategories()
      

    },[])
    const items = ["text1","text2","text3"]
  return (
    <div className='flex w-full mt-4 flex-col'>
      <div className='flex space-x-2 my-4'>
      <NewCategoryModal/>
        {/* <Button text="Ajouter Un Plat"/> */}
      </div>
      
<CustomTabView categories={categories}/>


    </div>
  )
}
