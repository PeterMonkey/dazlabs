import { useState } from 'react'
import AddForm from './components/AddForm'
import ItemsCard from './components/ItemsCard'
import './App.css'

interface Item {
  breed: string
  origin: string
  image: string
}

function App() {

  //const [items, setItems] = useState<Item[]>([])
  const [newItem, setNewItem] = useState({ breed: "", origin: "", image: "" })
  const [editingItem, setEditingItem] = useState<Item | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const addItem = () => {
    if (newItem.breed && newItem.origin && newItem.image) {
      setItems([...items, { ...newItem }])
      setNewItem({ breed: "", origin: "", image: "" })
    }
  }

  const updateItem = () => {
    if (editingItem) {
      setItems(items.map((item) => (item.id === editingItem.id ? editingItem : item)))
      setEditingItem(null)
    }
  }

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const openDialog = (item: Item) => {
    setSelectedItem(item)
    setIsDialogOpen(true)
  }

  return (
    <div className='container mx-auto p-4'>
      <AddForm/>
      <ItemsCard/>
    </div>
  )
}

export default App
