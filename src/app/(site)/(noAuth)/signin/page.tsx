import Link from 'next/link'
import { AuthForm } from '@/components/Form/AuthForm'

export default function SignIn() {
  return (
    <>
      <div className=""></div>
      <div className="container relative hidden h-[700px] flex-col items-center justify-center md:grid lg:max-w-none ">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Entre com sua conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Insira suas informações abaixo para acessar sua conta
              </p>
            </div>
            <AuthForm mode="signin" />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Não possuí uma conta?{' '}
              <Link
                href="/signup"
                className="underline underline-offset-4 hover:text-primary"
              >
                Registre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
