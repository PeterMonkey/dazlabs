import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog"
import { Pencil, Trash2 } from "lucide-react"
import { useStoreApp, Items } from "../store/state"


export default function ItemsCard(){

    const [editingItem, setEditingItem] = useState<Items | null>(null)

    const { items } = useStoreApp()

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
            <CardFooter className="flex justify-between">
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
                Ver Detalles
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
        </>
    )
}