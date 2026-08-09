import { useState } from "react";


const preguntas = [

{
pregunta:"¿Qué es la democracia?",

opciones:[
"El gobierno de una sola persona",
"Un sistema donde participan los ciudadanos",
"Eliminar las elecciones",
"No tener leyes"
],

correcta:1

},


{
pregunta:"¿Qué permite el voto?",

opciones:[
"Participar en decisiones políticas",
"Eliminar derechos",
"Evitar elecciones",
"Quitar leyes"
],

correcta:0

},


{
pregunta:"¿Qué es un ciudadano?",

opciones:[
"Una persona sin derechos",
"Un partido político",
"Una institución",
"Una persona con derechos y responsabilidades"
],

correcta:3

},


{
pregunta:"¿Cuál es una responsabilidad ciudadana?",

opciones:[
"No participar en la sociedad",
"Eliminar derechos",
"Respetar las leyes",
"Evitar elecciones"
],

correcta:2

},


{
pregunta:"¿Qué institución representa al Estado?",

opciones:[
"Una institución pública",
"Un videojuego",
"Una empresa privada",
"Un grupo sin reglas"
],

correcta:0

}

];




function Trivia({volver}){

const [actual,setActual] = useState(0);

const [resultado,setResultado] = useState(null);

const [puntos,setPuntos] = useState(0);

const [terminado,setTerminado] = useState(false);


const pregunta = preguntas[actual];

if(terminado){

return(

<div className="
min-h-screen
bg-cyan-50
flex
items-center
justify-center
">


<div className="
bg-white
rounded-3xl
shadow-xl
p-10
text-center
max-w-md
">


<h1 className="
text-4xl
font-bold
text-purple-600
">

Juego terminado

</h1>



<p className="
text-2xl
font-bold
mt-6
text-slate-700
">

Puntaje: {puntos}/50

</p>




<p className="
text-xl
font-bold
mt-5
text-teal-500
">


{

puntos === 50

?

"¡Excelente! Dominaste el tema."

:

puntos === 40

?

"¡Muy bien! Tienes buenos conocimientos."

:

puntos === 30

?

"Bien, pero puedes seguir practicando."

:

"Debes repasar un poco más e intentarlo de nuevo."

}


</p>





<button

onClick={()=>{

setActual(0);

setPuntos(0);

setResultado(null);

setTerminado(false);

}}

className="
mt-8
bg-teal-400
text-white
px-8
py-3
rounded-full
font-bold
"

>

Volver a jugar

</button>




<button

onClick={volver}

className="
mt-4
block
mx-auto
bg-purple-500
text-white
px-8
py-3
rounded-full
font-bold
"

>

 Volver a Juegos

</button>



</div>


</div>

)

}

function siguiente(){


if(actual < preguntas.length - 1){

    setActual(actual + 1);

    setResultado(null);

}

else{

    setTerminado(true);

}


}


function responder(index){


if(resultado !== null){
    return;
}


setResultado(index);


if(index === pregunta.correcta){

    setPuntos(puntos + 10);

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
max-w-xl
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
">

Trivia Política

</h1>

<p className="
text-lg
font-bold
text-teal-500
">

 Puntaje: {puntos}

</p>

<p className="
text-slate-500
mb-5
">

Pregunta {actual + 1} de {preguntas.length}

</p>


<h2 className="
text-xl
font-bold
mb-5
">

{pregunta.pregunta}

</h2>



<div className="space-y-4">


{

pregunta.opciones.map((opcion,index)=>(


<button

key={index}

onClick={()=>responder(index)}

className={`

w-full
p-4
rounded-xl
border-2
text-left


${
resultado===index

?

index===pregunta.correcta

?

"bg-green-200 border-green-500"

:

"bg-red-200 border-red-500"

:

"bg-white"

}

`}

>

{opcion}

</button>


))


}


</div>

<button

onClick={siguiente}

disabled={resultado === null}

className="
mt-6
bg-purple-500
text-white
px-8
py-3
rounded-full
font-bold
disabled:opacity-50
"

>

Siguiente

</button>


</div>



</div>




)

}



export default Trivia;