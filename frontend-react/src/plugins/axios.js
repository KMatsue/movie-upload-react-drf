import axios from "axios";
// 再認証処理
// 1.リクエストに成功したら、何も行わない
// 2.リクエストに失敗したら、リフレッシュトークンを取得し、アクセストークンの更新を行う
// 3.アクセストークンの更新に成功したら、再度失敗したAPIリクエストを実行する
// 4.アクセストークンの更新に失敗したら、APIリクエストは実行しない
// 5.再度APIリクエストの実行に失敗したら処理を終了する
// 6.そのほか処理に失敗したらログイン画面にリダイレクトさせる

const axios_instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axios_instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios_instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalConfig = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalConfig.retry
    ) {
      // 認証エラーの場合は、リフレッシュトークンを使ってリトライ
      originalConfig.retry = true;
      // 以下の場合はリトライしない
      // ログイン処理の場合
      if (originalConfig.url === "http://127.0.0.1:8000/api/auth/jwt/create/") {
        return Promise.reject(error);
      }

      axios_instance
        .post("http://127.0.0.1:8000/api/auth/jwt/refresh/", { refresh: "" })
        .then((response) => {
          if (response.status === 200) window.location.href = "/";
          return axios_instance(originalConfig);
        })
        .catch(function (error) {
          console.log(error);
          return Promise.reject(error);
        });
    } else if (error.response && error.response.status !== 422) {
      // 認証エラーまたは業務エラー以外の場合は、適切な画面に遷移
      // return Promise.reject(error);
      window.location.href = "/login";
    } else {
      return Promise.reject(error);
    }
  }
);

export default axios_instance;
