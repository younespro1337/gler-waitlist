export type RegistrationStatus = 'Onboarded' | 'Rejected' | 'Pending';
export type VendorType = 'Independent' | 'Company';
export type ServiceOffering = 'Housekeeping' | 'Window Cleaning' | 'Car Valet';

export interface ServiceProvider {
  id: string;                 // uuid
  email: string;
  phone: string;              // E.164 or formatted
  postcode: string;           // UK postcode
  vendorType: VendorType;
  serviceOffering: ServiceOffering;
  signupDate: string;         // ISO date
  status: RegistrationStatus; // matches the brief
}

