CREATE TABLE IF NOT EXISTS postulantes (
  id SERIAL PRIMARY KEY,
  nombre_completo VARCHAR(200),
  puesto_solicita VARCHAR(150),
  pretension_salarial VARCHAR(100),
  profesion VARCHAR(150),
  lugar_nacimiento VARCHAR(150),
  fecha_nacimiento DATE,
  edad_actual INTEGER,
  estatura VARCHAR(20),
  grupo_sanguineo VARCHAR(8),
  direccion_completa VARCHAR(300),
  telefono_contacto VARCHAR(25),
  contacto_emergencia TEXT,
  estado_civil VARCHAR(40),
  vive_con VARCHAR(150),
  dependientes VARCHAR(150),
  dpi VARCHAR(30),
  nit VARCHAR(30),
  igss VARCHAR(30),
  irtra VARCHAR(30),
  licencia_tipo VARCHAR(60),
  documento_trabajo VARCHAR(150),
  medio_transporte TEXT,
  estado VARCHAR(20) DEFAULT 'activo' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS postulantes_salud (
  postulante_id INTEGER PRIMARY KEY REFERENCES postulantes(id) ON DELETE CASCADE ON UPDATE CASCADE,
  estado_salud VARCHAR(50),
  padecio_covid BOOLEAN,
  tiene_vacunacion_covid BOOLEAN,
  numero_dosis_covid INTEGER,
  sufrio_fracturas BOOLEAN,
  sufrio_operacion BOOLEAN,
  enfermedad_cronica BOOLEAN,
  enferma_frecuencia BOOLEAN,
  practica_deportes BOOLEAN,
  pertenece_club BOOLEAN,
  tiene_pasatiempo BOOLEAN,
  meta_vida BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS postulantes_familiares (
  postulante_id INTEGER PRIMARY KEY REFERENCES postulantes(id) ON DELETE CASCADE ON UPDATE CASCADE,
  padre_nombre VARCHAR(150),
  padre_edad INTEGER,
  padre_vive BOOLEAN,
  padre_vive_con_usted BOOLEAN,
  madre_nombre VARCHAR(150),
  madre_edad INTEGER,
  madre_vive BOOLEAN,
  madre_vive_con_usted BOOLEAN,
  conyuge_nombre VARCHAR(150),
  conyuge_edad INTEGER,
  conyuge_vive BOOLEAN,
  conyuge_vive_con_usted BOOLEAN,
  conyuge_ocupacion VARCHAR(150),
  hijos_nombre VARCHAR(150),
  hijos_edad INTEGER,
  hermanos_nombre VARCHAR(150),
  hermanos_edad INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS postulantes_academicos (
  postulante_id INTEGER PRIMARY KEY REFERENCES postulantes(id) ON DELETE CASCADE ON UPDATE CASCADE,
  primaria_establecimiento VARCHAR(200),
  primaria_anios VARCHAR(60),
  basicos_establecimiento VARCHAR(200),
  basicos_anios VARCHAR(60),
  diversificado_establecimiento VARCHAR(200),
  diversificado_carrera VARCHAR(150),
  diversificado_anios VARCHAR(60),
  tecnica_establecimiento VARCHAR(200),
  tecnica_carrera VARCHAR(150),
  tecnica_anios VARCHAR(60),
  universidad_cuenta BOOLEAN,
  universidad_detalle TEXT,
  postgrado_cuenta BOOLEAN,
  postgrado_detalle TEXT,
  idiomas TEXT,
  software TEXT,
  maquinas TEXT,
  otras_funciones TEXT,
  experiencia_laboral BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS postulantes_laborales (
  postulante_id INTEGER PRIMARY KEY REFERENCES postulantes(id) ON DELETE CASCADE ON UPDATE CASCADE,
  empresa_nombre VARCHAR(200),
  empresa_direccion VARCHAR(220),
  empresa_telefono VARCHAR(25),
  puesto_desempenado VARCHAR(150),
  salario_devengado VARCHAR(80),
  fecha_ingreso DATE,
  fecha_salida DATE,
  funciones TEXT,
  jefe_nombre VARCHAR(150),
  jefe_puesto VARCHAR(150),
  motivo_retiro TEXT,
  se_puede_referenciar BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS postulantes_personales (
  postulante_id INTEGER PRIMARY KEY REFERENCES postulantes(id) ON DELETE CASCADE ON UPDATE CASCADE,
  nombre VARCHAR(150),
  telefono VARCHAR(25),
  tiempo_conocerlo VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS postulantes_consumo (
  postulante_id INTEGER PRIMARY KEY REFERENCES postulantes(id) ON DELETE CASCADE ON UPDATE CASCADE,
  tiene_tatuajes TEXT,
  bebe BOOLEAN,
  bebe_frecuencia VARCHAR(150),
  fuma BOOLEAN,
  fuma_frecuencia VARCHAR(150),
  puede_viajar BOOLEAN,
  cambiar_residencia BOOLEAN,
  afiliado_sindicato BOOLEAN,
  consumio_drogas BOOLEAN,
  tiene_antecedentes BOOLEAN,
  fecha_disponibilidad DATE,
  religion VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS postulantes_economicos (
  postulante_id INTEGER PRIMARY KEY REFERENCES postulantes(id) ON DELETE CASCADE ON UPDATE CASCADE,
  otros_ingresos BOOLEAN,
  descripcion_ingresos TEXT,
  conyuge_trabaja BOOLEAN,
  casa_propia BOOLEAN,
  paga_renta BOOLEAN,
  tiene_deudas BOOLEAN,
  deuda_cobro_judicial BOOLEAN,
  abono_mensual VARCHAR(80),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS vacancies_postulantes (
  id SERIAL PRIMARY KEY,
  vacancy_id INTEGER NOT NULL REFERENCES vacancies(id) ON DELETE CASCADE ON UPDATE CASCADE,
  postulante_id INTEGER NOT NULL REFERENCES postulantes(id) ON DELETE CASCADE ON UPDATE CASCADE,
  estado VARCHAR(20) DEFAULT 'asignado' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT vacancy_postulante_unique UNIQUE (vacancy_id, postulante_id)
);

