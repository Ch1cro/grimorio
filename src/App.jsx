import { useState, useEffect } from "react"

export default function App() {
  const [month, setMonth] = useState("login")
  const [notesOpen, setNotesOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [imgRect, setImgRect] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [startMenuOpen, setStartMenuOpen] = useState(false)

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

  function changeMonth(m) {
    setMonth(m)
    setNotesOpen(false)
    setStartMenuOpen(false)
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
      onClick={() => setStartMenuOpen(false)}
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

        {/* HOTSPOT MENU INICIAR */}
        {month !== "login" && !notesOpen && (
          <div
            onClick={(e) => {
              e.stopPropagation()
              setStartMenuOpen(!startMenuOpen)
            }}
            style={{
              position: "absolute",
              left: "0.55%",
              bottom: "0.4%",
              width: "13.5%",
              height: "9%",
              cursor: "pointer",
              pointerEvents: "all",
              background: "white",
              opacity: 0.0,
            }}
          />
        )}

        {/* MENU INICIAR */}
        {startMenuOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              left: "0%",
              bottom: "8%",
              width: "12%",
              background: "#c0c0c0",
              border: "2px solid white",
              borderBottom: "2px solid #808080",
              borderRight: "2px solid #808080",
              pointerEvents: "all",
              fontFamily: "Departure",
              fontSize: "clamp(8px, 1.2vw, 22px)",
            }}
          >
            {/* Cabeçalho azul estilo XP */}
            <div style={{
              background: "linear-gradient(to bottom, #1a5bc4, #3a7bd5)",
              color: "white",
              padding: "6px 8px",
              fontFamily: "Departure",
              fontSize: "clamp(8px, 1.1vw, 20px)",
            }}>
              Seletor
            </div>

            {[
              { key: "feb", label: "Fevereiro" },
              { key: "mar", label: "Março" },
              { key: "apr", label: "Abril" },
              { key: "may", label: "Maio" },
            ].map((m) => (
              <div
                key={m.key}
                onClick={() => changeMonth(m.key)}
                style={{
                  padding: "6px 12px",
                  cursor: "pointer",
                  color: month === m.key ? "white" : "#000",
                  background: month === m.key ? "#000080" : "transparent",
                  borderBottom: "1px solid #aaa",
                  fontWeight: month === m.key ? "bold" : "normal",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#000080"
                  e.currentTarget.style.color = "white"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = month === m.key ? "#000080" : "transparent"
                  e.currentTarget.style.color = month === m.key ? "white" : "#000"
                }}
              >
                {m.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}