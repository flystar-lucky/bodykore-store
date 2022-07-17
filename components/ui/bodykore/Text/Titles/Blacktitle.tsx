interface BlacktitleProps {
    title?: string;
    textSize?: string;
    textColor?: string
    id?: string
}

export default function Blacktitle({ title, textSize, textColor, id }: BlacktitleProps) {
    return (
        <>
        <section id={id} className="max-w-7xl m-auto">
            <div className="flex justify-center lg:justify-start">
                <h1 className={`${textColor} ${textSize} font-bebas font-bold italic text-center md:text-left`}>{title}</h1>
            </div>      
        </section>
        </>
    )
}