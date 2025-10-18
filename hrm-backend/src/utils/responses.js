export const ok = (res, data, message = 'OK') => res.json({ message, data });
export const created = (res, data, message = 'Creado') => res.status(201).json({ message, data });
