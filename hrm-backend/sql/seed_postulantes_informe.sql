DO 
DECLARE
  v_vacancy_id INTEGER := 1;
BEGIN
  -- Postulante 1
  INSERT INTO postulantes (nombre_completo, puesto_solicita, profesion, telefono_contacto, estado, created_at, updated_at)
  SELECT 'Ana Lopez', 'Analista de datos', 'Ingeniera en Sistemas', '555-0101', 'generar_informe', NOW(), NOW()
  WHERE NOT EXISTS (SELECT 1 FROM postulantes WHERE nombre_completo = 'Ana Lopez');

  INSERT INTO vacancies_postulantes (vacancy_id, postulante_id, estado, created_at, updated_at)
  SELECT v_vacancy_id, p.id, 'generar_informe', NOW(), NOW()
  FROM postulantes p
  WHERE p.nombre_completo = 'Ana Lopez'
    AND NOT EXISTS (
      SELECT 1 FROM vacancies_postulantes vp
      WHERE vp.vacancy_id = v_vacancy_id AND vp.postulante_id = p.id
    );

  -- Postulante 2
  INSERT INTO postulantes (nombre_completo, puesto_solicita, profesion, telefono_contacto, estado, created_at, updated_at)
  SELECT 'Carlos Gomez', 'Desarrollador', 'Ingeniero en Software', '555-0102', 'generar_informe', NOW(), NOW()
  WHERE NOT EXISTS (SELECT 1 FROM postulantes WHERE nombre_completo = 'Carlos Gomez');

  INSERT INTO vacancies_postulantes (vacancy_id, postulante_id, estado, created_at, updated_at)
  SELECT v_vacancy_id, p.id, 'generar_informe', NOW(), NOW()
  FROM postulantes p
  WHERE p.nombre_completo = 'Carlos Gomez'
    AND NOT EXISTS (
      SELECT 1 FROM vacancies_postulantes vp
      WHERE vp.vacancy_id = v_vacancy_id AND vp.postulante_id = p.id
    );

  -- Postulante 3
  INSERT INTO postulantes (nombre_completo, puesto_solicita, profesion, telefono_contacto, estado, created_at, updated_at)
  SELECT 'Luis Hernandez', 'Disenador UX', 'Disenador Industrial', '555-0103', 'seleccionado', NOW(), NOW()
  WHERE NOT EXISTS (SELECT 1 FROM postulantes WHERE nombre_completo = 'Luis Hernandez');

  INSERT INTO vacancies_postulantes (vacancy_id, postulante_id, estado, created_at, updated_at)
  SELECT v_vacancy_id, p.id, 'seleccionado', NOW(), NOW()
  FROM postulantes p
  WHERE p.nombre_completo = 'Luis Hernandez'
    AND NOT EXISTS (
      SELECT 1 FROM vacancies_postulantes vp
      WHERE vp.vacancy_id = v_vacancy_id AND vp.postulante_id = p.id
    );
END ;
