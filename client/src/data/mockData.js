export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE !== 'false'

export const delay = (ms = 1500) => new Promise((r) => setTimeout(r, ms))

const daysFromNow = (n) => new Date(Date.now() + n * 86400000).toISOString()

export const mockAnalysis = {
  documentType: 'Income Tax Notice (Section 143(1))',
  purpose: 'Intimation of tax demand after return processing',
  simpleSummary:
    'The Income Tax Department found a mismatch of ₹18,450 between your filed return and Form 26AS for AY 2025-26. You must either pay the amount or file a response explaining the difference.',
  deadlines: [
    { description: 'Last date to respond or pay the demand', date: daysFromNow(21), daysRemaining: 21 },
    { description: 'Interest under Section 220(2) starts accruing after', date: daysFromNow(30), daysRemaining: 30 }
  ],
  actionItems: [
    'Log in to the Income Tax e-Filing portal (incometax.gov.in) using your PAN.',
    'Go to Pending Actions → Response to Outstanding Demand.',
    'Compare the TDS shown in Form 26AS with your Form 16 from your employer.',
    'If you agree, pay ₹18,450 via Challan 280 and upload the receipt.',
    'If you disagree, select "Demand is incorrect" and attach supporting documents.'
  ],
  requiredDocuments: [
    { name: 'PAN Card' },
    { name: 'Form 16 (FY 2024-25)' },
    { name: 'Form 26AS / Annual Information Statement' },
    { name: 'Bank statement showing salary credits' }
  ],
  source: 'Income Tax Department, Government of India — Centralized Processing Centre, Bengaluru'
}

export const mockUploadedFiles = [
  { id: 'demo-1', name: 'Aadhaar_Card.pdf' },
  { id: 'demo-2', name: 'Income_Certificate_2025.pdf' },
  { id: 'demo-3', name: 'Electricity_Bill_Sept.jpg' },
  { id: 'demo-4', name: 'Passport_Photo.jpg' }
]

export const mockReadiness = {
  totalRequirements: 5,
  readyCount: 3,
  attentionCount: 1,
  missingCount: 1,
  readinessPercentage: 60,
  requirements: [
    { id: '1', name: 'Identity Proof', status: 'ready', explanation: 'Aadhaar Card verified — name and DOB clearly visible.' },
    { id: '2', name: 'Income Certificate', status: 'attention', explanation: 'Certificate issued 14 months ago. Most schemes require one issued within the last 12 months.' },
    { id: '3', name: 'Residence Proof', status: 'ready', explanation: 'Electricity bill dated Sept 2026 matches the address on Aadhaar.' },
    { id: '4', name: 'Photograph', status: 'ready', explanation: 'Passport-size photo with white background detected.' },
    { id: '5', name: 'Bank Details', status: 'missing', explanation: 'No bank passbook or cancelled cheque uploaded. Required for Direct Benefit Transfer.' }
  ],
  inconsistencies: [
    { field: 'Name spelling: "Sanket V. Jadhav" (Aadhaar) vs "Sanket Vijay Jadhav" (Income Certificate)' }
  ],
  actionPlan: [
    { action: 'Upload a scanned copy of your bank passbook front page or a cancelled cheque.' },
    { action: 'Apply for a fresh Income Certificate at your nearest Tehsil office or via Aaple Sarkar portal.' },
    { action: 'Ensure your name matches exactly across all documents, or attach a self-declaration affidavit.' }
  ]
}
