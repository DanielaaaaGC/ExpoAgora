import { useState } from "react";

import democracia from "./iconos/democracia.png";
import voto from "./iconos/voto.png";
import justicia from "./iconos/justicia.png";
import ley from "./iconos/ley.png";
import ciudadano from "./iconos/ciudadano.png";
import gobierno from "./iconos/gobierno.png";
import participacion from "./iconos/participacion.png";
import constitucion from "./iconos/constitucion.png";
import comunidad from "./iconos/comunidad.png";


const cartasIniciales = [

{
id:1,
nombre:"Democracia",
icono:democracia
},
{
id:2,
nombre:"Democracia",
icono:democracia
},


{
id:3,
nombre:"Voto",
icono:voto
},
{
id:4,
nombre:"Voto",
icono:voto
},


{
id:5,
nombre:"Justicia",
icono:justicia
},
{
id:6,
nombre:"Justicia",
icono:justicia
},


{
id:7,
nombre:"Ley",
icono:ley
},
{
id:8,
nombre:"Ley",
icono:ley
},


{
id:9,
nombre:"Ciudadano",
icono:ciudadano
},
{
id:10,
nombre:"Ciudadano",
icono:ciudadano
},


{
id:11,
nombre:"Gobierno",
icono:gobierno
},
{
id:12,
nombre:"Gobierno",
icono:gobierno
},


{
id:13,
nombre:"Participación",
icono:participacion
},
{
id:14,
nombre:"Participación",
icono:participacion
},


{
id:15,
nombre:"Constitución",
icono:constitucion
},
{
id:16,
nombre:"Constitución",
icono:constitucion
},


];


function Memoria({volver}){


const [cartas,setCartas] = useState(() => 
    [...cartasIniciales].sort(() => Math.random() - 0.5)
);


const [seleccionadas,setSeleccionadas] = useState([]);


const [bloqueadas,setBloqueadas] = useState([]);

const [bloqueo,setBloqueo] = useState(false);

const [parejasEncontradas,setParejasEncontradas] = useState(0);

const [ganador,setGanador] = useState(false);


function volverAJugar(){

setCartas(
    [...cartasIniciales].sort(() => Math.random() - 0.5)
);

setSeleccionadas([]);

setBloqueadas([]);

setParejasEncontradas(0);

setGanador(false);

}


function elegirCarta(carta){


if(
bloqueo ||
seleccionadas.length === 2 ||
bloqueadas.includes(carta.id)
){

return;

}


const nuevas = [
...seleccionadas,
carta
];


setSeleccionadas(nuevas);



if(nuevas.length === 2){


if(nuevas[0].nombre === nuevas[1].nombre){


const nuevasBloqueadas = [

...bloqueadas,

nuevas[0].id,

nuevas[1].id

];


setBloqueadas(nuevasBloqueadas);


setParejasEncontradas(parejasEncontradas + 1);


setSeleccionadas([]);



if(parejasEncontradas + 1 === 8){

setGanador(true);

}


}


else{

setBloqueo(true);


setTimeout(()=>{

setSeleccionadas([]);

setBloqueo(false);


},1000);



}


}



}




return(

<div className="
min-h-screen
bg-cyan-50
p-10
">


<button

onClick={volver}

className="
bg-teal-400
text-white
px-6
py-3
rounded-full
font-bold
"

>

Volver

</button>




<div className="
bg-white
max-w-3xl
mx-auto
mt-10
rounded-3xl
shadow-xl
p-8
">


<h1 className="
text-3xl
font-bold
text-slate-700
mb-8
text-center
">

 Memoria Ciudadana

</h1>

<p className="
text-center
text-lg
font-bold
text-teal-500
mb-5
">

Parejas encontradas: {parejasEncontradas}/8

</p>

{

ganador && (

<div className="
bg-green-100
border-2
border-green-400
rounded-xl
p-5
mb-6
text-center
">


<h2 className="
text-2xl
font-bold
text-green-700
">

 ¡Felicidades!

</h2>


<p>

Encontraste todas las parejas.

</p>


<button

onClick={volverAJugar}

className="
mt-4
bg-purple-500
text-white
px-6
py-3
rounded-full
font-bold
"

>
Volver a jugar

</button>


</div>

)

}


<div className="
grid
grid-cols-4
gap-4
">


{

cartas.map((carta)=>(


<button

key={carta.id}

onClick={()=>elegirCarta(carta)}

className="
h-24
rounded-xl
bg-teal-400
text-white
text-4xl
font-bold
flex
items-center
justify-center
"

>


{

seleccionadas.includes(carta)

||

bloqueadas.includes(carta.id)

?

<img

src={carta.icono}

className="
w-16
h-16
object-contain
"

/>

:

"?"

}


</button>


))


}


</div>


</div>


</div>


)


}


export default Memoria;