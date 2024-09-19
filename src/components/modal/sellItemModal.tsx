import { Modal, ModalBody } from "flowbite-react"
import close from '../../assets/close.svg'
import fileUpload from '../../assets/fileUpload.svg'
import loading from  '../../assets/loading.gif'
import Input from "../input/input"
import { ChangeEvent, useState } from "react"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { fetchItemsFromFireSrote, firestore, storage } from "../../firebase/firbase"
import { addDoc, collection } from "firebase/firestore"
import { userAuth, AuthContextType } from "../../context/authContext"
import { ItemType } from "../../pages/home/home"

function SellItemModal({ toggleModal, status, setItems }: { toggleModal: () => void, status: boolean, setItems: React.Dispatch<React.SetStateAction<ItemType[] | null>> }) {

    let [title, setTitle] = useState<string>('')
    let [category, setCategory] = useState<string>('')
    let [price, setPrice] = useState<string>('')
    let [description, setDescription] = useState<string>('')
    let [image, setImage] = useState<File | null>(null)


    let [submiting, setSubmiting] = useState<boolean>(false)

    let handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files)
            setImage(event.target.files[0])
    }

    let auth: AuthContextType | null = userAuth()

    let handleSubmit = async (event: React.FormEvent) => {

        setSubmiting(!submiting)

        event.preventDefault()

        if (!auth?.user) {
            alert("go login")
            return
        }

        let imageUrl = ''
        if (image) {
            const imageRef = ref(storage, `images/${image.name}`)
            await uploadBytes(imageRef, image)
            imageUrl = await getDownloadURL(imageRef)
        }

        try {
            await addDoc(collection(firestore, 'products'), {
                title,
                category,
                price,
                description,
                imageUrl,
                userId: auth?.user?.uid,
                userName: auth?.user?.displayName || 'Anonymous',
                createdAt: (new Date).toDateString()
            })
            setImage(null)
            setSubmiting(false)
            const datas: any = await fetchItemsFromFireSrote()
            toggleModal()
            setItems(datas)
        } catch (err) {
            alert(err)
        }

    }


    return (
        <div>
            <Modal theme={{
                "content": {
                    "base": "relative w-full p-4 md:h-auto",
                    "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
                },
            }
            } onClick={toggleModal} className="bg-black" position={'center'} show={status} size="md" popup={true}>
                <ModalBody className="bg-white h-96 p-0 rounded-md" onClick={(event) => event.stopPropagation()}>
                    <img onClick={() => {
                        toggleModal()
                        setImage(null)
                    }} className="w-6 absolute z-10 top-6 right-8 cursor-pointer" src={close} alt="" />
                    <div className="p-6 pl-8 pr-8 pb-8">
                        <p className="font-bold text-lg mb-3">Sell Item</p>
                        <form onSubmit={handleSubmit}>

                            <Input setInput={setTitle} placeholder="Title" />
                            <Input setInput={setCategory} placeholder="Category" />
                            <Input setInput={setPrice} placeholder="Price" />
                            <Input setInput={setDescription} placeholder="Description" />

                            <div className="pt-2 w-full relative">
                                {
                                    image ?
                                        <div className="relative h-40 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden">
                                            <img className="object-contain" src={URL.createObjectURL(image)} alt="" />
                                        </div>
                                        :
                                        <div className="relative h-40 sm:h-60 w-full border-2 border-black border-solid rounded-md">
                                            <input onChange={handleImageUpload} type="file" className="abolute inset-10 h-full w-full opacity-0 cursor-pointer z-30" required />
                                            <div className="absolute in top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                                                <img className="w-12" src={fileUpload} alt="" />
                                                <p className="text-center text-sm pt-2">Click to upload images</p>
                                                <p className="text-center text-sm pt-2">SVG, PNG, JPG</p>
                                            </div>
                                        </div>
                                }
                            </div>

                            {
                                submiting ?
                                    <div className="w-full flex h-14 justify-center pt-4 pb-2">
                                        <img className="w-32 object-cover" src={loading} alt="" />
                                    </div>
                                    :
                                    <div className="w-full pt-2">
                                        <button style={{ backgroundColor: '#002f34' }} className="w-full p-3 rounded-lg text-white">Sell Item</button>
                                    </div>
                            }
                        </form>
                    </div>

                </ModalBody>
            </Modal>

        </div>
    )
}

export default SellItemModal
