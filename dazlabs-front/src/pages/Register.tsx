import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../components/ui/form"
import { Input } from "../components/ui/input"

import { Link, useNavigate } from "react-router-dom"
import { register } from "../services/auth.service"

  const formSchema = z.object({
    name: z.string({message: 'El nombre es requerido'}),
    email: z.string({message: 'El email es requerido'}).email({message: 'Introduzca un email valido'}),
    password: z.string({message: 'La contraseña es requerida'}).min(6, {message: 'La contraseña debe ser de un minimo de 6 caracteres'})
  })

export default function Register() {

  const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
      })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await register(values.name, values.email, values.password)
            console.log(response)
            if(response.status === 201){
              return navigate('/cat-list')
            }
            
        } catch (error) {
            return error
        }
    }

    return (
        <div className="flex flex-col gap-5">
        <h1>Registro</h1>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Registrar</Button>
        </form>
        <Link to={'/'}>
            <a>Iniciar sesion</a>
          </Link>
      </Form>

        </div>
    )
}