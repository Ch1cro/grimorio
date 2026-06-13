import { useState, useEffect } from "react"

export default function App() {
  const [month, setMonth] = useState("login")
  const [notesOpen, setNotesOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [imgRect, setImgRect] = useState({ left: 0, top: 0, width: 0, height: 0 })

  const screens = {
    login: {
      desktop: "login.png",
    },
    feb: {
      desktop: "/feb/desktop.png",
      notes: [
        "/feb/notes-1.png",
        "/feb/notes-2.png",
        "/feb/notes-3.png",
        "/feb/notes-4.png",
        "/feb/notes-5.png",
      ],
    },
    mar: {
      desktop: "/mar/desktop.png",
      notes: [
        "/mar/notes-1.png",
        "/mar/notes-2.png",
        "/mar/notes-3.png",
        "/mar/notes-4.png",
        "/mar/notes-5.png",
      ],
    },
    apr: {
      desktop: "/apr/desktop.png",
      notes: [
        "/apr/notes-1.png",
        "/apr/notes-2.png",
        "/apr/notes-3.png",
      ],
    },
    may: {
      desktop: "/may/desktop.png",
      notes: [
        "/may/notes-1.png",
        "/may/notes-2.png",
        "/may/notes-3.png",
      ],
    },
  }

  const currentImage = notesOpen
    ? screens[month].notes[page]
    : screens[month].desktop

  function updateRect() {
    const imgAspect = 1920 / 1080

    const winW = window.innerWidth
    const winH = window.innerHeight
    const winAspect = winW / winH

    let renderedW, renderedH
    if (winAspect > imgAspect) {
      renderedH = winH
      renderedW = winH * imgAspect
    } else {
      renderedW = winW
      renderedH = winW / imgAspect
    }

    setImgRect({
      left: (winW - renderedW) / 2,
      top: (winH - renderedH) / 2,
      width: renderedW,
      height: renderedH,
    })
  }

  useEffect(() => {
    updateRect()
    window.addEventListener("resize", updateRect)
    return () => window.removeEventListener("resize", updateRect)
  }, [])

  function openNotes() {
    setNotesOpen(true)
    setPage(0)
  }

  function closeNotes() {
    setNotesOpen(false)
  }

  function nextPage() {
    if (page < screens[month].notes.length - 1) {
      setPage(page + 1)
    }
  }

  function previousPage() {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* IMAGEM PRINCIPAL */}
      <img
        src={currentImage}
        alt=""
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "contain",
          imageRendering: "pixelated",
          display: "block",
        }}
      />

      {/* CONTAINER ALINHADO COM A IMAGEM */}
      <div
        style={{
          position: "absolute",
          left: imgRect.left,
          top: imgRect.top,
          width: imgRect.width,
          height: imgRect.height,
          pointerEvents: "none",
        }}
      >
        {/* HOTSPOT BOTÃO LOGIN */}
        {month === "login" && (
          <div
            onClick={() => setMonth("feb")}
            style={{
              position: "absolute",
              left: "30%",
              top: "57%",
              width: "14.4%",
              height: "10%",
              cursor: "pointer",
              pointerEvents: "all",
              background: "red",
              opacity: 0.0,
            }}
          />
        )}

        {/* HOTSPOT PARA ABRIR O BLOCO DE NOTAS */}
        {!notesOpen && month !== "login" && (
          <div
            onClick={openNotes}
            style={{
              position: "absolute",
              left: "2%",
              top: "30%",
              width: "6%",
              height: "14%",
              cursor: "pointer",
              pointerEvents: "all",
              background: "red",
              opacity: 0.0,
            }}
          />
        )}

        {/* HOTSPOT PRÓXIMA PÁGINA */}
        {notesOpen && (
          <div
            onClick={nextPage}
            style={{
              position: "absolute",
              right: "11%",
              bottom: "17.8%",
              width: "4%",
              height: "5%",
              cursor: "pointer",
              pointerEvents: "all",
              background: "blue",
              opacity: 0.0,
            }}
          />
        )}

        {/* HOTSPOT PÁGINA ANTERIOR */}
        {notesOpen && (
          <div
            onClick={previousPage}
            style={{
              position: "absolute",
              left: "19.3%",
              bottom: "17.8%",
              width: "4%",
              height: "5%",
              cursor: "pointer",
              pointerEvents: "all",
              background: "green",
              opacity: 0.0,
            }}
          />
        )}

        {/* HOTSPOT FECHAR BLOCO */}
        {notesOpen && (
          <div
            onClick={closeNotes}
            style={{
              position: "absolute",
              right: "10.9%",
              top: "9%",
              width: "3%",
              height: "6%",
              cursor: "pointer",
              pointerEvents: "all",
              background: "yellow",
              opacity: 0.0,
            }}
          />
        )}
      </div>

      {/* MENU DE TROCA DE MÊS */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "#c0c0c0",
          padding: 10,
          border: "4px solid white",
          zIndex: 100,
        }}
      >
        <button onClick={() => { setMonth("feb"); setNotesOpen(false) }}>Fevereiro</button>
        <br />
        <button onClick={() => { setMonth("mar"); setNotesOpen(false) }}>Março</button>
        <br />
        <button onClick={() => { setMonth("apr"); setNotesOpen(false) }}>Abril</button>
        <br />
        <button onClick={() => { setMonth("may"); setNotesOpen(false) }}>Maio</button>
      </div>
    </div>
  )
}