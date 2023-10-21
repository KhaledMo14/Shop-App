import { ProductCard } from "../components/ProductCard/ProductCard"
import { Header } from "../components/Header/Header"
import { useState } from "react";
import { NavBar } from "../components/NavBar/NavBar";


export const Home = () => {

  const [data, setData] = useState('');
  
  const childToParent = (childdata) => {
    setData(childdata);
  }


  return (

    <>
    <NavBar childToParent={childToParent}/>
    <Header/>
    <ProductCard parentToChild={data} />
    </>
  )
}
