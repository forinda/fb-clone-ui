import { faCancel, faImage, faPaperPlane, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Feed = {
  [x: string]: any
  body: string
  tags: 'feed',
  image: File | null
}

const FloatingHomeNewPostOverLay = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [feedState, setFeedState] = React.useState<Feed>({
    body: '', image: null, tags: 'feed'
  })
  const [image, setImage] = React.useState<string>('')

  const handleModalWrapperClickClose = (e: React.MouseEvent<HTMLDialogElement>) => {
    e.preventDefault()
    setIsOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (!(e.target instanceof HTMLTextAreaElement) && e.target.name === 'image') {
      const file = e.target!.files![0]
      if (!(['image/jpeg', 'image.jpg', 'image/png','image/webp','image/gif'].includes(file.type))) {
        alert('Unsupported file format')
        return
      }
      if (file.size > (1024 * 1024 * 2)) {
        alert("File should not be more than 2mb")
        return
      }
      setImage(URL.createObjectURL(file))
      setFeedState(initial => ({ ...initial, image: file }))

    }
  }
  const cancelPost = ((e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    setFeedState({ body: '', image: null, tags: 'feed'})
    setImage('')
    setIsOpen(false)
  })
  return (
    <div className=''>
      <dialog className={isOpen?'fixed w-full h-full bg-opacity-60 max-w-7xl flex items-center justify-center bg-black top-0 z-[1030] left-0 right-0 mx-auto':'hidden'} onClick={(e) => handleModalWrapperClickClose(e)}>
        <form action="" method='POST' className='p-4 bg-white w-full rounded sm:min-w-[30rem] sm:max-w-[40rem] sm:p-8 flex flex-col gap-3' onClick={e => {
          e.stopPropagation()
        }}>
          {image && <div className='flex justify-center items-center'><img src={image} alt="" className='w-full max-h-40 object-contain '/></div>}
          <div className='w-full'>
            <textarea placeholder="What's on your mind" className='w-full resize-none rounded-[20px]' value={feedState.body} onChange={handleInputChange} />
          </div>
          <input type="file" name='image' hidden id='image' onChange={handleInputChange} />
          {/* actions */}
          <div className='grid grid-cols-3'>
            <label htmlFor='image' className={`${actionstyle} cursor-pointer`}><FontAwesomeIcon icon={faImage} />image</label>
            <button className={actionstyle} type="submit"><FontAwesomeIcon icon={faPaperPlane }  /> Post</button>
            <button className={actionstyle} onClick={cancelPost}><FontAwesomeIcon icon={faCancel} />Cancel</button>
          </div>
        </form>
      </dialog>
      <button className='fixed bottom-5 h-12 w-12 right-12 sm:right-16 sm:w-16 sm:h-16 bg-blue-600 text-white shadow-[0_0_.5rem_.2rem_#00000034] rounded-full flex items-center justify-center' onClick={(e)=>{
        e.preventDefault()
        setIsOpen(true)
      }}>
        <FontAwesomeIcon icon={faPen} />
      </button>
    </div>
  )
}

const actionstyle = 'border hover:bg-blue-600 hover:text-white py-1 flex items-center justify-center gap-2 transition-[all_ease-in_300ms]'
export default FloatingHomeNewPostOverLay