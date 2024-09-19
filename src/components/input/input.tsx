interface PropType {
    setInput:React.Dispatch<React.SetStateAction<string>>
    placeholder:string
}

function Input({placeholder, setInput}:PropType) {

    return (
        <div className="pt-2 w-full relative">
            <input onChange={(event)=>setInput(event.target.value)} id="title" className="w-full border-2 border-black rounded-md p-3 pt-4 pb-2 focus:outline-none peer" placeholder=" " type="text" required />
            <label htmlFor="title" className="absolute pl-1 pr-1 left-2.5 top-0 bg-white text-sm peer-focus:top-0 peer-focus:text-sm transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-5 ">{placeholder}</label>
        </div>
    )
}

export default Input
