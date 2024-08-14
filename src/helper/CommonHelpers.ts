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
  shadeColor: (color: string, percent: number) => {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = (R * (100 + percent)) / 100;
    G = (G * (100 + percent)) / 100;
    B = (B * (100 + percent)) / 100;

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    R = Math.round(R);
    G = Math.round(G);
    B = Math.round(B);

    var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
    var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
    var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

    return "#" + RR + GG + BB;
  },
};

export default CommonHelper;
