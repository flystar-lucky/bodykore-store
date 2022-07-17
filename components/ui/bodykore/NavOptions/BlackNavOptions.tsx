interface OptionProps {
    icon?: string
    text?: string,
    id: string
}

interface BlackNavOptionsProps {
    options: OptionProps[]
    height?: string
}

export default function BlackNavOptions({ options, height }: BlackNavOptionsProps ) {
    
    const scrollDown = (id : string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            })
        }
    }

    return (
        <>
            {/*Main Image*/}
            <div className={`flex flex-wrap justify-center items-center gap-6 xl:gap-24 py-8 font-roboto text-sm text-white bg-black ${height} max-w-7xl m-auto`} style={{ letterSpacing: '1px' }}>
                {options.map((o, i) => {
                    return (
                        <div key={i} className="flex gap-2 px-6">
                            <img src={o.icon} alt="" />
                            <h1 className="cursor-pointer" onClick={() => scrollDown(o.id)}>{o.text}</h1>
                        </div>
                    )
                })}
            </div>
        </>
    )
}