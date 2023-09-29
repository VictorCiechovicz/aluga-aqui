'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { signIn, useSession } from 'next-auth/react'
import axios from 'axios'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'

interface AuthFormProps {
  mode: 'signin' | 'signup'
}


export function AuthForm({ mode }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const session = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)

    if (mode === 'signup') {
      axios
        .post('/api/registerUser', data)
        .then(() => {
          signIn('credentials', data)
          toast({
            title: 'Cadastro de Usuário',
            description: 'Usuário cadastrado com sucesso!',
            variant: 'default'
          })
          router.push('/signin')
        })
        .catch(error =>
          toast({
            title: 'Cadastro de Usuário',
            description: error,
            variant: 'destructive'
          })
        )
        .finally(() => setIsLoading(false))
    } else if (mode === 'signin') {
      signIn('credentials', {
        ...data,
        redirect: false
      })
        .then(callback => {
          if (callback?.error) {
            toast({
              title: 'Login de Usuário',
              description: callback?.error,
              variant: 'destructive'
            })
          }

          if (callback?.ok && !callback?.error) {
            toast({
              title: 'Login de Usuário',
              description: 'Login realizado!',
              variant: 'default'
            })
            router.push('/')
          }
        })
        .finally(() => setIsLoading(false))
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true)
    signIn(action, {
      redirect: false
    })
      .then(callback => {
        if (callback?.error) {
          toast({
            title: 'Opssss...',
            description: 'Não foi possível realizar Login!',
            variant: 'destructive'
          })
        }

        if (callback?.ok && !callback?.error) {
          toast({
            title: 'Ebaaaa...',
            description: 'Login realizado!',
            variant: 'default'
          })
          router.push('/')
        }
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/')
    }
  }, [session?.status, router])

  return (
    <div className={cn('grid gap-6')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            {mode === 'signup' && (
              <>
                <Label className="sr-only" htmlFor="name">
                  Nome
                </Label>
                <Input
                  id="name"
                  placeholder="Nome"
                  type="text"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  {...register('name', { required: true })}
                />
              </>
            )}
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="nome@exemplo.com"
              type="email"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register('email', { required: true })}
            />
        
            <Label className="sr-only" htmlFor="password">
              Senha
            </Label>
            <Input
              id="password"
              placeholder="Senha"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register('password', { required: true })}
            />
          </div>
          <Button disabled={isLoading} className="bg-blue-800">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {mode === 'signup' ? 'Cadastre-se com E-mail' : 'Entrar com e-mail'}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continue
          </span>
        </div>
      </div>
      <Button
        onClick={() => socialAction('google')}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{' '}
        Google
      </Button>
    </div>
  )
}
