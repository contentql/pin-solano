import * as React from 'react'
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { FaFacebookF, FaXTwitter } from 'react-icons/fa6'

const Temp: React.FC = () => {
  return <></>
}

export const listOfIcons = {
  facebook: <FaFacebookF size={24} />,
  whatsapp: <FaWhatsapp size={24} />,
  twitter: <FaXTwitter size={24} />,
  linkedin: <FaLinkedinIn size={24} />,
  instagram: <FaInstagram size={24} />,
}
