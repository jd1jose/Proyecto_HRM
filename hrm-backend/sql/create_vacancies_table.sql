CREATE TABLE IF NOT EXISTS vacancies (
  id SERIAL PRIMARY KEY,
  puesto VARCHAR(200) NOT NULL,
  descripcion TEXT NOT NULL,
  contacto VARCHAR(150) NOT NULL,
  categoria VARCHAR(120) NOT NULL,
  tipo_contrato VARCHAR(60) NOT NULL,
  experiencia VARCHAR(60) NOT NULL,
  educacion VARCHAR(60) NOT NULL,
  departamento VARCHAR(120) NOT NULL,
  ciudad VARCHAR(120) NOT NULL,
  cantidad_vacantes INTEGER NOT NULL DEFAULT 1 CHECK (cantidad_vacantes > 0),
  salario NUMERIC(12,2) NOT NULL CHECK (salario >= 0),
  tipo_pago VARCHAR(60) NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'abierta' CHECK (estado IN ('abierta','cerrada','en_proceso','confirmar_postulantes','informe_riesgo')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

