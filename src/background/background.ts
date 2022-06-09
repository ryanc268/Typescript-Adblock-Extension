import { Rule } from "../interfaces/Rule";

//Triggers on install
chrome.runtime.onInstalled.addListener(async () => {
  const data: string = await fetchEasyListData();
  const adblockRules: Rule[] = buildRules(data);
  writeRuleFile(adblockRules);
});

//fetch the blacklist data
async function fetchEasyListData() {
  const data = await fetch("https://easylist.to/easylist/easylist.txt");
  return data.text();
}

//builds the declarativeNetRequest rules
function buildRules(data: string): Rule[] {
  const rules: Rule[] = [];
  const dataArray: string[] = data.split("\n");
  console.log("Data Size Before Filter: " + dataArray.length);
  const filteredData: string[] = dataArray.filter(
    (d) => d.startsWith("||") || d.startsWith("##")
  );
  console.log("Data Size After Filter: " + filteredData.length);

  filteredData.forEach((value, i) => {
    const rule = {
      id: i + 1,
      priority: 1,
      action: {
        type: "block",
      },
      condition: {
        urlFilter: value,
        resourceTypes: ["image", "xmlhttprequest", "script"],
      },
    };
    rules.push(rule);
  });

  return rules;
}

//writes the declarativeNetRequest json file full of rules
function writeRuleFile(rules: Rule[]) {
  console.log(JSON.stringify(rules));
}
