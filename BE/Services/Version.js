const {db, Version, Size, Safety, Interior, Iactivsense, Exterior, Chassis, Engine, MODEL, Color, Image} = require('../models');

var addVersion = async (data) => {
    try {
        const newVer = await Version.create({
            name: data.name,
            model_id: data.model_id
        })
        await Chassis.create({
            version_id: newVer.id,
            he_thong_treo_truoc: data.he_thong_treo_truoc,
            he_thong_treo_sau: data.he_thong_treo_sau,
            he_thong_dan_dong: data.he_thong_dan_dong,
            he_thong_phanh_truoc: data.he_thong_phanh_truoc,
            he_thong_phanh_sau: data.he_thong_phanh_sau,
            he_thong_tro_luc_lai: data.he_thong_tro_luc_lai,
            kich_thuoc_lop_xe: data.kich_thuoc_lop_xe,
            duong_kinh_mam_xe: data.duong_kinh_mam_xe,
        })
        await Engine.create({
            version_id: newVer.id,
            loai_dong_co: data.loai_dong_co, 
            he_thong_nhien_lieu: data.he_thong_nhien_lieu, 
            dung_tich_xilanh: data.dung_tich_xilanh, 
            cong_suat_toi_da: data.cong_suat_toi_da, 
            momen_xoan_cuc_dai: data.momen_xoan_cuc_dai, 
            hop_so: data.hop_so, 
            che_do_the_thao: data.che_do_the_thao, 
            GVC: data.GVC, 
            he_thong_ngung_khoi_dong_thong_minh: data.he_thong_ngung_khoi_dong_thong_minh, 
        })
        await Exterior.create({
            version_id: newVer.id,
            den_chieu_gan: data.den_chieu_gan,
            den_chieu_xa: data.den_chieu_xa,
            den_led_chay_ban_ngay: data.den_led_chay_ban_ngay,
            den_truoc_tu_dong_bat_tat: data.den_truoc_tu_dong_bat_tat,
            den_truoc_tu_dong_can_bang_goc_chieu: data.den_truoc_tu_dong_can_bang_goc_chieu,
            guong_chieu_hau_ngoai_gap_dien_chinh_dien: data.guong_chieu_hau_ngoai_gap_dien_chinh_dien,
            gat_mua_tu_dong: data.gat_mua_tu_dong,
            cum_den_sau_dang_led: data.cum_den_sau_dang_led,
            cua_so_troi: data.cua_so_troi,
            ong_xa_kep: data.ong_xa_kep,
        })
        await Interior.create({
            version_id: newVer.id,
            chat_lieu_noi_that: data.chat_lieu_noi_that,
            ghe_lai_dieu_chinh_dien: data.ghe_lai_dieu_chinh_dien,
            ghe_lai_co_nho_vi_tri: data.ghe_lai_co_nho_vi_tri,
            ghe_phu_dieu_chinh_dien: data.ghe_phu_dieu_chinh_dien,
            dvd_player: data.dvd_player,
            man_hinh_cam_ung: data.man_hinh_cam_ung,
            AUX_USB_bluetooth: data.AUX_USB_bluetooth,
            so_loa: data.so_loa,
            lay_chuyen_so: data.lay_chuyen_so,
            phanh_tay_dien_tu: data.phanh_tay_dien_tu,
            giu_phanh_tu_dong: data.giu_phanh_tu_dong,
            khoi_dong_bang_nut_bam: data.khoi_dong_bang_nut_bam,
            ga_tu_dong: data.ga_tu_dong,
            dieu_hoa_tu_dong: data.dieu_hoa_tu_dong,
            cua_gio_hang_ghe_sau: data.cua_gio_hang_ghe_sau,
            cua_so_chinh_dien: data.cua_so_chinh_dien,
            guong_hau_trung_tam_chong_choi_tu_dong: data.guong_hau_trung_tam_chong_choi_tu_dong,
            hud: data.hud,
            rem_che_nang_kinh_sau_chinh_dien: data.rem_che_nang_kinh_sau_chinh_dien,
            rem_che_nang_cua_so_sau: data.rem_che_nang_cua_so_sau,
            tua_tay_hang_ghe_sau: data.tua_tay_hang_ghe_sau,
            tua_tay_ghe_sau_tich_hop_cong_usb: data.tua_tay_ghe_sau_tich_hop_cong_usb,
            hang_ghe_thu_hai_gap_theo_ti_le_60_40: data.hang_ghe_thu_hai_gap_theo_ti_le_60_40,
        })
        await Iactivsense.create({
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
            ma_hoa_chong_sao_chep_chia_khoa: data.ma_hoa_chong_sao_chep_chia_khoa,
            canh_bao_chong_trom: data.canh_bao_chong_trom,
            camera_lui: data.camera_lui,
            cam_bien_canh_bao_va_cham_phia_sau: data.cam_bien_canh_bao_va_cham_phia_sau,
            cam_bien_canh_bao_va_cham_phia_truoc: data.cam_bien_canh_bao_va_cham_phia_truoc,
            camera_quan_sat_360: data.camera_quan_sat_360,
            canh_bao_that_day_an_toan: data.canh_bao_that_day_an_toan,
        })
        await Size.create({
            version_id: newVer.id,
            kich_thuoc_tong_the: data.kich_thuoc_tong_the,
            chieu_dai_co_so: data.chieu_dai_co_so,
            ban_kinh_quay_vong_toi_thieu: data.ban_kinh_quay_vong_toi_thieu,
            khoang_sang_gam_xe: data.khoang_sang_gam_xe,
            khoi_luong_khong_tai: data.khoi_luong_khong_tai,
            khoi_luong_toan_tai: data.khoi_luong_toan_tai,
            the_tich_khoang_hanh_ly: data.the_tich_khoang_hanh_ly,
            dung_tich_thung_nhien_lieu: data.dung_tich_thung_nhien_lieu,
        })
        return newVer;
    } catch (err) {
        console.log(err);
    }
}

const editVer = async (id, updateInfo) => {
    try {
        const version = await Version.findByPk(id);
        if(!version) {
            throw "version not found"
        }
        if(updateInfo.name) {
            await version.update({name: updateInfo.name});
        }
        if(updateInfo.chassis) {
            await Chassis.update(updateInfo.chassis, {where: {version_id: id}});
        }
        if(updateInfo.engine) {
            await Engine.update(updateInfo.engine, {where: {version_id: id}});
        }
        if(updateInfo.interior) {
            await Interior.update(updateInfo.interior, {where: {version_id: id}});
        }
        if(updateInfo.exterior) {
            await Exterior.update(updateInfo.exterior, {where: {version_id: id}});
        }
        if(updateInfo.iactivsense) {
            await Iactivsense.update(updateInfo.iactivsense, {where: {version_id: id}});
        }
        if(updateInfo.safety) {
            await Safety.update(updateInfo.safety, {where: {version_id: id}});
        }
        if(updateInfo.size) {
            await Size.update(updateInfo.size, {where: {version_id: id}});
        }
        return true;
    } catch (err) {
        console.log(err);
        return null
    }
}

const getInfo = async (id) => {
    try {
        const versionInfo = await Version.findByPk(id, {include: [
            {
              model: Chassis,
              as: "chassis",
              paranoid: false,
            },
            {
              model: Engine,
              as: "engine",
              paranoid: false,
            },
            {
              model: Exterior,
              as: "exterior",
              paranoid: false,
            },
            {
              model: Interior,
              as: "interior",
              paranoid: false,
            },
            {
              model: Iactivsense,
              as: "i_activsense",
              paranoid: false,
            },
            {
              model: Safety,
              as: "safety",
              paranoid: false,
            },
            {
              model: Size,
              as: "size",
              paranoid: false,
            },
            {
                model: MODEL,
                as: 'model',
                attributes: ['id', 'name'],
                include: [
                    {
                        model: Color,
                        as: 'colors',
                        through: {
                            attributes: ['image']
                        },
                        attributes: ['id', 'name', 'code'],
                    },
                    {
                        model: Image,
                        as: 'images',
                        attributes: ['id', 'link'],
                    }
                ]
            },]});
        return versionInfo;
    } catch (err) {
        console.log(err);
    }
}

const getAllVers = async (page) => {
    try {
        const limit = page ? 5 : null;
        const offset = page ? 0 + (page - 1) * limit : 0;
        let count = await Version.count();
        if(page) {
            count = count % limit === 0 ? count / limit : parseInt(count / limit) + 1;
        }
        const versions = await Version.findAll({
            include: [
                {
                    model: MODEL,
                    as: 'model',
                    attributes: ['id', 'name', 'deletedAt'],
                },
            ],
            order: [["createdAt", "desc"]],
            offset: offset,
            limit: limit,
        });
        return { versions: versions, totalPages: count, currentPage: parseInt(page) };
    } catch (err) {
        console.log(err);
        return null;
    }
}

const removeVersion = async (id) => {
    try {
        const version = await Version.findByPk(id);
        if(!version) {
            throw "version not found"
        } else {
            await version.destroy();
            return true;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    addVersion,
    getInfo,
    getAllVers,
    removeVersion,
    editVer,
}