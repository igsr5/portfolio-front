module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["Lato", "sans-serif"], // サイト全体の基本フォント
        japanese: ["sans-serif"],
        tabTitle: ["Arial", "Helvetica", "sans-serif"], // タブ文字
        history: ["Oswald", "sans-serif"],
      },
      fontSize: {
        "ex-sm": "0.9rem", // 14px
        "3-4xl": "2.0rem",
        "4-5xl": "2.7rem",
      },
      colors: {
        navy: "#334455", // 基本のテキストカラー
        grey: {
          DEFAULT: "#96A5A8", // 少し薄めのテキストカラー
          1: "#F4F6F7", // ボーダー、WORK PROCESS のアイコンのところ
          2: "#9a9a9a", // Resume > History のサブタイトルのテキストカラー
          3: "#6A7686", // 背景が白以外の時の文字色
          4: "#D0DADC", // タブタイトル(inactive), 見出しアイコン色
        },
        green: {
          DEFAULT: "#5BCF80",
          link: "#009966", // a タグに使う
        },
        yellow: {
          DEFAULT: "#F8CB30",
          marker: "#FAF46A",
        },
        blue: {
          DEFAULT: "#74BADE",
          light: "#E4F1F6",
        },
        red: "#E25E5B",
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  plugins: [],
};
