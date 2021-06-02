PGDMP     )                    y            proyecto1DB    13.1    13.1 j    5           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            6           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            7           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            8           1262    26466    proyecto1DB    DATABASE     q   CREATE DATABASE "proyecto1DB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE "proyecto1DB";
                postgres    false            �            1255    35265    delete_album()    FUNCTION     �   CREATE FUNCTION public.delete_album() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	INSERT INTO bitacora(correo, accion, tabla) VALUES (OLD.modificacion, 'DELETE', 'Album');
	RETURN NEW;
END;
$$;
 %   DROP FUNCTION public.delete_album();
       public          postgres    false            �            1255    35267    delete_artista()    FUNCTION     �   CREATE FUNCTION public.delete_artista() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	INSERT INTO bitacora(correo, accion, tabla) VALUES (OLD.modificacion, 'DELETE', 'Artista');
	RETURN NEW;
END;
$$;
 '   DROP FUNCTION public.delete_artista();
       public          postgres    false            �            1255    35258    delete_cancion()    FUNCTION     �   CREATE FUNCTION public.delete_cancion() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	INSERT INTO bitacora(correo, accion, tabla) VALUES (OLD.modificacion, 'DELETE', 'Cancion');
	RETURN NEW;
END;
$$;
 '   DROP FUNCTION public.delete_cancion();
       public          postgres    false            �            1255    35277 $   iif(boolean, anyelement, anyelement)    FUNCTION     �   CREATE FUNCTION public.iif(condition boolean, true_result anyelement, false_result anyelement) RETURNS anyelement
    LANGUAGE sql IMMUTABLE
    AS $$
  SELECT CASE WHEN condition THEN true_result ELSE false_result END
$$;
 ^   DROP FUNCTION public.iif(condition boolean, true_result anyelement, false_result anyelement);
       public          postgres    false            �            1255    35260    insert_album()    FUNCTION     �   CREATE FUNCTION public.insert_album() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	INSERT INTO bitacora(correo, accion, tabla) VALUES (NEW.modificacion, 'INSERT', 'Album');
	RETURN NEW;
END;
$$;
 %   DROP FUNCTION public.insert_album();
       public          postgres    false            �            1255    35271    insert_artista()    FUNCTION     �   CREATE FUNCTION public.insert_artista() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	INSERT INTO bitacora(correo, accion, tabla) VALUES (NEW.modificacion, 'INSERT', 'Artista');
	RETURN NEW;
END;
$$;
 '   DROP FUNCTION public.insert_artista();
       public          postgres    false            �            1255    35254    insert_cancion()    FUNCTION     �   CREATE FUNCTION public.insert_cancion() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	INSERT INTO bitacora(correo, accion, tabla) VALUES (NEW.modificacion, 'INSERT', 'Cancion');
	RETURN NEW;
END;
$$;
 '   DROP FUNCTION public.insert_cancion();
       public          postgres    false            �            1255    35262    update_album()    FUNCTION     �   CREATE FUNCTION public.update_album() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	INSERT INTO bitacora(correo, accion, tabla) VALUES (NEW.modificacion, 'UPDATE', 'Album');
	RETURN NEW;
END;
$$;
 %   DROP FUNCTION public.update_album();
       public          postgres    false            �            1255    35269    update_artista()    FUNCTION     �   CREATE FUNCTION public.update_artista() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	INSERT INTO bitacora(correo, accion, tabla) VALUES (NEW.modificacion, 'UPDATE', 'Artista');
	RETURN NEW;
END;
$$;
 '   DROP FUNCTION public.update_artista();
       public          postgres    false            �            1255    35256    update_cancion()    FUNCTION     �   CREATE FUNCTION public.update_cancion() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	INSERT INTO bitacora(correo, accion, tabla) VALUES (NEW.modificacion, 'UPDATE', 'Cancion');
	RETURN NEW;
END;
$$;
 '   DROP FUNCTION public.update_cancion();
       public          postgres    false            �            1259    26525    administrador    TABLE     �   CREATE TABLE public.administrador (
    administrador_id integer NOT NULL,
    correo character varying(50) NOT NULL,
    contrasena character varying(50)
);
 !   DROP TABLE public.administrador;
       public         heap    postgres    false            �            1259    26523 "   administrador_administrador_id_seq    SEQUENCE     �   CREATE SEQUENCE public.administrador_administrador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.administrador_administrador_id_seq;
       public          postgres    false    211            9           0    0 "   administrador_administrador_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.administrador_administrador_id_seq OWNED BY public.administrador.administrador_id;
          public          postgres    false    210            �            1259    26485    album    TABLE     �   CREATE TABLE public.album (
    album_id integer NOT NULL,
    nombre character varying(50),
    artista_id integer NOT NULL,
    fechaanad date DEFAULT CURRENT_DATE,
    modificacion character varying
);
    DROP TABLE public.album;
       public         heap    postgres    false            �            1259    26481    album_album_id_seq    SEQUENCE     �   CREATE SEQUENCE public.album_album_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.album_album_id_seq;
       public          postgres    false    205            :           0    0    album_album_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.album_album_id_seq OWNED BY public.album.album_id;
          public          postgres    false    203            �            1259    26483    album_artista_id_seq    SEQUENCE     �   CREATE SEQUENCE public.album_artista_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.album_artista_id_seq;
       public          postgres    false    205            ;           0    0    album_artista_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.album_artista_id_seq OWNED BY public.album.artista_id;
          public          postgres    false    204            �            1259    26474    artista    TABLE     �   CREATE TABLE public.artista (
    artista_id integer NOT NULL,
    nombre character varying(50),
    fechaanad date DEFAULT CURRENT_DATE,
    modificacion character varying
);
    DROP TABLE public.artista;
       public         heap    postgres    false            �            1259    26472    artista_artista_id_seq    SEQUENCE     �   CREATE SEQUENCE public.artista_artista_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.artista_artista_id_seq;
       public          postgres    false    202            <           0    0    artista_artista_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.artista_artista_id_seq OWNED BY public.artista.artista_id;
          public          postgres    false    201            �            1259    35247    bitacora    TABLE     �   CREATE TABLE public.bitacora (
    fecharegistro date DEFAULT CURRENT_DATE,
    correo character varying,
    accion character varying,
    tabla character varying
);
    DROP TABLE public.bitacora;
       public         heap    postgres    false            �            1259    26504    cancion    TABLE     J  CREATE TABLE public.cancion (
    cancion_id integer NOT NULL,
    nombre character varying(50),
    enlace character varying(50),
    genero character varying(50),
    artista_id integer NOT NULL,
    album_id integer NOT NULL,
    activada integer,
    fechaanad date DEFAULT CURRENT_DATE,
    modificacion character varying
);
    DROP TABLE public.cancion;
       public         heap    postgres    false            �            1259    26502    cancion_album_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cancion_album_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.cancion_album_id_seq;
       public          postgres    false    209            =           0    0    cancion_album_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.cancion_album_id_seq OWNED BY public.cancion.album_id;
          public          postgres    false    208            �            1259    26500    cancion_artista_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cancion_artista_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cancion_artista_id_seq;
       public          postgres    false    209            >           0    0    cancion_artista_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cancion_artista_id_seq OWNED BY public.cancion.artista_id;
          public          postgres    false    207            �            1259    26498    cancion_cancion_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cancion_cancion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.cancion_cancion_id_seq;
       public          postgres    false    209            ?           0    0    cancion_cancion_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.cancion_cancion_id_seq OWNED BY public.cancion.cancion_id;
          public          postgres    false    206            �            1259    26571    canciones_playlist    TABLE     n   CREATE TABLE public.canciones_playlist (
    playlist_id integer NOT NULL,
    cancion_id integer NOT NULL
);
 &   DROP TABLE public.canciones_playlist;
       public         heap    postgres    false            �            1259    26569 !   canciones_playlist_cancion_id_seq    SEQUENCE     �   CREATE SEQUENCE public.canciones_playlist_cancion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.canciones_playlist_cancion_id_seq;
       public          postgres    false    219            @           0    0 !   canciones_playlist_cancion_id_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.canciones_playlist_cancion_id_seq OWNED BY public.canciones_playlist.cancion_id;
          public          postgres    false    218            �            1259    26567 "   canciones_playlist_playlist_id_seq    SEQUENCE     �   CREATE SEQUENCE public.canciones_playlist_playlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.canciones_playlist_playlist_id_seq;
       public          postgres    false    219            A           0    0 "   canciones_playlist_playlist_id_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.canciones_playlist_playlist_id_seq OWNED BY public.canciones_playlist.playlist_id;
          public          postgres    false    217            �            1259    26556    playlist    TABLE     �   CREATE TABLE public.playlist (
    playlist_id integer NOT NULL,
    nombre character varying(50),
    usuario_id character varying(50)
);
    DROP TABLE public.playlist;
       public         heap    postgres    false            �            1259    26554    playlist_playlist_id_seq    SEQUENCE     �   CREATE SEQUENCE public.playlist_playlist_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.playlist_playlist_id_seq;
       public          postgres    false    216            B           0    0    playlist_playlist_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.playlist_playlist_id_seq OWNED BY public.playlist.playlist_id;
          public          postgres    false    215            �            1259    26539    reproducciones    TABLE     �   CREATE TABLE public.reproducciones (
    cancion_id integer NOT NULL,
    usuario_id character varying(50),
    fecharep date DEFAULT CURRENT_DATE
);
 "   DROP TABLE public.reproducciones;
       public         heap    postgres    false            �            1259    26537    reproducciones_cancion_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reproducciones_cancion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.reproducciones_cancion_id_seq;
       public          postgres    false    214            C           0    0    reproducciones_cancion_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.reproducciones_cancion_id_seq OWNED BY public.reproducciones.cancion_id;
          public          postgres    false    213            �            1259    26531    usuario    TABLE     2  CREATE TABLE public.usuario (
    usuario_id character varying(50),
    correo character varying(50) NOT NULL,
    contrasena character varying(50),
    nombreusuario character varying(50),
    suscripcion integer,
    fecharegistro date DEFAULT CURRENT_DATE,
    monitora integer,
    monitorb integer
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    26467    usuario_artista    TABLE     �   CREATE TABLE public.usuario_artista (
    usuarioartista_id character varying(30) NOT NULL,
    correo character varying(50),
    contrasena character varying(70),
    nombre character varying(50)
);
 #   DROP TABLE public.usuario_artista;
       public         heap    postgres    false            q           2604    26528    administrador administrador_id    DEFAULT     �   ALTER TABLE ONLY public.administrador ALTER COLUMN administrador_id SET DEFAULT nextval('public.administrador_administrador_id_seq'::regclass);
 M   ALTER TABLE public.administrador ALTER COLUMN administrador_id DROP DEFAULT;
       public          postgres    false    211    210    211            j           2604    26488    album album_id    DEFAULT     p   ALTER TABLE ONLY public.album ALTER COLUMN album_id SET DEFAULT nextval('public.album_album_id_seq'::regclass);
 =   ALTER TABLE public.album ALTER COLUMN album_id DROP DEFAULT;
       public          postgres    false    203    205    205            k           2604    26489    album artista_id    DEFAULT     t   ALTER TABLE ONLY public.album ALTER COLUMN artista_id SET DEFAULT nextval('public.album_artista_id_seq'::regclass);
 ?   ALTER TABLE public.album ALTER COLUMN artista_id DROP DEFAULT;
       public          postgres    false    205    204    205            h           2604    26477    artista artista_id    DEFAULT     x   ALTER TABLE ONLY public.artista ALTER COLUMN artista_id SET DEFAULT nextval('public.artista_artista_id_seq'::regclass);
 A   ALTER TABLE public.artista ALTER COLUMN artista_id DROP DEFAULT;
       public          postgres    false    202    201    202            m           2604    26507    cancion cancion_id    DEFAULT     x   ALTER TABLE ONLY public.cancion ALTER COLUMN cancion_id SET DEFAULT nextval('public.cancion_cancion_id_seq'::regclass);
 A   ALTER TABLE public.cancion ALTER COLUMN cancion_id DROP DEFAULT;
       public          postgres    false    209    206    209            n           2604    26508    cancion artista_id    DEFAULT     x   ALTER TABLE ONLY public.cancion ALTER COLUMN artista_id SET DEFAULT nextval('public.cancion_artista_id_seq'::regclass);
 A   ALTER TABLE public.cancion ALTER COLUMN artista_id DROP DEFAULT;
       public          postgres    false    209    207    209            o           2604    26509    cancion album_id    DEFAULT     t   ALTER TABLE ONLY public.cancion ALTER COLUMN album_id SET DEFAULT nextval('public.cancion_album_id_seq'::regclass);
 ?   ALTER TABLE public.cancion ALTER COLUMN album_id DROP DEFAULT;
       public          postgres    false    209    208    209            v           2604    26574    canciones_playlist playlist_id    DEFAULT     �   ALTER TABLE ONLY public.canciones_playlist ALTER COLUMN playlist_id SET DEFAULT nextval('public.canciones_playlist_playlist_id_seq'::regclass);
 M   ALTER TABLE public.canciones_playlist ALTER COLUMN playlist_id DROP DEFAULT;
       public          postgres    false    219    217    219            w           2604    26575    canciones_playlist cancion_id    DEFAULT     �   ALTER TABLE ONLY public.canciones_playlist ALTER COLUMN cancion_id SET DEFAULT nextval('public.canciones_playlist_cancion_id_seq'::regclass);
 L   ALTER TABLE public.canciones_playlist ALTER COLUMN cancion_id DROP DEFAULT;
       public          postgres    false    219    218    219            u           2604    26559    playlist playlist_id    DEFAULT     |   ALTER TABLE ONLY public.playlist ALTER COLUMN playlist_id SET DEFAULT nextval('public.playlist_playlist_id_seq'::regclass);
 C   ALTER TABLE public.playlist ALTER COLUMN playlist_id DROP DEFAULT;
       public          postgres    false    216    215    216            s           2604    26542    reproducciones cancion_id    DEFAULT     �   ALTER TABLE ONLY public.reproducciones ALTER COLUMN cancion_id SET DEFAULT nextval('public.reproducciones_cancion_id_seq'::regclass);
 H   ALTER TABLE public.reproducciones ALTER COLUMN cancion_id DROP DEFAULT;
       public          postgres    false    214    213    214            )          0    26525    administrador 
   TABLE DATA           M   COPY public.administrador (administrador_id, correo, contrasena) FROM stdin;
    public          postgres    false    211   ��       #          0    26485    album 
   TABLE DATA           V   COPY public.album (album_id, nombre, artista_id, fechaanad, modificacion) FROM stdin;
    public          postgres    false    205   ł                  0    26474    artista 
   TABLE DATA           N   COPY public.artista (artista_id, nombre, fechaanad, modificacion) FROM stdin;
    public          postgres    false    202   ̃       2          0    35247    bitacora 
   TABLE DATA           H   COPY public.bitacora (fecharegistro, correo, accion, tabla) FROM stdin;
    public          postgres    false    220   �       '          0    26504    cancion 
   TABLE DATA           ~   COPY public.cancion (cancion_id, nombre, enlace, genero, artista_id, album_id, activada, fechaanad, modificacion) FROM stdin;
    public          postgres    false    209   ��       1          0    26571    canciones_playlist 
   TABLE DATA           E   COPY public.canciones_playlist (playlist_id, cancion_id) FROM stdin;
    public          postgres    false    219   /�       .          0    26556    playlist 
   TABLE DATA           C   COPY public.playlist (playlist_id, nombre, usuario_id) FROM stdin;
    public          postgres    false    216   V�       ,          0    26539    reproducciones 
   TABLE DATA           J   COPY public.reproducciones (cancion_id, usuario_id, fecharep) FROM stdin;
    public          postgres    false    214   ȏ       *          0    26531    usuario 
   TABLE DATA           �   COPY public.usuario (usuario_id, correo, contrasena, nombreusuario, suscripcion, fecharegistro, monitora, monitorb) FROM stdin;
    public          postgres    false    212   ��                 0    26467    usuario_artista 
   TABLE DATA           X   COPY public.usuario_artista (usuarioartista_id, correo, contrasena, nombre) FROM stdin;
    public          postgres    false    200   q�       D           0    0 "   administrador_administrador_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.administrador_administrador_id_seq', 1, true);
          public          postgres    false    210            E           0    0    album_album_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.album_album_id_seq', 14, true);
          public          postgres    false    203            F           0    0    album_artista_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.album_artista_id_seq', 1, false);
          public          postgres    false    204            G           0    0    artista_artista_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.artista_artista_id_seq', 11, true);
          public          postgres    false    201            H           0    0    cancion_album_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.cancion_album_id_seq', 1, false);
          public          postgres    false    208            I           0    0    cancion_artista_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.cancion_artista_id_seq', 1, false);
          public          postgres    false    207            J           0    0    cancion_cancion_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.cancion_cancion_id_seq', 108, true);
          public          postgres    false    206            K           0    0 !   canciones_playlist_cancion_id_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.canciones_playlist_cancion_id_seq', 1, false);
          public          postgres    false    218            L           0    0 "   canciones_playlist_playlist_id_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public.canciones_playlist_playlist_id_seq', 1, false);
          public          postgres    false    217            M           0    0    playlist_playlist_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.playlist_playlist_id_seq', 4, true);
          public          postgres    false    215            N           0    0    reproducciones_cancion_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.reproducciones_cancion_id_seq', 1, false);
          public          postgres    false    213            �           2606    26530     administrador administrador_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.administrador
    ADD CONSTRAINT administrador_pkey PRIMARY KEY (correo);
 J   ALTER TABLE ONLY public.administrador DROP CONSTRAINT administrador_pkey;
       public            postgres    false    211            ~           2606    26492    album album_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.album
    ADD CONSTRAINT album_pkey PRIMARY KEY (album_id);
 :   ALTER TABLE ONLY public.album DROP CONSTRAINT album_pkey;
       public            postgres    false    205            |           2606    26480    artista artista_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.artista
    ADD CONSTRAINT artista_pkey PRIMARY KEY (artista_id);
 >   ALTER TABLE ONLY public.artista DROP CONSTRAINT artista_pkey;
       public            postgres    false    202            �           2606    26512    cancion cancion_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cancion
    ADD CONSTRAINT cancion_pkey PRIMARY KEY (cancion_id);
 >   ALTER TABLE ONLY public.cancion DROP CONSTRAINT cancion_pkey;
       public            postgres    false    209            �           2606    26561    playlist playlist_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.playlist
    ADD CONSTRAINT playlist_pkey PRIMARY KEY (playlist_id);
 @   ALTER TABLE ONLY public.playlist DROP CONSTRAINT playlist_pkey;
       public            postgres    false    216            z           2606    26471 $   usuario_artista usuario_artista_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.usuario_artista
    ADD CONSTRAINT usuario_artista_pkey PRIMARY KEY (usuarioartista_id);
 N   ALTER TABLE ONLY public.usuario_artista DROP CONSTRAINT usuario_artista_pkey;
       public            postgres    false    200            �           2606    26536    usuario usuario_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (correo);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    212                       1259    35275    artid_cancion    INDEX     G   CREATE INDEX artid_cancion ON public.cancion USING btree (artista_id);
 !   DROP INDEX public.artid_cancion;
       public            postgres    false    209            �           1259    35273 	   canid_rep    INDEX     J   CREATE INDEX canid_rep ON public.reproducciones USING btree (cancion_id);
    DROP INDEX public.canid_rep;
       public            postgres    false    214            �           1259    35274    fecharep    INDEX     G   CREATE INDEX fecharep ON public.reproducciones USING btree (fecharep);
    DROP INDEX public.fecharep;
       public            postgres    false    214            �           1259    35276    genero_cancion    INDEX     D   CREATE INDEX genero_cancion ON public.cancion USING btree (genero);
 "   DROP INDEX public.genero_cancion;
       public            postgres    false    209            �           2620    35266    album albumdlt    TRIGGER     j   CREATE TRIGGER albumdlt AFTER DELETE ON public.album FOR EACH ROW EXECUTE FUNCTION public.delete_album();
 '   DROP TRIGGER albumdlt ON public.album;
       public          postgres    false    205    226            �           2620    35264    album albumins    TRIGGER     j   CREATE TRIGGER albumins AFTER INSERT ON public.album FOR EACH ROW EXECUTE FUNCTION public.insert_album();
 '   DROP TRIGGER albumins ON public.album;
       public          postgres    false    225    205            �           2620    35263    album albumupd    TRIGGER     j   CREATE TRIGGER albumupd AFTER UPDATE ON public.album FOR EACH ROW EXECUTE FUNCTION public.update_album();
 '   DROP TRIGGER albumupd ON public.album;
       public          postgres    false    224    205            �           2620    35268    artista artistadlt    TRIGGER     p   CREATE TRIGGER artistadlt AFTER DELETE ON public.artista FOR EACH ROW EXECUTE FUNCTION public.delete_artista();
 +   DROP TRIGGER artistadlt ON public.artista;
       public          postgres    false    227    202            �           2620    35272    artista artistains    TRIGGER     p   CREATE TRIGGER artistains AFTER INSERT ON public.artista FOR EACH ROW EXECUTE FUNCTION public.insert_artista();
 +   DROP TRIGGER artistains ON public.artista;
       public          postgres    false    202    229            �           2620    35270    artista artistaupd    TRIGGER     p   CREATE TRIGGER artistaupd AFTER UPDATE ON public.artista FOR EACH ROW EXECUTE FUNCTION public.update_artista();
 +   DROP TRIGGER artistaupd ON public.artista;
       public          postgres    false    202    228            �           2620    35259    cancion canciondlt    TRIGGER     p   CREATE TRIGGER canciondlt AFTER DELETE ON public.cancion FOR EACH ROW EXECUTE FUNCTION public.delete_cancion();
 +   DROP TRIGGER canciondlt ON public.cancion;
       public          postgres    false    223    209            �           2620    35255    cancion cancionins    TRIGGER     p   CREATE TRIGGER cancionins AFTER INSERT ON public.cancion FOR EACH ROW EXECUTE FUNCTION public.insert_cancion();
 +   DROP TRIGGER cancionins ON public.cancion;
       public          postgres    false    221    209            �           2620    35257    cancion cancionupd    TRIGGER     p   CREATE TRIGGER cancionupd AFTER UPDATE ON public.cancion FOR EACH ROW EXECUTE FUNCTION public.update_cancion();
 +   DROP TRIGGER cancionupd ON public.cancion;
       public          postgres    false    209    222            �           2606    26493    album album_artista_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.album
    ADD CONSTRAINT album_artista_id_fkey FOREIGN KEY (artista_id) REFERENCES public.artista(artista_id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.album DROP CONSTRAINT album_artista_id_fkey;
       public          postgres    false    2940    205    202            �           2606    26518    cancion cancion_album_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cancion
    ADD CONSTRAINT cancion_album_id_fkey FOREIGN KEY (album_id) REFERENCES public.album(album_id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.cancion DROP CONSTRAINT cancion_album_id_fkey;
       public          postgres    false    209    205    2942            �           2606    26513    cancion cancion_artista_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cancion
    ADD CONSTRAINT cancion_artista_id_fkey FOREIGN KEY (artista_id) REFERENCES public.artista(artista_id) ON UPDATE CASCADE ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.cancion DROP CONSTRAINT cancion_artista_id_fkey;
       public          postgres    false    209    2940    202            �           2606    26581 5   canciones_playlist canciones_playlist_cancion_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.canciones_playlist
    ADD CONSTRAINT canciones_playlist_cancion_id_fkey FOREIGN KEY (cancion_id) REFERENCES public.cancion(cancion_id) ON UPDATE CASCADE ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.canciones_playlist DROP CONSTRAINT canciones_playlist_cancion_id_fkey;
       public          postgres    false    209    2945    219            �           2606    26576 6   canciones_playlist canciones_playlist_playlist_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.canciones_playlist
    ADD CONSTRAINT canciones_playlist_playlist_id_fkey FOREIGN KEY (playlist_id) REFERENCES public.playlist(playlist_id) ON UPDATE CASCADE ON DELETE CASCADE;
 `   ALTER TABLE ONLY public.canciones_playlist DROP CONSTRAINT canciones_playlist_playlist_id_fkey;
       public          postgres    false    216    2954    219            �           2606    26562 !   playlist playlist_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.playlist
    ADD CONSTRAINT playlist_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(correo) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.playlist DROP CONSTRAINT playlist_usuario_id_fkey;
       public          postgres    false    212    216    2950            �           2606    26544 -   reproducciones reproducciones_cancion_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reproducciones
    ADD CONSTRAINT reproducciones_cancion_id_fkey FOREIGN KEY (cancion_id) REFERENCES public.cancion(cancion_id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.reproducciones DROP CONSTRAINT reproducciones_cancion_id_fkey;
       public          postgres    false    214    2945    209            �           2606    26549 -   reproducciones reproducciones_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reproducciones
    ADD CONSTRAINT reproducciones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(correo) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.reproducciones DROP CONSTRAINT reproducciones_usuario_id_fkey;
       public          postgres    false    2950    214    212            )   0   x�3�LL����M,�,NtH�M���K���L��+)J,N�K����� %5a      #   �   x�e��j�0D�����Vr���-�9���\Yl�*�e��W�
.�ig��2�����{��7���@IE�ԥRp:
���V[/~�6�����.�9Kz%m�#z{k�G3T7��sum�=9�e�h��T��juN�Z�Y�7�������[�����sI.��A�lW8<>N'G��2N��ι8��Y��>�њ��s�1�&�)��|;���ۧ�i43��������$���OHcm          �   x�]�=�0�ٜ"�"��c[���B���WD1�H�/�Wz�YC;�z:�i^�dF�Y��+1P�l�5ā�*0�Wϳj~�8s�Q�P:; y�@�]8?B�#�j0D���淔*V�UE(�w���Q�^��q\"9��3��Nz���,�s�K��MbM       2   f   x�3202�50�5��LL����M,�,NtH�M���K���pqq�tN�K����2B�/N-J�������Kt(-K�KM)�K/���А�y)E�Ÿ����� ];j      '   *
  x���ێ�8ǯ�=��V���VZ��p>�VB&1Đ�t��;�S�m���f���\�5�R�_U��U�(���4�'~��$
YxF����?����[���Ã�R"���g~�<�F�w]Fqĝ+R�UEjUU*U����ߓ*j�<=���z?��ڿ��.�j�����Q�J�bJ7z���2���$��R�6��Γ[��ZCcv�DZ�e�wc��UMںfm���,�x����M��1/��\Fn�E��^�Dn�	��đ�����������S�����g/i�ZWi�5�֣!ŝ�� �� �g&5R=���s�Q�Ҹ+
ڰ;�p����D����KV����b������Uц�wA��<��DR�S7:�a����"���>����e��6��cp.��[&82�]�g��Rn%���j2�V�"nY�Fr?/q��k���)���8���r*�["[љ:E�가��	�4��D��և��.�{�T���w"��?r���P>L{l�fA�S�������<�̅ɪ;Ү���Z�����sy���R�w'ں��>K�l(hH�0�zcw#FCOO�f%���zk��M5�C*��7�2�|�̕��=��i{Ҳ�p-�S<fW��<�6%!��wӊ:��yi�R#:Z�������.ؐ�T��ro��_C���Gc
�P*b<��ꖩD���6���}?�ک#3�G�(A�#x)J�b6���4w�U�o�i�I��z�t��l�aJ����O *��.��/�˗ˤ5nU����֓��D-�3
��)�/��h�rַ*I<�Ъ�fn�o��x*e����^�tm5Y ���o�S$�m:�!Ҹ�gg�7g�!u)�|����X^&��y���ÓP@�!�+J*;	J���X�b��i1RGc�L�q^�a1g�nz���5�K�	EYxe��t�4 �9���q7����j���^7�w:�}�6>#�l�xz�q|�߫s���*���W6_mhK�9���`�0�<�s���=��V0��j��j �&9f9�Ty�z��s�Y�5�[�^}���"���4v��m��Ry�D�[5V��M��)LE�)�\pߍ��p��x����@H�(S���}��>���qj�s��C(�r�a7��:�����~@%�j#�ir����jϬ����m���:���J��U���MjBy�'��'�����$P&!�a����{g8�ײ�`����ܡ���q�f����{E0�{P�P5�24��R`g�v3�O&�b`�;ˁ��@�K-�م�Z��\���[�O�\��><�굴�u{ؽ���`3�C��B+BMES�DP�FT��_��<�	9Q��q�o�N�,&�P��*�K��y��wc~q$�]C݄Ac8$a�<����[��(N�Z�h�����'�^E0(���\�p;�orxu3q:��1��b�c`Ԕwx�xZ]2�N�b��f�%0(�����tpލ�����]�b���ǈ`��������cs>~��\hvp�y 쫳[����U�������ר���HL�>c�nEI,o��z�d��fg�&����q���W���A�8��mVb����}���ٷ4�R�Jm��0���v��Z���Z������F� �f���k^*nk�fzOA��r�Ka�,q9�,;�=��g�,����]��EcF���jm^@�`<��|~��J~��2����æ(�:Z�@��O���;��fhS�gB�y�>4�!`Jo�����-ȧ�D��2ܧ%� o�Q�
�����d��sp�	y�j�cXOzSv(����S���E���?��*�`�J�{PU"R��&�G��L��y�=֨�)ԩUĎ�e�լC��z�K������,?lze@>ɛj��m��� �R0'{4�1���g��Q����B#1�������K4�>/�a�7�P�pA������$��q%ȰW&iۑYqZ��ƕbzM�GڷJ�ڃ�8Z& ���yd+���	�����Ӥ�֜ڏ��U���`H#�|�[����Q��|_3|J@��	C�����Ҧ��I� �c�W�vlN:R��mũ��Tʵ����	�������NNuB;�A!v�z�{h-�J��hZ|��B��ޭAw��\Ed]k�b?u���9Yɉ6��l�/ő���5X�Փ"������^��#��Ny��7��}iiv0�Q~���/h���*WAE�j��L�B<�0k	����]nm]�ϚdxPV�����/V���D9��^&���Ʈ�m4ё���6�29�������cPֆR�B�;��~����;��p�<qa9�%�ȍ��#v�#^ފ�4f��R�IA�J�[NV/�G�;Y�����<�A0@�����JUC�OK �pB/��.�d䅦�5K��Q���^�T׫ճ��W�4*%<��'�^7��	��g��`�c���(��Rs���vd���m4P+�^O��J�{�o-S���qi3й��\�D��fz]I��&[��!�Q	e�"�\q����S�_:����9 ��?����Ǐ�L֓�      1      x�3�44�2�44����� ��      .   b   x�M�;�  й=L?�n���4��	�	���;�8���lj����U��Kʒi3���J�\��'��3�vC�5��e)��+Q�OJ!�<$�      ,   �   x���K�  �5ܥ�Oe�Aܐ�(�oo�*3F�n���Ȏ\\I����%ɥh�cS�GT�$�i-7��g�/�:���d���i����7��h� a�F��XH�������q+�a��z��M=��ߜ�9���K�C4�Q���d�s�%�'wڮ��qca}��*�Q���U�pMόRz܅5      *   �   x�mPA
�0<o^�������Z�^{Y4�@�Q��X�2��Lv����ym+krPS7U�P��y3Q�fОl���5܂���d|�!�c�pg��њ�O=���pdM��in�n&َ�&��ʠB�~q̊%ƣ��q;�`��.���e�o�_0��km�H����I�uqb;��q�v/)��G�         V   x�K,*�,.I�M,�,N���L��s�|��������\��������ԼDN�Z���T�̜�ԢbN 3�Dҁ$��� es��qqq x�*�     