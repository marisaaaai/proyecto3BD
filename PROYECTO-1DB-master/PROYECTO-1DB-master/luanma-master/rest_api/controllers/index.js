/*


Consultas a la base de datos


*/

require("dotenv").config();

// const Cryptr = require("cryptr");
// cryptr = new Cryptr(process.env.CRYPTRKEY);

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Mongo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
});

const Schema = mongoose.Schema;

const repSchemaJS = {
  fecha: String,
  usuarios: {},
};

const repSchema = new Schema(repSchemaJS);
const rep = mongoose.model("Reproducciones", repSchema);

const recomSchemaJS = {
  user: String,
  recomendation: {
    cancion_id: Number,
    artista: String,
    nombre: String,
    genero: String,
  },
};
const recomSchema = new Schema(recomSchemaJS);
const recomendaciones = mongoose.model("Recom", recomSchema);

const { Pool } = require("pg");

const config = {
  host: "localhost",
  user: "postgres",
  password: "Nico",
  database: "proyecto1DB",
};

const repro = async (req, res) => {
  const { date } = req.body;
  await pool
    .query(
      "SELECT usuario.usuario_id, usuario.correo, nombreusuario, COUNT(cancion_id) as reproducciones FROM usuario INNER JOIN reproducciones ON usuario.correo = reproducciones.usuario_id WHERE fecharep = $1 GROUP BY usuario.usuario_id, usuario.correo",
      [date]
    )
    .then((response) => {
      const reproducciones = new rep({ fecha: date, usuarios: response.rows });
      reproducciones.save();
    })
    .catch(() => {
      res.json({
        action: {
          type: "REQUEST_FAIL",
          payload: { msg: "Problemas con el servidor" },
        },
      });
    });
  await pool
    .query(
      "SELECT trends.usuario_id as correo, cancion.cancion_id as trackId, cancion.nombre, artista.nombre as artista, cancion.genero from cancion INNER JOIN trends ON trends.genero = cancion.genero INNER JOIN artista ON artista.artista_id = cancion.artista_id WHERE NOT EXISTS (SELECT cancion_id FROM reproducciones WHERE cancion.cancion_id = reproducciones.cancion_id) GROUP BY trends.usuario_id, cancion.cancion_id, cancion.nombre, artista, cancion.genero ORDER BY cancion.fechaAnad LIMIT 10"
    )
    .then((response) => {
      response.rows.map((rec) => {
        const recom = new recomendaciones({
          user: rec.correo,
          recomendation: {
            cancion_id: rec.trackId,
            artista: rec.artista,
            nombre: rec.nombre,
            genero: rec.genero,
          },
        });
        recom.save();
      });
    });
  res.json({
    action: {
      type: "REQUEST_SUCCESS",
      payload: { msg: "Se ha anadido a Mongo lo solicitado" },
    },
  });
};

const pool = new Pool(config);

const getUsers = async (req, res) => {
  const response = await pool.query(
    "SELECT * FROM usuario ORDER BY usuario_id ASC"
  );
  res.status(200).json(response.rows);
};

const getAlbums = async (req, res) => {
  const response = await pool.query(
    "SELECT album_id as idAlbum, album.nombre as Nombre, artista.nombre as Artista FROM album INNER JOIN artista ON album.artista_id=artista.artista_id ORDER BY Nombre ASC"
  );
  res.json({ action: { type: "ALBUMS_LOADED", payload: response.rows } });
};

const getTracks = async (req, res) => {
  const response = await pool.query(
    "SELECT cancion.nombre as Nombre, artista.nombre as Artista FROM cancion INNER JOIN artista ON cancion.artista_id=artista.artista_id ORDER BY Nombre"
  );
  res.json({ action: { type: "TRACKS_LOADED", payload: response.rows } });
};

const getArtists = async (req, res) => {
  const response = await pool.query(
    "SELECT artista_id as id, nombre FROM artista ORDER BY nombre"
  );
  res.json({ action: { type: "ARTISTS_LOADED", payload: response.rows } });
};

const getUserById = async (req, res) => {
  const { correo, contrasena } = req.params;
  await pool
    // Se revisas en la tabla de usuario si existe el usuario con correo ingresado
    .query(
      "SELECT * FROM usuario WHERE usuario.correo = $1 AND suscripcion = 0 AND monitorA = 0 AND monitorB = 0",
      [correo]
    )
    .then((response) => {
      //Si no existe no habran filas entonces se chequea en otra tabla
      if (response.rows.length == 0) {
        //verificamos en artistas users
        pool
          .query(
            "SELECT * FROM usuario WHERE usuario.correo = $1 AND suscripcion = 1 AND monitorA = 0 AND monitorB = 0",
            [correo]
          )
          .then((response2) => {
            //si no existe en usuarios artistas se chequea administradores
            if (response2.rows.length == 0) {
              pool
                .query(
                  "SELECT * FROM usuario WHERE usuario.correo = $1 AND suscripcion = 0 AND monitorA = 1 AND monitorB = 0",
                  [correo]
                )
                .then((response3) => {
                  //si no existe en administradores no existe
                  if (response3.rows.length == 0) {
                    pool
                      .query(
                        "SELECT * FROM usuario WHERE usuario.correo = $1 AND suscripcion = 0 AND monitorA = 0 AND monitorB = 1",
                        [correo]
                      )
                      .then((response4) => {
                        if (response4.rows.length == 0) {
                          pool
                            .query(
                              "SELECT * FROM usuario WHERE usuario.correo = $1 AND suscripcion = 1 AND monitorA = 1 AND monitorB = 0",
                              [correo]
                            )
                            .then((response5) => {
                              if (response5.rows.length == 0) {
                                pool
                                  .query(
                                    "SELECT * FROM usuario WHERE usuario.correo = $1 AND suscripcion = 1 AND monitorA = 0 AND monitorB = 1",
                                    [correo]
                                  )
                                  .then((response6) => {
                                    if (response6.rows.length == 0) {
                                      pool
                                        .query(
                                          "SELECT * FROM usuario_artista WHERE usuario_artista.correo = $1",
                                          [correo]
                                        )
                                        .then((response7) => {
                                          if (response7.rows.length == 0) {
                                            pool
                                              .query(
                                                "SELECT * FROM administrador WHERE administrador.correo = $1",
                                                [correo]
                                              )
                                              .then((response8) => {
                                                if (
                                                  response8.rows.lenght == 0
                                                ) {
                                                  res.json({
                                                    action: {
                                                      type: "LOGIN_FAIL",
                                                      payload: {
                                                        msg: "User does not exists",
                                                      },
                                                    },
                                                  });
                                                } else {
                                                  if (
                                                    response8.rows[0]
                                                      .contrasena === contrasena
                                                  ) {
                                                    res.json({
                                                      action: {
                                                        type: "REGISTER_SUCCESS",
                                                        payload: {
                                                          user_name: correo,
                                                          userType: "admin",
                                                        },
                                                      },
                                                    });
                                                  } else {
                                                    res.json({
                                                      action: {
                                                        type: "AUTH_ERROR",
                                                        payload: {
                                                          msg: "Contrasena Incorrecta",
                                                        },
                                                      },
                                                    });
                                                  }
                                                }
                                              })
                                              .catch(() => {
                                                res.json({
                                                  action: {
                                                    type: "LOGIN_FAIL",
                                                    payload: {
                                                      msg: "Problemas con el Servidor",
                                                    },
                                                  },
                                                });
                                              });
                                          } else {
                                            if (
                                              response7.rows[0].contrasena ===
                                              contrasena
                                            ) {
                                              res.json({
                                                action: {
                                                  type: "REGISTER_SUCCESS",
                                                  payload: {
                                                    user_name: correo,
                                                    userType: "artista",
                                                  },
                                                },
                                              });
                                            } else {
                                              res.json({
                                                action: {
                                                  type: "AUTH_ERROR",
                                                  payload: {
                                                    msg: "Contrasena Incorrecta",
                                                  },
                                                },
                                              });
                                            }
                                          }
                                        })
                                        .catch(() => {
                                          res.json({
                                            action: {
                                              type: "LOGIN_FAIL",
                                              payload: {
                                                msg: "Problemas con el Servidor",
                                              },
                                            },
                                          });
                                        });
                                    } else {
                                      if (
                                        response6.rows[0].contrasena ===
                                        contrasena
                                      ) {
                                        res.json({
                                          action: {
                                            type: "REGISTER_SUCCESS",
                                            payload: {
                                              user_name: correo,
                                              userType: "comunSB",
                                            },
                                          },
                                        });
                                      } else {
                                        res.json({
                                          action: {
                                            type: "AUTH_ERROR",
                                            payload: {
                                              msg: "Contrasena Incorrecta",
                                            },
                                          },
                                        });
                                      }
                                    }
                                  })
                                  .catch(() => {
                                    res.json({
                                      action: {
                                        type: "LOGIN_FAIL",
                                        payload: {
                                          msg: "Problemas con el Servidor",
                                        },
                                      },
                                    });
                                  });
                              } else {
                                if (
                                  response5.rows[0].contrasena === contrasena
                                ) {
                                  res.json({
                                    action: {
                                      type: "REGISTER_SUCCESS",
                                      payload: {
                                        user_name: correo,
                                        userType: "comunSA",
                                      },
                                    },
                                  });
                                } else {
                                  res.json({
                                    action: {
                                      type: "AUTH_ERROR",
                                      payload: { msg: "Contrasena Incorrecta" },
                                    },
                                  });
                                }
                              }
                            })
                            .catch(() => {
                              res.json({
                                action: {
                                  type: "LOGIN_FAIL",
                                  payload: { msg: "Problemas con el Servidor" },
                                },
                              });
                            });
                        } else {
                          if (response4.rows[0].contrasena === contrasena) {
                            res.json({
                              action: {
                                type: "REGISTER_SUCCESS",
                                payload: {
                                  user_name: correo,
                                  userType: "comunNSB",
                                },
                              },
                            });
                          }
                        }
                      })
                      .catch(() => {
                        res.json({
                          action: {
                            type: "LOGIN_FAIL",
                            payload: { msg: "Problemas con el Servidor" },
                          },
                        });
                      });
                  } else {
                    if (response3.rows[0].contrasena === contrasena) {
                      res.json({
                        action: {
                          type: "REGISTER_SUCCESS",
                          payload: { user_name: correo, userType: "comunNSA" },
                        },
                      });
                    } else {
                      res.json({
                        action: {
                          type: "AUTH_ERROR",
                          payload: { msg: "Contrasena y correo no coinciden" },
                        },
                      });
                    }
                  }
                })
                .catch((e) => {
                  console.log(e);
                  res.json({
                    action: {
                      type: "LOGIN_FAIL",
                      payload: { msg: "Problemas con el Servidor" },
                    },
                  });
                });
            } else {
              if (response2.rows[0].contrasena === contrasena) {
                res.json({
                  action: {
                    type: "REGISTER_SUCCESS",
                    payload: { user_name: correo, userType: "comunS" },
                  },
                });
              } else {
                res.json({
                  action: {
                    type: "AUTH_ERROR",
                    payload: { msg: "Contrasena y usuario no coinciden" },
                  },
                });
              }
            }
          })
          .catch((e) => {
            console.log(e);
            res.json({
              action: {
                type: "LOGIN_FAIL",
                payload: { msg: "Problemas con el Servidor" },
              },
            });
          });
      } else {
        if (response.rows[0].contrasena === contrasena) {
          res.json({
            action: {
              type: "REGISTER_SUCCESS",
              payload: { user_name: correo, userType: "comunNS" },
            },
          });
        } else {
          res.json({
            action: {
              type: "AUTH_ERROR",
              payload: { msg: "Contrasena y correo no coinciden" },
            },
          });
        }
      }
    })
    .catch((e) => {
      console.log(e);
      res.json({
        action: {
          type: "LOGIN_FAIL",
          payload: { msg: "Problemas con el servidor" },
        },
      });
    });
};
const getPlaylist = async (req, res) => {
  const { usuario_id } = req.body;
  await pool
    .query("SELECT * FROM playlist WHERE usuario_id = $1", [usuario_id])
    .then(() => {
      res.json({
        action: {
          type: "SHOW_SUCCESS",
          payload: { playlistByuserId: playlistByuserId.rows },
        },
      });
    })

    .catch(() => {
      res.json({
        action: {
          type: "SHOW_FAIL",
          payload: { msg: "Problemas con el servidor" },
        },
      });
    });
};
const getSongsinPlaylist = async (req, res) => {
  const { playlist_id } = req.body;
  const response = await pool.query(
    "SELECT * FROM canciones_playlist WHERE playlist_id = $1",
    [playlist_id]
  );
  res.json({
    action: {
      type: "REQUEST_SUCCESS",
      payload: response.rows,
    },
  });
};
const createUser = async (req, res) => {
  const { usuario_id, correo, contrasena, nombreUsuario, suscripcion } =
    req.body;
  await pool
    .query("SELECT * FROM usuario WHERE usuario.usuario_id =$1", [usuario_id])
    .then((response) => {
      if (response.rows.length == 0) {
        pool
          .query(
            "INSERT INTO usuario(usuario_id, correo, contrasena, nombreUsuario, suscripcion) VALUES ($1,$2,$3,$4,$5)",
            [usuario_id, correo, contrasena, nombreUsuario, suscripcion]
          )
          .then(() => {
            res.json({
              action: {
                type: "REGISTER_SUCCESS",
                payload: {
                  user_name: correo,
                  msg: "Usuario anadido con exito",
                },
              },
            });
          });
        console.log("hola").catch(() => {
          res.json({
            action: {
              type: "REGISTER_FAIL",
              payload: { msg: "Problemas con el servidor" },
            },
          });
        });
      } else {
        res.json({
          action: {
            type: "REGISTER_FAIL",
            payload: { msg: "Usuario ya existe" },
          },
        });
      }
    })
    .catch(() => {
      res.json({
        action: {
          type: "REGISTER_FAIL",
          payload: { msg: "Problemas con el servidor" },
        },
      });
    });
};

const newPlaylist = async (req, res) => {
  const { usuario_id, nombre } = req.body;
  await pool.query("INSERT INTO playlist(usuario_id,nombre) VALUES($1,$2)", [
    usuario_id,
    nombre,
  ]);
  res.json({
    action: {
      type: "REQUEST_SUCCESS",
      payload: { msg: "Playlist Creada" },
    },
  });
};
const insertSongPlaylist = async (req, res) => {
  const { cancion_id, playlist_id } = req.body;

  await pool
    .query(
      "INSERT INTO canciones_playlist(playlist_id, cancion_id) VALUES ($1,$2)",
      [playlist_id, cancion_id]
    )
    .then(() => {
      res.json({
        action: {
          type: "REQUEST_SUCCESS",
          payload: { msg: "Cancion anadida" },
        },
      });
    });
  console.log().catch((e) => {
    res.json({
      action: {
        type: "REQUEST_FAIL",
        payload: { msg: "Problemas con el servirdor" },
      },
    });
  });
};
const inacTrack = async (req, res) => {
  const { cancion_id } = req.body;
  await pool
    .query("UPDATE cancion SET activada=1 WHERE cancion_id=$1", [cancion_id])
    .then(() => {
      res.json({
        action: {
          type: "REQUEST_SUCCESS",
          payload: { msg: "Cancion inactivada" },
        },
      });
    })
    .catch(() => {
      res.json({
        action: {
          type: "REQUEST_FAIL",
          payload: { msg: "Problemas con el servirdor" },
        },
      });
    });
};
const inacSus = async (req, res) => {
  const { user_name } = req.body;
  console.log(user_name);
  await pool

    .query("UPDATE usuario SET suscripcion=0 WHERE correo=$1", [user_name])
    .then(() => {
      console.log("hola");
      res.json({
        action: {
          type: "REQUEST_SUCCESS",
          payload: { msg: "Suscripcion inactivada" },
        },
      });
    })
    .catch((e) => {
      console.log(e);
      res.json({
        action: {
          type: "REQUEST_FAIL",
          payload: { msg: "Problemas con el servirdor" },
        },
      });
    });
};
const monitorA = async (req, res) => {
  const { user_name } = req.body;
  console.log(user_name);
  await pool
    .query("UPDATE usuario SET monitorA=1, monitorB= 0 WHERE correo=$1", [
      user_name,
    ])

    .then(() => {
      console.log("hola");
      res.json({
        action: {
          type: "REQUEST_SUCCESS",
          payload: { msg: "Usuario asignado a Monitor A" },
        },
      });
    })
    .catch((e) => {
      console.log(e);
      res.json({
        action: {
          type: "REQUEST_FAIL",
          payload: { msg: "Problemas con el servirdor" },
        },
      });
    });
};
const monitorB = async (req, res) => {
  const { user_name } = req.body;
  await pool
    .query("UPDATE usuario SET monitorA=0, monitorB= 1 WHERE correo=$1", [
      user_name,
    ])
    .then(() => {
      res.json({
        action: {
          type: "REQUEST_SUCCESS",
          payload: { msg: "Usuario asignado a Monitor B" },
        },
      });
    })
    .catch(() => {
      res.json({
        action: {
          type: "REQUEST_FAIL",
          payload: { msg: "Problemas con el servirdor" },
        },
      });
    });
};

const updateTrack = async (req, res) => {
  const { cancion_id, newtrackname, newalbumid, newartistid, modifiedBy } =
    req.body;

  await pool
    .query(
      "UPDATE cancion SET nombre = $1, album_id = $2, artista_id = $3, modificacion = $5 WHERE cancion_id = $4",
      [newtrackname, newalbumid, newartistid, cancion_id, modifiedBy]
    )
    .then(() => {
      res.json({
        action: {
          type: "REQUEST_SUCCESS",
          payload: { msg: "Cancion modificada" },
        },
      });
    })
    .catch(() => {
      res.json({
        action: {
          type: "REQUEST_FAIL",
          payload: { msg: "Problemas con el servidor" },
        },
      });
    });
};

const updateArtist = async (req, res) => {
  const { artista_id, newartistname, modifiedBy } = req.body;

  await pool
    .query(
      "UPDATE artista SET nombre = $1, modificacion = $3 WHERE artista_id = $2",
      [newartistname, artista_id, modifiedBy]
    )
    .then(() => {
      res.json({
        action: {
          type: "REQUEST_SUCCESS",
          payload: { msg: "Artista Modificado" },
        },
      });
    })
    .catch(() => {
      res.json({
        action: {
          type: "REQUEST_FAIL",
          payload: { msg: "Problemas con el Servidor" },
        },
      });
    });
};

const updateAlbum = async (req, res) => {
  const { album_id, newalbumname, newartistid, modifiedBy } = req.body;

  //

  await pool
    .query(
      "UPDATE album SET nombre = $1, artista_id = $2, modificacion = $3 WHERE album_id = $4",
      [newalbumname, newartistid, modifiedBy, album_id]
    )
    .then(() => {
      res.json({
        action: {
          type: "REQUEST_SUCCESS",
          payload: { msg: "Album Modificado" },
        },
      });
    })
    .catch(() => {
      res.json({
        action: {
          type: "REQUEST_FAIL",
          payload: { msg: "Problemas con el servidor" },
        },
      });
    });
};

const deleteTrack = async (req, res) => {
  const { trackid } = req.params;

  //TODO HACER UPDATE PARA USUARIO QUE MODIFICA

  await pool
    .query("DELETE FROM cancion WHERE cancion_id = $1", [trackid])
    .then(() => {
      res.json({
        action: {
          type: "REQUEST_SUCCESS",
          payload: { msg: "Cancion Eliminada" },
        },
      });
    });
  console.log().catch((e) => {
    res.json({
      action: {
        type: "REQUEST_FAIL",
        payload: { msg: "Problemas con el servidor" },
      },
    });
  });
};

const deleteArtist = async (req, res) => {
  const { artista_id } = req.params;

  await pool
    .query("DELETE FROM artista where artista_id = $1", [artista_id])
    .then(() => {
      res.json({
        action: {
          type: "REQUEST_SUCCESS",
          payload: { msg: "Artista Eliminado" },
        },
      });
    })
    .catch((e) => {
      res.json({
        action: {
          type: "REQUEST_FAIL",
          payload: { msg: "Problemas de servidor" },
        },
      });
    });
};

const deleteAlbum = async (req, res) => {
  const { album_id } = req.params;

  //TODO UPDATE ANTES DE DELETE

  await pool
    .query("DELETE FROM album where album_id = $1", [album_id])
    .then(() => {
      res.json({
        action: {
          type: "REQUEST_SUCCESS",
          payload: { msg: "Album Eliminado" },
        },
      });
    })
    .catch(() => {
      res.json({
        action: {
          type: "REQUEST_FAIL",
          payload: { msg: "Problemas de Servidor" },
        },
      });
    });
};

const newArtist = async (req, res) => {
  const { nombre, modifiedBy } = req.body;

  await pool
    .query("SELECT * FROM artista WHERE nombre=$1", [nombre])
    .then((response) => {
      //Se recibe informacion de PostgreSQL

      //En caso no existe
      if (response.rows.length == 0) {
        pool
          .query("INSERT INTO artista(nombre, modificacion) VALUES($1, $2)", [
            nombre,
            modifiedBy,
          ]) //Insertamos a la base de datos
          .then(() => {
            res.json({
              action: {
                type: "REQUEST_SUCCESS",
                payload: { msg: "Artista Anadido" },
              },
            });
          })
          .catch(() => {
            //En caso hay algun inconveniente con PostgreSQL

            res.json({
              action: {
                type: "REQUEST_FAIL",
                payload: { msg: "Problemas con el servidor" },
              },
            });
          });
      } else {
        //En caso el artista ya existe

        res.json({
          action: {
            type: "REQUEST_FAIL",
            payload: { msg: "Artista ya existe" },
          },
        });
      }
    })
    .catch(() => {
      res.json({
        action: {
          type: "REQUEST_FAIL",
          payload: { msg: "Problemas con el servidor" },
        },
      });
    });
};

const newAlbum = async (req, res) => {
  const { nombre, artista_id, modifiedBy } = req.body;

  await pool
    .query(
      "INSERT INTO album(nombre,artista_id, modificacion) VALUES($1, $2, $3)",
      [nombre, artista_id, modifiedBy]
    ) //Insertamos a la base de datos
    .then(() => {
      res.json({
        action: {
          type: "REQUEST_SUCCESS",
          payload: { msg: "Album anadido" },
        },
      });
    })
    .catch(() => {
      //En caso hay algun inconveniente con PostgreSQL
      res.json({
        action: {
          type: "REQUEST_FAIL",
          payload: { msg: "Problemas con el servidor" },
        },
      });
    });
};
const newTrack = async (req, res) => {
  const { nombre, enlace, genero, artista_id, album_id, modifiedBy } = req.body;

  await pool
    .query(
      "INSERT INTO cancion(nombre,enlace,genero,artista_id,album_id,activada, modificacion) VALUES($1, $2, $3, $4, $5, 0, $6)",
      [nombre, enlace, genero, artista_id, album_id, modifiedBy]
    ) //Insertamos a la base de datos
    .then(() => {
      res.json({
        action: {
          type: "REQUEST_SUCCESS",
          payload: { msg: "Pista anadida" },
        },
      });
    });
  console.log().catch((e) => {
    //En caso hay algun inconveniente con PostgreSQL
    res.json({
      action: {
        type: "REQUEST_FAIL",
        payload: { msg: "Problemas con el servidor" },
      },
    });
  });
};

const searchAlbumTracks = async (album) => {
  const albumTracks = await pool.query(
    "SELECT cancion_id as id, nombre FROM cancion WHERE album_id = $1",
    [album.album_id]
  );
  return { ...albumTracks.rows };
};

const search = async (req, res) => {
  console.log("Lleeggaaaaaa");

  const { searchValue } = req.params;

  let search = "%";
  search = search + searchValue;
  search = search + "%";

  const albumByArtist = await pool.query(
    "SELECT album.album_id, album.nombre AS nombre, artista.nombre AS artista FROM artista INNER JOIN album ON artista.artista_id = album.artista_id WHERE artista.nombre LIKE $1;",
    [search]
  );

  albumByArtist.rows.map(async (album) => {
    const albumTracks = await searchAlbumTracks(album);
    console.log(albumTracks);
    album["cancion"] = {};
    Object.values(albumTracks).map((cancion) => {
      console.log(cancion);
      album["cancion"][cancion.id] = { ...cancion };
    });
  });

  const albumByAlbum = await pool.query(
    "SELECT * FROM album WHERE nombre LIKE $1;",
    [search]
  );

  albumByAlbum.rows.map(async (album) => {
    const albumTracks = await searchAlbumTracks(album);
    album["cancion"] = {};
    Object.values(albumTracks).map((cancion) => {
      album["cancion"][cancion.id] = { ...cancion };
    });
  });

  const trackByName = await pool.query(
    "SELECT cancion1.cancion_id as id, cancion1.nombre AS nombre, cancion1.enlace as link, artista1.nombre AS artista FROM cancion cancion1 JOIN album album1 ON cancion1.album_id = album1.album_id JOIN artista artista1 ON artista1.artista_id = album1.artista_id WHERE cancion1.activada = 0 AND cancion1.nombre LIKE $1 ORDER BY (cancion1.nombre)",
    [search]
  );
  const trackByGenre = await pool.query(
    "SELECT cancion1.cancion_id as id, cancion1.nombre AS nombre, cancion1.enlace as link, artista1.nombre AS artista FROM cancion cancion1 JOIN album album1 on album1.album_id = cancion1.album_id JOIN artista artista1 ON artista1.artista_id = album1.artista_id WHERE cancion1.activada = 0 AND cancion1.genero LIKE $1 ORDER BY (cancion1.nombre)",
    [search]
  );

  res.json({
    action: {
      type: "ADD_SEARCHED_SONGS",
      payload: {
        albumByArtist: albumByArtist.rows,
        albumByAlbum: albumByAlbum.rows,
        trackByName: trackByName.rows,
        trackByGenre: trackByGenre.rows,
      },
    },
  });
};

const getBinnacle = async (req, res) => {
  const binnacle = await pool.query(
    "SELECT fechaRegistro, correo, accion, tabla FROM bitacora ORDER BY fechaRegistro DESC"
  );
  res.json({
    action: {
      type: "GET_BINNACLE",
      payload: { binnacle: { ...binnacle.rows } },
    },
  });
};

const getComisions = async (req, res) => {
  const comisions = await pool.query(
    "select artista.nombre,cancion.artista_id, sum(iif(suscripcion = 0,0.1,0.5)) as comision from cancion, reproducciones,artista, usuario where cancion.cancion_id = reproducciones.cancion_id and artista.artista_id = cancion.artista_id and reproducciones.usuario_id = usuario.correo group by cancion.artista_id,artista.nombre"
  );
  res.json({
    action: {
      type: "GET_BINNACLE",
      payload: { comisions: { ...comisions.rows } },
    },
  });
};
const getPersonalComision = async (req, res) => {
  const { correo } = req.body;
  console.log(correo);
  const comisions = await pool.query(
    "select artista.nombre,cancion.artista_id, sum(iif(suscripcion = 0,0.1,0.5)) as comision from cancion, reproducciones,artista, usuario, usuario_artista where cancion.cancion_id = reproducciones.cancion_id and artista.artista_id = cancion.artista_id and reproducciones.usuario_id = usuario.correo AND artista.nombre = usuario_artista.nombre AND usuario_artista.correo = $1 group by cancion.artista_id,artista.nombre;",
    [correo]
  );
  console.log("correo:" + correo);
  res.json({
    action: {
      type: "STATS_LOADED",
      payload: {
        comisions: comisions.rows,
      },
    },
  });
};
const addReproduction = async (req, res) => {
  const { trackId, currentUser } = req.body;

  await pool.query(
    "INSERT INTO reproducciones(cancion_id,usuario_id) VALUES($1, $2)",
    [trackId, currentUser]
  );

  res.json({ msg: "Cancion reproducida" });
};
const getStats = async (req, res) => {
  //Hace consultas de estadisticas

  const graph1 = await pool.query(
    "SELECT nombre, album_id FROM album WHERE (SELECT DATE_PART('day', CURRENT_DATE::date) - DATE_PART('day', fechaAnad ::date)) <= 7 AND (SELECT DATE_PART('year', CURRENT_DATE::date) - DATE_PART('year', fechaAnad ::date)) = 0 AND (SELECT DATE_PART('month', CURRENT_DATE::date) - DATE_PART('month', fechaAnad ::date)) = 0;"
  );
  const graph2 = await pool.query(
    "SELECT artista.nombre, artista.artista_id FROM (SELECT DISTINCT artista_id FROM cancion INNER JOIN reproducciones ON cancion.cancion_id = reproducciones.cancion_id WHERE (SELECT DATE_PART('month', CURRENT_DATE::date) - DATE_PART('month', fechaRep ::date)) <= 3 AND (SELECT DATE_PART('year', CURRENT_DATE::date) - DATE_PART('year', fechaRep ::date)) = 0)as foo INNER JOIN artista ON artista.artista_id = foo.artista_id;"
  );
  const graph3 = await pool.query(
    "SELECT COUNT(*) as cantidadSuscripciones FROM usuario WHERE (SELECT DATE_PART('month', CURRENT_DATE::date) - DATE_PART('month', fechaRegistro ::date)) <= 6 AND (SELECT DATE_PART('year', CURRENT_DATE::date) - DATE_PART('year', fechaRegistro ::date)) <= 0 AND suscripcion=1;"
  );
  const graph4 = await pool.query(
    "SELECT artista.artista_id, artista.nombre, CancionesArtista FROM (SELECT artista_id, COUNT(*) AS CancionesArtista FROM cancion GROUP BY artista_id ORDER BY CancionesArtista DESC LIMIT 3) AS foo INNER JOIN artista ON foo.artista_id=artista.artista_id;"
  );
  const graph5 = await pool.query(
    "SELECT DISTINCT cancion.genero, COUNT (*) AS REPRODUCCIONES FROM (SELECT cancion_id FROM reproducciones) as foo INNER JOIN cancion ON cancion.cancion_id=foo.cancion_id GROUP BY cancion.genero ORDER BY REPRODUCCIONES DESC LIMIT 3;"
  );
  const graph6 = await pool.query(
    "SELECT usuario.correo, REPRODUCCIONES FROM (SELECT usuario_id, COUNT(*) as REPRODUCCIONES FROM reproducciones GROUP BY usuario_id LIMIT 3) as foo INNER JOIN usuario ON usuario.correo=foo.usuario_id;"
  );
  res.json({
    action: {
      type: "STATS_LOADED",
      payload: {
        graph1: graph1.rows,
        graph2: graph2.rows,
        graph3: graph3.rows,
        graph4: graph4.rows,
        graph5: graph5.rows,
        graph6: graph6.rows,
      },
    },
  });
  res.status(200);
};

const esta1 = async (req, res) => {
  const { fecha1, fecha2 } = req.params;

  const graph7 = await pool.query(
    "SELECT date_trunc('week', fechaRep::date) as weekly, COUNT(*) as reproducciones from reproducciones WHERE fechaRep > $1 AND fechaRep < $2 GROUP BY weekly",
    [fecha1, fecha2]
  );
  res.json({
    action: {
      type: "STATS_LOADED",
      payload: {
        graph7: graph7.rows,
      },
    },
  });
};
const esta2 = async (req, res) => {
  const { fecha1, fecha2, limit } = req.params;

  const graph8 = await pool.query(
    "SELECT artista.nombre, COUNT(*) as rep FROM (reproducciones INNER JOIN cancion ON reproducciones.cancion_id=cancion.cancion_id) as foo INNER JOIN artista ON artista.artista_id=foo.artista_id where fechaRep> $1 AND fechaRep < $2 GROUP BY artista.nombre ORDER BY rep DESC LIMIT $3",
    [fecha1, fecha2, limit]
  );

  res.json({
    action: {
      type: "STATS_LOADED",
      payload: {
        graph8: graph8.rows,
      },
    },
  });
};
const esta3 = async (req, res) => {
  const { fecha1, fecha2 } = req.params;

  const graph9 = await pool.query(
    "SELECT cancion.genero, COUNT(*) as rep FROM reproducciones INNER JOIN cancion ON reproducciones.cancion_id=cancion.cancion_id where fechaRep> $1 AND fechaRep < $2 GROUP BY cancion.genero ORDER BY rep DESC",
    [fecha1, fecha2]
  );
  res.json({
    action: {
      type: "STATS_LOADED",
      payload: {
        graph9: graph9.rows,
      },
    },
  });
};
const esta4 = async (req, res) => {
  const { nombre } = req.body;
  console.log(nombre);
  console.log("llegaaaaaaaaaaaaaaaaaa2");
  const graph10 = await pool.query(
    "SELECT foo.nombre, COUNT(*) as rep FROM (reproducciones INNER JOIN cancion ON reproducciones.cancion_id = cancion.cancion_id) as foo INNER JOIN artista ON foo.artista_id = artista.artista_id WHERE artista.nombre = $1 GROUP BY foo.nombre ORDER BY rep DESC",
    [nombre]
  );
  res.json({
    action: {
      type: "STATS_LOADED",
      payload: {
        graph10: graph10.rows,
      },
    },
  });
};
const sim = async (req, res) => {
  const { fecha, num_tracks, num_rep } = req.body;
  console.log(fecha);
  const response = await pool.query("SELECT * FROM sim($1,$2,$3)", [
    fecha,
    num_tracks,
    num_rep,
  ]);
  res.json({ action: { type: "STATS_LOADED", payload: response.rows } });
};
module.exports = {
  getUsers,
  getAlbums,
  getArtists,
  getTracks,
  getUserById,
  getPlaylist,
  getSongsinPlaylist,
  createUser,
  newPlaylist,
  insertSongPlaylist,
  updateTrack,
  updateArtist,
  updateAlbum,
  inacTrack,
  inacSus,
  monitorA,
  monitorB,
  deleteTrack,
  deleteArtist,
  deleteAlbum,
  newArtist,
  newAlbum,
  newTrack,
  search,
  addReproduction,
  getStats,
  getBinnacle,
  getComisions,
  getPersonalComision,
  esta1,
  esta2,
  esta3,
  esta4,
  sim,
  repro,
};
