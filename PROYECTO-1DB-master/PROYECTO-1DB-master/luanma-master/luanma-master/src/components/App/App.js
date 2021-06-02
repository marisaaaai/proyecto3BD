import Login from "../Login/Login";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { configureStore } from "../../store";
import login from "../Login/Login";
import ArtistaHome from "../ArtistaHome/ArtistaHome";
import AdminHome from "../AdminHome/AdminHome";
import Register from "../register/register";
import newSong from "../ArtistaHome/Modificaciones/NewSong/newSong";
import newAlbum from "../ArtistaHome/Modificaciones/NewAlbum/newAlbum";
import newArtist from "../ArtistaHome/Modificaciones/New Artist/newArtist";
import modificarArtistas from "../AdminHome/Modificaciones/Mods/ModificarArtista/modificarArtistas";
import mods from "../AdminHome/Modificaciones/modificaciones";
import modss from "../AdminHome/Modificaciones/Mods/mods";
import modificarAlbum from "../AdminHome/Modificaciones/Mods/ModificarAlbum/modificarAlbum";
import modificarCancion from "../AdminHome/Modificaciones/Mods/ModificarCancion/modificarCancion";
import inactSong from "../AdminHome/Modificaciones/Inact/inact";
import deleteMod from "../AdminHome/Modificaciones/Delete/delete";
import deleteAlbum from "../AdminHome/Modificaciones/Delete/DeleteAlbum/deleteAlbum";
import deleteArtista from "../AdminHome/Modificaciones/Delete/DeleteArtista/deleteArtista";
import deleteSong from "../AdminHome/Modificaciones/Delete/DeleteSong/deleteSongs";
import modArtista from "../ArtistaHome/Modificaciones/modificaciones";
import Reportes from "../AdminHome/reportes/reportes";
import NewPlaylist from "../ComunHome/Playlist/NewPlaylist/newPlaylist";
import playlist from "../ComunHome/Playlist/playlist";
import addSongs from "../ComunHome/Playlist/AddSongs/addSongs";
import monitorA from "../AdminHome/Modificaciones/MonitorA/monitora";
import monitorB from "../AdminHome/Modificaciones/MonitorB/monitorb";
import monitorASB from "../ComunSBHome/MonitorA/monitora";
import monitorBSB from "../ComunSBHome/MonitorB/monitorb";
import monitorANSB from "../ComunNSBHome/MonitorA/monitora";
import monitorBNSB from "../ComunNSBHome/MonitorB/monitorb";
import ComunSBHome from "../ComunSBHome/ComunSBHome";
import ComunNSBHome from "../ComunNSBHome/ComunNSBHome";
import ComunSAHome from "../ComunSAHome/ComunSAHome";
import modSA from "../ComunSAHome/Modificaciones/modificaciones";
import ComunSHome from "../ComunSHome/ComunSHome";
import ComunSB from "../ComunHome/ComunHome";
import ComunNSB from "../ComunHome/ComunHome";
import ComunS from "../ComunHome/ComunHome";
import ComunSA from "../ComunHome/ComunHome";
import playlistSA from "../ComunSAHome/Playlist/playlist";
import newPlaylistSA from "../ComunSAHome/Playlist/NewPlaylist/newPlaylist";
import addSongPlaylistSA from "../ComunSAHome/Playlist/AddSongs/addSongs";
import inactSA from "../ComunSAHome/Modificaciones/Inact/inact";
import playlistSB from "../ComunSBHome/Playlist/playlist";
import newPlaylistSB from "../ComunSBHome/Playlist/NewPlaylist/newPlaylist";
import addSongPlaylistSB from "../ComunSBHome/Playlist/AddSongs/addSongs";
import modssSA from "../ComunSAHome/Modificaciones/Mods/mods";
import playlistS from "../ComunSHome/Playlist/playlist";
import newPlaylistS from "../ComunSHome/Playlist/NewPlaylist/newPlaylist";
import addSongPlaylistS from "../ComunSHome/Playlist/AddSongs/addSongs";
import modCSA from "../ComunSAHome/Modificaciones/Mods/ModificarCancion/modificarCancion";
import modASA from "../ComunSAHome/Modificaciones/Mods/ModificarAlbum/modificarAlbum";
import inactSusSA from "../ComunSAHome/Modificaciones/InactSus/InactSus";
import reportesSB from "../ComunSBHome/reportes/reportes";
import reportesNSB from "../ComunNSBHome/reportes/reportes";
import ComunNSHome from "../ComunNS/ComunNSHome";
import comunNS from "../ComunHome/ComunHome";
import comunNSAHome from "../ComunNSAHome/ComunNSAHome";
import comunNSA from "../ComunHome/ComunHome";
import modNSA from "../ComunNSAHome/Modificaciones/modificaciones";
import modssNSA from "../ComunNSAHome/Modificaciones/Mods/mods";
import modCNSA from "../ComunNSAHome/Modificaciones/Mods/ModificarCancion/modificarCancion";
import modANSA from "../ComunNSAHome/Modificaciones/Mods/ModificarAlbum/modificarAlbum";
import inactNSA from "../ComunNSAHome/Modificaciones/Inact/inact";
import inactSusNSA from "../ComunNSAHome/Modificaciones/InactSus/InactSus";
import bitacora from "../AdminHome/Bitacora/bitacoraa";
import bitacoraa from "../AdminHome/Bitacora/bitacora";
import comisiones from "../AdminHome/Comisiones/comisioness";
import comisioness from "../AdminHome/Comisiones/comisiones";
import newstats from "../../components/AdminHome/NewStats/newstats";
import esta1 from "../AdminHome/NewStats/esta1/esta1";
import result1 from "../AdminHome/NewStats/result1/result";
import esta2 from "../AdminHome/NewStats/esta2/esta2";
import result2 from "../AdminHome/NewStats/result2/result";
import esta3 from "../AdminHome/NewStats/esta3/esta3";
import result3 from "../AdminHome/NewStats/result3/result";
import esta4 from "../AdminHome/NewStats/esta4/esta4";
import result4 from "../AdminHome/NewStats/result4/result";
import comisionp from "../ArtistaHome/Comision/comision";
import comisionr from "../ArtistaHome/result/result";
import sim from "../AdminHome/Simulaciones/sim";
import mongo from "../AdminHome/Mongo/mongo";
const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route
          path="/artista-home/comisions/result"
          exact
          component={comisionr}
        />
        <Route path="/admin-home/mongo" exact component={mongo} />
        <Route path="/admin-home/sim" exact component={sim} />
        <Route path="/artista-home/comisions" exact component={comisionp} />
        <Route path="/admin-home/bitacoraa" exact component={bitacoraa} />
        <Route path="/admin-home/comisiones" exact component={comisiones} />
        <Route path="/admin-home/comisioness" exact component={comisioness} />
        <Route path="/admin-home/newstats/esta1" exact component={esta1} />
        <Route
          path="/admin-home/newstats/esta7/result"
          exact
          component={result1}
        />
        <Route path="/admin-home/newstats/esta2" exact component={esta2} />
        <Route
          path="/admin-home/newstats/esta8/result"
          exact
          component={result2}
        />
        <Route path="/admin-home/newstats/esta3" exact component={esta3} />
        <Route
          path="/admin-home/newstats/esta9/result"
          exact
          component={result3}
        />
        <Route path="/admin-home/newstats/esta4" exact component={esta4} />
        <Route
          path="/admin-home/newstats/esta10/result"
          exact
          component={result4}
        />
        <Route path="/admin-home/newstats" exact component={newstats} />
        <Route path="/admin-home/bitacora" exact component={bitacora} />
        <Route path="/comunNS-home" exact component={ComunNSHome} />
        <Route path="/comunNSA-home" exact component={comunNSAHome} />
        <Route path="/comunNS" exact component={comunNS} />
        <Route path="/comunNSA" exact component={comunNSA} />
        <Route path="/comunSB-home/stats" exact component={reportesSB} />
        <Route path="/comunNSB-home/stats" exact component={reportesNSB} />
        <Route path="/comunSA-home/mod/delete" exact component={inactSusSA} />
        <Route path="/comunNSA-home/mod/delete" exact component={inactSusNSA} />

        <Route path="/comunSA-home/mod/mod-album" exact component={modASA} />
        <Route path="/comunSA-home/mod/mod-cancion" exact component={modCSA} />
        <Route path="/comunNSA-home/mod/mod-album" exact component={modANSA} />
        <Route
          path="/comunNSA-home/mod/mod-cancion"
          exact
          component={modCNSA}
        />
        <Route path="/comunSA-home/mod/modss" exact component={modssSA} />
        <Route path="/comunNSA-home/mod/modss" exact component={modssNSA} />
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin-home" exact component={AdminHome} />
        <Route path="/comunSB-home" exact component={ComunSBHome} />
        <Route path="/comunNSB-home" exact component={ComunNSBHome} />
        <Route path="/comunSA-home" exact component={ComunSAHome} />
        <Route path="/comunSA-home/mod" exact component={modSA} />
        <Route path="/comunNSA-home/mod" exact component={modNSA} />
        <Route path="/comunS-home" exact component={ComunSHome} />
        <Route path="/comunSB" exact component={ComunSB} />
        <Route path="/comunNSB" exact component={ComunNSB} />
        <Route path="/comunS" exact component={ComunS} />
        <Route path="/comunSA" exact component={ComunSA} />
        <Route path="/comunSA-home/playlist" exact component={playlistSA} />
        <Route
          path="/comunSA-home/playlist/newplaylist"
          exact
          component={newPlaylistSA}
        />
        <Route
          path="/comunSA-home/playlist/addSong"
          exact
          component={addSongPlaylistSA}
        />
        <Route path="/comunSB-home/playlist" exact component={playlistSB} />
        <Route
          path="/comunSB-home/playlist/newplaylist"
          exact
          component={newPlaylistSB}
        />
        <Route
          path="/comunSB-home/playlist/addSong"
          exact
          component={addSongPlaylistSB}
        />
        <Route path="/comunS-home/playlist" exact component={playlistS} />
        <Route
          path="/comunS-home/playlist/newplaylist"
          exact
          component={newPlaylistS}
        />
        <Route
          path="/comunS-home/playlist/addSong"
          exact
          component={addSongPlaylistS}
        />
        <Route path="/artista-home" exact component={ArtistaHome} />
        <Route path="/artista-home/mod" exact component={modArtista} />
        <Route path="/artista-home/mod/new-song" component={newSong} />
        <Route path="/artista-home/mod/new-album" component={newAlbum} />
        <Route path="/artista-home/mod/new-artist" component={newArtist} />
        <Route
          path="/admin-home/mod/mod-artist"
          component={modificarArtistas}
        />
        <Route path="/admin-home/mod" component={mods} />
        <Route path="/admin-home/mod/modss" exact component={modss} />
        <Route path="/admin-home/mod/mod-album" component={modificarAlbum} />
        <Route
          path="/admin-home/mod/mod-cancion"
          component={modificarCancion}
        />
        <Route path="/admin-home/mod/inact-song" component={inactSong} />
        <Route path="/admin-home/mod/monitora" component={monitorA} />
        <Route path="/admin-home/mod/monitorb" component={monitorB} />
        <Route path="/comunSB-home/mod/monitora" component={monitorASB} />
        <Route path="/comunSB-home/mod/monitorb" component={monitorBSB} />
        <Route path="/comunNSB-home/mod/monitora" component={monitorANSB} />
        <Route path="/comunNSB-home/mod/monitorb" component={monitorBNSB} />
        <Route path="/admin-home/mod/delete" component={deleteMod} />
        <Route path="/admin-home/mods/delete/album" component={deleteAlbum} />
        <Route
          path="/admin-home/mods/delete/artist"
          component={deleteArtista}
        />
        <Route path="/admin-home/mods/delete/song" component={deleteSong} />
        <Route path="/admin-home/stats" component={Reportes} />
        <Route path="/comun-home/new-playlist" component={NewPlaylist} />
        <Route path="/comun-home/playlist" component={playlist} />
        <Route path="/comun-home/add-songsPlaylist" component={addSongs} />
        <Route path="/comunSA-home/mod/inact-song" component={inactSA} />
        <Route path="/comunNSA-home/mod/inact-song" component={inactNSA} />
        <Route path="/login" component={login} />
      </Router>
    </Provider>
  );
}

export default App;
