import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import {Videos, ChannelCard} from './'
import { fetchFromAPI } from "../utils/fetchFromAPI";


const ChannelDetail = () => {
  const {id} = useParams();
  // console.log(id)

  const [videos, setVideos] = useState([]);
  const [channelDetail, setChannelDetail] = useState(null);

  useEffect(()=>{
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data)=> setChannelDetail(data.items[0]))//console.log(data)

      fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data)=> setVideos(data?.items))//console.log(data)
  },[id]);

  

  // console.log(channelDetail, videos);


  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
            background: 'linear-gradient(90deg, rgba(224,1,181,1) 39%, rgba(0,212,255,1) 100%)',
            zIndex: 10,
            height: '300px',
          }}/>
        <ChannelCard channelDetail={channelDetail} marginTop="-93px"/>
      </Box>
      <Box display="flex" p="2">
        <Box sx= {{mr: {sm: '100px'}}}/>
        <Videos videos={videos}/>
      </Box>
    </Box>
  )
}

export default ChannelDetail