import React from 'react';
import {Link, useParams} from 'react-router-dom';
import Juegos from './juegos/Juegos.jsx';
import {modulos} from '../data/modulos.js';
import NavbarProfesor from './NavbarProfesor.jsx';
import {NavbarEstudiante} from './indexestudiante.jsx';
import './modulos.css';
export default function JuegosModulo(){
 const {id}=useParams();const m=modulos.find(x=>x.id===id);
 let usuario=null;try{usuario=JSON.parse(localStorage.getItem('usuario')||'null')}catch{}
 return <>{usuario?.rol==='profesor'?<NavbarProfesor/>:<NavbarEstudiante/>}<main className="ag-modules"><Link className="ag-back" to={`/modulos/${id}`}>← Volver a {m?.titulo||'módulos'}</Link><h1>Juegos educativos</h1><p>Estos juegos pertenecen al material compartido; sus preguntas aún deben revisarse para cada módulo.</p><Juegos volver={()=>{window.location.href=`/modulos/${id}`}} /></main></>
}
