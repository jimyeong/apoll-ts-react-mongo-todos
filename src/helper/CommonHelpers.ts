// practise how to get queryString
// http://localhost:3000/dashboard#state=pass-through%20value&access_token=ya29.a0AXooCguNWqGJCjFjsUoTgsYWoBGgdgWTV3aAUyWRk2Q10EgPBSDjQQV5B_p4q0xim8Uyc573L1ReXM3TkfphAH0XhAas2TdPGRaBKB_Ftx-_86kWepPYs_wR_eHH2amPozM44-MgMXipSjukK3fWvbsMsB6A_gn_iwaCgYKAUISARISFQHGX2MiVc2tNxgA2rwosTL0cX22Yg0169&token_type=Bearer&eaxpires_in=3599&scope=https://www.googleapis.com/auth/drive.metadata.readonly
const CommonHelper = {
  queryString: (url: string) => {
    const str1 = url.split("?")[1];
    const params = {} as any;

    if (str1) {
      const pairs = str1.split("&");
      for (const pair of pairs) {
        const [key, value] = pair.split("=");
        params[key] = decodeURIComponent(value.replace(/\+/g, " "));
      }
    }

    return params;
  },
};

export default CommonHelper;
