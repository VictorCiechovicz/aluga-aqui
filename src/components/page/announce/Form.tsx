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
  CEP: z.string({
    required_error: 'Informe CEP.'
  }),
  price: z.string({ required_error: 'Informe Preço.' })
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
      return [location.lat, location.lng]
    } else {
      return null
    }
  }

  const onSubmit = async (data: FormValues) => {
    const coords = await getCoordinatesFromAddress(data.location)

    if (coords) {
      console.error(coords)
    } else {
      console.error('Error getting coordinates from address.')
    }
  }
  return (
    <div className="p-4">
      <div className="mb-4">
        <p className="font-semibold text-2xl">Anunciar Imóvel</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <Input placeholder="Título" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
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
          <FormField
            control={form.control}
            name="CEP"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input placeholder="CEP" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input placeholder="Preço (R$)" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end">
            <Button type="button">Voltar</Button>
            <Button className="bg-slate-500 text-white" type="submit">
              Anunciar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
