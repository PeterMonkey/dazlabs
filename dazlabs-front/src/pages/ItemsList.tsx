import AddForm from "../components/AddForm"
import ItemsCard from "../components/ItemsCard"

export default function ItemsList() {
    return(
        <div className='container mx-auto p-4'>
        <AddForm/>
        <ItemsCard/>
      </div>
    )
}