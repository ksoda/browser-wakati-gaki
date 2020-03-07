import { builder } from "kuromoji";
import { promisify } from "es6-promisify";
import { Readability } from "moz-readability-node";

const extId = "pnbofikihcljfpncakmppocihbonhegi";

const 自立語 = new Set([
  "名詞",
  "代名詞",
  "動詞",
  "形容詞",
  "形容動詞",
  "連体詞",
  "接続詞",
  "感嘆詞"
]);

export async function main(document) {
  const { content } = new Readability(document).parse();
  const tmp = document.createElement("div");
  tmp.innerHTML = content;
  const r = await tokenize(tmp.textContent);
  // console.debug(r);
  return r;
}

async function tokenize(str: string) {
  const b = builder({ dicPath: `chrome-extension://${extId}/dict/` });
  const tokenizer = await promisify(b.build.bind(b))();
  // TODO: Iterable
  // @ts-ignore
  const feats = tokenizer.tokenize(str).map(e => {
    return { surface_form: e.surface_form, jiritu: 自立語.has(e.pos) };
  });

  let prev = false;
  let acc = [];
  for (const feat of feats) {
    if (!prev && feat.jiritu != prev) acc.push(feat.surface_form);
    else acc[acc.length - 1] += feat.surface_form;
    prev = feat.jiritu;
  }
  // console.debug(feats);
  return acc;
}
