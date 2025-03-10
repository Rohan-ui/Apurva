import React from 'react'
import AboutImg from '../Clientcomponents/AboutImg'
import Ourprocess from '../Clientcomponents/Ourprocess'
import Video from '../Clientcomponents/Video'
import Partners from '../Clientcomponents/Partners'
import OurPeople from '../Clientcomponents/OurPeople'
import PackagingType from '../Clientcomponents/PackagingType'

function AboutPage() {
    return (
        <>
            <AboutImg />
            <Video />
            <OurPeople/>
            <PackagingType/>
            <Ourprocess />
            <Partners/>

        </>
    )
}

export default AboutPage
