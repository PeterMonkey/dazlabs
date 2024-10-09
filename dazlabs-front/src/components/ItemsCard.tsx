import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
  } from "./ui/dialog"
import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { Pencil, Trash2 } from "lucide-react"
import { useStoreApp, Items } from "../store/state"

import { getCats } from "../services/api.service"


export default function ItemsCard(){


    const [item, setItems] = useState<Items[]>([])
    const [editingItem, setEditingItem] = useState<Items | null>(null)
    const [selectedItem, setSelectedItem] = useState<Items | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const { items, loadData } = useStoreApp()

    const updateItem = () => {
      if (editingItem) {
        setItems(items.map((item) => (item.id === editingItem.id ? editingItem : item)))
        setEditingItem(null)
      }
    }

    const openDialog = (item: Items) => {
      setSelectedItem(item)
      setIsDialogOpen(true)
    }

    useEffect(() => {
      async function data(){
        try {
          const response = await getCats(0, 9)
            loadData(response)
        } catch (error) {
          console.error(error)
        }
      }
      data()
    }, [loadData])

    console.log(editingItem)
    console.log(item)
    console.log(items)

    return(
        <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.breed}>
            <CardHeader>
              <CardTitle>{item.breed}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.origin}</p>
            </CardContent>
            <CardFooter className="grid grid-flow-col grid-cols-3 gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => setEditingItem(item)}>
                    <Pencil className="mr-2 h-4 w-4" /> Editar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Editar Elemento</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Input
                      placeholder="Nombre"
                      value={editingItem?.breed || ""}
                      onChange={(e) => setEditingItem({ ...editingItem!, breed: e.target.value })}
                    />
                    <Input
                      placeholder="Descripción"
                      value={editingItem?.origin || ""}
                      onChange={(e) => setEditingItem({ ...editingItem!, origin: e.target.value })}
                    />
                  </div>
                  <Button onClick={updateItem}>Actualizar</Button>
                </DialogContent>
              </Dialog>
              <Button variant="destructive" onClick={() => deleteItem(item.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Eliminar
              </Button>
              <Button variant="secondary" onClick={() => openDialog(item)}>
                Detalles
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="flex">
          <DialogHeader>
            <DialogTitle>{selectedItem?.breed}</DialogTitle>
            <DialogDescription>{selectedItem?.origin}</DialogDescription>
          </DialogHeader>
          <div className="w-96">
              <AspectRatio ratio={16 / 12}>
                <img src={selectedItem?.image} alt="" className="rounded-md object-cover"/>
              </AspectRatio>
            </div>
        </DialogContent>
      </Dialog>
        </>
    )
}