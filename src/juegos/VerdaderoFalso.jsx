import { useState } from "react";


const preguntas = [

{
caso:"Carlos vota en las elecciones para elegir a sus representantes.",
pregunta:"¿El voto es una forma de participación ciudadana?",
respuesta:true
},


{
caso:"Una persona decide no respetar las leyes porque piensa que solo algunas personas deben cumplirlas.",
pregunta:"¿Esta actitud representa una responsabilidad ciudadana?",
respuesta:false
},


{
caso:"Un grupo de estudiantes organiza una campaña para ayudar a su comunidad.",
pregunta:"¿Los estudiantes están ejerciendo participación ciudadana?",
respuesta:true
},


{
caso:"Un gobierno elimina las elecciones y permite que una sola persona tome todas las decisiones.",
pregunta:"¿Este sistema representa una democracia?",
respuesta:false
},


{
caso:"Ana conoce sus derechos y también cumple con sus responsabilidades como ciudadana.",
pregunta:"¿Una ciudadanía responsable incluye derechos y deberes?",
respuesta:true
},


{
caso:"Un ciudadano piensa que no puede opinar sobre los problemas de su país porque solo los políticos pueden hacerlo.",
pregunta:"¿Esta idea es correcta?",
respuesta:false
}

];




function VerdaderoFalso({volver}){


const [actual,setActual] = useState(0);

const [respuesta,setRespuesta] = useState(null);

const [puntos,setPuntos] = useState(0);

const [terminado,setTerminado] = useState(false);



function responder(valor){


if(respuesta !== null){
    return;
}


setRespuesta(valor);



if(valor === preguntas[actual].respuesta){

setPuntos(puntos + 10);

}


}




function siguiente(){


if(actual < preguntas.length - 1){


setActual(actual + 1);

setRespuesta(null);


}

else{


setTerminado(true);


}


}




function volverAJugar(){

setActual(0);

setRespuesta(null);

setPuntos(0);

setTerminado(false);

}




if(terminado){

return(

<div className="
min-h-screen
bg-cyan-50
flex
items-center
justify-center
p-10
">


<div className="
bg-white
rounded-3xl
shadow-xl
p-10
text-center
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
mt-5
">

Puntaje: {puntos}/60

</p>



<p className="
text-xl
font-bold
mt-5
text-teal-500
">


{

puntos === 60

?

"Excelente análisis"

:

puntos >= 40

?

"Muy bien, tienes buenos conocimientos"

:

"Debes repasar un poco más"


}


</p>




<button

onClick={volverAJugar}

className="
mt-8
bg-purple-500
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
bg-teal-400
text-white
px-8
py-3
rounded-full
font-bold
"

>

Volver a juegos

</button>



</div>


</div>


)

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
text-center
mb-6
">

Verdadero o Falso

</h1>



<p className="
text-center
font-bold
text-teal-500
">

Puntaje: {puntos}

</p>



<p className="
text-center
text-slate-500
mb-6
">

Caso {actual + 1} de {preguntas.length}

</p>




<div className="
bg-cyan-50
rounded-xl
p-5
mb-6
">


<h2 className="
font-bold
text-slate-700
">

Situación:

</h2>


<p className="
mt-2
">

{preguntas[actual].caso}

</p>


</div>




<h3 className="
text-xl
font-bold
text-center
mb-6
">

{preguntas[actual].pregunta}

</h3>




<div className="
flex
justify-center
gap-5
">


<button

onClick={()=>responder(true)}

className={`

px-8
py-3
rounded-full
font-bold

${
respuesta === true

?

preguntas[actual].respuesta === true

?

"bg-green-400 text-white"

:

"bg-red-400 text-white"

:

"bg-green-500 text-white"

}

`}

>

Verdadero

</button>




<button

onClick={()=>responder(false)}

className={`

px-8
py-3
rounded-full
font-bold

${
respuesta === false

?

preguntas[actual].respuesta === false

?

"bg-green-400 text-white"

:

"bg-red-400 text-white"

:

"bg-red-500 text-white"

}

`}

>

Falso

</button>


</div>

{
respuesta !== null && (

<div className="
mt-6
bg-cyan-50
rounded-xl
p-4
text-center
font-bold
">


{

respuesta === preguntas[actual].respuesta

?

<p className="text-green-600">

¡Correcto!

</p>

:

<p className="text-red-600">

Incorrecto

</p>

}



<p className="mt-2 text-slate-700">

La respuesta correcta es:

{

preguntas[actual].respuesta

?

"Verdadero"

:

"Falso"

}

</p>



</div>

)

}


<button

onClick={siguiente}

disabled={respuesta === null}

className="
mt-8
w-full
bg-purple-500
text-white
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


export default VerdaderoFalso;