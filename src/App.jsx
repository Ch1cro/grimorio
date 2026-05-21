import { useState } from "react"

export default function App() {
  const [month, setMonth] = useState("march")

  const wallpapers = {
    march: "/march.png",
    april: "/april.png",
    may: "/may.png",
    june: "/june.png",
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
      <img
        src={wallpapers[month]}
        alt=""
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "contain",
          imageRendering: "pixelated",
          display: "block",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "#c0c0c0",
          padding: 10,
          border: "4px solid white",
        }}
      >
        <button onClick={() => setMonth("march")}>
          Março
        </button>

        <br />

        <button onClick={() => setMonth("april")}>
          Abril
        </button>

        <br />

        <button onClick={() => setMonth("may")}>
          Maio
        </button>

        <br />

        <button onClick={() => setMonth("june")}>
          Junho
        </button>
      </div>
    </div>
  )
}

//export default function App() {
//  return (
//    <div
//      style={{
//        width: "100vw",
//        height: "100vh",
//      backgroundImage: "url('/march.png')",
//      backgroundSize: "contain",
//      backgroundRepeat: "no-repeat",
//      backgroundPosition: "center",
//      backgroundColor: "black",
//      imageRendering: "pixelated",
//    }}
//  >
//  </div>
//)
//}