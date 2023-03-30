import React from 'react'

// Recat Icons
import { AiOutlinePlus, AiFillCaretDown } from 'react-icons/ai'
import {
  BsSun,
  BsMoonStars,
  BsEye,
  BsEyeSlash,
  BsPlayCircle,
  BsCheckCircle,
  BsArrowRightCircle,
  BsImages,
  BsPlayFill,
  BsCalendar2Date,
  BsClock
} from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'

import {
  MdOutlineClose,
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos
} from 'react-icons/md'
import { TfiMenu } from 'react-icons/tfi'
import {
  RiLoginCircleLine,
  RiDoubleQuotesL,
  RiDoubleQuotesR,
  RiCheckboxBlankCircleLine,
  RiCheckboxBlankCircleFill
} from 'react-icons/ri'
import { FiCheck } from 'react-icons/fi'
import { IoPersonCircle } from 'react-icons/io5'
import { IoIosArrowRoundForward, IoMdCloseCircle } from 'react-icons/io'
import { GoHome } from 'react-icons/go'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { FaPlay } from 'react-icons/fa'

export const iconsData = {
  // Header Icons
  homeOutlined: <GoHome size={'21px'} />,
  homeFilled: <GoHome size={'21px'} />,
  outlineBookmark: <BsCheckCircle size={'20px'} />,
  filledBookmark: <BsCheckCircle size={'20px'} />,
  loginOutlined: <RiLoginCircleLine size={'21px'} />,
  loginFilled: <RiLoginCircleLine size={'21px'} />,

  sunIcon: <BsSun size={'20px'} />,
  moonIcon: <BsMoonStars size={'20px'} />,
  searchIcon: <BiSearch size={'20px'} />,
  user: <HiOutlineUserCircle size={'21.5px'} />,

  close: <MdOutlineClose size={'21.5px'} />,
  close1: <MdOutlineClose size={'25px'} />,
  close2: (
    <MdOutlineClose
      size={'20px'}
      style={{
        margin: '0.125rem 0.5rem 0 0'
      }}
    />
  ),
  close3: <IoMdCloseCircle size={'30px'} />,

  addBookmark: (
    <AiOutlinePlus size={'15px'} style={{ marginBottom: '0.05rem' }} />
  ),
  addedBookmark: <FiCheck size={'15px'} />,
  addBookmark1: <AiOutlinePlus size={'25px'} />,
  addedBookmark1: <FiCheck size={'25px'} />,

  next: <MdOutlineArrowForwardIos style={{ marginLeft: '0.1rem' }} />,
  prev: <MdOutlineArrowBackIosNew style={{ marginRight: '0.1rem' }} />,

  menu: <TfiMenu size={'20px'} style={{ marginRight: '0.5rem' }} />,

  eyeOpen: <BsEye />,
  eyeClose: <BsEyeSlash />,

  play: <BsPlayCircle size={'20px'} style={{ marginRight: '0.25rem' }} />,
  play1: <BsPlayFill size={'30px'} style={{ margin: '0.2rem 0 0 0.15rem' }} />,
  play2: <FaPlay size={'20px'} />,

  forwardArrow: (
    <MdOutlineArrowForwardIos
      size={'20px'}
      style={{ marginBottom: '-0.15rem' }}
    />
  ),

  down: <AiFillCaretDown size={'20px'} style={{ marginTop: '0.25rem' }} />,
  rightCircle: (
    <BsArrowRightCircle size={'20px'} style={{ marginLeft: '0.25rem' }} />
  ),

  person: <IoPersonCircle size={'50px'} />,

  forward: (
    <IoIosArrowRoundForward size={'20px'} style={{ marginTop: '0.2rem' }} />
  ),

  imageIcon: <BsImages size={'25px'} />,
  imageIcon1: <BsImages size={'50px'} />,

  LeftQuote: <RiDoubleQuotesL />,
  RightQuote: <RiDoubleQuotesR />,

  date: <BsCalendar2Date size={'15px'} style={{ marginRight: '0.5rem' }} />,
  clock: <BsClock size={'15px'} style={{ marginRight: '0.5rem' }} />,

  notChecked: <RiCheckboxBlankCircleLine />,
  checked: <RiCheckboxBlankCircleFill style={{ color: 'var(--primary)' }} />
}
