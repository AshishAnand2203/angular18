
import { DemoAccount } from '../models/auth.model';

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    user: {
      id: 1,
      name: 'Alex Johnson',
      email: 'employee@demo.test',
      role: 'employee'
    },
    password: 'Employee@123'
  },
  {
    user: {
      id: 2,
      name: 'Sarah Wilson',
      email: 'manager@demo.test',
      role: 'manager'
    },
    password: 'Manager@123'
  },
  {
    user: {
      id: 3,
      name: 'Michael Brown',
      email: 'admin@demo.test',
      role: 'admin'
    },
    password: 'Admin@123'
  }
];
