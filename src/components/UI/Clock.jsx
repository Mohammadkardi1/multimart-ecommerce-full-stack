import React, {useState, useEffect} from 'react'
import '../../Styles/clock.css'



const Clock = () => {

    const [days, setDays] = useState()
    const [houers, setHouers] = useState()
    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState()
    let interval
    const countDown = () => {
        const destination = new Date('2023, 03, 31').getTime()
        interval = setInterval(() => {
            const now = new Date().getTime()
            const different = now - destination 
            const days = Math.floor(different / (1000 * 60 * 60 *24))
            const houers = Math.floor(different % (1000 * 60 * 60 *24) / (1000*60*60))
            const minutes = Math.floor(different % (1000 * 60 * 60 ) / (1000*60))
            const seconds = Math.floor(different % (1000 * 60 ) / 1000)
            if (destination < 0 ) {
                clearInterval(interval.current)
            } else {
                setDays(days)
                setHouers(houers)
                setMinutes(minutes)
                setSeconds(seconds)
            }
        }) 
    }
    const clock = [
        {
            period: days,
            text: "Days"
        },
        {
            period: houers,
            text: "Houers"
        },
        {
            period: minutes,
            text: "Minutes"
        },
        {
            period: seconds,
            text: "Seconds"
        },
    ]

    useEffect(() => {
        countDown()
    }, [])


    return (
        <div className='clock__wrapper d-flex align-items-center gap-3'>
            {
                clock.map((item, index) => (
                    <div key={index} className="clock__data d-flex align-items-center gap-3">
                        <div className='text-center'>
                            <h1 className='text-white fs-3 mb-3'>{item.period}</h1>
                            <h5 className='text-white fs-6'>{item.text}</h5>
                        </div>
                        <span className='text-white fs-3'>:</span>
                    </div>
                ))
            }
        </div>
    )
}

export default Clock