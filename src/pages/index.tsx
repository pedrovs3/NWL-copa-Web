interface HomeProps {
    count: number;
}

export default function Home(props: HomeProps) {
    return (
        <>
            <h1 className="">Contagem de bolões = {props.count}</h1>
            <button className="btn btn-primary w-64 rounded-full">Enviar</button>
        </>
    )
}

export const getServerSideProps = async () => {
    const response = await fetch('http://localhost:3333/pools/count')
    const data = await response.json()

    return {
        props: {
            count: data.count,
        }
    }
}
