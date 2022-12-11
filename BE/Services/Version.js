const {db, Version, Size, Safety, Interior, I_ACTIVSENSE, Exterior, Chassis, Engine} = require('../models');

var addVersion = async (data) => {
    try {
        const newVer = await Version.create({
            name: data.name,
            model_id: data.model_id
        })
        await Chassis.create({
            version_id: newVer.id,
            treo_truoc: data.treo_truoc,
            treo_sau: data.treo_sau,
            dan_dong: data.dan_dong,
            phanh_truoc: data.phanh_truo,
            phanh_sau: data.phanh_sau,
            tro_luc: data.tro_luc,
            lop_xe: data.lop_xe,
            d_mam_xe: data.d_mam_xe,
        })
        await Engine.create({
            version_id: newVer.id,
            loai_dong_co: data.loai_dong_co,
            he_thong_nhien_lieu: data.he_thong_nhien_lieu,
            dung_tich_xilanh: data.dung_tich_xilanh,
            cong_suat_max: data.cong_suat_max,
            momen_max: data.momen_max,
            hop_so: data.hop_so,
            sport_mode: data.sport_mode,
            GVC: data.GVC,
            smart_start_stop: data.smart_start_stop,
        })
        await Exterior.create({
            version_id: newVer.id,
            chieu_gan: data.chieu_gan,
            chieu_xa: data.chieu_xa,
            Led_ngay: data.Led_ngay,
            auto_bat_tat: data.auto_bat_tat,
            can_bang_goc: data.can_bang_goc,
            gap_chinh_dien: data.gap_chinh_dien,
            auto_gat_mua: data.auto_gat_mua,
            den_sau_led: data.den_sau_led,
            cua_so_troi: data.cua_so_troi,
            ong_xa_kep: data.ong_xa_kep,
        })
        await Interior.create({
            version_id: newVer.id,
            chat_lieu: data.chat_lieu,
            ghe_lai_dieu_chinh_dien: data.ghe_lai_dieu_chinh_dien,
            ghe_lai_nho_vi_tri: data.ghe_lai_nho_vi_tri,
            ghe_phu_dieu_chinh_dien: data.ghe_phu_dieu_chinh_dien,
            dvd_player: data.dvd_player,
            man_hinh_cam_ung: data.man_hinh_cam_ung,
            AUX_USB_bluetooth: data.AUX_USB_bluetooth,
            so_loa: data.so_loa,
            lay_chuyen_so: data.lay_chuyen_so,
            phanh_tay_dien_tu: data.phanh_tay_dien_tu,
            giu_phanh_tu_dong: data.giu_phanh_tu_dong,
            khoi_dong_nut: data.khoi_dong_nut,
            ga_tu_dong: data.ga_tu_dong,
            dieu_hoa_tu_dong: data.dieu_hoa_tu_dong,
            cua_gio_sau: data.cua_gio_sau,
            cua_so_dien: data.cua_so_dien,
            guong_hau_trung_tam: data.guong_hau_trung_tam,
            hud: data.hud,
            che_nang_kinh_sau_chinh_dien: data.che_nang_kinh_sau_chinh_dien,
            che_nang_cua_so_sau: data.che_nang_cua_so_sau,
            tua_tay_hang_ghe_sau: data.tua_tay_hang_ghe_sau,
            tua_tay_hang_ghe_sau_co_usb: data.tua_tay_hang_ghe_sau_co_usb,
            hang_ghe_2: data.hang_ghe_2,
        })
        await I_ACTIVSENSE.create({
            version_id: newVer.id,
            AFS: data.AFS,
            HBC: data.HBC,
            ALH: data.ALH,
            RCTA: data.RCTA,
            LDW: data.LDW,
            LAS: data.LAS,
            phanh_thong_mminh_truoc: data.phanh_thong_mminh_truoc,
            phanh_thong_minh_sau: data.phanh_thong_minh_sau,
            SBS: data.SBS,
            MRCC: data.MRCC,
            DAA: data.DAA,
            BSM: data.BSM,
        })
        await Safety.create({
            version_id: newVer.id,
            so_tui_khi: data.so_tui_khi,
            ABS: data.ABS,
            EBD: data.EBD,
            EBA: data.EBA,
            ESS: data.ESS,
            DSC: data.DSC,
            TCS: data.TCS,
            HLA: data.HLA,
            chong_sao_chep_khoa: data.chong_sao_chep_khoa,
            chong_trom: data.chong_trom,
            cam_lui: data.cam_lui,
            canh_bao_va_cham_sau: data.canh_bao_va_cham_sau,
            canh_bao_va_cham_truoc: data.canh_bao_va_cham_truoc,
            cam_360: data.cam_360,
            canh_bao_day_an_toan: data.canh_bao_day_an_toan,
        })
        await Size.create({
            version_id: newVer.id,
            tong_the: data.tong_the,
            do_dai_co_so: data.do_dai_co_so,
            ban_kinh_quay: data.ban_kinh_quay,
            khoang_sang_gam: data.khoang_sang_gam,
            khoi_luong_chuan: data.khoi_luong_chuan,
            khoi_luong_co_tai: data.khoi_luong_co_tai,
            the_tich_khoang_hanh_ly: data.the_tich_khoang_hanh_ly,
            dung_tich_nhien_lieu: data.dung_tich_nhien_lieu,
        })
        return newVer;
    } catch (err) {
        console.log(err);
    }
}

const getInfo = async (id) => {
    try {
        const versionInfo = await Version.findByPk(id, {include: [
        'chassis', 
        'engine', 
        'exterior',
        'interior',
        'i_activesense',
        'safety',
        'size',
        'model',]});
        return versionInfo;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addVersion,
    getInfo,
}