"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Serv_1 = require("http-rpc/lib/Serv");
const terse_b_1 = require("terse-b/terse-b");
const FileOpsExtra_1 = require("agentg/lib/FileOpsExtra");
const BusLogic_1 = require("./lib/BusLogic");
const editorHandler_1 = require("./handlers/editorHandler");
const adminHandler_1 = require("./handlers/adminHandler");
const uploadHandler_1 = require("./handlers/uploadHandler");
class IntuApp extends Serv_1.Serv {
    constructor(db, origins, configIntu) {
        super(origins, 4 * 1024);
        this.log = new terse_b_1.TerseB(this.constructor.name);
        this.db = db;
        this.configIntu = configIntu;
        this.uploadRoute = new uploadHandler_1.UploadHandler(this.db, this.configIntu);
        const THIZ = this;
        FileOpsExtra_1.VersionNag.isCurrent('intu', BusLogic_1.BusLogic.veri()).then(function (isCurrent_) {
            try {
                if (!isCurrent_)
                    THIZ.log.info('There is a newer version of intu(INTUITION.DEV), please update.');
            }
            catch (err) {
                THIZ.log.warn(err);
            }
        }); // 
    } //()
    start(intuPath) {
        const THIZ = this;
        Serv_1.Serv._expInst.use(function (req, res, next) {
            THIZ.log.info("--req.url", req.url);
            next();
        });
        // await this.db.isSetupDone()
        // order of Handler: api, all intu apps, Web App
        this.log.info('----running');
        //1 API
        const ar = new adminHandler_1.AdminHandler(this.db, this.configIntu);
        const er = new editorHandler_1.EditorHandler(this.db, this.configIntu);
        this.routeRPC('adminAPI', ar);
        this.routeRPC('api', er);
        //Serv._expInst('/upload', this.uploadRoute.upload.bind(this.uploadRoute))
        // get version
        Serv_1.Serv._expInst.get('/iver', (req, res) => {
            return res.send(BusLogic_1.BusLogic.veri);
        });
        // 2 INTU
        this.serveStatic(intuPath, null, null);
    } //()
} //class
exports.IntuApp = IntuApp;
