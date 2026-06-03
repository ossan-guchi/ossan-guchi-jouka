```jsx
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  ShieldCheck,
  MessageCircle,
  RefreshCcw,
  Send,
  Wind,
  Lock,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OssanGuchiJoukaApp() {
  const [text, setText] = useState("");
  const [savedGuchi, setSavedGuchi] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [burning, setBurning] = useState(false);
  const [mode, setMode] = useState("hardworking");
  const [priestMessage, setPriestMessage] = useState("");
  const [fortune, setFortune] = useState(null);

  const priestMessages = [
    "それは災難じゃったな。",
    "今日は無理せんでよい。",
    "人生にはそういう日もある。",
    "上司も昔は怒られておった。",
    "今日は自分を責めるでないぞ。",
    "風呂に入って早く寝るのじゃ。",
    "明日になれば景色も変わる。",
  ];

  const fortunes = [
    { rank: "大吉", message: "今日は何をやってもうまくいく。堂々としてよい。" },
    { rank: "吉", message: "今日は早く寝ろ。大抵の悩みは睡眠不足じゃ。" },
    { rank: "中吉", message: "上司も昔は怒られておった。気にしすぎるでない。" },
    { rank: "小吉", message: "コンビニで少し良いプリンを買うのじゃ。" },
    { rank: "末吉", message: "明日考えればよい。今日は閉店じゃ。" },
    { rank: "凶", message: "今日は仕事のことを忘れるのじゃ。無理は禁物。" },
  ];

  const cleanText = (value) => {
    return value
      .replace(/<[^>]*>?/gm, "")
      .replace(/[{}$]/g, "")
      .slice(0, 500);
  };

  const submitGuchi = () => {
    const cleaned = cleanText(text.trim());
    if (!cleaned) return;
    setSavedGuchi(cleaned);
    setSubmitted(true);
    setBurning(false);
    setPriestMessage("");
    setFortune(null);
  };

  const purifyGuchi = () => {
    if (!savedGuchi) return;

    setBurning(true);
    setPriestMessage("");
    setFortune(null);

    setTimeout(() => {
      const priest =
        priestMessages[Math.floor(Math.random() * priestMessages.length)];

      const omikuji =
        fortunes[Math.floor(Math.random() * fortunes.length)];

      setSavedGuchi("");
      setText("");
      setBurning(false);
      setSubmitted(false);
      setPriestMessage(priest);
      setFortune(omikuji);
    }, 2600);
  };

  const reset = () => {
    setText("");
    setSavedGuchi("");
    setSubmitted(false);
    setBurning(false);
    setPriestMessage("");
    setFortune(null);
  };

  const result = useMemo(() => {
    const base = savedGuchi || text.trim();
    const long = base.length > 120;

    const empathyMap = {
      hardworking:
        "今日もよく耐えました。言いたいことを飲み込んで、ちゃんと大人をやってきたんですね。",
      boss:
        "理不尽な一言は、意外と心に残ります。あなたが弱いのではなく、ちゃんと責任感があるからこそ傷ついたのだと思います。",
      family:
        "家でも職場でも気を張っていると、逃げ場がなくなりますよね。ここでは、かっこつけなくて大丈夫です。",
    };

    const summary = long
      ? "かなり溜め込んでいます。今は解決策よりも、まず感情を外に出して、頭と心の温度を下げる段階です。"
      : "今の愚痴は、我慢・納得できなさ・疲れが混ざったモヤモヤです。まずは外に出せたことが一歩です。";

    const advice =
      "次にやることは1つだけで十分です。今日は『反論する』『解決する』よりも、風呂に入る、寝る、散歩するなど、自分を回復させる行動を優先してください。";

    const cleanse =
      "この愚痴は、神社でお焚き上げします。明日まで持ち越さなくていい。今日のあなたは、今日を生き抜いただけで十分です。";

    return { empathy: empathyMap[mode], summary, advice, cleanse };
  }, [savedGuchi, text, mode]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-stone-950 via-zinc-900 to-orange-950 p-4 md:p-8 text-stone-100">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.45),transparent_35%),radial-gradient(circle_at_bottom,rgba(120,53,15,0.5),transparent_45%)]" />

      <AnimatePresence>
        {burning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 40, opacity: 1, scale: 1 }}
              animate={{ y: -260, opacity: 0, scale: 0.65 }}
              transition={{ duration: 2.6, ease: "easeInOut" }}
              className="max-w-md rounded-2xl border border-orange-300/30 bg-stone-950/80 p-5 text-center shadow-2xl"
            >
              <p className="mb-3 text-sm text-orange-200">奉納中</p>
              <p className="leading-7 text-stone-100">{savedGuchi}</p>
            </motion.div>

            <div className="absolute bottom-0 h-72 w-full overflow-hidden">
              {[...Array(26)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 260, opacity: 0, scale: 0.8 }}
                  animate={{
                    y: -40 - (i % 5) * 20,
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.4, 0.6],
                  }}
                  transition={{
                    duration: 1.6 + (i % 4) * 0.2,
                    repeat: 1,
                    delay: i * 0.035,
                  }}
                  className="absolute bottom-0 rounded-full bg-gradient-to-t from-red-600 via-orange-400 to-yellow-200 blur-[1px]"
                  style={{
                    left: `${8 + (i * 3.7) % 86}%`,
                    width: `${28 + (i % 4) * 14}px`,
                    height: `${90 + (i % 5) * 35}px`,
                  }}
                />
              ))}
            </div>

            {[...Array(18)].map((_, i) => (
              <motion.span
                key={`ash-${i}`}
                initial={{ opacity: 0, y: 120, x: (i % 6) * 70 - 210 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -260,
                  x: (i % 2 === 0 ? 1 : -1) * (80 + i * 3),
                }}
                transition={{ duration: 2.3, delay: i * 0.05 }}
                className="absolute text-xl text-stone-300"
              >
                ＊
              </motion.span>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: [0, 1, 1], y: [30, 0, 0] }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute top-24 text-center"
            >
              <Sparkles className="mx-auto mb-3 h-12 w-12 text-orange-200" />
              <p className="text-2xl font-bold">奉納完了</p>
              <p className="mt-2 text-sm text-stone-300">
                神主おっさんがおみくじを引いています
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-stone-900/70 px-4 py-2 shadow-sm">
            <Flame className="h-4 w-4 text-orange-300" />
            <span className="text-sm font-medium text-orange-100">
              ⛩️ おっさん愚痴神社 ⛩️
            </span>
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight md:text-5xl">
            愚痴は、奉納せよ。
          </h1>
          <p className="text-base text-stone-300 md:text-lg">
            仕事・上司・家族・人生のモヤモヤを奉納し、神主おっさんが供養します。
          </p>
        </motion.div>

        <Card className="rounded-2xl border-orange-200/10 bg-stone-900/80 shadow-2xl backdrop-blur">
          <CardContent className="space-y-5 p-5 md:p-7">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              <button
                onClick={() => setMode("hardworking")}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  mode === "hardworking"
                    ? "bg-orange-500/25 ring-2 ring-orange-300/40"
                    : "bg-stone-800 hover:bg-stone-700"
                }`}
              >
                仕事疲れモード
              </button>
              <button
                onClick={() => setMode("boss")}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  mode === "boss"
                    ? "bg-orange-500/25 ring-2 ring-orange-300/40"
                    : "bg-stone-800 hover:bg-stone-700"
                }`}
              >
                上司・職場モード
              </button>
              <button
                onClick={() => setMode("family")}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  mode === "family"
                    ? "bg-orange-500/25 ring-2 ring-orange-300/40"
                    : "bg-stone-800 hover:bg-stone-700"
                }`}
              >
                家庭・人生モード
              </button>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold">
                <MessageCircle className="h-5 w-5 text-orange-300" />
                今日の愚痴を書く
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(cleanText(e.target.value))}
                placeholder="例：今日も会議で理不尽なことを言われた。言い返したいけど、立場もあるし飲み込んだ…"
                className="min-h-44 w-full resize-none rounded-2xl border border-orange-200/10 bg-stone-950/80 p-4 text-base text-stone-100 outline-none placeholder:text-stone-500 focus:ring-2 focus:ring-orange-300/30"
              />
              <div className="mt-2 flex items-center justify-between text-xs text-stone-400">
                <span>
                  最大500文字。個人名・会社名・住所などは書かないことをおすすめします。
                </span>
                <span>{text.length}/500</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button
                onClick={submitGuchi}
                className="rounded-xl bg-stone-100 px-5 py-6 text-base text-stone-950 hover:bg-white"
              >
                <Send className="mr-2 h-4 w-4" />
                愚痴を入力
              </Button>
              <Button
                onClick={reset}
                variant="outline"
                className="rounded-xl border-stone-600 bg-transparent px-5 py-6 text-base text-stone-100 hover:bg-stone-800"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                書き直す
              </Button>
            </div>
          </CardContent>
        </Card>

        <AnimatePresence>
          {submitted && savedGuchi && !burning && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.45 }}
              className="mt-6 grid gap-4"
            >
              <ResponseCard
                icon={<Flame className="h-5 w-5" />}
                title="受け止めます"
                text={result.empathy}
              />
              <ResponseCard
                icon={<Wind className="h-5 w-5" />}
                title="愚痴の整理"
                text={result.summary}
              />
              <ResponseCard
                icon={<MessageCircle className="h-5 w-5" />}
                title="おっさん向け実用アドバイス"
                text={result.advice}
              />
              <ResponseCard
                icon={<Sparkles className="h-5 w-5" />}
                title="奉納前の言葉"
                text={result.cleanse}
                highlight
              />
            </motion.div>
          )}
        </AnimatePresence>

        {priestMessage && fortune && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 grid gap-4 md:grid-cols-2"
          >
            <Card className="rounded-2xl border-orange-200/20 bg-stone-900/90 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="mb-3 text-6xl">👴</div>
                <h2 className="mb-2 text-xl font-bold text-orange-100">
                  神主おっさん
                </h2>
                <p className="text-lg leading-8 text-stone-200">
                  {priestMessage}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-red-200/20 bg-orange-950/80 shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="mb-3 text-5xl">🎴</div>
                <h2 className="mb-2 text-xl font-bold text-orange-100">
                  今日のおみくじ
                </h2>
                <p className="mb-3 text-4xl font-black text-yellow-200">
                  {fortune.rank}
                </p>
                <p className="text-lg leading-8 text-stone-100">
                  {fortune.message}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <SecurityCard
            icon={<Lock className="h-5 w-5" />}
            title="ブラウザ完結・保存しない設計"
            text="この試作版では、入力された愚痴は画面上の一時状態だけで扱い、サーバー保存・履歴保存をしない前提で設計しています。"
          />
          <SecurityCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="安全対策"
            text="HTMLタグ除去、文字数制限、個人情報を書かない注意表示を実装。公開時はHTTPS、認証、暗号化、ログ最小化、プライバシーポリシーも必須です。"
          />
        </section>

        <p className="mb-28 mt-6 text-center text-xs text-stone-500">
          つらさが強いときは、信頼できる人や専門窓口にも頼ってください。このサービスは医療・心理相談の代替ではありません。
        </p>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-orange-300/20 bg-stone-950/90 p-4 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl">
          <motion.button
            whileTap={{ scale: 0.97, rotate: savedGuchi ? [0, -1, 1, 0] : 0 }}
            onClick={purifyGuchi}
            disabled={!savedGuchi || burning}
            className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-red-700 via-orange-600 to-yellow-500 px-6 py-6 text-xl font-black tracking-wide text-white shadow-2xl shadow-orange-950/60 transition disabled:cursor-not-allowed disabled:opacity-40 md:text-2xl"
          >
            <span className="absolute inset-0 bg-white/0 transition group-hover:bg-white/10" />
            <span className="relative flex items-center justify-center gap-3">
              <Flame className="h-7 w-7" />
              愚痴を奉納する
              <Flame className="h-7 w-7" />
            </span>
            <span className="relative mt-1 block text-xs font-medium text-orange-100 md:text-sm">
              {savedGuchi
                ? "押すと愚痴が炎で燃えて、神主おっさんがおみくじを引きます"
                : "先に『愚痴を入力』を押してください"}
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function ResponseCard({ icon, title, text, highlight = false }) {
  return (
    <Card
      className={`rounded-2xl border-orange-200/10 shadow-lg ${
        highlight ? "bg-orange-950/70" : "bg-stone-900/80"
      }`}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div
            className={`rounded-2xl p-2 ${
              highlight
                ? "bg-orange-500/20 text-orange-200"
                : "bg-stone-800 text-orange-300"
            }`}
          >
            {icon}
          </div>
          <div>
            <h2 className="mb-1 font-bold text-stone-100">{title}</h2>
            <p className="leading-7 text-stone-300">{text}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SecurityCard({ icon, title, text }) {
  return (
    <Card className="rounded-2xl border-emerald-300/10 bg-stone-900/70 shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-emerald-500/10 p-2 text-emerald-300">
            {icon}
          </div>
          <div>
            <h3 className="mb-1 font-bold text-stone-100">{title}</h3>
            <p className="text-sm leading-6 text-stone-400">{text}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```


