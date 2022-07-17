import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'

interface VidProps {
    url: string
    title: string
}

interface VideoProps {
  title1?: string;
  title2?: string;
  description?: string;
  videos: VidProps[];
  id?: string;
}

const Video = ({ title1, title2, description, videos, id}: VideoProps) => {
  const sliderRef = useRef<any>();

  return (
    <section id={id} className='max-w-7xl m-auto pb-28 lg:pl-20'>
      <div className='flex justify-center lg:justify-start lg:pl-14' style={{ letterSpacing: '1px' }}>
        <h1 className="text-red-bc2026 text-5xl font-bebas font-bold italic">{title1}</h1>  
        <h1 className="text-black-373933 text-5xl pl-2 font-bebas font-bold italic">{title2}</h1>
      </div>
      <div className='lg:pl-14 py-5'>
        <p className='text-black-1c2023 text-center lg:text-left'>{description}</p>
      </div>
      <div className='flex flex-wrap justify-center lg:justify-start gap-12 px-8 lg:px-0 lg:pl-14 h-fit'>
        {videos.map((video, i) => {
            return (
                <div key={i}>
                  <ReactPlayer
                    className="video_player_index"
                      url={video.url}
                      loop={true}
                      controls={true}
                      width='470px'
                      config={{
                        file: {
                          attributes: {
                            controlsList: 'nodownload'
                          }
                        }
                      }}
                    onPlay={() => {}}
                  />
                  <h1 key={i} className='font-bebas text-2xl text-black-373933 pt-4'>{video.title}</h1>
                </div>  
            )
        })}

      </div>
    </section>
  )
}

export default Video