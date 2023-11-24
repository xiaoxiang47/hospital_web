import request from '@/utils/request'

export default {
    //数据字典设置列表
    getDictList(id){
        return request ({
            url: `/admin/cmn/dict/findAllChildren/${id}`,
            method: 'get'
        })
    }
}
