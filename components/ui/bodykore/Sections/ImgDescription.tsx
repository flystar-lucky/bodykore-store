interface ImageProps {
    img: string
    title?: string
    description?: string
}

interface ImgDescriptionProps {
    images: ImageProps[]
    imgHeight: string
    imgWidth: string
    textSize?: string
}

export default function ImgDescription({ images, imgHeight, imgWidth, textSize }: ImgDescriptionProps) {
    return (
        <>
        <section className="max-w-7xl m-auto">
            <div className="flex flex-wrap justify-center gap-8">
                {images.map((img, i) => {
                return (
                    <div key={i}>
                        <div className="flex justify-center">
                            <img className={`${imgHeight} ${imgWidth} mb-5`} src={img.img} alt="" />
                        </div>
                        <h1 className='font-bebas text-4xl font-semibold italic text-center' style={{ letterSpacing: '1px' }}>{img.title}</h1>
                        <p className={`${textSize} font-roboto text-black-1c2023 w-72 text-center`}>{img.description}</p>
                    </div>
                )
                })}
            </div>  

        </section>
        </>
    )
}