import { useState } from "react"
import Navbar from "../../components/navbar/navbar"
import LoginModal from "../../components/modal/loginModal"
import SellItemModal from "../../components/modal/sellItemModal"
import { itemsContext , contextType} from "../../context/itemsContext"
import { useLocation } from "react-router-dom"

function ItemDetails() {

    let [openModal, setModal] = useState<boolean>(false)
    let [openModalSell, setModalSell] = useState<boolean>(false)
    let itemContext : contextType | null = itemsContext()
    
    let toggleModal = () => {
        setModal(!openModal)
    }

    let toggleModalSell = () => {
        setModalSell(!openModalSell)
    }

    let location = useLocation()

  return (
    <div>
       <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
       <LoginModal toggleModal={toggleModal} status={openModal} />

       <div className="grid gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 p-10 px-5 sm:px-15 md:px-30 lg:px-40">
            <div className="border-2 w-full rounded-lg flex justify-center overflow-hidden h-96">
              <img className="w-full object-contain" src={location.state.item.imageUrl} alt="" />
            </div>
            <div className="flex flex-col relative">
              <div className=" w-full bottom-0 flex justify-between pb-3">
              <p className="p-1 pl-0 font-bold">{location.state.item.userName}</p>
              <p className="p-1 pl-0 text-sm">{location.state.item.createdAt}</p>
              </div>
              <p className="p-1 pl-0 text-xl">{location.state.item.title}</p>
              <p className="p-1 pl-0">{location.state.item.category}</p>
              <p className="p-1 pl-0">₹ {location.state.item.price}</p>
              <p className="p-1 pl-0 text-ellipsis overflow-hidden">{location.state.item.description}</p>
              
            </div>
       </div>

       <SellItemModal setItems={(itemContext as contextType).setItems} toggleModal={toggleModalSell} status={openModalSell} />
    </div>
  )
}

export default ItemDetails
