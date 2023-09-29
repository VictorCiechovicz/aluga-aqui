import Link from 'next/link'

import { AuthForm } from '@/components/Form/AuthForm'
import { Icons } from '@/components/ui/icons'

export default function SignUp() {
  return (
    <>
      <div className=""></div>
      <div className="container relative hidden h-[700px] flex-col items-center justify-center md:grid lg:max-w-none ">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex justify-center w-full ">
              <Icons.house className="w-24" />
            </div>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Criar uma conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Insira suas informações abaixo para criar sua conta
              </p>
            </div>
            <AuthForm mode="signup" />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Já possuí uma conta?{' '}
              <Link
                href="/signin"
                className="underline underline-offset-4 hover:text-primary"
              >
                Acesse agora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
