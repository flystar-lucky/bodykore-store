interface TextRImgProps {
    title?: string;
    description?: string
    img?: string;
}

export default function TextRImg({ title, description, img }: TextRImgProps) {
    return (
        <>
        <section className="max-w-7xl m-auto">
            <div className="flex flex-wrap justify-center items-center gap-16">
                <div className='md:w-2/5'>
                    <h1 className="text-black-373933 text-5xl font-bebas font-bold italic text-center lg:text-left">{title}</h1>
                    <p className="text-black-373933 font-roboto py-6 text-center lg:text-left w-96">{description}</p>
                </div>
                <div>
                    <img src={img} alt="" />
                </div>
            </div>   
        </section>
        </>
    )
}