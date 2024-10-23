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

  import { Link, useNavigate} from "react-router-dom"
  import { login } from "../services/auth.service"

  const formSchema = z.object({
    email: z.string().email({message: 'Introduzca un email valido'}),
    password: z.string().min(6, {message: 'La contraseña debe ser de un minimo de 6 caracteres'})
  })


export default function Login() {

  const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
      })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await login(values.email, values.password)
            console.log(response.status)
            if(response.status === 200){
              return navigate("/cat-list")
            }
            alert('Email o contraseña incorrecta')
        } catch (error) {
            console.log(error)
        }
        //console.log(values)
    }
    return (
        <div className="flex flex-col gap-5">
        <h1>Login</h1>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <Button type="submit">Login</Button>
        </form>
        <Link to={'/register'}>
            <a>Registrate</a>
          </Link>
      </Form>

        </div>
    )
}