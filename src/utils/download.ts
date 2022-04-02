
import { request } from '@/utils/request'
import { ElMessage, ElLoading } from 'element-plus'
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

interface ObjectType {

}
type baseUrlType = string | Boolean | undefined 
const baseURL:baseUrlType = import.meta.env.VITE_APP_BASE_API
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL,
  // 超时
  timeout: 10000,
  headers: {'Content-Type': 'application/json;charset=utf-8'}
})
type ParamsType = string | number | Partial<ObjectType>;
let downloadLoadingInstance:any
// 通用下载方法
export function download(url:string, params: ParamsType, filename:string) {
  downloadLoadingInstance = ElLoading.service({ text: "正在下载数据，请稍候", background: "rgba(0, 0, 0, 0.7)", })
  return service.post(url, params, {
    transformRequest: [(params) => { return tansParams(params) }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseType: 'blob'
  }).then(async (data) => {
    const isLogin = await blobValidate(data);
    if (isLogin) {
      const blob = new Blob([data])
      saveAs(blob, filename)
    } else {
      const resText = await data.text();
      const rspObj = JSON.parse(resText);
      const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
      ElMessage.error(errMsg);
    }
    downloadLoadingInstance.close();
  }).catch((r) => {
    console.error(r)
    ElMessage.error('下载文件出现错误，请联系管理员！')
    downloadLoadingInstance.close();
  })
}