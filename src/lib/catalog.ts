import { slugify } from "./utils";
import { volumeTiers, type PriceTiers } from "./pricing";

/**
 * Hidden OFF switch. Add a compound's exact catalog name to fold its table
 * into the Out of stock pill. Remove the name to turn it back on.
 */
export const OUT_OF_STOCK_COMPOUNDS = new Set<string>(["L-Carnitine", "Selank"]);


export type CategoryId =
  | "metabolic"
  | "recovery"
  | "bioregulator"
  | "longevity"
  | "growth"
  | "sexual"
  | "neuro"
  | "aesthetic"
  | "immune"
  | "fatloss"
  | "muscle"
  | "support"
  | "specialty";

export type Product = {
  id: string;
  name: string;
  pack: string;
  category: CategoryId;
  prices: PriceTiers | null;
  specialOrder?: boolean;
  isNew?: boolean;
  outOfStock?: boolean;
  excludeFromVolume?: boolean;
  unitNote?: string;
  headerNote?: string;
  tags?: string[];
};

export type Category = {
  id: CategoryId;
  label: string;
  short: string;
  blurb: string;
  goal: string;
  tags: string[];
  searchTags?: string[];
  accent: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "metabolic",
    label: "Weight Management & Metabolic Research",
    short: "Metabolic",
    blurb: "For research on fat, appetite, blood sugar, and how the body uses energy.",
    goal: "Weight & metabolism",
    tags: ["fat", "appetite", "blood sugar", "energy use", "body composition", "metabolic"],
    searchTags: [
      "weight loss",
      "obesity",
      "glp-1",
      "glp1",
      "gip",
      "incretin",
      "diabetes",
      "glucose",
      "insulin",
      "amylin",
    ],
    accent: "#156f7a",
  },
  {
    id: "recovery",
    label: "Recovery & Tissue Research",
    short: "Recovery",
    blurb: "For research on tissue repair — tendons, gut lining, wounds, and local inflammation.",
    goal: "Recovery & repair",
    tags: ["repair", "tissue", "inflammation"],
    searchTags: ["healing", "injury", "tissue repair"],
    accent: "#1b6b4a",
  },
  {
    id: "bioregulator",
    label: "Tissue Bioregulator Research",
    short: "Bioregulators",
    blurb: "Short peptides studied as signals for one organ at a time, such as lung, heart, or cartilage.",
    goal: "Organ-specific",
    tags: ["organ-specific", "khavinson", "cytogen"],
    searchTags: ["bioregulator", "organ peptide"],
    accent: "#3a5f8f",
  },
  {
    id: "longevity",
    label: "Longevity & Cellular Research",
    short: "Longevity",
    blurb: "For research on how cells age, handle stress, and keep mitochondria working well.",
    goal: "Longevity",
    tags: ["aging", "cell survival", "cytoprotection"],
    searchTags: ["longevity", "anti aging", "anti-aging", "senolytic"],
    accent: "#5d4e8c",
  },
  {
    id: "growth",
    label: "Growth Hormone & Secretagogue Research",
    short: "GH & Secretagogues",
    blurb: "Peptides related to the body’s own growth-hormone pulse and IGF-1 signal.",
    goal: "Growth hormone",
    tags: ["GH pulse", "secretagogue"],
    searchTags: ["growth hormone", "secretagogue"],
    accent: "#1f4e79",
  },
  {
    id: "muscle",
    label: "Muscle & Performance Research",
    short: "Muscle",
    blurb: "For research on muscle size, the myostatin pathway, and oxygen-carrying red cells.",
    goal: "Muscle & performance",
    tags: ["muscle size", "performance"],
    searchTags: ["muscle", "hypertrophy", "lean mass", "performance"],
    accent: "#8e3b4a",
  },
  {
    id: "sexual",
    label: "Sexual Health & Fertility Research",
    short: "Sexual & Fertility",
    blurb: "For research on fertility and the pituitary–gonad axis.",
    goal: "Sexual health",
    tags: ["pituitary", "gonadotropin"],
    searchTags: ["ivf", "gonadotropin"],
    accent: "#8a4568",
  },
  {
    id: "neuro",
    label: "Neuroscience & Sleep Research",
    short: "Nootropics & Sleep",
    blurb: "For research on memory, mood, sleep, and the stress axis.",
    goal: "Cognition & sleep",
    tags: ["memory", "mood", "nootropic"],
    searchTags: ["brain", "cognition", "nootropic"],
    accent: "#3d4a8a",
  },
  {
    id: "aesthetic",
    label: "Aesthetic, Hair & Skin Research",
    short: "Aesthetic",
    blurb: "For research on skin, collagen, hair follicles, and pigment.",
    goal: "Skin, hair & aesthetic",
    tags: ["skin", "aesthetic"],
    searchTags: ["cosmetic"],
    accent: "#7d5b86",
  },
  {
    id: "immune",
    label: "Immune & Thymic Research",
    short: "Immune",
    blurb: "For research on innate defense, the thymus, and antimicrobial peptides.",
    goal: "Immune",
    tags: ["immune", "thymus", "innate defense"],
    searchTags: ["immune", "thymus"],
    accent: "#2f6d4f",
  },
  {
    id: "fatloss",
    label: "Fat Loss & Body Composition Research",
    short: "Fat Loss",
    blurb: "For research on localized fat and body composition.",
    goal: "Body composition",
    tags: ["localized fat", "body composition", "fat loss"],
    searchTags: ["lipolysis", "body composition"],
    accent: "#c45c4a",
  },
  {
    id: "support",
    label: "Reconstitution & Support Materials",
    short: "Support",
    blurb: "Water and solvents used to dissolve a vial. These are not peptides.",
    goal: "Lab support",
    tags: ["sterile water", "solvent", "reconstitute", "not a peptide"],
    searchTags: ["reconstitution", "solvent", "diluent", "water for injection"],
    accent: "#4a6275",
  },
  {
    id: "specialty",
    label: "Specialty Research Compounds",
    short: "Specialty",
    blurb: "Useful tools that do not sit neatly in one organ system.",
    goal: "Specialty",
    tags: ["niche pathway", "growth-factor", "matrix"],
    searchTags: ["specialty", "custom", "research tool"],
    accent: "#3d4c5c",
  },
];

export function categoryById(id: CategoryId): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

const COMPOUND_SEARCH_TAGS: Record<string, string[]> = {
  Retatrutide: [
    "reta", "glp-3", "glp3", "triple agonist", "gip", "glucagon", "ly3437943",
    "weight", "appetite", "glucose", "incretin", "obesity research",
  ],
  Tirzepatide: [
    "tirz", "mounjaro", "zepbound", "dual agonist", "glp-1", "gip", "ly3298176",
    "weight", "appetite", "glucose", "incretin",
  ],
  Semaglutide: [
    "sema", "ozempic", "wegovy", "rybelsus", "glp-1", "glp1", "nn9535",
    "weight", "appetite", "glucose", "incretin",
  ],
  Mazdutide: ["glp-1", "glucagon", "dual agonist", "ibi362", "weight", "appetite", "glucose"],
  Survodutide: ["glp-1", "glucagon", "dual agonist", "bi 456906", "weight", "liver", "glucose"],
  Cagrilintide: ["cagri", "amylin", "amycretin", "satiety", "appetite"],
  "Cagrilintide + Semaglutide": ["cagri", "sema", "cagrisema", "cagsema", "cs", "cagrilintide", "semaglutide", "amylin", "glp-1", "combo", "satiety", "appetite"],
  Liraglutide: ["lira", "victoza", "saxenda", "glp-1", "appetite", "glucose"],
  Dulaglutide: ["trulicity", "glp-1", "dula", "glucose", "incretin"],
  AOD9604: ["aod", "hgh fragment", "fat loss fragment", "176-191", "lipolysis", "fat metabolism"],
  "Lemon Bottle": [
    "fat dissolve", "lipolysis", "ppc", "deoxycholate", "body contour", "10ml", "bottle",
    "localized fat", "phosphatidylcholine",
  ],
  "HGH Fragment 176-191": ["hgh frag", "frag 176", "176-191", "aod9604", "fragment", "lipolysis", "fat metabolism"],
  "HGH Fragment 17-23": ["hgh frag", "frag 17-23", "fragment", "lipolysis"],
  "SLU-PP-322": ["err agonist", "exercise mimetic", "slu", "energy expenditure", "mitochondria"],
  "BPC-157": [
    "bpc", "body protection compound", "bepecin", "gut", "tendon", "repair",
    "angiogenesis", "wound", "joint", "stomach", "intestine",
  ],
  "TB-500": [
    "tb500", "thymosin beta 4", "tb4", "tβ4", "wound", "actin", "mobility",
    "recovery", "soft tissue",
  ],
  "BPC 5mg + TB 5mg": ["bpc", "tb500", "wolverine", "blend", "combo", "repair", "joint", "tendon"],
  "BPC 10mg + TB 10mg": ["bpc", "tb500", "wolverine", "blend", "combo", "repair", "joint", "tendon"],
  "BPC-157 + TB-500": ["bpc", "tb500", "wolverine", "blend", "combo", "repair", "joint", "tendon"],
  GLOW70: ["glow", "bpc", "tb500", "ghk", "blend", "skin", "repair", "collagen"],
  KLOW80: ["klow", "kpv", "bpc", "tb500", "ghk", "blend", "inflammation", "skin", "gut"],
  KPV: ["alpha msh", "inflammation", "gut", "melanocortin", "intestine"],
  "B7-33": ["relaxin", "rxfp1", "fibrosis", "heart", "vascular"],
  TBF: ["thymosin", "fragment", "repair", "immune"],
  Bronchogen: ["lung", "respiratory", "khavinson", "bronchi", "airway", "pulmonary"],
  Cardiogen: ["heart", "cardiac", "khavinson", "myocardium", "cardiovascular"],
  Crystagen: ["immune", "khavinson", "lymphoid", "thymus"],
  Cortagen: ["cortex", "brain", "khavinson", "cognition", "cns"],
  Cartalax: ["cartilage", "joint", "khavinson", "connective tissue", "chondrocyte"],
  Epithalon: ["epitalon", "epithalamin", "telomere", "pineal", "circadian", "aging"],
  "NAD+": ["nad", "nicotinamide", "nadh", "niagen", "sirtuin", "cellular energy", "mitochondria"],
  "MOTS-c": ["motsc", "mitochondrial", "exercise mimetic", "metabolic", "ampk"],
  "SS-31": ["elamipretide", "bendavia", "mitochondria", "cardiolipin", "heart"],
  Aicar: ["acadesine", "ampk", "exercise mimetic", "endurance"],
  "FOXO4-DRI": ["foxo4", "senolytic", "dri", "senescent cells", "aging"],
  Humanin: ["mitochondria", "hng", "cytoprotection", "cell survival"],
  "PNC-27": ["p53", "hdm2", "membrane"],
  "CJC-1295 (No DAC)": ["cjc", "mod grf", "mod grf 1-29", "no dac", "ghrh", "gh pulse", "pituitary"],
  "CJC-1295 (With DAC)": ["cjc", "cjc dac", "with dac", "ghrh", "gh pulse", "pituitary"],
  "CJC-1295 + Ipamorelin": ["cjc", "ipa", "stack", "combo", "ghrh", "ghrp", "gh pulse"],
  Ipamorelin: ["ipa", "ghrp", "secretagogue", "gh pulse", "ghrelin", "pituitary"],
  Tesamorelin: ["egrifta", "ghrh", "visceral fat", "gh pulse", "abdominal fat"],
  "GHRP-2": ["ghrp2", "pralmorelin", "secretagogue", "ghrelin", "gh pulse"],
  "GHRP-6": ["ghrp6", "secretagogue", "ghrelin", "gh pulse", "appetite"],
  "Hexarelin Acetate": ["hexarelin", "examorelin", "ghrp", "gh pulse", "cardiac"],
  Sermorelin: ["ghrh 1-29", "ghrh", "gh pulse", "pituitary"],
  "HGH 191AA": ["hgh", "somatropin", "growth hormone", "191aa", "rhgh", "igf-1", "stature"],
  "MK-677": ["mk677", "ibutamoren", "ghrelin", "oral", "gh pulse", "appetite"],
  "Tesamorelin + Ipamorelin": ["tesa", "ipa", "stack", "combo", "visceral fat", "gh pulse"],
  "PEG-MGF": ["pegmgf", "mechano growth factor", "peginated mgf", "muscle repair", "hypertrophy"],
  "IGF-DES": ["igf des", "des 1-3", "igf1", "local igf", "muscle"],
  PT141: ["pt-141", "bremelanotide", "vyleesi", "libido", "arousal", "melanocortin"],
  "Kisspeptin-10": ["kisspeptin", "kp10", "metastin", "gnrh", "fertility", "puberty axis", "lh"],
  "Oxytocin Acetate": ["oxytocin", "pitocin", "bonding", "uterine", "lactation research"],
  HCG: ["hcg", "human chorionic gonadotropin", "pregnyl", "ovidrel", "lh", "fertility", "gonadal"],
  Gonadorelin: ["gnrh", "lhrh", "factrel", "pituitary", "fertility"],
  "Gonadorelin Acetate": ["gnrh", "lhrh", "pituitary", "fertility"],
  "Triptorelin Acetate": ["triptorelin", "gnrh agonist", "decapeptyl", "pituitary"],
  Selank: ["tuftsin", "anxiety", "anxiolytic", "stress", "immune-neuro"],
  Semax: ["acth fragment", "nootropic", "focus", "bdnf", "cognition"],
  DSIP: ["delta sleep", "sleep peptide", "insomnia", "sleep"],
  Dihexa: ["angiotensin iv", "pnb-0408", "memory", "synapse", "cognition"],
  Cerebrolysin: ["brain hydrolysate", "neurotrophic", "cognition", "stroke research"],
  "Orexin A": ["hypocretin 1", "wakefulness", "narcolepsy", "arousal", "sleep-wake"],
  "Orexin B": ["hypocretin 2", "wakefulness", "sleep-wake"],
  P21: ["cntf", "nootropic", "neurogenesis", "memory"],
  Adamax: ["semax analog", "nootropic", "focus", "cognition"],
  "PE-22-28": ["spadin", "trek1", "mood"],
  Pinealon: ["pineal", "cortexin", "cognition", "circadian"],
  Melatonin: ["sleep", "pineal", "circadian", "jet lag research"],
  "ACTH 1-39": ["acth", "corticotropin", "adrenal", "cortisol axis"],
  "GHK-Cu": ["ghk", "copper peptide", "skin", "hair", "collagen", "remodeling", "wound"],
  "Snap-8": ["snap8", "acetyl octapeptide", "wrinkle", "botox alternative", "expression lines", "snap-25"],
  "Melanotan II": ["mt2", "mt-2", "tanning", "melanotan 2", "pigment", "melanocortin", "uv"],
  "Melanotan I": ["mt1", "afamelanotide", "scenesse", "tanning", "pigment", "photoprotection"],
  Glutathione: ["gsh", "antioxidant", "skin brightening", "redox", "pigment", "liver"],
  Matrixyl: ["palmitoyl pentapeptide", "collagen", "wrinkle", "ecm", "matrikine"],
  "AHK-Cu": ["ahk", "copper peptide", "hair", "follicle"],
  "PTD-DBM": ["wnt", "hair follicle", "cxxc5", "hair"],
  "Botulinum Toxin": ["botox", "btxa", "onabotulinumtoxin", "wrinkle", "neuromuscular", "snap-25"],
  "Thymosin alpha 1": ["tα1", "ta1", "thymalfasin", "zadaxin", "t-cell", "innate", "thymus"],
  Thymalin: ["thymus", "thymogen", "immune aging", "t-cell"],
  "KK-37": ["cathelicidin", "antimicrobial", "innate defense"],
  "CBL-514": ["cbl", "fat dissolve", "injectable fat", "adipocyte", "localized fat"],
  "L-Carnitine": ["carnitine", "l carnitine", "fat metabolism", "fatty acid transport", "energy"],
  "Lipo-C": ["lipo c", "lipotropic", "micc", "carnitine", "liver", "choline"],
  "5-Amino-1MQ": ["nnmt", "1mq", "amino1mq", "nad", "energy expenditure"],
  Adipotide: ["ftpp", "prohibitin", "targeted fat", "adipose vasculature"],
  "FST 344": ["follistatin 344", "fst344", "myostatin", "muscle growth"],
  "GDF-8": ["myostatin", "gdf8", "muscle growth"],
  "IGF-1 LR3": ["igf1", "igf-1", "long r3", "lr3", "hypertrophy", "anabolic"],
  MGF: ["mechano growth factor", "igf-1ec", "muscle repair", "hypertrophy"],
  "ACE-031": ["activin", "myostatin inhibitor", "muscle growth"],
  Follistatin: ["fst", "myostatin", "muscle growth"],
  EPO: ["erythropoietin", "epoetin", "red blood cells", "oxygen", "hematopoiesis"],
  "Bacteriostatic Water": ["bac water", "bac", "bw", "benzyl alcohol", "reconstitute", "diluent"],
  "Acetic Water": ["acetic acid", "0.6%", "solvent", "reconstitute", "acidic peptides"],
  "Sterile Water": ["wfi", "water for injection", "swfi", "reconstitute"],
  "B-12": ["b12", "cobalamin", "cyanocobalamin", "methylcobalamin", "vitamin", "methylation"],
  "ARA 290": ["cibinetide", "ara290", "innate repair", "neuropathy", "epo analog"],
  VIP: ["vasoactive intestinal peptide", "aviptadil", "pulmonary", "lung", "immune"],
  Dermorphin: ["opioid peptide", "mu agonist", "analgesia research", "pain research"],
  "TGF-DES": ["tgf", "transforming growth", "matrix", "ecm"],
  HMG: [
    "hmg", "hMG", "menotropin", "menotrophin", "hmg-hp", "human menopausal gonadotropin",
    "fsh", "lh", "menopur", "fertility", "75iu", "75 iu", "gonadotropin",
  ],
  "LL-37": [
    "ll37", "ll 37", "cathelicidin", "camp", "hcap18", "hcap-18", "antimicrobial",
    "antimicrobial peptide", "amp", "innate defense", "innate immunity",
  ],
  "Etelcalcetide Hydrochloride": [
    "etelcalcetide", "etelcalcetide hcl", "etelcalcetide hydrochloride", "hcl",
    "parsabiv", "amg416", "amg-416", "velcalcetide", "calcimimetic", "pth",
    "calcium", "1g", "2g", "1 g", "2 g", "gram",
  ],
};

const COMPOUND_ABBREVS: Record<string, string[]> = {
  Retatrutide: ["rt", "reta", "rtt", "ly3437943"],
  Tirzepatide: ["tz", "tzp", "tirz", "triz", "ly3298176"],
  Semaglutide: ["sm", "sg", "sema", "sem", "smg", "nn9535"],
  Mazdutide: ["maz", "ibi362", "ibi-362"],
  Survodutide: ["survo", "sur", "bi456906", "bi-456906"],
  Cagrilintide: ["cagri", "cag", "cagril"],
  "Cagrilintide + Semaglutide": ["cagrisema", "cs", "cagri", "sema", "cagsema", "cagril"],
  Liraglutide: ["lira", "lrg", "nn2211"],
  Dulaglutide: ["dula", "dul", "ly2189265"],
  AOD9604: ["aod", "aod96", "aod-9604", "9604"],
  "Lemon Bottle": ["lb", "lemon", "ppc"],
  "HGH Fragment 176-191": ["hghfrag", "frag176", "f176", "frag", "hgh-f", "176191"],
  "HGH Fragment 17-23": ["frag1723", "f1723", "1723"],
  "SLU-PP-322": ["slu", "slupp322", "slu-pp", "slupp"],
  "BPC-157": ["bpc", "bpc157", "bpc-157", "157"],
  "TB-500": ["tb500", "tb5", "tb4", "tb-500", "tb-4", "thymosinb4"],
  "BPC 5mg + TB 5mg": ["wolverine", "bpc", "tb500", "bpc5tb5", "bpc/tb", "bpctb"],
  "BPC 10mg + TB 10mg": ["wolverine", "bpc", "tb500", "bpc10tb10", "bpc/tb", "bpctb"],
  "BPC-157 + TB-500": ["wolverine", "bpc", "tb500", "bpctb", "bpc/tb", "bpc157tb500"],
  GLOW70: ["glow", "glow70", "glow-70"],
  KLOW80: ["klow", "klow80", "klow-80"],
  KPV: ["kpv", "kpv-"],
  "B7-33": ["b733", "b7", "b7-33"],
  TBF: ["tbf"],
  Bronchogen: ["broncho", "brp"],
  Cardiogen: ["cardio", "crg"],
  Crystagen: ["crysta", "cyg"],
  Cortagen: ["corta", "ctg"],
  Cartalax: ["carta", "ctl"],
  Epithalon: ["epi", "epitalon", "epithalamin", "epithalamine"],
  "NAD+": ["nad", "nadh", "nadplus"],
  "MOTS-c": ["motsc", "mots", "mots-c"],
  "SS-31": ["ss31", "ss-31", "elamipretide"],
  Aicar: ["aicar", "aic"],
  "FOXO4-DRI": ["foxo4", "foxo", "foxo4dri"],
  Humanin: ["hng", "humanin", "hn"],
  "PNC-27": ["pnc27", "pnc", "pnc-27"],
  "CJC-1295 (No DAC)": ["cjc", "modgrf", "nodac", "cjc1295", "grf129", "mod-grf"],
  "CJC-1295 (With DAC)": ["cjcdac", "cjc", "cjc1295dac", "cjc-dac"],
  "CJC-1295 + Ipamorelin": ["cjcipa", "cjc", "ipa", "cjc/ipa", "cjcipa"],
  Ipamorelin: ["ipa", "ipam"],
  Tesamorelin: ["tesa", "tes", "tesam"],
  "GHRP-2": ["ghrp2", "ghrp-2"],
  "GHRP-6": ["ghrp6", "ghrp-6"],
  "Hexarelin Acetate": ["hexa", "hexarelin", "hex"],
  Sermorelin: ["sermo", "serm", "grf1-29"],
  "HGH 191AA": ["hgh", "gh", "rhgh", "191aa", "somatropin", "hgh191"],
  "MK-677": ["mk677", "mk", "ibutamoren", "ibuta", "mk-677"],
  "Tesamorelin + Ipamorelin": ["tesaipa", "tesa", "ipa", "tes/ipa"],
  "PEG-MGF": ["pegmgf", "mgf", "peg-mgf"],
  "IGF-DES": ["igfdes", "des", "igf-des", "des13"],
  PT141: ["pt141", "pt-141", "pt", "brem"],
  "Kisspeptin-10": ["kp10", "kp", "kisspeptin", "kiss"],
  "Oxytocin Acetate": ["oxt", "ot", "oxy"],
  HCG: ["hcg", "hcg-"],
  Gonadorelin: ["gnrh", "lhrh"],
  "Gonadorelin Acetate": ["gnrh", "lhrh"],
  "Triptorelin Acetate": ["tripto", "trp"],
  Selank: ["selank", "sel"],
  Semax: ["semax", "smx"],
  DSIP: ["dsip"],
  Dihexa: ["dihexa", "dih"],
  Cerebrolysin: ["cerebro", "cbln"],
  "Orexin A": ["orexina", "hcrt1", "orexin-a"],
  "Orexin B": ["orexinb", "hcrt2", "orexin-b"],
  P21: ["p21"],
  Adamax: ["adamax", "admx"],
  "PE-22-28": ["pe2228", "pe22", "pe-22-28"],
  Pinealon: ["pinealon", "pin"],
  Melatonin: ["mlt", "mel"],
  "ACTH 1-39": ["acth", "acth139"],
  "GHK-Cu": ["ghk", "ghkcu", "ghk-cu", "cu-ghk"],
  "Snap-8": ["snap8", "snap", "snap-8"],
  "Melanotan II": ["mt2", "mt-2", "mtii", "mt-ii", "melanotan2"],
  "Melanotan I": ["mt1", "mt-1", "mti", "mt-i", "melanotan1", "afamelanotide"],
  Glutathione: ["gsh", "glu"],
  Matrixyl: ["matrixyl", "pal-kttks"],
  "AHK-Cu": ["ahk", "ahkcu", "ahk-cu"],
  "PTD-DBM": ["ptddbm", "ptd", "ptd-dbm"],
  "Botulinum Toxin": ["botox", "btx", "btxa", "ona"],
  "Thymosin alpha 1": ["ta1", "talpha1", "tα1", "thymalfasin"],
  Thymalin: ["thymalin", "thym"],
  "KK-37": ["kk37", "kk-37"],
  "CBL-514": ["cbl", "cbl514", "cbl-514"],
  "L-Carnitine": ["carnitine", "lcarn", "l-carn"],
  "Lipo-C": ["lipoc", "lipo-c", "micc"],
  "5-Amino-1MQ": ["1mq", "amino1mq", "5amino1mq", "5-amino-1mq"],
  Adipotide: ["adipotide", "ftpp"],
  "FST 344": ["fst344", "fst", "fst-344"],
  "GDF-8": ["gdf8", "gdf-8"],
  "IGF-1 LR3": ["igf1", "lr3", "igflr3", "igf-1", "longr3"],
  MGF: ["mgf"],
  "ACE-031": ["ace031", "ace", "ace-031"],
  Follistatin: ["fst", "follistatin"],
  EPO: ["epo", "epoetin"],
  "Bacteriostatic Water": ["bac", "bw", "bac-h2o", "bach2o"],
  "Acetic Water": ["aa", "acetic", "0.6aa"],
  "Sterile Water": ["swfi", "wfi", "sw"],
  "B-12": ["b12", "b-12"],
  "ARA 290": ["ara290", "ara", "ara-290"],
  VIP: ["vip"],
  Dermorphin: ["derm", "drm"],
  "TGF-DES": ["tgfdes", "tgf", "tgf-des"],
  HMG: ["hmg", "hmg-hp", "hmghp", "menotropin", "menotrophin"],
  "LL-37": ["ll37", "ll-37", "ll 37", "camp", "hcap18"],
  "Etelcalcetide Hydrochloride": [
    "etel", "etelcalcetide", "etelhcl", "parsabiv", "amg416", "amg-416", "velcalcetide",
  ],
};

function doseFromPack(pack: string): string | null {
  const match = pack.match(/(\d+(?:\.\d+)?)/);
  return match ? match[1] : null;
}

function compoundCodes(name: string, pack: string): string[] {
  const abbrevs = COMPOUND_ABBREVS[name] ?? [];
  const dose = doseFromPack(pack);
  const out: string[] = [...abbrevs];
  if (dose) {
    for (const abbrev of abbrevs) {
      out.push(
        `${abbrev}${dose}`,
        `${abbrev}-${dose}`,
        `${abbrev} ${dose}`,
        `${abbrev}${dose}mg`,
        `${abbrev}-${dose}mg`,
      );
    }
  }
  return out;
}

function tokenMatchesIndex(token: string, words: string[]): boolean {
  const compact = normalizeSearch(token);
  if (!compact) return true;
  if (words.includes(compact)) return true;
  const doseLike = /\d/.test(compact);
  if (!doseLike && compact.length >= 3 && words.some((word) => word.startsWith(compact))) {
    return true;
  }
  return false;
}

function packSearchTags(pack: string): string[] {
  const tags: string[] = [];
  const lower = pack.toLowerCase();
  const re = /(\d+(?:\.\d+)?)\s*(mg|mcg|µg|ug|iu|ml|g)\b/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(pack))) {
    const n = match[1];
    const u = match[2].toLowerCase().replace("µg", "mcg").replace("ug", "mcg");
    tags.push(`${n}${u}`, `${n} ${u}`);
    if (u === "mg") tags.push("milligram", "milligrams");
    if (u === "ml") tags.push("milliliter", "milliliters", "liquid");
    if (u === "iu") tags.push("iu", "units", "international units");
    if (u === "g") tags.push("gram", "grams");
    if (u === "mcg") tags.push("microgram", "micrograms", "mcg", "ug");
  }
  if (lower.includes("vial")) tags.push("vial", "single vial");
  if (lower.includes("bottle")) tags.push("bottle", "single bottle");
  if (lower.includes("kit")) tags.push("kit");
  if (lower.includes("single")) tags.push("single");
  return tags;
}

type Draft = {
  name: string;
  pack: string;
  category: CategoryId;
  prices: PriceTiers | null;
  specialOrder?: boolean;
  isNew?: boolean;
  outOfStock?: boolean;
  excludeFromVolume?: boolean;
  unitNote?: string;
  headerNote?: string;
  tags?: string[];
};

function item(
  name: string,
  pack: string,
  category: CategoryId,
  prices: PriceTiers | null,
  extra: Partial<Draft> = {},
): Draft {
  return { name, pack, category, prices, ...extra };
}

const DRAFTS: Draft[] = [
  item("Retatrutide", "10mg", "metabolic", volumeTiers(129)),
  item("Retatrutide", "20mg", "metabolic", volumeTiers(171)),
  item("Retatrutide", "30mg", "metabolic", volumeTiers(231)),
  item("Retatrutide", "40mg", "metabolic", volumeTiers(281)),
  item("Retatrutide", "50mg", "metabolic", volumeTiers(322)),
  item("Retatrutide", "60mg", "metabolic", volumeTiers(362)),
  item("Tirzepatide", "10mg", "metabolic", volumeTiers(79)),
  item("Tirzepatide", "20mg", "metabolic", volumeTiers(110)),
  item("Tirzepatide", "30mg", "metabolic", volumeTiers(140)),
  item("Tirzepatide", "40mg", "metabolic", volumeTiers(171)),
  item("Tirzepatide", "50mg", "metabolic", volumeTiers(224)),
  item("Tirzepatide", "60mg", "metabolic", volumeTiers(251)),
  item("Semaglutide", "5mg", "metabolic", volumeTiers(78), { isNew: true }),
  item("Semaglutide", "10mg", "metabolic", volumeTiers(116), { isNew: true }),
  item("Semaglutide", "15mg", "metabolic", volumeTiers(138), { isNew: true }),
  item("Semaglutide", "20mg", "metabolic", volumeTiers(200), { isNew: true }),
  item("Semaglutide", "30mg", "metabolic", volumeTiers(254), { isNew: true }),
  item("Semaglutide", "40mg", "metabolic", volumeTiers(291), { isNew: true }),
  item("Semaglutide", "50mg", "metabolic", volumeTiers(345), { isNew: true }),
  item("Mazdutide", "5mg", "metabolic", volumeTiers(384), { isNew: true }),
  item("Mazdutide", "10mg", "metabolic", volumeTiers(300)),
  item("Survodutide", "2mg", "metabolic", volumeTiers(305)),
  item("Survodutide", "5mg", "metabolic", volumeTiers(289)),
  item("Survodutide", "10mg", "metabolic", volumeTiers(410)),
  item("Cagrilintide", "2mg", "metabolic", volumeTiers(154), { isNew: true }),
  item("Cagrilintide", "5mg", "metabolic", volumeTiers(165)),
  item("Cagrilintide", "10mg", "metabolic", volumeTiers(437), { isNew: true }),
  item("Cagrilintide + Semaglutide", "5mg", "metabolic", volumeTiers(192), { isNew: true }),
  item("Cagrilintide + Semaglutide", "10mg", "metabolic", volumeTiers(291), { isNew: true }),
  item("Cagrilintide + Semaglutide", "20mg", "metabolic", volumeTiers(475), { isNew: true }),
  item("Liraglutide", "5mg", "metabolic", volumeTiers(254), { isNew: true }),
  item("Liraglutide", "10mg", "metabolic", volumeTiers(384), { isNew: true }),
  item("Liraglutide", "30mg", "metabolic", volumeTiers(765), { isNew: true }),
  item("Dulaglutide", "5mg", "metabolic", volumeTiers(398), { isNew: true }),
  item("Dulaglutide", "10mg", "metabolic", volumeTiers(613), { isNew: true }),
  item("AOD9604", "2mg", "metabolic", volumeTiers(81)),
  item("AOD9604", "5mg", "metabolic", volumeTiers(140)),
  item("AOD9604", "10mg", "metabolic", volumeTiers(293)),
  item("Lemon Bottle", "Single 10ml bottle", "metabolic", volumeTiers(88)),
  item("LC120", "10ml", "metabolic", volumeTiers(72), { tags: ["lipolytic", "fat dissolver", "lc"] }),
  item("LC216", "10ml", "metabolic", volumeTiers(132), { tags: ["lipolytic", "fat dissolver", "lc"] }),
  item("LC400", "10ml", "metabolic", volumeTiers(87), { tags: ["lipolytic", "fat dissolver", "lc"] }),
  item("LC526", "10ml", "metabolic", volumeTiers(173), { tags: ["lipolytic", "fat dissolver", "lc"] }),
  item("HHB", "10ml", "metabolic", volumeTiers(72), { tags: ["lipolytic", "fat dissolver"] }),
  item("SHB", "10ml", "metabolic", volumeTiers(81), { tags: ["lipolytic", "fat dissolver"] }),
  item("HGH Fragment 176-191", "1mg", "metabolic", volumeTiers(44)),
  item("HGH Fragment 176-191", "2mg", "metabolic", volumeTiers(58)),
  item("HGH Fragment 176-191", "5mg", "metabolic", volumeTiers(167)),
  item("HGH Fragment 176-191", "10mg", "metabolic", volumeTiers(296)),
  item("HGH Fragment 176-191", "12mg", "metabolic", volumeTiers(321)),
  item("HGH Fragment 176-191", "15mg", "metabolic", volumeTiers(304)),
  item("HGH Fragment 17-23", "10mg", "metabolic", volumeTiers(173)),
  item("SLU-PP-322", "5mg", "metabolic", volumeTiers(321)),

  item("BPC-157", "2mg", "recovery", volumeTiers(44)),
  item("BPC-157", "5mg", "recovery", volumeTiers(58)),
  item("BPC-157", "10mg", "recovery", volumeTiers(80)),
  item("TB-500", "2mg", "recovery", volumeTiers(70)),
  item("TB-500", "5mg", "recovery", volumeTiers(132)),
  item("TB-500", "10mg", "recovery", volumeTiers(143)),
  item("BPC 5mg + TB 5mg", "10mg", "recovery", volumeTiers(149)),
  item("BPC 10mg + TB 10mg", "20mg", "recovery", volumeTiers(321)),
  item("GLOW70", "70mg", "recovery", volumeTiers(339)),
  item("KLOW80", "80mg", "recovery", volumeTiers(215)),
  item("KPV", "5mg", "recovery", volumeTiers(40)),
  item("KPV", "10mg", "recovery", volumeTiers(58)),
  item("BPC-157 + TB-500", "30mg", "recovery", volumeTiers(321)),
  item("B7-33", "2mg", "recovery", volumeTiers(122)),
  item("B7-33", "10mg", "recovery", volumeTiers(186)),
  item("TBF", "2mg", "recovery", volumeTiers(40)),

  item("Bronchogen", "20mg", "bioregulator", volumeTiers(180)),
  item("Cardiogen", "10mg", "bioregulator", volumeTiers(132)),
  item("Cardiogen", "20mg", "bioregulator", volumeTiers(293)),
  item("Crystagen", "10mg", "bioregulator", volumeTiers(87)),
  item("Crystagen", "20mg", "bioregulator", volumeTiers(184)),
  item("Cortagen", "10mg", "bioregulator", volumeTiers(94)),
  item("Cortagen", "20mg", "bioregulator", volumeTiers(293)),
  item("Cartalax", "20mg", "bioregulator", volumeTiers(116)),

  item("Epithalon", "10mg", "longevity", volumeTiers(72)),
  item("Epithalon", "50mg", "longevity", volumeTiers(304)),
  item("NAD+", "100mg", "longevity", volumeTiers(36)),
  item("NAD+", "500mg", "longevity", volumeTiers(75)),
  item("NAD+", "1000mg", "longevity", volumeTiers(125)),
  item("MOTS-c", "10mg", "longevity", volumeTiers(87)),
  item("MOTS-c", "15mg", "longevity", volumeTiers(180)),
  item("MOTS-c", "20mg", "longevity", volumeTiers(190)),
  item("MOTS-c", "40mg", "longevity", volumeTiers(212)),
  item("SS-31", "10mg", "longevity", volumeTiers(106)),
  item("SS-31", "50mg", "longevity", volumeTiers(476)),
  item("Aicar", "50mg", "longevity", volumeTiers(93)),
  item("FOXO4-DRI", "2mg", "longevity", volumeTiers(180)),
  item("FOXO4-DRI", "10mg", "longevity", volumeTiers(429)),
  item("Humanin", "10mg", "longevity", volumeTiers(476)),
  item("PNC-27", "5mg", "longevity", volumeTiers(243)),

  item("CJC-1295 (No DAC)", "2mg", "growth", volumeTiers(65)),
  item("CJC-1295 (No DAC)", "5mg", "growth", volumeTiers(90)),
  item("CJC-1295 (No DAC)", "10mg", "growth", volumeTiers(164)),
  item("CJC-1295 (With DAC)", "2mg", "growth", volumeTiers(94)),
  item("CJC-1295 (With DAC)", "5mg", "growth", volumeTiers(293)),
  item("CJC-1295 (With DAC)", "10mg", "growth", volumeTiers(321)),
  item("CJC-1295 + Ipamorelin", "10mg", "growth", volumeTiers(161)),
  item("Ipamorelin", "2mg", "growth", volumeTiers(40)),
  item("Ipamorelin", "5mg", "growth", volumeTiers(62)),
  item("Ipamorelin", "10mg", "growth", volumeTiers(87)),
  item("Tesamorelin", "2mg", "growth", volumeTiers(76)),
  item("Tesamorelin", "5mg", "growth", volumeTiers(173)),
  item("Tesamorelin", "10mg", "growth", volumeTiers(179)),
  item("Tesamorelin", "20mg", "growth", volumeTiers(476)),
  item("GHRP-2", "5mg", "growth", volumeTiers(62)),
  item("GHRP-2", "10mg", "growth", volumeTiers(72)),
  item("GHRP-6", "5mg", "growth", volumeTiers(51)),
  item("GHRP-6", "10mg", "growth", volumeTiers(66)),
  item("Hexarelin Acetate", "2mg", "growth", volumeTiers(54), { isNew: true }),
  item("Hexarelin Acetate", "5mg", "growth", volumeTiers(108)),
  item("Sermorelin", "2mg", "growth", volumeTiers(58)),
  item("Sermorelin", "5mg", "growth", volumeTiers(88)),
  item("Sermorelin", "10mg", "growth", volumeTiers(213)),
  item("HGH 191AA", "6iu", "growth", volumeTiers(44)),
  item("HGH 191AA", "8iu", "growth", volumeTiers(58)),
  item("HGH 191AA", "10iu", "growth", volumeTiers(93)),
  item("HGH 191AA", "12iu", "growth", volumeTiers(110)),
  item("HGH 191AA", "15iu", "growth", volumeTiers(180)),
  item("HGH 191AA", "24iu", "growth", volumeTiers(230)),
  item("HGH 191AA", "36iu", "growth", volumeTiers(339)),
  item("HGH 191AA", "40iu", "growth", volumeTiers(304)),
  item("MK-677", "5mg", "growth", volumeTiers(44)),
  item("Tesamorelin + Ipamorelin", "10mg", "growth", volumeTiers(132)),
  item("PEG-MGF", "2mg", "growth", volumeTiers(94)),
  item("IGF-DES", "2mg", "growth", volumeTiers(58)),

  item("PT141", "10mg", "sexual", volumeTiers(81)),
  item("Kisspeptin-10", "5mg", "sexual", volumeTiers(58), { outOfStock: true }),
  item("Kisspeptin-10", "10mg", "sexual", volumeTiers(116)),
  item("Oxytocin Acetate", "2mg", "sexual", volumeTiers(51)),
  item("Oxytocin Acetate", "5mg", "sexual", volumeTiers(83)),
  item("Oxytocin Acetate", "10mg", "sexual", volumeTiers(167)),
  item("HCG", "1000iu", "sexual", volumeTiers(58)),
  item("HCG", "2000iu", "sexual", volumeTiers(81)),
  item("HCG", "5000iu", "sexual", volumeTiers(173)),
  item("HCG", "10000iu", "sexual", volumeTiers(356)),
  item("Gonadorelin", "2mg", "sexual", volumeTiers(47)),
  item("Gonadorelin Acetate", "5mg", "sexual", volumeTiers(87)),
  item("Triptorelin Acetate", "2mg", "sexual", volumeTiers(70)),

  item("Selank", "5mg", "neuro", volumeTiers(54)),
  item("Selank", "10mg", "neuro", volumeTiers(76)),
  item("Semax", "5mg", "neuro", volumeTiers(51)),
  item("Semax", "10mg", "neuro", volumeTiers(72)),
  item("DSIP", "2mg", "neuro", volumeTiers(50)),
  item("DSIP", "5mg", "neuro", volumeTiers(70)),
  item("DSIP", "10mg", "neuro", volumeTiers(72)),
  item("Dihexa", "5mg", "neuro", volumeTiers(62), { isNew: true }),
  item("Dihexa", "10mg", "neuro", volumeTiers(98), { isNew: true }),
  item("Cerebrolysin", "60mg", "neuro", volumeTiers(95), { isNew: true }),
  item("Orexin A", "10mg", "neuro", volumeTiers(570), { isNew: true }),
  item("Orexin B", "5mg", "neuro", volumeTiers(129), { isNew: true }),
  item("Orexin B", "10mg", "neuro", volumeTiers(261), { isNew: true }),
  item("P21", "5mg", "neuro", volumeTiers(476)),
  item("Adamax", "5mg", "neuro", volumeTiers(180)),
  item("Adamax", "10mg", "neuro", volumeTiers(321)),
  item("PE-22-28", "5mg", "neuro", volumeTiers(62)),
  item("PE-22-28", "10mg", "neuro", volumeTiers(140)),
  item("Pinealon", "5mg", "neuro", volumeTiers(46)),
  item("Pinealon", "10mg", "neuro", volumeTiers(70)),
  item("Melatonin", "10mg", "neuro", volumeTiers(80)),
  item("ACTH 1-39", "5mg", "neuro", volumeTiers(132)),

  item("GHK-Cu", "50mg", "aesthetic", volumeTiers(52)),
  item("GHK-Cu", "100mg", "aesthetic", volumeTiers(83)),
  item("Snap-8", "10mg", "aesthetic", volumeTiers(69)),
  item("Snap-8", "100mg", "aesthetic", volumeTiers(806)),
  item("Melanotan II", "10mg", "aesthetic", volumeTiers(101)),
  item("Melanotan I", "10mg", "aesthetic", volumeTiers(83)),
  item("Glutathione", "400mg", "aesthetic", volumeTiers(42)),
  item("Glutathione", "600mg", "aesthetic", volumeTiers(65)),
  item("Glutathione", "1000mg", "aesthetic", volumeTiers(180)),
  item("Glutathione", "1500mg", "aesthetic", volumeTiers(143)),
  item("Matrixyl", "10mg", "aesthetic", volumeTiers(65), { isNew: true }),
  item("AHK-Cu", "20mg", "aesthetic", volumeTiers(116)),
  item("AHK-Cu", "50mg", "aesthetic", volumeTiers(69)),
  item("AHK-Cu", "100mg", "aesthetic", volumeTiers(173)),
  item("PTD-DBM", "1mg", "aesthetic", volumeTiers(88)),
  item("Botulinum Toxin", "100iu", "aesthetic", volumeTiers(381)),

  item("Thymosin alpha 1", "2mg", "immune", volumeTiers(66)),
  item("Thymosin alpha 1", "5mg", "immune", volumeTiers(167)),
  item("Thymosin alpha 1", "10mg", "immune", volumeTiers(321)),
  item("Thymalin", "10mg", "immune", volumeTiers(87)),
  item("KK-37", "5mg", "immune", volumeTiers(180)),

  item("CBL-514", "5mg", "fatloss", volumeTiers(158), { isNew: true }),
  item("CBL-514", "10mg", "fatloss", volumeTiers(286), { isNew: true }),
  item("CBL-514", "20mg", "fatloss", volumeTiers(411), { isNew: true }),
  item("L-Carnitine", "200mg", "fatloss", volumeTiers(36), { isNew: true }),
  item("L-Carnitine", "400mg", "fatloss", volumeTiers(47), { isNew: true }),
  item("L-Carnitine", "600mg", "fatloss", volumeTiers(58)),
  item("L-Carnitine", "1200mg", "fatloss", volumeTiers(72)),
  item("Lipo-C", "10mg", "fatloss", volumeTiers(333)),
  item("5-Amino-1MQ", "5mg", "fatloss", volumeTiers(54)),
  item("5-Amino-1MQ", "10mg", "fatloss", volumeTiers(87)),
  item("5-Amino-1MQ", "50mg", "fatloss", volumeTiers(164)),
  item("Adipotide", "2mg", "fatloss", volumeTiers(94)),
  item("Adipotide", "5mg", "fatloss", volumeTiers(184)),
  item("Adipotide", "10mg", "fatloss", volumeTiers(476)),

  item("FST 344", "1mg", "muscle", volumeTiers(239), { isNew: true }),
  item("GDF-8", "1mg", "muscle", volumeTiers(232), { isNew: true }),
  item("IGF-1 LR3", "0.1mg", "muscle", volumeTiers(41)),
  item("IGF-1 LR3", "1mg", "muscle", volumeTiers(204), { isNew: true }),
  item("MGF", "2mg", "muscle", volumeTiers(122)),
  item("ACE-031", "1mg", "muscle", volumeTiers(125)),
  item("Follistatin", "1mg", "muscle", volumeTiers(321)),
  item("EPO", "3000iu", "muscle", volumeTiers(80)),

  item("Bacteriostatic Water", "3ml", "support", volumeTiers(11), { excludeFromVolume: true }),
  item("Bacteriostatic Water", "5ml", "support", volumeTiers(15), { excludeFromVolume: true }),
  item("Bacteriostatic Water", "10ml", "support", volumeTiers(27), { excludeFromVolume: true }),
  item("Acetic Water", "3ml", "support", volumeTiers(14), { excludeFromVolume: true }),
  item("Acetic Water", "10ml", "support", volumeTiers(52), { excludeFromVolume: true }),
  item("Sterile Water", "3ml", "support", volumeTiers(11), { excludeFromVolume: true }),
  item("Sterile Water", "5ml", "support", volumeTiers(16), { excludeFromVolume: true }),
  item("Sterile Water", "10ml", "support", volumeTiers(27), { excludeFromVolume: true }),
  item("B-12", "10ml", "support", volumeTiers(83)),

  item("ARA 290", "10mg", "specialty", volumeTiers(125)),
  item("ARA 290", "16mg", "specialty", volumeTiers(321)),
  item("VIP", "5mg", "specialty", volumeTiers(147)),
  item("VIP", "10mg", "specialty", volumeTiers(196)),
  item("Dermorphin", "2mg", "specialty", volumeTiers(58)),
  item("Dermorphin", "5mg", "specialty", volumeTiers(87)),
  item("Dermorphin", "10mg", "specialty", volumeTiers(306)),
  item("Dermorphin", "20mg", "specialty", volumeTiers(215)),
  item("TGF-DES", "2mg", "specialty", volumeTiers(180)),

  item("Retatrutide", "5mg", "metabolic", null, { specialOrder: true, tags: ["rt5", "reta5", "reta 5mg"] }),
  item("Retatrutide", "15mg", "metabolic", null, { specialOrder: true, tags: ["rt15", "reta15", "reta 15mg"] }),
  item("Retatrutide", "100mg", "metabolic", null, { specialOrder: true, tags: ["rt100", "reta100", "reta 100mg"] }),
  item("Tirzepatide", "5mg", "metabolic", null, { specialOrder: true, tags: ["tz5", "tirz5", "tirz 5mg"] }),
  item("Tirzepatide", "15mg", "metabolic", null, { specialOrder: true, tags: ["tz15", "tirz15", "tirz 15mg"] }),
  item("Tirzepatide", "100mg", "metabolic", null, { specialOrder: true, tags: ["tz100", "tirz100", "tirz 100mg"] }),
  item("Tirzepatide", "120mg", "metabolic", null, { specialOrder: true, tags: ["tz120", "tirz120", "tirz 120mg"] }),
  item("HMG", "75iu", "sexual", null, { specialOrder: true, tags: ["hmg75", "75iu", "menotropin"] }),
  item("LL-37", "10mg", "specialty", null, { specialOrder: true, tags: ["ll37", "ll-37", "cathelicidin"] }),
  item("B-12", "12ml", "support", null, { specialOrder: true, tags: ["b12", "b-12", "12ml", "cobalamin"] }),
  item("Etelcalcetide Hydrochloride", "1g / 2g", "specialty", null, {
    specialOrder: true,
    tags: ["etel", "etelcalcetide", "1g", "2g", "parsabiv", "hcl"],
  }),
];

export const PRODUCTS: Product[] = DRAFTS.map((d) => ({
  ...d,
  id: slugify(`${d.name}-${d.pack}`),
  outOfStock: Boolean(d.outOfStock) || OUT_OF_STOCK_COMPOUNDS.has(d.name),
}));

export const STANDARD_PRODUCTS = PRODUCTS.filter((p) => !p.specialOrder);
export const SPECIAL_ORDER_PRODUCTS = PRODUCTS.filter((p) => p.specialOrder);
export const NEW_PRODUCTS = PRODUCTS.filter((p) => p.isNew);
export const TOTAL_COMPOUNDS = groupByName(PRODUCTS).length;

function searchBlobFor(product: Product): string {
  const cat = categoryById(product.category);
  const extra = product.specialOrder ? "quote moq special order make-to-order" : "";
  return [
    product.name,
    product.pack,
    product.unitNote ?? "",
    product.headerNote ?? "",
    ...(product.tags ?? []),
    ...(COMPOUND_SEARCH_TAGS[product.name] ?? []),
    ...compoundCodes(product.name, product.pack),
    ...packSearchTags(product.pack),
    ...(cat?.tags ?? []),
    ...(cat?.searchTags ?? []),
    extra,
    product.isNew ? "new" : "",
    product.outOfStock ? "out of stock oos unavailable" : "",
  ]
    .join(" ")
    .toLowerCase();
}

const PRODUCT_SEARCH_WORDS = new Map(
  PRODUCTS.map((product) => [
    product.id,
    searchBlobFor(product)
      .split(/[^a-z0-9]+/)
      .map((word) => normalizeSearch(word))
      .filter(Boolean),
  ]),
);

export function groupByName(products: Product[]): { name: string; items: Product[] }[] {
  const order: string[] = [];
  const map = new Map<string, Product[]>();
  for (const p of products) {
    if (!map.has(p.name)) {
      order.push(p.name);
      map.set(p.name, []);
    }
    map.get(p.name)!.push(p);
  }
  return order.map((name) => ({ name, items: map.get(name)! }));
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function productsInCategory(id: CategoryId): Product[] {
  return PRODUCTS.filter((p) => p.category === id);
}

export function compoundNames(): string[] {
  return [...new Set(PRODUCTS.map((p) => p.name))].sort((a, b) => a.localeCompare(b));
}

export function productsByName(name: string): Product[] {
  return PRODUCTS.filter((p) => p.name === name);
}

export function normalizeSearch(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function productMatches(product: Product, query: string): boolean {
  const raw = query.trim().toLowerCase();
  if (!raw) return true;
  const tokens = raw.split(/\s+/).filter(Boolean);
  const words =
    PRODUCT_SEARCH_WORDS.get(product.id) ??
    searchBlobFor(product)
      .split(/[^a-z0-9]+/)
      .map((word) => normalizeSearch(word))
      .filter(Boolean);
  return tokens.every((token) => tokenMatchesIndex(token, words));
}

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return PRODUCTS;
  return PRODUCTS.filter((p) => productMatches(p, query));
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.id !== product.id && (p.name === product.name || p.category === product.category) && !p.specialOrder,
  ).slice(0, limit);
}

export function currentListPeriod(now = new Date()) {
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();
  return {
    month,
    year,
    label: `${month} ${year}`,
    title: `${month} Peptide Price List`,
  };
}

export const LIST_META = {
  get title() {
    return currentListPeriod().title;
  },
  get monthName() {
    return currentListPeriod().month;
  },
  company: "Guangzhou Peptide Biotechnology Co., Ltd.",
  companyUrl: "mailto:guangzhoupeptide@protonmail.com",
  group: "GPB",
  get month() {
    return currentListPeriod().label;
  },
  kitLegend: "1 Kit = 10 Vials",
  intro:
    "Guangzhou Peptide Biotechnology Co., Ltd. (\"G\" or \"GPB\") has been producing peptides continuously since 2010. We supply B2B partners around the world, and we also serve individual research customers at factory-direct prices with a low minimum order. Every batch is tested in our own laboratory before release, and every order is protected by our written Quality Guarantee and Shipping Guarantee.",
  quality:
    "We encourage you to test your received batch at any reputable laboratory. Should independent results fall below specification, we will provide a full refund or a replacement batch. Further detail is below; contact us for a public COA.",
  shipping:
    "If a shipment is lost, damaged, incomplete, or delayed by a covered customs issue, we will provide a full refund or a replacement shipment. Share the tracking number so we can open the case promptly, or contact us to file a claim.",
  volumeNote:
    "Volume prices apply to each individual SKU. Only kits of the same product and the same strength count toward a better price. Different products are not added together.",
  testing:
    "Every lot is released only after in-house QC. Selected commercial lots are also submitted to independent laboratories, including Janoshik, Freedom Diagnostics, and other accredited facilities. Customers are encouraged to commission their own assay. Should verified results fall below specification, we will refund the order or replace the batch. Public certificates of analysis are available on request.",
  oem:
    "We produce private-label packaging in-house for B2B and bulk orders. Your logo can be printed on vial and box labels and stickers, and caps can be made in your color or branding.",
  research:
    "For laboratory research use only. Not for human or veterinary use, not for diagnostic procedures, and not a drug, food, or cosmetic.",
  contactEmail: "guangzhoupeptide@protonmail.com",
  telegram: "guangzhou_peptide",
  telegramUrl: "https://t.me/guangzhou_peptide",
  contactPage: "https://www.guangzhoupeptide.com/contact",
  address: "Guangzhou, Guangdong, China",
  addressZh: "中国广东省广州市",
};
