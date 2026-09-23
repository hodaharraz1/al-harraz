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
export const faqs: Array<{ question: Bilingual; answer: Bilingual }> = [
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
]

export const founderYear = 1983
