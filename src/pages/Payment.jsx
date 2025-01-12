import React, { useState } from 'react'
import Button from '../components/ui/Button'
import axios from '../axios'
import { useNavigate } from 'react-router-dom';

function Payment() {
    const [selected, setSelected] = useState("onePerson");
    const [tarif, setTarif] = useState("1 year")
    const navigate = useNavigate()

    const payment = () => {
        const id = localStorage.getItem('id')
        
        if(id){
            axios.post('/subscribe', {
                id
            })
            .then(response => {
                if(response.data){

                    alert('Оплата прошла успешна')
                    navigate(-1)
                }
            })
            .catch((err) => alert("не удалось оплатить"))
        }
    }
  return (
    <div className='flex flex-col justify-start items-center'>
      <img src="/icons/Close.svg" className='left-4 top-2 absolute' alt="" onClick={() => navigate(-1)} />
      <img src="/backgrounds/paymentBG.png" className='mt-[50px]' alt="" />
      <div className="flex bg-gray-800 rounded-[7px] w-fit mt-[20px]" style={{ background: "rgba(118, 118, 128, 0.24)" }}>
        <button
            className={`px-8 py-1 text-sm font-medium rounded-[7px] transitio`}
            style={selected === "onePerson" ? {background: "#0bc4ed", color: 'white'} : {color: 'rgba(235, 235, 245, 0.6)'}}
            onClick={() => setSelected("onePerson")}
        >
            For one person
        </button>
        <button
            className={`px-8 py-1 text-sm font-medium rounded-[7px] transition`}
            style={selected === "clubMembership" ? {background: "#0bc4ed", color: "white" } : { color: 'rgba(235, 235, 245, 0.6)'}}
            onClick={() => setSelected("clubMembership")}
        >
            Club membership
        </button>
    </div>
      <h1 className='font-sans font-bold text-[34px] text-white mt-[23px]'>Unlock JogJoy Pro</h1>
      {
        selected == "onePerson" ? 

      <div className="mt-[30px] flex justify-center items-center gap-[9px] ">
        <div onClick={() => setTarif("1 month")} className="p-[10px] w-[167px] h-[144px] rounded-[8px] flex flex-col justify-center items-start" style={tarif == '1 month' ? {border: "1px solid #25c73d", background: '#2c2c30' } : { background: '#2c2c30' }}>
            <p className='font-sans font-semibold text-white text-[15px]'>1 Month</p>
            <div className="flex justify-start items-start gap-1 mt-2">
                <img src="/icons/Check.svg" alt="" />
                <p className='font-sans text-white text-[13px] opacity-70'>4 analysis</p>
            </div>
            <div className="flex justify-start items-start gap-1 mt-2">
                <img src="/icons/Check.svg" alt="" />
                <p className='font-sans text-white text-[13px] opacity-70'>Workout program</p>
            </div>
            <img src="/icons/Line.svg" className='mt-2' alt="" />
            <p className='mt-2 font-sans font-semibold text-[17px] text-white'>$20</p>
        </div>
        <div style={tarif == '1 year' ? {border: "1px solid #25c73d", background: '#2c2c30' } : { background: '#2c2c30' }} onClick={() => setTarif("1 year")} className=" relative p-[10px] w-[167px] h-[144px] rounded-[8px] flex flex-col justify-center items-start">
            <img src="/icons/sale.svg" className='absolute top-[-20px] right-[10px]' alt="" />
            <p className='font-sans font-semibold text-white text-[15px]'>1 Year</p>
            <div className="flex justify-start items-start gap-1 mt-2">
                <img src="/icons/Check.svg" alt="" />
                <p className='font-sans text-white text-[13px] opacity-70'>Unlimited analysis</p>
            </div>
            <div className="flex justify-start items-start gap-1 mt-2">
                <img src="/icons/Check.svg" alt="" />
                <p className='font-sans text-white text-[13px] opacity-70'>Workout program</p>
            </div>
            <img src="/icons/Line.svg" className='mt-2' alt="" />
            <p className='mt-2 font-sans font-semibold text-[17px] text-white'>$75</p>
        </div>
      </div> : 
            <div onClick={() => setTarif("3 month")} className="mt-[30px] relative p-[10px] w-[343px] h-[170px] rounded-[8px] flex flex-col justify-center items-start" style={tarif == '3 month' ? {border: "1px solid #25c73d", background: '#2c2c30' } : { background: '#2c2c30' }}>
              <p className='font-sans font-semibold text-white text-[15px]'>Subscription from 3 months</p>
              <div className="flex justify-start items-start gap-1 mt-2">
                  <img src="/icons/Check.svg" alt="" />
                  <p className='font-sans text-white text-[13px] opacity-70'>Group of 5 people or more</p>
              </div>
              <div className="flex justify-start items-start gap-1 mt-2">
                  <img src="/icons/Check.svg" alt="" />
                  <p className='font-sans text-white text-[13px] opacity-70'>Unlimited analysis</p>
              </div>
              <div className="flex justify-start items-start gap-1 mt-2">
                  <img src="/icons/Check.svg" alt="" />
                  <p className='font-sans text-white text-[13px] opacity-70'>Workout program</p>
              </div>
              <img src="/icons/Line.svg" className='mt-2 w-[322px] h-[1px] object-cover' alt="" />
              <p className='mt-2 font-sans font-semibold text-[17px] text-white'>$60</p>
          </div>
      }
      <Button onClick={payment} className="mt-6">Get access</Button>
    </div>
  )
}

export default Payment
