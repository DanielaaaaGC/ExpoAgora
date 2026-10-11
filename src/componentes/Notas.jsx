import React, {useEffect,useMemo,useState} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import NavbarProfesor from './NavbarProfesor.jsx';
import {NavbarEstudiante} from './indexestudiante.jsx';
import './notas.css';
const API='http://localhost:3000/api';
const numero=v=>Number.isFinite(Number(v))?Number(v):null;
const clean=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function Barra({valor}){return <div className="an-bar"><span style={{width:`${Math.max(0,Math.min(100,Number(valor)||0))}%`}} /></div>}
export default function Notas(){
 const [parametros,setParametros]=useSearchParams();
 const usuario=useMemo(()=>{try{return JSON.parse(localStorage.getItem('usuario')||'null')}catch{return null}},[]);
 const esProfesor=usuario?.rol==='profesor';
 const seleccionado=parametros.get('estudiante');
 const [resultados,setResultados]=useState([]),[estudiantes,setEstudiantes]=useState([]),[busqueda,setBusqueda]=useState('');
 const [cargando,setCargando]=useState(true),[error,setError]=useState('');
 useEffect(()=>{
  let vivo=true;
  if(!usuario?.id_usuario){setError('Inicia sesión para consultar tus calificaciones.');setCargando(false);return;}
  setCargando(true);setError('');
  (async()=>{
   const cabeceras={Authorization:`Bearer ${localStorage.getItem('agora_token')||''}`};
   const urls=[`${API}/notas`];if(esProfesor)urls.push(`${API}/estudiantes`);
   const respuestas=await Promise.all(urls.map(url=>fetch(url,{headers:cabeceras})));
   const datos=await Promise.all(respuestas.map(async r=>{const d=await r.json();if(!r.ok)throw new Error(d.mensaje||d.error||`Error HTTP ${r.status}`);return d}));
   if(vivo){setResultados(Array.isArray(datos[0])?datos[0]:[]);if(esProfesor)setEstudiantes(Array.isArray(datos[1])?datos[1]:[])}
  })().catch(e=>{if(vivo)setError(e.message)}).finally(()=>{if(vivo)setCargando(false)});
  return()=>{vivo=false};
 },[usuario?.id_usuario,esProfesor]);
 const filtrados=estudiantes.filter(e=>clean(`${e.nombre} ${e.apellido} ${e.correo} ${e.id_usuario}`).includes(clean(busqueda.trim())));
 const estudiante=estudiantes.find(e=>String(e.id_usuario)===String(seleccionado));
 const propios=esProfesor?(estudiante?resultados.filter(r=>String(r.id_estudiante)===String(estudiante.id_usuario)):[]):resultados;
 const porcentajes=propios.map(r=>numero(r.porcentaje)).filter(v=>v!==null);
 const promedio=porcentajes.length?Math.round(porcentajes.reduce((a,b)=>a+b,0)/porcentajes.length):null;
 const mejor=porcentajes.length?Math.max(...porcentajes):null;
 const titulo=esProfesor?(estudiante?`Calificaciones de ${estudiante.nombre} ${estudiante.apellido}`:'Calificaciones de estudiantes'):'Mis calificaciones';
 return <>{esProfesor?<NavbarProfesor/>:<NavbarEstudiante/>}<main className="an-page">
  <Link className="an-back" to={esProfesor?'/estudiantes':'/indexestudiante'}>← {esProfesor?'Volver a estudiantes':'Volver al inicio'}</Link>
  <header className="an-header"><div><span className="an-kicker">ÁGORA · PASO A PASO</span><h1>{titulo}</h1><p>{esProfesor?'Busca un estudiante para consultar los resultados que ha obtenido hasta ahora.':'Consulta tus resultados, tu promedio y el progreso de tus evaluaciones.'}</p></div><div className="an-header-icon" aria-hidden="true">▤</div></header>
  {cargando?<section className="an-card">Cargando calificaciones…</section>:error?<section role="alert" className="an-card an-error">{error}</section>:<>
   {esProfesor&&!seleccionado&&<section className="an-card an-directory"><div className="an-title"><div><span className="an-kicker">ESTUDIANTES</span><h2>Consultar notas</h2></div><span className="an-count">{filtrados.length} estudiantes</span></div><label htmlFor="an-buscar">Buscar estudiante</label><input id="an-buscar" type="search" placeholder="Buscar por nombre, apellido, correo o ID…" value={busqueda} onChange={e=>setBusqueda(e.target.value)}/><div className="an-list">{filtrados.map(e=><button key={e.id_usuario} type="button" className="an-person" onClick={()=>setParametros({estudiante:String(e.id_usuario)})}><span className="an-avatar">{(e.nombre||'E').charAt(0).toUpperCase()}</span><span className="an-person-text"><strong>{e.nombre} {e.apellido}</strong><small>{e.correo}</small></span><span className="an-person-cta">Ver calificaciones →</span></button>)}{filtrados.length===0&&<p className="an-empty">No encontramos estudiantes con esa búsqueda.</p>}</div></section>}
   {(!esProfesor||seleccionado)&&<>{esProfesor&&<button className="an-back an-switch" onClick={()=>setParametros({})}>← Consultar otro estudiante</button>}{esProfesor&&!estudiante?<section className="an-card">No se encontró el estudiante seleccionado.</section>:<>
    <div className="an-top-grid"><section className="an-card an-summary"><span className="an-kicker">TU RENDIMIENTO</span><h2>{esProfesor?'Resumen del estudiante':'Tu progreso en los quizzes'}</h2><div className="an-stat-grid"><div><span>Promedio general</span><strong>{promedio===null?'—':`${promedio}%`}</strong></div><div><span>Mejor resultado</span><strong>{mejor===null?'—':`${mejor}%`}</strong></div><div><span>Quizzes realizados</span><strong>{propios.length}</strong></div></div><p className="an-muted">Los valores corresponden únicamente a calificaciones guardadas en PostgreSQL.</p></section>
    <section className="an-card an-next"><span className="an-kicker">TU SIGUIENTE PASO</span><h2>{promedio===null?'¡Tu aprendizaje comienza aquí!':promedio>=70?'¡Buen trabajo!':'¡Sigue practicando!'}</h2><div className="an-donut" style={{'--pct':promedio||0}}><div><strong>{promedio??0}<small>%</small></strong><span>Promedio obtenido</span></div></div><p>{propios.length?`${propios.length} resultado${propios.length!==1?'s':''} registrado${propios.length!==1?'s':''}.`:'Aún no hay quizzes calificados.'}</p>{!esProfesor&&<Link className="an-resource" to="/modulos">Ver módulos →</Link>}</section></div>
    <section className="an-card an-history"><div className="an-title"><div><span className="an-kicker">PASO A PASO</span><h2>Historial de calificaciones</h2></div><span className="an-count">{propios.length} resultado{propios.length===1?'':'s'}</span></div>{propios.length?<div className="an-table-wrap"><table><thead><tr><th>Cuestionario</th><th>Nota</th><th>Rendimiento</th><th>Intentos</th><th>Fecha</th></tr></thead><tbody>{propios.map((r,i)=><tr key={r.id_intento||r.id_resultado||i}><td><strong>{r.quiz||`Quiz ${r.id_quiz||i+1}`}</strong></td><td><span className="an-grade">{r.porcentaje==null?(r.nota??'—'):`${r.porcentaje}%`}</span></td><td><Barra valor={r.porcentaje}/></td><td>{r.intentos??'—'}</td><td>{r.fecha?new Date(r.fecha).toLocaleDateString('es-CR'):'—'}</td></tr>)}</tbody></table></div>:<div className="an-empty">Todavía no hay calificaciones registradas. Cuando se termine y guarde un cuestionario, aparecerá aquí.</div>}</section>
   </>}</>}
  </>}
 </main></>;
}
