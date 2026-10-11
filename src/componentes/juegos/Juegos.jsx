import { useState } from "react";
import { Puzzle } from "lucide-react";

import Trivia from "./Trivia";
import Memoria from "./Memoria";
import VerdaderoFalso from "./VerdaderoFalso";

function RuletaIcon(){

return(

<svg
width="90"
height="90"
viewBox="0 0 100 100"
fill="none"
stroke="currentColor"
strokeWidth="5"
>


<circle
cx="50"
cy="45"
r="35"
/>


<line x1="50" y1="10" x2="50" y2="80"/>

<line x1="15" y1="45" x2="85" y2="45"/>

<line x1="25" y1="20" x2="75" y2="70"/>

<line x1="75" y1="20" x2="25" y2="70"/>


<circle
cx="50"
cy="45"
r="8"
/>


<path d="M35 80 L35 90"/>

<path d="M65 80 L65 90"/>


<rect
x="25"
y="90"
width="50"
height="5"
/>


</svg>



)


}

function VerdaderoFalsoIcon(){

return(

<svg
width="120"
height="120"
viewBox="0 0 140 140"
fill="none"
stroke="currentColor"
strokeWidth="5"
strokeLinecap="round"
strokeLinejoin="round"
>


{/* X arriba izquierda */}

<circle
cx="35"
cy="25"
r="18"
/>

<line
x1="27"
y1="17"
x2="43"
y2="33"
/>

<line
x1="43"
y1="17"
x2="27"
y2="33"
/>



{/* Check arriba derecha */}

<circle
cx="105"
cy="25"
r="18"
/>

<polyline
points="
95,25
102,32
115,17
"
/>



{/* Cabeza */}

<circle
cx="65"
cy="55"
r="12"
/>



{/* Cuerpo inclinado */}

<path
d="
M65 67
L65 105
"
/>



{/* Brazo levantado al check */}

<path
d="
M65 75
L95 55
L82 42
"
/>



{/* Brazo doblado */}

<path
d="
M65 80
L45 95
L55 110
"
/>



{/* Pierna */}

<path
d="
M65 105
L65 130
"
/>



</svg>

)

}

function Juegos({volver}) {
    const [juegoActual, setJuegoActual] = useState("menu");

    if(juegoActual === "trivia"){

    return (
        <Trivia 
            volver={() => setJuegoActual("menu")} 
        />
    );

}


if(juegoActual === "memoria"){

    return (
        <Memoria 
            volver={() => setJuegoActual("menu")} 
        />
    );

}

if(juegoActual === "verdadero"){

return (
    <VerdaderoFalso volver={() => setJuegoActual("menu")} />
);

}
   


                 const juegos = [

                    {
                        id:"trivia",
                        nombre:"Trivia Política",
                        descripcion:"Responde preguntas sobre democracia y ciudadanía.",
                        icono:RuletaIcon
                    },


                    {
                        id:"memoria",
                        nombre:"Memoria Ciudadana",
                        descripcion:"Encuentra las parejas correctas.",
                        icono:Puzzle
                    },


                    {
                        id:"verdadero",
                        nombre:"Verdadero o Falso",
                        descripcion:"Demuestra cuánto sabes.",
                        icono:VerdaderoFalsoIcon
                    }

                    ];



    return (

        <div className="min-h-screen bg-cyan-50">


            <header className="
                h-28
                bg-gradient-to-r
                from-teal-400
                to-purple-600
                flex
                items-center
                px-10
            ">


                <h1 className="
                    text-4xl
                    font-bold
                    text-white
                    underline
                ">

                    Juegos

                </h1>

                 <button

                    onClick={volver}

                    className="
                    ml-10
                    bg-white
                    text-teal-500
                    px-6
                    py-3
                    rounded-full
                    font-bold
                    "

                    >

                     Volver al Quiz

                    </button>


            </header>





            <main className="
                p-10
                grid
                grid-cols-1
                md:grid-cols-3
                gap-8
            ">



                {
                    juegos.map((juego,index)=>(


                        <div

                            key={index}

                            className="
                                bg-white
                                rounded-3xl
                                shadow-xl
                                p-8
                                flex
                                flex-col
                                items-center
                                text-center
                            "

                        >


                           <div className="
                                    w-32
                                    h-32
                                    flex
                                    items-center
                                    justify-center
                                    mb-6
                                    ">

                                    <juego.icono
                                    size={90}
                                    strokeWidth={2}
                                    />

                                    </div>



                            <h2 className="
                                text-2xl
                                font-bold
                                text-slate-700
                                mt-5
                            ">

                                {juego.nombre}

                            </h2>




                           <p className="
                            h-16
                            flex
                            items-center
                            justify-center
                            text-center
                            ">

                            {juego.descripcion}

                            </p>





                            <button

                            onClick={() => setJuegoActual(juego.id)}

                            className="
                            bg-teal-400
                            text-white
                            px-8
                            py-3
                            rounded-full
                            font-bold
                            "

                            >

                            Jugar

                            </button>



                        </div>


                    ))
                }



            </main>



        </div>

    )


}


export default Juegos;