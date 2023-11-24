import request from '@/utils/request'

export default {
    //获取医院设置列表
    getHospSetList(current, limit,searchObj){
        return request ({
            url: `/admin/hosp/hospitalSet/findHospSetPage/${current}/${limit}`,
            method: 'post',
            data: searchObj   //使用json形式进行传递
        })
    },
    //根据id删除医院设置信息
    removeById(id) {
        return request({
            url: `/admin/hosp/hospitalSet/${id}`,
            method: 'delete'
        })
    },
    //批量删除
    removeRows(idList) {
        return request({
            url: `/admin/hosp/hospitalSet/batchRemove`,
            method: 'delete',
            data: idList
        })
    },
    //锁定和取消锁定
    lockHospSet(id,status){
        return request({
            url: `/admin/hosp/hospitalSet/lock/${id}/${status}`,
            method: 'put',
        })
    },

    //添加医院设置信息
    saveHospSet(hospset) {
        return request({
            url: `/admin/hosp/hospitalSet/saveHospitalSet`,
            method: 'post',
            data: hospset
        })
    },
    //更新医院设置信息
    updateHospSet(hospset){
        return request({
            url: `/admin/hosp/hospitalSet/updateHospitalSet`,
            method: 'post',
            data: hospset
        })
    }
}
