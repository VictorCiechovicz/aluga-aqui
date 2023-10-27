'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/use-toast'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ToastAction } from '@/components/ui/toast'
import { Textarea } from '@/components/ui/textarea'
import { CldUploadButton } from 'next-cloudinary'
import { House } from '@prisma/client'
import Image from 'next/image'
import { Icons } from '@/components/ui/icons'

const accountFormSchema = z.object({
  title: z
    .string({ required_error: 'Informe Título.' })
    .min(5, {
      message: 'Título com mínimo 5 caracteres.'
    })
    .max(50, {
      message: 'Título máximo 50 caracteres.'
    }),
  location: z.string({ required_error: 'Informe Localização.' }),
  price: z.string({ required_error: 'Informe Preço.' }),
  description: z.string({ required_error: 'Informe Quantidade de Quartos.' }),
  numberBedrooms: z.string({
    required_error: 'Informe Quantidade de Quartos.'
  }),

  numberBathrooms: z.string({
    required_error: 'Informe Quantidade de Banheiros.'
  }),
  number: z.string({
    required_error: 'Informe o número de Celular.'
  })
})

type FormValues = z.infer<typeof accountFormSchema>

interface AnnounceFormProps {
  house?: House
}

export function AnnounceForm({ house }: AnnounceFormProps) {
  const [imagesUrl, setImagesUrl] = useState<string[]>(
    house ? house.images : []
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      title: house?.name || '',
      location: house?.adress || '',
      price: house?.price || '',
      description: house?.description || '',
      numberBedrooms: house?.numberBedrooms || '',
      numberBathrooms: house?.numberBathrooms || '',
      number: house?.number || ''
    }
  })

  const { toast } = useToast()
  const router = useRouter()

  async function getCoordinatesFromAddress(address: any) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`
    )

    const data = await response.json()

    if (data.status === 'OK') {
      const location = data.results[0].geometry.location
      const formattedAddress = data.results[0].formatted_address
      return {
        location: [location.lat, location.lng],
        address: formattedAddress
      }
    } else {
      return null
    }
  }

  const handleUpload = (result: any) => {
    const url = result?.info?.secure_url
    if (url) {
      setImagesUrl(prevUrls => [...prevUrls, url])
    }
  }
  const handleRemoveImage = (result: any) => {
    setImagesUrl(prevUrls => prevUrls.filter(url => url !== result) ?? [])
  }

  const handleUpdateHouse = async (data: House) => {
    const coords = await getCoordinatesFromAddress(data.adress)

    if (coords) {
      const infos = {
        name: data.name,
        price: data.price,
        adress: coords.address,
        coords: String(coords.location),
        images: imagesUrl,
        description: data.description,
        numberBedrooms: data.numberBedrooms,
        numberBathrooms: data.numberBathrooms
      }
      axios
        .put(`/api/house/${data.id}`, infos)
        .then(() => {
          toast({
            title: 'Casa Atualizada',
            description: 'Anuncio atualizado com sucesso!',
            variant: 'default'
          })
        })
        .catch(() =>
          toast({
            title: 'Casa não Atualizada',
            description: 'Não foi possível atualizar o anuncio!',
            variant: 'destructive'
          })
        )
        .finally(() => {
          router.push('/profile'), router.refresh()
        })
    }
  }

  const onSubmit = async (data: FormValues) => {
    if (imagesUrl.length < 10) {
      const coords = await getCoordinatesFromAddress(data.location)

      if (coords) {
        const infos = {
          name: data.title,
          price: data.price,
          adress: coords.address,
          coords: String(coords.location),
          images: imagesUrl,
          number: data.number,
          description: data.description,
          numberBedrooms: data.numberBedrooms,
          numberBathrooms: data.numberBathrooms
        }

        if (house && house.id) {
          handleUpdateHouse({
            ...infos,
            id: house.id,
            createdAt: house.createdAt,
            updateAt: new Date(),
            userId: house.userId
          })
        } else {
          axios
            .post('/api/house', infos)
            .then(() => {
              toast({
                title: 'Ebaaaa...',
                description: 'Casa anunciada com sucesso!',
                variant: 'default'
              })
            })
            .catch(() =>
              toast({
                title: 'Oops...',
                description: 'Não foi possível realizar o anuncio',
                variant: 'destructive'
              })
            )
            .finally(() => {
              router.push('/'), router.refresh()
            })
        }
      } else {
        console.error('Error getting coordinates from address.')
      }
    } else {
      toast({
        title: 'Oops...',
        description: 'Numero máximo de 10 Imagens',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="p-4 bg-gray-100 flex justify-center">
      <div className="bg-white p-4 w-[956px] rounded-lg">
        <div className="mb-4">
          <p className="font-semibold text-2xl">Anunciar Imóvel</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="border rounded-lg">
              <div className="border bg-gray-100 p-1">
                <p className="font-semibold text-lg">Detalhes</p>
              </div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="p-2">
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título" {...field} />
                    </FormControl>
                    <FormDescription>
                      Procure informar a localização e pontos fortes do imóvel.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="p-2">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Descrição" {...field} />
                    </FormControl>
                    <FormDescription>
                      Procure descrever o máximo de detalhes do imóvel para
                      conseguir maior visibilidade.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="border rounded-lg">
              <div className="border bg-gray-100 p-1">
                <p className="font-semibold text-lg">Endereço</p>
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="p-2">
                    <FormLabel>Localização</FormLabel>
                    <FormControl>
                      <Input placeholder="Localização" {...field} />
                    </FormControl>
                    <FormDescription>
                      Exemplo: Condomínio ou rua, bairro, cidade e estado.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border rounded-lg">
              <div className="border bg-gray-100 p-1">
                <p className="font-semibold text-lg">Quantidades</p>
              </div>
              <FormField
                control={form.control}
                name="numberBedrooms"
                render={({ field }) => (
                  <FormItem className="p-2">
                    <FormLabel>Quartos</FormLabel>
                    <FormControl>
                      <Input placeholder="Quartos" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberBathrooms"
                render={({ field }) => (
                  <FormItem className="p-2">
                    <FormLabel>Banheiros</FormLabel>
                    <FormControl>
                      <Input placeholder="Banheiros" {...field} />
                    </FormControl>
                    <FormDescription>
                      Informe a quantidade de comodos do imóvel.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="border rounded-lg">
              <div className="border bg-gray-100 p-1">
                <p className="font-semibold text-lg">Contato</p>
              </div>
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem className="p-2">
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <Input placeholder="Celular" {...field} />
                    </FormControl>
                    <FormDescription>Informe seu WhatsApp.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="border rounded-lg">
              <div className="border bg-gray-100 p-1">
                <p className="font-semibold text-lg">Valores</p>
              </div>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="p-2">
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input placeholder="Preço (R$)" {...field} />
                    </FormControl>
                    <FormDescription>
                      Informe o valor mensal do aluguel do imóvel.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border rounded-lg">
              <div className="border bg-gray-100 p-1">
                <p className="font-semibold text-lg">Fotos</p>
              </div>
              <div className="flex gap-4 overflow-x-auto p-2">
                {imagesUrl.map(image => (
                  <div key={image} className="relative inline-block">
                    <Image
                      src={image}
                      alt="Image House"
                      width={500}
                      height={40}
                    />

                    <button
                      className=" flex items-center justify-center absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6"
                      onClick={() => handleRemoveImage(image)}
                    >
                      <Icons.xCicle />
                    </button>
                  </div>
                ))}
              </div>

              {imagesUrl.length < 10 ? (
                <CldUploadButton
                  onUpload={handleUpload}
                  uploadPreset="fimxfjhg"
                  className="p-2"
                >
                  <div className="bg-blue-900  p-2 rounded-md ">
                    <p className="text-white font-medium text-md">
                      Carregar Fotos
                    </p>
                  </div>
                </CldUploadButton>
              ) : (
                <div className="p-2">Número máximo de images</div>
              )}
            </div>

            <div className="w-full flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.back()}
              >
                Voltar
              </Button>
              <Button className="bg-blue-800  text-white" type="submit">
                Anunciar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
