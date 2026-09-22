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
  isFlagship?: boolean
}> = [
  {
    slug: 'litigation-dispute-resolution',
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
    title: { ar: 'تأسيس الشركات والاستثمار', en: 'Company Formation & Investment' },
    summary: { ar: 'إجراءات تأسيس الشركات والاستثمار في مصر.', en: 'Company formation and investment procedures in Egypt.' },
    overview: {
      ar: 'نساعد المستثمرين المحليين والأجانب في إجراءات تأسيس الشركات والحصول على التراخيص اللازمة وفقًا للقوانين المصرية المنظمة للاستثمار.',
      en: 'We assist local and foreign investors with company formation procedures and obtaining the necessary licenses under Egyptian investment law.',
    },
  },
  {
    slug: 'contracts-commercial-agreements',
    title: { ar: 'العقود والاتفاقيات التجارية', en: 'Contracts & Commercial Agreements' },
    summary: { ar: 'صياغة ومراجعة وتفاوض العقود.', en: 'Drafting, reviewing, and negotiating contracts.' },
    overview: {
      ar: 'نتولى صياغة ومراجعة والتفاوض بشأن مختلف أنواع العقود التجارية والمدنية، بما يضمن وضوح الالتزامات وحماية حقوق موكلينا.',
      en: 'We draft, review and negotiate a wide range of commercial and civil contracts, ensuring clear obligations and protecting our clients’ rights.',
    },
  },
  {
    slug: 'arbitration',
    title: { ar: 'التحكيم', en: 'Arbitration' },
    summary: { ar: 'تمثيل الأطراف في إجراءات التحكيم التجاري.', en: 'Representing parties in commercial arbitration proceedings.' },
    overview: {
      ar: 'نمثل موكلينا في إجراءات التحكيم كوسيلة بديلة لفض المنازعات التجارية بكفاءة وسرية.',
      en: 'We represent clients in arbitration proceedings as an efficient, confidential alternative to litigation for resolving commercial disputes.',
    },
  },
  {
    slug: 'maritime-shipping-port-law',
    title: { ar: 'القانون البحري والشحن والخدمات القانونية المرتبطة بالموانئ', en: 'Maritime, Shipping & Port-Related Legal Services' },
    summary: {
      ar: 'خبرة قانونية في الأعمال البحرية والشحن والخدمات المرتبطة بالموانئ، بحكم موقع المكتب في دمياط.',
      en: 'Legal expertise in maritime affairs, shipping, and port-related services, given the firm’s Damietta location.',
    },
    overview: {
      ar: 'بحكم موقعنا الاستراتيجي في دمياط، يقدم مكتب آل حراز خدمات قانونية متخصصة في المسائل البحرية والشحن، وتشمل منازعات الشحن، مطالبات البضائع، سندات الشحن، مسؤولية الناقل البحري، التخليص الجمركي، والتجارة الدولية. لا يدّعي المكتب أي تبعية رسمية لهيئة ميناء دمياط.',
      en: 'Given our strategic location in Damietta, Al Harraz Law Firm provides specialized legal services in maritime and shipping matters, including shipping disputes, cargo claims, bills of lading, carrier liability, customs clearance, and international trade. The firm does not claim any official affiliation with Damietta Port Authority.',
    },
    isFlagship: true,
  },
  {
    slug: 'customs-import-export',
    title: { ar: 'الجمارك والاستيراد والتصدير', en: 'Customs & Import/Export' },
    summary: { ar: 'استشارات قانونية في المسائل الجمركية والتجارة الدولية.', en: 'Legal advisory on customs matters and international trade.' },
    overview: {
      ar: 'نقدم الاستشارات القانونية للشركات العاملة في الاستيراد والتصدير فيما يتعلق بالإجراءات الجمركية والامتثال للوائح التجارة الدولية.',
      en: 'We advise import/export businesses on customs procedures and compliance with international trade regulations.',
    },
  },
  {
    slug: 'employment-labour-law',
    title: { ar: 'قانون العمل والعمالة', en: 'Employment & Labour Law' },
    summary: { ar: 'استشارات قانونية لأصحاب العمل والعاملين.', en: 'Legal advisory for employers and employees.' },
    overview: {
      ar: 'نقدم الاستشارات القانونية في علاقات العمل، عقود التوظيف، ومنازعات العمل الفردية والجماعية.',
      en: 'We provide legal advisory on employment relationships, employment contracts, and individual and collective labour disputes.',
    },
  },
  {
    slug: 'real-estate-property-registration',
    title: { ar: 'العقارات وتسجيل الملكية', en: 'Real Estate & Property Registration' },
    summary: { ar: 'استشارات قانونية في المعاملات العقارية وتسجيل الملكية.', en: 'Legal advisory on real estate transactions and property registration.' },
    overview: {
      ar: 'نساعد الأفراد والشركات في إجراءات المعاملات العقارية وتسجيل الملكية وفقًا للقانون المصري.',
      en: 'We assist individuals and businesses with real estate transaction procedures and property registration under Egyptian law.',
    },
  },
  {
    slug: 'family-law-personal-status',
    title: { ar: 'الأحوال الشخصية', en: 'Family Law & Personal Status' },
    summary: { ar: 'قضايا الأحوال الشخصية والميراث.', en: 'Personal status and inheritance matters.' },
    overview: {
      ar: 'نقدم التمثيل القانوني والاستشارات في قضايا الأحوال الشخصية، بما في ذلك الزواج والطلاق والحضانة والميراث.',
      en: 'We provide legal representation and advisory in personal status matters, including marriage, divorce, custody, and inheritance.',
    },
  },
  {
    slug: 'administrative-law',
    title: { ar: 'القانون الإداري', en: 'Administrative Law' },
    summary: { ar: 'المنازعات أمام مجلس الدولة.', en: 'Disputes before the State Council.' },
    overview: {
      ar: 'نمثل موكلينا في المنازعات الإدارية أمام مجلس الدولة، بما في ذلك الطعون على القرارات الإدارية.',
      en: 'We represent clients in administrative disputes before the State Council, including challenges to administrative decisions.',
    },
  },
  {
    slug: 'debt-recovery-enforcement',
    title: { ar: 'تحصيل الديون والتنفيذ', en: 'Debt Recovery & Enforcement' },
    summary: { ar: 'إجراءات تحصيل الديون وتنفيذ الأحكام.', en: 'Debt recovery procedures and judgment enforcement.' },
    overview: {
      ar: 'نساعد موكلينا في إجراءات تحصيل الديون وتنفيذ الأحكام القضائية بكفاءة.',
      en: 'We assist clients with efficient debt recovery procedures and enforcement of court judgments.',
    },
  },
  {
    slug: 'criminal-law',
    title: { ar: 'القانون الجنائي', en: 'Criminal Law' },
    summary: { ar: 'الدفاع والتمثيل في القضايا الجنائية.', en: 'Defense and representation in criminal matters.' },
    overview: {
      ar: 'نقدم الدفاع القانوني والتمثيل في القضايا الجنائية أمام النيابة العامة ومختلف درجات المحاكم الجنائية.',
      en: 'We provide legal defense and representation in criminal matters before the Public Prosecution and the criminal courts.',
    },
  },
  {
    slug: 'intellectual-property',
    title: { ar: 'الملكية الفكرية', en: 'Intellectual Property' },
    summary: { ar: 'حماية العلامات التجارية وحقوق الملكية الفكرية.', en: 'Trademark protection and intellectual property rights.' },
    overview: {
      ar: 'نقدم الاستشارات القانونية في مسائل الملكية الفكرية، بما في ذلك تسجيل وحماية العلامات التجارية.',
      en: 'We advise on intellectual property matters, including trademark registration and protection.',
    },
  },
  {
    slug: 'legal-advisory',
    title: { ar: 'الاستشارات القانونية العامة', en: 'General Legal Advisory' },
    summary: { ar: 'استشارات قانونية عامة للأفراد والشركات.', en: 'General legal advisory for individuals and businesses.' },
    overview: {
      ar: 'يقدم مكتب آل حراز استشارات قانونية عامة للأفراد والشركات في مختلف فروع القانون المصري.',
      en: 'Al Harraz Law Firm provides general legal advisory to individuals and businesses across the main areas of Egyptian law.',
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

export const founderYear = 1983
