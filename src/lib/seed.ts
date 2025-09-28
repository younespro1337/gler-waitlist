import { faker } from '@faker-js/faker';
import { ServiceProvider } from './types';

const SERVICE_OFFERINGS = ['Housekeeping','Window Cleaning','Car Valet'] as const;
const VENDOR_TYPES = ['Independent','Company'] as const;
const STATUSES = ['Onboarded','Rejected','Pending'] as const;

export function seedServiceProviders(count = 120): ServiceProvider[] {
  faker.seed(42);
  return Array.from({ length: count }).map(() => {
    const offering = faker.helpers.arrayElement(SERVICE_OFFERINGS);
    const vendorType = faker.helpers.arrayElement(VENDOR_TYPES);
    const status = faker.helpers.arrayElement(STATUSES);
    return {
      id: faker.string.uuid(),
      email: faker.internet.email().toLowerCase(),
      phone: `+44 ${faker.number.int({min:10_000_000, max:99_999_999})}`,
      postcode: faker.location.zipCode('AA# #AA'), // e.g. SW1A 1AA
      vendorType,
      serviceOffering: offering,
      signupDate: faker.date.past({ years: 2 }).toISOString(),
      status,
    };
  });
}




