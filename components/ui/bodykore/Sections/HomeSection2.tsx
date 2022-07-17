interface OptionsProps {
    icon: string
    title: string
}

interface HomeSection2Props {
    title1: string
    title2: string
    description: string
    options: OptionsProps[]
}

export default function HomeSection2({ title1, title2, description, options }: HomeSection2Props) {
    return (
        <>
        <section className="w-full">
            <div className="h-4 bg-red-bc2026"></div>
                <div className="h-fit pt-12 bg-black justify-center text-center">
                <div className='w-full flex flex-col'>
                    <div className="flex justify-center pt-48 px-10">
                        <h1 className="text-red-bc2026 pr-2 text-4xl lg:text-5xl font-bebas font-bold italic">{title1}</h1>
                        <h1 className="text-white-f2f9fa text-4xl lg:text-5xl font-bebas font-bold italic">{title2}</h1>
                    </div>
                    <p className="text-white-f2f9fa px-12 lg:px-80 pt-6 text-sm lg:text-md font-roboto leading-7">
                    {description}
                    </p>
                </div>
                </div>
                {/*Imagenes benefits*/}
                <div className="bg-black">
                    <div className="flex flex-wrap justify-center md:justify-between md:justify-between xl:justify-between w-full pb-16 md:pb-48 lg:pb-48 xl:pb-48 text-white-f2f9fa h-fit pt-10 lg:pt-24 text-sm max-w-7xl m-auto">
                        {options.map((o, i) => {
                            return (
                                <div className="px-5 py-5" key={i}>
                                    <div className="flex justify-center">
                                        <img src={o.icon} alt="" />
                                    </div>
                                    <p className="font-acumin-pro pt-4 text-center w-32">{o.title}</p>  
                                </div>
                            )
                        })}
                    </div>
                </div>
            <div className="w-full h-4 bg-red-bc2026"></div>
 
        </section>
        </>
    )
}