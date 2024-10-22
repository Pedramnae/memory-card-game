import { useRef, useState } from 'react'
import img1 from './assets/img/1.jpg'
import img2 from './assets/img/2.jpg'
import img3 from './assets/img/3.jpg'
import img4 from './assets/img/4.jpg'
import img5 from './assets/img/5.jpg'
import img6 from './assets/img/6.jpg'
import img7 from './assets/img/7.jpg'
import img8 from './assets/img/8.jpg'
import cartbg from './assets/img/cartbg.jpg'
import victory from './assets/img/victory.webp'
import bg2 from './assets/img/222.jpg'


let startgame = 0
let flag = 0
let rotatedimg1 = ''
let rotatedimg2 = ''
let millisecond = 0
let second = 0
let minute = 0
let flipcout = 0
let rotatecount = 0
let interval = null



function App() {
  const cards = useRef()
  const showtime = useRef()
  const showflipcount = useRef()
  const victoryscreen = useRef()
  const [resetgame, setResetgame] = useState(0)

  let imgsarr = [img1, img1, img2, img2, img3, img3, img4, img4, img5, img5, img6, img6, img7, img7, img8, img8]
  let randomarray = []
  while (imgsarr.length > 0) {
    let randomIndex = Math.floor(Math.random() * imgsarr.length)
    let pickedItem = imgsarr.splice(randomIndex, 1)[0]
    randomarray.push(pickedItem)
  }

  function rotator(e) {
    startgame++
    if (startgame == 1) {
      checkStartAndEnd()
    }
    let stat = e.currentTarget.getAttribute('data-rotate')
    if (stat != 'rotated') {
      if (flag == 0) {
        rotatedimg1 = e.currentTarget.children[1]
        e.currentTarget.classList.add('[transform:_rotateY(180deg)]')
        e.currentTarget.setAttribute('data-rotate', 'rotated')
        flag++
      }
      else if (flag == 1) {
        rotatedimg2 = e.currentTarget.children[1]
        e.currentTarget.classList.add('[transform:_rotateY(180deg)]')
        e.currentTarget.setAttribute('data-rotate', 'rotated')
        checkimages(rotatedimg1, rotatedimg2)
        flag = 0
      }
    }
  }
  function reset() {
    victoryscreen.current.classList.add('hidden')
    victoryscreen.current.classList.remove('flex')
    clearInterval(interval)
    setResetgame(resetgame + 1)
    flipcout = 0
    startgame = 0
    flag = 0
    rotatecount = 0
    minute = 0
    second = 0
    millisecond = 0
    showtime.current.innerHTML = 'time: ' + minute + ' : ' + second
    showflipcount.current.innerHTML = 'flip count : ' + flipcout
    let figures = cards.current.children
    for (let i = 0; i <= figures.length; i++) {
      figures[i].setAttribute('data-rotate', 'norotate')
      figures[i].classList.remove('[transform:_rotateY(180deg)]')
      figures[i].classList.add('[transform:_rotateY(0deg)]')
    }
  }
  function checkStartAndEnd() {
    if (startgame == 1) {
      interval = setInterval(time, 10)
    }
  }
  function checkimages(img1, img2) {
    let src1 = img1.getAttribute('src')
    let src2 = img2.getAttribute('src')
    flipcout++
    showflipcount.current.innerHTML = 'flip count : ' + flipcout
    if (rotatecount < 8) {
      if (src1 == src2) {
        rotatedimg1 = ''
        rotatedimg2 = ''
        rotatecount++
        if (rotatecount == 8) {
          setTimeout(() => {
            clearInterval(interval)
            victoryscreen.current.classList.add('flex')
            victoryscreen.current.classList.remove('hidden')
            victoryscreen.current.children[0].children[1].innerHTML = 'your time: '+minute+':'+second+' second'
            victoryscreen.current.children[0].children[2].innerHTML = 'flips: '+flipcout
          }, 1000);
        }
      } else {
        setTimeout(() => {
          img1.parentElement.classList.add('[transform:_rotateY(0deg)]')
          img2.parentElement.classList.add('[transform:_rotateY(0deg)]')
          img1.parentElement.classList.remove('[transform:_rotateY(180deg)]')
          img2.parentElement.classList.remove('[transform:_rotateY(180deg)]')
          img1.parentElement.setAttribute('data-rotate', 'noratate')
          img2.parentElement.setAttribute('data-rotate', 'noratate')
        }, 1000);
        rotatedimg1 = ''
        rotatedimg2 = ''
      }
    }
  }
  function time() {
    millisecond += 10
    if (millisecond == 1000) {
      millisecond = 0
      second++
      if (second == 60) {
        second = 0
        minute++
        if (minute == 60) {
          minute = 0
        }
      }
    }
    showtime.current.innerHTML = 'time: ' + minute + ' : ' + second
  }

  return (
    <>
      <section className="w-full h-[100vh] flex items-center justify-center [background-image:_url(./assets/img/bg.jpg)] bg-center bg-cover bg-no-repeat">
        <div className='w-[250px] md:w-[400px] lg:w-[550px] h-[400px]  md:h-[550px] lg:h-[700px] bg-[#ffffff2c] backdrop-blur-[30px] rounded-[20px] flex flex-wrap justify-center'>
          <div ref={cards} className='w-[250px] md:w-[400px] lg:w-[550px] h-[300px] md:h-[450px] lg:h-[550px]  flex flex-wrap justify-evenly content-evenly'>
            {randomarray && randomarray.map((item, index) => {
              return (
                <figure data-rotate='norotate' onClick={(event) => { rotator(event) }} key={index} className='w-[22%] h-[22%]  [transform-style:_preserve-3d;] relative cursor-pointer duration-[1s] [transform:_rotateY(0deg)]'>
                  <img className='w-full h-full absolute top-0 left-0 object-cover [transform:_translateZ(2px)] rounded-[10px]' src={cartbg} alt="" />
                  <img loading='lazy' className='w-full h-full bg-cover [transform:_translateZ(-2px)] rounded-[10px]' src={item} alt="" />
                </figure>
              )
            })}
          </div>
          <div className='w-[250px] md:w-[400px] lg:w-[550px] h-[100px] lg:h-[150px] flex flex-wrap '>
            <div className='w-full h-1/2 flex items-end justify-center'>
              <p ref={showtime} className='w-1/2 h-full text-white ps-[20px] md:text-[22px] text-[16px] text-[#12f3ffd1] flex justify-start items-center capitalize'>time: 0 : 0</p>
              <p ref={showflipcount} className='w-1/2 h-full text-white ps-[20px] md:text-[22px] text-[16px] text-[#12f3ffd1] flex justify-start items-center capitalize'>flip count : 0</p>
            </div>
            <div className='w-full h-1/2 flex items-center justify-center'>
            <button onClick={reset} className='w-fit h-fit text-white hover:bg-[#12f3ff89] duration-[0.4s] md:text-[14px] lg:text-[16px] text-[12px] capitalize px-[18px] py-[10px] bg-[#12f3ff22] rounded-[15px] backdrop-blur-[20px]'>reset game</button>
            </div>
          </div>
        </div>
      </section>
      <div ref={victoryscreen} className='w-[350px] md:w-[450px] h-[300px] md:h-[400px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] hidden flex-wrap bg-[#d2d2d23c] backdrop-blur-[20px] rounded-[15px]'>
        <div className='w-full h-[30%]  flex flex-wrap'>
          <h2 className='w-full h-1/2 flex items-center justify-center text-[#12f3ffd1] text-[21px] md:text-[25px] lg:text-[28px] '>You Won!!</h2>
          <p className='w-1/2 h-1/2 flex items-center justify-center text-[#12f3ffd1] text-[16px] md:text-[18px] lg:text-[20px] '></p>
          <p className='w-1/2 h-1/2 flex items-center justify-center text-[#12f3ffd1] text-[16px] md:text-[18px] lg:text-[20px] '></p>
        </div>
        <div className='w-full h-[70%]'>
          <figure className='w-full h-[80%]'>
            <img className='w-full h-full object-contain' src={victory} alt="" />
          </figure>
          <div className='w-full h-[20%] flex items-center justify-center '>
            <button onClick={reset} className='w-fit h-fit text-white hover:bg-[#12f3ff89] duration-[0.4s] md:text-[14px] lg:text-[16px] text-[12px] capitalize px-[18px] py-[10px] bg-[#12f3ff22] rounded-[15px] backdrop-blur-[20px]'>reset game</button>
          </div>
        </div>
      </div>
    </>

  )
}

export default App
