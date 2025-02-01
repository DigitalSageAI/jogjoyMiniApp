import React, { useEffect, useState, useRef } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import Loading from '../components/ui/Loading'

function Cabinet() {
  const navigate = useNavigate()
  const id = localStorage.getItem('id')
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [avatarLoaded, setAvatarLoaded] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [editor, setEditor] = useState(null)
  const [scale, setScale] = useState(1.2)

  const [name, setName] = useState('')

  useEffect(() => {
    axios.get(`/getUserById/${id}`).then(res => {
      if (res.data) {
        console.log(res.data)
        setUser(res.data)
        setName(res.data.name || 'Ваше имя')
        setIsLoading(false)
      }
    })
  }, [])

  const saveName = () => {
    axios.post('/saveName', {
      userId: id,
      name
    })
    .then(res => res.data)
    .then(data => {
      if(data){
        alert('Успешно изменено имя')
      }
    })
    .catch((err) => {
      console.log(err.message)
      alert('Не удалось изменить имя')
    })
  }

  const handleFileSelection = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setSelectedFile(file)
  }

  const handleSaveAvatar = async () => {
    if (!editor) return

    setIsLoading(true)

    const canvas = editor.getImageScaledToCanvas()
    canvas.toBlob(async (blob) => {
      const formData = new FormData()
      formData.append('photo', blob, 'avatar.png')

      try {
        const response = await axios.post(`/uploadPhoto/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        console.log('Upload successful:', response.data)
        setUser((prev) => ({ ...prev, avatar: URL.createObjectURL(blob) }))
      } catch (error) {
        console.error('Error uploading photo:', error)
      } finally {
        setIsLoading(false)
        setSelectedFile(null)
      }
    })
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-[100%] flex flex-col justify-start items-center relative">
          {/* Фон */}
          <img src="/backgrounds/cabinet.png" alt="cabinet_bg" className="top-0 w-[100%] h-[146px] object-cover -z-10" />

          {/* Надпись "Profile" */}
          <p className="top-[11px] text-[17px] font-syne text-white font-semibold absolute">Профиль</p>

          {/* Карточка профиля */}
          <div className="w-[90%] min-h-[454px] bg-white rounded-[8px] flex flex-col justify-start items-center relative">
            <label htmlFor="image" className="w-[97px] relative">
              {selectedFile ? (
                <div className="flex flex-col items-center">
                  <AvatarEditor
                    ref={(ref) => setEditor(ref)}
                    image={selectedFile}
                    width={97}
                    height={97}
                    border={50}
                    borderRadius={50}
                    scale={scale}
                    className="mt-[-50px]"
                  />
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.01"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="mt-2 w-[80%]"
                  />
                  <Button onClick={handleSaveAvatar} className="mt-2 w-[250px]">Сохранить</Button>
                </div>
              ) : (
                <>
                  <img
                    src={user?.avatar || "/icons/user.jpg"}
                    className={`rounded-[50%] w-[97px] h-[97px] object-cover mt-[-50px] transition-opacity duration-500 ${
                      avatarLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    alt=""
                    onLoad={() => setAvatarLoaded(true)}
                  />
                  <img className="absolute right-[10px] bottom-[5px]" src="/icons/photo.svg" alt="" />
                  <input type="file" hidden id="image" onChange={handleFileSelection} accept=".png, .jpg" />
                </>
              )}
            </label>
            <div className="flex justify-center items-center gap-4 h-[15px] mt-4">
              <input value={name} onChange={(e) => setName(e.target.value)} className='border-none outline-none w-[300px] text-center' onBlur={saveName}></input>
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg> */}
            </div>
            <div
              onClick={() => navigate('/support')}
              className="mt-[45px] w-[95%] h-[46px] rounded-[10px] flex justify-between items-center px-[10px]"
              style={{ border: '1px solid rgba(60, 60, 67, 0.2)' }}
            >
              <div className="gap-[5px] flex justify-start items-center">
                <img src="/icons/letter.svg" alt="" />
                <p>Служба поддержки</p>
              </div>
              <img src="/icons/Arrow.png" className="w-[19px]" alt="" />
            </div>

            <div
              onClick={() => navigate('/feedback')}
              className="mt-[8px] w-[95%] h-[46px] rounded-[10px] flex justify-between items-center px-[10px]"
              style={{ border: '1px solid rgba(60, 60, 67, 0.2)' }}
            >
              <div className="gap-[5px] flex justify-start items-center">
                <img src="/icons/message.svg" alt="" />
                <p>Отправить отзыв</p>
              </div>
              <img src="/icons/Arrow.png" className="w-[19px]" alt="" />
            </div>

            <p className="mt-[43px]">Подпишитесь на нас</p>
            <div className="mt-2 flex justify-center items-start gap-[13px]">
              <img src="/icons/Facebook.svg" alt="" />
              <img src="/icons/Twitter.svg" alt="" />
              <img src="/icons/Linkedin.svg" alt="" />
              <img src="/icons/Instagram.svg" alt="" />
              <img src="/icons/Reddit.svg" alt="" />
            </div>

            <Button className="mt-[80px] w-[99%]" onClick={() => navigate('/payment')}>Получить подписку</Button>
          </div>
        </div>
      )}
    </>
  )
}

export default Cabinet
