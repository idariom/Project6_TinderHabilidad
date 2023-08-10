# tinder-habilidades
proyecto dev de tinder habilidades backend express postgres

tablas postgreSQL
CREATE TABLE IF NOT EXISTS public.Usuarios(
	id SERIAL PRIMARY KEY,
	nombre varchar(100),
	apellidos varchar(100), 
	email varchar(100),
	password varchar(100),
	telefonos varchar(20), 
	tipo varchar(20),
	dni varchar(20)
);
CREATE TABLE IF NOT EXISTS public.Habilidad(
	id SERIAL primary key,
	nombre_habilidad varchar(100),
	descripcion TEXT,
	tarifa_hora NUMERIC(10,2) 
);
CREATE TABLE IF NOT EXISTS public.Habilidad_Usuario(
	id SERIAL primary key,
	id_usuario integer references Usuarios(id),
	id_habilidad integer references Habilidad(id)
);
CREATE TABLE IF NOT EXISTS public.Comerciales(
	id SERIAL primary key,
	id_cliente integer references Usuarios(id),
	id_proveedor integer references Usuarios(id),
	duracion_horas integer, 
	precio_total numeric(10,2),
	fecha_inicio date, 
	fecha_fin date,
	estado varchar(20)
);
CREATE TABLE IF NOT EXISTS public.Pedidos(
	id SERIAL primary key,
	id_cliente integer references Usuarios(id),
	id_proveedor integer references Usuarios(id), 
	fecha_pedido date,
	estado varchar(20)
);
CREATE TABLE IF NOT EXISTS public.Ofertas(
	id SERIAL primary key,
	id_habilidades integer references Habilidad(id),
	descripcion text,
	precio_hora numeric(10,2)
);
CREATE TABLE IF NOT EXISTS public.Pagos(
	id SERIAL primary key,
	id_comercial integer references Comerciales(id),
	monto numeric(10,2),
	fecha_pago date
);
CREATE TABLE IF NOT EXISTS public.Comentario(
	id SERIAL primary key,
	id_cliente integer references Usuarios(id),
	id_proveedor integer references Usuarios(id),
	calificacion integer, 
	descripcion text,
	fecha_comentario date
);
