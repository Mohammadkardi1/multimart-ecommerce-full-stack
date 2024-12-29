import React from 'react'
import {motion} from 'framer-motion'
import './services.css'
import serviceData from '../assets/data/serviceData'


const Services = () => {
    return (
        <section className="services pt-5">
            <div className="container">
                <div className="row g-3 g-xl-4">
                    {serviceData.map((item, index) => (
                        <motion.div whileHover={{scale:1.1}} key={index} className="col-md-6">
                            <div className="service__item" style={{background: `${item.bg}`}}>
                                <span><i className={item.icon}></i></span>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.subtitle}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services