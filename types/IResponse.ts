


export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  error: string | null;

}



// In '@/types/IResponse.ts'
export interface User {
  id: number; // Adjust the type based on your API response
  username: string;
  email: string;
  createdIn: string; // Adjust based on the actual data type, e.g., ISO date string
}




export interface Student {
  // ข้อมูลส่วนบุคคล
  id?: number;  // รหัสนักเรียน
  studentId?: string;  // รหัสประจำตัวนักเรียน
  prefix?: string;  // คำนำหน้า
  firstName?: string;  // ชื่อ
  thaiName?: string;  // ชื่อภาษาไทย
  lastName?: string;  // นามสกุล
  nickname?: string;  // ชื่อเล่น
  dateOfBirth?: string;  // วันเกิด (รูปแบบวันที่ ISO 8601)
  gender?: string;  // เพศ
  nationalId?: string;  // เลขบัตรประชาชน
  email?: string;  // อีเมล
  phoneNumber?: string;  // หมายเลขโทรศัพท์
  faculty?: string;  // คณะ
  fieldOfStudy?: string;  // สาขาวิชา
  currentlyStudyingYear?: string;  // ปีที่กำลังศึกษา
  studentType?: string;  // ประเภทนักศึกษา
  block?: string;  // บล็อคที่เรียน
  currentGpa?: string;  // เกรดเฉลี่ยปัจจุบัน (ในรูปแบบสตริงหากใช้ BigDecimal)
  createDate?: string;  // วันที่สร้างข้อมูล (รูปแบบวันที่-เวลา ISO 8601)
  PlaceofStudy?: string;  // สถานที่ศึกษา
  otherPlace?: string;  // สถานที่ศึกษาอื่นๆ

  // ข้อคำร้อง
  request?: string;  // คำร้องขอพิเศษ

  // ที่อยู่ปัจจุบัน
  current_address: string;  // ที่อยู่ปัจจุบัน
  student_resident: string;  // ที่พักนักศึกษา
  number_of_residents: string;  // จำนวนผู้อยู่อาศัย
  current_province: string;  // จังหวัดปัจจุบัน
  current_district: string;  // อำเภอปัจจุบัน
  current_subdistrict: string;  // ตำบลปัจจุบัน
  current_postal_code: string;  // รหัสไปรษณีย์ปัจจุบัน
  address_according_to_house_registration: string;  // ที่อยู่ตามทะเบียนบ้าน
  province: string;  // จังหวัด
  district: string;  // อำเภอ
  subdistrict: string;  // ตำบล
  postal_code: string;  // รหัสไปรษณีย์

  // ทุนการศึกษา   Scholarships
  advisorNameSurname?: string; // อาจารย์ที่ปรึกษา ชื่อ - นามสกุล
  advisorPhoneNumber?: string; // เบอร์โทรอาจารย์ที่ปรึกษา
  knowThePIMSMARTFundfrom?: string; // รู้จักกองทุน PIM SMART จาก
  additionalDetails?: string; // Add this field
  scholarshipReceived?: string;  // ทุนการศึกษาที่ได้รับ
  otherScholarships?: string; // ทุนการศึกษาอื่น ๆ
  educationLoan?: string; // กยศ สินเชื่อเพื่อการศึกษา
  graduatedFromSchool?: string; //จบจากโรงเรียน
  provinceSchool?: string; //จังหวัด(โรงเรียน)

  //Student personal information

  lineID?: string;
  facebook?: string;
  fatherNameSurname?: string;
  motherNameSurname?: string;
  occupationFather?: string;
  occupationMother?: string;
  estimateFatherMonthlyIncome?: string;
  motherApproximateMonthlyIncome?: string;
  fatherAddress?: string;
  fatherAddressDetails?: string;
  motherAddress?: string;
  motherAddressDetails?: string;

  // ข้อมูลด้านสุขภาพ
  congenitalDisease?: string;  // โรคประจำตัว 
  paternalMemoryDisorder? : string;  //โรคจำตัวบิดา
  maternalMemoryDisorder? : string;  //โรคจำตัวมารดา
  fatherStatus? : string;  //สถานภาพบิดา
  fatherStatusDetails? : string;  //สถานภาพบิดา
  maternalStatus? : string;  //สถานภาพมารดา
  maternalStatusDetails? : string;  //สถานภาพมารดา
  haveSiblings? : string, //มีพี่น้อง ( รวมนักศึกษา )
  woman? : string, //เป็นหญิง

  //StepFive
  addressValue? : string;  // ระบุค่าที่อยู่รายเดือนรวมน้ำไฟ ( เช่าบ้าน/หอ )
  roundTripTravel? : string; //การเดินทางไปกลับ
  householdExpenses? : string; //ค่าใช้จ่ายภายในบ้าน
  familyDebt? : string; //หนี้สินครอบครัว

  //StepSix
  contactInformation? :string; //ข้อมูลการติดต่อกลับ
  emergencyContact? :string; //ชื่อ - นามสกุล ผู้ที่สามารถติดต่อได้ในกรณีฉุกเฉิน
  relationship? :string; //ความสัมพันธ์
  emergencyContactPhoneNumber? :string; //เบอร์โทรศัพท์ผู้ติดต่อฉุกเฉิน ที่สามารถติดต่อได้
  
  
  //StepSeven
  BeautyEnhancement? :string; //เสริมความงาม
  BeautyEnhancementDetails? :string; //เสริมความงาม
  man? : string, //เป็นชาย
  personWho? : string, //นักศึกษาเป็นลูกคนที่
  ParentInformation? : string, //นักศึกษาเป็นลูกคนที่
  talent? : string, //ความสามารถพิเศษของนักศึกษา
  primary? : string, //ประถม
  middleSchool? : string, //มัธยมต้น
  highSchool? : string, //มัธยมปลาย
  current? : string, //ปัจจุบัน
  specialWork? : string, //งานพิเศษที่เคยทำ
  

  //StepEight
  hope? :string; //ความมุ่งหวังหลังจากจบการศึกษา
  committee? :string; //อยากบอกอะไรกับคณะกรรมการฯ


  //StepNine
  familyHistory? :string; //เล่าประวัติครอบครัวคร่าวๆ และเหตุผลในการขอทุน มีความจำเป็น ความเดือนร้อน ความต้องการให้กองทุนฯช่วยเหลือ


  //StepTen

  uploadPictureHouse?: FileList | File[]; //อัพโหลดอย่างน้อย 2 รูป ภาพรวมนอกบ้าน ภาพรวมในบ้าน
  volunteerPictures?: FileList | File[]; //ภาพทำจิตอาสา 1-5 รูป เป็นจิอาสาที่ทำย้อนหลังไม่เกิน 1 ปี
  


}

// Location interface for geographic data
export interface Location {
  province: string;
  district: string;
  subdistrict: string;
  zipcode: string;
}
export interface FormValues {
  studentId?: string;
  studentId1?: string; // Additional field used for the form
  title?: string;
  firstName?: string;
  nickname?: string;
  graduate?: string;
  branch?: string;
  activityName?: string;
  organizationName?: string;
  organizationPhone?: string;
  activityDescription?: string;
  activityDate?: string;
  hours?: string;
  createDate?: string;
  loanStatus?: string;
  yearLevel?: string; 
  formdata?: string; // Optional
  student_id?: string;
  full_name?: string;
  activity_name?: string;
  organization_name?: string;
  organization_phone?: string;
  activity_description?: string;
  activity_date?: string;
  
  activity_image?: File;
}

// Response structure when fetching volunteer hours
export interface VolunteerHoursResponse {
  id: string;
  studentId: string;
  firstName: string;
  activityName: string;
  organizationName: string;
  organizationPhone: string;
  activityDescription: string;
  activityDate: string;
  hours: number;
  
}

// Props for the VolunteerForm component
export interface VolunteerFormProps {
  onSubmit: (formValues: FormValues) => Promise<void>;
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  success: string | null;
  error: string | null;
  loading: boolean;
  setError: (error: string | null) => void; // Function to set error message
  setLoading: (loading: boolean) => void;   // Function to set loading state
  setSuccessMessage: (message: string | null) => void; // Function to set success message
}

// Props for the SpecialWorkForm component
export interface SpecialWorkFormProps {
  onSubmit: (formValues: SpecialWorkFormData) => void;
  formValues: SpecialWorkFormData;
  setFormValues: React.Dispatch<React.SetStateAction<SpecialWorkFormData>>;
  success: string | null;
  error: string | null;
  loading: boolean;
}

// Data structure for special work form submissions
export interface SpecialWorkFormData {
  studentId: string;
  title: string;
  firstName: string;
  nickname: string;
  graduate: string;
  branch: string;
  activityName: string;
  organizationName: string;
  organizationPhone: string;
  activityDescription: string;
  activityDate: string;
  hours: string;
  createDate: string;
  yearLevel: string;
  loanStatus: string;
}