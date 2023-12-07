import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div>
      <h1 className="text-center font-bold pb-3">Bem vindo ao site do CRAS!</h1>
      <h2 className="text-center pb-3">Escolha um módulo entre os seguintes:</h2>
      <div className="main flex flex-row gap-5 mt-6 justify-center">
        <Link to="/turmas">
          <div class="block max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div class="relative overflow-hidden bg-cover bg-no-repeat">
              <img
                class="rounded-t-lg"
                src="https://media.istockphoto.com/id/1323715308/photo/african-american-girl-raising-her-hands-while-sitting-on-her-desk-in-the-class-at-school.jpg?s=612x612&w=0&k=20&c=BVEADI9FBMmp_9yC3gnelNsFyvCx44DIhRn7rGVa1pY="
                alt="class"
              />
            </div>
            <div class="p-6">
              <p class="text-center text-neutral-600 dark:text-neutral-200">
                Turmas
              </p>
            </div>
          </div>
        </Link>
        <Link to="/professores">
          <div class="block max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div class="relative overflow-hidden bg-cover bg-no-repeat">
              <img
                class="rounded-t-lg"
                src="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?cs=srgb&dl=pexels-fauxels-3184328.jpg&fm=jpg"
                alt="teacher"
              />
            </div>
            <div class="p-6">
              <p class="text-center text-neutral-600 dark:text-neutral-200">
                Professores
              </p>
            </div>
          </div>
        </Link>
        <Link to="/jogos">
          <div class="block max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div class="relative overflow-hidden bg-cover bg-no-repeat">
              <img
                class="rounded-t-lg"
                src="https://blog.dedobrinquedo.com.br/wp-content/uploads/2021/12/A-import%C3%A2ncia-dos-jogos-educativos-para-crian%C3%A7as.jpg"
                alt="jogos"
              />
            </div>
            <div class="p-6">
              <p class="text-center text-neutral-600 dark:text-neutral-200">
                Jogos
              </p>
            </div>
          </div>
        </Link>
        {/* <Link to="/teste-video">
          <div class="block max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)],0_10px_20px_-2px_rgba(0,0,0,0.04)] darl:bg-neutral-700">
            <div class="relative overflow-hidden bg-cover bg-no-repeat">

            </div>
          </div>
        </Link> */}
      </div>
    </div>
  );
}
