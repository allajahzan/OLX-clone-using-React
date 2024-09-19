import google from '../../assets/google.png'
import mobile from '../../assets/mobile.svg'
import guitar from '../../assets/guita.png'
import love from '../../assets/love.png'
import avatar from '../../assets/avatar.png'
import close from '../../assets/close.svg'
import { Modal, ModalBody, Carousel } from "flowbite-react"
import { auth, provider } from "../../firebase/firbase"
import { signInWithPopup } from 'firebase/auth'

function LoginModal({ toggleModal, status }: { toggleModal: () => void, status: boolean }) {


    let handleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider)
            toggleModal()
        } catch (error) {
            console.log(error);
            alert(error)
        }
    }

    return (
        <div>

            <Modal theme={{
                "content": {
                    "base": "relative w-full p-4 md:h-auto",
                    "inner": "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700"
                },
            }} onClick={toggleModal} className="bg-black rounded-none" position={'center'} show={status} size="md" popup={true}>
                <div onClick={(event) => event.stopPropagation()} className="p-6 pl-2 pr-2 bg-white">
                    <img onClick={toggleModal} className="w-6 absolute z-10 top-4 right-4 cursor-pointer" src={close} alt="" />
                    <Carousel slide={false} theme={{
                        "indicators": {
                            "active": {
                                "off": "bg-gray-300",
                                "on": "bg-teal-300"
                            },
                            "base": "h-2 w-2 rounded-full",
                            "wrapper": "absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-3"
                        },
                        "scrollContainer": {
                            "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth",
                            "snap": "snap-x"
                        }, "control": {
                            "base": "inline-flex items-center justify-center bg-transparent",
                            "icon": "w-8 text-white dark:text-black"
                        },
                    }} onClick={(event) => event.stopPropagation()} className="w-full h-56 pb-5 rounded-none">
                        <div className="flex flex-col items-center justify-center">
                            <img className="w-24 pb-5" src={guitar} alt="Car Image 1" />
                            <p style={{ color: '#002f34' }} className=" w-60 sm:w-72 text-center pb-5 font-semibold">Help us become one of the safest place to buy and sell.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img className="w-24 pb-5" src={love} alt="Car Image 2" />
                            <p style={{ color: '#002f34' }} className=" w-60 sm:w-72 text-center pb-5 font-semibold">Close deals from the comfort of your home.</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img className="w-24 pb-5" src={avatar} alt="Car Image 3" />
                            <p style={{ color: '#002f34' }} className=" w-60 sm:w-72 text-center pb-5 font-semibold">Keep all your favorites in one place.</p>
                        </div>
                    </Carousel>
                </div>

                <ModalBody className="bg-white h-96 p-0 rounded-none" onClick={(event) => event.stopPropagation()}>

                    <div className="p-6 pt-0">
                        <div className="flex items-center justify-start rounded-md border-2 border-solid border-black p-5 pl-4 relative h-8 mb-4">
                            <img className="w-6 mr-2" src={mobile} alt="" />
                            <p className="text-sm font-bold">Continue with phone</p>
                        </div>
                        <div onClick={handleSignIn} className="flex items-center justify-center rounded-md border-2 border-solid border-gray-300 p-5 relative h-8 cursor-pointer active:bg-teal-100">
                            <img className="w-7 absolute left-2" src={google} alt="" />
                            <p className="text-sm text-gray-500">Continue with Google</p>
                        </div>
                        <div className="pt-5 flex flex-col items-center justify-center">
                            <p className="font-semibold text-sm">OR</p>
                            <p className="font-bold text-sm pt-3 underline underline-offset-4">Login with Email</p>
                        </div>
                        <div className="pt-10 sm:pt-20 flex flex-col items-center justify-center">
                            <p className="text-xs">All your personal details are safe with us.</p>
                            <p className="text-xs pt-5 text-center">If you continue, you are accepting <span className="text-blue-600">OLX Terms and Conditions and Privacy Policy</span></p>
                        </div>
                    </div>

                </ModalBody>
            </Modal>

        </div>
    )
}

export default LoginModal
