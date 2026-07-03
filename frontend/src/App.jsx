import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Wine, ChevronRight, ChevronLeft, X, Sparkles, Calendar, Clock, MapPin, Leaf, Hammer, Tag } from "lucide-react";
import './App.css';

const Inicio = () => {
  const [historia, setHistoria] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/secciones/')
      .then(respuesta => respuesta.json())
      .then(datos => {
        const seccionHistoria = datos.find(seccion => seccion.identificador === 'historia');
        setHistoria(seccionHistoria);
      })
      .catch(error => console.error("Error al cargar la historia:", error));
  }, []);

  return (
    <>
      <div className="bg-amber-50 text-stone-900 pb-10">
        
        {/* Título Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-amber-100 via-amber-50 to-amber-50 py-14 px-8 text-center border-b border-amber-200">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, #92400e 0px, #92400e 1px, transparent 1px, transparent 28px)",
            }}
          />
          <div className="relative z-10">
            {/* AQUÍ ESTÁ EL PRIMER LOGO */}
            <div className="w-16 h-16 rounded-full bg-white border-4 border-amber-600 flex items-center justify-center mx-auto mb-4 shadow-md overflow-hidden">
              {/* Asegúrate de que el nombre coincida con tu archivo, ej: /logo.png */}
              <img src="/logo.png" alt="Logo Pilares del Monte" className="w-full h-full object-contain p-1" />
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-2">
              {historia ? historia.titulo : "Nuestra Historia"}
            </h1>
            <p className="italic text-stone-600">El alma de San Francisco del Monte</p>
          </div>
        </section>

        {/* Contenido en dos columnas */}
        <section className="px-8 py-16 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-4 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-amber-600 inline-block" />
                Nuestro Relato
              </h2>
              <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                {historia ? historia.contenido : "Cargando el legado de nuestra viña..."}
              </p>
            </div>
          </div>

          <div className="bg-white p-3 shadow-lg border border-amber-100 rotate-1 transition-transform hover:rotate-0 duration-500 max-w-md mx-auto w-full">
            <div
              className="h-96 flex flex-col items-center justify-center border-2 border-dashed border-amber-300 relative overflow-hidden"
              style={{ background: "linear-gradient(160deg, #d4a01714, transparent)" }}
            >
              {historia?.imagen_fondo ? (
                <img 
                  src={historia.imagen_fondo} 
                  alt="Historia Pilares del Monte" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  {/* AQUÍ ESTÁ EL SEGUNDO LOGO */}
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center z-10 mb-3 overflow-hidden shadow">
                     <img src="/logo.png" alt="Logo Pilares del Monte" className="w-full h-full object-contain p-1" />
                  </div>
                  <p className="text-xs text-stone-400 italic text-center px-6 z-10">
                    Sube una imagen desde Django<br />para verla aquí
                  </p>
                </>
              )}
            </div>
            <p className="text-center text-xs tracking-widest text-stone-500 mt-3 uppercase font-semibold">
              San Francisco del Monte
            </p>
          </div>
        </section>

        {/* Timeline (Diseño estático original) */}
        <section className="relative bg-red-950 py-16 px-8 overflow-hidden">
          <span className="absolute -bottom-6 right-8 font-serif text-[140px] leading-none text-amber-100/5 select-none">
            1998
          </span>
          <h3 className="relative font-serif text-2xl text-amber-50 text-center mb-10">
            El Camino del Legado
          </h3>
          
          <div className="relative max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-start justify-between gap-10 sm:gap-0">
            <span className="hidden sm:block absolute top-3 left-0 right-0 h-px bg-amber-600/40" />

            <div className="relative flex flex-col items-center w-full sm:w-1/3 text-center">
              <span className="w-6 h-6 rounded-full bg-amber-600 border-4 border-red-950 z-10" />
              <p className="font-serif text-amber-50 mt-4">1998</p>
              <p className="text-amber-200/70 text-sm">Jorge Armijo Vera<br />inicia el proyecto</p>
            </div>

            <div className="relative flex flex-col items-center w-full sm:w-1/3 text-center">
              <span className="w-6 h-6 rounded-full bg-amber-600 border-4 border-red-950 z-10" />
              <p className="font-serif text-amber-50 mt-4">Años después</p>
              <p className="text-amber-200/70 text-sm">El conocimiento<br />se transforma en maestría</p>
            </div>

            <div className="relative flex flex-col items-center w-full sm:w-1/3 text-center">
              <span className="w-6 h-6 rounded-full bg-amber-50 border-4 border-red-950 z-10" />
              <p className="font-serif text-amber-50 mt-4">Hoy</p>
              <p className="text-amber-200/70 text-sm">Pilares del Monte,<br />un nombre propio</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

const Clases = () => {
  const [fondoData, setFondoData] = useState(null);
  const [clases, setClases] = useState([]); // Aquí guardaremos las tarjetas desde Django

  useEffect(() => {
    // 1. Cargar el fondo y título de la sección
    fetch('http://127.0.0.1:8000/api/secciones/')
      .then(respuesta => respuesta.json())
      .then(datos => {
        const seccionClases = datos.find(seccion => seccion.identificador === 'clases');
        setFondoData(seccionClases);
      })
      .catch(error => console.error("Error al cargar fondo:", error));

    // 2. Cargar las tarjetas de clases (Apunta a la futura API de clases)
    fetch('http://127.0.0.1:8000/api/clases/')
      .then(respuesta => respuesta.json())
      .then(datos => setClases(datos))
      .catch(error => console.error("Aún no existe la API de clases en Django:", error));
  }, []);

  // Dejamos estos datos temporales para que la página no se vea vacía 
  // mientras construimos la tabla en Django.
  const eventosMostrar = clases.length > 0 ? clases : [
    {
      id: 1,
      tipo: "Taller y Degustación",
      titulo: "Cata de Vinos Reserva",
      fecha: "Sábado, 24 de Junio",
      hora: "16:00 – 18:00 hrs",
      lugar: "Cava Principal",
      nivel: "Principiantes",
      descripcion: "Aprende a distinguir las notas de madera y frutos rojos en nuestra selección especial mientras disfrutas del atardecer.",
      color: "#4a1220",
    },
    {
      id: 2,
      tipo: "Masterclass",
      titulo: "Maridaje Perfecto",
      fecha: "Domingo, 2 de Julio",
      hora: "13:00 – 15:30 hrs",
      lugar: "Salón del Monte",
      nivel: "Intermedio",
      descripcion: "Descubre los secretos para combinar quesos artesanales, carnes curadas y nuestras mejores cepas blancas y tintas.",
      color: "#d4a017",
    },
  ];

  return (
    <>
      <div className="bg-amber-50 text-stone-900 pb-10 min-h-screen">
        
        {/* Título Hero conectado a Django (Sin el contenido de texto largo) */}
        <section 
          className="relative py-14 px-8 text-center bg-cover bg-center border-b border-amber-200"
          style={fondoData?.imagen_fondo ? { backgroundImage: `url(${fondoData.imagen_fondo})` } : {}}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100/90 via-amber-50/95 to-amber-50 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-white border-4 border-amber-600 flex items-center justify-center mx-auto mb-4 shadow-md overflow-hidden">
              <img src="/logo.png" alt="Logo Pilares del Monte" className="w-full h-full object-contain scale-[2.5]" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-2 drop-shadow-sm">
              {fondoData ? fondoData.titulo : "Experiencias en el Monte"}
            </h1>
            <p className="italic text-stone-700 font-medium max-w-2xl mx-auto drop-shadow-sm">
              Vive el monte a través de los sentidos
            </p>
          </div>
        </section>

        {/* Tarjetas de evento */}
        <section className="px-8 py-16 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          {eventosMostrar.map((e) => (
            <div
              key={e.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all hover:-translate-y-1 border border-amber-100 overflow-hidden flex flex-col"
            >
              <div className="h-1.5" style={{ backgroundColor: e.color || '#4a1220' }} />
              <div className="p-7 flex flex-col flex-1">
                <span
                  className="self-start text-xs tracking-widest font-semibold px-3 py-1 rounded-full mb-4"
                  style={{ backgroundColor: `${e.color || '#4a1220'}1a`, color: e.color || '#4a1220' }}
                >
                  {e.tipo ? e.tipo.toUpperCase() : "EVENTO"}
                </span>

                <h3 className="font-serif text-2xl text-stone-900 mb-4">{e.titulo}</h3>

                <div className="space-y-2 mb-5 text-sm text-stone-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    {e.fecha}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-700" />
                    {e.hora}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-700" />
                    {e.lugar}
                    {e.nivel && (
                      <span className="ml-2 text-xs border border-amber-300 rounded-full px-2 py-0.5 text-stone-500">
                        {e.nivel}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed mb-6 flex-1">{e.descripcion}</p>

                {/* Área de contacto en lugar del botón */}
                <div className="mt-auto pt-5 border-t border-amber-100 text-center">
                  <p className="text-xs text-stone-500 mb-2">
                    Para inscribirte o consultar disponibilidad, comunícate con nosotros.
                  </p>
                  <Link 
                    to="/contactanos" 
                    className="inline-block font-serif italic text-amber-700 hover:text-red-900 font-medium transition-colors"
                  >
                    Ir a la sección de contacto →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
      <Footer />
    </>
  );
};  

const Recuerdos = () => {
  const [recuerdos, setRecuerdos] = useState([]);

  useEffect(() => {
    // Recuerda que esto apunta a la URL que configuraste (ej: http://127.0.0.1:8000/api)
    fetch('http://127.0.0.1:8000/api/recuerdos/')
      .then(respuesta => respuesta.json())
      .then(datos => setRecuerdos(datos))
      .catch(error => console.error("Error al cargar recuerdos:", error));
  }, []);

  return (
    <>
      <div className="bg-amber-50 text-stone-900 pb-20 min-h-screen overflow-hidden">
        
        {/* Título de la sección */}
        <section className="relative py-14 px-8 text-center border-b border-amber-200 bg-gradient-to-b from-amber-100 via-amber-50 to-amber-50 mb-16">
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-full bg-white border-4 border-amber-600 flex items-center justify-center mx-auto mb-4 shadow-md overflow-hidden">
              <img src="/logo.png" alt="Logo Pilares del Monte" className="w-full h-full object-contain scale-[2.5]" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-2">
              Nuestros Recuerdos
            </h1>
            <p className="italic text-stone-600 max-w-2xl mx-auto">
              El álbum familiar de San Francisco del Monte
            </p>
          </div>
        </section>

        {/* Álbum Fotográfico Lateral */}
        <section className="px-8 max-w-5xl mx-auto">
          {recuerdos.length === 0 ? (
            <p className="text-center text-stone-500 italic mt-10">Aún no hay recuerdos en el álbum.</p>
          ) : (
            <div className="space-y-24">
              {recuerdos.map((recuerdo, index) => {
                // Alternamos la dirección en cada fila: par a la izquierda, impar a la derecha
                const isEven = index % 2 === 0;
                
                return (
                  <div 
                    key={recuerdo.id} 
                    className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${!isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    
                    {/* Columna de la Foto (con el estilo de la Historia) */}
                    <div className="w-full md:w-1/2 flex justify-center">
                      <div className={`bg-white p-3 shadow-lg border border-amber-100 transition-transform duration-500 hover:rotate-0 ${isEven ? 'rotate-2' : '-rotate-2'} max-w-md w-full`}>
                        <div
                          className="h-80 flex flex-col items-center justify-center border-2 border-dashed border-amber-300 relative overflow-hidden bg-stone-100"
                        >
                          {recuerdo.imagen ? (
                            <img 
                              src={recuerdo.imagen} 
                              alt={recuerdo.titulo} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-stone-400 italic text-sm">
                              Sin fotografía
                            </div>
                          )}
                        </div>
                        <p className="text-center text-xs tracking-widest text-stone-500 mt-3 uppercase font-semibold">
                          {recuerdo.fecha || "Archivo Histórico"}
                        </p>
                      </div>
                    </div>

                    {/* Columna de la Descripción */}
                    <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                      <div className="inline-block">
                        <h2 className="font-serif text-3xl text-stone-900 mb-1">{recuerdo.titulo}</h2>
                        <div className={`h-0.5 w-16 bg-amber-600 ${isEven ? 'mx-auto md:ml-0' : 'mx-auto md:ml-auto md:mr-0'}`}></div>
                      </div>
                      
                      <p className="text-stone-700 leading-relaxed whitespace-pre-wrap text-lg">
                        {recuerdo.descripcion}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

const Vinos = () => {
  const [vinos, setVinos] = useState([]);
  const [cepas, setCepas] = useState([]);
  const [filtro, setFiltro] = useState('disponibles');
  
  // NUEVO ESTADO: Controla qué vino está abierto en el popup
  const [vinoSeleccionado, setVinoSeleccionado] = useState(null);
  
  const carruselRef = useRef(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/vinos/')
      .then(respuesta => respuesta.json())
      .then(datos => setVinos(datos))
      .catch(error => console.error("Error al cargar vinos:", error));

    fetch('http://127.0.0.1:8000/api/cepas/')
      .then(respuesta => respuesta.json())
      .then(datos => setCepas(datos))
      .catch(error => console.error("Error al cargar cepas:", error));
  }, []);

  const vinosFiltrados = vinos.filter((vino) => {
    if (filtro === 'disponibles') return vino.stock > 0;
    if (filtro === 'proximamente') return vino.stock === 0 || vino.stock == null;
    return true;
  });

  const moverCarrusel = (direccion) => {
    if (carruselRef.current) {
      const desplazamiento = direccion === 'izq' ? -320 : 320; 
      carruselRef.current.scrollBy({ left: desplazamiento, behavior: 'smooth' });
    }
  };

  const obtenerNombreCepa = (idCepa) => {
    const cepaEncontrada = cepas.find(c => c.id === idCepa);
    return cepaEncontrada ? cepaEncontrada.nombre : "Ensamblaje Especial";
  };

  return (
    <>
      <div className="bg-amber-50 text-stone-900 pb-10 min-h-screen">
        
        {/* Título y Filtros se mantienen igual */}
        <section className="bg-gradient-to-b from-amber-100 via-amber-50 to-amber-50 py-14 px-8 text-center mb-10 border-b border-amber-200">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-amber-600"></span>
            <Wine className="w-6 h-6 text-amber-700" />
            <span className="h-px w-12 bg-amber-600"></span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 mb-2">Nuestro Catálogo</h1>
          <p className="italic text-stone-600 max-w-lg mx-auto">
            Vinos con historia, etiqueta a etiqueta — cada cosecha cuenta un capítulo de San Francisco del Monte.
          </p>
        </section>

        <div className="flex justify-center gap-4 mb-10 px-4">
          <button
            onClick={() => setFiltro('disponibles')}
            className={`px-8 py-2.5 rounded-full font-serif text-sm transition-all duration-300 ${
              filtro === 'disponibles' ? 'bg-red-900 text-amber-50 shadow-md scale-105' : 'bg-white text-stone-600 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            Disponibles
          </button>
          <button
            onClick={() => setFiltro('proximamente')}
            className={`px-8 py-2.5 rounded-full font-serif text-sm transition-all duration-300 ${
              filtro === 'proximamente' ? 'bg-red-900 text-amber-50 shadow-md scale-105' : 'bg-white text-stone-600 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            Próximamente
          </button>
        </div>

        {/* Carrusel de Vinos */}
        <section className="relative px-4 sm:px-12 max-w-7xl mx-auto mb-20 group">
          <button onClick={() => moverCarrusel('izq')} className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur items-center justify-center rounded-full shadow-lg border border-amber-200 text-amber-800 hover:bg-amber-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div ref={carruselRef} className="flex overflow-x-auto gap-8 pb-8 pt-4 snap-x snap-mandatory hide-scrollbar px-2">
            {vinosFiltrados.length === 0 ? (
              <div className="w-full text-center py-12 italic text-stone-500">No hay vinos en esta categoría por el momento.</div>
            ) : (
              vinosFiltrados.map((vino) => (
                <div
                  key={vino.id}
                  /* Al hacer clic en la tarjeta, abrimos el popup */
                  onClick={() => setVinoSeleccionado(vino)}
                  className="flex-none w-72 sm:w-80 snap-center relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden border border-amber-100 flex flex-col cursor-pointer group"
                >
                  <div className="h-64 flex items-center justify-center border-b border-dashed border-amber-200 relative overflow-hidden bg-stone-50">
                    {vino.imagen ? (
                      <img src={vino.imagen} alt={vino.nombre} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-inner bg-red-900 group-hover:scale-105 transition-transform">
                        <Wine className="w-7 h-7 text-amber-50" />
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="h-0.5 w-10 mb-3 bg-red-900" />
                    
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs tracking-widest text-amber-700 font-semibold uppercase">
                        COSECHA {vino.cosecha || vino.anio_cosecha}
                      </span>
                      <span className="text-sm font-bold text-red-900">
                        ${vino.precio?.toLocaleString('es-CL')}
                      </span>
                    </div>
                    
                    <span className="self-start text-xs font-bold text-amber-900 bg-amber-100 px-2 py-1 rounded mb-2">
                      {obtenerNombreCepa(vino.cepa)}
                    </span>

                    <h3 className="font-serif text-lg text-stone-900 mb-2 leading-snug">{vino.nombre}</h3>
                    
                    {/* Tarjeta limpia: Solo mostramos el maridaje, no la descripción larga */}
                    <p className="text-sm text-stone-600 leading-relaxed mb-4 flex-grow italic">
                      {vino.maridaje ? `Maridaje: ${vino.maridaje}` : "Haz clic para ver los detalles y notas de cata."}
                    </p>
                    
                    <div className="flex items-center gap-1 text-sm font-medium text-red-900 transition-all mt-auto pt-4 border-t border-amber-100">
                      Ver detalles <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <button onClick={() => moverCarrusel('der')} className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur items-center justify-center rounded-full shadow-lg border border-amber-200 text-amber-800 hover:bg-amber-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
            <ChevronRight className="w-6 h-6" />
          </button>
        </section>

      </div>
      <Footer />

      {/* VENTANA EMERGENTE (MODAL) DEL VINO */}
      {vinoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm">
          
          {/* Contenedor del Modal */}
          <div className="bg-amber-50 w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-300">
            
            {/* Botón Cerrar */}
            <button 
              onClick={() => setVinoSeleccionado(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-stone-800 shadow-sm transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lado Izquierdo: Imagen en grande */}
            <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 border-r border-amber-100">
              {vinoSeleccionado.imagen ? (
                <img 
                  src={vinoSeleccionado.imagen} 
                  alt={vinoSeleccionado.nombre} 
                  className="w-full max-h-[60vh] object-contain hover:scale-110 transition-transform duration-700 cursor-zoom-in" 
                />
              ) : (
                <Wine className="w-32 h-32 text-amber-200" />
              )}
            </div>

            {/* Lado Derecho: Detalles Completos */}
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center max-h-[80vh] overflow-y-auto custom-scrollbar">
              <span className="text-sm tracking-widest text-amber-700 font-semibold uppercase mb-2">
                COSECHA {vinoSeleccionado.cosecha || vinoSeleccionado.anio_cosecha}
              </span>
              
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-2 leading-tight">
                {vinoSeleccionado.nombre}
              </h2>
              
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm font-bold text-amber-900 bg-amber-200 px-3 py-1 rounded-full">
                  {obtenerNombreCepa(vinoSeleccionado.cepa)}
                </span>
                <span className="text-xl font-bold text-red-900">
                  ${vinoSeleccionado.precio?.toLocaleString('es-CL')}
                </span>
              </div>

              <div className="h-px w-full bg-amber-200 mb-6"></div>

              {/* Aquí va la descripción completa */}
              <div className="mb-6">
                <h3 className="font-serif text-lg text-stone-900 mb-2">Notas de Cata</h3>
                <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                  {vinoSeleccionado.descripcion}
                </p>
              </div>

              {/* Mostrar maridaje si existe en la base de datos */}
              {vinoSeleccionado.maridaje && (
                <div className="mb-8 p-4 bg-amber-100/50 rounded-lg border border-amber-200">
                  <h3 className="font-serif text-md text-stone-900 mb-1 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-700" /> Maridaje Sugerido
                  </h3>
                  <p className="text-sm text-stone-700">{vinoSeleccionado.maridaje}</p>
                </div>
              )}

              {/* Botón de acción */}
              <Link 
                to="/contactanos" 
                className="mt-auto block w-full text-center bg-red-900 text-amber-50 py-3 rounded hover:bg-red-950 transition-colors font-serif text-lg shadow-md"
              >
                {filtro === 'disponibles' ? 'Agendar cata de este vino' : 'Consultar disponibilidad'}
              </Link>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

const Contactanos = () => (
  <>
    <div className="pagina-temporal"><h2>Envíanos un mensaje</h2></div>
    <Footer />
  </>
);

const Footer = () => (
  <footer className="seccion-footer">
    <div className="columna-footer">
      <h3>Ubicación</h3>
      <p>Calle Ejemplo, 123</p>
      <p>Santiago, Chile 12345</p>
    </div>
    <div className="columna-footer">
      <h3>Horario</h3>
      <p>lunes — viernes</p>
      <p>8:00 — 18:00</p>
    </div>
    <div className="columna-footer">
      <h3>Contacta</h3>
      <p>contacto@pilaresdelmonte.cl</p>
      <p>+56 9 1234 5678</p>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="contenedor-principal">
        
        <header className="navbar">
          <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
            Pilares de El Monte
          </Link>
          
          <nav className="enlaces-nav">
            <Link to="/clases">CLASES</Link>
            <Link to="/recuerdos">RECUERDOS</Link>
            <Link to="/vinos">VINOS</Link>
            <Link to="/contactanos">CONTÁCTANOS</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/clases" element={<Clases />} />
          <Route path="/recuerdos" element={<Recuerdos />} />
          <Route path="/vinos" element={<Vinos />} />
          <Route path="/contactanos" element={<Contactanos />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;