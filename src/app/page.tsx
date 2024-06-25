"use client"
import styles from "./page.module.css";
import TableComponent from "./components/TableView";
import React, { useEffect, useState } from 'react';

export default function Home() {
  // https://react.dev/reference/react/hooks
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let [currentPage, setPage] = useState(1);
  const [isNext, setNext] = useState(true);
  const [isPrev, setPrev] = useState(false);

  useEffect(() => {
    fetchData(1);
  }, []);


  const fetchData = async (page:number) => {
    const response = await fetch("https://swapi.dev/api/people?page="+page);
    const tdata = await response.json();
   
    tdata.next==null?setNext(false):setNext(true);
    tdata.previous==null?setPrev(false):setPrev(true);

    const nestedApiDataPromises = tdata.results.map(async (item:any) => {
        const nestedResponse = await fetch(item.homeworld);
        const homeworld = await nestedResponse.json();
        return { ...item, homeworld };
    });

    let combinedData = await Promise.all(nestedApiDataPromises);

    let filterdData = await filterData(combinedData);
    console.log(filterdData)

    setData(filterdData);
    setLoading(false);
    setPage(page);
  };

  const filterData =async (array:any)=>{
    console.log(array)
    return array.filter((item:any) => item.hair_color === 'brown');
  }

  const nextPage = async () => {
    setPage(currentPage++);
    fetchData(currentPage)
  };

  const prevPage = async () => {
    setPage(currentPage--);
    fetchData(currentPage)
  };




  return (
    <main className={styles.main}>
      <div>
      {isPrev?<button onClick={() => prevPage()}>Prev Page</button>:''}
      {isNext? <button onClick={() => nextPage()}>Next Page</button>:''}
        {loading ?(
      <p>Loading...</p>
    ): <TableComponent  data={data} /> }
       
      </div>
    </main>
  );
}
