import instance from "./request";

//一般情况下，接口类型会放到一个文件
// 下面两个TS接口，表示要传的参数
interface ReqUser {
  userId: string
  username: string
  password: string
  email: string
  phone: string
  role: string
  lastLoginTime: string
  lastLoginIp: string
  status: string
  createTime: Date
  updateTime: string
  captcha: string
}

interface ReqCharacter {
  characterId: string
  name: string
  nameEn: string
  role: string
  introduction: string
  profilePicture: string
  userId: string
  pageSize: number
  pageNum: number
}


// 一般情况下响应数据返回的这三个参数，
// 但不排除后端返回其它的可能性，
interface ItypeAPI<T> {
  data: T,//请求的数据，用泛型
  msg: string | null // 返回状态码的信息，如请求成功等
  code: number //返回后端自定义的200，404，500这种状态码
  count: number //返回查询列表的总数量
}


// Res是返回的参数，T是泛型，需要自己定义，返回对数统一管理***
type Res<T> = Promise<ItypeAPI<T>>;


// 获取验证码
export const GetGenerateAPI = (data: string): Res<string> =>
  instance.post("/captcha/generate", data);

// 注册
export const RegistAPI = (data: ReqUser): Res<ReqUser> =>
  instance.post("/user/register", data);

// 登入
export const LogInAPI = (data: ReqUser): Res<ReqUser> =>
  instance.post("/user/logIn", data);

// 登出
export const LogOutAPI = (data: ReqUser): Res<ReqUser> =>
  instance.post("/user/logOut", data);

// 修改用户信息
export const UpdateUserAPI = (data: ReqUser): Res<ReqUser> =>
  instance.post("/user/updateUserInfo", data);

// 修改用户密码
export const ResetPasswordAPI = (data: ReqUser): Res<ReqUser> =>
  instance.post("/user/resetPasswordAPI", data);

// 获取角色信息
export const GetCharacterListAPI = (data: ReqCharacter): Res<ReqCharacter> =>
  instance.post("/character/queryCharacterList", data);

export const GetCharacterAPI = (data: ReqCharacter): Res<ReqCharacter> =>
  instance.post("/character/queryCharacter", data);


// // post请求，有参数,如传用户名和密码
// export const loginAPI = (data: ReqLogin): Res<string> =>
//   instance.post("/admin/login", data);

// // post请求 ，没参数，但要路径传参
// export const StatusAPI = (data: ReqStatus): Res<null> =>
//   instance.post(`/productCategory?ids=${data.id}&navStatus=${data.navStatus}`);


// //  get请求，没参数，
// export const FlashSessionListApi = (): Res<null> =>
//   instance.get("/flashSession/list");

// // get请求，有参数，路径也要传参  (也可能直接在这写类型，不过不建议,大点的项目会维护一麻烦)
// export const ProductCategoryApi = (params: { parentId: number }): any =>
//   instance.get(`/productCategory/list/${params.parentId}`, { params });

// // get请求，有参数，(如果你不会写类型也可以使用any,不过不建议,因为用了之后 和没写TS一样)
// export const AdminListAPI = (params: any): any =>
//   instance.get("/admin/list", { params });
