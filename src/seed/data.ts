/**
 * Seed content. Everything here is either a verified firm fact (see
 * DISCOVERY_REPORT.md) or generic service-capability copy written per
 * brief §08 ("describe the SERVICE CAPABILITY rather than invented
 * achievements") — no invented case history, statutes, or credentials.
 *
 * Practice areas, industries and FAQs are seeded as DRAFTS. They are not
 * publicly visible until a staff member reviews and publishes them from
 * the CMS admin — see CMS_GUIDE.md and CONTENT_REQUIRED.md.
 */

type Bilingual = { ar: string; en: string }

export const practiceAreas: Array<{
  slug: string
  title: Bilingual
  summary: Bilingual
  overview: Bilingual
  featured?: boolean
  order: number
}> = [
  {
    slug: 'civil-law',
    order: 1,
    title: { ar: 'القانون المدني', en: 'Civil Law' },
    summary: {
      ar: 'تمثيل قانوني واستشارات في المنازعات المدنية والعقود والالتزامات والتعويضات.',
      en: 'Legal representation and advisory in civil disputes, contracts, obligations, and compensation claims.',
    },
    overview: {
      ar: 'يقدم مكتب آل حراز خدمات قانونية شاملة في القانون المدني، وتشمل منازعات العقود والالتزامات والملكية والتعويضات، مع تمثيل موكلينا أمام المحاكم المدنية بمختلف درجاتها من أجل الوصول إلى أفضل نتيجة ممكنة.',
      en: 'Al Harraz Law Firm provides comprehensive civil law services, including contract and obligations disputes, property matters, and compensation claims, representing clients before the civil courts at all levels to achieve the best possible outcome.',
    },
    featured: true,
  },
  {
    slug: 'litigation-dispute-resolution',
    order: 2,
    title: { ar: 'التقاضي وتسوية المنازعات', en: 'Litigation & Dispute Resolution' },
    summary: {
      ar: 'تمثيل قانوني أمام مختلف درجات التقاضي في المنازعات المدنية والتجارية.',
      en: 'Legal representation before the courts in civil and commercial disputes.',
    },
    overview: {
      ar: 'يمثل مكتب آل حراز الأفراد والشركات في المنازعات المدنية والتجارية أمام المحاكم المصرية، من مرحلة التقاضي الابتدائي وحتى الاستئناف، بهدف الوصول إلى أفضل نتيجة ممكنة لموكلينا.',
      en: 'Al Harraz Law Firm represents individuals and businesses in civil and commercial disputes before the Egyptian courts, from first-instance litigation through appeal, working toward the best achievable outcome for our clients.',
    },
  },
  {
    slug: 'corporate-commercial-law',
    order: 8,
    title: { ar: 'قانون الشركات والقانون التجاري', en: 'Corporate & Commercial Law' },
    summary: {
      ar: 'تأسيس الشركات، الحوكمة، والعقود التجارية.',
      en: 'Company formation, governance, and commercial contracts.',
    },
    overview: {
      ar: 'نقدم الاستشارات القانونية للشركات في مراحل التأسيس والحوكمة والامتثال، بالإضافة إلى صياغة ومراجعة العقود التجارية بما يحمي مصالح موكلينا.',
      en: 'We advise businesses on formation, governance and compliance, and draft and review commercial contracts to protect our clients’ interests.',
    },
  },
  {
    slug: 'company-formation-investment',
    order: 9,
    title: { ar: 'تأسيس الشركات والاستثمار', en: 'Company Formation & Investment' },
    summary: { ar: 'إجراءات تأسيس الشركات والاستثمار في مصر.', en: 'Company formation and investment procedures in Egypt.' },
    overview: {
      ar: 'نساعد المستثمرين المحليين والأجانب في إجراءات تأسيس الشركات والحصول على التراخيص اللازمة وفقًا للقوانين المصرية المنظمة للاستثمار.',
      en: 'We assist local and foreign investors with company formation procedures and obtaining the necessary licenses under Egyptian investment law.',
    },
  },
  {
    slug: 'contracts-commercial-agreements',
    order: 3,
    title: { ar: 'العقود والاتفاقيات التجارية', en: 'Contracts & Commercial Agreements' },
    summary: { ar: 'صياغة ومراجعة وتفاوض العقود.', en: 'Drafting, reviewing, and negotiating contracts.' },
    overview: {
      ar: 'نتولى صياغة ومراجعة والتفاوض بشأن مختلف أنواع العقود التجارية والمدنية، بما يضمن وضوح الالتزامات وحماية حقوق موكلينا.',
      en: 'We draft, review and negotiate a wide range of commercial and civil contracts, ensuring clear obligations and protecting our clients’ rights.',
    },
  },
  {
    slug: 'contract-translation',
    order: 22,
    title: { ar: 'ترجمة العقود القانونية', en: 'Legal Contract Translation' },
    summary: {
      ar: 'ترجمة دقيقة للعقود والمستندات القانونية بين العربية والإنجليزية.',
      en: 'Accurate translation of contracts and legal documents between Arabic and English.',
    },
    overview: {
      ar: 'نقدم خدمة ترجمة العقود والمستندات القانونية بمختلف أنواعها من وإلى اللغتين العربية والإنجليزية، مع مراعاة الدقة القانونية والمصطلحات الفنية الخاصة بكل عقد، بما يضمن توافق الترجمة مع المعنى والالتزامات الواردة في النص الأصلي.',
      en: 'We translate contracts and legal documents of all kinds, to and from Arabic and English, with close attention to legal accuracy and the technical terminology specific to each contract — ensuring the translation faithfully reflects the meaning and obligations of the original text.',
    },
  },
  {
    slug: 'arbitration',
    order: 13,
    title: { ar: 'التحكيم', en: 'Arbitration' },
    summary: { ar: 'تمثيل الأطراف في إجراءات التحكيم التجاري.', en: 'Representing parties in commercial arbitration proceedings.' },
    overview: {
      ar: 'نمثل موكلينا في إجراءات التحكيم كوسيلة بديلة لفض المنازعات التجارية بكفاءة وسرية.',
      en: 'We represent clients in arbitration proceedings as an efficient, confidential alternative to litigation for resolving commercial disputes.',
    },
  },
  {
    slug: 'maritime-shipping-port-law',
    order: 20,
    title: { ar: 'القانون البحري والشحن والخدمات القانونية المرتبطة بالموانئ', en: 'Maritime, Shipping & Port-Related Legal Services' },
    summary: {
      ar: 'خبرة قانونية في الأعمال البحرية والشحن والخدمات المرتبطة بالموانئ، بحكم موقع المكتب في دمياط.',
      en: 'Legal expertise in maritime affairs, shipping, and port-related services, given the firm’s Damietta location.',
    },
    overview: {
      ar: 'بحكم موقعنا الاستراتيجي في دمياط، يقدم مكتب آل حراز خدمات قانونية متخصصة في المسائل البحرية والشحن، وتشمل منازعات الشحن، مطالبات البضائع، سندات الشحن، مسؤولية الناقل البحري، التخليص الجمركي، والتجارة الدولية. لا يدّعي المكتب أي تبعية رسمية لهيئة ميناء دمياط.',
      en: 'Given our strategic location in Damietta, Al Harraz Law Firm provides specialized legal services in maritime and shipping matters, including shipping disputes, cargo claims, bills of lading, carrier liability, customs clearance, and international trade. The firm does not claim any official affiliation with Damietta Port Authority.',
    },
  },
  {
    slug: 'customs-import-export',
    order: 21,
    title: { ar: 'الجمارك والاستيراد والتصدير', en: 'Customs & Import/Export' },
    summary: { ar: 'استشارات قانونية في المسائل الجمركية والتجارة الدولية.', en: 'Legal advisory on customs matters and international trade.' },
    overview: {
      ar: 'نقدم الاستشارات القانونية للشركات العاملة في الاستيراد والتصدير فيما يتعلق بالإجراءات الجمركية والامتثال للوائح التجارة الدولية.',
      en: 'We advise import/export businesses on customs procedures and compliance with international trade regulations.',
    },
  },
  {
    slug: 'employment-labour-law',
    order: 12,
    title: { ar: 'قانون العمل والعمالة', en: 'Employment & Labour Law' },
    summary: { ar: 'استشارات قانونية لأصحاب العمل والعاملين.', en: 'Legal advisory for employers and employees.' },
    overview: {
      ar: 'نقدم الاستشارات القانونية في علاقات العمل، عقود التوظيف، ومنازعات العمل الفردية والجماعية.',
      en: 'We provide legal advisory on employment relationships, employment contracts, and individual and collective labour disputes.',
    },
  },
  {
    slug: 'real-estate-property-registration',
    order: 4,
    title: { ar: 'العقارات وتسجيل الملكية', en: 'Real Estate & Property Registration' },
    summary: { ar: 'استشارات قانونية في المعاملات العقارية وتسجيل الملكية.', en: 'Legal advisory on real estate transactions and property registration.' },
    overview: {
      ar: 'نساعد الأفراد والشركات في إجراءات المعاملات العقارية وتسجيل الملكية وفقًا للقانون المصري.',
      en: 'We assist individuals and businesses with real estate transaction procedures and property registration under Egyptian law.',
    },
  },
  {
    slug: 'family-law-personal-status',
    order: 7,
    title: { ar: 'الأحوال الشخصية', en: 'Family Law & Personal Status' },
    summary: { ar: 'قضايا الأحوال الشخصية كالزواج والطلاق والحضانة.', en: 'Personal status matters such as marriage, divorce, and custody.' },
    overview: {
      ar: 'نقدم التمثيل القانوني والاستشارات في قضايا الأحوال الشخصية، بما في ذلك الزواج والطلاق والحضانة والنفقة.',
      en: 'We provide legal representation and advisory in personal status matters, including marriage, divorce, custody, and alimony.',
    },
  },
  {
    slug: 'administrative-law',
    order: 11,
    title: { ar: 'القانون الإداري', en: 'Administrative Law' },
    summary: { ar: 'المنازعات أمام مجلس الدولة.', en: 'Disputes before the State Council.' },
    overview: {
      ar: 'نمثل موكلينا في المنازعات الإدارية أمام مجلس الدولة، بما في ذلك الطعون على القرارات الإدارية.',
      en: 'We represent clients in administrative disputes before the State Council, including challenges to administrative decisions.',
    },
  },
  {
    slug: 'debt-recovery-enforcement',
    order: 5,
    title: { ar: 'تحصيل الديون والتنفيذ', en: 'Debt Recovery & Enforcement' },
    summary: { ar: 'إجراءات تحصيل الديون وتنفيذ الأحكام.', en: 'Debt recovery procedures and judgment enforcement.' },
    overview: {
      ar: 'نساعد موكلينا في إجراءات تحصيل الديون وتنفيذ الأحكام القضائية بكفاءة.',
      en: 'We assist clients with efficient debt recovery procedures and enforcement of court judgments.',
    },
  },
  {
    slug: 'criminal-law',
    order: 10,
    title: { ar: 'القانون الجنائي', en: 'Criminal Law' },
    summary: { ar: 'الدفاع والتمثيل في القضايا الجنائية.', en: 'Defense and representation in criminal matters.' },
    overview: {
      ar: 'نقدم الدفاع القانوني والتمثيل في القضايا الجنائية أمام النيابة العامة ومختلف درجات المحاكم الجنائية.',
      en: 'We provide legal defense and representation in criminal matters before the Public Prosecution and the criminal courts.',
    },
    featured: true,
  },
  {
    slug: 'intellectual-property',
    order: 15,
    title: { ar: 'الملكية الفكرية', en: 'Intellectual Property' },
    summary: { ar: 'حماية العلامات التجارية وحقوق الملكية الفكرية.', en: 'Trademark protection and intellectual property rights.' },
    overview: {
      ar: 'نقدم الاستشارات القانونية في مسائل الملكية الفكرية، بما في ذلك تسجيل وحماية العلامات التجارية.',
      en: 'We advise on intellectual property matters, including trademark registration and protection.',
    },
  },
  {
    slug: 'legal-advisory',
    order: 19,
    title: { ar: 'الاستشارات القانونية العامة', en: 'General Legal Advisory' },
    summary: { ar: 'استشارات قانونية عامة للأفراد والشركات.', en: 'General legal advisory for individuals and businesses.' },
    overview: {
      ar: 'يقدم مكتب آل حراز استشارات قانونية عامة للأفراد والشركات في مختلف فروع القانون المصري.',
      en: 'Al Harraz Law Firm provides general legal advisory to individuals and businesses across the main areas of Egyptian law.',
    },
  },
  {
    slug: 'inheritance-estates',
    order: 6,
    title: { ar: 'الميراث والتركات', en: 'Inheritance & Estates' },
    summary: {
      ar: 'استشارات وتمثيل قانوني في قسمة التركات ومنازعات الميراث.',
      en: 'Legal advisory and representation in estate division and inheritance disputes.',
    },
    overview: {
      ar: 'نقدم الاستشارات القانونية والتمثيل في مسائل الميراث، بما في ذلك حصر التركة وقسمتها ومنازعات الورثة، وفقًا لأحكام الشريعة الإسلامية والقانون المصري.',
      en: 'We provide legal advisory and representation in inheritance matters, including estate inventory, division among heirs, and inheritance disputes, in accordance with Islamic Sharia principles and Egyptian law.',
    },
  },
  {
    slug: 'tax-law',
    order: 14,
    title: { ar: 'القانون الضريبي', en: 'Tax Law' },
    summary: {
      ar: 'استشارات قانونية ضريبية للأفراد والشركات، وتمثيل في المنازعات الضريبية.',
      en: 'Tax legal advisory for individuals and businesses, and representation in tax disputes.',
    },
    overview: {
      ar: 'نقدم الاستشارات القانونية في المسائل الضريبية للأفراد والشركات، ونمثل موكلينا في المنازعات الضريبية أمام الجهات المختصة.',
      en: 'We provide legal advisory on tax matters for individuals and businesses, and represent clients in tax disputes before the relevant authorities.',
    },
  },
  {
    slug: 'banking-finance-law',
    order: 18,
    title: { ar: 'قانون البنوك والتمويل', en: 'Banking & Finance Law' },
    summary: {
      ar: 'استشارات قانونية في المعاملات المصرفية والتمويلية.',
      en: 'Legal advisory on banking and finance transactions.',
    },
    overview: {
      ar: 'نقدم الاستشارات القانونية للأفراد والشركات في المعاملات المصرفية والتمويلية، بما في ذلك عقود التسهيلات الائتمانية ومنازعات القروض.',
      en: 'We provide legal advisory to individuals and businesses on banking and finance transactions, including credit facility agreements and loan disputes.',
    },
  },
  {
    slug: 'insurance-disputes',
    order: 16,
    title: { ar: 'منازعات التأمين', en: 'Insurance Disputes' },
    summary: {
      ar: 'تمثيل قانوني في منازعات وثائق ومطالبات التأمين.',
      en: 'Legal representation in insurance policy and claims disputes.',
    },
    overview: {
      ar: 'نمثل موكلينا في المنازعات المتعلقة بوثائق التأمين والمطالبات بالتعويضات، سواء التأمين الشخصي أو تأمين الممتلكات والأعمال.',
      en: 'We represent clients in disputes relating to insurance policies and compensation claims, covering both personal and property/business insurance.',
    },
  },
  {
    slug: 'consumer-protection',
    order: 17,
    title: { ar: 'حماية المستهلك', en: 'Consumer Protection' },
    summary: {
      ar: 'استشارات وتمثيل قانوني في منازعات حماية المستهلك.',
      en: 'Legal advisory and representation in consumer protection disputes.',
    },
    overview: {
      ar: 'نقدم الاستشارات القانونية والتمثيل في منازعات حماية المستهلك، بما يشمل عيوب المنتجات والخدمات وشروط التعاقد غير العادلة.',
      en: 'We provide legal advisory and representation in consumer protection disputes, including defective products and services and unfair contract terms.',
    },
  },
]

export const industries: Array<{ slug: string; title: Bilingual; summary: Bilingual; businessProblems: Bilingual }> = [
  {
    slug: 'shipping-maritime',
    title: { ar: 'الشحن والقطاع البحري', en: 'Shipping & Maritime' },
    summary: { ar: 'دعم قانوني لشركات الشحن والملاحة.', en: 'Legal support for shipping and maritime companies.' },
    businessProblems: {
      ar: 'تواجه شركات الشحن تحديات تتعلق بمنازعات الشحن، مطالبات البضائع، عقود النقل البحري، والامتثال الجمركي.',
      en: 'Shipping companies face challenges around shipping disputes, cargo claims, carriage contracts, and customs compliance.',
    },
  },
  {
    slug: 'ports-logistics',
    title: { ar: 'الموانئ والخدمات اللوجستية', en: 'Ports & Logistics' },
    summary: { ar: 'دعم قانوني للشركات العاملة في الخدمات اللوجستية والموانئ.', en: 'Legal support for port and logistics operators.' },
    businessProblems: {
      ar: 'تحتاج شركات الخدمات اللوجستية إلى دعم قانوني في عقود النقل والتخزين والمنازعات التجارية المرتبطة بالتشغيل.',
      en: 'Logistics operators need legal support for transport and storage contracts and operational commercial disputes.',
    },
  },
  {
    slug: 'import-export',
    title: { ar: 'الاستيراد والتصدير', en: 'Import & Export' },
    summary: { ar: 'دعم قانوني لشركات الاستيراد والتصدير.', en: 'Legal support for import/export businesses.' },
    businessProblems: {
      ar: 'تحتاج شركات الاستيراد والتصدير إلى استشارات قانونية بشأن المستندات التجارية والإجراءات الجمركية.',
      en: 'Import/export businesses need legal advisory on trade documentation and customs procedures.',
    },
  },
  {
    slug: 'manufacturing',
    title: { ar: 'الصناعة والتصنيع', en: 'Manufacturing' },
    summary: { ar: 'دعم قانوني للشركات الصناعية.', en: 'Legal support for manufacturing businesses.' },
    businessProblems: {
      ar: 'تواجه الشركات الصناعية مسائل قانونية تتعلق بعقود التوريد وعلاقات العمل والامتثال التنظيمي.',
      en: 'Manufacturers face legal issues around supply contracts, employment relationships, and regulatory compliance.',
    },
  },
  {
    slug: 'real-estate',
    title: { ar: 'العقارات', en: 'Real Estate' },
    summary: { ar: 'دعم قانوني للمطورين والمستثمرين العقاريين.', en: 'Legal support for real estate developers and investors.' },
    businessProblems: {
      ar: 'يحتاج المطورون العقاريون إلى دعم قانوني في التسجيل العقاري والعقود مع المقاولين والمشترين.',
      en: 'Real estate developers need legal support for property registration and contracts with contractors and buyers.',
    },
  },
  {
    slug: 'trading-companies',
    title: { ar: 'شركات التجارة', en: 'Trading Companies' },
    summary: { ar: 'دعم قانوني لشركات التجارة العامة.', en: 'Legal support for general trading companies.' },
    businessProblems: {
      ar: 'تحتاج شركات التجارة إلى استشارات قانونية بشأن العقود التجارية وتحصيل الديون.',
      en: 'Trading companies need legal advisory on commercial contracts and debt recovery.',
    },
  },
  {
    slug: 'family-businesses-smes',
    title: { ar: 'الشركات العائلية والمنشآت الصغيرة والمتوسطة', en: 'Family Businesses & SMEs' },
    summary: { ar: 'دعم قانوني للشركات العائلية والمنشآت الصغيرة والمتوسطة.', en: 'Legal support for family businesses and SMEs.' },
    businessProblems: {
      ar: 'تحتاج المنشآت الصغيرة والمتوسطة والشركات العائلية إلى دعم قانوني في الحوكمة والعقود والامتثال.',
      en: 'SMEs and family businesses need legal support for governance, contracts, and compliance.',
    },
  },
]

/**
 * General legal-education content — YMYL discipline: explains concepts and
 * procedures in general terms only, cites no specific statute numbers (which
 * change and could be misquoted), makes no case-specific promises or outcome
 * guarantees, and always closes by pointing the reader to a real
 * consultation rather than presenting itself as a substitute for one. Every
 * article requires a legalReviewer at publish time (enforced in
 * Articles.ts, not just by convention) — see seed.ts.
 */
type ArticleCategory =
  | 'guides'
  | 'updates'
  | 'business'
  | 'litigation'
  | 'family'
  | 'criminal'
  | 'corporate'
  | 'maritime'
  | 'customs'
  | 'employment'
  | 'real-estate'
  | 'faqs'

export const articles: Array<{
  slug: string
  category: ArticleCategory
  title: Bilingual
  excerpt: Bilingual
  body: { ar: string[]; en: string[] }
}> = [
  {
    slug: 'what-is-civil-lawsuit',
    category: 'guides',
    title: { ar: 'ما هي الدعوى المدنية؟', en: 'What Is a Civil Lawsuit?' },
    excerpt: {
      ar: 'نظرة عامة على الدعوى المدنية: متى تُرفع، وما هي أطرافها، وما الفرق بينها وبين القضايا الجنائية.',
      en: 'An overview of civil lawsuits: when one is filed, who the parties are, and how they differ from criminal cases.',
    },
    body: {
      ar: [
        'الدعوى المدنية هي الوسيلة القانونية التي يلجأ إليها شخص (المدعي) للمطالبة بحق أمام المحكمة في مواجهة شخص آخر (المدعى عليه)، سواء كان هذا الحق ماليًا كالمطالبة بدين أو تعويض، أو عينيًا كالمطالبة بملكية أو حيازة شيء معين.',
        'تختلف الدعوى المدنية عن الدعوى الجنائية في أن الأولى تهدف إلى جبر ضرر أو استيفاء حق بين طرفين (أفراد أو شركات)، بينما تهدف الثانية إلى توقيع عقوبة على من يرتكب فعلاً مجرَّمًا قانونًا، وتُحرَّك الدعوى الجنائية من النيابة العامة وليس الأفراد.',
        'تمر الدعوى المدنية عادة بمراحل: تقديم صحيفة الدعوى، إعلان الخصم، تبادل المذكرات والمستندات بين الطرفين، ثم إصدار الحكم من المحكمة. وقد تُستأنف الأحكام أمام درجة تقاضٍ أعلى إذا توافرت أسباب الاستئناف.',
        'قبل رفع أي دعوى مدنية، من المهم تقييم موقفك القانوني والمستندات المتاحة لديك، لأن نجاح الدعوى يعتمد بشكل كبير على قوة الأدلة المقدمة. لمناقشة موقفك تحديدًا، يمكنك حجز استشارة مع فريقنا.',
      ],
      en: [
        'A civil lawsuit is the legal route a person (the claimant) takes to assert a right before the court against another person (the defendant) — whether that right is financial, such as a debt or compensation claim, or relates to property, such as a claim of ownership or possession.',
        'A civil case differs from a criminal case in that the former aims to remedy harm or enforce a right between two parties (individuals or companies), while the latter aims to impose a penalty for conduct the law criminalizes — and a criminal case is brought by the Public Prosecution, not by private individuals.',
        'A civil case typically moves through several stages: filing the statement of claim, serving the other party, an exchange of memoranda and documents between the parties, and finally a judgment from the court. Judgments may be appealed to a higher court where grounds for appeal exist.',
        'Before filing any civil claim, it is important to assess your legal position and the documentation available to you, since the outcome depends heavily on the strength of the evidence presented. To discuss your specific situation, you can book a consultation with our team.',
      ],
    },
  },
  {
    slug: 'what-to-review-before-signing-contract',
    category: 'business',
    title: {
      ar: 'أهم البنود التي يجب مراجعتها قبل توقيع أي عقد',
      en: 'Key Clauses to Review Before Signing Any Contract',
    },
    excerpt: {
      ar: 'قائمة بأهم البنود التي يجب الانتباه لها قبل توقيع عقد، سواء كان عقد عمل أو عقد بيع أو عقد شراكة.',
      en: 'A checklist of the clauses most worth your attention before signing any contract — whether an employment, sale, or partnership agreement.',
    },
    body: {
      ar: [
        'العقد هو القانون الذي يحكم العلاقة بين أطرافه، وما يُكتب فيه هو ما يُعتد به عند أي خلاف لاحق — لذلك فإن مراجعته بعناية قبل التوقيع أهم بكثير من محاولة تعديله أو الاعتراض عليه بعد ذلك.',
        'من أهم البنود التي تستحق مراجعة دقيقة: تحديد أطراف العقد ومحله بدقة، الالتزامات المتبادلة بين الطرفين ومواعيد تنفيذها، الشروط المالية وطريقة السداد، شروط الفسخ أو الإنهاء وأسبابه، وأي شروط جزائية أو غرامات تأخير.',
        'يجب أيضًا الانتباه إلى بنود تسوية المنازعات (هل يتم اللجوء للقضاء أم للتحكيم؟) والجهة أو المحكمة المختصة بالفصل في أي خلاف، لأن هذا يحدد الإجراءات المتاحة لك لاحقًا إذا لم يلتزم الطرف الآخر بتعهداته.',
        'لا تعتمد على الوعود الشفهية مهما كانت الثقة بين الأطراف — فقط ما هو مكتوب وموقَّع هو ما يُمكن إثباته والاستناد إليه. إذا كان لديك عقد تحتاج مراجعته قبل التوقيع، يسعدنا مساعدتك.',
      ],
      en: [
        'A contract is the law that governs the relationship between its parties — what is written in it is what will be relied upon in any later dispute, so reviewing it carefully before signing matters far more than trying to amend or dispute it afterward.',
        'Clauses that deserve close review include: a precise description of the parties and the contract\'s subject matter, the mutual obligations and their timelines, the financial terms and payment method, the conditions for termination and their grounds, and any penalty clauses or late-payment charges.',
        'Pay attention too to the dispute-resolution clause (litigation or arbitration?) and which court or body has jurisdiction over any dispute, since this determines what options are available to you later if the other party fails to honor their commitments.',
        'Do not rely on verbal promises, however much trust exists between the parties — only what is written and signed can be proven and relied upon. If you have a contract you need reviewed before signing, we would be glad to help.',
      ],
    },
  },
  {
    slug: 'when-can-you-claim-compensation',
    category: 'litigation',
    title: { ar: 'متى يحق لك المطالبة بالتعويض؟', en: 'When Are You Entitled to Claim Compensation?' },
    excerpt: {
      ar: 'الأسس العامة للمطالبة بالتعويض عن ضرر مدني، والعناصر التي تحتاج لإثباتها لدعم مطالبتك.',
      en: 'The general grounds for a civil compensation claim, and the elements you typically need to establish to support it.',
    },
    body: {
      ar: [
        'تقوم المسؤولية المدنية التي تستوجب التعويض عادة على توافر ثلاثة عناصر: وقوع خطأ (سواء بالإخلال بالتزام عقدي أو بارتكاب فعل ضار)، ووقوع ضرر فعلي على المتضرر، وقيام علاقة سببية مباشرة بين الخطأ والضرر.',
        'يشمل الضرر الذي يمكن المطالبة بالتعويض عنه الضرر المادي، كالخسارة المالية المباشرة أو الكسب الذي فات على المتضرر، وقد يشمل في حالات معينة الضرر الأدبي وفقًا لتقدير المحكمة للوقائع المعروضة عليها.',
        'يعتمد نجاح أي مطالبة بالتعويض بشكل أساسي على قدرة صاحب الحق على إثبات هذه العناصر بالمستندات والأدلة المتاحة — لذلك يُنصح بتوثيق أي واقعة ضرر فور حدوثها (مراسلات، فواتير، تقارير، شهود) بدلاً من الاعتماد على الذاكرة لاحقًا.',
        'كل حالة تعويض لها ظروفها الخاصة التي تؤثر على تقدير المحكمة لقيمة التعويض المناسب. إذا كنت تعرضت لضرر وتفكر في المطالبة بالتعويض، يمكننا مناقشة تفاصيل حالتك في استشارة مباشرة.',
      ],
      en: [
        'Civil liability that gives rise to compensation generally rests on three elements: a fault (whether a breach of a contractual obligation or a harmful act), actual harm suffered by the injured party, and a direct causal link between the fault and the harm.',
        'Compensable harm includes material damage, such as direct financial loss or lost gains the injured party would otherwise have made, and in certain cases may include moral/non-material harm, depending on the court\'s assessment of the facts before it.',
        'The success of any compensation claim depends primarily on the claimant\'s ability to establish these elements with available documents and evidence — so it is advisable to document any harmful incident as soon as it occurs (correspondence, invoices, reports, witnesses) rather than relying on memory later.',
        'Every compensation case has its own circumstances that affect how a court assesses the appropriate amount. If you have suffered harm and are considering a compensation claim, we can discuss the specifics of your case in a direct consultation.',
      ],
    },
  },
  {
    slug: 'how-civil-judgments-are-enforced',
    category: 'litigation',
    title: { ar: 'كيف يتم تنفيذ الأحكام المدنية؟', en: 'How Are Civil Judgments Enforced?' },
    excerpt: {
      ar: 'الحصول على حكم قضائي ليس نهاية الطريق دائمًا — إليك نظرة عامة على مرحلة التنفيذ وكيفية استيفاء الحق فعليًا.',
      en: 'Winning a judgment is not always the end of the road — an overview of the enforcement stage and how a right is actually collected.',
    },
    body: {
      ar: [
        'الحصول على حكم قضائي نهائي لصالحك هو خطوة مهمة، لكنه لا يعني تلقائيًا استلام حقك — فإذا لم يلتزم الطرف المحكوم عليه بتنفيذ الحكم طواعية، يصبح من الضروري اللجوء إلى إجراءات التنفيذ الجبري للحصول على الحق فعليًا.',
        'تبدأ إجراءات التنفيذ عادة بإعلان الحكم للمحكوم عليه ومنحه مهلة للتنفيذ الاختياري، فإذا لم يستجب، يمكن اللجوء إلى وسائل التنفيذ الجبري المتاحة قانونًا، والتي قد تشمل الحجز على أموال المدين أو ممتلكاته.',
        'تختلف الإجراءات والمدة الزمنية اللازمة للتنفيذ حسب طبيعة الحكم (مبلغ مالي، إخلاء عقار، تسليم منقول، إلخ) ووضع المدين المالي وتعاونه أو عدمه، لذلك من الصعب تحديد مدة موحدة لكل الحالات.',
        'متابعة ملف التنفيذ باستمرار ومعرفة الخطوة التالية المتاحة قانونيًا في كل مرحلة أمر أساسي لضمان استيفاء الحق فعليًا، وليس فقط الحصول على الحكم على الورق. لمساعدتك في متابعة تنفيذ حكم لصالحك، تواصل معنا.',
      ],
      en: [
        'Obtaining a final judgment in your favor is an important step, but it does not automatically mean you have received what you are owed — if the party against whom judgment was rendered does not comply voluntarily, resorting to enforcement proceedings becomes necessary to actually collect on the judgment.',
        'Enforcement proceedings typically begin by serving the judgment on the losing party and giving them a period for voluntary compliance; if they do not respond, the legally available means of compulsory enforcement can be pursued, which may include attaching the debtor\'s funds or property.',
        'The procedures and time required for enforcement vary depending on the nature of the judgment (a monetary sum, eviction of a property, delivery of movable property, etc.) and the debtor\'s financial situation and degree of cooperation, which makes it difficult to state a single timeline that applies to every case.',
        'Actively following up on an enforcement file and knowing the next legally available step at each stage is essential to actually collecting what you are owed, not just holding a judgment on paper. To get help pursuing enforcement of a judgment in your favor, get in touch with us.',
      ],
    },
  },
  {
    slug: 'how-is-an-estate-divided',
    category: 'family',
    title: { ar: 'كيف تُقسَّم التركة بين الورثة؟', en: 'How Is an Estate Divided Among Heirs?' },
    excerpt: {
      ar: 'خطوات عامة لتقسيم التركة بعد الوفاة، من حصر الأصول والديون إلى تحديد نصيب كل وارث.',
      en: 'The general steps for dividing an estate after death — from taking stock of assets and debts to determining each heir\'s share.',
    },
    body: {
      ar: [
        'تبدأ عملية تقسيم التركة عادة بحصرها بشكل دقيق: تحديد كل ما يملكه المتوفى من أموال وعقارات ومنقولات وحقوق مالية، إلى جانب حصر ما عليه من ديون والتزامات، حيث تُسدَّد الديون والالتزامات من التركة أولاً قبل توزيع الباقي على الورثة.',
        'بعد تحديد صافي التركة (الأصول بعد سداد الديون)، يتم تحديد الورثة الشرعيين ونصيب كل منهم وفقًا لأحكام الميراث المقررة، والتي تختلف الأنصبة فيها بحسب درجة القرابة للمتوفى ووجود ورثة آخرين من عدمه.',
        'كثيرًا ما تنشأ خلافات بين الورثة حول تقييم بعض عناصر التركة (خاصة العقارات وحصص الشركات) أو حول كيفية القسمة العملية للأصول غير القابلة للتجزئة، وفي هذه الحالات يمكن اللجوء إلى القسمة الرضائية بين الورثة أو دعوى القسمة القضائية إذا تعذر الاتفاق.',
        'كل تركة لها تفاصيلها الخاصة من حيث طبيعة الأصول وعدد الورثة والعلاقة بينهم. إذا كنت تواجه مسألة متعلقة بتقسيم تركة أو نزاع بين الورثة، يمكننا مساعدتك في استشارة مخصصة.',
      ],
      en: [
        'Dividing an estate typically begins with an accurate inventory: identifying everything the deceased owned — funds, real estate, movable property, and financial rights — alongside an inventory of their debts and obligations, since debts and obligations are settled from the estate first, before the remainder is distributed to the heirs.',
        'Once the net estate is determined (assets after debts are settled), the legal heirs are identified and each one\'s share is determined according to the applicable inheritance rules, which vary depending on the degree of kinship to the deceased and whether other heirs exist.',
        'Disputes among heirs often arise over how to value certain estate assets (particularly real estate and company shares) or over how to practically divide assets that cannot easily be split, and in such cases the heirs can pursue a consensual division among themselves or a judicial partition claim if agreement cannot be reached.',
        'Every estate has its own particulars in terms of the nature of the assets, the number of heirs, and the relationships among them. If you are facing an estate-division matter or a dispute among heirs, we can help in a dedicated consultation.',
      ],
    },
  },
  {
    slug: 'legal-considerations-real-estate-purchase-contracts',
    category: 'real-estate',
    title: {
      ar: 'أهم الاعتبارات القانونية في عقود بيع العقارات',
      en: 'Key Legal Considerations in Real Estate Purchase Contracts',
    },
    excerpt: {
      ar: 'نقاط أساسية يجب الانتباه لها قبل التوقيع على عقد بيع أو شراء عقار، من التحقق من الملكية إلى شروط التسجيل.',
      en: 'Essential points to check before signing a property sale contract — from verifying ownership to registration terms.',
    },
    body: {
      ar: [
        'قبل التوقيع على أي عقد بيع عقاري، من الضروري التحقق من سند ملكية البائع للعقار وخلوّه من أي نزاعات أو حقوق للغير عليه (كرهن أو حجز)، لأن شراء عقار من غير مالكه الحقيقي أو عقار مثقل بحقوق للغير قد يعرضك لخسارة كبيرة لاحقًا.',
        'يجب أن يتضمن العقد وصفًا دقيقًا للعقار (المساحة، الحدود، رقم القطعة إن وجد)، والثمن وطريقة وموعد سداده، وتاريخ التسليم الفعلي، والتزامات كل طرف بشأن المصروفات المرتبطة بالتسجيل والضرائب إن وجدت.',
        'تسجيل العقد بالشكل القانوني الصحيح أمر بالغ الأهمية لحماية حق الملكية بشكل كامل، ذلك أن العقد غير المسجَّل قد لا يمنح المشتري كافة الحقوق المقررة قانونًا في مواجهة الغير.',
        'كل صفقة عقارية لها ظروفها الخاصة، سواء كانت شراء وحدة سكنية أو أرض أو عقار تجاري. قبل توقيع أي عقد عقاري، تواصل معنا لمراجعته والتأكد من حماية حقوقك.',
      ],
      en: [
        'Before signing any real estate purchase contract, it is essential to verify the seller\'s title to the property and confirm it is free of disputes or third-party rights (such as a mortgage or attachment), since buying a property from someone who is not its true owner, or one encumbered by third-party rights, can expose you to significant loss later.',
        'The contract should include an accurate description of the property (area, boundaries, plot number if applicable), the price and how and when it will be paid, the actual delivery date, and each party\'s obligations regarding registration expenses and any applicable taxes.',
        'Properly registering the contract is critical to fully protecting ownership rights, since an unregistered contract may not grant the buyer the full rights the law provides against third parties.',
        'Every real estate transaction has its own particulars, whether it is the purchase of a residential unit, land, or a commercial property. Before signing any real estate contract, get in touch with us to have it reviewed and ensure your rights are protected.',
      ],
    },
  },
]

/**
 * General FAQs shown on the homepage (no relatedPracticeArea, so they are
 * not scoped to one practice area). Same YMYL discipline as `articles`:
 * general process/education only, no firm-specific claims that aren't
 * independently verified (pricing, guarantees, case outcomes, geographic
 * coverage beyond what's already stated elsewhere on the site).
 */
export const faqs: Array<{ question: Bilingual; answer: Bilingual }> = [
  {
    question: {
      ar: 'ما الفرق بين الاستشارة القانونية والتمثيل القضائي؟',
      en: 'What is the difference between a legal consultation and court representation?',
    },
    answer: {
      ar: 'الاستشارة القانونية توضح لك موقفك القانوني والخيارات المتاحة أمامك، أما التمثيل القضائي فهو أن يتولى المحامي متابعة قضيتك أمام المحكمة نيابة عنك من البداية حتى صدور الحكم.',
      en: 'A legal consultation explains your legal position and the options available to you, while court representation means a lawyer handles your case before the court on your behalf, from filing through to judgment.',
    },
  },
  {
    question: {
      ar: 'هل يمكن حل النزاع دون اللجوء للمحكمة؟',
      en: 'Can a dispute be resolved without going to court?',
    },
    answer: {
      ar: 'في كثير من الحالات نعم، من خلال التفاوض المباشر أو الوساطة أو التحكيم، وهي وسائل قد تكون أسرع وأقل تكلفة من التقاضي، حسب طبيعة النزاع ورغبة الأطراف.',
      en: 'In many cases, yes — through direct negotiation, mediation, or arbitration, which can be faster and less costly than litigation, depending on the nature of the dispute and the parties’ willingness.',
    },
  },
  {
    question: {
      ar: 'متى يجب أن أستشير محاميًا بخصوص عقد؟',
      en: 'When should I consult a lawyer about a contract?',
    },
    answer: {
      ar: 'يُفضَّل استشارة محامٍ قبل توقيع أي عقد ذي قيمة أو التزامات مهمة، وليس بعد نشوء خلاف، لأن المراجعة المسبقة تحمي حقوقك وتقلل احتمالية النزاع لاحقًا.',
      en: 'It is best to consult a lawyer before signing any contract of significant value or obligations, not after a dispute arises — a review beforehand protects your rights and reduces the likelihood of a later dispute.',
    },
  },
  {
    question: {
      ar: 'ما هي مدة صلاحية الحق في رفع الدعوى؟',
      en: 'Is there a time limit on the right to file a lawsuit?',
    },
    answer: {
      ar: 'تختلف مدة التقادم (سقوط الحق في رفع الدعوى) باختلاف نوع الحق والقضية، لذلك من المهم استشارة محامٍ في أقرب وقت بمجرد نشوء المشكلة حتى لا تفوت أي مواعيد قانونية.',
      en: 'The limitation period (after which the right to sue lapses) varies depending on the type of right and case, so it is important to consult a lawyer as soon as a problem arises so that no legal deadlines are missed.',
    },
  },
  {
    question: {
      ar: 'كيف أحجز استشارة مع مكتب آل حراز؟',
      en: 'How do I book a consultation with Al Harraz Law Firm?',
    },
    answer: {
      ar: 'يمكنك حجز استشارة من خلال نموذج طلب الاستشارة على الموقع، أو التواصل مباشرة عبر الهاتف أو واتساب الموضح في صفحة تواصل معنا.',
      en: 'You can book a consultation through the consultation request form on the website, or reach out directly by phone or WhatsApp using the details on the Contact page.',
    },
  },
  {
    question: {
      ar: 'هل الحصول على حكم قضائي يعني استيفاء حقي فعليًا؟',
      en: 'Does winning a court judgment mean I have actually received what I’m owed?',
    },
    answer: {
      ar: 'ليس بالضرورة — إذا لم يلتزم الطرف المحكوم عليه بتنفيذ الحكم طواعية، يصبح من الضروري اللجوء إلى إجراءات التنفيذ الجبري لاستيفاء الحق فعليًا، ومتابعة هذه المرحلة جزء أساسي من العمل على أي قضية.',
      en: 'Not necessarily — if the losing party does not comply voluntarily, enforcement proceedings become necessary to actually collect what is owed, and following through on that stage is an essential part of handling any case.',
    },
  },
]

export const founderYear = 1983
