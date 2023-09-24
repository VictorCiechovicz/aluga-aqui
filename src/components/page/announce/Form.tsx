'use client'

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
import useUserInfo from '@/hook/useUserInf'
import { Textarea } from '@/components/ui/textarea'

const accountFormSchema = z.object({
  title: z
    .string({ required_error: 'Informe Título.' })
    .min(5, {
      message: 'Título com mínimo 5 caracteres.'
    })
    .max(30, {
      message: 'Título máximo 10 caracteres.'
    }),
  location: z.string({ required_error: 'Informe Localização.' }),
  price: z.string({ required_error: 'Informe Preço.' }),
  description: z.string({ required_error: 'Informe a Descrição.' }),
  numberBedrooms: z.string({ required_error: 'Informe Quantido de Quartos.' }),
  numberBathrooms: z.string({ required_error: 'Informe Quantido de Banheiro.' })
})

type FormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<FormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
}

export function AnnounceForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues
  })
  const { toast } = useToast()
  const router = useRouter()
  const session = useUserInfo()

  async function getCoordinatesFromAddress(address: any) {
    const apiKey = 'AIzaSyCXPvOLnd7oa9Hz-NZBu-f4QkkXifNBn9I'
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

  const onSubmit = async (data: FormValues) => {
    const coords = await getCoordinatesFromAddress(data.location)
    console.log(coords)

    if (coords) {
      const infos = {
        name: data.title,
        price: data.price,
        adress: coords.address,
        coords: String(coords.location),
        images: [],
        userId: session.user?.id,
        description: data.description,
        numberBedrooms: data.numberBedrooms,
        numberBathrooms: data.numberBathrooms
      }

      axios
        .post('/api/house', infos)
        .then(() => {
          toast({
            title: 'Ebaaaa...',
            description: 'Casa Anunciada com sucesso!',
            variant: 'default'
          })
        })
        .catch(() =>
          toast({
            title: 'Oops...',
            description: 'Não foi possível realizar o anuncio',
            variant: 'destructive',
            action: (
              <ToastAction altText="Tente Novamente">
                Tente Novamente
              </ToastAction>
            )
          })
        )
        .finally(() => router.push('/'))
    } else {
      console.error('Error getting coordinates from address.')
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

            <div className="w-full flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.back()}
              >
                Voltar
              </Button>
              <Button className="bg-blue-900  text-white" type="submit">
                Anunciar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
