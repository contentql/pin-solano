import * as React from 'react'
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { FaFacebookF, FaXTwitter } from 'react-icons/fa6'

const Temp: React.FC = () => {
  return <></>
}

export const listOfIcons = {
  Facebook: <FaFacebookF size={24} />,
  Whatsapp: <FaWhatsapp size={24} />,
  Twitter: <FaXTwitter size={24} />,
  LinkedIn: <FaLinkedinIn size={24} />,
  Instagram: <FaInstagram size={24} />,
}
