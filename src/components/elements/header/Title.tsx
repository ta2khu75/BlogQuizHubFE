interface Props {
    title: string
}
const Title = ({ title }: Readonly<Props>) => {
    return (
        <h1 className='text-4xl'>{title}</h1>
    )
}

export default Title