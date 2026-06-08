//npm run dev

import { useState } from "react"

export default function App() {
  const [month, setMonth] = useState("feb")

  const [notesOpen, setNotesOpen] = useState(false)

  const [page, setPage] = useState(0)

  const screens = {
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
      ],
    },

    apr: {
      desktop: "/apr/desktop.png",

      notes: [
        "/apr/notes-1.png",
        "/apr/notes-2.png",
      ],
    },

    may: {
      desktop: "/may/desktop.png",

      notes: [
        "/may/notes-1.png",
        "/may/notes-2.png",
      ],
    },
  }

  const currentImage = notesOpen
    ? screens[month].notes[page]
    : screens[month].desktop

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

      {/* MENU TEMPORÁRIO DE TROCA DE MÊS */}
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
        <button
          onClick={() => {
            setMonth("feb")
            setNotesOpen(false)
          }}
        >
          Fevereiro
        </button>

        <br />

        <button
          onClick={() => {
            setMonth("mar")
            setNotesOpen(false)
          }}
        >
          Março
        </button>

        <br />

        <button
          onClick={() => {
            setMonth("apr")
            setNotesOpen(false)
          }}
        >
          Abril
        </button>

        <br />

        <button
          onClick={() => {
            setMonth("may")
            setNotesOpen(false)
          }}
        >
          Maio
        </button>
      </div>

      {/* HOTSPOT PARA ABRIR O BLOCO DE NOTAS */}
      {!notesOpen && (
        <div
          onClick={openNotes}
          style={{
            position: "absolute",

            left: "9%",
            top: "30%",

            width: "6%",
            height: "14%",

            cursor: "pointer",

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

            right: "16.5%",
            bottom: "17.8%",

            width: "4%",
            height: "5%",

            cursor: "pointer",

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

            left: "23.6%",
            bottom: "17.8%",

            width: "4%",
            height: "5%",

            cursor: "pointer",

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

            right: "17%",
            top: "9%",

            width: "2%",
            height: "6%",

            cursor: "pointer",

            background: "yellow",
            opacity: 0.0,
          }}
        />
      )}
    </div>
  )
}