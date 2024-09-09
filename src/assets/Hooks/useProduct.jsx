import { useQuery } from '@tanstack/react-query';
import React from 'react'

//this is not a react component 3lshan bybd2 b small letter 
// lazem ybd2 b"use"


export default function useProducts() {
   
    function getRecent(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
      }
      
        let responseObject = useQuery({
            queryKey: ['recent-products'],
            queryFn: getRecent,
            // staleTime: 3000, //w2t b3do al data btkon stale 3LTOL,y3ny 5000 b3d 5sec htb2a stale
            //  retry :  6,//law hsl error yhwel ygyb al request tany kam mara abl ma y2ol error?*default 3,true y3ny infintie 
            //  retryDelay : 5000, //al w2t ben kol try w al b3dha
            //  refetchIntervalInBackground:true //hytb2 al refetchinterval hata law ana fe component tany
            // refetchInterval : 3000 , //kol w2t ad eh hat al request dah tany         
            // gcTime:4000 , after 4sec delete all the cache 
            staleTime :80000,
            });
    return responseObject;
}