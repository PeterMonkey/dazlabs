import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Plus } from 'lucide-react'

import { useStoreApp } from "../store/state"

export default function AddForm(){

    const { addItem } = useStoreApp()

    const [newItem, setNewItem] = useState({ breed: "", origin: "", image: "" })

    const handleClick = () => {
        if(newItem.breed && newItem.origin && newItem.image) {
            addItem({breed: newItem.breed, origin: newItem.origin, image: newItem.image})
            setNewItem({ breed: "", origin: "", image: "" })
        }
    }

    // console.log(items)
    // console.log(newItem)

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
                        value={newItem.breed}
                        onChange={(e) => setNewItem({ ...newItem, breed: e.target.value })}
                        />
                        <Input
                        placeholder="Origen"
                        value={newItem.origin}
                        onChange={(e) => setNewItem({ ...newItem, origin: e.target.value })}
                        />
                        <Input
                        placeholder="URL de la imagen"
                        value={newItem.image}
                        onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleClick}>
                        <Plus className="mr-2 h-4 w-4"/> Agregar
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}