

export interface FacultyOption {
    value: string;
    label: string;
  }
  
  export const faculties: FacultyOption[] = [
    { value: 'คณะบริหารธุรกิจ (BA)', label: 'คณะบริหารธุรกิจ (BA)' },
    { value: 'คณะการจัดการธุรกิจอาหาร (FBM)', label: 'คณะการจัดการธุรกิจอาหาร (FBM)' },
    { value: 'คณะวิทยาการจัดการ (MS)', label: 'คณะวิทยาการจัดการ (MS)' },
    { value: 'คณะการจัดการโลจิสติกส์และคมนาคมขนส่ง (LTM)', label: 'คณะการจัดการโลจิสติกส์และคมนาคมขนส่ง (LTM)' },
    { value: 'คณะศิลปศาสตร์ (LA)', label: 'คณะศิลปศาสตร์ (LA)' },
    { value: 'คณะวิศวกรรมศาสตร์และเทคโนโลยี (ET)', label: 'คณะวิศวกรรมศาสตร์และเทคโนโลยี (ET)' },
    { value: 'คณะการจัดการการศึกษาเชิงสร้างสรรค์ (CEM)', label: 'คณะการจัดการการศึกษาเชิงสร้างสรรค์ (CEM)' },
    { value: 'คณะเกษตรนวัตและการจัดการ (IAM)', label: 'คณะเกษตรนวัตและการจัดการ (IAM)' },
    { value: 'คณะนิเทศศาสตร์ (CA)', label: 'คณะนิเทศศาสตร์ (CA)' },
    { value: 'คณะพยาบาลศาสตร์ (NS)', label: 'คณะพยาบาลศาสตร์ (NS)' },
    { value: 'คณะวิทยาศาสตร์ เทคโนโลยีและการจัดการอาหาร (SMAFT)', label: 'คณะวิทยาศาสตร์ เทคโนโลยีและการจัดการอาหาร (SMAFT)' },
  ];
  
  export type Faculty = FacultyOption['value'];
  
  export const fieldsOfStudy: Record<Faculty, string[]> = {
    'คณะบริหารธุรกิจ (BA)': [
      'การจัดการธุรกิจการค้าสมัยใหม่',
      'การจัดการธุรกิจการค้าสมัยใหม่ (ต่อเนื่อง)',
      'การจัดการธุรกิจการค้าสมัยใหม่ (ศูนย์การเรียนรู้ 11 จังหวัด)',
      'การจัดการธุรกิจการค้าสมัยใหม่ (ระบบการศึกษาทางไกล)'
    ],
    'คณะการจัดการธุรกิจอาหาร (FBM)': [
      'การจัดการธุรกิจอาหาร',
      'การจัดการธุรกิจภัตตาคาร'
    ],
    'คณะวิทยาการจัดการ (MS)': [
      'การจัดการธุรกิจการบิน',
      'อุตสาหกรรมการบริการและการท่องเที่ยว',
      'การจัดการอสังหาริมทรัพย์และทรัพย์สินอาคาร',
      'การบริหารทรัพยากรมนุษย์และการจัดการองค์การ'
    ],
    'คณะการจัดการโลจิสติกส์และคมนาคมขนส่ง (LTM)': [
      'การจัดการโลจิสติกส์และการคมนาคมขนส่ง'
    ],
    'คณะศิลปศาสตร์ (LA)': [
      'ภาษาจีนธุรกิจ',
      'ภาษาญี่ปุ่นธุรกิจ',
      'ภาษาอังกฤษเพื่อการสื่อสารทางธุรกิจ'
    ],
    'คณะวิศวกรรมศาสตร์และเทคโนโลยี (ET)': [
      'หลักสูตรเทคโนโลยีดิจิทัลและสารสนเทศ(DIT)',
      'หลักสูตรวิศวกรรมคอมพิวเตอร์และปัญญาประดิษฐ์(CAI)',
      'หลักสูตรวิศวกรรมการผลิตยานยนต์(AME)',
      'หลักสูตรวิศวกรรมอุตสาหการและการผลิตอัจฉริยะ(IEM)',
      'หลักสูตรวิศวกรรมหุ่นยนต์และระบบอัตโนมัติ(RAE)'
    ],
    'คณะการจัดการการศึกษาเชิงสร้างสรรค์ (CEM)': [
      'การสอนภาษาจีน',
      'การสอนภาษาอังกฤษ'
    ],
    'คณะเกษตรนวัตและการจัดการ (IAM)': [
      'วัตกรรมการจัดการเกษตร'
    ],
    'คณะนิเทศศาสตร์ (CA)': [
      'เอกการสื่อสารองค์กรและแบรนด์',
      'เอกวารสารศาสตร์คอนเวอร์เจนท์และสื่อดิจิทัลสร้างสรรค์'
    ],
    'คณะพยาบาลศาสตร์ (NS)': [
      'พยาบาลศาสตรบัณฑิต หลักสูตรทางวิชาชีพ 4 ปี',
      'พยาบาลศาสตรบัณฑิต หลักสูตรทางวิชาชีพ 2.5 ปี'
    ],
    'คณะวิทยาศาสตร์ เทคโนโลยีและการจัดการอาหาร (SMAFT)': [
      'การจัดการเทคโนโลยีแปรรูปอาหาร'
    ]
  };
