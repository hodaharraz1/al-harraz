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
      ar: 'خبرة قانونية متخصصة في الأعمال البحرية والشحن والخدمات المرتبطة بالموانئ.',
      en: 'Specialized legal expertise in maritime affairs, shipping, and port-related services.',
    },
    overview: {
      ar: 'يقدم مكتب آل حراز خدمات قانونية متخصصة في المسائل البحرية والشحن، وتشمل منازعات الشحن، مطالبات البضائع، سندات الشحن، مسؤولية الناقل البحري، التخليص الجمركي، والتجارة الدولية.',
      en: 'Al Harraz Law Firm provides specialized legal services in maritime and shipping matters, including shipping disputes, cargo claims, bills of lading, carrier liability, customs clearance, and international trade.',
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
  {
    slug: 'mediation',
    order: 23,
    title: { ar: 'الوساطة', en: 'Mediation' },
    summary: {
      ar: 'تسوية النزاعات وديًا من خلال الوساطة كبديل للتقاضي.',
      en: 'Resolving disputes amicably through mediation as an alternative to litigation.',
    },
    overview: {
      ar: 'نساعد الأطراف على الوصول إلى تسوية ودية لنزاعاتهم من خلال الوساطة، وهي وسيلة أسرع وأقل تكلفة من التقاضي في كثير من الأحيان، مع الحفاظ على العلاقة بين الأطراف قدر الإمكان.',
      en: 'We help parties reach an amicable settlement of their disputes through mediation — often a faster, less costly alternative to litigation that helps preserve the relationship between the parties.',
    },
  },
  {
    slug: 'construction-contracting-law',
    order: 24,
    title: { ar: 'قانون المقاولات والعقود الإنشائية', en: 'Construction & Contracting Law' },
    summary: {
      ar: 'صياغة ومراجعة عقود المقاولات ومتابعة منازعات التنفيذ.',
      en: 'Drafting and reviewing construction contracts and handling execution disputes.',
    },
    overview: {
      ar: 'نقدم الاستشارات القانونية وصياغة ومراجعة عقود المقاولات والإنشاءات بين المالكين والمقاولين والموردين، ونمثل موكلينا في المنازعات الناشئة عن التأخير في التنفيذ أو عيوب الأعمال أو المطالبات المالية المرتبطة بهذه العقود.',
      en: 'We provide legal advisory and draft and review construction and contracting agreements between owners, contractors, and suppliers, and represent clients in disputes arising from execution delays, defective work, or financial claims connected to these contracts.',
    },
  },
  {
    slug: 'document-notarization-authentication',
    order: 25,
    title: { ar: 'التوثيق والتصديق على المستندات', en: 'Document Notarization & Authentication' },
    summary: {
      ar: 'متابعة إجراءات توثيق وتصديق العقود والتوكيلات.',
      en: 'Handling the procedures for notarizing and authenticating contracts and powers of attorney.',
    },
    overview: {
      ar: 'نتولى متابعة إجراءات توثيق وتصديق العقود والتوكيلات والمستندات القانونية أمام الجهات المختصة، بما يضمن سلامة الإجراءات من الناحية القانونية والشكلية.',
      en: 'We handle the procedures for notarizing and authenticating contracts, powers of attorney, and legal documents before the relevant authorities, ensuring the process is legally and procedurally sound.',
    },
  },
  {
    slug: 'data-protection-it-law',
    order: 26,
    title: { ar: 'حماية البيانات الشخصية وقانون تقنية المعلومات', en: 'Data Protection & IT Law' },
    summary: {
      ar: 'استشارات قانونية في حماية البيانات الشخصية والالتزامات الرقمية.',
      en: 'Legal advisory on personal data protection and digital compliance obligations.',
    },
    overview: {
      ar: 'نقدم استشارات قانونية للشركات والأفراد بشأن الالتزامات المتعلقة بحماية البيانات الشخصية وفقًا للقانون المصري، إلى جانب المسائل القانونية المرتبطة باستخدام التقنية والتعاملات الإلكترونية.',
      en: 'We advise companies and individuals on personal-data-protection obligations under Egyptian law, alongside legal matters related to the use of technology and electronic transactions.',
    },
  },
  {
    slug: 'competition-law',
    order: 27,
    title: { ar: 'قانون المنافسة ومنع الاحتكار', en: 'Competition & Antitrust Law' },
    summary: {
      ar: 'استشارات قانونية بشأن قواعد المنافسة ومنع الاحتكار.',
      en: 'Legal advisory on competition rules and anti-monopoly compliance.',
    },
    overview: {
      ar: 'نقدم الاستشارات القانونية للشركات بشأن الالتزام بقواعد المنافسة وتجنب الممارسات الاحتكارية وفقًا للقانون المصري، ونمثل موكلينا في المسائل المتعلقة بهذا المجال عند الحاجة.',
      en: 'We advise companies on complying with competition rules and avoiding monopolistic practices under Egyptian law, and represent clients on related matters as needed.',
    },
  },
  {
    slug: 'commercial-agency-distribution',
    order: 28,
    title: { ar: 'الوكالات التجارية والتوزيع', en: 'Commercial Agency & Distribution Law' },
    summary: {
      ar: 'استشارات قانونية في عقود الوكالة التجارية والتوزيع.',
      en: 'Legal advisory on commercial agency and distribution agreements.',
    },
    overview: {
      ar: 'نساعد الشركات والأفراد في صياغة ومراجعة عقود الوكالة التجارية والتوزيع، وتوضيح الحقوق والالتزامات القانونية لكل طرف وفقًا للقانون المصري المنظم لهذا النشاط.',
      en: 'We help companies and individuals draft and review commercial agency and distribution agreements, clarifying each party’s legal rights and obligations under the Egyptian law governing this activity.',
    },
  },
  {
    slug: 'bankruptcy-liquidation-restructuring',
    order: 29,
    title: { ar: 'الإفلاس وتصفية الشركات وإعادة الهيكلة', en: 'Bankruptcy, Liquidation & Restructuring' },
    summary: {
      ar: 'استشارات وتمثيل قانوني في إجراءات الإفلاس وتصفية الشركات.',
      en: 'Legal advisory and representation in bankruptcy and company liquidation proceedings.',
    },
    overview: {
      ar: 'نقدم الاستشارات القانونية والتمثيل في إجراءات الإفلاس وتصفية الشركات وإعادة الهيكلة المالية، بما يشمل حقوق الدائنين والمدينين وإجراءات التصفية أمام الجهات المختصة.',
      en: 'We provide legal advisory and representation in bankruptcy, company liquidation, and financial restructuring proceedings, covering the rights of creditors and debtors and liquidation procedures before the competent authorities.',
    },
  },
  {
    slug: 'medical-malpractice-liability',
    order: 30,
    title: { ar: 'الأخطاء الطبية والمسؤولية الطبية', en: 'Medical Malpractice & Healthcare Liability' },
    summary: {
      ar: 'تمثيل قانوني في دعاوى الأخطاء الطبية والمسؤولية الطبية.',
      en: 'Legal representation in medical malpractice and healthcare liability claims.',
    },
    overview: {
      ar: 'نمثل موكلينا في دعاوى الأخطاء الطبية والمسؤولية المترتبة على الممارسة الطبية، ونساعدهم على تقييم موقفهم القانوني وإثبات الضرر والمطالبة بالتعويض المناسب.',
      en: 'We represent clients in medical malpractice claims and liability arising from medical practice, helping them assess their legal position, establish harm, and pursue appropriate compensation.',
    },
  },
  {
    slug: 'immigration-residency-nationality',
    order: 31,
    title: { ar: 'الهجرة وإقامة الأجانب والجنسية', en: 'Immigration, Foreign Residency & Nationality' },
    summary: {
      ar: 'استشارات قانونية في إجراءات الإقامة والجنسية للأجانب في مصر.',
      en: 'Legal advisory on residency and nationality procedures for foreigners in Egypt.',
    },
    overview: {
      ar: 'نقدم الاستشارات القانونية للأفراد والشركات بشأن إجراءات إقامة الأجانب في مصر وطلبات الجنسية، بما يشمل توضيح المتطلبات القانونية ومتابعة الإجراءات أمام الجهات المختصة.',
      en: 'We advise individuals and companies on the legal procedures for foreign residency in Egypt and nationality applications, including clarifying legal requirements and following up on procedures before the competent authorities.',
    },
  },
  {
    slug: 'anti-money-laundering-compliance',
    order: 32,
    title: { ar: 'مكافحة غسل الأموال والامتثال', en: 'Anti-Money Laundering & Compliance' },
    summary: {
      ar: 'استشارات قانونية في الالتزام بقواعد مكافحة غسل الأموال.',
      en: 'Legal advisory on anti-money laundering compliance obligations.',
    },
    overview: {
      ar: 'نقدم الاستشارات القانونية للشركات بشأن الالتزام بقواعد مكافحة غسل الأموال وفقًا للقانون المصري، ونساعدها في تقييم مدى توافق أنشطتها وإجراءاتها الداخلية مع هذه الالتزامات.',
      en: 'We advise companies on complying with anti-money laundering rules under Egyptian law, and help them assess how well their activities and internal procedures align with these obligations.',
    },
  },
  {
    slug: 'ngo-foundation-registration',
    order: 33,
    title: { ar: 'تسجيل وإشهار الجمعيات الأهلية والمؤسسات', en: 'NGO & Foundation Registration' },
    summary: {
      ar: 'استشارات ومتابعة قانونية لتأسيس الجمعيات الأهلية والمؤسسات.',
      en: 'Legal advisory and support for establishing NGOs and foundations.',
    },
    overview: {
      ar: 'نساعد الأفراد والمجموعات في إجراءات تأسيس وإشهار الجمعيات الأهلية والمؤسسات الخاصة وفقًا للقانون المصري، ومتابعة أوضاعها القانونية بعد التأسيس.',
      en: 'We help individuals and groups with the procedures for establishing and registering NGOs and private foundations under Egyptian law, and with their ongoing legal compliance after establishment.',
    },
  },
  {
    slug: 'terms-privacy-policy-drafting',
    order: 34,
    title: { ar: 'صياغة الشروط والأحكام وسياسات الخصوصية', en: 'Terms of Service & Privacy Policy Drafting' },
    summary: {
      ar: 'صياغة شروط الاستخدام وسياسات الخصوصية للمواقع والتطبيقات.',
      en: 'Drafting terms of use and privacy policies for websites and mobile apps.',
    },
    overview: {
      ar: 'نساعد أصحاب المواقع الإلكترونية والتطبيقات في صياغة شروط الاستخدام وسياسات الخصوصية بما يتوافق مع القانون المصري، بما يوضح حقوق والتزامات المستخدمين وأصحاب المنصة على حد سواء.',
      en: 'We help website and app owners draft terms of use and privacy policies that comply with Egyptian law, clarifying the rights and obligations of both users and the platform owner.',
    },
  },
  {
    slug: 'commercial-activity-business-licensing',
    order: 35,
    title: { ar: 'تراخيص الأنشطة التجارية والمحال', en: 'Commercial Activity & Business Premises Licensing' },
    summary: {
      ar: 'متابعة إجراءات استخراج السجل التجاري والبطاقة الضريبية وتراخيص المحال.',
      en: 'Handling commercial registration, tax card, and business premises licensing procedures.',
    },
    overview: {
      ar: 'نساعد أصحاب الأعمال في متابعة إجراءات استخراج السجل التجاري والبطاقة الضريبية وترخيص المحال التجارية أمام الجهات المختصة، بما يضمن مزاولة النشاط بشكل قانوني سليم.',
      en: 'We help business owners with the procedures for obtaining commercial registration, a tax card, and business-premises licensing before the relevant authorities, ensuring the activity is carried out on a sound legal footing.',
    },
  },
  {
    slug: 'tech-activity-licensing-compliance',
    order: 36,
    title: { ar: 'تراخيص وامتثال الأنشطة التقنية', en: 'Tech Activity Licensing & Compliance' },
    summary: {
      ar: 'المساعدة في استيفاء متطلبات الترخيص والتسجيل القانوني للشركات الناشئة التقنية.',
      en: 'Helping tech startups meet licensing and legal registration requirements.',
    },
    overview: {
      ar: 'نساعد أصحاب الشركات الناشئة والتطبيقات الرقمية في استيفاء متطلبات التسجيل والترخيص القانوني اللازمة لمزاولة النشاط أمام الجهات المختصة، وفي صياغة العقود والسياسات التي يحتاجها هذا النوع من الأنشطة.',
      en: 'We help founders of tech startups and digital apps meet the legal registration and licensing requirements for operating their business before the relevant authorities, and draft the contracts and policies this kind of activity needs.',
    },
  },
  {
    slug: 'company-amendments-restructuring',
    order: 37,
    title: { ar: 'تعديل عقود الشركات وإعادة هيكلتها', en: 'Company Amendments & Restructuring' },
    summary: {
      ar: 'متابعة تعديل عقود التأسيس وزيادة رأس المال ونقل ملكية الحصص.',
      en: 'Handling amendments to articles of association, capital changes, and share transfers.',
    },
    overview: {
      ar: 'نساعد الشركات في إجراءات تعديل عقد التأسيس والنظام الأساسي، سواء بزيادة أو تخفيض رأس المال، أو تغيير النشاط، أو نقل ملكية الحصص والأسهم بين الشركاء، أمام الجهات المختصة.',
      en: 'We help companies amend their articles of association — whether by increasing or decreasing capital, changing the company’s activity, or transferring ownership of shares between partners — before the relevant authorities.',
    },
  },
  {
    slug: 'bounced-checks-negotiable-instruments',
    order: 38,
    title: { ar: 'قضايا الشيكات والأوراق التجارية', en: 'Bounced Checks & Negotiable Instruments' },
    summary: {
      ar: 'تمثيل قانوني في قضايا الشيكات بدون رصيد والأوراق التجارية.',
      en: 'Legal representation in bounced check cases and negotiable instrument disputes.',
    },
    overview: {
      ar: 'نمثل موكلينا في قضايا الشيكات بدون رصيد وغيرها من الأوراق التجارية كالكمبيالة والسند الإذني، سواء بصفتهم مستفيدين يطالبون باستيفاء حقهم أو ساحبين يحتاجون الدفاع عن موقفهم.',
      en: 'We represent clients in bounced check cases and disputes over other negotiable instruments such as bills of exchange and promissory notes, whether as a beneficiary seeking to collect what is owed or a drawer needing to defend their position.',
    },
  },
  {
    slug: 'power-of-attorney-drafting',
    order: 39,
    title: { ar: 'صياغة التوكيلات', en: 'Power of Attorney Drafting' },
    summary: {
      ar: 'صياغة التوكيلات العامة والخاصة بما يخدم غرضك بدقة.',
      en: 'Drafting general and special powers of attorney tailored precisely to your purpose.',
    },
    overview: {
      ar: 'نساعدك في صياغة التوكيل المناسب لغرضك، سواء كان توكيلًا عامًا أو خاصًا بأعمال محددة، مع الحرص على تحديد صلاحيات الوكيل بوضوح لتجنب أي لبس أو تجاوز لاحق.',
      en: 'We help you draft the right power of attorney for your purpose, whether general or limited to specific matters, taking care to clearly define the agent’s authority to avoid any ambiguity or overreach later.',
    },
  },
  {
    slug: 'legal-notices-formal-warnings',
    order: 40,
    title: { ar: 'الإنذارات القانونية الرسمية', en: 'Formal Legal Notices' },
    summary: {
      ar: 'تحرير وإرسال الإنذارات القانونية على يد محضر.',
      en: 'Drafting and serving formal legal notices through a court bailiff.',
    },
    overview: {
      ar: 'نتولى تحرير الإنذارات القانونية الرسمية وإرسالها على يد محضر في مختلف المسائل، كإنذارات إخلاء العقارات أو المطالبة بالمستحقات أو فسخ العقود، كخطوة أولى قد تجنبك اللجوء إلى التقاضي.',
      en: 'We draft and serve formal legal notices through a court bailiff on a range of matters — such as property eviction notices, demands for payment, or contract termination notices — as a first step that may help you avoid resorting to litigation.',
    },
  },
  {
    slug: 'wills-drafting',
    order: 41,
    title: { ar: 'كتابة الوصايا', en: 'Wills Drafting' },
    summary: {
      ar: 'صياغة الوصايا وفقًا لأحكام الشريعة والقانون المصري.',
      en: 'Drafting wills in accordance with Sharia principles and Egyptian law.',
    },
    overview: {
      ar: 'نساعدك في صياغة وصيتك بما يتوافق مع أحكام الشريعة الإسلامية والقانون المصري، بما يضمن وضوح رغباتك وتنفيذها بالشكل القانوني الصحيح.',
      en: 'We help you draft your will in a way that complies with Islamic Sharia principles and Egyptian law, ensuring your wishes are clear and can be properly carried out.',
    },
  },
  {
    slug: 'urgent-interim-matters',
    order: 42,
    title: { ar: 'قضايا الأمور المستعجلة', en: 'Urgent & Interim Court Matters' },
    summary: {
      ar: 'التمثيل في الدعاوى المستعجلة كوقف الأعمال الجديدة وإثبات الحالة.',
      en: 'Representation in urgent matters such as halting unauthorized work and evidence preservation.',
    },
    overview: {
      ar: 'نمثل موكلينا أمام قضاء الأمور المستعجلة في المسائل التي تستلزم إجراءً سريعًا، مثل دعاوى وقف الأعمال الجديدة أو إثبات الحالة أو طلبات الحراسة القضائية، حفاظًا على الحق من ضرر قد يتعذر تداركه لاحقًا.',
      en: 'We represent clients before the interim/urgent-matters courts on issues requiring swift action, such as halting unauthorized new work, evidence preservation, or requests for judicial sequestration, to protect a right from harm that may later be difficult to remedy.',
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
        'تمر الدعوى المدنية عادة بمراحل: تقديم صحيفة الدعوى، إعلان الخصم، تبادل المذكرات والمستندات بين الطرفين، ثم إصدار الحكم من المحكمة. وقد تُستأنف الأحكام أمام درجة تقاضٍ أعلى إذا توافرت أسباب الاستئناف. لمعرفة خطوات رفع الدعوى بالتفصيل، راجع [إجراءات رفع دعوى مدنية في مصر](/ar/insights/filing-a-civil-lawsuit-in-egypt).',
        'قبل رفع أي دعوى مدنية، من المهم تقييم موقفك القانوني والمستندات المتاحة لديك، لأن نجاح الدعوى يعتمد بشكل كبير على قوة الأدلة المقدمة. لمناقشة موقفك تحديدًا، يمكنك حجز استشارة مع فريقنا.',
      ],
      en: [
        'A civil lawsuit is the legal route a person (the claimant) takes to assert a right before the court against another person (the defendant) — whether that right is financial, such as a debt or compensation claim, or relates to property, such as a claim of ownership or possession.',
        'A civil case differs from a criminal case in that the former aims to remedy harm or enforce a right between two parties (individuals or companies), while the latter aims to impose a penalty for conduct the law criminalizes — and a criminal case is brought by the Public Prosecution, not by private individuals.',
        'A civil case typically moves through several stages: filing the statement of claim, serving the other party, an exchange of memoranda and documents between the parties, and finally a judgment from the court. Judgments may be appealed to a higher court where grounds for appeal exist. For the detailed filing steps, see [How to File a Civil Lawsuit in Egypt](/en/insights/filing-a-civil-lawsuit-in-egypt).',
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
        'متابعة ملف التنفيذ باستمرار ومعرفة الخطوة التالية المتاحة قانونيًا في كل مرحلة أمر أساسي لضمان استيفاء الحق فعليًا، وليس فقط الحصول على الحكم على الورق. إذا كان حقك عبارة عن دين تحديدًا، راجع أيضًا [تحصيل الديون في مصر: ما هي الخطوات القانونية المتاحة؟](/ar/insights/debt-recovery-legal-steps-egypt) لنظرة أشمل تبدأ من قبل صدور الحكم. لمساعدتك في متابعة تنفيذ حكم لصالحك، تواصل معنا.',
      ],
      en: [
        'Obtaining a final judgment in your favor is an important step, but it does not automatically mean you have received what you are owed — if the party against whom judgment was rendered does not comply voluntarily, resorting to enforcement proceedings becomes necessary to actually collect on the judgment.',
        'Enforcement proceedings typically begin by serving the judgment on the losing party and giving them a period for voluntary compliance; if they do not respond, the legally available means of compulsory enforcement can be pursued, which may include attaching the debtor\'s funds or property.',
        'The procedures and time required for enforcement vary depending on the nature of the judgment (a monetary sum, eviction of a property, delivery of movable property, etc.) and the debtor\'s financial situation and degree of cooperation, which makes it difficult to state a single timeline that applies to every case.',
        'Actively following up on an enforcement file and knowing the next legally available step at each stage is essential to actually collecting what you are owed, not just holding a judgment on paper. If your right is specifically a debt, see also [Debt Recovery in Egypt: What Legal Steps Are Available?](/en/insights/debt-recovery-legal-steps-egypt) for the fuller picture starting before judgment. To get help pursuing enforcement of a judgment in your favor, get in touch with us.',
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
        'كثيرًا ما تنشأ خلافات بين الورثة حول تقييم بعض عناصر التركة (خاصة العقارات وحصص الشركات) أو حول كيفية القسمة العملية للأصول غير القابلة للتجزئة، وفي هذه الحالات يمكن اللجوء إلى القسمة الرضائية بين الورثة أو دعوى القسمة القضائية إذا تعذر الاتفاق. لنظرة أوسع على أشهر أنواع هذه الخلافات، راجع [الخلافات الشائعة بين الورثة في مصر](/ar/insights/common-inheritance-disputes-egypt).',
        'كل تركة لها تفاصيلها الخاصة من حيث طبيعة الأصول وعدد الورثة والعلاقة بينهم. إذا كنت تواجه مسألة متعلقة بتقسيم تركة أو نزاع بين الورثة، يمكننا مساعدتك في استشارة مخصصة.',
      ],
      en: [
        'Dividing an estate typically begins with an accurate inventory: identifying everything the deceased owned — funds, real estate, movable property, and financial rights — alongside an inventory of their debts and obligations, since debts and obligations are settled from the estate first, before the remainder is distributed to the heirs.',
        'Once the net estate is determined (assets after debts are settled), the legal heirs are identified and each one\'s share is determined according to the applicable inheritance rules, which vary depending on the degree of kinship to the deceased and whether other heirs exist.',
        'Disputes among heirs often arise over how to value certain estate assets (particularly real estate and company shares) or over how to practically divide assets that cannot easily be split, and in such cases the heirs can pursue a consensual division among themselves or a judicial partition claim if agreement cannot be reached. For a broader look at the most common types of these disputes, see [Common Disputes Among Heirs in Egypt](/en/insights/common-inheritance-disputes-egypt).',
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
  {
    slug: 'rights-of-the-accused-in-criminal-cases',
    category: 'criminal',
    title: { ar: 'حقوق المتهم في القضايا الجنائية', en: 'Rights of the Accused in Criminal Cases' },
    excerpt: {
      ar: 'نظرة عامة على أهم الحقوق الدستورية والقانونية المكفولة للمتهم في مصر أثناء مراحل التحقيق والمحاكمة.',
      en: 'An overview of the key constitutional and legal rights guaranteed to a defendant in Egypt during investigation and trial.',
    },
    body: {
      ar: [
        'يكفل الدستور المصري والقانون للمتهم في أي قضية جنائية مجموعة من الحقوق الأساسية، تهدف إلى ضمان محاكمة عادلة منذ لحظة الاتهام وحتى صدور الحكم النهائي. أول هذه الحقوق هو افتراض البراءة، فالمتهم بريء حتى تثبت إدانته بحكم قضائي نهائي، ولا يجوز معاملته كمذنب قبل ذلك.',
        'يكفل القانون للمتهم أيضًا حق الاستعانة بمحامٍ في جميع مراحل التحقيق والمحاكمة، وفي بعض الحالات يكون حضور المحامي وجوبيًا ولا يصح إجراء التحقيق بدونه. ومن الحقوق المهمة كذلك حق المتهم في عدم إجباره على الإدلاء بأقوال تجرّمه، وحقه في العلم بالتهمة الموجهة إليه بوضوح حتى يتمكن من إعداد دفاعه.',
        'يخضع القبض والحبس الاحتياطي لضوابط وحدود زمنية ينظمها القانون، ولا يجوز حبس أي شخص إلا بأمر من جهة مختصة ووفق الإجراءات المقررة. معرفة هذه الحقوق منذ بداية أي إجراء جنائي أمر بالغ الأهمية، لأن أي إخلال بها قد يكون له أثر مباشر على سير القضية.',
        'إذا كنت طرفًا في قضية جنائية أو تحقيق، يُفضَّل دائمًا الاستعانة بمحامٍ في أقرب وقت ممكن. يمكنك حجز استشارة مع فريقنا لمناقشة موقفك تحديدًا.',
      ],
      en: [
        'The Egyptian Constitution and criminal law guarantee anyone accused in a criminal case a set of fundamental rights, intended to ensure a fair trial from the moment of accusation through to a final judgment. The first of these is the presumption of innocence — an accused person is innocent until proven guilty by a final court judgment, and may not be treated as guilty before that.',
        'The law also guarantees the right to legal representation throughout investigation and trial; in some cases, a lawyer\'s presence during investigation is mandatory and the investigation cannot proceed validly without it. Other important rights include the right not to be compelled to make self-incriminating statements, and the right to be clearly informed of the charge so the accused can prepare a defense.',
        'Arrest and pre-trial detention are also subject to legal limits and time restrictions, and no one may be detained except by order of a competent authority and in accordance with the procedures the law sets out. Understanding these rights from the outset of any criminal proceeding matters a great deal, since any breach of them can directly affect the outcome of a case.',
        'If you are involved in a criminal case or investigation, it is always advisable to engage a lawyer as early as possible. You can book a consultation with our team to discuss your specific situation.',
      ],
    },
  },
  {
    slug: 'difference-between-misdemeanor-and-felony',
    category: 'criminal',
    title: { ar: 'ما الفرق بين الجنحة والجناية؟', en: "What's the Difference Between a Misdemeanor and a Felony?" },
    excerpt: {
      ar: 'توضيح للفرق الأساسي بين الجنحة والجناية في القانون المصري، ولماذا يهم هذا التصنيف كل من يواجه اتهامًا جنائيًا.',
      en: 'A plain explanation of the core distinction between misdemeanors and felonies under Egyptian law, and why this classification matters to anyone facing a criminal accusation.',
    },
    body: {
      ar: [
        'يقسّم القانون المصري الجرائم إلى ثلاثة أنواع رئيسية من حيث الجسامة: المخالفات، والجنح، والجنايات، ويختلف كل نوع عن الآخر في العقوبة المقررة له والمحكمة المختصة بنظره. الجنحة هي الجريمة الأقل جسامة نسبيًا، وعقوبتها عادة الحبس لمدة محددة أو الغرامة، وتنظر فيها محكمة الجنح.',
        'أما الجناية فهي الجريمة الأشد خطورة، وعقوبتها قد تصل إلى السجن المشدد أو السجن أو الإعدام في الحالات التي ينص عليها القانون، وتنظرها محكمة الجنايات وفق إجراءات مختلفة عن إجراءات الجنح.',
        'هذا التصنيف ليس مجرد تفصيل شكلي، بل يترتب عليه فروق جوهرية تشمل مدة التقادم، وإجراءات المحاكمة، والجهة القضائية المختصة، وحتى إمكانية الطعن على الحكم. لذلك فإن تحديد التكييف القانوني الصحيح للواقعة منذ البداية له أثر مباشر على استراتيجية الدفاع بالكامل.',
        'إذا كنت تواجه اتهامًا جنائيًا ولا تعرف تصنيفه أو ما يترتب عليه، من الأفضل دائمًا استشارة محامٍ متخصص لفهم موقفك بدقة. يمكنك حجز استشارة مع فريقنا لمناقشة تفاصيل قضيتك.',
      ],
      en: [
        'Egyptian law divides crimes into three main categories by severity: infractions, misdemeanors, and felonies, each carrying a different range of penalties and falling under a different court\'s jurisdiction. A misdemeanor is a relatively less severe offense, typically punishable by a defined prison term or a fine, and is heard by the Misdemeanors Court.',
        'A felony, by contrast, is a more serious offense, with penalties that can reach aggravated imprisonment, imprisonment, or, in cases the law specifically provides for, the death penalty; felonies are heard by the Felonies (Criminal) Court under procedures that differ from misdemeanor proceedings.',
        'This classification is not a mere formality — it carries real consequences for limitation periods, trial procedure, which court has jurisdiction, and even the available avenues for appeal. Getting the legal characterization of an incident right from the start can directly shape an entire defense strategy.',
        'If you are facing a criminal accusation and are unsure how it is classified or what that means for you, it is always best to consult a specialized lawyer to understand your situation precisely. You can book a consultation with our team to discuss the details of your case.',
      ],
    },
  },
  {
    slug: 'filing-a-civil-lawsuit-in-egypt',
    category: 'litigation',
    title: { ar: 'إجراءات رفع دعوى مدنية في مصر: الخطوات الأساسية', en: 'How to File a Civil Lawsuit in Egypt: The Basic Steps' },
    excerpt: {
      ar: 'نظرة عامة مبسطة على الخطوات الأساسية لرفع دعوى مدنية أمام المحاكم المصرية، من تجهيز صحيفة الدعوى وحتى إعلان الخصم وأول جلسة.',
      en: 'A simplified overview of the basic steps for filing a civil lawsuit before Egyptian courts, from preparing the statement of claim through serving the defendant and the first hearing.',
    },
    body: {
      ar: [
        'قبل رفع أي دعوى، يحتاج المحامي إلى تجهيز ملف متكامل يشمل عادة: صحيفة الدعوى مكتوبة بصيغة قانونية سليمة، المستندات المؤيدة للطلب، وصورة من إثبات هوية الموكل. ثم يأتي تحديد المحكمة المختصة، وهي خطوة محورية تُبنى عادة على مكان إقامة المدعى عليه أو مكان تنفيذ الالتزام محل النزاع، ونوع وقيمة النزاع.',
        'بموجب قانون المرافعات المدنية والتجارية، تُرفع الدعوى غالبًا عن طريق صحيفة تودع في قلم كتاب المحكمة المختصة، وتشترط المواد من 63 إلى 66 من هذا القانون أن تتضمن الصحيفة بيانات أساسية مثل أسماء الخصوم وصفاتهم وعناوينهم، وعرضًا واضحًا لوقائع الدعوى، والأساس القانوني الذي تستند إليه المطالبة، والطلبات المحددة. بعد سداد الرسوم المقررة، يقوم قلم الكتاب بقيد الدعوى وإعطائها رقمًا وتحديد أول جلسة لنظرها.',
        'بعد قيد الدعوى، يتم إعلان الطرف الآخر رسميًا بواسطة محضرين، لإخطاره بالدعوى ومنحه فرصة إعداد دفاعه. وفي أول جلسة، عادة ما تُراجَع المسائل الإجرائية قبل الدخول في موضوع النزاع، ويتميز نظام التقاضي في مصر بوجود درجتين للتقاضي في الموضوع، بالإضافة إلى إمكانية الطعن بالنقض في مسائل قانونية معينة.',
        'هذه الخطوات نظرة عامة تعليمية فقط، والمواعيد والرسوم ومتطلبات كل دعوى تختلف بحسب طبيعة النزاع. إذا كنت لسه مش متأكد أصلاً إيه هي الدعوى المدنية ومتى تُرفع، راجع [ما هي الدعوى المدنية؟](/ar/insights/what-is-civil-lawsuit). لمناقشة موقفك تحديدًا، يمكنك حجز استشارة مع فريقنا.',
      ],
      en: [
        'Before filing, a lawyer typically needs to prepare a complete file that usually includes: a properly drafted statement of claim, supporting documents, and a copy of the client\'s identification. Then comes determining the competent court — a pivotal step generally based on the defendant\'s place of residence or the place where the disputed obligation is to be performed, and the type and value of the dispute.',
        'Under the Civil and Commercial Procedure Law, a lawsuit is generally initiated by filing a statement of claim with the clerk\'s office of the competent court. Articles 63 through 66 of this law require the statement to include core information such as the names, capacities, and addresses of the parties, a clear account of the facts, the legal grounds relied upon, and the specific relief requested. After the prescribed fees are paid, the clerk\'s office registers the case, assigns it a case number, and sets the date of the first hearing.',
        'After the case is registered, the other party is formally served by court bailiffs, to notify them of the lawsuit and give them the opportunity to prepare their defense. At the first hearing, procedural matters are typically reviewed before the substance of the dispute is addressed, and Egypt\'s litigation system generally provides two levels of review on the merits, in addition to the possibility of cassation on certain points of law.',
        'These steps are a general educational overview only — deadlines, fees, and the specific requirements of each case vary. If you are not yet sure what a civil lawsuit actually is or when to file one, see [What Is a Civil Lawsuit?](/en/insights/what-is-civil-lawsuit). To discuss your specific situation, you can book a consultation with our team.',
      ],
    },
  },
  {
    slug: 'breach-of-contract-rights-egypt',
    category: 'business',
    title: { ar: 'الإخلال بالعقد في القانون المصري: ما هي حقوق الطرف المتضرر؟', en: "Breach of Contract Under Egyptian Law: What Are the Aggrieved Party's Rights?" },
    excerpt: {
      ar: 'نظرة عامة على الخيارات المتاحة أمام الطرف الذي لم ينفَّذ التزامه التعاقدي في القانون المصري: المطالبة بالتنفيذ، أو الفسخ، مع التعويض في الحالتين.',
      en: "An overview of the options available under Egyptian law to a party whose contractual counterpart has failed to perform: demanding performance, or termination, with compensation available under either path.",
    },
    body: {
      ar: [
        'إذا لم يلتزم أحد طرفي عقد ملزم للجانبين بتنفيذ ما عليه، يحق للطرف الآخر أن يطالب — بعد إعذار الطرف المُخِل رسميًا — بتنفيذ العقد كما هو متفق عليه. هذا الخيار غالبًا ما يكون الأقرب لمصلحة الطرف المتضرر إذا كان التنفيذ لا يزال ممكنًا وغير مرهق بشكل غير متناسب للطرف الآخر.',
        'بدلًا من المطالبة بالتنفيذ، يجوز للطرف المتضرر أن يطلب من المحكمة فسخ العقد. وفقًا للمادة 157 من القانون المدني المصري، الفسخ في هذه الحالة فسخ قضائي يحتاج إلى حكم من المحكمة، وللقاضي سلطة تقديرية واسعة، فقد يمنح المدين مهلة لتنفيذ التزامه، وقد يرفض طلب الفسخ إذا كان ما لم يُنفَّذ جزءًا بسيطًا وغير جوهري من الالتزام. يجوز أيضًا للأطراف الاتفاق مسبقًا في العقد نفسه على شرط فسخ اتفاقي (المادة 158)، دون حاجة لرفع دعوى مستقلة.',
        'في بعض الحالات، قد يفضّل الطرف المتضرر الاكتفاء بالمطالبة بالتعويض النقدي دون طلب فسخ العقد أو تنفيذه، خاصة إذا كانت استمرارية العلاقة التعاقدية لا تزال ذات قيمة تجارية له. وإذا أصبح تنفيذ الالتزام مستحيلًا تمامًا، فإن القواعد العامة للفسخ والتعويض تختلف وتحتاج لتقييم قانوني دقيق لكل حالة.',
        'أفضل مسار يعتمد على ظروف كل عقد: هل التنفيذ لا يزال ممكنًا؟ هل الإخلال جوهري أم بسيط؟ لمناقشة موقفك تحديدًا، يمكنك حجز استشارة مع فريقنا.',
      ],
      en: [
        "If one party to a bilateral contract fails to perform, the other party may — after formally notifying the defaulting party of the default — demand that the contract be performed as agreed. This is often the option closest to the aggrieved party's interest when performance is still possible and would not impose disproportionate hardship on the other party.",
        'Instead of demanding performance, the aggrieved party may ask the court to terminate the contract. Under Article 157 of the Egyptian Civil Code, this termination is a judicial one, requiring a court judgment, and the judge has broad discretion — they may grant the debtor a grace period to perform, or may refuse termination if what was left unperformed is a minor, non-material part of the obligation. Parties may also agree in advance, within the contract itself, on a termination clause (Article 158), without needing to file a separate lawsuit.',
        'In some situations, the aggrieved party may prefer to simply claim monetary compensation without requesting termination or performance, particularly where continuing the contractual relationship still holds commercial value. If performance becomes entirely impossible, the general rules on termination and compensation differ and each situation requires careful individual legal assessment.',
        'The best path depends on the circumstances of each contract: is performance still possible? Is the breach material or minor? To discuss your specific situation, you can book a consultation with our team.',
      ],
    },
  },
  {
    slug: 'real-estate-registration-egypt',
    category: 'real-estate',
    title: { ar: 'لماذا تسجيل عقارك في الشهر العقاري ضروري؟', en: 'Why Registering Your Property at the Real Estate Registry Matters' },
    excerpt: {
      ar: 'كثير من الناس يكتفون بعقد بيع موقّع دون تسجيله رسميًا، وهو ما يعرّض ملكيتهم لمخاطر حقيقية — نظرة عامة على أهمية التسجيل وخطواته.',
      en: 'Many people rely on a signed sale contract without ever formally registering it, exposing their ownership to real risk — an overview of why official registration matters and the basic steps involved.',
    },
    body: {
      ar: [
        'من أكثر الأخطاء شيوعًا في مصر أن يكتفي المشتري بعقد بيع ابتدائي أو حتى عقد موثّق دون أن يسجّل ملكيته رسميًا في الشهر العقاري. هناك مساران للتعامل مع العقار في مصر: التسجيل الرسمي (الشهر العقاري)، الذي يمنح ملكية قانونية كاملة، والتوثيق (التصديق على التوقيع)، وهو إجراء أبسط لكنه لا يمنح ملكية كاملة، ويوفر حماية قانونية أضعف، وعادة لا يكون كافيًا للحصول على قروض بنكية أو عند إعادة البيع لاحقًا.',
        'يقوم نظام الشهر العقاري في مصر على قانون تنظيم الشهر العقاري رقم 114 لسنة 1946، إلى جانب أحكام القانون المدني رقم 131 لسنة 1948. وقد شهدت الإجراءات تبسيطًا كبيرًا بموجب القانون رقم 9 لسنة 2022، بعد التعديلات الأخيرة، تلتزم مأمورية الشهر العقاري بالانتهاء من فحص الطلب خلال مدة لا تتجاوز 37 يومًا من تاريخ استكمال المستندات — بعد أن كانت الإجراءات قديمًا تستغرق مددًا أطول بكثير.',
        'تختلف تفاصيل المستندات المطلوبة بحسب نوع العقار وطبيعة التصرف، لكنها تشمل عادة شهادة تصرفات عقارية حديثة، وإيصال مرافق حديث لتحديد موقع العقار، وبيان الرفع المساحي الرقمي الخاص بالعقار.',
        'التسجيل الرسمي هو الضمانة القانونية الحقيقية لملكيتك — فبدونه، قد تواجه صعوبة في إثبات ملكيتك أمام الغير أو الحصول على تمويل بنكي أو إعادة بيع العقار لاحقًا بسهولة. لمناقشة حالتك العقارية، يمكنك حجز استشارة مع فريقنا.',
      ],
      en: [
        'One of the most common mistakes in Egypt is for a buyer to rely on a preliminary sale contract, or even a notarized one, without formally registering ownership. There are two paths for dealing with real estate in Egypt: official registration, which grants full legal ownership, and notarization, a simpler procedure that does not confer full ownership, offers weaker legal protection, and is typically not sufficient for bank financing or a later resale.',
        "Egypt's real estate registration system is based on the Real Estate Registration Law No. 114 of 1946, alongside the Civil Code No. 131 of 1948. The process was significantly simplified by Law No. 9 of 2022 — following the recent amendments, the registration office must complete its review within a maximum of 37 days from the date the required documents are complete, a major reduction from the much longer timelines under the older procedure.",
        'The exact documents vary by property type and the nature of the transaction, but typically include a recent real-estate transactions certificate, a recent utility bill to precisely establish the property\'s location, and a digital cadastral survey statement.',
        "Official registration is the real legal guarantee of your ownership — without it, you may face difficulty conclusively proving ownership against third parties, obtaining bank financing, or easily reselling the property later. To discuss your property situation, you can book a consultation with our team.",
      ],
    },
  },
  {
    slug: 'debt-recovery-legal-steps-egypt',
    category: 'litigation',
    title: { ar: 'تحصيل الديون في مصر: ما هي الخطوات القانونية المتاحة؟', en: 'Debt Recovery in Egypt: What Legal Steps Are Available?' },
    excerpt: {
      ar: 'نظرة عامة على المسارات القانونية المتاحة لتحصيل دين مستحق في مصر، من الإنذار الودي وحتى أمر الأداء والدعوى القضائية والتنفيذ الفعلي.',
      en: 'An overview of the legal paths available for recovering an outstanding debt in Egypt, from an amicable demand notice through payment orders, litigation, and actual enforcement.',
    },
    body: {
      ar: [
        'قبل اللجوء للقضاء، غالبًا ما يكون التواصل المباشر أو الإنذار الرسمي بالسداد هو الخطوة الأولى الأكثر فعالية من حيث الوقت والتكلفة. إنذار مكتوب وواضح يوضح قيمة الدين وأساسه القانوني وموعد السداد المطلوب، قد يؤدي في كثير من الأحيان إلى تسوية سريعة دون الحاجة لإجراءات قضائية طويلة.',
        'إذا كان الدين موثقًا بمستندات واضحة (فواتير أو شيكات أو إيصالات تسليم) وغير محل نزاع جوهري، يمكن للدائن أن يلجأ إلى إجراء "أمر الأداء"، وهو مسار مبسّط وأسرع نسبيًا من الدعوى العادية. أما إذا كان الدين محل نزاع، فيصبح رفع دعوى قضائية عادية هو المسار المناسب، وبالنسبة للمنازعات التجارية المعقدة، قد تكون المحاكم الاقتصادية (المنشأة بموجب القانون رقم 120 لسنة 2008) هي الجهة المختصة.',
        'بعد الحصول على حكم أو أمر أداء نهائي، تأتي مرحلة التنفيذ الفعلي عبر إدارات التنفيذ، والتي قد تشمل الحجز على الحسابات البنكية أو الرواتب، أو الحجز على الأموال المنقولة وبيعها بالمزاد لاستيفاء الدين. لتفاصيل أوسع عن مرحلة التنفيذ نفسها بعد صدور الحكم، راجع [كيف يتم تنفيذ الأحكام المدنية؟](/ar/insights/how-civil-judgments-are-enforced).',
        'اختيار المسار الأنسب يعتمد على مدى توثيق الدين ومدى النزاع حوله وقيمته وطبيعته. لمناقشة حالتك تحديدًا، يمكنك حجز استشارة مع فريقنا.',
      ],
      en: [
        'Before turning to the courts, direct communication or a formal demand notice is often the most time- and cost-effective first step. A clear, well-drafted demand letter stating the amount owed, its legal basis, and the required payment date can frequently lead to a quick settlement without the need for lengthy court proceedings.',
        'If the debt is supported by clear documentation (invoices, checks, or delivery receipts) and its underlying basis is not seriously disputed, a creditor may pursue a "payment order" procedure — a simplified, comparatively faster track than ordinary litigation. If the debt is genuinely disputed, filing an ordinary lawsuit becomes the appropriate path, and for complex commercial disputes, Egypt\'s specialized Economic Courts (established under Law No. 120 of 2008) may be the competent forum.',
        'After obtaining a final judgment or payment order, the actual enforcement stage follows through the enforcement departments, which may include garnishing bank accounts or salaries, or seizing movable assets and selling them at auction to satisfy the debt. For a fuller look at the enforcement stage itself once a judgment exists, see [How Are Civil Judgments Enforced?](/en/insights/how-civil-judgments-are-enforced).',
        'Choosing the right path depends on how well-documented the debt is, whether it is disputed, and its value and nature. To discuss your specific situation, you can book a consultation with our team.',
      ],
    },
  },
  {
    slug: 'types-of-divorce-egyptian-law',
    category: 'family',
    title: { ar: 'أنواع الطلاق في القانون المصري: نظرة عامة', en: 'Types of Divorce Under Egyptian Law: An Overview' },
    excerpt: {
      ar: 'نظرة عامة تعريفية على الأنواع الرئيسية للطلاق المعترف بها في القانون المصري — الطلاق بالاتفاق، الطلاق للضرر، والخلع.',
      en: 'A general, definitional overview of the main types of divorce recognized under Egyptian law — consensual divorce, judicial divorce for harm, and khula.',
    },
    body: {
      ar: [
        'يتضمن القانون المصري أكثر من مسار قانوني لإنهاء العلاقة الزوجية، ولكل مسار شروطه وآثاره القانونية المختلفة، خاصة من حيث الحقوق المالية. الطلاق بالاتفاق (الرضائي) هو إنهاء العلاقة الزوجية باتفاق الطرفين دون اللجوء لدعوى قضائية نزاعية، وعادة ما يتضمن تسوية متفق عليها للحقوق المالية والحضانة.',
        'الطلاق القضائي للضرر مسار يمكن للزوجة أن تلجأ إليه أمام محكمة الأسرة، بطلب إنهاء الزواج بسبب ضرر يجعل استمرار الحياة الزوجية متعذرًا أو بالغ المشقة، على أن يخضع تقدير توافر الضرر لتقدير المحكمة في كل حالة وفقًا للأدلة المقدمة.',
        'منذ صدور القانون رقم 1 لسنة 2000، أصبح للزوجة الحق في طلب الخلع، أي إنهاء العلاقة الزوجية دون الحاجة لإثبات ضرر معين، لكن مقابل تنازلها عن بعض حقوقها المالية، مع بقاء حقها وحق أطفالها في الحضانة والنفقة المقررة لهم محفوظًا. الفارق الجوهري: في حالة الضرر تحتاج الزوجة لإثبات وقوع الضرر لكنها تحافظ عادة على حقوقها المالية بشكل أكبر، أما في الخلع فلا تحتاج لإثبات الضرر لكنها تتنازل عن بعض حقوقها المالية.',
        'هذه نظرة تعريفية عامة فقط، والوضع القانوني الدقيق لكل حالة يختلف بشكل جوهري. يُنصح دائمًا وبشدة بمراجعة محامٍ متخصص في الأحوال الشخصية، ويمكنك حجز استشارة مع فريقنا.',
      ],
      en: [
        "Egyptian law provides more than one legal path for ending a marriage, each with its own conditions and legal consequences — particularly regarding financial rights. Consensual divorce is the ending of a marriage by mutual agreement between the spouses, without resorting to a contentious court case, typically including an agreed settlement of financial rights and custody.",
        "Judicial divorce for harm is a path a wife may pursue before a family court, requesting the marriage be ended due to harm that makes continuing married life impossible or exceptionally difficult, with the court assessing, on a case-by-case basis, whether the harm is established, based on the evidence presented.",
        "Since the enactment of Law No. 1 of 2000, a wife has had the right to request khula — ending the marriage without needing to prove specific harm — in exchange for relinquishing certain financial rights, while her right and her children's right to custody and child support remain preserved. The core difference: in a harm-based case, the wife needs to prove the harm occurred but typically retains more of her financial rights; in khula, she doesn't need to prove harm but relinquishes certain financial rights.",
        "This is only a general, definitional overview, and the precise legal position in any individual case varies substantially. It is always strongly advisable to consult a lawyer specialized in personal status law, and you can book a consultation with our team.",
      ],
    },
  },
  {
    slug: 'arbitration-vs-litigation-egypt',
    category: 'litigation',
    title: { ar: 'التحكيم أم التقاضي؟ كيف تحسم النزاع التجاري في مصر', en: 'Arbitration or Litigation? Resolving a Commercial Dispute in Egypt' },
    excerpt: {
      ar: 'نظرة عامة على الفرق بين التقاضي أمام المحاكم والتحكيم كوسيلة لحل المنازعات التجارية في مصر، ومتى يكون كل مسار مناسبًا.',
      en: 'An overview of the difference between court litigation and arbitration for resolving commercial disputes in Egypt, and when each path tends to be suitable.',
    },
    body: {
      ar: [
        'عند نشوء نزاع تجاري، لا يكون التقاضي أمام المحاكم هو الخيار الوحيد المتاح. يمنح القانون المصري الأطراف إمكانية اللجوء إلى التحكيم، وهو ما ينظمه قانون التحكيم في المواد المدنية والتجارية رقم 27 لسنة 1994، والذي يستند إلى مبادئ حديثة معتمدة دوليًا.',
        'من أبرز ما يميز التحكيم: الخصوصية (إجراءات غير علنية)، والتخصص (يمكن اختيار محكّمين لديهم خبرة دقيقة في مجال النزاع)، ومرونة الإجراءات، واستقلالية شرط التحكيم عن العقد الأصلي حتى لو تم الطعن في صحة العقد نفسه. في المقابل، يظل التقاضي العادي الخيار المناسب أو الوحيد في حالات كثيرة، خاصة عند عدم وجود اتفاق تحكيم، أو عند الحاجة لدرجات تقاضٍ متعددة (استئناف ونقض)، بعكس أحكام التحكيم التي تكون نهائية غالبًا مع نطاق محدود جدًا للطعن.',
        'وفقًا للقانون، تختص المحكمة المختصة أصلًا بنظر النزاع بالفصل في مسائل التحكيم التي يحيلها القانون إلى القضاء، أما في حالة التحكيم التجاري الدولي فيكون الاختصاص لمحكمة استئناف القاهرة، ما لم يتفق الطرفان على اختصاص محكمة استئناف أخرى.',
        'الاختيار بين التحكيم والتقاضي يعتمد على وجود اتفاق تحكيم من عدمه، وأولوية الخصوصية، ومدى تعقيد النزاع. لمناقشة النزاع الخاص بك، يمكنك حجز استشارة مع فريقنا.',
      ],
      en: [
        'When a commercial dispute arises, going to court isn\'t the only option. Egyptian law allows parties to pursue arbitration, governed by the Arbitration Law in Civil and Commercial Matters No. 27 of 1994, based on internationally recognized modern arbitration principles.',
        "Arbitration's key features include confidentiality (private proceedings), expertise (parties can choose arbitrators with relevant technical knowledge), procedural flexibility, and the independence of an arbitration clause from the underlying contract even if that contract's validity is challenged. On the other hand, ordinary litigation remains the appropriate or only option in many situations, particularly where there is no arbitration agreement, or where multiple levels of review (appeal and cassation) are needed — unlike arbitral awards, which are generally final with a very limited scope for challenge.",
        'Under the law, matters relating to arbitration that the law refers to the judiciary are handled by the court that would otherwise have had jurisdiction. For international commercial arbitration, jurisdiction lies with the Cairo Court of Appeal, unless the parties agree on a different Court of Appeal.',
        "Choosing between arbitration and litigation depends on whether an arbitration agreement exists, how important confidentiality is, and how complex the dispute is. To discuss your dispute, you can book a consultation with our team.",
      ],
    },
  },
  {
    slug: 'types-of-companies-in-egypt',
    category: 'corporate',
    title: { ar: 'أنواع الشركات في مصر: أيهما يناسب مشروعك؟', en: 'Types of Companies in Egypt: Which One Fits Your Business?' },
    excerpt: {
      ar: 'نظرة عامة على الأشكال القانونية الرئيسية للشركات في مصر بموجب قانون الشركات رقم 159 لسنة 1981، والفرق بينه وبين قانون الاستثمار رقم 72 لسنة 2017.',
      en: 'An overview of the main legal forms of companies in Egypt under Companies Law No. 159 of 1981, and how it differs from Investment Law No. 72 of 2017.',
    },
    body: {
      ar: [
        'من أول القرارات المهمة عند بدء أي مشروع في مصر هو اختيار الشكل القانوني المناسب للشركة، وهو قرار يؤثر على المسؤولية القانونية للشركاء، ورأس المال المطلوب، وطريقة الإدارة. ينظم تأسيس معظم الشركات في مصر قانون شركات المساهمة وشركات التوصية بالأسهم والشركات ذات المسئولية المحدودة رقم 159 لسنة 1981.',
        'من أبرز الأشكال التي ينظمها هذا القانون: شركة المساهمة (مناسبة عادة للمشروعات كبيرة الحجم)، وشركة التوصية بالأسهم (شكل مختلط يجمع شركاء متضامنين وموصين)، والشركة ذات المسئولية المحدودة (الأكثر شيوعًا بين المشروعات الصغيرة والمتوسطة نظرًا لمرونتها)، وشركة الشخص الواحد (تسمح لمالك واحد بتأسيس شركة بمسؤولية محدودة دون شريك).',
        'على عكس ما قد يُفهم أحيانًا، فإن قانون الاستثمار رقم 72 لسنة 2017 لا يُعد بديلًا لقانون الشركات، بل نظامًا مكملًا له — يُلزم قانون الشركات كل الشركات بأحكامه الأساسية، بينما الخضوع لقانون الاستثمار اختياري واستراتيجي، ويمنح مزايا إضافية للمشروعات في قطاعات تحددها الدولة كأولوية استثمارية.',
        'اختيار الشكل القانوني المناسب يعتمد على حجم المشروع المتوقع، وعدد الشركاء، ومدى الحاجة لجذب مستثمرين لاحقًا. لمناقشة مشروعك، يمكنك حجز استشارة مع فريقنا.',
      ],
      en: [
        "One of the first important decisions when starting any venture in Egypt is choosing the right legal form for the company — a decision that affects the partners' legal liability, the required capital, and how the company is managed. The formation of most companies is governed by the Law on Joint Stock Companies, Partnerships Limited by Shares, and Limited Liability Companies No. 159 of 1981.",
        "Among the key forms this law regulates: the Joint Stock Company (typically suited to larger ventures), the Partnership Limited by Shares (a mixed form combining general and limited partners), the Limited Liability Company (the most common form among small and medium enterprises, due to its relative flexibility), and the Single-Person Company (allowing a sole owner to establish a company with limited liability without a partner).",
        "Contrary to a common misconception, Investment Law No. 72 of 2017 is not a substitute for the Companies Law — it's a complementary regime. While the Companies Law's core provisions bind every company, opting into the Investment Law's regime is optional and strategic, granting additional incentives for ventures in sectors the state designates as investment priorities.",
        "Choosing the right legal form depends on the venture's expected size, the number of partners, and the likely need to bring in investors later. To discuss your venture, you can book a consultation with our team.",
      ],
    },
  },
  {
    slug: 'new-labor-law-egypt-2025-overview',
    category: 'employment',
    title: { ar: 'قانون العمل الجديد رقم 14 لسنة 2025: ماذا تغيّر بخصوص إنهاء عقد العمل؟', en: "Egypt's New Labor Law No. 14 of 2025: What Changed for Ending an Employment Contract?" },
    excerpt: {
      ar: 'نظرة عامة مبدئية على أبرز التغييرات التي جاء بها قانون العمل الجديد رقم 14 لسنة 2025 بخصوص إنهاء عقد العمل.',
      en: "A preliminary, general overview of the notable changes Egypt's new Labor Law No. 14 of 2025 brought to the rules on ending an employment contract.",
    },
    body: {
      ar: [
        'دخل قانون العمل الجديد رقم 14 لسنة 2025 حيز التنفيذ اعتبارًا من سبتمبر 2025، وجاء بتعديلات مهمة على قواعد إنهاء عقد العمل مقارنة بالقانون السابق. نظرًا لحداثة هذا القانون، هذه نظرة عامة مبدئية جدًا وليست دليلًا تفصيليًا بالأرقام والحسابات.',
        'من التغييرات الواضحة في القانون الجديد: زيادة مدة الإخطار المطلوبة لإنهاء عقد العمل غير محدد المدة، سواء من جانب العامل أو صاحب العمل.',
        'ينظم القانون الجديد أيضًا استحقاق العامل لمكافأة أو تعويض عند انتهاء علاقة العمل، لكن طريقة الحساب تختلف بحسب الحالة: هل العقد محدد المدة أم غير محدد؟ هل الإنهاء من صاحب العمل أم العامل؟ هل السبب تأديبي أم غير تأديبي؟ لكل حالة قواعد مختلفة نسبيًا بموجب القانون الجديد، ولا يمكن تقديم رقم واحد يصلح لكل الحالات دون معرفة تفاصيل الحالة تحديدًا.',
        'لأن القانون حديث العهد جدًا وتفاصيل الحساب دقيقة، لا تعتمد على أي ملخص عام لحساب مستحقاتك أو التزاماتك. راجع محاميًا مباشرة لتطبيق القانون الجديد بدقة على ظروف حالتك — يمكنك حجز استشارة مع فريقنا.',
      ],
      en: [
        "Egypt's new Labor Law No. 14 of 2025 came into force in September 2025, bringing significant changes to the rules for ending an employment contract compared to the previous law. Given how new this law is, this is only a very preliminary general overview, not a detailed guide with exact figures and calculations.",
        'One clear change under the new law: the required notice period for ending an indefinite-term employment contract has increased, applying to either the employee or the employer.',
        "The new law also regulates an employee's entitlement to a gratuity or compensation when the employment relationship ends, but the calculation method differs by scenario: is the contract fixed-term or indefinite? Did the employer or employee initiate the termination? Was the reason disciplinary or non-disciplinary? Each scenario carries somewhat different rules, so no single figure fits every case without knowing the specific details.",
        "Because the law is very recent and the calculation details are precise, don't rely on any general summary to calculate your entitlements or obligations. Consult a lawyer directly to apply the new law accurately to your circumstances — you can book a consultation with our team.",
      ],
    },
  },
  {
    slug: 'challenging-administrative-decisions-egypt',
    category: 'guides',
    title: { ar: 'الطعن على القرار الإداري في مصر: نظرة عامة', en: 'Challenging an Administrative Decision in Egypt: An Overview' },
    excerpt: {
      ar: 'نظرة عامة على كيفية الطعن على قرار إداري أمام مجلس الدولة في مصر، والمواعيد المرتبطة بذلك، ودور التظلم الإداري.',
      en: "An overview of how to challenge an administrative decision before Egypt's State Council, the relevant deadlines, and the role of the administrative grievance.",
    },
    body: {
      ar: [
        'عندما يصدر قرار من جهة إدارية يرى المتضرر أنه غير قانوني، يمنحه القانون المصري حق الطعن عليه أمام القضاء الإداري. يختص مجلس الدولة، المنظم بموجب القانون رقم 47 لسنة 1972، دون غيره بالفصل في طلبات إلغاء القرارات الإدارية النهائية وسائر المنازعات الإدارية.',
        'القاعدة العامة أن ميعاد رفع دعوى إلغاء القرار الإداري هو ستون يومًا من تاريخ نشر القرار أو إعلان صاحب الشأن به. تجاوز هذا الميعاد دون رفع الدعوى قد يؤدي لعدم قبولها شكلًا، بصرف النظر عن مدى صحة الاعتراض من الناحية الموضوعية.',
        'يمكن لصاحب الشأن أن يتقدم بتظلم إلى الجهة الإدارية التي أصدرت القرار قبل رفع الدعوى، وهذا التظلم يقطع سريان ميعاد الستين يومًا. وإذا لم تُجب الجهة الإدارية عليه خلال ستين يومًا من تقديمه، اعتُبر ذلك بمثابة رفض ضمني، ليبدأ بعدها ميعاد جديد لرفع الدعوى. وهناك استثناء لحالة "اغتصاب السلطة"، حيث يُعتبر القرار منعدمًا ولا يتقيد الطعن عليه بميعاد الستين يومًا.',
        'أي تأخير قد يفوّت فرصة الطعن نهائيًا مهما كانت وجاهة الاعتراض. لذلك يُنصح بشدة بمراجعة محامٍ متخصص في القضاء الإداري فور صدور أي قرار تعتقد أنه أضر بحقوقك، ويمكنك حجز استشارة مع فريقنا.',
      ],
      en: [
        "When a government body issues a decision that an affected person believes is unlawful, Egyptian law grants them the right to challenge it before the administrative judiciary. Egypt's State Council, governed by Law No. 47 of 1972, has exclusive jurisdiction to rule on requests to annul final administrative decisions and other administrative disputes.",
        'The general rule is that the deadline for filing a lawsuit to annul an administrative decision is sixty days from the date the decision was published or the affected person was notified. Missing this deadline can result in the case being dismissed on procedural grounds, regardless of how valid the underlying objection may be.',
        'An affected person may submit a grievance to the government body that issued the decision before filing a lawsuit, which tolls the 60-day deadline. If the body does not respond within sixty days, this is treated as an implicit rejection, after which a new deadline begins. An exception exists for a severe lack of authority ("usurpation of power"), where the decision is treated as void and not bound by the 60-day deadline.',
        "Any delay can permanently forfeit the opportunity to challenge a decision, regardless of how valid the objection is on the merits. It's strongly advisable to consult a lawyer specialized in administrative litigation as soon as a decision is issued that you believe has harmed your rights — you can book a consultation with our team.",
      ],
    },
  },
  {
    slug: 'bill-of-lading-explained-egypt',
    category: 'maritime',
    title: { ar: 'سند الشحن البحري: ما هو ولماذا يهم؟', en: 'The Bill of Lading Explained: What It Is and Why It Matters' },
    excerpt: {
      ar: 'نظرة عامة على وظائف سند الشحن الثلاث في القانون البحري المصري، ولماذا يعتبر من أهم المستندات في التجارة البحرية.',
      en: "An overview of the bill of lading's three legal functions under Egyptian maritime law, and why it's one of the most important documents in maritime trade.",
    },
    body: {
      ar: [
        'سند الشحن هو المستند الذي يُصدره الناقل البحري أو ممثله للشاحن، بناءً على البيانات التي يقدمها الشاحن كتابةً عند تسليم البضاعة، ليُثبت استلام الناقل لهذه البضاعة وشحنها تمهيدًا لنقلها إلى جهة الوصول. في القانون المصري، يخضع عقد النقل البحري وسند الشحن بشكل أساسي لأحكام قانون التجارة البحرية رقم 8 لسنة 1990.',
        'لسند الشحن ثلاث وظائف قانونية: إثبات استلام البضاعة (يتمتع بحجية في إثبات استلام الناقل للبضاعة وكميتها وحالتها وقت الشحن)، وإثبات عقد النقل (شروط العقد بين الشاحن والناقل)، وسند ملكية قابل للتداول — إذ تنتقل الحيازة القانونية للبضاعة بتداول السند نفسه، وهو ما يجعله أداة أساسية في التمويل التجاري وإعادة بيع البضائع أثناء رحلة النقل.',
        'بموجب سند الشحن، يحق لأطراف العلاقة (الشاحن، المرسل إليه، الناقل)، وكذلك أي طرف انتقلت إليه الحقوق أو الحائز الشرعي للسند، أن يتخذ الإجراءات القانونية المرتبطة بعقد النقل، بما في ذلك المطالبة بالتعويض عن تلف البضاعة أو عدم تسليمها.',
        'أي نزاع يتعلق بتلف البضائع أو تأخر التسليم أو مسؤولية الناقل غالبًا ما يبدأ بفحص دقيق لبنود سند الشحن نفسه. للحصول على مساعدة في صياغة أو تفسير سند شحن، يمكنك حجز استشارة مع فريقنا.',
      ],
      en: [
        "A bill of lading is the document a maritime carrier or its representative issues to the shipper, based on the data the shipper provides in writing upon delivering the goods, confirming the carrier's receipt of the goods and their loading for transport to the agreed destination. Under Egyptian law, the maritime carriage contract and the bill of lading are primarily governed by the Maritime Trade Law No. 8 of 1990.",
        "The bill of lading serves three legal functions: evidence of receipt of the goods (carrying evidentiary weight regarding the carrier's receipt, quantity, and condition at loading), evidence of the carriage contract (the terms between shipper and carrier), and a negotiable document of title — legal possession of the goods transfers through negotiation of the document itself, making it a key instrument in trade finance and reselling goods while still in transit.",
        'Under a bill of lading, the parties to the relationship (the shipper, the consignee, the carrier), as well as any party to whom rights have passed or its legitimate holder, are entitled to pursue legal action related to the carriage contract, including claims for damaged or undelivered goods.',
        'Any dispute over cargo damage, delayed delivery, or carrier liability typically starts with a careful reading of the bill of lading\'s own terms. For help drafting or interpreting a bill of lading, you can book a consultation with our team.',
      ],
    },
  },
  {
    slug: 'evidence-in-civil-cases-egypt',
    category: 'litigation',
    title: {
      ar: 'إثبات الدعوى المدنية: ما هي وسائل الإثبات المعترف بها في القانون المصري؟',
      en: 'Evidence in Civil Cases: What Means of Proof Does Egyptian Law Recognize?',
    },
    excerpt: {
      ar: 'نظرة عامة على قانون الإثبات في المواد المدنية والتجارية في مصر: من يتحمل عبء الإثبات، وما هي وسائل الإثبات الأساسية التي يعتمدها القانون.',
      en: "An overview of Egypt's Evidence Law in civil and commercial matters: who carries the burden of proof, and what core means of proof Egyptian law recognizes.",
    },
    body: {
      ar: [
        'يُنظَّم الإثبات في الدعاوى المدنية والتجارية في مصر بموجب قانون الإثبات في المواد المدنية والتجارية رقم 25 لسنة 1968. هذا القانون هو المرجع الأساسي الذي يحدد كيف يمكن لأي طرف في نزاع أن يُثبت حقه أمام القضاء، وأي وسائل الإثبات يعتد بها القانون.',
        'القاعدة الأساسية في توزيع عبء الإثبات هي أن على المدعي إثبات الحق الذي يدعيه، وعلى من يدفع بانقضاء هذا الحق أو التحلل منه أن يثبت ذلك (المادة الأولى من قانون الإثبات) — وهو ما يُعرف بمبدأ "البينة على من ادّعى". بعبارة أخرى: من يطالب بحق أمام المحكمة هو من يتحمل، من حيث الأصل، عبء تقديم الدليل عليه.',
        'يعتمد القانون المصري على عدة وسائل إثبات رئيسية، من أبرزها: الكتابة (المحررات) — وتُعد عمومًا من أقوى وسائل الإثبات في المسائل المدنية، وشهادة الشهود، والإقرار — وهو اعتراف الخصم أمام القضاء بواقعة يدّعيها خصمه، والقرائن — أي استنتاج واقعة مجهولة من واقعة أخرى ثابتة ومعلومة، واليمين — التي يلجأ إليها أحد الخصمين عند تعذر إثبات حقه بوسائل أخرى، والخبرة — أي الاستعانة بأهل الخبرة الفنية في المسائل التي تتطلب معرفة متخصصة، وقد تشمل أيضًا معاينة المحكمة للشيء محل النزاع.',
        'من المهم التنبيه إلى أن المسائل التجارية تحظى عمومًا بمرونة أكبر في وسائل الإثبات مقارنة بالمسائل المدنية البحتة، نظرًا لطبيعة المعاملات التجارية السريعة. أما التفاصيل الدقيقة لكل وسيلة إثبات، وشروط قبولها في كل حالة، فتختلف باختلاف وقائع كل قضية، ولذلك تبقى الاستشارة القانونية المتخصصة ضرورية قبل الشروع في أي إجراء.',
        'قوة موقفك في أي دعوى مدنية ترتبط ارتباطًا مباشرًا بجودة الأدلة التي تملكها وكيفية تقديمها للمحكمة. لتقييم الأدلة المتاحة لديك في نزاعكم تحديدًا، يمكنكم حجز استشارة مع فريقنا.',
      ],
      en: [
        'Evidence in Egyptian civil and commercial litigation is governed by the Law of Evidence in Civil and Commercial Matters No. 25 of 1968. This is the primary legislative reference that determines how a party to a dispute can prove their right before the court, and which means of proof the law recognizes.',
        'The basic rule allocating the burden of proof is that the claimant must prove the right they are asserting, while a party arguing that a right has lapsed or been discharged must prove that (Article 1 of the Evidence Law) — commonly summarized as "the burden of proof falls on whoever asserts a claim." In other words, whoever brings a claim before the court generally bears, as a starting point, the burden of supporting it with evidence.',
        "Egyptian law recognizes several principal means of proof, most notably: documentary evidence (writing) — generally regarded as among the strongest forms of proof in civil matters, witness testimony, admission — an acknowledgment by one party, before the court, of a fact asserted by the other party, presumptions — inferring an unknown fact from another fact that is established and known, oath — used by a party when other means of proving their right are unavailable, and expert opinion — engaging technical experts on matters requiring specialized knowledge, which may also involve the court's own inspection of the disputed matter.",
        "It's worth noting that commercial matters generally enjoy greater flexibility in permissible means of proof compared to purely civil matters, given the fast-moving nature of commercial dealings. The precise conditions for each means of proof, and what's admissible in a given case, vary by the specific facts — which is why specialized legal advice remains essential before taking any action.",
        'The strength of your position in any civil case is directly tied to the quality of the evidence you hold and how it\'s presented to the court. To evaluate the evidence available in your specific dispute, you can book a consultation with our team.',
      ],
    },
  },
  {
    slug: 'real-estate-buyer-legal-checklist-egypt',
    category: 'real-estate',
    title: {
      ar: 'قائمة مراجعة قانونية قبل شراء عقار في مصر: 6 نقاط لازم تتأكد منها',
      en: 'Legal Checklist Before Buying Property in Egypt: 6 Things to Verify',
    },
    excerpt: {
      ar: 'قائمة عملية بأهم النقاط القانونية اللي لازم تتحقق منها قبل شراء أي عقار في مصر، من التسجيل الرسمي للملكية لحد خلو العقار من الأعباء والمخالفات.',
      en: 'A practical checklist of the key legal points to verify before buying any property in Egypt — from formal ownership registration to liens and building-code compliance.',
    },
    body: {
      ar: [
        'شراء عقار قرار كبير، والمخاطر القانونية فيه حقيقية لو اتعمل من غير مراجعة كافية. النقاط الست دي مش بديل عن استشارة محامٍ متخصص قبل التوقيع، لكنها نقطة بداية لأي شخص بيفكر يشتري عقار في مصر.',
        'تأكد من وجود سند ملكية مُسجَّل رسميًا في الشهر العقاري. العقد المسجَّل هو سند الملكية الوحيد المعتد به قانونًا في مصر — عقد البيع الابتدائي (غير المسجَّل)، حتى لو موقَّع من الطرفين، لا يُنشئ ملكية نهائية بذاته، ويظل البائع الأصلي هو المالك المسجَّل حتى تمام تسجيل العقد. لمزيد من التفاصيل، راجع [لماذا تسجيل عقارك في الشهر العقاري ضروري؟](/ar/insights/real-estate-registration-egypt).',
        'اطلب مستخرجًا رسميًا من الشهر العقاري يوضّح سلسلة الملكية. هذا يساعد في التحقق من أن كل انتقال سابق للملكية تم بشكل صحيح، وأن البائع الحالي يملك بالفعل الحق في البيع.',
        'تحقق من خلو العقار من أي رهون أو أعباء أو حقوق للغير. الرهن العقاري أو أي نزاع قضائي قائم على العقار قد ينتقل معه حتى بعد البيع إذا لم يُكتشف قبل التوقيع.',
        'راجع رخصة البناء وموقف العقار من مخالفات البناء إن وُجدت. التأكد من الجهة الإدارية المختصة بخصوص سلامة الترخيص وأي مخالفات قائمة يحتاج تصالحًا، لأن ذلك قد يؤثر على قيمة العقار أو حتى إمكانية التصرف فيه مستقبلًا.',
        'تأكد من سداد آخر مستحقات الضرائب العقارية ورسوم المرافق. أي متأخرات ضريبية أو متأخرات كهرباء/مياه/غاز قد تنتقل كعبء إداري يواجهه المالك الجديد عند نقل العدادات باسمه.',
        'إذا كان البيع يتم من خلال وكيل، تأكد من صحة وسريان التوكيل. التوكيل غير الساري أو غير الصحيح من أبرز أسباب النزاعات في صفقات العقارات — يجب التحقق من تاريخه ونطاق الصلاحيات الممنوحة فيه بدقة.',
        'هذه القائمة تغطي النقاط الأساسية، لكن كل عقار له ظروفه الخاصة، ومراجعة محامٍ متخصص قبل التوقيع على أي عقد أو دفع أي مبلغ يبقى الخطوة الأهم لحماية حقوقك. يمكنكم حجز استشارة مع فريقنا لمراجعة عقاركم المحدد.',
      ],
      en: [
        "Buying property is a major decision, and the legal risks are real without adequate review. These six points aren't a substitute for consulting a specialized lawyer before signing — they're a starting point for anyone considering a property purchase in Egypt.",
        "Confirm there's a title formally registered at the Real Estate Registry (Shahr Al-Aqari). A registered contract is the only legally recognized proof of ownership in Egypt — an unregistered preliminary sale contract, even if signed by both parties, does not by itself create final ownership, and the original seller remains the registered owner until the contract is formally registered. For more detail, see [Why Registering Your Property at the Real Estate Registry Matters](/en/insights/real-estate-registration-egypt).",
        'Request an official extract from the Real Estate Registry showing the chain of title. This helps confirm that every prior transfer of ownership was validly executed, and that the current seller genuinely holds the right to sell.',
        'Verify the property is free of mortgages, liens, or third-party claims. A registered mortgage or an ongoing legal dispute over the property can carry over even after a sale if it isn\'t uncovered before signing.',
        "Review the building permit and the property's building-code compliance status, if applicable. Confirming the license's validity and any outstanding violations with the relevant administrative authority matters, since this can affect the property's value or even the ability to deal with it in the future.",
        'Confirm the latest property tax and utility payments are settled. Any outstanding tax or electricity/water/gas arrears can become an administrative burden for the new owner when transferring meters into their name.',
        "If the sale is being made through an agent, verify the power of attorney is valid and current. An expired or invalid power of attorney is among the most common sources of disputes in property transactions — check its date and the exact scope of authority it grants.",
        'This checklist covers the essentials, but every property has its own circumstances, and consulting a specialized lawyer before signing any contract or making any payment remains the most important step to protect your rights. You can book a consultation with our team to review your specific property.',
      ],
    },
  },
  {
    slug: 'common-inheritance-disputes-egypt',
    category: 'family',
    title: {
      ar: 'الخلافات الشائعة بين الورثة في مصر: كيف تنشأ ومتى تحتاج لمحامٍ؟',
      en: 'Common Disputes Among Heirs in Egypt: How They Arise and When You Need a Lawyer',
    },
    excerpt: {
      ar: 'نظرة عامة على أكثر أنواع الخلافات شيوعًا بين الورثة عند تقسيم التركة في مصر، وأسبابها الشائعة.',
      en: 'An overview of the most common types of disputes that arise among heirs when dividing an estate in Egypt, and their typical causes.',
    },
    body: {
      ar: [
        'يُنظَّم الميراث في مصر بشكل أساسي بموجب قانون المواريث رقم 77 لسنة 1943، الذي يطبّق أحكام الشريعة الإسلامية في تحديد الورثة ونصيب كل منهم. ورغم وضوح هذه القواعد من الناحية القانونية، تنشأ خلافات حقيقية وشائعة عند التطبيق العملي لتقسيم التركة. فيما يلي أبرز أنواع هذه الخلافات.',
        'عدم الاتفاق على قيمة التركة: من أكثر الخلافات شيوعًا هو عدم اتفاق الورثة على القيمة المالية الحقيقية للعقارات أو الأصول الأخرى المتروكة، خاصة عندما لا يوجد تقييم رسمي محايد متفق عليه بين الجميع.',
        'صعوبة قسمة الأعيان العقارية: كثيرًا ما تكون التركة عبارة عن عقار واحد لا يمكن تقسيمه عينيًا بين الورثة دون الإضرار به، فيرى بعض الورثة ضرورة بيعه وتقسيم ثمنه، بينما يرفض آخرون ذلك لأسباب عاطفية أو مادية.',
        'امتناع بعض الورثة عن المشاركة في التقسيم: قد يمتنع أحد الورثة عن التعاون في إجراءات القسمة الودية، سواء بالرفض الصريح أو بالتسويف المستمر، مما يضطر باقي الورثة للجوء إلى القضاء لإنهاء حالة الشيوع في الملكية.',
        'حرمان بعض الورثة من نصيبهم الشرعي: للأسف لا تزال هذه مشكلة موثّقة في الممارسة العملية، وتحدث غالبًا بحرمان الإناث من الورثة تحديدًا من نصيبهن، سواء بالامتناع عن تسجيل نصيبهن أو بالضغط عليهن للتنازل عنه. القانون المصري يكفل للورثة الإناث نفس الحماية القانونية للمطالبة بحقهن قضائيًا.',
        'تصرفات مشبوهة قبل الوفاة: في بعض الحالات، يلجأ المورِّث أو بعض الورثة إلى تحرير عقود بيع أو تصرفات صورية قبل الوفاة بهدف استبعاد وريث معين من التركة، وهو ما يمكن الطعن عليه قضائيًا إذا ثبتت الصورية.',
        'وجود قُصَّر أو غائبين بين الورثة: وجود ورثة قاصرين أو غائبين يزيد من تعقيد إجراءات القسمة، لأن هؤلاء لا يملكون الأهلية القانونية الكاملة لاتخاذ قرارات التصرف أو التنازل بأنفسهم.',
        'قبل الدخول في أي قسمة، من المهم التأكد من حصر كامل لأصول وديون التركة أولًا — فالديون المستحقة على المتوفى تُسدَّد عادة من التركة قبل تقسيمها بين الورثة. لمناقشة حالة تركة محددة، يمكنكم حجز استشارة مع فريقنا. يمكنكم أيضًا مراجعة [كيف تُقسَّم التركة بين الورثة؟](/ar/insights/how-is-an-estate-divided) لنظرة عامة على خطوات القسمة نفسها.',
      ],
      en: [
        'Inheritance in Egypt is primarily governed by Law No. 77 of 1943, which applies Islamic Sharia principles to determine heirs and each one\'s share. Despite these rules being legally clear, real and common disputes arise in the practical process of dividing an estate. Below are the most notable types.',
        'Disagreement over the estate\'s value: One of the most common disputes is heirs failing to agree on the true market value of inherited real estate or other assets, especially where there is no neutral, agreed-upon formal valuation.',
        'Difficulty dividing indivisible real estate: The estate is often a single piece of property that cannot be physically divided among heirs without harming it, leading some heirs to favor selling it and dividing the proceeds while others refuse, for emotional or financial reasons.',
        'Some heirs refusing to participate in the division: An heir may refuse to cooperate with an amicable division process, whether through outright refusal or persistent delay, forcing the remaining heirs to turn to the courts to end the state of co-ownership.',
        'Denial of some heirs\' rightful share: This unfortunately remains a documented problem in practice, most often affecting female heirs specifically — through refusing to register their share or pressuring them to waive it. Egyptian law affords female heirs the same legal protection to pursue their rights through the courts.',
        'Suspicious transactions before death: In some cases, the deceased or certain heirs execute sham sale contracts or transfers before death intended to exclude a particular heir from the estate — something that can be legally challenged if the sham nature of the transaction is proven.',
        'Minor or absent heirs: The presence of minor or absent (missing) heirs adds complexity to the division process, since they lack full legal capacity to make disposal or waiver decisions on their own.',
        'Before any division, it is important to first take complete stock of the estate\'s assets and debts — debts owed by the deceased are typically settled from the estate before it is divided among heirs. To discuss a specific estate situation, you can book a consultation with our team. You can also see [How Is an Estate Divided Among Heirs?](/en/insights/how-is-an-estate-divided) for an overview of the division process itself.',
      ],
    },
  },
]

/**
 * FAQs previously seeded, now replaced (see `faqs` below) — kept here only
 * so seed.ts can find-and-remove them by their old Arabic question text on
 * the next deploy. Do not add to this list; remove entries once confirmed
 * gone from production.
 */
export const retiredFaqQuestionsAr: string[] = [
  'ما الفرق بين الاستشارة القانونية والتمثيل القضائي؟',
  'هل يمكن حل النزاع دون اللجوء للمحكمة؟',
  'متى يجب أن أستشير محاميًا بخصوص عقد؟',
  'ما هي مدة صلاحية الحق في رفع الدعوى؟',
  'كيف أحجز استشارة مع مكتب آل حراز؟',
  'هل الحصول على حكم قضائي يعني استيفاء حقي فعليًا؟',
]

/**
 * General FAQs shown on the homepage (no relatedPracticeArea, so they are
 * not scoped to one practice area). Written from a prospective client's
 * point of view — the practical questions someone actually weighs before
 * reaching out (cost, confidentiality, process, attendance) rather than
 * abstract legal-education explainers. Same YMYL discipline as `articles`:
 * no firm-specific claims that aren't independently verified (no promise of
 * free consultations, no specific fee figures, no coverage-area claim
 * beyond what's verified elsewhere on the site).
 */
export const faqs: Array<{ question: Bilingual; answer: Bilingual; relatedPracticeAreaSlug?: string }> = [
  {
    question: {
      ar: 'هل يمكنني حجز استشارة عن طريق الهاتف أو واتساب من غير ما أحضر المكتب؟',
      en: 'Can I book a consultation by phone or WhatsApp without visiting the office in person?',
    },
    answer: {
      ar: 'نعم، يمكنك التواصل الأولي وحجز استشارة من خلال نموذج طلب الاستشارة على الموقع، أو عبر الهاتف أو واتساب الموضحين في صفحة تواصل معنا، وبعدها نوضح لك إذا كان موضوعك يحتاج حضورك للمكتب أو يمكن استكمال جزء منه عن بُعد.',
      en: 'Yes — you can make initial contact and book a consultation through the consultation request form on the website, or by phone or WhatsApp using the details on the Contact page. We’ll then let you know whether your matter needs an in-person visit or can be handled partly remotely.',
    },
  },
  {
    question: {
      ar: 'كام تكلفة الاستشارة أو أتعاب المحامي؟',
      en: 'How much does a consultation or legal fees cost?',
    },
    answer: {
      ar: 'تختلف الأتعاب حسب طبيعة القضية أو الموضوع ودرجة تعقيده والوقت المتوقع للتعامل معه، ولذلك يتم توضيح التكلفة لك بعد تقييم موقفك في الاستشارة الأولى، وليس قبل ذلك.',
      en: 'Fees vary depending on the nature of the matter, its complexity, and the time it is expected to take, so the cost is explained to you after your situation is assessed in the first consultation, not before.',
    },
  },
  {
    question: {
      ar: 'إيه المستندات اللي المفروض أجيبها معايا لما أطلب استشارة؟',
      en: 'What documents should I bring with me when I request a consultation?',
    },
    answer: {
      ar: 'يُفضَّل إحضار أي أوراق متعلقة بموضوعك (عقود، مراسلات، إخطارات، مستندات ملكية، أحكام سابقة إن وجدت)، لأن ذلك يساعدنا على تقييم موقفك بدقة من أول استشارة بدلاً من الاعتماد على الوصف الشفهي فقط.',
      en: 'It’s best to bring any papers related to your matter (contracts, correspondence, notices, ownership documents, prior judgments if any) — this helps us assess your situation accurately from the first consultation rather than relying on a verbal description alone.',
    },
  },
  {
    question: {
      ar: 'هل المعلومات والمستندات اللي هشاركها مع المكتب بتفضل سرية؟',
      en: 'Does information I share with the firm stay confidential?',
    },
    answer: {
      ar: 'نعم، كل ما تشاركه معنا من معلومات ومستندات يخضع للسرية المهنية التي يلتزم بها كل محامٍ قانونًا، ولا يُفصح عنه لأي طرف آخر دون إذنك.',
      en: 'Yes — everything you share with us is protected by the professional confidentiality every licensed lawyer is legally bound to, and is not disclosed to any other party without your permission.',
    },
  },
  {
    question: {
      ar: 'قضيتي هتاخد وقت قد إيه لحد ما تخلص؟',
      en: 'How long will my case take from start to finish?',
    },
    answer: {
      ar: 'المدة تختلف كثيرًا حسب نوع القضية، درجة تعقيدها، وعدد درجات التقاضي التي قد تمر بها، فلا يوجد مدة موحدة تنطبق على كل الحالات — لكن بعد مناقشة تفاصيل موضوعك يمكننا إعطاؤك تصورًا تقريبيًا أوضح.',
      en: 'The timeline varies a great deal depending on the type of case, its complexity, and how many levels of court it may go through, so there is no single duration that fits every case — but once we discuss the specifics of your matter, we can give you a clearer general estimate.',
    },
  },
  {
    question: {
      ar: 'لو كسبت القضية، المكتب بيتابع تنفيذ الحكم فعليًا ولا مسؤوليتي أنا؟',
      en: 'If I win my case, does the firm follow through on enforcing the judgment, or is that on me?',
    },
    answer: {
      ar: 'متابعة تنفيذ الحكم واستيفاء الحق فعليًا جزء أساسي من عملنا على أي قضية، لأن صدور الحكم لصالحك لا يعني تلقائيًا أنك استلمت حقك إذا لم يلتزم الطرف الآخر بالتنفيذ طواعية.',
      en: 'Following through on enforcing a judgment and actually collecting what you are owed is a core part of how we handle any case, since winning a judgment does not automatically mean you have received what you’re owed if the other party doesn’t comply voluntarily.',
    },
  },
  {
    question: {
      ar: 'لازم أحضر بنفسي كل جلسة في المحكمة؟',
      en: 'Do I have to personally attend every court session?',
    },
    answer: {
      ar: 'في أغلب الحالات يستطيع المحامي الحضور نيابة عنك بموجب توكيل، ولا يستلزم الأمر حضورك الشخصي في كل جلسة، إلا في حالات معينة يحددها القانون أو تقتضيها طبيعة قضيتك.',
      en: 'In most cases, your lawyer can appear on your behalf under a power of attorney, so you do not need to personally attend every session — except in specific situations the law requires, or that the nature of your case makes necessary.',
    },
  },
  {
    question: {
      ar: 'في أنهي أيام وساعات أقدر أتواصل مع المكتب؟',
      en: 'On which days and hours can I reach the firm?',
    },
    answer: {
      ar: 'المكتب متاح للتواصل طوال أيام الأسبوع ما عدا الجمعة، من الساعة 11 صباحًا حتى 11 مساءً.',
      en: 'The firm is available every day of the week except Friday, from 11:00 AM to 11:00 PM.',
    },
  },
  {
    question: {
      ar: 'هل المكتب بيشتغل مع عملاء برا دمياط، في محافظات تانية؟',
      en: 'Does the firm take clients outside Damietta, in other governorates?',
    },
    answer: {
      ar: 'نعم، نقدم خدماتنا القانونية لعملاء في أي مكان في مصر، ونمثلهم أمام المحاكم والجهات المختصة بغض النظر عن محافظة إقامتهم.',
      en: 'Yes — we provide our legal services to clients anywhere in Egypt, and represent them before courts and the relevant authorities regardless of which governorate they live in.',
    },
  },
  {
    relatedPracticeAreaSlug: 'civil-law',
    question: {
      ar: 'هل لازم أحضر شخصيًا كل جلسات الدعوى المدنية؟',
      en: 'Do I need to personally attend every hearing in a civil case?',
    },
    answer: {
      ar: 'في أغلب الأحيان يمكن لمحاميك الحضور نيابة عنك بموجب توكيل، ولا تحتاج لحضور كل جلسة بنفسك. قد يُطلب حضورك شخصيًا في مراحل معينة (كأداء اليمين مثلًا)، وسنوضح لك مسبقًا متى يكون حضورك ضروريًا.',
      en: 'In most cases your lawyer can appear on your behalf under a power of attorney, and you do not need to attend every hearing yourself. Personal attendance may be required at certain stages (such as taking an oath), and we will let you know in advance whenever your presence is necessary.',
    },
  },
  {
    relatedPracticeAreaSlug: 'civil-law',
    question: {
      ar: 'هل يمكن الوصول لتسوية قبل انتهاء الدعوى المدنية في المحكمة؟',
      en: 'Can a settlement be reached before a civil case concludes in court?',
    },
    answer: {
      ar: 'نعم، يمكن للأطراف التوصل لتسوية ودية في أي مرحلة من مراحل التقاضي، وقد يوفر ذلك وقتًا وتكلفة مقارنة بالاستمرار حتى صدور حكم نهائي. مدى ملاءمة التسوية يعتمد على ظروف كل نزاع، ويمكننا مناقشة ذلك معك في استشارة مباشرة.',
      en: 'Yes — the parties can reach an amicable settlement at any stage of litigation, which can save time and cost compared to continuing through to a final judgment. Whether settlement makes sense depends on the circumstances of each dispute, and we can discuss that with you in a direct consultation.',
    },
  },
  {
    relatedPracticeAreaSlug: 'civil-law',
    question: {
      ar: 'إيه المستندات اللي محتاج أجهزها قبل ما أرفع دعوى مدنية؟',
      en: 'What documents do I need to prepare before filing a civil lawsuit?',
    },
    answer: {
      ar: 'تختلف المستندات المطلوبة حسب نوع النزاع، لكنها تشمل عادة أي عقود أو مراسلات متعلقة بالموضوع، إثبات هويتك، وأي مستندات تدعم موقفك (فواتير، إيصالات، صور، شهادات). كلما كانت مستنداتك أكثر تنظيمًا، كان تقييم موقفك القانوني أدق. يمكنك إحضار ما تملكه معك عند الاستشارة الأولى.',
      en: 'The required documents vary by the type of dispute, but typically include any contracts or correspondence related to the matter, proof of your identity, and anything supporting your position (invoices, receipts, photos, certificates). The more organized your documentation, the more accurately your legal position can be assessed. You can bring whatever you have with you to the initial consultation.',
    },
  },
]

export const founderYear = 1983
