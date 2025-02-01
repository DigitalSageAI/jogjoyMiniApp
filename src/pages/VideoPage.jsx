import React, { useRef } from 'react'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom';
function VideoPage() {
    const fileInputRef = useRef(null);
    const navigate = useNavigate()

    const handleUploadClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        console.log('Выбранный файл:', file.name);
        
      }
    };
  return (
    <div className='flex flex-col justify-start items-center w-[100%]'>
        <p className='mt-[11px] text-[17px] font-syne text-white'>Анализ</p>
        <p className='w-[90%] text-left font-sans text-[15px] text-white mt-[19px]'>Выполнение этих несложных требований ускорит получение результатов и повысит качество анализа.</p>
        <div className='mt-2 gap-1 flex justify-start items-start w-[90%]' style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            <span>1.</span>
            <p>Человек, снимающий видео, должен находиться в статичном положении (не двигайте камеру)</p>
        </div>
        <div className='mt-2 gap-1 flex justify-start items-start w-[90%]' style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            <span>2.</span>
            <p>Примерно в 7 метрах от бегуна (видны голова и пальцы ног)</p>
        </div>
        <div className='mt-2 gap-1 flex justify-start items-start w-[90%]' style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            <span>3.</span>
            <p>Бегун должен разогнаться заранее и бежать в обычном для себя темпе</p>
        </div>
        <div className='mt-2 gap-1 flex justify-start items-start w-[90%]' style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            <span>4.</span>
            <p>Продолжительность не менее 4 и не более 10 секунд</p>
        </div>

        <img src="/images/videoWrapper.png" className='w-[90%] mt-6' alt="" />
        <Button onClick={() => navigate('/uploading')} className="w-[90%] h-[52px] mt-[30px] mb-[15px] ">Загрузить видео</Button>
        <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default VideoPage
