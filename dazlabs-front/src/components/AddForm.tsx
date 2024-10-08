import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Plus } from 'lucide-react'

export default function AddForm(){
    return(
        <>
            <Card className="mb-4">
                <CardHeader>
                    <CardTitle>Agregar nuevo gato</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <Input
                        placeholder="Raza"
                        value={''}
                        // onChange={}
                        />
                        <Input
                        placeholder="Origen"
                        value={''}
                        // onChange={}
                        />
                        <Input
                        placeholder="URL de la imagen"
                        value={''}
                        // onChange={}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => null}>
                        <Plus className="mr-2 h-4 w-4"/> Agregar
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}