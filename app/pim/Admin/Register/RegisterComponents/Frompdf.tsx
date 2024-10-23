import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Student } from '@/types/Register';
import Addresses from '@/app/register/components/From/addresses';
import Scholarships from '@/app/register/components/From/Scholarships';
import { Box, Button } from '@mui/material';
import html2pdf from 'html2pdf.js';
import StudentPDF from '@/app/register/components/From/StudentPDF';
import PartOnePDF from '@/app/register/components/From/PartOnePDF';

interface RegisterFormProps {
    formMethods: UseFormReturn<Student>;
}

const Frompdf: React.FC<RegisterFormProps> = ({ formMethods }) => {
    const handleDownloadPdf = () => {
        const element = document.getElementById('pdf-content');
        if (!element) return;

        const opt = {
            margin: 0.5,  // ลด margin ลง
            filename: 'student-registration.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait' as 'portrait' | 'landscape'  // Type assertion here
            },
        };

        html2pdf().from(element).set(opt).save();
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleDownloadPdf}>
                Download PDF
            </Button>
            <Box id="pdf-content" className="pdf-container" style={{ maxWidth: '210mm', margin: 'auto' }}>
                {/* เพิ่มกรอบให้กับแต่ละหน้า */}
                <Box className="pdf-page" style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>
                    <StudentPDF formMethods={formMethods} />
                
                    <PartOnePDF formMethods={formMethods} />
                    <Addresses formMethods={formMethods} />
                    <Scholarships formMethods={formMethods} />
                </Box>
            </Box>
        </>
    );
};

export default Frompdf;
