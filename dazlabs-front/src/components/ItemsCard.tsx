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

import { getCats, updateCat, deleteCat} from "../services/api.service"


export default function ItemsCard(){


    //const [data, setData] = useState<UpdateData[]>([])
    const [editingItem, setEditingItem] = useState<Items | null>(null)
    const [selectedItem, setSelectedItem] = useState<Items | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isChange, setIsChange] = useState(false)

    const { items, loadData } = useStoreApp()

    const updateItem = async (id: string| undefined) => {
      if (id) {
        try {
          if(editingItem){
            const data = {
              breed: editingItem.breed,
              origin: editingItem.origin
            }
            //setData(items.map((item) => (item._id === editingItem._id ? editingItem : item)))
            const cat = await updateCat(id, data)
            setIsChange(!isChange)
            return cat
          }
        } catch (error) {
          console.error(error)
        }
      }
    }

    const deleteItem = async (id: string | undefined) => {
      if(id){
        try {
          const cat = await deleteCat(id)
          setIsChange(!isChange)
          return cat
        } catch (error) {
          console.error(error)
        }
      }
      //setItems(items.filter((item) => item.id !== id))
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
      setIsChange(false)
    }, [loadData, isChange])

    console.log(editingItem)
    console.log(items)

    return(
        <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item: Items) => (
          <Card key={item.breed} className="relative h-56">
            <CardHeader>
              <CardTitle>{item.breed}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.origin}</p>
            </CardContent>
            <CardFooter className="absolute bottom-0 grid grid-flow-col grid-cols-3 gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => setEditingItem(item)}>
                    <Pencil className=" h-4 w-4" /> Editar
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
                  <Button onClick={() => updateItem(item._id)}>Actualizar</Button>
                </DialogContent>
              </Dialog>
              <Button variant="destructive" onClick={() => deleteItem(item._id)}>
                <Trash2 className="h-4 w-4" /> Eliminar
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