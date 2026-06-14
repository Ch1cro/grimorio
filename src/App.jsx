import { useState, useEffect } from "react"

export default function App() {
  const [month, setMonth] = useState("login")
  const [notesOpen, setNotesOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [imgRect, setImgRect] = useState({ left: 0, top: 0, width: 0, height: 0 })
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  const screens = {
    login: {
      desktop: "login.png",
    },
    tutorial: {
      desktop: "tutorial.png",
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

  useEffect(() => {
    const duration = 8000
    const interval = 50
    const steps = duration / interval
    let current = 0

    const timer = setInterval(() => {
      current++
      setProgress(Math.min((current / steps) * 100, 100))
      if (current >= steps) {
        clearInterval(timer)
        setLoading(false)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

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

  if (loading) {
    return (
      <div style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        position: "relative",
        overflow: "hidden",
      }}>
        <img
          src="/desktop.png"
          alt=""
          style={{
            width: "100vw",
            height: "100vh",
            objectFit: "contain",
            imageRendering: "pixelated",
            display: "block",
          }}
        />
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          fontFamily: "Departure",
        }}>
          <div style={{
            color: "white",
            fontSize: "clamp(10px, 1.5vw, 24px)",
            marginBottom: "8px",
          }}>
            Iniciando sistema...
          </div>
          <div style={{
            width: "clamp(150px, 20vw, 300px)",
            height: "clamp(12px, 1.5vw, 20px)",
            background: "#333",
            border: "2px solid #888",
            marginBottom: "16px",
            margin: "0 auto 16px auto",
          }}>
            <div style={{
              width: `${progress}%`,
              height: "100%",
              background: "#000080",
              transition: "width 0.05s linear",
            }} />
          </div>
          <div style={{
            color: "#aaa",
            fontSize: "clamp(8px, 1vw, 18px)",
          }}>
            Para melhor experiência, pressione F11 para tela cheia.
          </div>
        </div>
      </div>
    )
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
              left: "31.5%",
              top: "56%",
              width: "13.5%",
              height: "8.5%",
              cursor: "pointer",
              pointerEvents: "all",
              background: "red",
              opacity: 0.0,
            }}
          />
        )}
        {/* HOTSPOT BOTÃO TUTORIAL */}
        {month === "login" && (
          <div
            onClick={() => setMonth("tutorial")}
            style={{
              position: "absolute",
              right: "31.2%",
              top: "56%",
              width: "13.5%",
              height: "8.5%",
              cursor: "pointer",
              pointerEvents: "all",
              background: "blue",
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
        {/* HOTSPOT FECHAR BLOCO - meses normais */}
        {notesOpen && month !== "tutorial" && (
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

        {/* HOTSPOT FECHAR TUTORIAL */}
        {month === "tutorial" && (
          <div
            onClick={() => setMonth("login")}
            style={{
              position: "absolute",
              right: "15%",
              top: "10%",
              width: "2.8%",
              height: "5%",
              cursor: "pointer",
              pointerEvents: "all",
              background: "red",
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