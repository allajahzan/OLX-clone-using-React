import Navbar from "../../components/navbar/navbar"
import { lazy, useEffect, useState } from "react"
import LoginModal from "../../components/modal/loginModal"
import SellItemModal from "../../components/modal/sellItemModal"
import { fetchItemsFromFireSrote } from "../../firebase/firbase"
import { itemsContext, contextType } from "../../context/itemsContext"

let Card = lazy(() => import('../../components/card/card'))

export interface ItemType {
    id: string;
    title: string;
    category: string;
    description: string
    price: string;
    userName: string
    createdAt: string
    imageUrl: string
}


function Home() {

    let [openModal, setModal] = useState<boolean>(false)
    let [openModalSell, setModalSell] = useState<boolean>(false)
    let itemContext : contextType | null =  itemsContext()

    let toggleModal = () => {
        setModal(!openModal)
    }

    let toggleModalSell = () => {
        setModalSell(!openModalSell)
    }

    useEffect(() => {
        let getItems = async () => {
            const datas: any = await fetchItemsFromFireSrote()
            itemContext?.setItems(datas)
        }
        getItems()
    }, [itemContext?.items])

    return (
        <div>
            <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
            <Card items={(itemContext as contextType).items} />
            <LoginModal toggleModal={toggleModal} status={openModal} />
            <SellItemModal setItems={(itemContext as contextType).setItems} toggleModal={toggleModalSell} status={openModalSell} />
        </div>
    )
}

export default Home
