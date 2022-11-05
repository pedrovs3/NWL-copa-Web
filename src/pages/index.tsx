import {api} from "../lib/axios";
import Image from 'next/image';
import appPreviewImage from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import usersAvatarExampleImg from '../assets/users-avatar-example.png';
import iconCheckImg from '../assets/icon-check.svg';
import {FormEvent, useState} from "react";

interface HomeProps {
  poolCount: number,
  guessCount: number,
  userCount: number,
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  console.log(poolTitle)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await api.post('pools', {
        title: poolTitle
      })

      const {code} = response.data;
      await navigator.clipboard.writeText(code)
      alert('Bolão criado com sucesso!! O seu codigo foi copiado para a area de transferencia.')

      setPoolTitle('');
    } catch (e) {
      console.log(e)
      alert('Falha ao criar o bolao, tente novamente.')
    }

  }

  return (
    <div
      className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28"
    >
      <main>
        <Image src={logoImg} alt="Logo da nlw copa"/>
        <h1 className="mt-14 text-white font-bold text-5xl leading-tight">Crie
          seu próprio bolão da copa e
          compartilhe entre
          amigos!
        </h1>
        <div className="mt-10 flex items-center gap-2">
          <Image
            src={usersAvatarExampleImg}
            alt="Ilustraçao com fotos de usuários."
          />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+ {props.userCount}</span> pessoas
            já estão
            usando
          </strong>
        </div>

        <form onSubmit={handleSubmit} className="input-group flex mt-10">
          <input
            className="input flex-1 text-sm"
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            onChange={event => {
              setPoolTitle(event.target.value)
            }}
            value={poolTitle}
          />
          <button
            className="btn btn-primary font-bold text-sm uppercase"
            type="submit"
          >Criar
            meu
            bolão
          </button>
        </form>

        <p className="mt-4 text-small text-gray-300 leading-relaxed">Após criar
          seu bolão, você
          receberá um código único
          que
          poderá usar
          para convidar outras pessoas 🚀
        </p>
        <div
          className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100"
        >
          <div className="flex items-center gap-8">
            <Image src={iconCheckImg} alt=""/>
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+ {props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className="w-px h-14 bg-gray-600"></div>
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt=""/>
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+ {props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={appPreviewImage}
        alt="Dois celulares exibindo uma previa do app nlw-Copa"
        quality={100}
      />
    </div>
  );
}

export const getStaticProps = async () => {
  // Fazer uma concorrencia entre duas promisses (roda-las juntas)
  const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
    revalidate: 600,
  };
}

// export const getServerSideProps = async () => {
//   // Fazer uma concorrencia entre duas promisses (roda-las juntas)
//   const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
//     api.get('pools/count'),
//     api.get('guesses/count'),
//     api.get('users/count'),
//   ]);
//
//   return {
//     props: {
//       poolCount: poolCountResponse.data.count,
//       guessCount: guessCountResponse.data.count,
//       userCount: userCountResponse.data.count,
//     },
//   };
// };
