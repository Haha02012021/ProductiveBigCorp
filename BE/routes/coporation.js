var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

const {db, Size, Safety, Manager, Interior, I_ACTIVSENSE, Exterior, MODEL, Version, Model_Color, Chassis, Engine} = require('../models');
const { route } = require('./factory');

function validateCoporation(req, res, next) {
    const bearer = req.headers['authorization'];
    if(!bearer) {
      res.sendStatus(401);
    }
    const token = bearer.split(" ")[1];
    if(!token) {
      res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      console.log(typeof data.role);
      if(err) {
        res.status(403).json({success: false, message: 'token invalidated'});
      }
      if(data.role == 1) {
        next();
      } else {
        res.status(403).json({success: false, message: 'not able for this role'});
      }
    });
}

router.post('/addManager', validateCoporation, async (req, res) => {
    try {
        const manager = await Manager.create({
            name: req.body.name,
            place: req.body.place,
            account: req.body.account,
            password: req.body.password,
            role: req.body.role,
        })
        res.json({success: true, message: 'manager added', data: manager});
    } catch (err) {
        res.status(500).json({success: false, message: 'error from addManager', error: err});
    }
});

router.post('/newModel', validateCoporation, async (req, res) => {
    try {
        const newModel = await MODEL.create({
            name: req.body.name
        })
        Model_Color.bulkCreate(req.body.colors.map(element => {
            return {
                model_id: newModel.id,
                color_id: element,
            }
        }))
        console.log(req.body.colors[0], req.body.colors[0])
        res.json({data: req.body.colors});
    } catch {
        res.status(500).json({success: false, message: 'error from newModel', error: err});
    }
})

route.post('/newVersion', validateCoporation, async (req, res) => {
    try {
        const newVer = Version.create({
            name: req.body.name,
            model_id: req.body.model_id
        })
        await Chassis.create({
            version_id: newVer.id,
            treo_truoc: req.body.treo_truoc,
            treo_sau: req.body.treo_sau,
            dan_dong: req.body.dan_dong,
            phanh_truoc: req.body.phanh_truo,
            phanh_sau: req.body.phanh_sau,
            tro_luc: req.body.tro_luc,
            lop_xe: req.body.lop_xe,
            d_mam_xe: req.body.d_mam_xe,
        })
        await Engine.create({
            version_id: newVer.id,
            loai_dong_co: req.body.loai_dong_co,
            he_thong_nhien_lieu: req.body.he_thong_nhien_lieu,
            dung_tich_xilanh: req.body.dung_tich_xilanh,
            cong_suat_max: req.body.cong_suat_max,
            momen_max: req.body.momen_max,
            hop_so: req.body.hop_so,
            sport_mode: req.body.sport_mode,
            GVC: req.body.GVC,
            smart_start_stop: req.body.smart_start_stop,
        })
        await Exterior.create({
            version_id: newVer.id,
            chieu_gan: req.body.chieu_gan,
            chieu_xa: req.body.chieu_xa,
            Led_ngay: req.body.Led_ngay,
            auto_bat_tat: req.body.auto_bat_tat,
            can_bang_goc: req.body.can_bang_goc,
            gap_chinh_dien: req.body.gap_chinh_dien,
            auto_gat_mua: req.body.auto_gat_mua,
            den_sau_led: req.body.den_sau_led,
            cua_so_troi: req.body.cua_so_troi,
            ong_xa_kep: req.body.ong_xa_kep,
        })
        await Interior.create({
            version_id: newVer.id,
            chat_lieu: req.body.chat_lieu,
            ghe_lai_dieu_chinh_dien: req.body.ghe_lai_dieu_chinh_dien,
            ghe_lai_nho_vi_tri: req.body.ghe_lai_nho_vi_tri,
            ghe_phu_dieu_chinh_dien: req.body.ghe_phu_dieu_chinh_dien,
            dvd_player: req.body.dvd_player,
            man_hinh_cam_ung: req.body.man_hinh_cam_ung,
            AUX_USB_bluetooth: req.body.AUX_USB_bluetooth,
            so_loa: req.body.so_loa,
            lay_chuyen_so: req.body.lay_chuyen_so,
            phanh_tay_dien_tu: req.body.phanh_tay_dien_tu,
            giu_phanh_tu_dong: req.body.giu_phanh_tu_dong,
            khoi_dong_nut: req.body.khoi_dong_nut,
            ga_tu_dong: req.body.ga_tu_dong,
            dieu_hoa_tu_dong: req.body.dieu_hoa_tu_dong,
            cua_gio_sau: req.body.cua_gio_sau,
            cua_so_dien: req.body.cua_so_dien,
            guong_hau_trung_tam: req.body.guong_hau_trung_tam,
            hud: req.body.hud,
            che_nang_kinh_sau_chinh_dien: req.body.che_nang_kinh_sau_chinh_dien,
            che_nang_cua_so_sau: req.body.che_nang_cua_so_sau,
            tua_tay_hang_ghe_sau: req.body.tua_tay_hang_ghe_sau,
            tua_tay_hang_ghe_sau_co_usb: req.body.tua_tay_hang_ghe_sau_co_usb,
            hang_ghe_2: req.body.hang_ghe_2,
        })
        await I_ACTIVSENSE.create({
            version_id: newVer.id,
            AFS: req.body.AFS,
            HBC: req.body.HBC,
            ALH: req.body.ALH,
            RCTA: req.body.RCTA,
            LDW: req.body.LDW,
            LAS: req.body.LAS,
            phanh_thong_mminh_truoc: req.body.phanh_thong_mminh_truoc,
            phanh_thong_minh_sau: req.body.phanh_thong_minh_sau,
            SBS: req.body.SBS,
            MRCC: req.body.MRCC,
            DAA: req.body.DAA,
            BSM: req.body.BSM,
        })
        await Safety.create({
            version_id: newVer.id,
            so_tui_khi: req.body.so_tui_khi,
            ABS: req.body.ABS,
            EBD: req.body.EBD,
            EBA: req.body.EBA,
            ESS: req.body.ESS,
            DSC: req.body.DSC,
            TCS: req.body.TCS,
            HLA: req.body.HLA,
            chong_sao_chep_khoa: req.body.chong_sao_chep_khoa,
            chong_trom: req.body.chong_trom,
            cam_lui: req.body.cam_lui,
            canh_bao_va_cham_sau: req.body.canh_bao_va_cham_sau,
            canh_bao_va_cham_truoc: req.body.canh_bao_va_cham_truoc,
            cam_360: req.body.cam_360,
            canh_bao_day_an_toan: req.body.canh_bao_day_an_toan,
        })
        await Size.create({
            version_id: newVer.id,
            tong_the: req.body.tong_the,
            do_dai_co_so: req.body.do_dai_co_so,
            ban_kinh_quay: req.body.ban_kinh_quay,
            khoang_sang_gam: req.body.khoang_sang_gam,
            khoi_luong_chuan: req.body.khoi_luong_chuan,
            khoi_luong_co_tai: req.body.khoi_luong_co_tai,
            the_tich_khoang_hanh_ly: req.body.the_tich_khoang_hanh_ly,
            dung_tich_nhien_lieu: req.body.dung_tich_nhien_lieu,
        })
        res.json({success: true, message: 'new version added'})
    } catch (err) {
        res.status(500).json({success: false, message: 'error from newModel', error: err});
    }
})

module.exports = router;