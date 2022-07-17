
interface FacProps {
    icon?: string
    title?: string
    description?: string
}

interface FactorsProps {
    factors: FacProps[]
    textSize?: string
    division?: string
    imgWidth?: string
    imgHeight?: string
}

export default function Factors({ factors, textSize, division, imgHeight, imgWidth }: FactorsProps) {
    return (
        <section className="max-w-7xl m-auto">
            <div className={`flex flex-wrap flex-row items-center ${division}`}>
                {factors.map((f, i) => {
                    return (
                        <div className="w-full lg:w-1/3 h-16 flex flex-row justify-between items-center mb-10" key={i}>
                            <div className="w-1/3 flex justify-center">
                                <img src={f.icon} alt="" className={`${imgHeight} ${imgWidth}`} />
                            </div>
                            <div className="w-2/3">
                                <p className={`font-bebas text-black-373933 ${textSize}`} style={{ letterSpacing: '0.5px' }}>{f.title}</p>
                                <p className={`font-roboto text-black-373933 ${textSize}`} style={{ letterSpacing: '0.5px' }}>{f.description}</p>
                            </div>
                        </div>
                    )
                })}
                
            </div>
        </section>
    )
}