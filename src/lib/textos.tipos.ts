// Archivo generado por scripts/generar-tipos-textos.mjs a partir de GET /textos. No editar a mano.
// Solo describe las claves de los textos para TypeScript: no contiene ningún texto de la interfaz.

export type Textos = {
  sitio: {
    nombre: string;
    lema: string;
  };
  navbar: {
    logo: {
      texto: string;
      aria: string;
    };
    enlaces: {
      inicio: string;
      explorar: string;
    };
    buscador: {
      placeholder: string;
      aria: string;
    };
    botones: {
      ingresar: string;
      crearCuenta: string;
    };
    usuario: {
      menu: string;
      panel: string;
      cerrarSesion: string;
    };
    aria: {
      idioma: string;
      accesibilidad: string;
    };
  };
  menuMovil: {
    abrir: string;
    cerrar: string;
    enlaces: {
      inicio: string;
      explorar: string;
    };
    botones: {
      ingresar: string;
      crearCuenta: string;
      cerrarSesion: string;
    };
    secciones: {
      idioma: string;
      accesibilidad: string;
    };
  };
  footer: {
    lema: string;
    columnas: {
      explora: {
        titulo: string;
        enlaces: {
          inicio: string;
          explorar: string;
        };
      };
      cuenta: {
        titulo: string;
        enlaces: {
          ingresar: string;
          crearCuenta: string;
        };
      };
      legal: {
        titulo: string;
        enlaces: {
          terminos: string;
          accesibilidad: string;
        };
      };
    };
    legal: {
      derechos: string;
      nota: string;
    };
  };
  panel: {
    titulo: string;
    enlaces: {
      tablero: string;
      eventos: string;
      ventas: string;
      asistentes: string;
      checkIn: string;
      ajustes: string;
    };
    botones: {
      crearEvento: string;
    };
  };
  paginas: {
    inicio: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      hero: {
        etiquetas: {
          temporada: string;
        };
        titulo: string;
        subtitulo: string;
        buscador: {
          etiquetas: {
            que: string;
            donde: string;
            cuando: string;
          };
          placeholders: {
            que: string;
            cuando: string;
            movil: string;
          };
          resumenMovil: string;
          populares: string;
          botones: {
            buscar: string;
          };
        };
        destacado: {
          etiqueta: string;
          desde: string;
          botones: {
            verEvento: string;
          };
        };
      };
      categorias: {
        eventos: {
          uno: string;
          otro: string;
        };
      };
      filtrosMovil: {
        todos: string;
        destacados: string;
        finDeSemana: string;
      };
      destacados: {
        titulo: string;
        subtitulo: string;
        enlaces: {
          verTodos: string;
        };
      };
      proximos: {
        titulo: string;
        subtitulo: string;
      };
      tarjeta: {
        desde: string;
        botones: {
          verEvento: string;
        };
      };
    };
    explorar: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      resultados: {
        uno: string;
        otro: string;
      };
      resultadosCorto: {
        uno: string;
        otro: string;
      };
      filtros: {
        titulo: string;
        categoria: string;
        fecha: {
          titulo: string;
          hoy: string;
          finDeSemana: string;
          mes: string;
          elegir: string;
        };
        ciudad: string;
        precio: string;
        botones: {
          limpiar: string;
          verResultados: string;
        };
      };
      orden: {
        etiqueta: string;
        opciones: {
          fecha: string;
          precio: string;
          popularidad: string;
        };
      };
      paginacion: {
        anterior: string;
        siguiente: string;
      };
      vacio: {
        titulo: string;
        texto: string;
        botones: {
          limpiar: string;
        };
      };
    };
    conciertos: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      hero: {
        antetitulo: string;
        titulo: string;
        subtitulo: string;
      };
      filtros: {
        etiquetas: {
          todos: string;
          salsa: string;
          rock: string;
          urbano: string;
          jazz: string;
          electronica: string;
          sinfonica: string;
          tropical: string;
        };
      };
      semana: {
        titulo: string;
        rango: string;
        etiquetas: {
          hoy: string;
        };
        mensajes: {
          sinConciertos: string;
        };
      };
      cartel: {
        titulo: string;
        subtitulo: string;
        enlaces: {
          verTodos: string;
        };
      };
      masVendidos: {
        titulo: string;
        subtitulo: string;
      };
    };
    teatro: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      hero: {
        antetitulo: string;
        titulo: string;
        subtitulo: string;
      };
      filtros: {
        etiquetas: {
          todas: string;
          drama: string;
          comedia: string;
          musical: string;
          infantil: string;
          danza: string;
          monologo: string;
          estaSemana: string;
        };
      };
      cartelera: {
        titulo: string;
        subtitulo: string;
        etiquetas: {
          funcionesHoy: string;
        };
        botones: {
          verFunciones: string;
        };
        enlaces: {
          verTodas: string;
        };
      };
      destacada: {
        antetitulo: string;
        titulo: string;
        direccion: string;
        estructura: string;
        elenco: string;
        etiquetas: {
          proximasFunciones: string;
        };
        botones: {
          elegirButacas: string;
        };
        enlaces: {
          verFicha: string;
        };
      };
      salas: {
        titulo: string;
        subtitulo: string;
        aforo: string;
        obras: {
          uno: string;
          otro: string;
        };
      };
    };
    deportes: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      hero: {
        antetitulo: string;
        titulo: string;
        subtitulo: string;
        etiquetas: {
          local: string;
          visitante: string;
        };
        posicionEnTabla: string;
        cuentaRegresiva: {
          dias: string;
          horas: string;
          minutos: string;
          segundos: string;
        };
        mensajes: {
          quedanEntradas: string;
        };
        botones: {
          elegirTribuna: string;
        };
      };
      filtros: {
        etiquetas: {
          todos: string;
          futbol: string;
          baloncesto: string;
          voleibol: string;
          ciclismo: string;
          atletismo: string;
          proximos30Dias: string;
        };
      };
      calendario: {
        titulo: string;
        subtitulo: string;
        vs: string;
      };
      tribunas: {
        titulo: string;
        etiquetas: {
          disponibleConPrecio: string;
          pocasConPrecio: string;
          tuSeleccion: string;
        };
        tribuna: string;
        detalle: string;
        botones: {
          continuarCon: string;
        };
      };
      tabla: {
        titulo: string;
        etiquetas: {
          posicion: string;
          equipo: string;
          jugados: string;
          diferencia: string;
          puntos: string;
        };
        mensajes: {
          resaltados: string;
        };
      };
      abonos: {
        titulo: string;
        subtitulo: string;
        botones: {
          verAbono: string;
        };
      };
    };
    detalleEvento: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      etiquetas: {
        edadMinima: string;
        todoPublico: string;
      };
      info: {
        fecha: string;
        hora: string;
        horaValor: string;
        lugar: string;
        desde: string;
      };
      pestanas: {
        descripcion: string;
        comoLlegar: string;
        politicas: string;
      };
      descripcion: {
        titulo: string;
        botones: {
          leerMas: string;
        };
      };
      mapa: {
        titulo: string;
      };
      relacionados: {
        titulo: string;
      };
      noEncontrado: {
        titulo: string;
        texto: string;
        botones: {
          volver: string;
        };
      };
    };
    seleccionAsientos: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      encabezado: {
        titulo: string;
      };
      mapa: {
        zoom: string;
        etiquetas: {
          escenario: string;
        };
        botones: {
          mejorDisponible: string;
        };
        mensajes: {
          ayudaMovil: string;
        };
      };
      leyenda: {
        etiquetas: {
          seleccion: string;
          ocupado: string;
          retenido: string;
          disponible: string;
        };
      };
      resumen: {
        localidadYPrecio: string;
        conteoAsientos: {
          uno: string;
          otro: string;
        };
        localidadYFila: string;
        asiento: string;
        resumenMovil: {
          uno: string;
          otro: string;
        };
        botones: {
          continuarAlPago: string;
          continuar: string;
        };
        mensajes: {
          maximoEntradas: string;
          avisoTiempo: string;
          sinSeleccion: string;
          cantidadGeneral: string;
          conflicto: string;
        };
      };
    };
    datosPago: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      encabezado: {
        titulo: string;
        enlaces: {
          volverAsientos: string;
        };
      };
      comprador: {
        titulo: string;
        texto: string;
      };
      asistentes: {
        titulo: string;
        texto: string;
        textoMovil: string;
        etiquetas: {
          usarMisDatos: string;
        };
        entradaConAsiento: string;
        entradaConAsientoMovil: string;
        entradaGeneral: string;
      };
      pago: {
        titulo: string;
        metodos: {
          tarjeta: {
            nombre: string;
            detalle: string;
          };
          pse: {
            nombre: string;
            detalle: string;
          };
          billetera: {
            nombre: string;
            detalle: string;
          };
        };
        mensajes: {
          modoPrueba: string;
          modoPruebaMovil: string;
          soloTarjeta: string;
        };
      };
      confirmar: {
        etiquetas: {
          terminos: string;
        };
        botones: {
          pagar: string;
          pagarTotal: string;
        };
        mensajes: {
          procesando: string;
          conexionSegura: string;
        };
      };
      resumen: {
        titulo: string;
        entradasMovil: string;
        etiquetas: {
          codigoPromocional: string;
        };
        placeholder: string;
        botones: {
          aplicar: string;
        };
      };
      reservaExpirada: {
        titulo: string;
        texto: string;
        textoMovil: string;
        y: string;
        botones: {
          volverAElegir: string;
          verOtros: string;
        };
      };
    };
    confirmacion: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      encabezado: {
        titulo: string;
        enviamos: {
          uno: string;
          otro: string;
        };
      };
      entrada: {
        entradaDeTotal: string;
        etiquetas: {
          fecha: string;
          hora: string;
          lugar: string;
          zona: string;
          fila: string;
          asiento: string;
          asientos: string;
          asistente: string;
        };
        rangoAsientos: string;
        mensajes: {
          muestraCodigo: string;
        };
        botones: {
          descargarPdf: string;
          agregarCalendario: string;
          agregarCalendarioMovil: string;
          transferirEntrada: string;
          verMisEntradas: string;
        };
      };
      resumen: {
        titulo: string;
        etiquetas: {
          pedido: string;
          entradas: string;
          metodoPago: string;
          totalPagado: string;
        };
        entradasDetalle: string;
        tarjetaTerminada: string;
      };
      antesDelEvento: {
        titulo: string;
        mensajes: {
          llegada: string;
          documento: string;
          mayoresDe: string;
          transferencia: string;
        };
      };
    };
    misEntradas: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      encabezado: {
        titulo: string;
        saludo: {
          uno: string;
          otro: string;
        };
        saludoVacio: string;
      };
      pestanas: {
        etiquetas: {
          proximas: string;
          pasadas: string;
          transferidas: string;
        };
      };
      aviso: {
        texto: string;
        textoMovil: string;
      };
      lista: {
        pedido: string;
        detalleEntradas: {
          uno: string;
          otro: string;
        };
        detalleAsientos: string;
        reservaExpiraEn: string;
        botones: {
          verEntradas: string;
          descargarPdf: string;
          transferir: string;
          completarPago: string;
          cancelarReserva: string;
          cancelar: string;
        };
      };
      vacio: {
        titulo: string;
        texto: string;
        botones: {
          explorar: string;
        };
      };
    };
    entrada: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      tarjeta: {
        entradaDeTotal: string;
        etiquetas: {
          zona: string;
          fila: string;
          asiento: string;
          general: string;
          disponibleSinConexion: string;
        };
        mensajes: {
          consejoBrillo: string;
          usadaEl: string;
        };
        botones: {
          descargar: string;
          transferir: string;
        };
        aria: {
          codigoQr: string;
        };
      };
    };
    ingresar: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      presentacion: {
        lema: string;
        beneficios: {
          descubre: string;
          filtra: string;
          consulta: string;
        };
      };
      formulario: {
        titulo: string;
        subtitulo: string;
        etiquetas: {
          correo: string;
          clave: string;
          mantenerSesion: string;
        };
        placeholders: {
          correo: string;
        };
        enlaces: {
          olvidasteClave: string;
          crearCuenta: string;
        };
        mensajes: {
          sinCuenta: string;
          ingresando: string;
        };
        botones: {
          ingresar: string;
          mostrarClave: string;
          ocultarClave: string;
        };
      };
      errores: {
        camposObligatorios: {
          titulo: string;
          texto: string;
        };
        correoObligatorio: string;
        claveObligatoria: string;
        credenciales: {
          titulo: string;
          texto: string;
        };
        demasiadosIntentos: {
          titulo: string;
          texto: string;
        };
        conexion: {
          titulo: string;
          texto: string;
          botones: {
            reintentar: string;
          };
        };
      };
    };
    registro: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      presentacion: {
        lema: string;
        beneficios: {
          unaCuenta: string;
          dispositivos: string;
          recupera: string;
        };
      };
      formulario: {
        titulo: string;
        subtitulo: string;
        etiquetas: {
          nombre: string;
          correo: string;
          clave: string;
          confirmacion: string;
          terminos: string;
        };
        placeholders: {
          nombre: string;
          correo: string;
        };
        requisitosClave: {
          longitud: string;
          mayuscula: string;
          numero: string;
        };
        mensajes: {
          yaTienesCuenta: string;
          creando: string;
        };
        enlaces: {
          ingresar: string;
          terminos: string;
        };
        botones: {
          crearCuenta: string;
        };
      };
      errores: {
        resumen: string;
        nombre: string;
        correo: string;
        clave: string;
        confirmacion: string;
        terminos: string;
        correoEnUso: {
          titulo: string;
          texto: string;
          campo: string;
          botones: {
            ingresar: string;
            restablecer: string;
          };
        };
      };
      terminos: {
        titulo: string;
        puntos: {
          proyecto: string;
          cuenta: string;
          datos: string;
          eliminar: string;
          aceptacion: string;
        };
        botones: {
          cerrar: string;
          aceptar: string;
        };
      };
    };
    recuperarClave: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      solicitud: {
        enlaces: {
          volver: string;
        };
        titulo: string;
        texto: string;
        etiquetas: {
          correo: string;
        };
        mensajes: {
          enviando: string;
        };
        botones: {
          enviar: string;
        };
      };
      enviado: {
        titulo: string;
        texto: string;
        aviso: {
          titulo: string;
          texto: string;
        };
        mensajes: {
          yaLoRecibiste: string;
        };
        enlaces: {
          continuar: string;
        };
        botones: {
          reenviar: string;
        };
      };
      nuevaClave: {
        titulo: string;
        texto: string;
        etiquetas: {
          codigo: string;
          clave: string;
          confirmacion: string;
        };
        mensajes: {
          guardando: string;
        };
        botones: {
          guardar: string;
        };
      };
      actualizada: {
        titulo: string;
        texto: string;
        botones: {
          ingresar: string;
        };
      };
    };
    verificarCorreo: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      revisa: {
        titulo: string;
        texto: string;
        aviso: {
          titulo: string;
          texto: string;
        };
        instruccion: string;
        etiquetas: {
          codigo: string;
        };
        mensajes: {
          noLoEncuentras: string;
          correoEquivocado: string;
          verificando: string;
        };
        enlaces: {
          volverACrear: string;
        };
        botones: {
          verificar: string;
          reenviar: string;
        };
      };
      reenviado: {
        titulo: string;
        texto: string;
        botones: {
          reenviarEn: string;
        };
      };
      verificado: {
        titulo: string;
        texto: string;
        botones: {
          ingresar: string;
        };
      };
    };
    panelTablero: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      encabezado: {
        titulo: string;
        subtitulo: string;
        periodo: string;
        botones: {
          crearEvento: string;
        };
      };
      indicadores: {
        etiquetas: {
          ingresos: string;
          entradasVendidas: string;
          ocupacionPromedio: string;
          ocupacion: string;
          conversion: string;
          conversionCorta: string;
        };
        frenteAnterior: string;
        puntos: string;
        mensajes: {
          sinComparacion: string;
        };
      };
      ventasPorDia: {
        titulo: string;
        subtitulo: string;
        subtituloMovil: string;
        etiquetas: {
          entradas: string;
          mejorDia: string;
        };
      };
      ventasPorLocalidad: {
        titulo: string;
        etiquetas: {
          totalVendido: string;
          ingresosEvento: string;
        };
      };
      proximosEventos: {
        titulo: string;
        etiquetas: {
          evento: string;
          fecha: string;
          ocupacion: string;
          estado: string;
        };
      };
      actividad: {
        titulo: string;
        compra: {
          uno: string;
          otro: string;
        };
        mensajes: {
          vacia: string;
        };
      };
    };
    panelEventos: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      encabezado: {
        titulo: string;
        subtitulo: string;
        botones: {
          crearEvento: string;
        };
      };
      filtros: {
        placeholder: string;
        etiquetas: {
          todos: string;
          publicados: string;
          borradores: string;
          finalizados: string;
        };
        orden: string;
      };
      tabla: {
        etiquetas: {
          evento: string;
          fecha: string;
          vendidas: string;
          ingresos: string;
          estado: string;
          acciones: string;
        };
        botones: {
          editar: string;
          publicar: string;
          verVentas: string;
          verAsistentes: string;
          eliminarBorrador: string;
        };
        mensajes: {
          confirmarEliminar: string;
          mostrando: string;
        };
      };
      vacio: {
        texto: string;
      };
    };
    panelNuevoEvento: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      encabezado: {
        titulo: string;
        estadoBorrador: string;
        botones: {
          guardarBorrador: string;
          guardar: string;
        };
      };
      pasos: {
        etiquetas: {
          informacion: string;
          localidades: string;
          mapa: string;
          revision: string;
        };
        pasoDeTotal: string;
      };
      localidades: {
        texto: string;
        botones: {
          agregarLocalidad: string;
          agregarFuncion: string;
        };
      };
      reglasVenta: {
        titulo: string;
        etiquetas: {
          inicioVenta: string;
          cierreVenta: string;
          maximoPorCompra: string;
          cargoServicio: string;
          permitirTransferir: string;
        };
        mensajes: {
          ayudaTransferir: string;
        };
      };
      vistaPrevia: {
        titulo: string;
        localidadYCupo: string;
        asientos: string;
        etiquetas: {
          capacidadTotal: string;
          ingresoPotencial: string;
        };
      };
      antesDePublicar: {
        titulo: string;
        etiquetas: {
          informacionBasica: string;
          afiche: string;
          localidades: string;
          fechaYLugar: string;
        };
      };
      navegacion: {
        botones: {
          anterior: string;
          siguiente: string;
          siguienteMapa: string;
          publicar: string;
        };
      };
      avisos: {
        mensajes: {
          publicado: string;
          guardado: string;
          slugSugerido: string;
          soloGeneral: string;
        };
      };
    };
    panelVentas: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      encabezado: {
        titulo: string;
      };
      indicadores: {
        etiquetas: {
          aforo: string;
          vendidas: string;
          disponibles: string;
          ocupacion: string;
          ingresos: string;
          pedidos: string;
          entradasUsadas: string;
        };
      };
      desglose: {
        etiquetas: {
          porLocalidad: string;
          porFuncion: string;
          porDia: string;
        };
      };
    };
    panelAsistentes: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      encabezado: {
        titulo: string;
      };
      filtros: {
        placeholder: string;
        etiquetas: {
          todos: string;
          validas: string;
          usadas: string;
        };
      };
      tabla: {
        etiquetas: {
          nombre: string;
          documento: string;
          codigo: string;
          localidad: string;
          asiento: string;
          estado: string;
        };
      };
      vacio: {
        texto: string;
      };
    };
    checkIn: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      navegacion: {
        enlaces: {
          checkIn: string;
          misEventos: string;
        };
      };
      encabezado: {
        titulo: string;
        eventoYPuerta: string;
        contador: string;
      };
      eventos: {
        titulo: string;
        mensajes: {
          sinEventos: string;
        };
      };
      escaner: {
        texto: string;
        etiquetas: {
          codigoDeEntrada: string;
        };
        placeholder: string;
        botones: {
          escribirCodigo: string;
          validar: string;
        };
        mensajes: {
          permisoCamara: string;
        };
      };
      valida: {
        titulo: string;
        registrado: string;
        botones: {
          siguiente: string;
        };
      };
      yaUsada: {
        titulo: string;
        detalle: string;
        detalleSinPuerta: string;
      };
      otroEvento: {
        titulo: string;
        detalle: string;
      };
      noExiste: {
        titulo: string;
        detalle: string;
      };
      resultado: {
        ubicacion: string;
        botones: {
          reportar: string;
          escanearOtra: string;
          reintentar: string;
        };
      };
      sinConexion: {
        titulo: string;
        etiquetas: {
          guardada: string;
        };
        pendiente: string;
        cola: {
          uno: string;
          otro: string;
        };
        mensajes: {
          sincronizando: string;
          sincronizado: string;
        };
      };
    };
    noEncontrado: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      contenido: {
        titulo: string;
        texto: string;
        botones: {
          volverInicio: string;
        };
      };
    };
    accesoDenegado: {
      seo: {
        titulo: string;
        descripcion: string;
      };
      contenido: {
        titulo: string;
        texto: string;
        botones: {
          volverInicio: string;
        };
      };
    };
  };
  componentes: {
    etiquetas: {
      estadoEvento: {
        publicado: string;
        borrador: string;
        finalizado: string;
        agotado: string;
        ventaLenta: string;
        sinVentas: string;
      };
      estadoAsiento: {
        disponible: string;
        ocupado: string;
        retenido: string;
        seleccionado: string;
      };
      estadoEntrada: {
        valida: string;
        usada: string;
      };
      estadoPedido: {
        confirmada: string;
        pagoPendiente: string;
      };
      disponibilidad: {
        disponible: string;
        quedan: string;
        ultimas: string;
        ultimasEntradas: string;
        ultimasEntradasEn: string;
        pocasEntradas: string;
        agotada: string;
        porcentajeVendido: string;
      };
      edad: {
        todoPublico: string;
        mayoresDe: string;
      };
      roles: {
        comprador: string;
        organizador: string;
        ingreso: string;
      };
      destacado: string;
      hoy: string;
    };
    precio: {
      desde: string;
      desdePrecio: string;
      precioDesde: string;
      porEntrada: string;
    };
    resumenPedido: {
      subtotal: string;
      cargoServicio: string;
      total: string;
    };
    pasosCompra: {
      pasos: {
        asientos: string;
        datosPago: string;
        confirmacion: string;
      };
      pasoDeTotal: string;
      reservaExpiraEn: string;
      reservaExpiro: string;
      compraCompletada: string;
      aria: {
        tiempoRestante: string;
      };
    };
    migas: {
      inicio: string;
      explorar: string;
      eventos: string;
      nuevoEvento: string;
    };
    paginacion: {
      aria: {
        etiqueta: string;
        irAPagina: string;
        paginaActual: string;
        siguiente: string;
        anterior: string;
      };
    };
    mapaAsientos: {
      aria: {
        acercar: string;
        alejar: string;
        asiento: string;
        quitarAsiento: string;
      };
    };
    selectorCantidad: {
      aria: {
        aumentar: string;
        disminuir: string;
      };
    };
  };
  formularios: {
    campos: {
      nombre: {
        label: string;
        placeholder: string;
      };
      apellido: {
        label: string;
        placeholder: string;
      };
      nombreCompleto: {
        label: string;
        placeholder: string;
      };
      correo: {
        label: string;
        placeholder: string;
      };
      clave: {
        label: string;
        placeholder: string;
      };
      celular: {
        label: string;
        placeholder: string;
      };
      numeroTarjeta: {
        label: string;
        placeholder: string;
      };
      vencimiento: {
        label: string;
        placeholder: string;
      };
      cvc: {
        label: string;
        labelCorto: string;
        placeholder: string;
      };
      titular: {
        label: string;
        placeholder: string;
      };
      tipoDocumento: {
        label: string;
        opciones: {
          cedula: string;
          cedulaExtranjeria: string;
          pasaporte: string;
          tarjetaIdentidad: string;
        };
      };
      documento: {
        label: string;
        ayuda: string;
      };
    };
    camposEvento: {
      titulo: {
        label: string;
      };
      categoria: {
        label: string;
      };
      descripcion: {
        label: string;
      };
      afiche: {
        label: string;
      };
      color1: {
        label: string;
      };
      color2: {
        label: string;
      };
      patron: {
        label: string;
      };
      duracion: {
        label: string;
      };
      edadMinima: {
        label: string;
      };
      slug: {
        label: string;
      };
      lugar: {
        label: string;
      };
      direccion: {
        label: string;
      };
      ciudad: {
        label: string;
      };
      capacidad: {
        label: string;
      };
      funcion: {
        label: string;
      };
    };
    camposLocalidad: {
      nombre: {
        label: string;
      };
      filas: {
        label: string;
        rango: string;
      };
      asientosPorFila: {
        label: string;
      };
      precio: {
        label: string;
      };
      cupo: {
        label: string;
      };
    };
    validacion: {
      requerido: string;
      revisaCampo: string;
      revisaDatos: string;
      correoInvalido: string;
      nombreLongitud: string;
      claveCorta: string;
      celularDigitos: string;
      documentoFormato: string;
      tarjetaInvalida: string;
      vencimientoFormato: string;
      tarjetaVencida: string;
      cvcFormato: string;
      terminos: string;
      maximoEntradas: string;
      correoEnUso: string;
      numeroEntero: string;
      fechaFutura: string;
      localidadRepetida: string;
      cupoSuperaCapacidad: string;
    };
    aria: {
      mostrarClave: string;
      ocultarClave: string;
    };
  };
  estados: {
    cargando: {
      titulo: string;
      texto: string;
      indicador: string;
    };
    vacio: {
      titulo: string;
      texto: string;
    };
    error: {
      titulo: string;
      texto: string;
      botones: {
        reintentar: string;
      };
    };
    sinConexion: {
      titulo: string;
      texto: string;
    };
    sinSesion: {
      titulo: string;
      texto: string;
      botones: {
        ingresar: string;
      };
    };
    sesionVencida: {
      titulo: string;
      texto: string;
      botones: {
        ingresar: string;
      };
    };
    guardando: string;
    guardado: string;
    actualizando: string;
  };
  errores: {
    generico: string;
    peticion_invalida: string;
    no_autenticado: string;
    credenciales_invalidas: string;
    sin_permiso: string;
    rol_no_permitido: string;
    evento_ajeno: string;
    clave_docente_requerida: string;
    no_encontrado: string;
    ruta_no_encontrada: string;
    entrada_no_existe: string;
    asiento_no_disponible: string;
    cupo_insuficiente: string;
    evento_no_disponible: string;
    evento_sin_mapa: string;
    sin_asientos_libres: string;
    reserva_ya_pagada: string;
    correo_en_uso: string;
    entrada_ya_usada: string;
    entrada_de_otro_evento: string;
    slug_en_uso: string;
    evento_no_editable: string;
    evento_ya_publicado: string;
    evento_no_es_borrador: string;
    reserva_expirada: string;
    validacion: string;
    demasiadas_peticiones: string;
    pago_rechazado: string;
    pasarela_no_disponible: string;
    error_interno: string;
    falla_simulada: string;
    idioma_no_soportado: string;
    seccion_no_encontrada: string;
    codigo_incorrecto: string;
    codigo_vencido: string;
    correo_ya_verificado: string;
    cuenta_de_prueba: string;
  };
  cookies: {
    banner: {
      titulo: string;
      texto: string;
      botones: {
        rechazar: string;
        aceptar: string;
      };
    };
    preferencias: {
      titulo: string;
      texto: string;
      categorias: {
        necesarias: {
          nombre: string;
          descripcion: string;
          cookies: string;
        };
        preferencias: {
          nombre: string;
          descripcion: string;
          cookies: string;
        };
        analiticas: {
          nombre: string;
          descripcion: string;
          cookies: string;
        };
        marketing: {
          nombre: string;
          descripcion: string;
          cookies: string;
        };
      };
      etiquetas: {
        siempreActivas: string;
      };
      botones: {
        guardarSeleccion: string;
        rechazarOpcionales: string;
        aceptarTodas: string;
      };
      mensajes: {
        guardada: string;
      };
    };
  };
  accesibilidad: {
    titulo: string;
    tamanoTexto: string;
    muestraTamano: string;
    altoContraste: {
      nombre: string;
      descripcion: string;
    };
    reducirMovimiento: {
      nombre: string;
      descripcion: string;
    };
    subrayarEnlaces: {
      nombre: string;
      descripcion: string;
    };
    espaciadoLectura: {
      nombre: string;
      descripcion: string;
    };
    nota: string;
    enlaces: {
      declaracion: string;
    };
    botones: {
      restablecer: string;
    };
    aria: {
      aumentarTexto: string;
      disminuirTexto: string;
    };
  };
  idioma: {
    titulo: string;
    tituloMovil: string;
    es: string;
    en: string;
    codigoEs: string;
    codigoEn: string;
    nota: string;
    cambiado: string;
  };
  general: {
    acciones: {
      guardar: string;
      cancelar: string;
      cerrar: string;
      volver: string;
      reintentar: string;
      verMas: string;
      verTodos: string;
      leerMas: string;
      buscar: string;
      siguiente: string;
      anterior: string;
      aceptar: string;
      rechazar: string;
      continuar: string;
      aplicar: string;
      limpiar: string;
      compartir: string;
      descargar: string;
      descargarPdf: string;
      transferir: string;
      comprar: string;
      comprarEntradas: string;
      eliminar: string;
      editar: string;
      reportar: string;
      restablecer: string;
      copiar: string;
    };
    categorias: {
      conciertos: string;
      teatro: string;
      deportes: string;
      festivales: string;
      comedia: string;
      familiares: string;
      todas: string;
      singular: {
        conciertos: string;
        teatro: string;
        deportes: string;
        festivales: string;
        comedia: string;
        familiares: string;
      };
    };
    formatos: {
      fechaYHora: string;
      fechaYLugar: string;
      lugarYCiudad: string;
      deTotal: string;
      deTotalPorcentaje: string;
      haceMinutos: {
        uno: string;
        otro: string;
      };
      haceHoras: {
        uno: string;
        otro: string;
      };
      haceDias: {
        uno: string;
        otro: string;
      };
      entradas: {
        uno: string;
        otro: string;
      };
      eventos: {
        uno: string;
        otro: string;
      };
      asientos: {
        uno: string;
        otro: string;
      };
      minutos: string;
      duracion: string;
    };
    palabras: {
      hoy: string;
      si: string;
      no: string;
      o: string;
    };
    aria: {
      saltarAlContenido: string;
      cerrarDialogo: string;
      volver: string;
      masAcciones: string;
    };
  };
};
